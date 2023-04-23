import '../font/iconfont.css';

function packFont() {
    const oEle = document.createElement('div');
    const oSpan = document.createElement('span');
    oSpan.innerHTML = 'hello font!';
    oSpan.style.fontFamily = "站酷高端黑 Regular";
    oEle.appendChild(oSpan);
    return oEle;
}
document.body.appendChild(packFont());