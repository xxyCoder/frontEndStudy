import { sum } from './js/utils.js';
const mul = require('./js/api.js');
import './js/login.js';
import './js/image.js';
import './js/font.js'
import('./js/dynamic.js').then(module => {
    console.log(module.add(1,2));
})

console.log(sum(1,2));
console.log(mul(2,3));
