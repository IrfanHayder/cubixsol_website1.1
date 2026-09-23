/**
 * COMPLETE LIVE DATABASE SEED & MIGRATION SCRIPT FOR CUBIXSOL
 * 
 * Usage:
 *   node seedLiveDatabase.js
 *   OR with custom live connection string:
 *   node seedLiveDatabase.js "mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/cubixsol?retryWrites=true&w=majority"
 */

const dns = require('dns');
try {
  dns.setServers(['8.8.8.8', '1.1.1.1', '8.8.4.4']);
} catch (e) {
  // Ignore DNS setServers error if restricted by environment
}

const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

// Load Mongoose Models
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

async function runLiveSeed() {
  const startTime = Date.now();
  console.log('====================================================');
  console.log('🚀 CUBIXSOL PRODUCTION DATABASE SEED & MIGRATION');
  console.log('====================================================');

  try {
    // 1. Determine MongoDB URI (CLI argument > .env MONGO_URI > Default fallback)
    const targetUri =
      process.argv[2] ||
      process.env.MONGO_URI ||
      process.env.MONGODB_URI ||
      'mongodb://127.0.0.1:27017/cubixsol';

    const safeUriDisplay = targetUri.includes('@')
      ? 'mongodb+srv://****:****@' + targetUri.split('@')[1]
      : targetUri;

    console.log(`📡 Connecting to target database: ${safeUriDisplay}`);

    await mongoose.connect(targetUri, {
      serverSelectionTimeoutMS: 20000,
    });
    console.log('✅ Connected successfully to MongoDB.\n');

    // 2. Load Seed Dataset (from seedData.json or seedData.js)
    let seedData = {};
    const seedJsonPath = path.join(__dirname, 'seedData.json');
    if (fs.existsSync(seedJsonPath)) {
      seedData = JSON.parse(fs.readFileSync(seedJsonPath, 'utf-8'));
    } else {
      seedData = require('./seedData');
    }

    const {
      initialServices = [],
      initialIndustries = [],
      initialSolutions = [],
      initialProducts = [],
      initialProjects = [],
      initialBlogs = [],
      initialPages = [],
      initialContactInfo = [],
      initialMedia = [],
      initialCategories = [],
      initialTags = [],
      initialAuthors = [],
      initialTestimonials = [],
      initialCareers = [],
      initialTeam = [],
      initialFaqs = [],
      initialSiteSettings = [],
      initialSeoSettings = [],
    } = seedData;

    // 3. Upsert Helper Function
    const upsertCollection = async (Model, items, matchKey, label) => {
      if (!Array.isArray(items) || items.length === 0) {
        console.log(`ℹ️  No data found for ${label}, skipping.`);
        return { count: 0, total: 0 };
      }

      let successCount = 0;
      for (const item of items) {
        try {
          const filter = {};
          if (item[matchKey]) {
            filter[matchKey] = item[matchKey];
          } else if (item.slug) {
            filter.slug = item.slug;
          } else if (item.title) {
            filter.title = item.title;
          } else if (item.name) {
            filter.name = item.name;
          } else if (item.key) {
            filter.key = item.key;
          } else if (item.page) {
            filter.page = item.page;
          } else if (item.url) {
            filter.url = item.url;
          } else if (item.q) {
            filter.q = item.q;
          } else if (item.author) {
            filter.author = item.author;
          }

          if (Object.keys(filter).length > 0) {
            await Model.findOneAndUpdate(
              filter,
              { $set: item },
              { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true }
            );
          } else {
            await Model.create(item);
          }
          successCount++;
        } catch (err) {
          console.error(`⚠️ Error upserting in ${label}:`, err.message);
        }
      }

      console.log(`✓ ${label.padEnd(22)}: ${String(successCount).padStart(3)} / ${items.length} records synced.`);
      return { count: successCount, total: items.length };
    };

    console.log('🔄 Syncing collections...');
    console.log('----------------------------------------------------');

    const results = {};
    results.services = await upsertCollection(Service, initialServices, 'slug', 'Services (PMS & Core)');
    results.industries = await upsertCollection(Industry, initialIndustries, 'slug', 'Industries');
    results.solutions = await upsertCollection(Solution, initialSolutions, 'slug', 'Solutions');
    results.products = await upsertCollection(Product, initialProducts, 'slug', 'Products');
    results.projects = await upsertCollection(Project, initialProjects, 'title', 'Projects');
    results.blogs = await upsertCollection(Blog, initialBlogs, 'slug', 'Blogs');
    results.pages = await upsertCollection(PageContent, initialPages, 'slug', 'Pages');
    results.contactInfo = await upsertCollection(ContactInfo, initialContactInfo, 'title', 'Contact Info');
    results.media = await upsertCollection(Media, initialMedia, 'url', 'Media Library');
    results.categories = await upsertCollection(Category, initialCategories, 'slug', 'Blog Categories');
    results.tags = await upsertCollection(Tag, initialTags, 'slug', 'Blog Tags');
    results.authors = await upsertCollection(Author, initialAuthors, 'name', 'Authors');
    results.testimonials = await upsertCollection(Testimonial, initialTestimonials, 'author', 'Testimonials');
    results.careers = await upsertCollection(Career, initialCareers, 'slug', 'Careers');
    results.team = await upsertCollection(Team, initialTeam, 'name', 'Team Members');
    results.faqs = await upsertCollection(Faq, initialFaqs, 'q', 'FAQs');
    results.siteSettings = await upsertCollection(SiteSetting, initialSiteSettings, 'key', 'Site Settings');
    results.seoSettings = await upsertCollection(SeoSetting, initialSeoSettings, 'page', 'SEO Settings');

    console.log('----------------------------------------------------');
    const elapsedSeconds = ((Date.now() - startTime) / 1000).toFixed(2);
    console.log(`🎉 FULL DATABASE SYNC COMPLETED SUCCESSFULLY IN ${elapsedSeconds}s!`);
    console.log('====================================================');
    console.log(`Total Services Seeded: ${results.services.count} (including Lodgify, Jurny, Guesty, Smoobu, Hostaway, Hostfully, Zeevou, Newbook)`);
    console.log('All changes from yesterday and today are now ready on live database!');
    console.log('====================================================\n');

    await mongoose.disconnect();
    console.log('🔌 Disconnected cleanly from MongoDB.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Fatal error during live database seed:', error);
    process.exit(1);
  }
}

runLiveSeed();
