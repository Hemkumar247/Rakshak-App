const fs = require('fs');
const https = require('https');
const path = require('path');

const cropsDir = path.join(__dirname, 'public', 'images', 'crops');

const download = (url, dest) => {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        return download(response.headers.location, dest).then(resolve).catch(reject);
      }
      if (response.statusCode >= 400) {
         return reject(new Error('Failed with status code ' + response.statusCode));
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
  'wheat': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Einkorn_wheat%2C_Triticum_boeoticum_-_near_the_village_of_Vodni_pad%2C_Zhitnitsa%2C_Haskovo_Region%2C_Bulgaria.jpg/800px-Einkorn_wheat%2C_Triticum_boeoticum_-_near_the_village_of_Vodni_pad%2C_Zhitnitsa%2C_Haskovo_Region%2C_Bulgaria.jpg',
  'mustard': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Mustard_field_in_West_Bengal.jpg/800px-Mustard_field_in_West_Bengal.jpg',
  'chickpea': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Chickpea_field.jpg/800px-Chickpea_field.jpg',
  'cotton': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Cotton_field%2C_Texas.jpg/800px-Cotton_field%2C_Texas.jpg',
  'rice': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Jasmine_rice_in_Thailand.jpg/800px-Jasmine_rice_in_Thailand.jpg',
  'maize': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Corn_field_-_panoramio_-_Yann_M%C3%BCller.jpg/800px-Corn_field_-_panoramio_-_Yann_M%C3%BCller.jpg'
};

async function fixImages() {
  console.log('Fetching working crop images...');
  for (const [name, url] of Object.entries(crops)) {
    const dest = path.join(cropsDir, `${name}.jpg`);
    try {
      await download(url, dest);
      console.log(`Successfully fixed ${name}.jpg`);
    } catch (e) {
      console.error(`Error fixing ${name}:`, e.message);
    }
  }
}

fixImages();
