const fs = require('fs');
const https = require('https');
const path = require('path');

const images = {
  "drug-hero.jpg": "https://images.unsplash.com/photo-1532187875605-1ef6c237a171?q=80&w=1200",
  "nutra-hero.jpg": "https://images.unsplash.com/photo-1563172896-173693e78f99?q=80&w=1200"
};

const dir = 'public/achievements';

Object.entries(images).forEach(([name, url]) => {
  const filePath = path.join(dir, name);
  const file = fs.createWriteStream(filePath);
  
  const options = {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    }
  };

  https.get(url, options, (response) => {
    if (response.statusCode === 301 || response.statusCode === 302) {
      https.get(response.headers.location, options, (res) => {
        res.pipe(file);
      });
    } else {
      response.pipe(file);
    }
    
    file.on('finish', () => {
      file.close();
      console.log(`Downloaded ${name}`);
    });
  }).on('error', (err) => {
    fs.unlink(filePath, () => {});
    console.error(`Error downloading ${name}: ${err.message}`);
  });
});
