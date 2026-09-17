/**
 * Favicon generator — rasterises public/favicon.svg into the formats browsers
 * still ask for by convention rather than by <link>:
 *
 *   public/favicon.ico        16/32/48 px, requested at the domain root by
 *                             browsers, bookmark bars and crawlers that never
 *                             parse the document head.
 *   public/apple-touch-icon.png  180 px, iOS home-screen bookmarks.
 *
 * public/favicon.svg stays the source of truth — it is served as-is and linked
 * from generateMetadata in src/app/[locale]/layout.tsx. Run this script
 * whenever it changes so the raster fallbacks do not drift from the mark.
 *
 *   pnpm generate:favicon
 *
 * ICO note: the container embeds full PNG payloads rather than BMP bitmaps.
 * Every browser released since IE11 reads that form, and it keeps the file an
 * order of magnitude smaller than the equivalent BMP-based icon.
 */

const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const SVG_PATH = path.join(__dirname, "../public/favicon.svg");
const ICO_PATH = path.join(__dirname, "../public/favicon.ico");
const APPLE_PATH = path.join(__dirname, "../public/apple-touch-icon.png");

const ICO_SIZES = [16, 32, 48];

/** Wrap already-encoded PNG buffers in an ICO container. */
function buildIco(entries) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: 1 = icon
  header.writeUInt16LE(entries.length, 4);

  const directory = Buffer.alloc(16 * entries.length);
  // Image data starts immediately after the header and the directory.
  let offset = header.length + directory.length;

  entries.forEach(({ size, data }, i) => {
    const at = i * 16;
    // 256 px is encoded as 0 — irrelevant at our sizes, but keeps the writer honest.
    directory.writeUInt8(size >= 256 ? 0 : size, at + 0); // width
    directory.writeUInt8(size >= 256 ? 0 : size, at + 1); // height
    directory.writeUInt8(0, at + 2); // palette colours (0 = truecolour)
    directory.writeUInt8(0, at + 3); // reserved
    directory.writeUInt16LE(1, at + 4); // colour planes
    directory.writeUInt16LE(32, at + 6); // bits per pixel
    directory.writeUInt32LE(data.length, at + 8);
    directory.writeUInt32LE(offset, at + 12);
    offset += data.length;
  });

  return Buffer.concat([
    header,
    directory,
    ...entries.map((entry) => entry.data),
  ]);
}

async function generateFavicons() {
  const svg = fs.readFileSync(SVG_PATH);

  // Rasterise from the SVG at each target size rather than downscaling one
  // large render — the rounded corners and the W stay crisp at 16 px that way.
  const entries = await Promise.all(
    ICO_SIZES.map(async (size) => ({
      size,
      data: await sharp(svg, { density: 384 })
        .resize(size, size)
        .png({ compressionLevel: 9 })
        .toBuffer(),
    })),
  );

  fs.writeFileSync(ICO_PATH, buildIco(entries));
  console.log(
    `✅ ${path.relative(process.cwd(), ICO_PATH)} (${ICO_SIZES.join("/")} px)`,
  );

  await sharp(svg, { density: 384 })
    .resize(180, 180)
    .png({ compressionLevel: 9 })
    .toFile(APPLE_PATH);
  console.log(`✅ ${path.relative(process.cwd(), APPLE_PATH)} (180 px)`);
}

generateFavicons().catch((error) => {
  console.error("❌ Favicon generation failed:", error.message);
  process.exit(1);
});
