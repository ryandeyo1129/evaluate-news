const dotenv = require('dotenv');

dotenv.config();

const path = require('path');
const express = require('express');

const axios = require('axios');

const app = express()

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.options('/', function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.end();
});

// app.options('*', cors())

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

const https = require('follow-redirects').https;
const fs = require('fs');

const text = 'Main dishes were quite good, but desserts were too sweet for me.'

const options = {
  'method': 'POST',
  'hostname': 'api.meaningcloud.com',
  'path': '/sentiment-2.1?key=6928a481ca2ebba380f76438e0bc9948&lang=English&txt=' + text,
  'headers': {
  },
  'maxRedirects': 20
};

const req = https.request(options, function (res) {
  const chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function (chunk) {
    const body = Buffer.concat(chunks);
    console.log(body.toString());
  });

  res.on("error", function (error) {
    console.error(error);
  });
});

req.end();