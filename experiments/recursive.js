// Inspired by:
// https://gist.github.com/tushariscoolster/567c1d22ca8d5498cbc0#gistcomment-2573987
// https://github.com/ngryman/tree-crawl
module.exports = function traverse(node, onLeaf) {
    let n;
    for (const key in node) {
        n = node[key];
        if (n && n.constructor == Object && typeof n === 'object') {
            traverse(n, onLeaf);
        } else {
            onLeaf.length < 2
                ? onLeaf(n)
                : onLeaf(n, {
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