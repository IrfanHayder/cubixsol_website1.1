const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
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
const ContactMessage = require('./models/ContactMessage');
const Media = require('./models/Media');
const SeoSetting = require('./models/SeoSetting');
const Team = require('./models/Team');
const Faq = require('./models/Faq');
const SiteSetting = require('./models/SiteSetting');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static uploaded files
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
app.use('/uploads', express.static(uploadsDir));

// Configure multer for file uploads
const multer = require('multer');
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, 'media-' + uniqueSuffix + ext);
  }
});
const upload = multer({ storage });

// Upload Endpoints
app.post('/api/upload', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file provided' });
  }
  const fileUrl = `/uploads/${req.file.filename}`;
  const mime = req.file.mimetype || '';
  const type = mime.startsWith('video/') ? 'video' : mime.startsWith('image/') ? 'image' : 'file';
  const rawTitle = (req.body.title || req.file.originalname || 'Media').replace(/\.[^/.]+$/, '');

  let mediaDoc = null;
  try {
    mediaDoc = await Media.create({
      title: rawTitle,
      url: fileUrl,
      type: req.body.type || type,
      alt: req.body.alt || rawTitle,
      size: req.file.size,
      mimetype: req.file.mimetype,
    });
  } catch (err) {
    console.error('Failed to auto-save Media record in DB:', err);
  }

  res.json({
    url: fileUrl,
    filename: req.file.filename,
    originalName: req.file.originalname,
    mimetype: req.file.mimetype,
    size: req.file.size,
    media: mediaDoc
  });
});

app.post('/api/upload/multiple', upload.array('files', 20), async (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: 'No files provided' });
  }

  const results = [];
  for (const file of req.files) {
    const fileUrl = `/uploads/${file.filename}`;
    const mime = file.mimetype || '';
    const type = mime.startsWith('video/') ? 'video' : mime.startsWith('image/') ? 'image' : 'file';
    const rawTitle = file.originalname.replace(/\.[^/.]+$/, '');

    let mediaDoc = null;
    try {
      mediaDoc = await Media.create({
        title: rawTitle,
        url: fileUrl,
        type,
        alt: rawTitle,
        size: file.size,
        mimetype: file.mimetype,
      });
    } catch (err) {
      console.error('Failed to save multi-upload Media record:', err);
    }

    results.push({
      url: fileUrl,
      filename: file.filename,
      originalName: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
      media: mediaDoc
    });
  }

  res.json({ files: results });
});

// Custom Media Delete with physical file cleanup
app.delete('/api/media/:id', async (req, res) => {
  try {
    const idParam = req.params.id;
    const isObjectId = idParam && idParam.match(/^[0-9a-fA-F]{24}$/);
    const query = isObjectId ? { _id: idParam } : { slug: idParam };
    const media = await Media.findOne(query);
    if (!media) {
      return res.status(404).json({ message: 'Media not found' });
    }

    if (media.url && media.url.startsWith('/uploads/')) {
      const filename = path.basename(media.url);
      const filePath = path.join(uploadsDir, filename);
      if (fs.existsSync(filePath)) {
        try {
          fs.unlinkSync(filePath);
        } catch (e) {
          console.warn('Could not delete physical file:', filePath, e.message);
        }
      }
    }

    await Media.deleteOne({ _id: media._id });
    res.json({ message: 'Media deleted successfully', deleted: media });
  } catch (err) {
    console.error('Error deleting media:', err);
    res.status(500).json({ message: err.message });
  }
});


const {
  initialServices,
  initialSolutions,
  initialProducts,
  initialIndustries,
} = require('./seedData');

