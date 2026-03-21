const fs = require('fs');
const https = require('https');
const path = require('path');

const targetDir = path.join(__dirname, 'public', 'images', 'satellite');

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

const satelliteImages = {
  3: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/ISS-47_Cloud_shadows_over_the_Atlantic_Ocean.jpg/800px-ISS-47_Cloud_shadows_over_the_Atlantic_Ocean.jpg',
  4: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Satellite_map_of_India.jpg/800px-Satellite_map_of_India.jpg'
};

async function run() {
  for (const [id, url] of Object.entries(satelliteImages)) {
    const dest = path.join(targetDir, `${id}.jpg`);
    try {
      await download(url, dest);
      console.log(`Updated satellite image ${id}`);
    } catch (e) {
      console.error(`Failed ${id}: ${e.message}`);
    }
  }
}

run();
