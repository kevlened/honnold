module.exports = function traverse(current, {onLeaf, onInternalNode}) {
  let path = [];
  let parent;
  let currentKey;
  let paths = [];
  let parents = [];
  let cb;

  do {
    if (current && typeof current === 'object' && !Array.isArray(current)) {
      let isInternal = false;
      for (const key of Object.keys(current)) {
        isInternal = true;
        paths.push(path.concat([key]));
        parents.push(current);
      }
      cb = isInternal ? onInternalNode : onLeaf;
    } else {
      cb = onLeaf;
    }

    cb && cb(current, {
      remove() { delete parent[this.key] },
      replace(next) { parent[this.key] = next },
      key: currentKey,
      keys: path
    });

    path = paths.pop() || [];
    currentKey = path[path.length - 1];
    parent = parents.pop();
    current = parent && parent[currentKey];

  } while (path.length)
}
