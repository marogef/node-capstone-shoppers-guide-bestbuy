const should = require('chai').should();

const testIems = require('../testItems');


// unit tests for our `testItems` function
describe('testItems', function() {

  // test the normal case
  it('should add two numbers', function() {
    // range of normal inputs, including
    // notable cases like negative answers
    const normalCases = [
      {a: 2, b: 3, expected: 5},
      {a: 200, b: 2000, expected: 2200},
      {a: 2, b: -5, expected: -3}
    ];
    // for each set of inputs (a, b), `testItems` should
    // produce the expected value
    normalCases.forEach(function(input) {
      const answer = testItems(input.a, input.b);
      answer.should.equal(input.expected);
    });
  });

  it('should raise error if args not numbers', function() {
    // range of bad inputs where not both are numbers
    const badInputs = [
      ['a', 1],
      ['1', 2],
      [2, false]
    ];
    // prove that an error is raised for bad inputs
    badInputs.forEach(function(input) {
      (function() {
          testItems(input[0], input[1])
      }).should.throw(Error);
    });
  });
});
