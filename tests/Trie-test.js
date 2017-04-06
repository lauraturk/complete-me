import { expect, assert } from 'chai';
import CompleteMe from '../scripts/Trie'

const fs = require('fs');
const text = "/usr/share/dict/words"
let dictionary = fs.readFileSync(text).toString().trim().split('\n')

describe('Trie', () => {

  it('should instantiate a new Trie', () => {
    let completeMe = new CompleteMe ()

    expect(completeMe).to.be.a('object');
  })
});

describe('Test trie', () => {
  let completeMe;

  beforeEach(function () {
    completeMe = new CompleteMe ()
  });

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

  it('should create a child node of root with the first letter', () => {
    completeMe.insert('cat')

    assert.property(completeMe.root.children, 'c')
  })

  it('should create a second child node after the first', () => {
    completeMe.insert('cat')

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

    let suggestion = completeMe.suggest('mon')
    let suggestion2 = completeMe.suggest('b')

    assert.deepEqual(suggestion, ['monk', 'monkey'])
    assert.deepEqual(suggestion2, ['bananas', 'brains'])
  })

  it('should suggest a word', () => {
    completeMe.insert('shirt')
    completeMe.insert('shirtsleeve')
    completeMe.insert('shit')
    completeMe.insert('happy')
    completeMe.insert('happiness')

    let suggestion = completeMe.suggest('shi')
    let suggestion2 = completeMe.suggest('happ')

    assert.deepEqual(suggestion, ['shirt', 'shirtsleeve', 'shit'])
    assert.deepEqual(suggestion2, ['happy', 'happiness'])
  });
});

describe('Dictionary Test', () => {

  let completeMe = new CompleteMe ()

  it('should count all the words in the dictionary', () => {
    completeMe.populate(dictionary)

    assert.equal(completeMe.counter, 235886)
  })

  it('should count the times a word is selected', () => {
    completeMe.select('loq', 'loquacious')

    let foundNode = completeMe.findNode('loquacious')

    expect(foundNode.selectionCount).to.equal(1)
  })

  it('should be populated with all the piz words', () => {
    let pizWords = completeMe.suggest('piz')

    expect(pizWords.length).to.equal(5)
    expect(pizWords).to.deep.equal(
      ["pize", "pizza", "pizzeria", "pizzicato", "pizzle"])
  })

  it('should show my favorite word as the first suggestion', () => {
    completeMe.select('ban', 'banal')
    completeMe.select('qui', 'quixotic')

    let suggestions = completeMe.suggest('ban')
    let suggestions2 = completeMe.suggest('qui')


    expect(suggestions[0]).to.deep.equal('banal')
    expect(suggestions2[0]).to.deep.equal('quixotic')
  })

  it('should show words based on the times selected', () => {
    completeMe.select('ban', 'banal')
    completeMe.select('ban', 'banish')
    completeMe.select('ban', 'banish')
    completeMe.select('ban', 'banal')
    completeMe.select('ban', 'bantamweight')
    completeMe.select('ban', 'bandoleer')

    let suggestion3 = completeMe.suggest('ban')

    expect(suggestion3[0]).to.deep.equal('banal')
    expect(suggestion3[1]).to.deep.equal('banish')
    expect(suggestion3[2]).to.deep.equal('bandoleer')
    expect(suggestion3[3]).to.deep.equal('bantamweight')
  })
})
