function getRandomPolarCoordinates(minDistance, maxDistance) {
  const angle = Math.random() * 2 * Math.PI;
  const dist = minDistance + Math.random() * (maxDistance - minDistance);
  return {
    x:Math.cos(angle) * dist,
    y:Math.sin(angle) * dist
  }
}