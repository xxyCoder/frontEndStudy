const assert = require('assert');

assert.doesNotThrow(
    () => {
        throw new TypeError('错误信息');
    },
    TypeError,
    '抛出错误'
);