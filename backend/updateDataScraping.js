require('dotenv').config();
const mongoose = require('mongoose');
const Solution = require('./models/Solution');

async function updateDataScraping() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB.');

    const updatePayload = {
      name: 'Data Scraping & Web Data Extraction',
      title: 'Data Scraping & Web Data Extraction',
      heroTitle: 'Data Scraping & Web Data Extraction',
      description: "Collect useful website data without spending your team's time on manual research. Cubixsol provides web scraping services for businesses that need structured data for market research, price monitoring, lead generation, and data aggregation. Our team plans the scraping setup around your required sources, data fields, output format, and project scale.",
      ctaPrimaryText: 'Book a Call',
      ctaPrimaryLink: '/contact',
      ctaSecondaryText: 'Get a Free Assessment',
      ctaSecondaryLink: '/contact',

      subServicesTitle: 'Our Data Scraping Capabilities',
      subServicesIntro: 'Our data scraping team collects, extracts, cleans, and organises information from suitable web sources. Each service can support a one-time data project, regular data collection, or a wider business data workflow.',
      subServicesItems: [
        {
          title: 'Web Scraping Services',
          desc: 'We build web scraping solutions to collect selected information from websites based on your project requirements. Data can include product details, prices, business listings, categories, ratings, locations, and other publicly available information. Our developers select the right scraping method based on website structure, data volume, and collection needs. The final setup focuses on collecting relevant fields in a consistent format.'
        },
        {
          title: 'Data Extraction Services',
          desc: 'Our data extraction services focus on collecting specific information from web pages and preparing it for business use. You can define the websites, fields, data volume, and output format required for your project. We can extract selected records from individual websites or multiple sources and organise them into structured datasets. Clean field mapping makes the final data easier to review, compare, and use.'
        },
        {
          title: 'Scraping APIs',
          desc: 'Scraping APIs can connect collected web data with an existing business system or workflow. Our team can build an API-based setup around your required data fields, sources, and delivery method. API solutions can support projects requiring regular access to collected information. We review your technical setup before selecting the right approach for data delivery.'
        },
        {
          title: 'Data Cleaning',
          desc: 'Collected web data can contain duplicate records, missing values, inconsistent fields, or different formats across sources. Our team reviews the dataset and prepares the information for practical business use. Data cleaning can include removing duplicates, organising fields, standardising values, and checking records against the agreed requirements. A clean dataset gives your team a more consistent starting point for research and analysis.'
        }
      ],

      useCasesTitle: 'Use Cases',
      useCasesIntro: 'Businesses use data scraping services for research, sales, pricing, and market analysis. Our solutions can support several common business requirements.',
      useCasesItems: [
        {
          title: 'Price Monitoring',
          desc: 'Collect product prices from selected websites and organise pricing information for comparison. Regular collection can help teams track changes across products, sellers, or market sources.'
        },
        {
          title: 'Lead Lists',
          desc: 'Collect public business information such as company names, websites, locations, categories, and other required fields. Structured records can support sales research and lead generation activities.'
        },
        {
          title: 'Market Research',
          desc: 'Gather information from multiple websites to support research into products, prices, businesses, categories, and market activity. Organised web data can give research teams a broader set of information to review.'
        },
        {
          title: 'Data Aggregation',
          desc: 'Bring information from different websites into one structured dataset. Aggregated data can make comparison, filtering, reporting, and further analysis easier for business teams.'
        }
      ],

      techTitle: 'Tools & Tech',
      techDesc: 'Our data scraping technology stack includes Python, Scrapy, Playwright, and proxies. We select tools based on website structure, data volume, access requirements, and project scope. Python supports scraping logic and data processing. Scrapy can handle larger crawling projects, while Playwright can work with websites where content loads through browser actions. Proxies can support suitable projects requiring managed web requests.',
      tech: ['Python', 'Scrapy', 'Playwright', 'Proxies'],

      process: {
        title: 'Our Data Scraping Process',
        subtitle: 'Our structured process to discover, design, build, deploy, and maintain reliable data scraping solutions.',
        steps: [
          {
            stepNumber: '01',
            title: 'Discover',
            desc: 'We begin by defining your data requirements, target websites, required fields, expected data volume, collection frequency, and output format. Clear requirements help the team plan the project around your actual business needs.',
            bullets: []
          },
          {
            stepNumber: '02',
            title: 'Design',
            desc: 'Our team plans the scraping structure, data fields, collection method, and technical setup. We review the source websites and select an approach suited to the project.',
            bullets: []
          },
          {
            stepNumber: '03',
            title: 'Build',
            desc: 'Developers create the scraping solution and test it against the selected sources. We check data fields, collection accuracy, page handling, and output structure during development.',
            bullets: []
          },
          {
            stepNumber: '04',
            title: 'Deploy',
            desc: 'Once testing is complete, we put the scraping solution into use. Collected data can be prepared for your chosen delivery method or connected with a suitable business workflow.',
            bullets: []
          },
          {
            stepNumber: '05',
            title: 'Monitor and Improve',
            desc: 'Websites can change their layouts, page elements, or content structure over time. Our team can monitor the scraping setup and make required updates when source websites or project requirements change.',
            bullets: []
          }
        ]
      },

      whyChooseTitle: 'Why Choose Cubixsol?',
      whyChooseIntro: '',
      whyChooseItems: [
        {
          title: 'Technical Expertise',
          desc: 'Our team works with Python, Scrapy, Playwright, proxies, and other tools used for web scraping projects. We select the technical setup based on your sources, data requirements, and project size.'
        },
        {
          title: 'Responsible Data Collection',
          desc: 'We consider website rules, data use, and relevant legal requirements when planning scraping projects. Our approach focuses on suitable public data sources and responsible collection practices.'
        },
        {
          title: 'Less Manual Work',
          desc: 'Manual data collection can take significant time when teams need information from many pages or websites. Automated scraping can collect selected information at scale and reduce repetitive work for your team.'
        },
        {
          title: 'Ongoing Support',
          desc: 'Scraping systems may need updates when websites change their layouts or data structure. Our team can provide maintenance, review collection issues, and make technical updates as your project develops.'
        }
      ],

      ctaBannerEyebrow: 'READY TO GET STARTED?',
      ctaBannerTitle: 'Ready to Get Started?',
      ctaBannerDesc: 'Get reliable **web scraping services** for market research, price monitoring, lead generation, or data aggregation. Tell us what data you need, where you need it from, and how your team plans to use it.',
      ctaBannerButtonText: 'Start Your Data Scraping Project',
      ctaBannerButtonLink: '/contact',
      ctaBannerSecondaryButtonText: 'Request a Free Assessment',
      ctaBannerSecondaryButtonLink: '/contact',

      faqs: [
        {
          q: 'Is web scraping legal and ethical?',
          a: 'Web scraping rules depend on the website, type of data, location, and intended use. Cubixsol reviews project requirements and considers relevant website rules and legal requirements before starting data collection.'
        },
        {
          q: 'How much do web scraping services cost?',
          a: 'Cost depends on the number of websites, pages, data fields, collection frequency, data volume, and technical requirements. We review your project scope before providing a suitable estimate.'
        },
        {
          q: 'What data formats can you provide?',
          a: 'We can prepare structured data in formats such as CSV and JSON, based on your project requirements. Output can also be planned around the system or workflow where your team will use the data.'
        },
        {
          q: 'Can you handle large-scale scraping?',
          a: 'Yes. We can plan projects involving large numbers of pages or multiple websites. Data volume, collection frequency, source structure, and processing requirements all affect the technical setup.'
        },
        {
          q: 'Do you provide scraping maintenance?',
          a: 'Yes. Websites can change their layouts, page elements, or data structure after a scraper goes live. Our team can review the system, fix collection issues, and update the scraping setup when required.'
        }
      ]
    };

    const doc = await Solution.findOneAndUpdate(
      { slug: 'data-scraping' },
      { $set: updatePayload },
      { new: true, upsert: true }
    );

    console.log('Successfully updated data-scraping in MongoDB:', doc.name, doc.slug);
    process.exit(0);
  } catch (err) {
    console.error('Error updating data-scraping:', err);
    process.exit(1);
  }
}

updateDataScraping();
