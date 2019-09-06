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
honnold(obj, leaf => console.log(leaf));
// > true
// > hi

// Remove all leaves with a specific value
honnold(obj, (leaf, {remove}) => {
    if (leaf === 'hi') remove();
});

// Remove all leaves with a specific key
honnold(obj, (leaf, {remove, keys}) => {
    const key = keys[keys.length - 1];
    if (key === 'prop2') remove();
});

// Remove all leaves beyond a specific depth
honnold(obj, (leaf, {remove, keys}) => {
    if (keys.length > 4) remove();
});

// Replace all leaves with a specific value
honnold(obj, (leaf, {replace}) => {
    if (leaf === 'hi') replace('bye');
});
```

## Why?

I thought the existing traversal libraries were bloated and slow. Through benchmarking, I've learned the existing libraries are pretty good. `honnold` is still useful if size is important or the interface is easier to use.

## Stats

* honnold - 215 B
* [traverse](https://github.com/substack/js-traverse) - [1.4 kB](https://bundlephobia.com/result?p=traverse@0.6.6)
* [tree-crawl](https://github.com/ngryman/tree-crawl) - [1.2 kB](https://bundlephobia.com/result?p=tree-crawl@1.0.5)

```
Simple traverse (100 wide x 20 deep):

honnold x 1,212 ops/sec ±2.32% (89 runs sampled)
traverse x 521 ops/sec ±3.53% (88 runs sampled)
treeCrawl x 43,950 ops/sec ±0.98% (93 runs sampled)

Fastest is treeCrawl
```

## License

MIT
