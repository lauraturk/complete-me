import { expect, assert } from 'chai';
import CompleteMe from '../scripts/Trie'
// import Node from '../scripts/Node'

describe('Trie', () => {

  const completeMe = new CompleteMe ()

  it('should instantiate a new Trie', () => {

    expect(completeMe).to.be.a('object');
  })

  it('should have a root node with null data', () => {

    expect(completeMe.root.data).to.equal(null)
  })

  it('should have a root node with an empty object for children', () => {

    expect(completeMe.root.children).to.deep.equal({})
  })

  it('should have a root node with a default isWord value of false', () => {
    let completeMe = new CompleteMe ('a')

    expect(completeMe.root.isWord).to.equal(false)
  })

  it.skip('should take a string and create an array of single letters', () => {
    let wordArray = completeMe.insert('cat')

    expect(wordArray).to.deep.equal(['c', 'a', 't'])
  })

  it('should create a child node of root with the first letter', () => {
    completeMe.insert('cat')

    assert.property(completeMe.root.children, 'c')
  })

  it('should create a second child node after the first', () => {

    expect(completeMe.root.children['c'].children).to.have.property('a')
  })

  it('should not create duplicate nodes', () => {
    completeMe.insert('catcher')
    completeMe.insert('catch')
    let keys = Object.keys(completeMe.root.children)

    expect(keys).to.have.length(1)
  })

  it('should recognize a word', () => {
    completeMe.insert('dog')

    assert.equal(completeMe.root.children
      .d.children
      .o.children
      .g.isWord, true)
  })

  it('should have a function called findNode', () => {
    assert.isFunction(completeMe.findNode)
  })

  it('should find a node', () => {
    completeMe.insert('dog')
    let foundNode = completeMe.findNode('dog')

    assert.equal(foundNode.data, 'g')
  })

  it('should find a node in the middle of a word', () => {
    completeMe.insert('bananas')
    let foundNode = completeMe.findNode('banan')

    assert.equal(foundNode.data, 'n')
  })

  it('should suggest a word', () => {
    completeMe.insert('bananas')
    completeMe.insert('brains')
    completeMe.insert('monkey')
    completeMe.insert('monk')

    let suggestion = completeMe.findWordSuggestion('mon')
    let suggestion2 = completeMe.findWordSuggestion('b')

    assert.deepEqual(suggestion, ['monk', 'monkey'])
    assert.deepEqual(suggestion2, ['bananas', 'brains'])
  })

  it('should suggest a word', () => {
    completeMe.insert('shirt')
    completeMe.insert('shirtsleeve')
    completeMe.insert('shit')
    completeMe.insert('happy')
    completeMe.insert('happiness')

    let suggestion = completeMe.findWordSuggestion('shi')
    let suggestion2 = completeMe.findWordSuggestion('happ')

    assert.deepEqual(suggestion, ['shirt', 'shirtsleeve', 'shit'])
    assert.deepEqual(suggestion2, ['happy', 'happiness'])
  })




})
