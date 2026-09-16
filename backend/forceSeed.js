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
    const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/cubixsol';
    console.log('Connecting to MongoDB for full sync/seed:', mongoUri);
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

    // Helper to replace/upsert collections safely
    const syncCollection = async (Model, data, matchField = 'slug', name = 'items') => {
      if (!Array.isArray(data) || data.length === 0) return;
      console.log(`Syncing ${data.length} ${name}...`);
      for (const item of data) {
        if (item[matchField]) {
          await Model.findOneAndUpdate(
            { [matchField]: item[matchField] },
            { $set: item },
            { upsert: true, new: true }
          );
        } else if (item.title || item.name) {
          const key = item.title ? 'title' : 'name';
          await Model.findOneAndUpdate(
            { [key]: item[key] },
            { $set: item },
            { upsert: true, new: true }
          );
        } else {
          await Model.create(item);
        }
      }
      console.log(`✓ ${name} synced successfully.`);
    };

    await syncCollection(Service, initialServices, 'slug', 'Services');
    await syncCollection(Industry, initialIndustries, 'slug', 'Industries');
    await syncCollection(PageContent, initialPages, 'slug', 'Pages');
    await syncCollection(ContactInfo, initialContactInfo, 'type', 'Contact Info');
    await syncCollection(Media, initialMedia, 'url', 'Media Library');
    await syncCollection(Category, initialCategories, 'slug', 'Categories');
    await syncCollection(Tag, initialTags, 'slug', 'Tags');
    await syncCollection(Author, initialAuthors, 'name', 'Authors');
    await syncCollection(Blog, initialBlogs, 'slug', 'Blogs');
    await syncCollection(Solution, initialSolutions, 'slug', 'Solutions');
    await syncCollection(Product, initialProducts, 'slug', 'Products');
    await syncCollection(Project, initialProjects, 'slug', 'Projects');
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
  } catch (err) {
    console.error('Force seed error:', err);
    process.exit(1);
  }
}

forceSeed();
