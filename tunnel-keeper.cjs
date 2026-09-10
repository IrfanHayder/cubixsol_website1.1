const { spawn } = require('child_process');
const https = require('https');

let currentUrl = '';
let pingInterval = null;

function startTunnel() {
  console.log('🚀 Starting persistent tunnel with auto-reconnect & keepalive...');

  const ssh = spawn('ssh', [
    '-o', 'StrictHostKeyChecking=no',
    '-o', 'ServerAliveInterval=10',
    '-o', 'ServerAliveCountMax=3',
    '-R', '80:localhost:5000',
    'nokey@localhost.run'
  ]);

  const handleOutput = (data) => {
    const text = data.toString();
    console.log(text);
    const match = text.match(/https:\/\/[a-z0-9]+\.lhr\.life/);
    if (match && match[0] !== currentUrl) {
      currentUrl = match[0];
      console.log('\n==================================================');
      console.log(`🌐 LIVE TUNNEL URL: ${currentUrl}`);
      console.log(`🔑 ADMIN PANEL URL: ${currentUrl}/admin`);
      console.log('==================================================\n');

      if (pingInterval) clearInterval(pingInterval);
      pingInterval = setInterval(() => {
        if (currentUrl) {
          https.get(currentUrl, () => {}).on('error', () => {});
        }
      }, 12000);
    }
  };

  ssh.stdout.on('data', handleOutput);
  ssh.stderr.on('data', handleOutput);

  ssh.on('close', (code) => {
    console.log(`⚠️ Tunnel SSH exited (code ${code}). Auto-reconnecting in 2 seconds...`);
    if (pingInterval) clearInterval(pingInterval);
    setTimeout(startTunnel, 2000);
  });
}

startTunnel();
