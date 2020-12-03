function blocksMinX(bs) {
  var i = 0
  while (i < blocksCount(bs)) {
    if (bs[i].x < minX) minX = bs[i].x
    i++
  }
}
