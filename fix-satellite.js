const fs = require('fs');
const https = require('https');
const path = require('path');

const targetDir = path.join(__dirname, 'public', 'images', 'satellite');
if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

const download = (url, dest) => {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        return download(response.headers.location, dest).then(resolve).catch(reject);
      }
      if (response.statusCode !== 200) {
        return reject(new Error(`Failed with status ${response.statusCode}`));
      }
      const file = fs.createWriteStream(dest);
      response.pipe(file);
      file.on('finish', () => file.close(resolve));
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
};

const satelliteImages = [
  'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1000&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1444858291040-58f756a3bdd6?q=80&w=1000&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1627720111661-0081033230b4?q=80&w=1000&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1594498257673-9f36b63834da?q=80&w=1000&auto=format&fit=crop'
];

async function run() {
  for (let i = 0; i < satelliteImages.length; i++) {
    const dest = path.join(targetDir, `${i + 1}.jpg`);
    try {
      await download(satelliteImages[i], dest);
      console.log(`Updated satellite image ${i+1}`);
    } catch (e) {
      console.error(`Failed ${i+1}: ${e.message}`);
    }
  }
}

run();
