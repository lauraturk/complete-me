import Node from './Node'
require('locus')

export default class CompleteMe {
  constructor() {
    this.root = new Node(null)
    this.counter = 0;
  }

  insert(word) {
    let wordArray = word.split('');
    let currentNode = this.root;

    wordArray.forEach(letter => {
      let newNode = new Node(letter)

      if (!currentNode.children[letter]) {
        currentNode.children[letter] = newNode;
      }
      currentNode = currentNode.children[letter]
    })

    currentNode.isWord = true
    this.counter++;
  }

  suggest(input) {
    let suggestions = []

    return this.suggestFindWord(this.findNode(input), input, suggestions)
  }

  suggestFindWord(currentNode, input, suggestions) {
    let sortedSuggestions;

    if (currentNode.isWord) {
      suggestions.push({word: input,
        selectionCount: currentNode.selectionCount})
    }
    let keys = Object.keys(currentNode.children)

    keys.forEach( key => {
      let nextNode = currentNode.children[key]

      this.suggestFindWord(nextNode, input + key, suggestions)
    });

    suggestions.sort( (a, b) =>
      b.selectionCount - a.selectionCount
    )

    sortedSuggestions = suggestions.map(obj => {
      return obj['word']
    })
    return sortedSuggestions;
  }

  findNode(input) {
    let inputArray = input.split('')
    let currentChar = inputArray.shift()
    let currentNode = this.root

    while (currentNode.children[currentChar]) {
      currentNode = currentNode.children[currentChar]
      currentChar = inputArray.shift()
    }
    return currentNode
  }

  populate (dictionary) {
    dictionary.forEach(word => {
      this.insert(word)
    })
  }

  select (input, selection) {
    let suggestionArray = this.suggest(input)

    let selectedWord = suggestionArray.find(word => {
      return word === selection
    })
    let foundNode = this.findNode(selectedWord)

    foundNode.selectionCount++
  }
}
