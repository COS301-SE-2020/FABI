var express = require('express');
var app = express();
app.use(express.static('dist/Frontend'));
app.get('/*', function (req, res,next) {
res.redirect('/');
});
app.listen(process.env.PORT || 8080)