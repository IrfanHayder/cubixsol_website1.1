import { services, projects, products, solutions, industries } from './src/data/content.js';

/** Convert React icon components to string names for MongoDB */
function serializeServices(list) {
  return list.map((s) => ({
    ...s,
    icon: s.icon?.displayName || s.icon?.name || s.icon?.render?.name || 'Globe',
  }));
}

function serializeIndustries(list) {
  return (list || []).map((i) => ({
    ...i,
    icon: i.icon?.displayName || i.icon?.name || i.icon?.render?.name || 'Briefcase',
  }));
}

async function seed() {
  try {
    console.log('Starting seed process...');
    const response = await fetch('http://localhost:5000/api/seed', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        services: serializeServices(services),
        projects,
        products,
        solutions,
        industries: serializeIndustries(industries),
      }),
    });
    const result = await response.json();
    console.log(result);
  } catch (err) {
    console.error('Seed failed:', err);
  }
}

seed();
