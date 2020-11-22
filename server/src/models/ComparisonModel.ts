// import { SyntaxKind } from 'ts-morph'
// import ISyntaxTreeNode from './ISyntaxTreeNode'

// class ComparisonModel {
//     private sourceFile1: ISyntaxTreeNode
//     private sourceFile2: ISyntaxTreeNode
//     private similarity: number

//     constructor() {
//         this.similarity = 0
//     }

//     compareNodes(Node1: ISyntaxTreeNode, Node2: ISyntaxTreeNode): number {
//         let hashCode1: Map<SyntaxKind, number> = new Map()
//         let hashCode2: Map<SyntaxKind, number> = new Map()
//         let commonHashCodes: Map<SyntaxKind, number> = new Map()

//         hashCode1 = Node1.getHashCodeMap()
//         hashCode2 = Node2.getHashCodeMap()

//         for (let [key, value] of hashCode1) {
//             if (hashCode2.has(key)) {
//                 if (value <= hashCode2.get(key)) {
//                     commonHashCodes.set(key, value)
//                 } else {
//                     commonHashCodes.set(key, hashCode2.get(key))
//                 }
//             }
//         }

//         let noOfCommonNodes = 0
//         for (let value of commonHashCodes.values()) {
//             noOfCommonNodes += value
//         }

//         this.similarity = (noOfCommonNodes / Node2.getHashValue().length) * 100
//         return this.similarity
//     }

//     compareFiles(Node1: ISyntaxTreeNode, Node2: ISyntaxTreeNode): void {
//         this.similarity = this.compareNodes(Node1, Node2)
//     }
// }

// export default ComparisonModel