// Connect to MongoDB & Seed Default Content if Empty
async function seedInitialData() {
  try {
    const servicesCount = await Service.countDocuments();
    if (servicesCount === 0) {
      await Service.insertMany(initialServices);
      console.log('Seeded initial Services data');
    }

    // Ensure all existing & new services have SEO objects and tech descriptions populated
    const existingServices = await Service.find();
    for (const service of existingServices) {
      let modified = false;
      if (service.slug === 'web-development' && (service.title === 'Web Development' || !service.desc.includes("Cubixsol's custom web development services"))) {
        service.title = 'Custom Web Development Services';
        service.desc = "Turn your idea into a fast, secure, and scalable digital product with Cubixsol's custom web development services. We design and develop responsive websites, e-commerce platforms, and web applications personalized to your users, business goals, and technical requirements.";
        modified = true;
      }

      if (!service.seo || !service.seo.metaTitle) {
        service.seo = {
          metaTitle: service.seo?.metaTitle || `${service.title} Services | Cubixsol`,
          metaDescription: service.seo?.metaDescription || service.desc || service.longDesc || `Expert ${service.title} services by Cubixsol. Fast, secure, and scalable solutions for startups and enterprises.`,
          keywords: service.seo?.keywords || (Array.isArray(service.tech) ? service.tech.join(', ') : 'software, web, app, cubixsol'),
          ogTitle: service.seo?.ogTitle || `${service.title} Services | Cubixsol`,
          ogDescription: service.seo?.ogDescription || service.desc || service.longDesc,
          ogImage: service.seo?.ogImage || service.heroImage || '',
          canonicalUrl: service.seo?.canonicalUrl || '',
        };
        modified = true;
      }
      if (!service.techDesc) {
        service.techTitle = service.techTitle || 'Technologies We Use';
        if (service.slug === 'web-development') {
          service.techDesc = `We select technologies according to the project’s functionality, performance requirements, integrations, and future roadmap. Our web development stack includes React, Next.js, TypeScript, Node.js, Laravel, WordPress, relational and non-relational databases, REST APIs, and AWS cloud infrastructure.\n\nThe goal is not to use the newest technology for its own sake. It is to choose a dependable stack that fits your product, supports maintainability, and avoids unnecessary technical complexity.`;
        } else {
          service.techDesc = `We select technologies according to the project’s functionality, performance requirements, integrations, and future roadmap.\n\nThe goal is not to use the newest technology for its own sake. It is to choose a dependable stack that fits your product, supports maintainability, and avoids unnecessary technical complexity.`;
        }
        modified = true;
      }
      if (!Array.isArray(service.faqs) || service.faqs.length === 0) {
        if (service.slug === 'web-development') {
          service.faqs = [
            {
              q: 'How much does custom web development cost?',
              a: 'The cost depends on the website’s size, design complexity, required features, integrations, content needs, and technology stack. A focused business website costs less than a custom portal, e-commerce platform, or SaaS application.',
            },
            {
              q: 'How long does it take to develop a custom website?',
              a: 'A focused business website may take approximately four to eight weeks, while a complex web application can require several months. The timeline depends on scope, feedback cycles, integrations, content readiness, testing requirements, and the speed of approvals.',
            },
            {
              q: 'Which technologies do you use for web development?',
              a: 'We work with technologies such as React, Next.js, TypeScript, Node.js, Laravel, WordPress, APIs, databases, and AWS. We recommend the stack after reviewing your functionality, performance requirements, existing systems, and long-term plans.',
            },
            {
              q: 'Do you provide website maintenance after launch?',
              a: 'Yes. Post-launch support can include security updates, bug fixes, performance monitoring, backups, feature improvements, content changes, and compatibility updates.',
            },
            {
              q: 'Should I choose a custom website or a template?',
              a: 'A template may work for a simple website with standard requirements and a limited budget. Custom development is the stronger choice when you need unique functionality, integrations, greater design control, scalability, or workflows that templates cannot support effectively.',
            },
          ];
          modified = true;
        }
      }
      if (!Array.isArray(service.whyChooseItems) || service.whyChooseItems.length === 0) {
        if (service.slug === 'web-development') {
          service.whyChooseTitle = 'Why Choose Cubixsol for Web Development?';
          service.whyChooseItems = [
            {
              title: 'Performance-Focused Development',
              desc: 'We use clean code, optimized assets, responsive layouts, and practical performance testing to create websites that load quickly and work smoothly across devices.',
            },
            {
              title: 'Security Built into Development',
              desc: 'We prioritize security throughout the project rather than treating it as an afterthought. We implement secure authentication, access permissions, data-handling practices, dependency management, and deployment controls based on your solution’s requirements.',
            },
            {
              title: 'SEO-Ready Foundations',
              desc: 'Your website is developed with clean structure, responsive design, crawlable content, metadata controls, and performance fundamentals. These technical foundations make it easier for your SEO strategy to produce results after launch.',
            },
            {
              title: 'Structured, Transparent Delivery',
              desc: 'Clear milestones, defined deliverables, regular progress updates, and staged reviews keep the project moving and reduce avoidable surprises. You know what is being developed, what has been completed, and what comes next.',
            },
          ];
          modified = true;
        }
      }
      if (!Array.isArray(service.serviceProcessSteps) || service.serviceProcessSteps.length === 0) {
        if (service.slug === 'web-development') {
          service.serviceProcessTitle = 'Our Web Development Process';
          service.serviceProcessSteps = [
            {
              stepNumber: '01',
              title: 'Discovery',
              desc: 'We clarify your goals, target users, technical requirements, required integrations, project scope, and measures of success.',
            },
            {
              stepNumber: '02',
              title: 'Design',
              desc: 'Our team plans the user journey, information architecture, wireframes, and interface design before development begins.',
            },
            {
              stepNumber: '03',
              title: 'Development',
              desc: 'Frontend and backend developers convert the approved designs and requirements into a functional, scalable web solution.',
            },
            {
              stepNumber: '04',
              title: 'Testing',
              desc: 'We test functionality, responsiveness, browser compatibility, accessibility, performance, integrations, and security before release.',
            },
            {
              stepNumber: '05',
              title: 'Launch and Support',
              desc: 'After deployment, we monitor the website, resolve launch issues, and provide ongoing maintenance or development support when required.',
            },
          ];
          modified = true;
        }
      }
      if (!Array.isArray(service.subServicesItems) || service.subServicesItems.length === 0) {
        if (service.slug === 'web-development') {
          service.subServicesTitle = 'Our Custom Web Development Services';
          service.subServicesIntro = 'We create websites and web applications that combine clean design, reliable technology, and practical business functionality. Every solution is built to perform across devices, support future growth, and provide a smooth experience for both users and administrators.';
          service.subServicesItems = [
            {
              title: 'Custom Websites',
              desc: 'Build a website shaped around your brand, audience, and business objectives. Our custom websites include responsive layouts, intuitive navigation, scalable architecture, content management capabilities, and integrations with the tools your team already uses.',
            },
            {
              title: 'Web Application Development Services',
              desc: 'Our **web application development services** turn complex ideas and business processes into secure, user-friendly digital products. We develop customer portals, SaaS platforms, internal dashboards, booking systems, workflow tools, and other browser-based applications with functionality customized to your requirements.',
            },
            {
              title: 'Ecommerce Web Development Services',
              desc: 'Our **ecommerce web development services** help businesses create convenient and reliable online shopping experiences. We build product catalogs, secure checkout flows, payment integrations, inventory features, customer accounts, order-management systems, and mobile-responsive storefronts designed to support conversions and growth.',
            },
            {
              title: 'Frontend Development Services with React',
              desc: 'Our **frontend development services** focus on creating fast, accessible, and responsive user interfaces. Through our **React development services**, we build reusable components, interactive features, and consistent experiences that work smoothly across modern browsers, screen sizes, and devices.',
            },
            {
              title: 'Backend Development Services and APIs',
              desc: 'Our **backend development services** provide the secure foundation behind your website or application. We develop databases, APIs, authentication systems, business logic, third-party integrations, and administrative tools that keep your platform reliable, maintainable, and ready to scale.',
            },
            {
              title: 'CMS Development',
              desc: 'Manage your website without relying on a developer for every content update. We build and customize WordPress, headless CMS, and other content-management solutions that give your team control while preserving performance, security, and design consistency.',
            },
          ];
          modified = true;
        }
      }
      if (modified) {
        await service.save();
      }
    }

    const solutionsCount = await Solution.countDocuments();
    if (solutionsCount === 0) {
      await Solution.insertMany(initialSolutions);
      console.log('Seeded initial Solutions data');
    }

    const productsCount = await Product.countDocuments();
    if (productsCount === 0) {
      await Product.insertMany(initialProducts);
      console.log('Seeded initial Products data');
    }

    const industriesCount = await Industry.countDocuments();
    if (industriesCount === 0) {
      await Industry.insertMany(initialIndustries);
      console.log('Seeded initial Industries data');
    }

    const projectsCount = await Project.countDocuments();
    if (projectsCount === 0) {
      await Project.insertMany([
        { title: 'HomeHub', category: 'Web Development', desc: 'A real estate platform for buying, renting and selling properties with advanced search.', tag: 'Web Development', color: 'from-slate-800 to-slate-950' },
        { title: 'TaskFlow SaaS', category: 'SaaS', desc: 'A comprehensive project management SaaS for teams to plan, collaborate and deliver.', tag: 'SaaS', color: 'from-indigo-500 to-blue-600' },
        { title: 'Pawfect Foods', category: 'E-Commerce', desc: 'An e-commerce store for premium pet food and accessories with seamless shopping.', tag: 'E-Commerce', color: 'from-amber-200 to-orange-300' },
        { title: 'FinGo Mobile App', category: 'Mobile Apps', desc: 'A personal finance app for budgeting, tracking expenses and achieving financial goals.', tag: 'Mobile Apps', color: 'from-blue-600 to-cyan-500' },
        { title: 'InsightAI', category: 'AI Solutions', desc: 'AI-powered analytics platform that transforms data into actionable business insights.', tag: 'AI Solutions', color: 'from-slate-900 to-purple-950' },
        { title: 'MediCare Plus', category: 'Web Development', desc: 'A healthcare platform connecting patients with doctors and managing appointments.', tag: 'Healthcare', color: 'from-sky-100 to-blue-200' },
      ]);
      console.log('Seeded initial Projects data');
    }

    const teamCount = await Team.countDocuments();
    if (teamCount === 0) {
      await Team.insertMany([
        { name: 'Fahad Nadeem', role: 'CEO & Founder' },
        { name: 'Usman Tariq', role: 'CTO' },
        { name: 'Ayesha Khan', role: 'UI/UX Director' },
        { name: 'Abdul Rehman', role: 'Lead Developer' },
        { name: 'Hina Batool', role: 'Project Manager' },
      ]);
      console.log('Seeded initial Team data');
    }

    const faqCount = await Faq.countDocuments();
    if (faqCount === 0) {
      await Faq.insertMany([
        { q: 'How quickly will you respond to my inquiry?', a: 'We typically respond to all inquiries within 24 business hours. Urgent requests get prioritized the same day.' },
        { q: 'Do you offer free consultations?', a: 'Yes. We offer a free, no-obligation consultation to discuss goals, timeline, and whether we are the right fit.' },
        { q: 'Which engagement model should I choose?', a: 'If scope is clear, project-based works best. For ongoing product work, dedicated teams or staff augmentation are usually more efficient. We help you pick during the discovery call.' },
        { q: 'What does a typical timeline look like?', a: 'MVPs often ship in 6–12 weeks. Larger platforms take longer and are broken into milestones so you see progress early.' },
        { q: 'Can you help with ongoing support after delivery?', a: 'Yes. We offer maintenance and support packages — bug fixes, performance monitoring, and feature iterations.' },
        { q: 'Do you work with startups and enterprises?', a: 'Both. We have helped early-stage founders launch MVPs and larger teams scale existing products with dedicated squads.' },
      ]);
      console.log('Seeded initial FAQs data');
    }

    const testCount = await Testimonial.countDocuments();
    if (testCount === 0) {
      await Testimonial.insertMany([
        { quote: 'Cubixsol felt less like a vendor and more like an extension of our own team. They shipped fast without cutting corners on quality.', name: 'Sarah Malik', role: 'Founder, HomeHub' },
        { quote: 'Their AI automation work cut our manual ops time by 40%. Communication was clear from kickoff to launch.', name: 'James Carter', role: 'COO, TaskFlow SaaS' },
        { quote: 'We came in with a rough idea and left with a polished, scalable product. The Cubixsol team asked the right questions early on.', name: 'Ayesha Raza', role: 'CEO, Pawfect Foods' },
        { quote: 'On-time, on-budget, and genuinely invested in our growth. Our conversion rate jumped within weeks of launch.', name: 'Daniel Osei', role: 'Marketing Director, FinGo' },
      ]);
      console.log('Seeded initial Testimonials data');
    }
  } catch (err) {
    console.error('Error seeding initial data:', err);
  }
}

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected successfully');
    seedInitialData();
  })
  .catch(err => console.error('MongoDB connection error:', err));

