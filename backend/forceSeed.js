const dns = require('dns');
try {
  dns.setServers(['8.8.8.8', '1.1.1.1', '8.8.4.4']);
} catch (e) {}

const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const Service = require('./models/Service');
const Project = require('./models/Project');
const Product = require('./models/Product');
const Solution = require('./models/Solution');
const Industry = require('./models/Industry');
const Blog = require('./models/Blog');
const Category = require('./models/Category');
const Tag = require('./models/Tag');
const Author = require('./models/Author');
const Testimonial = require('./models/Testimonial');
const Career = require('./models/Career');
const SeoSetting = require('./models/SeoSetting');
const Team = require('./models/Team');
const Faq = require('./models/Faq');
const SiteSetting = require('./models/SiteSetting');
const PageContent = require('./models/PageContent');
const ContactInfo = require('./models/ContactInfo');
const Media = require('./models/Media');

async function forceSeed() {
  try {
    // Support MONGO_URI from command-line argument (e.g. `node forceSeed.js "mongodb+srv://..."`) or env
    const cliUri = process.argv[2];
    const mongoUri = cliUri || process.env.MONGO_URI || process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/cubixsol';
    console.log('Connecting to MongoDB for full sync/seed:', mongoUri.includes('@') ? mongoUri.split('@')[1] : mongoUri);
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB.');

    // Load data from seedData.json or seedData.js
    let seedData = {};
    const seedJsonPath = path.join(__dirname, 'seedData.json');
    if (fs.existsSync(seedJsonPath)) {
      seedData = JSON.parse(fs.readFileSync(seedJsonPath, 'utf-8'));
    } else {
      seedData = require('./seedData');
    }

    const {
      initialServices = [],
      initialSolutions = [],
      initialProducts = [],
      initialIndustries = [],
      initialProjects = [],
      initialTeam = [],
      initialFaqs = [],
      initialTestimonials = [],
      initialBlogs = [],
      initialAuthors = [],
      initialCategories = [],
      initialTags = [],
      initialCareers = [],
      initialSiteSettings = [],
      initialSeoSettings = [],
      initialPages = [],
      initialContactInfo = [],
      initialMedia = [],
    } = seedData;

    // Helper to replace/upsert collections safely without breaking existing IDs or duplicating records
    const syncCollection = async (Model, data, matchField = 'slug', name = 'items') => {
      if (!Array.isArray(data) || data.length === 0) return;
      console.log(`Syncing ${data.length} ${name}...`);
      let successCount = 0;
      for (const item of data) {
        let filter = null;
        if (item[matchField]) {
          filter = { [matchField]: item[matchField] };
        } else if (item.slug) {
          filter = { slug: item.slug };
        } else if (item.title) {
          filter = { title: item.title };
        } else if (item.name) {
          filter = { name: item.name };
        } else if (item.key) {
          filter = { key: item.key };
        } else if (item.page) {
          filter = { page: item.page };
        }

        if (filter) {
          await Model.findOneAndUpdate(
            filter,
            { $set: item },
            { upsert: true, new: true, setDefaultsOnInsert: true }
          );
        } else {
          await Model.create(item);
        }
        successCount++;
      }
      console.log(`✓ ${name}: ${successCount}/${data.length} synced successfully.`);
    };

    await syncCollection(Service, initialServices, 'slug', 'Services');
    await syncCollection(Industry, initialIndustries, 'slug', 'Industries');
    await syncCollection(PageContent, initialPages, 'slug', 'Pages');
    await syncCollection(ContactInfo, initialContactInfo, 'title', 'Contact Info');
    await syncCollection(Media, initialMedia, 'url', 'Media Library');
    await syncCollection(Category, initialCategories, 'slug', 'Categories');
    await syncCollection(Tag, initialTags, 'slug', 'Tags');
    await syncCollection(Author, initialAuthors, 'name', 'Authors');
    await syncCollection(Blog, initialBlogs, 'slug', 'Blogs');
    await syncCollection(Solution, initialSolutions, 'slug', 'Solutions');
    await syncCollection(Product, initialProducts, 'slug', 'Products');
    await syncCollection(Project, initialProjects, 'title', 'Projects');
    await syncCollection(Team, initialTeam, 'name', 'Team');
    await syncCollection(Faq, initialFaqs, 'q', 'FAQs');
    await syncCollection(Testimonial, initialTestimonials, 'author', 'Testimonials');
    await syncCollection(Career, initialCareers, 'slug', 'Careers');
    await syncCollection(SiteSetting, initialSiteSettings, 'key', 'Site Settings');
    await syncCollection(SeoSetting, initialSeoSettings, 'page', 'SEO Settings');

    console.log('====================================================');
    console.log('🎉 ALL DATABASE COLLECTIONS ARE 100% UP TO DATE!');
    console.log('====================================================');

    await mongoose.disconnect();
    console.log('Disconnected cleanly from MongoDB.');
  } catch (err) {
    console.error('Force seed error:', err);
    process.exit(1);
  }
}

forceSeed();
