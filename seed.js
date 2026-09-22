const dns = require('dns');
try {
  dns.setServers(['8.8.8.8', '1.1.1.1', '8.8.4.4']);
} catch (e) {}

const path = require('path');
const { spawn } = require('child_process');

// CLI helper to run forceSeed from root directory
const targetMongoUri = process.argv[2] || process.env.MONGO_URI || '';
const backendDir = path.join(__dirname, 'backend');
const scriptPath = path.join(backendDir, 'forceSeed.js');

const args = [scriptPath];
if (targetMongoUri) {
  args.push(targetMongoUri);
}

console.log('====================================================');
console.log('🚀 Cubixsol Master Live Database Sync / Seed Runner');
console.log('====================================================');
if (targetMongoUri) {
  console.log('Target MongoDB URI provided via CLI.');
} else {
  console.log('Using backend/.env MONGO_URI configuration.');
}

const child = spawn('node', args, {
  cwd: backendDir,
  stdio: 'inherit',
  env: process.env,
});

child.on('exit', (code) => {
  if (code === 0) {
    console.log('\n✅ Database sync completed successfully!');
  } else {
    console.error(`\n❌ Database sync failed with exit code ${code}`);
  }
  process.exit(code);
});