// =============================================
// SERVICES CRUD
// =============================================

// GET all services
app.get('/api/services', async (req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET single service
app.get('/api/services/:slug', async (req, res) => {
  try {
    const service = await Service.findOne({ slug: req.params.slug });
    if (!service) return res.status(404).json({ message: 'Service not found' });
    res.json(service);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create service
app.post('/api/services', async (req, res) => {
  try {
    const service = new Service(req.body);
    const saved = await service.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update service
app.put('/api/services/:id', async (req, res) => {
  try {
    const data = { ...req.body };
    delete data._id;
    delete data.__v;
    const idParam = req.params.id;
    const isObjectId = idParam && idParam.match(/^[0-9a-fA-F]{24}$/);
    const query = isObjectId ? { _id: idParam } : { slug: data.slug || idParam };
    const updated = await Service.findOneAndUpdate(query, { $set: data }, { new: true, runValidators: false, upsert: false });
    if (!updated) return res.status(404).json({ message: 'Service not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE service
app.delete('/api/services/:id', async (req, res) => {
  try {
    const deleted = await Service.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Service not found' });
    res.json({ message: 'Service deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// =============================================
// PRODUCTS CRUD
// =============================================

// GET all products
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET single product
app.get('/api/products/:slug', async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create product
app.post('/api/products', async (req, res) => {
  try {
    const product = new Product(req.body);
    const saved = await product.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update product
app.put('/api/products/:id', async (req, res) => {
  try {
    const data = { ...req.body };
    delete data._id; delete data.__v;
    const idParam = req.params.id;
    const isObjectId = idParam && idParam.match(/^[0-9a-fA-F]{24}$/);
    const query = isObjectId ? { _id: idParam } : { slug: data.slug || idParam };
    const updated = await Product.findOneAndUpdate(query, { $set: data }, { new: true, runValidators: false, upsert: false });
    if (!updated) return res.status(404).json({ message: 'Product not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE product
app.delete('/api/products/:id', async (req, res) => {
  try {
    const idParam = req.params.id;
    const isObjectId = idParam && idParam.match(/^[0-9a-fA-F]{24}$/);
    const deleted = isObjectId
      ? await Product.findByIdAndDelete(idParam)
      : await Product.findOneAndDelete({ slug: idParam });
    if (!deleted) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// =============================================
// INDUSTRIES CRUD
// =============================================

// GET all industries
app.get('/api/industries', async (req, res) => {
  try {
    const industries = await Industry.find().sort({ createdAt: -1 });
    res.json(industries);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET single industry
app.get('/api/industries/:slug', async (req, res) => {
  try {
    const industry = await Industry.findOne({ slug: req.params.slug });
    if (!industry) return res.status(404).json({ message: 'Industry not found' });
    res.json(industry);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create industry
app.post('/api/industries', async (req, res) => {
  try {
    const industry = new Industry(req.body);
    const saved = await industry.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update industry
app.put('/api/industries/:id', async (req, res) => {
  try {
    const data = { ...req.body };
    delete data._id; delete data.__v;
    const idParam = req.params.id;
    const isObjectId = idParam && idParam.match(/^[0-9a-fA-F]{24}$/);
    const query = isObjectId ? { _id: idParam } : { slug: data.slug || idParam };
    const updated = await Industry.findOneAndUpdate(query, { $set: data }, { new: true, runValidators: false, upsert: false });
    if (!updated) return res.status(404).json({ message: 'Industry not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE industry
app.delete('/api/industries/:id', async (req, res) => {
  try {
    const idParam = req.params.id;
    const isObjectId = idParam && idParam.match(/^[0-9a-fA-F]{24}$/);
    const deleted = isObjectId
      ? await Industry.findByIdAndDelete(idParam)
      : await Industry.findOneAndDelete({ slug: idParam });
    if (!deleted) return res.status(404).json({ message: 'Industry not found' });
    res.json({ message: 'Industry deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// =============================================
// SOLUTIONS CRUD
// =============================================

// GET all solutions
app.get('/api/solutions', async (req, res) => {
  try {
    const solutions = await Solution.find().sort({ createdAt: -1 });
    res.json(solutions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET single solution
app.get('/api/solutions/:slug', async (req, res) => {
  try {
    const solution = await Solution.findOne({ slug: req.params.slug });
    if (!solution) return res.status(404).json({ message: 'Solution not found' });
    res.json(solution);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create solution
app.post('/api/solutions', async (req, res) => {
  try {
    const solution = new Solution(req.body);
    const saved = await solution.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update solution
app.put('/api/solutions/:id', async (req, res) => {
  try {
    const data = { ...req.body };
    delete data._id; delete data.__v;
    const idParam = req.params.id;
    const isObjectId = idParam && idParam.match(/^[0-9a-fA-F]{24}$/);
    const query = isObjectId ? { _id: idParam } : { slug: data.slug || idParam };
    const updated = await Solution.findOneAndUpdate(query, { $set: data }, { new: true, runValidators: false, upsert: false });
    if (!updated) return res.status(404).json({ message: 'Solution not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE solution
app.delete('/api/solutions/:id', async (req, res) => {
  try {
    const idParam = req.params.id;
    const isObjectId = idParam && idParam.match(/^[0-9a-fA-F]{24}$/);
    const deleted = isObjectId
      ? await Solution.findByIdAndDelete(idParam)
      : await Solution.findOneAndDelete({ slug: idParam });
    if (!deleted) return res.status(404).json({ message: 'Solution not found' });
    res.json({ message: 'Solution deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// =============================================
// PROJECTS CRUD
// =============================================

// GET all projects
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET single project
app.get('/api/projects/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create project
app.post('/api/projects', async (req, res) => {
  try {
    const project = new Project(req.body);
    const saved = await project.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update project
app.put('/api/projects/:id', async (req, res) => {
  try {
    const data = { ...req.body };
    delete data._id; delete data.__v;
    const idParam = req.params.id;
    const isObjectId = idParam && idParam.match(/^[0-9a-fA-F]{24}$/);
    const query = isObjectId ? { _id: idParam } : { slug: data.slug || idParam };
    const updated = await Project.findOneAndUpdate(query, { $set: data }, { new: true, runValidators: false, upsert: false });
    if (!updated) {
      // Projects may not have slugs — fallback to create
      const newItem = new Project(data);
      const saved = await newItem.save();
      return res.json(saved);
    }
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE project
app.delete('/api/projects/:id', async (req, res) => {
  try {
    const deleted = await Project.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Project not found' });
    res.json({ message: 'Project deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// =============================================
// SEED ROUTE (bulk import)
// =============================================
app.post('/api/seed', async (req, res) => {
  try {
    const { services, projects, products, solutions, industries } = req.body;

    if (services && services.length > 0) {
      await Service.deleteMany({});
      await Service.insertMany(services.map(s => ({ ...s, icon: typeof s.icon === 'string' ? s.icon : (s.icon?.name || s.icon?.displayName || 'Globe') })));
    }
    if (projects && projects.length > 0) {
      await Project.deleteMany({});
      await Project.insertMany(projects);
    }
    if (products && products.length > 0) {
      await Product.deleteMany({});
      await Product.insertMany(products);
    }
    if (solutions && solutions.length > 0) {
      await Solution.deleteMany({});
      await Solution.insertMany(solutions);
    }
    if (industries && industries.length > 0) {
      await Industry.deleteMany({});
      await Industry.insertMany(industries.map(i => ({ ...i, icon: typeof i.icon === 'string' ? i.icon : (i.icon?.name || i.icon?.displayName || 'Briefcase') })));
    }

    res.json({ message: 'Database seeded successfully!' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// =============================================
// STATS ROUTE (for admin dashboard)
// =============================================
app.get('/api/stats', async (req, res) => {
  try {
    const [
      blogsCount,
      servicesCount,
      productsCount,
      industriesCount,
      projectsCount,
      solutionsCount,
      messagesCount,
    ] = await Promise.all([
      Blog.countDocuments(),
      Service.countDocuments(),
      Product.countDocuments(),
      Industry.countDocuments(),
      Project.countDocuments(),
      Solution.countDocuments(),
      ContactMessage.countDocuments(),
    ]);
    res.json({
      blogsCount,
      servicesCount,
      productsCount,
      industriesCount,
      projectsCount,
      solutionsCount,
      messagesCount,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// =============================================
// GENERIC CRUD HELPER
// =============================================
function registerCrud(app, path, Model, sortField = 'createdAt') {
  app.get(`/api/${path}`, async (req, res) => {
    try {
      const items = await Model.find().sort({ [sortField]: -1 });
      res.json(items);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  app.get(`/api/${path}/:id`, async (req, res) => {
    try {
      let item = null;
      if (req.params.id && req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
        item = await Model.findById(req.params.id);
      }
      if (!item && req.params.id && req.params.id !== 'undefined') {
        item = await Model.findOne({ slug: req.params.id });
      }
      if (!item) return res.status(404).json({ message: 'Not found' });
      res.json(item);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  app.post(`/api/${path}`, async (req, res) => {
    try {
      const data = { ...req.body };
      delete data._id;
      delete data.createdAt;
      delete data.updatedAt;
      delete data.__v;

      let item;
      if (data.slug) {
        item = await Model.findOneAndUpdate({ slug: data.slug }, { $set: data }, { upsert: true, new: true, runValidators: false });
      } else {
        item = new Model(data);
        await item.save();
      }
      res.status(201).json(item);
    } catch (err) {
      console.error(`POST /api/${path} error:`, err);
      res.status(400).json({ message: err.message });
    }
  });
  app.put(`/api/${path}/:id`, async (req, res) => {
    try {
      const idParam = req.params.id;
      const data = { ...req.body };
      delete data._id;
      delete data.createdAt;
      delete data.updatedAt;
      delete data.__v;

      const isObjectId = idParam && idParam.match(/^[0-9a-fA-F]{24}$/);
      let query = isObjectId ? { _id: idParam } : null;

      if (!query && data.slug) {
        query = { slug: data.slug };
      } else if (!query && idParam && idParam !== 'undefined') {
        query = { slug: idParam };
      }

      let updated = null;
      if (query) {
        // Use $set so existing fields are merged, not replaced
        updated = await Model.findOneAndUpdate(query, { $set: data }, { new: true, runValidators: false });
      }

      if (!updated) {
        const targetSlug = data.slug || (idParam !== 'undefined' ? idParam : null);
        if (targetSlug) {
          updated = await Model.findOneAndUpdate({ slug: targetSlug }, { $set: data }, { upsert: true, new: true, runValidators: false });
        } else {
          updated = new Model(data);
          await updated.save();
        }
      }

      res.json(updated);
    } catch (err) {
      console.error(`PUT /api/${path}/${req.params.id} error:`, err);
      res.status(400).json({ message: err.message });
    }
  });
  app.delete(`/api/${path}/:id`, async (req, res) => {
    try {
      const idParam = req.params.id;
      const isObjectId = idParam && idParam.match(/^[0-9a-fA-F]{24}$/);
      const query = isObjectId ? { _id: idParam } : { slug: idParam };
      const deleted = await Model.findOneAndDelete(query);
      res.json({ message: 'Deleted successfully', deleted });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
}

registerCrud(app, 'blogs', Blog);
registerCrud(app, 'categories', Category);
registerCrud(app, 'tags', Tag);
registerCrud(app, 'authors', Author);
registerCrud(app, 'testimonials', Testimonial);
registerCrud(app, 'careers', Career);
registerCrud(app, 'messages', ContactMessage);
registerCrud(app, 'media', Media);
registerCrud(app, 'seo', SeoSetting);
registerCrud(app, 'services', Service);
registerCrud(app, 'projects', Project);
registerCrud(app, 'products', Product);
registerCrud(app, 'solutions', Solution);
registerCrud(app, 'industries', Industry);
registerCrud(app, 'teams', Team);
registerCrud(app, 'faqs', Faq);
registerCrud(app, 'settings', SiteSetting);

// Key-Value Site Settings Endpoints
app.get('/api/site-settings/:key', async (req, res) => {
  try {
    const setting = await SiteSetting.findOne({ key: req.params.key });
    res.json(setting ? setting.value : null);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/site-settings/:key', async (req, res) => {
  try {
    const updated = await SiteSetting.findOneAndUpdate(
      { key: req.params.key },
      { key: req.params.key, value: req.body.value },
      { upsert: true, returnDocument: 'after' }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Fallback 404 handler for any unhandled /api routes (guarantees JSON response, never HTML)
app.use('/api', (req, res) => {
  res.status(404).json({ message: `API endpoint ${req.originalUrl} not found` });
});

// Serve static frontend files in production (or if dist folder exists)
const distPath = path.join(__dirname, '../dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.get(/.*/, (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

