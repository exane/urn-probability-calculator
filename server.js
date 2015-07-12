var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.set('port', (process.env.PORT || 3000));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/', express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})

app.get('/testSuits.json', function(req, res) {
  fs.readFile('comments.json', function(err, data) {
    res.setHeader('Cache-Control', 'no-cache');
    res.json(JSON.parse(data));
  });
});

app.post('/testSuits.json', function(req, res) {
  fs.readFile('testSuits.json', function(err, data) {
    var tests = JSON.parse(data);
    tests.push(req.body);
    fs.writeFile('testSuits.json', JSON.stringify(tests, null, 4), function(err) {
      res.setHeader('Cache-Control', 'no-cache');
      res.json(tests);
    });
  });
});


app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});
