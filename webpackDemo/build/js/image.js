"use strict";

function packImg() {
  const oEle = document.createElement('div');
  const oImg = document.createElement('img');
  oImg.src = require('../images/avatar.jpg');
  oEle.appendChild(oImg);
  return oEle;
}
document.body.appendChild(packImg());