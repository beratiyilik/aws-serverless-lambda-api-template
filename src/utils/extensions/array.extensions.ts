Array.prototype.groupBy = function (fn) {
  return this.reduce((acc, item) => {
    const key = fn(item);
    if (acc[key]) {
      acc[key].push(item);
    } else {
      acc[key] = [item];
    }
    return acc;
  }, {});
};

Array.prototype.thenBy = function (fn) {
  return this.sort((a, b) => {
    const aKey = fn(a);
    const bKey = fn(b);
    return aKey.localeCompare(bKey);
  });
};

export {};
