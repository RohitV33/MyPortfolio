const sharp = require('sharp');

async function makeGhostOverlay() {
  const meta = await sharp('public/images/rohit_hero_clean.jpg').metadata();
  const width = meta.width;
  const height = meta.height;

  // Mask centered on ghost face (x ~490, y ~310, rx ~160, ry ~180)
  const maskSvg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="ghostMask" cx="36%" cy="38%" rx="16%" ry="24%">
          <stop offset="0%" stop-color="#ffffff" stop-opacity="0.8" />
          <stop offset="50%" stop-color="#ffffff" stop-opacity="0.5" />
          <stop offset="80%" stop-color="#ffffff" stop-opacity="0.15" />
          <stop offset="100%" stop-color="#ffffff" stop-opacity="0" />
        </radialGradient>
      </defs>
      <rect width="${width}" height="${height}" fill="url(#ghostMask)" />
    </svg>
  `;

  const maskBuffer = await sharp(Buffer.from(maskSvg)).png().toBuffer();

  await sharp('public/images/rohit_hero_clean.jpg')
    .ensureAlpha()
    .composite([{ input: maskBuffer, blend: 'dest-in' }])
    .png()
    .toFile('public/images/rohit_ghost_overlay.png');

  console.log('Ghost overlay generated!');
}

makeGhostOverlay().catch(console.error);
