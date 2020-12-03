function blocksMinX(bs) {
  for (var i = 0; i < blocksCount(bs); i++) {
    if (bs[i].x < minX) minX = bs[i].x
  }
}
