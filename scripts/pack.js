const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');
const ChromeExtension = require('crx');

const pem = fs.readFileSync('key.pem');
const crx = new ChromeExtension({
  rootDirectory: path.resolve('./build'),
  privateKey: pem,
});

const dist = path.resolve('./dist');

if (!fs.existsSync(dist)) {
  fs.mkdirSync(dist);
} else {
  rimraf.sync(dist);
  fs.mkdirSync(dist);
}

crx
  .load()
  .then(() => crx.pack())
  .then((crxBuffer) => {
    fs.writeFileSync(path.resolve('./dist/histaxory.crx'), crxBuffer);
  })
  .then(() => {
    console.log('extension file exist in dist/histaxory.crx');
  })
  .catch((e) => {
    console.log(e);
    process.exit(-1);
  });
