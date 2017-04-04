import { expect, assert } from 'chai';
import Node from '../scripts/Node'

describe('Node', () => {

  it('should instantiate a new node', () => {
    let node = new Node ()

    expect(node).to.be.a('object');
  })

  it('should accept a letter as data', () => {
    let node = new Node ('a')

    expect(node.data).to.equal('a')
  })

  it('should have an empty object for children', () => {
    let node = new Node ('a')

    expect(node.children).to.deep.equal({})
  })

  it('should have a default isWord value of false', () => {
    let node = new Node ('a')

    expect(node.isWord).to.equal(false)
  })
})
