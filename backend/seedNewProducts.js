const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const Product = require('./models/Product');

async function seedProducts() {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/cubixsol';
    console.log('Connecting to MongoDB:', mongoUri);
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB successfully.');

    const productsToUpsert = [
      {
        slug: 'workstream',
        name: 'Workstream',
        title: 'The All-in-One Management Tool Built for Enterprise Needs',
        tagline: 'Simplify workflows by 50%, boost communication, and empower employees — one platform.',
        desc: 'Streamline team operations and approvals with customizable workflows and real-time tracking.',
        image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&h=750&q=80',
        accent: 'from-blue-100 to-sky-50',
        category: 'enterprise',
        externalUrl: '',
      },
      {
        slug: 'hirestream',
        name: 'Hirestream',
        title: 'Recruitment Automation Tool',
        tagline: 'Pipelines that move candidates forward — not spreadsheets that stall them.',
        desc: 'Automate hiring pipelines, reduce manual effort, and make smarter recruitment decisions.',
        image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&h=750&q=80',
        accent: 'from-cyan-100 to-teal-50',
        category: 'enterprise',
        externalUrl: '',
      },
      {
        slug: 'fix-alert',
        name: 'FixAlert',
        title: 'Real-time Maintenance Reporting',
        tagline: 'Report issues. Dispatch teams. Close the loop — from any site.',
        desc: 'Instantly report and resolve infrastructure issues with a centralized, mobile-friendly system.',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&h=750&q=80',
        accent: 'from-orange-100 to-amber-50',
        category: 'enterprise',
        externalUrl: '',
      },
      {
        slug: 'schoolgram',
        name: 'Schoolgram',
        title: 'School Communication Suite',
        tagline: 'Parents informed. Staff aligned. One secure channel for the whole school.',
        desc: 'Bridge the gap between schools and parents with secure, real-time messaging and announcements.',
        image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&h=750&q=80',
        accent: 'from-violet-100 to-purple-50',
        category: 'enterprise',
        externalUrl: '',
      },
      {
        slug: 'image-to-text',
        name: 'Image to Text',
        title: 'Free Online OCR — Extract Text from Images',
        tagline: 'Upload an image, get editable text. 200+ languages, privacy-first, no signup.',
        desc: 'Professional OCR that converts JPG, PNG, PDF, HEIC and 70+ formats into accurate, editable text. Free, no registration, files auto-deleted after recognition.',
        image: '/uploads/media-1789647461822-981103321.png',
        accent: 'from-sky-100 to-blue-50',
        externalUrl: 'https://imagetotext.best/',
        category: 'tools',
      },
      {
        slug: 'reescrever-texto',
        name: 'Reescrever Texto',
        title: 'Rewrite Text for Clarity and Style',
        tagline: 'Improve tone, readability, and structure without losing your meaning.',
        desc: 'Online text rewriting and paraphrasing tool to refine drafts, simplify language, and produce clearer copy for work, study, or publishing.',
        image: '/uploads/media-1789647461880-944716453.png',
        accent: 'from-violet-100 to-purple-50',
        externalUrl: 'https://reescrevertexto.io/',
        category: 'ai',
      },
      {
        slug: 'jpg-a-pdf',
        name: 'JPGA PDF',
        title: 'Convert JPG Images to PDF Online',
        tagline: 'Fast JPG → PDF conversion in the browser — simple and reliable.',
        desc: 'Turn one or more JPG images into a clean PDF document. Ideal for forms, scans, and sharing files that need a universal format.',
        image: '/uploads/media-1789647461868-484257972.png',
        accent: 'from-orange-100 to-amber-50',
        externalUrl: 'https://jpgapdf.io/',
        category: 'tools',
      },
      {
        slug: 'jpg-to-pdf',
        name: 'JPG to PDF',
        title: 'JPG to PDF Converter',
        tagline: 'Reliable image-to-PDF for documents, scans, and photo sets.',
        desc: 'Convert JPG files into PDF documents online — built for everyday document workflows and multi-page needs.',
        image: '/uploads/media-1789647461835-804443603.png',
        accent: 'from-cyan-100 to-teal-50',
        externalUrl: 'https://jpg2pdf.io/',
        category: 'tools',
      },
      {
        slug: 'toolmad',
        name: 'ToolMad',
        title: 'ToolMad — All-in-One Online Web Utilities & Tools',
        tagline: 'Free online utility tools, text converters, formatters and web helpers.',
        desc: 'ToolMad provides a comprehensive suite of online utility tools for developers, content creators, and digital professionals.',
        image: '/uploads/media-1789647461884-622147573.png',
        accent: 'from-blue-100 to-indigo-50',
        externalUrl: 'https://toolmad.com/',
        category: 'tools',
      },
      {
        slug: 'move-compass',
        name: 'MoveCompass',
        title: 'MoveCompass — UK Removals & Moving Comparison Platform',
        tagline: 'Find trusted removal companies, compare quotes, and plan seamless moves across the UK.',
        desc: 'A smart comparison and booking platform for UK home and office removals, storage solutions, and relocation services.',
        image: '/uploads/media-1789647461874-459519001.png',
        accent: 'from-emerald-100 to-teal-50',
        externalUrl: 'https://movecompass.co.uk/',
        category: 'enterprise',
      },
      {
        slug: 'eshaalinnovations',
        name: 'Eshaal Innovations',
        title: 'Eshaal Innovations — Tech Solutions & Digital Agency',
        tagline: 'Transform your business with cutting-edge digital products and tech solutions.',
        desc: 'Digital solutions and software development platform empowering businesses with modern web, mobile, and digital growth services.',
        image: '/uploads/media-1789647461805-229919531.png',
        accent: 'from-purple-100 to-indigo-50',
        externalUrl: 'https://eshaalinnovations.com/',
        category: 'enterprise',
      },
      {
        slug: 'couponsbeast',
        name: 'CouponsBeast',
        title: 'CouponsBeast — Verified Promo Codes, Coupons & Online Deals',
        tagline: 'Discover the best discount coupons, promo codes, and cashback offers online.',
        desc: 'Comprehensive coupon and deals platform helping shoppers save money with verified discounts across top global brands and stores.',
        image: '/uploads/media-1789647461792-921582557.png',
        accent: 'from-green-100 to-emerald-50',
        externalUrl: 'https://couponsbeast.com/',
        category: 'tools',
      },
      {
        slug: 'ai-seo-auditor',
        name: 'AI SEO Auditor',
        title: 'AI-Powered SEO Auditor',
        tagline: 'Scan your site for SEO issues, content gaps, and technical fixes — guided by AI.',
        desc: 'Cubixsol AI SEO Auditor reviews pages for technical SEO, on-page signals, and prioritised recommendations so teams know what to fix first.',
        image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=1200&h=750&q=80',
        accent: 'from-emerald-100 to-teal-50',
        externalUrl: '/tools/ai-seo-auditor',
        category: 'ai',
      },
    ];

    for (const prod of productsToUpsert) {
      await Product.findOneAndUpdate(
        { slug: prod.slug },
        { $set: prod },
        { upsert: true, new: true }
      );
      console.log(`✓ Product updated: ${prod.name} (${prod.slug}) -> ${prod.externalUrl}`);
    }

    // Sync to seedData.json
    const seedJsonPath = path.join(__dirname, 'seedData.json');
    if (fs.existsSync(seedJsonPath)) {
      try {
        const raw = fs.readFileSync(seedJsonPath, 'utf8');
        const seed = JSON.parse(raw);
        seed.products = productsToUpsert;
        fs.writeFileSync(seedJsonPath, JSON.stringify(seed, null, 2), 'utf8');
        console.log('✓ Synced products to backend/seedData.json');
      } catch (e) {
        console.error('Error updating seedData.json:', e);
      }
    }

    await mongoose.disconnect();
    console.log('Done.');
  } catch (err) {
    console.error('Error seeding products:', err);
    process.exit(1);
  }
}

seedProducts();
