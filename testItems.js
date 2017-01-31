function testItems(a, b) {
  // validate that both inputs are numbers
  if (!(typeof a === 'number' && typeof b === 'number')) {
    throw Error('Oh no!');
  }
  return a + b;
}

module.exports = testItems;
