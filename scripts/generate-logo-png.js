const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

async function generateLogoPNG() {
  try {
    const svgPath = path.join(
      __dirname,
      "../public/brand-assets/logos/primary/wow-ai-primary-logo.svg",
    );
    const outputPath = path.join(
      __dirname,
      "../public/brand-assets/logos/primary/wow-ai-primary-logo.png",
    );

    // Read the SVG file
    const svgBuffer = fs.readFileSync(svgPath);

    // Convert SVG to PNG with good quality and size
    await sharp(svgBuffer)
      .resize(400, null, {
        // 400px width, auto height to maintain aspect ratio
        withoutEnlargement: false,
        background: { r: 255, g: 255, b: 255, alpha: 0 }, // Transparent background
      })
      .png({
        quality: 100,
        compressionLevel: 6,
      })
      .toFile(outputPath);

    console.log("✅ PNG logo generated successfully at:", outputPath);

    // Also create a high-res version for print use
    const highResPath = path.join(
      __dirname,
      "../public/brand-assets/logos/primary/wow-ai-primary-logo-300dpi.png",
    );

    await sharp(svgBuffer)
      .resize(1200, null, {
        // 3x size for 300 DPI at 4" width
        withoutEnlargement: false,
        background: { r: 255, g: 255, b: 255, alpha: 0 },
      })
      .png({
        quality: 100,
        compressionLevel: 6,
      })
      .toFile(highResPath);

    console.log("✅ High-res PNG logo generated successfully at:", highResPath);
  } catch (error) {
    console.error("❌ Error generating PNG logo:", error);
    process.exit(1);
  }
}

generateLogoPNG();
