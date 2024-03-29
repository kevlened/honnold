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
    if (keys.length > 4) remove();
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

honnold x 1,495 ops/sec ±1.33% (90 runs sampled)
traverse x 591 ops/sec ±3.59% (87 runs sampled)
tree-crawl x 2,108 ops/sec ±0.78% (91 runs sampled)

Fastest is tree-crawl

Leaf with keys traverse (100 wide x 20 deep):

honnold x 831 ops/sec ±2.19% (89 runs sampled)
traverse x 559 ops/sec ±1.25% (92 runs sampled)
tree-crawl - N/A: 

Fastest is honnold

Leaf with depth traverse (100 wide x 20 deep):

honnold x 868 ops/sec ±2.10% (91 runs sampled)
traverse x 558 ops/sec ±2.59% (90 runs sampled)
tree-crawl x 2,087 ops/sec ±0.59% (94 runs sampled)

Fastest is tree-crawl

Internal node traverse (100 wide x 20 deep):

honnold x 1,434 ops/sec ±2.57% (94 runs sampled)
traverse x 565 ops/sec ±0.43% (93 runs sampled)
tree-crawl x 2,044 ops/sec ±1.75% (93 runs sampled)

Fastest is tree-crawl
```

## License

MIT
