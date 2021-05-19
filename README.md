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

honnold x 3,399 ops/sec ±0.37% (97 runs sampled)
traverse x 1,124 ops/sec ±0.38% (96 runs sampled)
tree-crawl x 3,510 ops/sec ±0.13% (100 runs sampled)

Fastest is tree-crawl

Leaf with keys traverse (100 wide x 20 deep):

honnold x 2,518 ops/sec ±0.10% (98 runs sampled)
traverse x 1,135 ops/sec ±0.40% (97 runs sampled)
tree-crawl - N/A: 

Fastest is honnold

Leaf with depth traverse (100 wide x 20 deep):

honnold x 2,513 ops/sec ±0.10% (99 runs sampled)
traverse x 1,146 ops/sec ±0.21% (98 runs sampled)
tree-crawl x 3,424 ops/sec ±0.47% (97 runs sampled)

Fastest is tree-crawl

Internal node traverse (100 wide x 20 deep):

honnold x 2,806 ops/sec ±0.82% (99 runs sampled)
traverse x 1,093 ops/sec ±0.12% (97 runs sampled)
tree-crawl x 2,932 ops/sec ±0.75% (98 runs sampled)

Fastest is tree-crawl
```

## License

MIT
