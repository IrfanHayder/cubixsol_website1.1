const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const Project = require('./models/Project');

const projectsData = JSON.parse(fs.readFileSync(path.join(__dirname, 'seedData.json'), 'utf8')).initialProjects || [];

async function seedProjects() {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/cubixsol';
    console.log('Connecting to MongoDB:', mongoUri);
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB.');

    // Delete existing projects and insert new 49 projects
    await Project.deleteMany({});
    console.log('Cleared existing projects in MongoDB.');

    const inserted = await Project.insertMany(projectsData);
    console.log(`✓ Successfully seeded ${inserted.length} projects in MongoDB.`);

    await mongoose.disconnect();
    console.log('Done.');
  } catch (err) {
    console.error('Error seeding projects:', err);
    process.exit(1);
  }
}

if (require.main === module) {
  seedProjects();
}

module.exports = { projectsData, seedProjects };
