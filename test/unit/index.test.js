const chai = require('chai');
const expect = chai.expect;

describe('Loading the module', () => {
  it('Should load object with items property which is type of object', () => {
    const value = require('../../lib/index');
    expect(value).to.be.a('object');
    expect(value.items).to.be.a('object');
  })
})