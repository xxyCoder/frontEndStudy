const assert = require('assert');
assert.ifError(null);
assert.ifError(0);
assert.ifError(1);
assert.ifError(new Error(1));