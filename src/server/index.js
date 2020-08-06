const dotenv = require('dotenv');

projectData = {};

dotenv.config();

const path = require('path');
const express = require('express');

const app = express()

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.options('/', function (req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.end();
});

app.use(express.static('dist'))

console.log(__dirname)

app.get('/', function (req, res) {
    // res.sendFile('dist/index.html')
    res.sendFile(path.resolve('src/client/views/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})

app.get('/', function (req, res) {
    res.send('dist/index.html')
})

// setup GET route endpoint
app.get('/all', (req, res) => {
  res.send(projectData);
})

// setup POST route endpoint
app.post('/add', (req, res) => {
  // const newData = {
  //   date: req.body.date,
  //   temp: req.body.main.temp,
  //   feelings: req.body.feelings
  // };
  projectData = req.body;
})