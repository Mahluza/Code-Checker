function worldKeyMove(w, k) {
  switch (k) {
    case 'left': {
      worldMove(aux.neg1, 0, w)
      break
    }
    case 'right': {
      worldMove(1, 0, w)
      break
    }
    case 'down': {
      worldJumpDown(w)
      break
    }
    case 'a': {
      worldRotateCCW(w)
      break
    }
    case 's': {
      worldRotateCW(w)
      break
    }
    default: {
      // do nothing
      break
    }
  }
}
