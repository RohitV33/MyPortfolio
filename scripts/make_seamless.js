const sharp = require('sharp');

async function createSeamlessPortrait() {
  const metadata = await sharp('public/images/rohit_hero_clean.jpg').metadata();
  const width = metadata.width;
  const height = metadata.height;

  // Wide studio elliptical feather:
  // Preserves full shoulders, full head, full ghost profile
  // Smoothly dissolves into complete 0 alpha on all borders
  const maskSvg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="feather" cx="52%" cy="45%" rx="48%" ry="52%" fx="52%" fy="45%">
          <stop offset="0%" stop-color="#ffffff" stop-opacity="1" />
          <stop offset="60%" stop-color="#ffffff" stop-opacity="1" />
          <stop offset="80%" stop-color="#ffffff" stop-opacity="0.75" />
          <stop offset="92%" stop-color="#ffffff" stop-opacity="0.25" />
          <stop offset="100%" stop-color="#ffffff" stop-opacity="0" />
        </radialGradient>
        <linearGradient id="edgeVignette" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#000000" />
          <stop offset="6%" stop-color="#ffffff" />
          <stop offset="94%" stop-color="#ffffff" />
          <stop offset="100%" stop-color="#000000" />
        </linearGradient>
      </defs>
      <rect width="${width}" height="${height}" fill="url(#feather)" />
    </svg>
  `;

  const maskBuffer = await sharp(Buffer.from(maskSvg)).png().toBuffer();

  await sharp('public/images/rohit_hero_clean.jpg')
    .ensureAlpha()
    .composite([
      {
        input: maskBuffer,
        blend: 'dest-in'
      }
    ])
    .png({ compressionLevel: 8 })
    .toFile('public/images/rohit_portrait_seamless.png');

  console.log('SUCCESS: Refined public/images/rohit_portrait_seamless.png created!');
}

createSeamlessPortrait().catch(console.error);
