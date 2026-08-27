/** Best practices content per solution slug */
export const solutionPractices = {
  'data-engineering': {
    title: 'Best Practices for Data Engineering',
    intro:
      'Reliable pipelines and trustworthy data start with clear standards. These practices guide how we design, run, and scale data platforms.',
    items: [
      {
        title: 'Reliable Pipeline Design',
        body: 'We design idempotent, monitored pipelines with clear ownership so failures are visible and recoverable without silent data loss.',
      },
      {
        title: 'Data Quality Gates',
        body: 'Validation checks, schema contracts, and freshness alerts keep bad data from flowing into warehouses and dashboards.',
      },
      {
        title: 'Scalable Architecture',
        body: 'Partitioning, storage formats, and compute choices are planned for growth so you are not forced into constant rebuilds.',
      },
      {
        title: 'Security by Default',
        body: 'Access controls, encryption, and audit trails are part of the design — not an afterthought before go-live.',
      },
      {
        title: 'Operational Excellence',
        body: 'Runbooks, alerting, and cost visibility help teams keep systems healthy day after day.',
      },
    ],
  },
  'bi-data-analytics': {
    title: 'Best Practices for BI & Data Analytics',
    intro:
      'Dashboards only matter if people trust and use them. We focus on clarity, governance, and decisions — not chart noise.',
    items: [
      {
        title: 'Single Source of Truth',
        body: 'Metrics are defined once and reused so finance, product, and ops are not arguing over different numbers.',
      },
      {
        title: 'Audience-First Design',
        body: 'Reports are shaped for the decisions each role needs to make, with the right level of detail and refresh cadence.',
      },
      {
        title: 'Performance Matters',
        body: 'Models and queries are optimized so dashboards stay fast as data volume grows.',
      },
      {
        title: 'Governed Self-Service',
        body: 'Teams can explore safely within certified datasets instead of exporting shadow spreadsheets.',
      },
      {
        title: 'Actionable Insights',
        body: 'We pair visuals with context and next steps so analytics drives change, not just observation.',
      },
    ],
  },
  'data-governance-security': {
    title: 'Best Practices for Data Governance & Security',
    intro:
      'Governance should enable speed, not block it. We balance control, clarity, and practical workflows.',
    items: [
      {
        title: 'Clear Ownership',
        body: 'Every critical dataset has owners, stewards, and documented purpose so accountability is never fuzzy.',
      },
      {
        title: 'Least-Privilege Access',
        body: 'People and systems get only the access they need, with reviews as roles change.',
      },
      {
        title: 'Policy as Practice',
        body: 'Policies are embedded in tools and pipelines so compliance is continuous, not a yearly scramble.',
      },
      {
        title: 'Classification & Retention',
        body: 'Sensitive data is labeled, handled, and retained according to business and regulatory needs.',
      },
      {
        title: 'Auditability',
        body: 'Who accessed what, and when, can be answered without heroic forensic work.',
      },
    ],
  },
  'data-migration': {
    title: 'Best Practices for Data Migration',
    intro:
      'Migrations succeed when risk is managed early. We plan cutovers carefully and validate relentlessly.',
    items: [
      {
        title: 'Thorough Discovery',
        body: 'Sources, dependencies, and edge cases are mapped before any bulk move begins.',
      },
      {
        title: 'Phased Cutover',
        body: 'Where possible we migrate in stages with rollback paths instead of a single high-risk big bang.',
      },
      {
        title: 'Validation at Every Step',
        body: 'Row counts, checksums, and business reconciliations confirm that data landed correctly.',
      },
      {
        title: 'Downtime Minimization',
        body: 'Replication and dual-run strategies reduce impact on users and revenue systems.',
      },
      {
        title: 'Post-Migration Hypercare',
        body: 'Teams stay close after go-live to catch issues quickly and stabilize the new environment.',
      },
    ],
  },
  'data-scraping': {
    title: 'Best Practices for Data Scraping',
    intro:
      'Ethical, resilient collection matters as much as volume. We build scrapers that respect limits and stay maintainable.',
    items: [
      {
        title: 'Respectful Collection',
        body: 'We honor robots rules, rate limits, and legal constraints so collection is sustainable and responsible.',
      },
      {
        title: 'Resilient Pipelines',
        body: 'Retries, change detection, and monitoring keep feeds alive when sites change layout or structure.',
      },
      {
        title: 'Clean Structured Output',
        body: 'Raw HTML becomes consistent, documented datasets ready for analytics or enrichment.',
      },
      {
        title: 'Quality Monitoring',
        body: 'Anomalies in volume or fields trigger alerts before bad data spreads downstream.',
      },
      {
        title: 'Secure Storage',
        body: 'Collected data is stored and accessed with the same care as any other business dataset.',
      },
    ],
  },
  'agentic-ai': {
    title: 'Best Practices for Agentic AI',
    intro:
      'Agents that act in the real world need guardrails, observability, and clear goals — not just a clever prompt.',
    items: [
      {
        title: 'Clear Objectives & Boundaries',
        body: 'Agents know what success looks like and what they must never do, with human escalation paths.',
      },
      {
        title: 'Tooling with Control',
        body: 'Actions go through reviewed tools and APIs with authentication, limits, and audit logs.',
      },
      {
        title: 'Grounded Context',
        body: 'Retrieval and memory are designed so decisions are based on trusted, current information.',
      },
      {
        title: 'Evaluation Loops',
        body: 'We test agent behavior in simulated and live scenarios before expanding autonomy.',
      },
      {
        title: 'Continuous Improvement',
        body: 'Production feedback updates policies, prompts, and knowledge without uncontrolled drift.',
      },
    ],
  },
  'deep-learning': {
    title: 'Best Practices for Deep Learning',
    intro:
      'Strong models need strong data, disciplined experiments, and production-aware design.',
    items: [
      {
        title: 'Problem-Fit Architecture',
        body: 'We choose architectures based on the task, data volume, latency needs, and interpretability requirements.',
      },
      {
        title: 'Data Quality First',
        body: 'Label quality, imbalance handling, and augmentation are treated as first-class work.',
      },
      {
        title: 'Reproducible Experiments',
        body: 'Versioned data, code, and metrics make results comparable and auditable.',
      },
      {
        title: 'Robust Evaluation',
        body: 'Offline metrics are paired with real-world checks so models hold up outside the lab.',
      },
      {
        title: 'Efficient Serving',
        body: 'Deployment considers latency, cost, and monitoring — not only peak accuracy.',
      },
    ],
  },
  'generative-ai': {
    title: 'Best Practices for Generative AI',
    intro:
      'Useful GenAI is grounded, governed, and measured. We ship systems people can trust in daily work.',
    items: [
      {
        title: 'Grounding & Retrieval',
        body: 'Answers are tied to your knowledge sources so hallucinations are reduced and citations are possible.',
      },
      {
        title: 'Safety & Policy Layers',
        body: 'Filters, role permissions, and escalation rules keep outputs appropriate for your domain.',
      },
      {
        title: 'UX That Builds Trust',
        body: 'Users see uncertainty, sources, and easy ways to correct or escalate when needed.',
      },
      {
        title: 'Evaluation Beyond Demos',
        body: 'Quality is measured on real tasks — not only flashy examples.',
      },
      {
        title: 'Cost-Aware Design',
        body: 'Caching, model routing, and prompt design keep usage sustainable as adoption grows.',
      },
    ],
  },
  'predictive-analysis': {
    title: 'Best Practices for Predictive Analysis',
    intro:
      'Forecasts should be honest about uncertainty and useful for decisions — not just a number on a slide.',
    items: [
      {
        title: 'Decision-Linked Metrics',
        body: 'Models are built around the actions stakeholders will take, with clear success criteria.',
      },
      {
        title: 'Leakage-Aware Features',
        body: 'Feature pipelines avoid future information so backtests reflect true performance.',
      },
      {
        title: 'Transparent Uncertainty',
        body: 'Intervals and confidence communication help leaders plan with risk in mind.',
      },
      {
        title: 'Monitoring Drift',
        body: 'Data and performance drift triggers retraining or investigation before decisions go stale.',
      },
      {
        title: 'Human-in-the-Loop',
        body: 'Critical decisions stay reviewable by experts who understand context models miss.',
      },
    ],
  },
  'sentiment-analysis': {
    title: 'Best Practices for Sentiment Analysis',
    intro:
      'Sentiment is nuanced. We design pipelines that respect language, context, and business use cases.',
    items: [
      {
        title: 'Domain Adaptation',
        body: 'Models are tuned to your industry language, product names, and customer tone.',
      },
      {
        title: 'Beyond Positive/Negative',
        body: 'Where useful we capture aspects, intensity, and intent — not only a single polarity score.',
      },
      {
        title: 'Multilingual Readiness',
        body: 'Pipelines account for the languages your customers actually use.',
      },
      {
        title: 'Bias Awareness',
        body: 'We review outputs for systematic bias and adjust data and models accordingly.',
      },
      {
        title: 'Actionable Routing',
        body: 'Insights connect to support, product, and marketing workflows so signals become action.',
      },
    ],
  },
  'data-science': {
    title: 'Best Practices for Data Science',
    intro:
      'High-quality data, disciplined modeling, and ethical practice turn experiments into reliable outcomes.',
    items: [
      {
        title: 'Data Quality and Validation',
        body: 'High-quality, valid data is the foundation of trustworthy insights. We use rigorous cleansing and validation so data stays accurate, consistent, and reliable over time — including strategies for missing values.',
      },
      {
        title: 'Data Processing',
        body: 'We leverage scalable storage and processing so data moves smoothly from ingestion to analysis and visualization, with pipelines refined for efficiency.',
      },
      {
        title: 'Model Development',
        body: 'Algorithms are chosen for the problem, data, and needs around interpretability, complexity, and efficiency — then evaluated with clear metrics against objectives.',
      },
      {
        title: 'Model Deployment',
        body: 'We deploy with monitoring of inputs and outputs, watch for performance drift, and support automated retraining so models stay current.',
      },
      {
        title: 'Collaboration & Documentation',
        body: 'Open communication between scientists, domain experts, and stakeholders is backed by version control and documentation of code, data, methods, and experiments.',
      },
      {
        title: 'Ethical Considerations',
        body: 'Privacy, fairness, and auditability are integral. We work to identify and reduce bias across collection, training, and predictions.',
      },
    ],
  },
  'ai-consulting': {
    title: 'Best Practices for AI Consulting',
    intro:
      'Good AI advice is practical: readiness, prioritization, and a path your organization can actually execute.',
    items: [
      {
        title: 'Start With Business Value',
        body: 'Use cases are ranked by impact, feasibility, and risk — not hype cycles.',
      },
      {
        title: 'Assess Readiness Honestly',
        body: 'Data, talent, process, and infrastructure gaps are surfaced early with a remediation plan.',
      },
      {
        title: 'Pilot Before Scale',
        body: 'Small, measurable pilots prove value and reveal integration issues before large spend.',
      },
      {
        title: 'Governance Up Front',
        body: 'Ownership, ethics, and compliance are defined before models touch customers or operations.',
      },
      {
        title: 'Build Internal Capability',
        body: 'Knowledge transfer ensures your team can operate and improve solutions after the engagement.',
      },
    ],
  },
  'ai-chatbots-support': {
    title: 'Best Practices for Ecommerce Chatbot Development',
    intro:
      'Chatbots succeed when UX, integration, and security are treated as core product work.',
    items: [
      {
        title: 'Optimize the User Experience',
        body: 'Flows feel natural, logical, and easy across desktop and mobile — helpful, not robotic.',
      },
      {
        title: 'Choose the Right Technology',
        body: 'NLP and AI stack choices match your languages, catalog complexity, and scale needs.',
      },
      {
        title: 'Ensure Seamless Integration',
        body: 'Bots connect cleanly to store, CRM, and helpdesk so data stays consistent.',
      },
      {
        title: 'Focus on Data Security',
        body: 'Encryption, access control, and privacy-minded design protect customer data.',
      },
      {
        title: 'Incorporate Feedback Mechanisms',
        body: 'Users can rate and correct answers so the experience improves continuously.',
      },
    ],
  },
  'ecommerce-development': {
    title: 'Best Practices for eCommerce Development',
    intro:
      'Stores that convert need performance, clarity, and operations that scale with demand.',
    items: [
      {
        title: 'Conversion-Focused UX',
        body: 'Product discovery, cart, and checkout are designed to reduce friction and build trust.',
      },
      {
        title: 'Performance & Core Web Vitals',
        body: 'Fast pages and stable layouts protect SEO and reduce bounce on mobile.',
      },
      {
        title: 'Reliable Catalog & Inventory',
        body: 'Data models and sync keep stock, pricing, and variants accurate across channels.',
      },
      {
        title: 'Secure Payments',
        body: 'Checkout integrates trusted gateways with solid error handling and fraud awareness.',
      },
      {
        title: 'Operable Admin Experience',
        body: 'Merchandisers and support teams get tools that match how they actually work.',
      },
    ],
  },
  'voice-commerce': {
    title: 'Best Practices for Voice Commerce',
    intro:
      'Voice shopping must be fast, clear, and forgiving — especially when screens are secondary.',
    items: [
      {
        title: 'Natural Conversation Design',
        body: 'Prompts and responses sound human, confirm critical details, and recover from mishears.',
      },
      {
        title: 'Context Across Turns',
        body: 'Sessions remember cart state and preferences without forcing users to repeat themselves.',
      },
      {
        title: 'Secure Identity',
        body: 'Account linking and payments use strong authentication appropriate for voice channels.',
      },
      {
        title: 'Catalog Clarity',
        body: 'Product data is structured so voice can disambiguate variants and availability.',
      },
      {
        title: 'Fallback to Screen or Agent',
        body: 'Complex steps hand off gracefully to app, web, or human support.',
      },
    ],
  },
  'customer-segmentation': {
    title: 'Best Practices for Customer Segmentation',
    intro:
      'Segments should be actionable, refreshed, and tied to real campaigns — not static labels.',
    items: [
      {
        title: 'Business-Led Definitions',
        body: 'Segments map to decisions in marketing, product, and success — not only statistical clusters.',
      },
      {
        title: 'Fresh, Reliable Features',
        body: 'Behavioral and transactional signals stay current with clear refresh schedules.',
      },
      {
        title: 'Privacy-Respecting Design',
        body: 'Sensitive attributes are handled carefully and in line with your policies.',
      },
      {
        title: 'Activation Paths',
        body: 'Segments sync to the tools teams already use for email, ads, and in-product experiences.',
      },
      {
        title: 'Measure and Iterate',
        body: 'We track whether segments improve conversion, retention, or efficiency — then refine.',
      },
    ],
  },
};
