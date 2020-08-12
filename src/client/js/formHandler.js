function handleSubmit(event) {
    event.preventDefault();

    const formText = document.getElementById('sentence').value;
    const validUrl = Client.checkForName(formText);

    const input = { userData: formText }

    if (validUrl === 0) {
      console.log('invalid input')
    } else {
      postData("http://localhost:8081/add", input)
      .then(res => {
        try {
          document.getElementById('polarity').innerHTML = `polarity: ${res.polarity}`;
          document.getElementById('agreement').innerHTML = `agreement: ${res.agreement}`;
          document.getElementById('subjectivity').innerHTML = `subjectivity: ${res.subjectivity}`;
          document.getElementById('confidence').innerHTML = `confidence: ${res.confidence}`;
          document.getElementById('irony').innerHTML = `irony: ${res.irony}`;
        } catch (error) {
          console.log('error: ', err);
        }
      })
    }
}

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

export { handleSubmit, postData }
