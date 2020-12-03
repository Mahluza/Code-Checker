function worldKeyMove(w, k) {
  if (k === 'left') {
    worldMove(aux.neg1, 0, w)
  } else if (k === 'right') {
    worldMove(1, 0, w)
  } else if (k === 'down') {
    worldJumpDown(w)
  } else if (k === 'a') {
    worldRotateCCW(w)
  } else if (k === 's') {
    worldRotateCW(w)
  }
}
