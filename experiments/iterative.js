module.exports = function traverse(object, onLeaf) {
  var n, node, key, stack = [object];
  while (node = stack.pop()) {
    for (key in node) {
      n = node[key];
      if (n && n.constructor == Object && typeof n == 'object') stack.push(n);
      else {
        if (onLeaf.length < 2) onLeaf(n);
        else onLeaf(n, {
          node,
          key,
          remove() {
            delete node[key];
          },
          replace(val) {
            node[key] = val;
          }
        });
      }
    }
  }
};
