function worldJumpDown(w) {
  if (didLanded(w)) {
  } else {
    tetras.tetraMove(0, 1, w.tetra)
    worldJumpDown(w)
  }
}
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
    default: {
      break
    }
  }
}
