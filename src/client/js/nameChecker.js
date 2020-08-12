function checkForName(inputText) {
  if (inputText.length > 0) {
    console.log('validated');
    return true
  } else {
    console.log('not valid, enter a complete sentence');
    return false
  }
}

export { checkForName }
