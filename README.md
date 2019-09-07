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
honnold(obj, (leaf, {remove, key}) => {
    if (key === 'prop2') remove();
});

// Replace all leaves with a specific value
honnold(obj, (leaf, {replace}) => {
    if (leaf === 'hi') replace('bye');
});
```

## Why?

I thought the existing traversal libraries were bloated and slow. Through benchmarking, I've learned the existing libraries are pretty good. `honnold` is still useful if size is important or the interface is easier to use.

## Stats

* honnold - [262 B](https://bundlephobia.com/result?p=honnold@0.2.1)
* [traverse](https://github.com/substack/js-traverse) - [1.4 kB](https://bundlephobia.com/result?p=traverse@0.6.6)
* [tree-crawl](https://github.com/ngryman/tree-crawl) - [1.2 kB](https://bundlephobia.com/result?p=tree-crawl@1.0.5)

```
Simple traverse (100 wide x 20 deep):

honnold x 1,665 ops/sec ±1.36% (90 runs sampled)
traverse x 494 ops/sec ±3.46% (86 runs sampled)
treeCrawl x 1,781 ops/sec ±0.67% (92 runs sampled)

Fastest is treeCrawl
```

## License

MIT
