var fs     = require('fs');
var marked = require('marked');

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: false
});

function markdown(filePath, req, res, next) {
  fs.readFile(filePath, {encoding: 'utf-8'}, function (err, data) {
    if (err) throw err;
    res.end(marked(data));
  });
}


module.exports = markdown;