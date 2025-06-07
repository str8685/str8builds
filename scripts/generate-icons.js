const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// Sizes for PWA icons
const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

// Input SVG file
const svgPath = path.join(__dirname, '../public/icons/icon.svg');

// Output directory for PNG files
const outputDir = path.join(__dirname, '../public/icons');

// Check if the svg file exists
if (!fs.existsSync(svgPath)) {
  console.error(`SVG file not found: ${svgPath}`);
  process.exit(1);
}

// Generate PNG files using ImageMagick
sizes.forEach(size => {
  const outputPath = path.join(outputDir, `icon-${size}x${size}.png`);
  const command = `magick convert -background none -size ${size}x${size} ${svgPath} ${outputPath}`;
  
  console.log(`Generating ${size}x${size} icon...`);
  
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error generating ${size}x${size} icon: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`Stderr: ${stderr}`);
      return;
    }
    console.log(`Generated ${outputPath}`);
  });
});

// Generate other required icons
const otherIcons = [
  { name: 'dashboard.png', size: 192 },
  { name: 'projects.png', size: 192 },
  { name: 'tools.png', size: 192 },
  { name: 'badge-96x96.png', size: 96 }
];

otherIcons.forEach(icon => {
  const outputPath = path.join(outputDir, icon.name);
  const command = `magick convert -background none -size ${icon.size}x${icon.size} ${svgPath} ${outputPath}`;
  
  console.log(`Generating ${icon.name}...`);
  
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error generating ${icon.name}: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`Stderr: ${stderr}`);
      return;
    }
    console.log(`Generated ${outputPath}`);
  });
});

console.log('Icon generation script completed. If you have ImageMagick installed, the icons should be generated.');
console.log('If not, you\'ll need to manually create the icons or install ImageMagick.');