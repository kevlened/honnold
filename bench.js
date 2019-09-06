const { Suite } = require('benchmark');
const honnold = require('./src');
const traverse = require('traverse');
const treeCrawl = require('tree-crawl');

const foo = new Suite();

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

const deoptimize = (leaf) => leaf.break && console.log('skipped');

console.log(`\nSimple traverse (${wide} wide x ${deep} deep):\n`);
foo
	.add('honnold', () => honnold(tree, deoptimize))
	.add('traverse', () => traverse(tree).forEach(deoptimize))
	.add('treeCrawl', () => treeCrawl(tree, deoptimize))
    .on('cycle', e => console.log(String(e.target)))
    .on('complete', function() {
        console.log('\nFastest is ' + this.filter('fastest').map('name'));
    })
    .run();
