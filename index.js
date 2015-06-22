var express = require('express'),
    app = express();
	
app.set('view engine', 'ejs');
app.set('views', './views/');
app.use('/src', express.static(__dirname + '/src'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));


var data = {
  headers: [
    {
      title: 'id',
      valueType: 'number'
    },
    {
      title: 'name',
      valueType: 'string' 
    },
    {
      title: 'age',
      valueType: 'number'
    }
  ],
  rows: [
    {
      id: '1',
      name: 'Pavel Shvedov',
      age: 26  
    },
    {
      id: '2',
      name: 'Furion',
      age: 1000  
    },
    {
      id: '3',
      name: 'John Fail',
      age: 32  
    },
    {
      id: '4',
      name: 'Jack London',
      age: 100  
    }
  ]
};
  
app.get('/', function(req, res) {
  res.render('index');
});
  
app.post('/api/', function (req, res) {
  res.send(data);
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port)
});