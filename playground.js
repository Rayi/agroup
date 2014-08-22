var shell = require('shelljs');
var result = shell.exec('ls');
console.dir(result.output);
