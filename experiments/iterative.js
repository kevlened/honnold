// https://stackoverflow.com/a/40053014/1978203
module.exports = function traverse(object, onLeaf) {
    let n, node;
    const stack = [object];
    while (stack.length) {
        node = stack.shift();
        for (const key in node) {
            n = node[key];
            if (n && n.constructor == Object && typeof n === 'object') {
                stack.unshift(n);
            } else {
                onLeaf.length < 2
                    ? onLeaf(n)
                    : onLeaf(n, {
                        node,
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
