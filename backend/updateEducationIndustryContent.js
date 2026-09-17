const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const Industry = require('./models/Industry');

async function updateEducationContent() {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/cubixsol';
    console.log('Connecting to MongoDB:', mongoUri);
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB successfully.');

    const educationData = {
      slug: 'education',
      title: 'Education',
      heroTitle: 'Software Development Company for Modern Education',
      icon: 'GraduationCap',
      short: 'Cubixsol is an education software development company that creates digital platforms for schools, universities, training providers, and education businesses. We build secure learning ecosystems, custom LMS platforms, student management solutions, and interactive education applications that improve teaching efficiency and learner engagement.',
      desc: 'Cubixsol is an education software development company that creates digital platforms for schools, universities, training providers, and education businesses. We build secure learning ecosystems, custom LMS platforms, student management solutions, and interactive education applications that improve teaching efficiency and learner engagement.',
      ctaPrimaryText: 'Get a Free Proposal',
      ctaPrimaryLink: '#estimate',
      ctaSecondaryText: 'Build Your Education Solution',
      ctaSecondaryLink: '/contact',
      ctaBannerButtonText: 'Start Your Education Software Project Today',
      ctaBannerButtonLink: '/contact',
      ctaBannerSecondaryButtonText: 'Get a Free Proposal',
      ctaBannerSecondaryButtonLink: '#estimate',
      points: [
        'LMS Development & Virtual Classrooms',
        'eLearning Platform & Course Management',
        'FERPA-Aware Data Privacy & WCAG Compliance',
        'Student Portals & Academic Analytics',
      ],
      trustPills: [
        'FERPA & COPPA Compliant',
        'WCAG 2.1 AA Accessibility',
        'LTI & xAPI Interoperable',
        'Scalable Cloud Architecture',
      ],
      solutionsTitle: 'Education Software We Build',
      solutionsSubtitle: 'We develop secure, reliable, and user-friendly education software solutions that simplify academic workflows and enhance digital learning.',
      solutionsItems: [
        {
          title: 'LMS Development',
          body: 'Cubixsol provides LMS development services for schools, universities, and training organisations that need complete control over digital learning environments. We develop custom LMS platforms with course management, student tracking, assessments, reporting dashboards, and collaboration features.',
        },
        {
          title: 'eLearning Platform Development',
          body: 'Our eLearning software development solutions help businesses and institutions deliver engaging online education experiences. We create platforms with interactive lessons, video learning, quizzes, certifications, and personalised learning paths that improve knowledge delivery.',
        },
        {
          title: 'Student Portals and Learning Dashboards',
          body: 'We build student portals that provide easy access to courses, assignments, grades, schedules, and communication tools. Educators and learners receive dedicated dashboards that improve visibility and simplify academic interactions.',
        },
        {
          title: 'EdTech Software Solutions',
          body: 'Cubixsol delivers edtech software development services for startups and established education companies. We create innovative platforms such as virtual classrooms, AI-powered learning tools, tutoring systems, and education marketplaces.',
        },
      ],
      workAreasTitle: 'Use Cases & Examples',
      workAreas: [
        {
          title: 'Online Course Platforms',
          body: 'We create online course platforms that allow educators and organisations to publish content, manage learners, conduct assessments, and track progress through a centralised system.',
        },
        {
          title: 'University Learning Management Systems',
          body: 'Higher education institutions can use custom LMS solutions to manage courses, virtual classrooms, assignments, grading, and student engagement across multiple departments.',
        },
        {
          title: 'Corporate Training Platforms',
          body: 'Organisations can launch employee learning platforms with certification programs, skill tracking, and professional development resources.',
        },
      ],
      approachTitle: 'Built for Education Standards',
      approachSubtitle: 'Cubixsol develops education platforms with security, accessibility, and compliance requirements',
      approachItems: [
        {
          title: 'FERPA-Aware Data Protection',
          subtitle: 'Cubixsol creates education platforms with privacy-focused architecture designed around academic compliance.',
          points: [
            { heading: 'Access Controls', text: 'We develop systems with secure access controls to protect educational records.' },
            { heading: 'Role-Based Permissions', text: 'Our platforms support role-based permissions for students, teachers, and administrators.' },
            { heading: 'Privacy Management', text: 'We follow privacy-focused practices for managing sensitive academic information.' },
          ],
        },
        {
          title: 'WCAG Accessibility Compliance',
          subtitle: 'Cubixsol builds inclusive digital learning interfaces that serve all students.',
          points: [
            { heading: 'Universal Interfaces', text: 'We create accessible interfaces that support diverse learner requirements.' },
            { heading: 'Adaptable Structures', text: 'Our platforms include user-friendly navigation and adaptable content structures.' },
            { heading: 'Continuous Auditing', text: 'We consider accessibility standards throughout the design and development process.' },
          ],
        },
        {
          title: 'Student Data Privacy & Security',
          subtitle: 'We implement robust protections for learner privacy and communications.',
          points: [
            { heading: 'Encrypted Storage', text: 'We protect student information through secure data storage and communication practices.' },
            { heading: 'Minor Privacy Controls', text: 'Our solutions support privacy controls for managing minors\' educational data.' },
            { heading: 'Safe Environments', text: 'We build trusted platforms that promote safe digital learning environments.' },
          ],
        },
        {
          title: 'Secure & Reliable Education Infrastructure',
          subtitle: 'High-availability cloud architectures built for campus-wide scale.',
          points: [
            { heading: 'Scalable Scaling', text: 'We develop scalable platforms that support growing users and learning content.' },
            { heading: 'Tool Integrations', text: 'Our solutions integrate securely with third-party education tools and services.' },
            { heading: 'Long-Term Reliability', text: 'We provide reliable architectures designed for long-term performance.' },
          ],
        },
      ],
      ctaTitle: 'Ready to Build Your Education Software Solution?',
      ctaDesc: 'Partner with our team to transform your education idea into a secure and user-focused solution.',
      faqs: [
        {
          q: 'How much does education software development cost?',
          a: 'The cost of education software development depends on platform complexity, required features, integrations, user capacity, and technology choices. A basic learning platform requires fewer resources compared with a complete LMS or school management ecosystem.',
        },
        {
          q: 'How long does it take to build an education platform?',
          a: 'Development timelines vary based on project scope and functionality. A simple education application may take a few months, while advanced platforms with custom features and integrations require additional development time.',
        },
        {
          q: 'What is the difference between an LMS and custom education software?',
          a: 'An LMS mainly focuses on managing courses, learners, assessments, and educational content. Custom education software can include broader functionality such as school administration, AI learning tools, marketplaces, and specialised workflows.',
        },
        {
          q: 'Can Cubixsol integrate existing education systems?',
          a: 'Yes, education platforms can connect with existing tools such as payment systems, student databases, video conferencing solutions, authentication systems, and third-party educational services.',
        },
        {
          q: 'Do you build accessible education platforms?',
          a: 'Yes, Cubixsol develops education solutions with accessibility considerations based on modern standards such as WCAG guidelines to create better experiences for all learners.',
        },
      ],
    };

    // Update in MongoDB
    const updated = await Industry.findOneAndUpdate(
      { slug: 'education' },
      { $set: educationData },
      { upsert: true, new: true }
    );
    console.log('✓ Education industry document updated in MongoDB:', updated._id);

    // Sync to backend/seedData.json
    const seedJsonPath = path.join(__dirname, 'seedData.json');
    if (fs.existsSync(seedJsonPath)) {
      try {
        const raw = fs.readFileSync(seedJsonPath, 'utf8');
        const seed = JSON.parse(raw);
        if (Array.isArray(seed.industries)) {
          const idx = seed.industries.findIndex((i) => i.slug === 'education');
          if (idx >= 0) {
            seed.industries[idx] = { ...seed.industries[idx], ...educationData };
          } else {
            seed.industries.push(educationData);
          }
          fs.writeFileSync(seedJsonPath, JSON.stringify(seed, null, 2), 'utf8');
          console.log('✓ Synced education content to backend/seedData.json');
        }
      } catch (e) {
        console.error('Error updating seedData.json:', e);
      }
    }

    await mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
  } catch (err) {
    console.error('Error updating education industry content:', err);
    process.exit(1);
  }
}

updateEducationContent();
