function worldJumpDown(w) {
  if (!didLanded(w)) {
    tetras.tetraMove(0, 1, w.tetra)
    worldJumpDown(w)
  }
}
function worldKeyMove(w, k) {
  if (k === 'left') {
    worldMove(aux.neg1, 0, w)
  } else if (k === 'right') {
    worldMove(1, 0, w)
  }
}
