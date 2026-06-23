const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, '..', 'components', 'system', 'Taskbar', 'StartButton', 'StartButtonIcon.tsx');
let content = fs.readFileSync(targetFile, 'utf8');

// Replace scientific notations like 8e-3, 4e-3, etc. with their decimal values
content = content.replace(/(-?\d+(?:\.\d+)?)[eE]([+-]?\d+)/g, (match) => {
  const val = Number(match);
  // Return decimal formatted string, removing trailing zeros
  return val.toFixed(8).replace(/\.?0+$/, '');
});

fs.writeFileSync(targetFile, content, 'utf8');
console.log('Successfully cleaned StartButtonIcon SVG paths!');
