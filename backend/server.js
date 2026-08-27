const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
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
const ContactMessage = require('./models/ContactMessage');
const Media = require('./models/Media');
const SeoSetting = require('./models/SeoSetting');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve React build (production)
const distPath = path.join(__dirname, '../dist');
app.use(express.static(distPath));

// Connect to MongoDB (fallback to Atlas cluster if process.env.MONGO_URI is missing or pointing to local/railway internal)
const MONGO_URI = (process.env.MONGO_URI && !process.env.MONGO_URI.includes('railway.internal'))
  ? process.env.MONGO_URI
  : 'mongodb+srv://arfanahaider575_db_user:FrrDgAiykGbs3Osi@cluster0.amsegez.mongodb.net/cubixsol?appName=Cluster0';

mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
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
    const updated = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
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
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ message: 'Product not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE product
app.delete('/api/products/:id', async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
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
    const updated = await Industry.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ message: 'Industry not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE industry
app.delete('/api/industries/:id', async (req, res) => {
  try {
    const deleted = await Industry.findByIdAndDelete(req.params.id);
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
    const updated = await Solution.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ message: 'Solution not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE solution
app.delete('/api/solutions/:id', async (req, res) => {
  try {
    const deleted = await Solution.findByIdAndDelete(req.params.id);
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
    const updated = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ message: 'Project not found' });
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
      await Service.insertMany(services.map(s => ({...s, icon: typeof s.icon === 'string' ? s.icon : (s.icon?.name || s.icon?.displayName || 'Globe')})));
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
      await Industry.insertMany(industries.map(i => ({...i, icon: typeof i.icon === 'string' ? i.icon : (i.icon?.name || i.icon?.displayName || 'Briefcase')})));
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
    const [servicesCount, productsCount, industriesCount, projectsCount, solutionsCount] = await Promise.all([
      Service.countDocuments(),
      Product.countDocuments(),
      Industry.countDocuments(),
      Project.countDocuments(),
      Solution.countDocuments(),
    ]);
    res.json({ servicesCount, productsCount, industriesCount, projectsCount, solutionsCount });
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
      if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
        item = await Model.findById(req.params.id);
      } else {
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
      const item = new Model(req.body);
      const saved = await item.save();
      res.status(201).json(saved);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  app.put(`/api/${path}/:id`, async (req, res) => {
    try {
      const updated = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      if (!updated) return res.status(404).json({ message: 'Not found' });
      res.json(updated);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  app.delete(`/api/${path}/:id`, async (req, res) => {
    try {
      const deleted = await Model.findByIdAndDelete(req.params.id);
      if (!deleted) return res.status(404).json({ message: 'Not found' });
      res.json({ message: 'Deleted successfully' });
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


// Catch-all: serve React app for any non-API route (React Router support)
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
