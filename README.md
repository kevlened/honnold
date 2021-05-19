# honnold
Quickly traverse large js objects without the weight

# Usage

```javascript
const honnold = require('honnold');

const obj = {
    some: {
        deeply: {
            nested: {
                object: {
                    prop1: true,
                    prop2: 'hi'
                }
            }
        }
    }
};

// Basic traversal
honnold(obj, {onLeaf: leaf => console.log(leaf)});
// > true
// > hi

// Remove all leaves with a specific value
honnold(obj, {onLeaf: (leaf, {remove}) => {
    if (leaf === 'hi') remove();
}});

// Remove all leaves with a specific key
honnold(obj, {onLeaf: (leaf, {remove, key}) => {
    if (key === 'prop2') remove();
}});

// Replace all leaves with a specific value
honnold(obj, {onLeaf: (leaf, {replace}) => {
    if (leaf === 'hi') replace('bye');
}});

// Remove all leaves beyond a specific depth
honnold(obj, {onLeaf: (leaf, {remove, keys}) => {
    if (keys().length > 4) remove();
}});

// Loop through all internal nodes
honnold(obj, {onInternalNode: node => console.log(node)});
```

## Why?

I thought the existing traversal libraries were bloated, slow, and difficult to use. Through benchmarking, I've learned the existing libraries (namely `tree-crawl`) are pretty fast, but `honnold` is still useful if size is important or you want a simpler interface.

## Stats

* honnold [![bundlephobia](https://img.shields.io/bundlephobia/minzip/honnold.svg)](https://bundlephobia.com/result?p=honnold)
* [traverse](https://github.com/substack/js-traverse) [![bundlephobia](https://img.shields.io/bundlephobia/minzip/traverse.svg)](https://bundlephobia.com/result?p=traverse)
* [tree-crawl](https://github.com/ngryman/tree-crawl) [![bundlephobia](https://img.shields.io/bundlephobia/minzip/tree-crawl.svg)](https://bundlephobia.com/result?p=tree-crawl)

```
Leaf traverse (100 wide x 20 deep):

honnold x 3,032 ops/sec ±0.46% (95 runs sampled)
traverse x 1,107 ops/sec ±0.29% (96 runs sampled)
tree-crawl x 3,516 ops/sec ±0.14% (98 runs sampled)

Fastest is tree-crawl

Leaf with keys traverse (100 wide x 20 deep):

honnold x 2,404 ops/sec ±0.20% (98 runs sampled)
traverse x 1,052 ops/sec ±1.82% (91 runs sampled)
tree-crawl - N/A: 

Fastest is honnold

Leaf with depth traverse (100 wide x 20 deep):

honnold x 2,372 ops/sec ±0.21% (98 runs sampled)
traverse x 1,078 ops/sec ±1.28% (93 runs sampled)
tree-crawl x 3,421 ops/sec ±1.43% (93 runs sampled)

Fastest is tree-crawl

Internal node traverse (100 wide x 20 deep):

honnold x 2,559 ops/sec ±0.61% (96 runs sampled)
traverse x 1,070 ops/sec ±0.71% (96 runs sampled)
tree-crawl x 2,808 ops/sec ±0.33% (95 runs sampled)

Fastest is tree-crawl
```

## License

MIT
