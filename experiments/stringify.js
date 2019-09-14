module.exports = function traverse(node, {onLeaf, onInternalNode}) {
  const map = new Set();
  const noop = () => {};
  onLeaf = onLeaf || noop;
  onInternalNode = onInternalNode || noop;
  // const leafExtra = onLeaf && onLeaf.length > 1;
  // const internalNodeExtra = onInternalNode && onInternalNode.length > 1;
  JSON.stringify(node, function(key, value) {
    if (!map.has(this)) {
      map.add(this);
      onInternalNode(this);
    }
    if (!(value && value.constructor == Object && typeof value === 'object')) {
      onLeaf(value);
    }
    return value;
  });
}
