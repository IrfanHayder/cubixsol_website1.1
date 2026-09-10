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

    // 1. Sync & ensure the 8 industries have their updated clean descriptions
    const industriesUpdateMap = {
      healthcare: {
        short: 'Our healthcare software development services cover patient portals, telehealth platforms, clinical workflows, healthcare applications, data integrations, and secure administrative systems.',
        desc: 'Our **healthcare software development services** cover patient portals, telehealth platforms, clinical workflows, healthcare applications, data integrations, and secure administrative systems.',
      },
      saas: {
        short: 'As a results-focused SaaS development company, Cubixsol builds subscription platforms, multi-tenant applications, customer dashboards, billing systems, and scalable cloud-based products.',
        desc: 'As a results-focused **SaaS development company**, Cubixsol builds subscription platforms, multi-tenant applications, customer dashboards, billing systems, and scalable cloud-based products.',
      },
      fintech: {
        short: 'Our fintech software development team creates secure payment platforms, financial dashboards, digital wallets, lending applications, and automated financial workflows.',
        desc: 'Our **fintech software development** team creates secure payment platforms, financial dashboards, digital wallets, lending applications, and automated financial workflows.',
      },
      logistics: {
        short: 'Through our logistics software development expertise, we build fleet management platforms, shipment tracking systems, warehouse tools, route-planning applications, and supply-chain dashboards.',
        desc: 'Through our **logistics software development** expertise, we build fleet management platforms, shipment tracking systems, warehouse tools, route-planning applications, and supply-chain dashboards.',
      },
      'real-estate': {
        short: 'Our real estate software development services support property portals, listing platforms, CRM systems, tenant applications, property management tools, and virtual viewing experiences.',
        desc: 'Our **real estate software development** services support property portals, listing platforms, CRM systems, tenant applications, property management tools, and virtual viewing experiences.',
      },
      education: {
        short: 'With our education software development services, institutions and education businesses can launch learning platforms, student portals, assessment tools, virtual classrooms, and administrative systems.',
        desc: 'With our **education software development** services, institutions and education businesses can launch learning platforms, student portals, assessment tools, virtual classrooms, and administrative systems.',
      },
      ecommerce: {
        short: 'Our ecommerce development services help retailers build fast online stores, multivendor marketplaces, inventory systems, checkout experiences, and integrations with payment and fulfilment platforms.',
        desc: 'Our **ecommerce development services** help retailers build fast online stores, multivendor marketplaces, inventory systems, checkout experiences, and integrations with payment and fulfilment platforms.',
      },
      travel: {
        short: 'As an experienced travel software development company, we create booking platforms, reservation systems, itinerary tools, travel portals, mobile applications, and third-party service integrations.',
        desc: 'As an experienced **travel software development company**, we create booking platforms, reservation systems, itinerary tools, travel portals, mobile applications, and third-party service integrations.',
      },
    };

    for (const [slug, data] of Object.entries(industriesUpdateMap)) {
      await Industry.updateOne({ slug }, { $set: data });
    }

    // 2. Fetch all latest collections
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

    const fileContent = `// Auto-generated complete seed data from live MongoDB database
const initialServices = ${JSON.stringify(services, null, 2)};

const initialSolutions = ${JSON.stringify(solutions, null, 2)};

const initialProducts = ${JSON.stringify(products, null, 2)};

const initialIndustries = ${JSON.stringify(industries, null, 2)};

const initialProjects = ${JSON.stringify(projects, null, 2)};

const initialTeam = ${JSON.stringify(team, null, 2)};

const initialFaqs = ${JSON.stringify(faqs, null, 2)};

const initialTestimonials = ${JSON.stringify(testimonials, null, 2)};

const initialBlogs = ${JSON.stringify(blogs, null, 2)};

const initialAuthors = ${JSON.stringify(authors, null, 2)};

const initialCategories = ${JSON.stringify(categories, null, 2)};

const initialTags = ${JSON.stringify(tags, null, 2)};

const initialCareers = ${JSON.stringify(careers, null, 2)};

const initialSiteSettings = ${JSON.stringify(siteSettings, null, 2)};

const initialSeoSettings = ${JSON.stringify(seoSettings, null, 2)};

const initialPages = ${JSON.stringify(pages, null, 2)};

const initialContactInfo = ${JSON.stringify(contactInfo, null, 2)};

module.exports = {
  initialServices,
  initialSolutions,
  initialProducts,
  initialIndustries,
  initialProjects,
  initialTeam,
  initialFaqs,
  initialTestimonials,
  initialBlogs,
  initialAuthors,
  initialCategories,
  initialTags,
  initialCareers,
  initialSiteSettings,
  initialSeoSettings,
  initialPages,
  initialContactInfo,
};
`;

    const seedPath = path.join(__dirname, 'seedData.js');
    fs.writeFileSync(seedPath, fileContent, 'utf-8');
    console.log(`Successfully updated ${seedPath} with all latest MongoDB data!`);
    console.log(`- Services: ${services.length}`);
    console.log(`- Industries: ${industries.length}`);
    console.log(`- Pages: ${pages.length}`);
    console.log(`- Contact Info: ${contactInfo.length}`);
    console.log(`- Solutions: ${solutions.length}`);
    console.log(`- Products: ${products.length}`);
    console.log(`- Blogs: ${blogs.length}`);

    await mongoose.disconnect();
    console.log('Done.');
  } catch (err) {
    console.error('Export error:', err);
    process.exit(1);
  }
}

exportSeed();
