const { test } = require('uvu');
const assert = require('uvu/assert');
const honnold = require('../src/iterative');

test('onLeaf - null', () => {
  const leaves = [];
	honnold({
		a: null
	}, {
		onLeaf: leaf => leaves.push(leaf)
	});
	assert.equal(leaves, [null]);
});

test('onLeaf - array', () => {
  const leaves = [];
	honnold({
		a: [null, {}, []]
	}, {
		onLeaf: leaf => leaves.push(leaf)
	});
	assert.equal(leaves, [[null, {}, []]]);
});

test('onLeaf - object', () => {
  const leaves = [];
	honnold({
		a: {}
	}, {
		onLeaf: leaf => leaves.push(leaf)
	});
	assert.equal(leaves, [{}]);
});

test.run();
