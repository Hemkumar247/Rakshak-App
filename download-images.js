const fs = require('fs');
const https = require('https');
const path = require('path');

const cropsDir = path.join(__dirname, 'public', 'images', 'crops');
const satelliteDir = path.join(__dirname, 'public', 'images', 'satellite');

fs.mkdirSync(cropsDir, { recursive: true });
fs.mkdirSync(satelliteDir, { recursive: true });

const download = (url, dest) => {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      // Handle redirects
      if (response.statusCode === 301 || response.statusCode === 302) {
        return download(response.headers.location, dest).then(resolve).catch(reject);
      }
      
      const file = fs.createWriteStream(dest);
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
};

const crops = {
  'wheat': 'https://images.unsplash.com/photo-1586771107584-569b0fa63b21?w=800&q=80',
  'mustard': 'https://images.unsplash.com/photo-1592982537447-6f296c00d5a3?w=800&q=80',
  'chickpea': 'https://images.unsplash.com/photo-1588663806085-3004bb1e8ab1?w=800&q=80',
  'cotton': 'https://images.unsplash.com/photo-1601369348576-9c9ae0486c9d?w=800&q=80',
  'rice': 'https://images.unsplash.com/photo-1586771107584-569b0fa63b21?w=800&q=80', // placeholder
  'maize': 'https://images.unsplash.com/photo-1592982537447-6f296c00d5a3?w=800&q=80', // placeholder
};

const satelliteUrls = [
  'https://images.unsplash.com/photo-1581577742131-df290b2bf055?w=800&q=80',
  'https://images.unsplash.com/photo-1526362947137-b952f01f053e?w=800&q=80',
  'https://images.unsplash.com/photo-1628174780612-4d048bceee20?w=800&q=80',
  'https://images.unsplash.com/photo-1596701062085-f55fa7ad3f98?w=800&q=80'
];

async function run() {
  console.log('Downloading crop images...');
  for (const [name, url] of Object.entries(crops)) {
    const dest = path.join(cropsDir, `${name}.jpg`);
    try {
      await download(url, dest);
      console.log(`Saved ${name}.jpg`);
    } catch (e) {
      console.error(`Failed ${name}:`, e.message);
    }
  }

  console.log('Downloading satellite images...');
  for (let i = 0; i < satelliteUrls.length; i++) {
    const dest = path.join(satelliteDir, `${i + 1}.jpg`);
    try {
      await download(satelliteUrls[i], dest);
      console.log(`Saved satellite ${i + 1}.jpg`);
    } catch (e) {
      console.error(`Failed satellite ${i + 1}:`, e.message);
    }
  }
  
  console.log('Done!');
}

run();
