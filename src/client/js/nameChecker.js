function checkForName(inputText) {
  if (inputText.length > 0) {
    console.log('validated');
  } else {
    console.log('not valid, enter a complete sentence');
  }
}

export { checkForName }
