const { Suite } = require('benchmark');
const assert = require('assert');
const traverse = require('traverse');
const treeCrawl = require('tree-crawl');
const honnold = require('./dist/honnold');

const tree = {};

function add(obj, depthTarget, depth = 0) {
    if (depth < depthTarget) {
        const next = {};
        obj[depth.toString()] = next;
        return add(next, depthTarget, ++depth);
    } else {
        // Add a property we can return
        obj.leaf = true;
    }
}

// Create many adjacent objects
const wide = 100;
const deep = 20;
for (let x = 0; x < wide; x++) {
    const adjacent = {};
    add(adjacent, deep); // Create many deep objects
    tree[x.toString()] = adjacent;
}

console.log(`\nSimple traverse (${wide} wide x ${deep} deep):\n`);
new Suite()
	.add('honnold', () => {
        const leaves = [];
        honnold(tree, leaf => leaves.push(leaf));
        assert.strictEqual(leaves.length, wide);
    })
	.add('traverse', () => {
        const leaves = traverse(tree).reduce(function (acc, x) {
            if (this.isLeaf) acc.push(x);
            return acc;
        }, []);
        assert.strictEqual(leaves.length, wide);
    })
	.add('treeCrawl', () => {
        const leaves = [];
        treeCrawl(tree, (n) => {
            if (!(n && n.constructor == Object && typeof n === 'object')) {
                leaves.push(n);
            }
        }, {getChildren: node => Object.values(node)});
        assert.strictEqual(leaves.length, wide);
    })
    .on('cycle', e => console.log(String(e.target)))
    .on('complete', function() {
        console.log('\nFastest is ' + this.filter('fastest').map('name'));
    })
    .run();
