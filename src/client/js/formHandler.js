const https = require('follow-redirects').https;

// function handleSubmit(event) {
//     event.preventDefault()

//     // check what text was put into the form field
//     let formText = document.getElementById('name').value
//     checkForName(formText)

//     console.log('main dist test');

//     console.log("::: Form Submitted :::")
//     fetch('http://localhost:8080/test')
//     .then(res => res.json())
//     .then(function(res) {
//         document.getElementById('results').innerHTML = res.message
//     })
// }

// GET request
const getRequest = async (sentence) => {

  var options = {
    'method': 'POST',
    'hostname': 'api.meaningcloud.com',
    'path': `/sentiment-2.1?key=6928a481ca2ebba380f76438e0bc9948&txt=${sentence}&model=general&lang=en`,
    'headers': {
    },
    'maxRedirects': 20
  };
  
  var req = https.request(options, function (res) {
    var chunks = [];
  
    res.on("data", function (chunk) {
      chunks.push(chunk);
    });
  
    res.on("end", function (chunk) {
      var body = Buffer.concat(chunks).toString();
      console.log(body);

      postData('http://localhost:8081/add', body)
        .then(() => {
          updateUI();
        });
    });
  
    res.on("error", function (error) {
      console.error(error);
    });
  });

  req.end();
}

// POST request
const postData = async (url = 'http://localhost:8081/add', data = {}) => {
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  });

  try {
    const newData = await response.json();
    return newData;
  } catch (err) {
    console.log('error', err);
  }
}

// update UI
const updateUI = async () => {
  
  try {
    // const allData = await request.json();
    // document.getElementById('results').innerHTML = allData.status;
    // document.getElementById('results').innerHTML = res.message

    fetch('http://localhost:8081/all')
    .then(res => res.json())
    .then(function(res) {
        document.getElementById('results').innerHTML = res.message
    });
  } catch (err) {
    console.log('error', err);
  }
}

document.getElementById('submit').addEventListener('click', (e) => {

  e.preventDefault();

  const newSentence = document.getElementById('sentence').value;
  
  getRequest(newSentence);
})

// export { handleSubmit }
