const fs = require('fs');
const path = require('path');

const pkgPath = path.resolve(__dirname, 'node_modules/react-dom/package.json');
if (fs.existsSync(pkgPath)) {
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
  if (!pkg.exports['./cjs/*']) {
    pkg.exports['./cjs/*'] = './cjs/*';
    fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
    console.log('Successfully patched react-dom/package.json exports for Vite compatibility.');
  } else {
    console.log('react-dom/package.json already patched.');
  }
} else {
  console.log('react-dom package not found, skipping patch.');
}
