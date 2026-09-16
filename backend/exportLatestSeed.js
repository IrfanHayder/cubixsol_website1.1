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

function cleanDoc(doc) {
  if (!doc) return doc;
  const obj = JSON.parse(JSON.stringify(doc));
  delete obj._id;
  delete obj.__v;
  delete obj.createdAt;
  delete obj.updatedAt;

  // Clean sub-array items if they have _id
  for (const key of Object.keys(obj)) {
    if (Array.isArray(obj[key])) {
      obj[key] = obj[key].map((item) => {
        if (item && typeof item === 'object' && !Array.isArray(item)) {
          delete item._id;
          delete item.__v;
          delete item.createdAt;
          delete item.updatedAt;
        }
        return item;
      });
    }
  }
  return obj;
}

async function exportSeed() {
  try {
    const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/cubixsol';
    console.log('Connecting to MongoDB:', mongoUri);
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB.');

    // Fetch all latest collections from current live/cloud DB
    const services = (await Service.find().sort({ title: 1 })).map(cleanDoc);
    const solutions = (await Solution.find().sort({ title: 1 })).map(cleanDoc);
    const products = (await Product.find().sort({ name: 1 })).map(cleanDoc);
    const industries = (await Industry.find().sort({ title: 1 })).map(cleanDoc);
    const projects = (await Project.find().sort({ title: 1 })).map(cleanDoc);
    const team = (await Team.find().sort({ name: 1 })).map(cleanDoc);
    const faqs = (await Faq.find()).map(cleanDoc);
    const testimonials = (await Testimonial.find()).map(cleanDoc);
    const blogs = (await Blog.find().sort({ date: -1 })).map(cleanDoc);
    const authors = (await Author.find()).map(cleanDoc);
    const categories = (await Category.find()).map(cleanDoc);
    const tags = (await Tag.find()).map(cleanDoc);
    const careers = (await Career.find()).map(cleanDoc);
    const siteSettings = (await SiteSetting.find()).map(cleanDoc);
    const seoSettings = (await SeoSetting.find()).map(cleanDoc);
    const pages = (await PageContent.find().sort({ slug: 1 })).map(cleanDoc);
    const contactInfo = (await ContactInfo.find().sort({ order: 1 })).map(cleanDoc);
    const media = (await Media.find().sort({ createdAt: -1 })).map(cleanDoc);

    const fullData = {
      initialServices: services,
      initialSolutions: solutions,
      initialProducts: products,
      initialIndustries: industries,
      initialProjects: projects,
      initialTeam: team,
      initialFaqs: faqs,
      initialTestimonials: testimonials,
      initialBlogs: blogs,
      initialAuthors: authors,
      initialCategories: categories,
      initialTags: tags,
      initialCareers: careers,
      initialSiteSettings: siteSettings,
      initialSeoSettings: seoSettings,
      initialPages: pages,
      initialContactInfo: contactInfo,
      initialMedia: media,
    };

    // Save JSON version for ultra-fast light reading
    const seedJsonPath = path.join(__dirname, 'seedData.json');
    fs.writeFileSync(seedJsonPath, JSON.stringify(fullData, null, 2), 'utf-8');

    // Save JS version for standard server imports
    const fileContent = `// Auto-generated complete seed data from live MongoDB database
const data = require('./seedData.json');

module.exports = {
  initialServices: data.initialServices || [],
  initialSolutions: data.initialSolutions || [],
  initialProducts: data.initialProducts || [],
  initialIndustries: data.initialIndustries || [],
  initialProjects: data.initialProjects || [],
  initialTeam: data.initialTeam || [],
  initialFaqs: data.initialFaqs || [],
  initialTestimonials: data.initialTestimonials || [],
  initialBlogs: data.initialBlogs || [],
  initialAuthors: data.initialAuthors || [],
  initialCategories: data.initialCategories || [],
  initialTags: data.initialTags || [],
  initialCareers: data.initialCareers || [],
  initialSiteSettings: data.initialSiteSettings || [],
  initialSeoSettings: data.initialSeoSettings || [],
  initialPages: data.initialPages || [],
  initialContactInfo: data.initialContactInfo || [],
  initialMedia: data.initialMedia || [],
};
`;

    const seedPath = path.join(__dirname, 'seedData.js');
    fs.writeFileSync(seedPath, fileContent, 'utf-8');
    console.log(`Successfully updated ${seedPath} and ${seedJsonPath} with all latest MongoDB data!`);
    console.log(`- Services: ${services.length}`);
    console.log(`- Industries: ${industries.length}`);
    console.log(`- Pages: ${pages.length}`);
    console.log(`- Contact Info: ${contactInfo.length}`);
    console.log(`- Solutions: ${solutions.length}`);
    console.log(`- Products: ${products.length}`);
    console.log(`- Blogs: ${blogs.length}`);
    console.log(`- Media: ${media.length}`);

    await mongoose.disconnect();
    console.log('Done.');
  } catch (err) {
    console.error('Export error:', err);
    process.exit(1);
  }
}

exportSeed();
