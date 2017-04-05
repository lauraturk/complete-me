import Node from './Node'
require('locus')

export default class CompleteMe {
  constructor() {
    this.root = new Node(null)
    this.dictionary = []
    this.countWords;
  }

  insert(word) {
    let wordArray = word.split('');
    let currentNode = this.root;

    var dis = this;

    wordArray.forEach(letter => {
      let newNode = new Node(letter)

      if (!currentNode.children[letter]) {
        currentNode.children[letter] = newNode;
      }

      currentNode = currentNode.children[letter]

    });

    currentNode.isWord = true
    this.count(word)

  }

  count(word) {

    this.dictionary.push(word)
    return this.countWords = this.dictionary.length
  }

  suggest(currentNode, input, suggestions) {
    // eval(locus)
    if (currentNode.isWord) {
      suggestions.push(input)
    }

    let keys = Object.keys(currentNode.children)

    keys.forEach( key => {
      let nextNode = currentNode.children[key]

      this.suggest(nextNode, input + key, suggestions)
    });
    return suggestions;

  }

  findWordSuggestion(input) {
    let inputArray = input.split('');
    let suggestions = []

    let currentChar = inputArray.shift()
    let currentNode = this.root;


    while (currentNode.children[currentChar]) {
      currentNode = currentNode.children[currentChar]
      currentChar = inputArray.shift()
    }
    return this.suggest(currentNode, input, suggestions)

  }

  findNode(input) {

    let inputArray = input.split('');
    let suggestions = []

    let currentChar = inputArray.shift()
    let currentNode = this.root;


    while (currentNode.children[currentChar]) {
      currentNode = currentNode.children[currentChar]
      currentChar = inputArray.shift()
    }

    return currentNode;

  }
}
