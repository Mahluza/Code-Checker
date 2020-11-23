class A {
  v1: number
  v2: number

  constructor() {
    this.v1 = 2
    this.v2 = 2
  }

  add(): number {
    return this.v1 + this.v2
  }
}

let a = new A()

// function fun1() {
//   let a = []
//   a.push(455)
//   let b = 3
//   let c = 4 + b - 5
//   let d = c
//   let e = a
// }
