const cheerio = require('cheerio');
const html = `
    <html>
        <head></head>
        <body>
            <h1 class="title">hello world</h1>
            <div id="box">
                <p class="post">hello cheerio</p>
                <span>welcome</span>
            </div>
            <div>
                <span>Study</span>
            </div>
            <ul class="here">
                <li>Item1</li>
                <li>Item2</li>
                <li>Item3</li>
                <li>
                    <ul>
                        <li>Item1</li>
                        <li>Item2</li>
                        <li>Item3</li>
                    </ul>
                </li>
            </ul>
        </body>
    </html>
`
// load
const $ = cheerio.load(html);
// console.log($.html());
// select
let h1_title = $('h1.title').text();
// console.log(h1_title);
let p_post = $('div#box p.post').text();
// console.log(p_post);
let s = $('div#box span').text();
// console.log(s);
// find 全都包含 
let lis = $('.here').find('li');
// console.log(lis.length);
// children 子节点 不包含孙节点
lis = $('.here').children('li');
// console.log(lis.length);
// contents 所有节点包括文本节点和注释节点
let contents = $('.here').contents();
// console.log(contents);
// parent
let box = $('.post').parent();
// console.log(box.html());
// parents parentsUntil
let anc = $('.post').parents();
let anco = $('.post').parentsUntil('.title');
// console.log(anc.html());
// console.log(anco.html());

// eq
let li1 = $('li').eq(1);
console.log(li1.text());