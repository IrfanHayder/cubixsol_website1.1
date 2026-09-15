require('dotenv').config();
const mongoose = require('mongoose');
const Solution = require('./models/Solution');

async function updateDataEngineering() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB.');

    // 1. Remove obsolete 'data-engineering-services' slug if exists
    await Solution.deleteOne({ slug: 'data-engineering-services' });
    console.log('Cleaned up obsolete data-engineering-services slug.');

    // 2. Data Engineering Payload
    const dataEngineeringPayload = {
      title: 'Data Engineering',
      name: 'Data Engineering',
      slug: 'data-engineering',
      heroTitle: 'Data Engineering Services',
      heroSubtitle: 'Pipelines, Warehouses, and Enterprise-Scale Data Platforms',
      group: 'Data Solutions',
      category: 'Data Solutions',
      desc: 'Build robust, scalable data pipelines, modern data lakehouses, and high-performance warehousing platforms. We engineer reliable data infrastructure that powers real-time analytics, machine learning, and business intelligence.',
      ctaPrimaryText: 'Talk to us',
      ctaPrimaryLink: '/contact',
      ctaSecondaryText: 'Browse services',
      ctaSecondaryLink: '/services',

      bullets: [
        'End-to-End ETL / ELT Pipeline Architecture & Automation',
        'Real-Time Streaming & Event-Driven Processing with Kafka & Spark',
        'Cloud Lakehouse & Warehouse Optimization (Snowflake, Databricks, BigQuery)',
        'Automated Data Quality Gates, Monitoring & Observability'
      ],

      subServicesTitle: 'Our Data Engineering Capabilities',
      subServicesIntro: 'From fragmented raw data sources to unified analytics-ready datasets, our end-to-end data engineering services cover every stage of the modern data lifecycle.',
      subServicesItems: [
        {
          title: 'Data Pipelines & ETL / ELT Services',
          desc: 'We build automated data pipelines to extract, transform, and load information from databases, APIs, ERPs, and cloud storage into unified analytics environments. Automated pipelines reduce manual data handling, eliminate data silos, and maintain high data freshness.'
        },
        {
          title: 'Modern Data Lakehouse & Cloud Warehousing',
          desc: 'We design and optimize scalable data warehouses and lakehouses using Snowflake, Databricks, and Google BigQuery. Structured dimensional data models ensure fast query performance and reliable reporting for your analytics and BI teams.'
        },
        {
          title: 'Real-Time Event Streaming & Ingestion',
          desc: 'Process live data as events occur with distributed streaming architectures powered by Apache Kafka and Apache Spark. Ideal for operational telemetry, fraud detection, live dashboards, and transactional event pipelines.'
        },
        {
          title: 'Data Modeling, Transformation & dbt Orchestration',
          desc: 'Organize raw information into clean, modular data layers using dbt (data build tool) and Apache Airflow. We establish automated testing, version control, and lineage documentation for maintainable transformation workflows.'
        },
        {
          title: 'Data Quality, Testing & Observability',
          desc: 'Incorporate automated schema validation, anomaly detection, and freshness alerting with tools like Great Expectations. Catch data quality regressions before they impact executive dashboards or downstream applications.'
        },
        {
          title: 'Legacy Data Platform Modernization',
          desc: 'Modernize legacy data warehouses, slow batch jobs, and fragmented databases into efficient cloud-native architectures with minimal operational disruption and guaranteed data consistency.'
        }
      ],

      useCasesTitle: 'Use Cases',
      useCasesIntro: 'Our data engineering solutions solve mission-critical data processing and analytics challenges across enterprise domains.',
      useCasesItems: [
        {
          title: 'Unified Enterprise 360 & BI',
          desc: 'Consolidate disparate data sources—CRM, payment gateways, marketing tools, and operational DBs—into a single source of truth for trustworthy BI reporting and cross-departmental insights.'
        },
        {
          title: 'High-Throughput Real-Time Analytics',
          desc: 'Process millions of events per minute for sub-second dashboards, telemetry monitoring, user clickstreams, and real-time inventory management.'
        },
        {
          title: 'ML-Ready Feature Stores & Pipelines',
          desc: 'Clean, structure, and orchestrate large-scale data feeds to power machine learning models, recommendation engines, and AI applications with reliable training data.'
        }
      ],

      techTitle: 'Tools & Technologies',
      techDesc: 'Our team leverages modern, industry-standard data engineering frameworks and cloud-native ecosystems to design resilient, future-proof data infrastructure tailored to your workload and budget.',
      tech: ['Apache Airflow', 'dbt', 'Snowflake', 'Databricks', 'Google BigQuery', 'Apache Spark', 'Apache Kafka', 'PostgreSQL', 'AWS Glue'],

      process: {
        title: 'How We Deliver Data Engineering Projects',
        subtitle: 'Our structured delivery process to design, build, test, and deploy modern data engineering infrastructure.',
        steps: [
          {
            stepNumber: '01',
            title: 'Discover & Assess',
            desc: 'We audit your existing data sources, pipeline bottlenecks, schema complexity, security constraints, and reporting requirements.',
            bullets: []
          },
          {
            stepNumber: '02',
            title: 'Architect & Model',
            desc: 'Our architects design the data pipeline structure, dimensional models, lakehouse partitions, and orchestration workflows.',
            bullets: []
          },
          {
            stepNumber: '03',
            title: 'Build & Automate',
            desc: 'Our data engineers build the ETL/ELT pipelines, ingestion connectors, transformation scripts in dbt, and automated validation rules.',
            bullets: []
          },
          {
            stepNumber: '04',
            title: 'Test & Validate',
            desc: 'We execute end-to-end data reconciliation, performance stress tests, and automated data quality checks before deployment.',
            bullets: []
          },
          {
            stepNumber: '05',
            title: 'Deploy & Monitor',
            desc: 'We deploy to production cloud infrastructure with CI/CD, 24/7 observability, proactive alerting, and handover documentation.',
            bullets: []
          }
        ]
      },

      whyChooseTitle: 'Why Choose Cubixsol for Data Engineering?',
      whyChooseIntro: 'We build data platforms that combine architectural rigor with practical business value.',
      whyChooseItems: [
        {
          title: 'End-to-End Architecture Expertise',
          desc: 'From raw streaming ingestion to refined dimensional marts, our engineers have deep expertise across cloud platforms, warehouses, and transformation frameworks.'
        },
        {
          title: 'Zero Data Loss & Resilient Design',
          desc: 'We build idempotent pipelines with dead-letter queues, automated retries, and comprehensive error logging to ensure data integrity.'
        },
        {
          title: 'Cloud Cost Optimization',
          desc: 'We optimize compute cluster sizing, storage tiers, partition pruning, and query performance to keep cloud operational costs predictable and lean.'
        },
        {
          title: 'Enterprise Security & Governance',
          desc: 'Role-based access control (RBAC), end-to-end encryption, and automated audit logging are built into every pipeline by default.'
        }
      ],

      practices: {
        title: 'Best Practices for Data Engineering',
        intro: 'Reliable pipelines and trustworthy data start with clear standards. These practices guide how we design, run, and scale data platforms.',
        items: [
          {
            title: 'Reliable Pipeline Design',
            body: 'We design idempotent, monitored pipelines with clear ownership so failures are visible and recoverable without silent data loss.'
          },
          {
            title: 'Data Quality Gates',
            body: 'Validation checks, schema contracts, and freshness alerts keep bad data from flowing into warehouses and dashboards.'
          },
          {
            title: 'Scalable Architecture',
            body: 'Partitioning, storage formats, and compute choices are planned for growth so you are not forced into constant rebuilds.'
          },
          {
            title: 'Security by Default',
            body: 'Access controls, encryption, and audit trails are part of the design — not an afterthought before go-live.'
          },
          {
            title: 'Operational Excellence',
            body: 'Runbooks, alerting, and cost visibility help teams keep systems healthy day after day.'
          }
        ]
      },

      ctaBannerEyebrow: 'TRANSFORM YOUR DATA PLATFORM',
      ctaBannerTitle: 'Ready to Build Scalable, Reliable Data Pipelines?',
      ctaBannerDesc: 'Empower your business with clean, fast, and trustworthy data infrastructure built by Cubixsol. Share your data goals with our team and let us architect the right solution for you.',
      ctaBannerButtonText: 'Talk to Us',
      ctaBannerButtonLink: '/contact',
      ctaBannerSecondaryButtonText: 'Browse Services',
      ctaBannerSecondaryButtonLink: '/services',

      faqs: [
        {
          q: 'How much do data engineering services cost?',
          a: 'Cost depends on the number of data sources, pipeline volume, cloud platform requirements, data modeling complexity, and ongoing support. Cubixsol reviews your architecture and provides a clear, milestone-based estimate.'
        },
        {
          q: 'How long does a data engineering project take?',
          a: 'A focused pipeline or dbt modeling setup can take 2 to 4 weeks, while an enterprise-wide data lakehouse and warehouse migration typically takes 2 to 4 months.'
        },
        {
          q: 'What is the difference between ETL and ELT?',
          a: 'ETL transforms data before loading it into the destination, while ELT loads raw data into a scalable warehouse (like Snowflake or BigQuery) and transforms it using tools like dbt. ELT is faster and more flexible for modern cloud data platforms.'
        },
        {
          q: 'How do I choose between Snowflake, Databricks, and BigQuery?',
          a: 'The best choice depends on your cloud ecosystem (AWS/Azure/GCP), workload types (SQL analytics vs Spark/Python ML), concurrency requirements, and budget. We evaluate your needs and recommend the optimal platform.'
        },
        {
          q: 'How do you ensure data quality and avoid silent pipeline failures?',
          a: 'We implement automated schema validation, freshness monitors, dbt test assertions, anomaly alerts, and CI/CD pipelines so invalid records are quarantined before reaching business dashboards.'
        }
      ],

      seo: {
        metaTitle: 'Data Engineering Services & Cloud Lakehouse Solutions | Cubixsol',
        metaDescription: 'Scale your analytics and AI with Cubixsol’s data engineering services. We build robust ETL/ELT pipelines, real-time streaming, and modern cloud lakehouses with Snowflake, Databricks, and Kafka.',
        keywords: 'data engineering, ETL pipelines, ELT pipelines, Snowflake, Databricks, Apache Spark, Kafka, dbt, Apache Airflow, BigQuery, Cubixsol'
      }
    };

    const updatedDoc = await Solution.findOneAndUpdate(
      { slug: 'data-engineering' },
      { $set: dataEngineeringPayload },
      { new: true, upsert: true }
    );

    console.log('Successfully updated data-engineering in MongoDB:', updatedDoc.title, updatedDoc.slug);

    // 3. Also update Data Migration if needed
    const dataMigrationPayload = {
      title: 'Data Migration',
      name: 'Data Migration',
      slug: 'data-migration',
      heroTitle: 'Data Migration Services',
      heroSubtitle: 'Safe, Seamless Moves Between Systems with Minimal Downtime',
      group: 'Data Solutions',
      category: 'Data Solutions',
      desc: 'Move your mission-critical databases, legacy warehouses, and applications to modern cloud environments securely. We guarantee zero data loss, rigorous reconciliation, and near-zero business downtime.',
      ctaPrimaryText: 'Talk to us',
      ctaPrimaryLink: '/contact',
      ctaSecondaryText: 'Browse services',
      ctaSecondaryLink: '/services',

      bullets: [
        'End-to-End Migration Strategy & Dependency Discovery',
        'Zero-Downtime Replication & Phased Cutover Protocols',
        'Automated Row-Level Reconciliation & Data Validation',
        'Post-Migration Performance Tuning & Operational Handover'
      ],

      subServicesTitle: 'Our Data Migration Capabilities',
      subServicesIntro: 'Whether moving on-premise databases to AWS/Azure/GCP or upgrading legacy systems to modern cloud warehouses, our migration solutions minimize risks and downtime.',
      subServicesItems: [
        {
          title: 'Database & Schema Migration',
          desc: 'Migrate relational and NoSQL databases (Oracle, SQL Server, MySQL, PostgreSQL, MongoDB) to managed cloud database instances with automated schema conversion and indexing.'
        },
        {
          title: 'Legacy Warehouse to Cloud Modernization',
          desc: 'Transition from legacy appliances (Teradata, Netezza, Exadata) to modern cloud warehouses (Snowflake, BigQuery, Databricks, Redshift) with refactored SQL scripts and data pipelines.'
        },
        {
          title: 'Live Data Replication & CDC',
          desc: 'Implement Change Data Capture (CDC) with tools like Debezium and AWS DMS to continuously synchronize live production data and enable zero-downtime cutovers.'
        },
        {
          title: 'Automated Data Reconciliation & Validation',
          desc: 'Run comprehensive checksums, row count verifications, and business metric reconciliations to guarantee 100% data fidelity between source and target systems.'
        }
      ],

      useCasesTitle: 'Use Cases',
      useCasesIntro: 'Tailored migration strategies designed for mission-critical enterprise transformations.',
      useCasesItems: [
        {
          title: 'On-Premise to Cloud Migration',
          desc: 'Move aging on-premise data centers to AWS, GCP, or Azure to reduce capital expenditure and increase elastic scaling capabilities.'
        },
        {
          title: 'Platform Consolidation & M&A',
          desc: 'Consolidate multiple ERP and database systems acquired during mergers & acquisitions into a single unified data architecture.'
        },
        {
          title: 'Monolith to Microservices Database Decoupling',
          desc: 'Safely split monolithic databases into isolated, domain-driven microservice datastores with continuous sync.'
        }
      ],

      techTitle: 'Tools & Technologies',
      techDesc: 'We utilize enterprise-grade migration frameworks, CDC streaming tools, and automated validation software.',
      tech: ['AWS DMS', 'Debezium', 'Apache Kafka', 'Snowflake Snowpipe', 'Azure Data Factory', 'Google Cloud Database Migration Service', 'Flyway', 'Liquibase'],

      process: {
        title: 'How We Deliver Data Migrations',
        subtitle: 'Our battle-tested, phased migration methodology to prevent data loss and operational disruption.',
        steps: [
          {
            stepNumber: '01',
            title: 'Discovery & Schema Mapping',
            desc: 'Analyze schema dependencies, data volumes, network throughput, and target architecture requirements.',
            bullets: []
          },
          {
            stepNumber: '02',
            title: 'Proof of Concept & Pipeline Setup',
            desc: 'Configure CDC replication channels, schema conversions, and transformation rules in a sandbox environment.',
            bullets: []
          },
          {
            stepNumber: '03',
            title: 'Initial Bulk Transfer & Sync',
            desc: 'Perform high-throughput historical data transfer while keeping the target synchronized with live delta changes.',
            bullets: []
          },
          {
            stepNumber: '04',
            title: 'Reconciliation & Validation',
            desc: 'Execute automated reconciliation queries, schema validation, and user acceptance testing.',
            bullets: []
          },
          {
            stepNumber: '05',
            title: 'Cutover & Post-Launch Support',
            desc: 'Execute final cutover during low-traffic windows, monitor system health, and provide rapid rollback safety nets.',
            bullets: []
          }
        ]
      },

      whyChooseTitle: 'Why Choose Cubixsol for Data Migration?',
      whyChooseIntro: 'Risk mitigation, data fidelity, and seamless business continuity are at the core of our approach.',
      whyChooseItems: [
        {
          title: 'Near-Zero Business Downtime',
          desc: 'Using continuous change data capture (CDC), we ensure your business continues operating uninterrupted during the migration process.'
        },
        {
          title: '100% Data Integrity Guarantee',
          desc: 'Automated verification tests inspect record counts, checksums, and business logic to ensure zero data loss.'
        },
        {
          title: 'Comprehensive Rollback Safety',
          desc: 'Every migration is equipped with proven rollback procedures and dual-write capabilities to eliminate risks.'
        },
        {
          title: 'Post-Migration Optimization',
          desc: 'We optimize queries, partitions, and indexing on the new target system to maximize performance and minimize cloud costs.'
        }
      ],

      practices: {
        title: 'Best Practices for Data Migration',
        intro: 'Migrations succeed when risk is managed early. We plan cutovers carefully and validate relentlessly.',
        items: [
          {
            title: 'Thorough Discovery',
            body: 'Sources, dependencies, and edge cases are mapped before any bulk move begins.'
          },
          {
            title: 'Phased Cutover',
            body: 'Where possible we migrate in stages with rollback paths instead of a single high-risk big bang.'
          },
          {
            title: 'Validation at Every Step',
            body: 'Row counts, checksums, and business reconciliations confirm that data landed correctly.'
          },
          {
            title: 'Minimal Disruption',
            body: 'CDC and delta replication keep systems in sync so production downtime is kept to a scheduled minimum.'
          },
          {
            title: 'Post-Migration Tuning',
            body: 'Indexes, statistics, and query plans are optimized on the target platform immediately after cutover.'
          }
        ]
      },

      ctaBannerEyebrow: 'MIGRATE WITH CONFIDENCE',
      ctaBannerTitle: 'Ready to Modernize Your Data Infrastructure?',
      ctaBannerDesc: 'Let Cubixsol handle your database and data warehouse migration with zero data loss and minimal downtime. Book a strategy session today.',
      ctaBannerButtonText: 'Talk to Us',
      ctaBannerButtonLink: '/contact',
      ctaBannerSecondaryButtonText: 'Browse Services',
      ctaBannerSecondaryButtonLink: '/services',

      faqs: [
        {
          q: 'How do you prevent data loss during migration?',
          a: 'We use continuous CDC replication, automated checksum comparisons, row-level verification scripts, and dual-run validation phases to ensure zero data is lost or altered.'
        },
        {
          q: 'Will our business experience downtime during data migration?',
          a: 'We design migrations using Change Data Capture (CDC) and live synchronization, reducing production cutover downtime to just a few minutes during scheduled off-peak hours.'
        },
        {
          q: 'Can you migrate data between different database engines (e.g., Oracle to PostgreSQL)?',
          a: 'Yes, we specialize in heterogeneous migrations including data type mapping, stored procedure translation, and schema refactoring.'
        },
        {
          q: 'What rollback options are in place if an issue arises during cutover?',
          a: 'We maintain reverse replication from target back to source or keep the source database active in read-only mode until full acceptance is confirmed, enabling instantaneous rollback if necessary.'
        }
      ],

      seo: {
        metaTitle: 'Data Migration Services & Cloud Database Modernization | Cubixsol',
        metaDescription: 'Securely migrate your databases and warehouses to the cloud with Cubixsol. Zero data loss, minimal downtime, and automated data reconciliation.',
        keywords: 'data migration, database migration, cloud migration, zero downtime migration, Snowflake migration, AWS DMS, Cubixsol'
      }
    };

    const updatedMigrationDoc = await Solution.findOneAndUpdate(
      { slug: 'data-migration' },
      { $set: dataMigrationPayload },
      { new: true, upsert: true }
    );
    console.log('Successfully updated data-migration in MongoDB:', updatedMigrationDoc.title, updatedMigrationDoc.slug);

    process.exit(0);
  } catch (err) {
    console.error('Error updating solution:', err);
    process.exit(1);
  }
}

updateDataEngineering();
