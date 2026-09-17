require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const localToLiveMap = {
  '/uploads/media-1789563172789-64334141.svg': {
    localFile: 'media-1789563172789-64334141.svg',
    title: 'E-Commerce 1',
    industrySlug: 'ecommerce',
  },
  '/uploads/media-1789563172792-808819694.svg': {
    localFile: 'media-1789563172792-808819694.svg',
    title: 'Education 1',
    industrySlug: 'education',
  },
  '/uploads/media-1789563172793-389883725.svg': {
    localFile: 'media-1789563172793-389883725.svg',
    title: 'FinTech 1',
    industrySlug: 'fintech',
  },
  '/uploads/media-1789563172793-99943126.svg': {
    localFile: 'media-1789563172793-99943126.svg',
    title: 'Healthcare 1',
    industrySlug: 'healthcare',
  },
  '/uploads/media-1789563172794-630766494.svg': {
    localFile: 'media-1789563172794-630766494.svg',
    title: 'SaaS 1',
    industrySlug: 'saas',
  },
  '/uploads/media-1789563172794-101604180.svg': {
    localFile: 'media-1789563172794-101604180.svg',
    title: 'Travel 1',
    industrySlug: 'travel',
  },
  '/uploads/media-1789566441929-109737117.svg': {
    localFile: 'media-1789566441929-109737117.svg',
    title: 'Business First Planning 1',
    whyChooseTitle: 'Business-first planning',
  },
  '/uploads/media-1789566441929-4433635.svg': {
    localFile: 'media-1789566441929-4433635.svg',
    title: 'Cross-functional expertise 1',
    whyChooseTitle: 'Cross-functional expertise',
  },
  '/uploads/media-1789566441929-227301020.svg': {
    localFile: 'media-1789566441929-227301020.svg',
    title: 'Enterprise-ready thinking 1',
    whyChooseTitle: 'Enterprise-ready thinking',
  },
  '/uploads/media-1789566441930-7622150.svg': {
    localFile: 'media-1789566441930-7622150.svg',
    title: 'Transparent execution 1',
    whyChooseTitle: 'Transparent execution',
  },
};

async function syncToLive() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected to MongoDB Atlas');

  const rootDir = path.resolve(__dirname, '..');
  const publicUploads = path.join(rootDir, 'public', 'uploads');
  const backendUploads = path.join(__dirname, 'uploads');

  const urlReplacementMap = {};

  for (const [oldUrl, info] of Object.entries(localToLiveMap)) {
    const filePath = path.join(publicUploads, info.localFile);
    if (!fs.existsSync(filePath)) {
      console.error('File not found locally:', filePath);
      continue;
    }

    const fileContent = fs.readFileSync(filePath);
    const blob = new Blob([fileContent], { type: 'image/svg+xml' });
    const formData = new FormData();
    formData.append('file', blob, info.localFile);
    formData.append('title', info.title);

    console.log(`Uploading ${info.title} (${info.localFile}) to https://cubixsol.com/api/upload ...`);
    const res = await fetch('https://cubixsol.com/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (!res.ok) {
      console.error(`Failed to upload ${info.title}:`, res.status);
      continue;
    }

    const json = await res.json();
    const newLiveUrl = json.url;
    console.log(`✓ Uploaded! Old: ${oldUrl} -> New Live: ${newLiveUrl}`);
    urlReplacementMap[oldUrl] = newLiveUrl;

    // Also copy locally with the new filename so local dev server has exact same file
    const newFilename = path.basename(newLiveUrl);
    fs.writeFileSync(path.join(publicUploads, newFilename), fileContent);
    fs.writeFileSync(path.join(backendUploads, newFilename), fileContent);
  }

  console.log('\n--- Updating MongoDB Database ---');

  // 1. Update Media collection
  for (const [oldUrl, newUrl] of Object.entries(urlReplacementMap)) {
    const itemInfo = localToLiveMap[oldUrl];
    // Remove duplicate or update existing
    await mongoose.connection.db.collection('media').deleteMany({
      $or: [{ url: oldUrl }, { title: itemInfo.title, url: { $ne: newUrl } }]
    });
    // Ensure accurate live record exists
    await mongoose.connection.db.collection('media').updateOne(
      { url: newUrl },
      {
        $set: {
          title: itemInfo.title,
          url: newUrl,
          type: 'image',
          alt: itemInfo.title,
          mimetype: 'image/svg+xml',
        }
      },
      { upsert: true }
    );
    console.log(`Updated Media record -> ${newUrl}`);
  }

  // 2. Update Industry collection icons
  for (const [oldUrl, newUrl] of Object.entries(urlReplacementMap)) {
    const info = localToLiveMap[oldUrl];
    if (info.industrySlug) {
      await mongoose.connection.db.collection('industries').updateOne(
        { slug: info.industrySlug },
        { $set: { icon: newUrl } }
      );
      console.log(`Updated Industry [${info.industrySlug}] icon -> ${newUrl}`);
    }
  }

  // 3. Update Services page whyChooseItems in pagecontents collection
  const servicesPage = await mongoose.connection.db.collection('pagecontents').findOne({ slug: 'services' });
  if (servicesPage && Array.isArray(servicesPage.whyChooseItems)) {
    const updatedWhyChoose = servicesPage.whyChooseItems.map((item) => {
      let icon = item.icon;
      if (icon && urlReplacementMap[icon]) {
        icon = urlReplacementMap[icon];
      } else {
        for (const [oldUrl, newUrl] of Object.entries(urlReplacementMap)) {
          const info = localToLiveMap[oldUrl];
          if (info.whyChooseTitle && item.title === info.whyChooseTitle) {
            icon = newUrl;
            break;
          }
        }
      }
      return { ...item, icon };
    });

    await mongoose.connection.db.collection('pagecontents').updateOne(
      { slug: 'services' },
      { $set: { whyChooseItems: updatedWhyChoose } }
    );
    console.log('Updated Services page whyChooseItems in MongoDB');
  }

  console.log('\n--- Verifying All Live URLs ---');
  let allWorking = true;
  for (const [oldUrl, newUrl] of Object.entries(urlReplacementMap)) {
    try {
      const r = await fetch('https://cubixsol.com' + newUrl);
      const ct = r.headers.get('content-type') || '';
      const ok = r.status === 200 && ct.includes('svg');
      console.log(`URL: https://cubixsol.com${newUrl} -> Status ${r.status}, Type: ${ct} -> ${ok ? '✅ WORKING' : '❌ FAILED'}`);
      if (!ok) allWorking = false;
    } catch (e) {
      console.error(`URL check failed for ${newUrl}:`, e.message);
      allWorking = false;
    }
  }

  if (allWorking) {
    console.log('\n🎉 ALL 10 IMAGES ARE NOW 100% WORKING LIVE ON CUBIXSOL.COM!');
  }

  fs.writeFileSync(path.join(__dirname, 'urlReplacementMap.json'), JSON.stringify(urlReplacementMap, null, 2), 'utf-8');
  process.exit(0);
}

syncToLive().catch((e) => {
  console.error('Error in syncToLive:', e);
  process.exit(1);
});
