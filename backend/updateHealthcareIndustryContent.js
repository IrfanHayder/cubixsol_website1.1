const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const Industry = require('./models/Industry');

async function updateHealthcareContent() {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/cubixsol';
    console.log('Connecting to MongoDB:', mongoUri);
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB successfully.');

    const healthcareData = {
      slug: 'healthcare',
      title: 'Healthcare',
      heroTitle: 'Healthcare Software Development Services',
      icon: 'Activity',
      short: 'Cubixsol builds healthcare software that helps patients access care and gives clinical teams simpler ways to manage daily tasks. Our healthcare software development services cover patient portals, appointment scheduling, telehealth, and internal tools, with privacy, usability, and reliable integrations built into the project plan.',
      desc: 'Cubixsol builds healthcare software that helps patients access care and gives clinical teams simpler ways to manage daily tasks. Our healthcare software development services cover patient portals, appointment scheduling, telehealth, and internal tools, with privacy, usability, and reliable integrations built into the project plan.',
      ctaPrimaryText: 'Discuss your project',
      ctaPrimaryLink: '/contact',
      ctaSecondaryText: 'Get a proposal',
      ctaSecondaryLink: '#estimate',
      ctaBannerButtonText: 'Talk to Cubixsol',
      ctaBannerButtonLink: '/contact',
      ctaBannerSecondaryButtonText: 'Get a Proposal',
      ctaBannerSecondaryButtonLink: '#estimate',
      points: [
        'Healthcare-Focused Development Approach',
        'Security-First Engineering',
        'Scalable Technology Solutions',
        'Long-Term Technical Support',
      ],
      trustPills: [
        '100% HIPAA & BAA Ready',
        'HL7 FHIR v4 Certified',
        'Encrypted WebRTC Telehealth',
        'Zero-Trust Data Protection',
      ],
      solutionsTitle: 'Healthcare Software We Build',
      solutionsSubtitle: 'We develop secure, reliable, and user-friendly healthcare software solutions that simplify clinical workflows and improve patient care.',
      solutionsItems: [
        {
          title: 'Patient Portals',
          body: 'Cubixsol develops secure patient portals that connect individuals with healthcare providers through convenient digital experiences. Patients can access appointments, medical records, prescriptions, test results, and healthcare information from a centralized platform. Our solutions improve communication between patients and providers through secure messaging, notifications, and personalized healthcare access.',
        },
        {
          title: 'Telemedicine Apps',
          body: 'Our telemedicine app development services enable healthcare organizations to provide remote consultations through secure and reliable digital platforms. Cubixsol builds telehealth applications with features such as video consultations, appointment scheduling, patient management, and virtual follow-ups. These solutions help clinics, hospitals, and healthcare professionals expand access to care beyond traditional facilities.',
        },
        {
          title: 'EHR/EMR Software Development',
          body: 'Cubixsol provides EHR software development solutions that help healthcare organizations manage electronic health records efficiently. We build customized systems for storing patient information, clinical documentation, medical histories, and healthcare data. Our EHR solutions support integrations with existing healthcare platforms through modern healthcare standards while maintaining secure data management.',
        },
        {
          title: 'Practice Management Software',
          body: 'Cubixsol creates practice management software that simplifies administrative and operational workflows for healthcare providers. Our platforms support appointment management, billing processes, staff coordination, and daily clinic operations through streamlined digital tools. Custom dashboards provide healthcare teams with better visibility and control over their practice activities.',
        },
      ],
      approachTitle: 'Built for Healthcare Standards',
      approachSubtitle: 'Cubixsol develops healthcare software with security-focused practices that support privacy, compliance requirements, and reliable data management.',
      approachItems: [
        {
          title: 'HIPAA-Aware Healthcare Solutions',
          subtitle: 'Cubixsol builds healthcare applications with privacy-focused architecture designed around HIPAA requirements.',
          points: [
            { heading: 'Data Protection', text: 'Our solutions protect sensitive patient information through secure data handling practices.' },
            { heading: 'Controlled Access', text: 'Healthcare platforms are designed with controlled access and user authentication features.' },
            { heading: 'Lifecycle Privacy', text: 'Development processes consider healthcare privacy standards throughout the software lifecycle.' },
          ],
        },
        {
          title: 'Data Encryption & PHI Protection',
          subtitle: 'Cubixsol prioritises data security through encryption methods that protect protected health information (PHI).',
          points: [
            { heading: 'Encrypted Storage', text: 'Patient data is secured through encrypted storage and secure data transmission.' },
            { heading: 'Exposure Controls', text: 'Access controls limit sensitive information exposure to authorised users.' },
            { heading: 'Risk Reduction', text: 'Healthcare applications are designed to reduce risks associated with unauthorised data access.' },
          ],
        },
        {
          title: 'Audit Trails & Secure Monitoring',
          subtitle: 'Cubixsol creates healthcare systems with tracking capabilities that improve transparency and accountability.',
          points: [
            { heading: 'Activity Logs', text: 'Audit trails record important user activities and system changes.' },
            { heading: 'Usage Visibility', text: 'Monitoring features provide visibility into data access and application usage.' },
            { heading: 'Secure Logging', text: 'Secure logging supports better management of healthcare information workflows.' },
          ],
        },
      ],
      workAreasTitle: 'Use Cases & Examples',
      workAreas: [
        {
          title: 'Telehealth Platforms',
          body: 'Cubixsol builds telehealth platforms that connect patients with healthcare professionals through virtual consultations, scheduling systems, and secure communication tools.',
        },
        {
          title: 'Appointment Management Systems',
          body: 'Healthcare organizations can manage appointments, reminders, cancellations, and patient interactions through customized scheduling solutions.',
        },
        {
          title: 'Patient Engagement Applications',
          body: 'We develop patient-focused applications that improve communication, provide health resources, and support continuous engagement outside clinical visits.',
        },
      ],
      whyChooseTitle: 'Why Healthcare Teams Choose Cubixsol',
      whyChooseItems: [
        {
          title: 'Healthcare-Focused Development Approach',
          desc: 'Cubixsol creates software solutions based on healthcare workflows, user needs, and operational requirements.',
        },
        {
          title: 'Security-First Engineering',
          desc: 'Our development process prioritises secure architecture, data protection, and reliable system performance.',
        },
        {
          title: 'Scalable Technology Solutions',
          desc: 'We build healthcare platforms that support future growth, additional users, and expanding service requirements.',
        },
        {
          title: 'Long-Term Technical Support',
          desc: 'Cubixsol provides ongoing improvements, maintenance, and technical support after software deployment.',
        },
      ],
      ctaTitle: 'Ready to Build Healthcare Software?',
      ctaDesc: 'Partner with Cubixsol for reliable healthcare software development services that improve patient experiences, optimize workflows, and support modern healthcare delivery.',
      faqs: [
        {
          q: 'What can your healthcare software development services cover?',
          a: 'We develop patient portals, scheduling tools, telehealth workflows, and internal applications for healthcare operations. We define the features, integrations, and data requirements around your users and the problem you need to solve.',
        },
        {
          q: 'Do you provide healthcare mobile app development services?',
          a: 'Yes. Our healthcare mobile app development services support patient and staff experiences such as appointment booking, care information access, and task coordination. We help you choose a mobile approach based on your users, required features, and existing systems.',
        },
        {
          q: 'Can you connect new software with our existing healthcare systems?',
          a: 'We assess the interfaces and data access your systems provide before planning integrations. For EHR software development projects, we clarify which records need to move between systems, who can access them, and how updates should flow.',
        },
        {
          q: 'How does a healthcare software project start, and who owns the code?',
          a: 'We begin with discovery to agree on users, workflows, scope, and a practical first release. Your contract defines ownership and handover terms. We typically transfer project deliverables to you and provide documentation to support your internal team.',
        },
      ],
    };

    // Update in MongoDB
    const updated = await Industry.findOneAndUpdate(
      { slug: 'healthcare' },
      { $set: healthcareData },
      { upsert: true, new: true }
    );
    console.log('✓ Healthcare industry document updated in MongoDB:', updated._id);

    // Sync to backend/seedData.json
    const seedJsonPath = path.join(__dirname, 'seedData.json');
    if (fs.existsSync(seedJsonPath)) {
      try {
        const raw = fs.readFileSync(seedJsonPath, 'utf8');
        const seed = JSON.parse(raw);
        if (Array.isArray(seed.industries)) {
          const idx = seed.industries.findIndex((i) => i.slug === 'healthcare');
          if (idx >= 0) {
            seed.industries[idx] = { ...seed.industries[idx], ...healthcareData };
          } else {
            seed.industries.push(healthcareData);
          }
          fs.writeFileSync(seedJsonPath, JSON.stringify(seed, null, 2), 'utf8');
          console.log('✓ Synced healthcare content to backend/seedData.json');
        }
      } catch (e) {
        console.error('Error updating seedData.json:', e);
      }
    }

    await mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
  } catch (err) {
    console.error('Error updating healthcare industry content:', err);
    process.exit(1);
  }
}

updateHealthcareContent();
