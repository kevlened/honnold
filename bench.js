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
  add(adjacent, deep - 2); // Create many deep objects
  tree[x.toString()] = adjacent;
}

async function runSuite(name, suite) {
  console.log(`\n${name}:\n`);
  return suite
    .on('cycle', e => console.log(String(e.target)))
    // .on('error', e => console.log(e.target.error))
    .on('complete', function() {
      console.log('\nFastest is ' + this.filter('fastest').map('name'));
    })
    .run()
}

async function main() {
  await runSuite(`Leaf traverse (${wide} wide x ${deep} deep)`,
    new Suite()
      .add('honnold', () => {
        const leaves = [];
        honnold(tree, {onLeaf: leaf => leaves.push(leaf)});
        assert.strictEqual(leaves.length, wide);
      })
      .add('traverse', () => {
        const leaves = traverse(tree).reduce(function (acc, x) {
          if (this.isLeaf) acc.push(x);
          return acc;
        }, []);
        assert.strictEqual(leaves.length, wide);
      })
      .add('tree-crawl', () => {
        const leaves = [];
        treeCrawl(tree, (n) => {
          if (!(n && n.constructor == Object && typeof n === 'object')) {
            leaves.push(n);
          }
        }, {getChildren: node => Object.values(node)});
        assert.strictEqual(leaves.length, wide);
      }));

  await runSuite(`Leaf with keys traverse (${wide} wide x ${deep} deep)`,
    new Suite()
      .add('honnold', () => {
        const leaves = [];
        honnold(tree, {onLeaf: (leaf, {keys}) => leaves.push([leaf, keys])});
        assert.strictEqual(leaves.length, wide);
        assert.strictEqual(leaves[0][1].length, deep);
      })
      .add('traverse', () => {
        const leaves = traverse(tree).reduce(function (acc, x) {
          if (this.isLeaf) acc.push([x, this.path]);
          return acc;
        }, []);
        assert.strictEqual(leaves.length, wide);
        assert.strictEqual(leaves[0][1].length, deep);
      })
      .add('tree-crawl - N/A'));

  await runSuite(`Leaf with depth traverse (${wide} wide x ${deep} deep)`,
    new Suite()
      .add('honnold', () => {
        const leaves = [];
        honnold(tree, {onLeaf: (leaf, {keys}) => leaves.push([leaf, keys.length])});
        assert.strictEqual(leaves.length, wide);
        assert.strictEqual(leaves[0][1], deep);
      })
      .add('traverse', () => {
        const leaves = traverse(tree).reduce(function (acc, x) {
          if (this.isLeaf) acc.push([x, this.path.length]);
          return acc;
        }, []);
        assert.strictEqual(leaves.length, wide);
        assert.strictEqual(leaves[0][1], deep);
      })
      .add('tree-crawl', () => {
        const leaves = [];
        treeCrawl(tree, (n, ctx) => {
          if (!(n && n.constructor == Object && typeof n === 'object')) {
            leaves.push([n, ctx.depth]);
          }
      }, {getChildren: node => Object.values(node)});
        assert.strictEqual(leaves.length, wide);
        assert.strictEqual(leaves[0][1], deep);
      }));
  
  const internalNodeCount = wide * (deep - 1) + 1;
  await runSuite(`Internal node traverse (${wide} wide x ${deep} deep)`,
    new Suite()
      .add('honnold', () => {
        const nodes = [];
        honnold(tree, {onInternalNode: node => nodes.push(node)});
        assert.strictEqual(nodes.length, internalNodeCount);
      })
      .add('traverse', () => {
        const nodes = traverse(tree).reduce(function (acc, x) {
          if (!this.isLeaf) acc.push(x);
          return acc;
        }, []);
        assert.strictEqual(nodes.length, internalNodeCount);
      })
      .add('tree-crawl', () => {
        const nodes = [];
        treeCrawl(tree, (n) => {
          if (n && n.constructor == Object && typeof n === 'object') {
            nodes.push(n);
          }
        }, {getChildren: node => Object.values(node)});
        assert.strictEqual(nodes.length, internalNodeCount);
      }));
}

main();

// traverse(tree).reduce(function (acc, x) {
//   if (this.isLeaf) console.log([x, this.path]);
//   return acc;
// }, []);
    
