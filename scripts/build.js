const fs = require('fs');

const assetManifestFile = fs.readFileSync('build/asset-manifest.json');
const manifestFile = fs.readFileSync('build/manifest.json');
const packageFile = fs.readFileSync('package.json');
const assetManifest = JSON.parse(assetManifestFile);
const manifest = JSON.parse(manifestFile);
const package = JSON.parse(packageFile);

manifest.content_scripts[0].js[0] = assetManifest.files['main.js'];
manifest.version = package.version;

fs.writeFileSync('build/manifest.json', JSON.stringify(manifest, null, 2));
