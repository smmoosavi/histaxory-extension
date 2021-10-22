module.exports = function when(condition, p0, p1) {
  if (condition) {
    return p0;
  } else {
    return p1;
  }
};
