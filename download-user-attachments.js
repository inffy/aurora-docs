#!/usr/bin/env node
/**
 * Script to download GitHub user-attachment images to local static/img/user-attachments/
 * Usage: node download-user-attachments.js
 */

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

// Images that need to be downloaded (not already in repo)
const imagesToDownload = [
  '682057ec-e435-4fe7-aca5-928ee1a7063f',
  'af508f58-e696-4eba-956b-ad3dea19d315',
  '55798d51-0ec0-4029-af90-fae9d9ade5cd',
  '59e24766-0885-4fc8-a6e9-87339672487c',
  'c1359b27-a04b-4ca4-82b7-ca669890c653',
  'd096c0bf-4dea-4dca-a3d5-d41c8ac80bd9',
  '3d93c1f3-eb12-44c5-bd0f-08fef60e0c2b',
  '611291de-4cea-4b20-8050-8f0dcc5b2109',
  'f36f5e8e-2b5d-4ef1-bb97-97da0d62e185',
];

const outputDir = path.join(__dirname, 'static', 'img', 'user-attachments');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
  console.log(`Created directory: ${outputDir}`);
}

function downloadFile(url, outputPath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    
    protocol.get(url, (response) => {
      // Follow redirects
      if (response.statusCode === 301 || response.statusCode === 302) {
        const redirectUrl = response.headers.location;
        console.log(`Following redirect to: ${redirectUrl}`);
        downloadFile(redirectUrl, outputPath).then(resolve).catch(reject);
        return;
      }
      
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download: HTTP ${response.statusCode}`));
        return;
      }
      
      const fileStream = fs.createWriteStream(outputPath);
      response.pipe(fileStream);
      
      fileStream.on('finish', () => {
        fileStream.close();
        resolve();
      });
      
      fileStream.on('error', (err) => {
        fs.unlink(outputPath, () => {}); // Delete partial file
        reject(err);
      });
    }).on('error', reject);
  });
}

async function downloadAllImages() {
  console.log(`Downloading ${imagesToDownload.length} images...\n`);
  
  let successCount = 0;
  let failCount = 0;
  
  for (const uuid of imagesToDownload) {
    const url = `https://github.com/user-attachments/assets/${uuid}`;
    const outputPath = path.join(outputDir, `${uuid}.png`);
    
    // Skip if already exists
    if (fs.existsSync(outputPath)) {
      console.log(`✓ Already exists: ${uuid}.png`);
      successCount++;
      continue;
    }
    
    try {
      console.log(`Downloading: ${uuid}...`);
      await downloadFile(url, outputPath);
      console.log(`✓ Downloaded: ${uuid}.png`);
      successCount++;
    } catch (error) {
      console.error(`✗ Failed to download ${uuid}: ${error.message}`);
      failCount++;
    }
  }
  
  console.log(`\nDownload complete!`);
  console.log(`Success: ${successCount}, Failed: ${failCount}`);
  
  if (failCount > 0) {
    console.log('\nNote: Some images failed to download. This may be due to network restrictions.');
    console.log('You may need to download them manually from GitHub and place them in:');
    console.log(`  ${outputDir}/`);
    process.exit(1);
  }
}

downloadAllImages().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
