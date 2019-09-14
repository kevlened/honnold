module.exports = function traverse(node, {onLeaf, onInternalNode}, parent, keys) {
  if (onInternalNode && !parent) {
    onInternalNode(node, {
      node,
      key: '',
      keys: [],
      remove() {},
      replace() {}
    });
  }

  let n,
    isLeaf = true,
    leafExtra = onLeaf && onLeaf.length > 1,
    internalNodeExtra = onInternalNode && onInternalNode.length > 1;
  if (leafExtra || internalNodeExtra) keys = keys || [];
  for (const key in node) {
    isLeaf = false;
    n = node[key];
    if (n && n.constructor == Object && typeof n === 'object') {
      let removed = false;
      if (onInternalNode) {
        !internalNodeExtra
          ? onInternalNode(n)
          : onInternalNode(n, {
            node,
            key,
            keys: [...keys, key],
            remove() {
              removed = true;
              delete node[key];
            },
            replace(val) {
              node[key] = val;
              n = val;
            }
          });
      }
      if (n && n.constructor == Object && typeof n === 'object' && !removed) traverse(n, {onLeaf, onInternalNode}, node, keys && [...keys, key]);
    } else if (onLeaf) {
      !leafExtra
        ? onLeaf(n)
        : onLeaf(n, {
          node,
          key,
          keys: [...keys, key],
          remove() {
              delete node[key];
          },
          replace(val) {
              node[key] = val;
          }
        });
    }
  }
  if (onLeaf && isLeaf && parent) {
    !leafExtra
        ? onLeaf(n)
        : onLeaf(n, {
          node,
          key: keys[keys.length - 1],
          keys,
          remove() {
            delete parent[keys[keys.length - 1]];
          },
          replace(val) {
            parent[keys[keys.length - 1]] = val;
          }
        });
  }
}
