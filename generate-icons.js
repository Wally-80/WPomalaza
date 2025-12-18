const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sourceImage = 'C:/Users/walte/.gemini/antigravity/brain/4912e9d1-6670-4f87-9291-619021d8f0ef/uploaded_image_1766071120024.jpg';
const outputDir = path.join(__dirname, 'public', 'icons');

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

async function generateIcons() {
    try {
        console.log('Generating 192x192 icon...');
        await sharp(sourceImage)
            .resize(192, 192)
            .toFile(path.join(outputDir, 'icon-192.png'));

        console.log('Generating 512x512 icon...');
        await sharp(sourceImage)
            .resize(512, 512)
            .toFile(path.join(outputDir, 'icon-512.png'));

        console.log('Icons generated successfully!');
    } catch (error) {
        console.error('Error generating icons:', error);
        process.exit(1);
    }
}

generateIcons();
