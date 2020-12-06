import { expect } from 'chai'
import CodeMatch from '../src/models/comparision/CodeMatch'
import SyntaxTreeNode from '../src/models/content/SyntaxTreeNode'

describe('tests for CodeMatch', () => {
  it('CodeMatch for 2 syntax trees', () => {
    let child1 = [new SyntaxTreeNode(229, 1, 1, '229.247.246.78.8', null)]
    let s1: SyntaxTreeNode = new SyntaxTreeNode(294, 1, 1, '229.247.246.78.8', child1, [])
    let s2: SyntaxTreeNode = new SyntaxTreeNode(294, 1, 1, '229.247.246.78.8', child1, [])
    expect(new CodeMatch(s1, s2, 100).getCodeMatch()).to.deep.equal({
      node1: {
        nodeType: 294,
        startLineNumber: 1,
        endLineNumber: 1,
        hashCode: '229.247.246.78.8',
        children: [
          {
            nodeType: 229,
            startLineNumber: 1,
            endLineNumber: 1,
            hashCode: '229.247.246.78.8',
            children: null,
            commentLines: [],
          },
        ],
        commentLines: [],
      },
      node2: {
        nodeType: 294,
        startLineNumber: 1,
        endLineNumber: 1,
        hashCode: '229.247.246.78.8',
        children: [
          {
            nodeType: 229,
            startLineNumber: 1,
            endLineNumber: 1,
            hashCode: '229.247.246.78.8',
            children: null,
            commentLines: [],
          },
        ],
        commentLines: [],
      },
      type: 'COMPLETE_MATCH',
      rangeOfNode1: [1, 1],
      rangeOfNode2: [1, 1],
    })
  })

  it('CodeMatch similarity percentage', () => {
    let child1 = [new SyntaxTreeNode(229, 1, 1, '229.247.246.78.8', null)]
    let s1: SyntaxTreeNode = new SyntaxTreeNode(294, 1, 1, '229.247.246.78.8', child1, [])
    let s2: SyntaxTreeNode = new SyntaxTreeNode(294, 1, 1, '229.247.246.78.8', child1, [])
    expect(new CodeMatch(s1, s2, 100).getSimilarityPercentage()).to.equal(100)
  })

  it('CodeMatch with matched lines', () => {
    let child1 = [new SyntaxTreeNode(229, 1, 1, '229.247.246.78.8', null)]
    let s1: SyntaxTreeNode = new SyntaxTreeNode(294, 1, 1, '229.247.246.78.8', child1, [])
    let s2: SyntaxTreeNode = new SyntaxTreeNode(294, 1, 1, '229.247.246.78.8', child1, [])
    expect(new CodeMatch(s1, s2, 100).getCodeMatch()).to.deep.equal({
      node1: {
        nodeType: 294,
        startLineNumber: 1,
        endLineNumber: 1,
        hashCode: '229.247.246.78.8',
        children: [
          {
            nodeType: 229,
            startLineNumber: 1,
            endLineNumber: 1,
            hashCode: '229.247.246.78.8',
            children: null,
            commentLines: [],
          },
        ],
        commentLines: [],
      },
      node2: {
        nodeType: 294,
        startLineNumber: 1,
        endLineNumber: 1,
        hashCode: '229.247.246.78.8',
        children: [
          {
            nodeType: 229,
            startLineNumber: 1,
            endLineNumber: 1,
            hashCode: '229.247.246.78.8',
            children: null,
            commentLines: [],
          },
        ],
        commentLines: [],
      },
      type: 'COMPLETE_MATCH',
      rangeOfNode1: [1, 1],
      rangeOfNode2: [1, 1],
    })
  })
})
