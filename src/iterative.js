module.exports = function traverse(current, {onLeaf, onInternalNode}) {
  let parent;
  let currentKey;
  let keys = [];
  let parents = [];
  const parentMap = new Map();
  let cb;

  do {
    if (current && typeof current === 'object' && !Array.isArray(current)) {
      parentMap.set(current, {p: parent, k: currentKey});
      let isInternal = false;
      for (const key of Object.keys(current)) {
        isInternal = true;
        keys.push(key);
        parents.push(current);
      }
      cb = isInternal ? onInternalNode : onLeaf;
    } else {
      cb = onLeaf;
    }

    if (cb) {
      let boundParent = parent;
      let boundKey = currentKey;
      cb(current, {
        remove() { delete boundParent[boundKey] },
        replace(next) { boundParent[boundKey] = next },
        key: boundKey,

        // could create depth(), but it's extra size for a rare optimization

        // getting keys is expensive, so hide it
        keys() {
          const resolved = [];

          // get the key of the parent until there are no parents
          let p = boundParent;
          let k = boundKey;
          while (p) {
            resolved.unshift(k);
            ({p, k} = parentMap.get(p) || {});
          }
          
          return resolved;
        }
      });
    }

    currentKey = keys.pop();
    parent = parents.pop();
    current = parent && parent[currentKey];

  } while (parent)
}
