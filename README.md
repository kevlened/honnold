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

* honnold - [262 B](https://bundlephobia.com/result?p=honnold@0.2.1)
* [traverse](https://github.com/substack/js-traverse) - [1.4 kB](https://bundlephobia.com/result?p=traverse@0.6.6)
* [tree-crawl](https://github.com/ngryman/tree-crawl) - [1.2 kB](https://bundlephobia.com/result?p=tree-crawl@1.0.5)

```
Leaf traverse (100 wide x 20 deep):

honnold x 1,131 ops/sec ±6.74% (72 runs sampled)
traverse x 579 ops/sec ±3.68% (88 runs sampled)
tree-crawl x 1,648 ops/sec ±5.68% (76 runs sampled)

Fastest is tree-crawl

Leaf with keys traverse (100 wide x 20 deep):

honnold x 859 ops/sec ±1.05% (91 runs sampled)
traverse x 580 ops/sec ±2.70% (90 runs sampled)
tree-crawl - N/A: 

Fastest is honnold

Leaf with depth traverse (100 wide x 20 deep):

honnold x 877 ops/sec ±0.31% (94 runs sampled)
traverse x 582 ops/sec ±2.40% (89 runs sampled)
tree-crawl x 2,061 ops/sec ±0.39% (92 runs sampled)

Fastest is tree-crawl

Internal node traverse (100 wide x 20 deep):

honnold x 1,423 ops/sec ±0.47% (94 runs sampled)
traverse x 581 ops/sec ±2.62% (89 runs sampled)
tree-crawl x 2,043 ops/sec ±0.45% (90 runs sampled)

Fastest is tree-crawl
```

## License

MIT
