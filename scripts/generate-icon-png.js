const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

async function generateAppIconPNG() {
  try {
    const svgPath = path.join(
      __dirname,
      "../public/brand-assets/icons/app/wow-ai-app-icon-64px.svg",
    );
    const outputPath = path.join(
      __dirname,
      "../public/brand-assets/icons/app/wow-ai-app-icon-250px.png",
    );

    // Read the SVG file
    const svgBuffer = fs.readFileSync(svgPath);

    // Convert SVG to PNG with 250x250 dimensions
    // Start with high quality and reduce if file size is too large
    let quality = 100;
    let compressionLevel = 6;
    let outputBuffer;

    do {
      outputBuffer = await sharp(svgBuffer)
        .resize(250, 250, {
          withoutEnlargement: false,
          background: { r: 255, g: 255, b: 255, alpha: 0 }, // Transparent background
        })
        .png({
          quality: quality,
          compressionLevel: compressionLevel,
        })
        .toBuffer();

      const fileSizeKB = outputBuffer.length / 1024;
      const fileSizeMB = fileSizeKB / 1024;

      console.log(
        `📊 Current file size: ${fileSizeMB.toFixed(2)}MB (${fileSizeKB.toFixed(0)}KB) with quality: ${quality}, compression: ${compressionLevel}`,
      );

      if (fileSizeMB <= 1.0) {
        // File size is acceptable, write to file
        fs.writeFileSync(outputPath, outputBuffer);
        console.log(
          "✅ 250x250 PNG app icon generated successfully at:",
          outputPath,
        );
        console.log(`📁 Final file size: ${fileSizeMB.toFixed(2)}MB`);
        break;
      } else {
        // File size too large, reduce quality
        if (quality > 80) {
          quality -= 10;
        } else if (compressionLevel < 9) {
          compressionLevel += 1;
        } else {
          // If we can't reduce further, write the file anyway
          fs.writeFileSync(outputPath, outputBuffer);
          console.log(
            "⚠️  File size still above 1MB, but saved with best possible compression",
          );
          console.log(`📁 Final file size: ${fileSizeMB.toFixed(2)}MB`);
          break;
        }
      }
    } while (true);
  } catch (error) {
    console.error("❌ Error generating PNG app icon:", error);
    process.exit(1);
  }
}

generateAppIconPNG();
