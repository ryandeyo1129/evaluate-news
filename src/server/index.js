var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
const dotenv = require('dotenv');

dotenv.config();

const app = express()

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const request = require('request')
const cors = require('cors');
app.use(cors());

app.options('/', function (req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.end();
});

app.use(express.static("dist"));

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

app.post('/add', (req,res) => {
  newData = encodeURI(req.body.userData);
  const options = {
   'method': 'POST',
   'hostname': 'api.meaningcloud.com',
   'path': `/sentiment-2.1?key=${process.env.API_KEY}&lang=en&txt=${newData}`,
   'headers': {
   },
   'maxRedirects': 20
 };
 const request = https.request(options,function(response){
     chunks = [];
     response.on("data", function(chunk){
           chunks.push(chunk);
     });
     response.on("end",function(chunk){
         let body = Buffer.concat(chunks);
          res.send(JSON.parse(body));   
     });
     response.on("error", function (error) {
       console.error(error);
     });
     
 });
 request.end()
}
)
