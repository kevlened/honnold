const parentMap = new WeakMap();
module.exports = function traverse(current, {onLeaf, onInternalNode}, parent, currentKey) {
  let cb;
  if (current && typeof current === 'object' && !Array.isArray(current)) {
    parentMap.set(current, {p: parent, k: currentKey});
    let isInternal = false;
    for (const key of Object.keys(current)) {
      isInternal = true;
      traverse(current[key], {onLeaf, onInternalNode}, current, key);
    }
    cb = isInternal ? onInternalNode : onLeaf;
  } else {
    cb = onLeaf;
  }

  cb && cb(current, {
    remove() { delete parent[currentKey] },
    replace(next) { parent[currentKey] = next },
    key: currentKey,

    // could create depth(), but it's extra size for a rare optimization

    // getting keys is expensive, so hide it
    keys() {
      const resolved = [];

      // get the key of the parent until there are no parents
      let p = parent;
      let k = currentKey;
      while (p) {
        resolved.unshift(k);
        ({p, k} = parentMap.get(p) || {});
      }
      
      return resolved;
    }
  });
}
