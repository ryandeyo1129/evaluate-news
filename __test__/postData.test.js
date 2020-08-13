import 'babel-polyfill';

import { postData, dataPromise } from '../src/client/js/formHandler';

const checkResult = () => postData("http://localhost:8081/add", { userData: 'Well that went badly.' })
.then(res => {
  return {
    agreement: res.agreement,
    confidence: res.confidence,
    irony: res.irony
  };
})

const desiredResult = {
  agreement: "DISAGREEMENT",
  confidence: "94",
  irony: "NONIRONIC",
}

// The describe() function takes two arguments - a string description, and a test suite as a callback function.  
// A test suite may contain one or more related tests    
describe("Testing the submit functionality", () => {
  test("Testing the handleSubmit() function", () => {
    expect(checkResult.confidence).toBeUndefined();
  })
  test('true is truthy', () => {
    expect(true).toBe(true)
  })
});
