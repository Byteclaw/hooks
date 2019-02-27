const shell = require('shelljs');

console.log(process.cwd());

shell.cd('packages/use-overlay-scroll-position');
shell.exec('npm run build --scripts-prepend-node-path');
