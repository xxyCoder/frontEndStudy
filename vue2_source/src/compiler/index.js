// 对模板进行编译处理
// 标签名 a-aaa
const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z]*`;
// 命名空间标签 aa:aa-xxx
const qnameCapture = `((?:${ncname}\\:)?${ncname})`;
// 开始标签-捕获标签名
const startTagOpen = new RegExp(`^<${qnameCapture}`);
// 结束标签-匹配标签结尾的 </div>
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`);
// 匹配属性
const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
// 匹配标签结束的 >
const startTagClose = /^\s*(\/?)>/;
// 匹配 {{ }} 表达式
const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g;

function parseHTML(html) {  // 对于vue2来说，一开始一定是<

    const ELEMENT_TYPE = 1;
    const TEXT_TYPE = 3;
    const stack = [];
    let top,root;

    function createASTElement(tag,attrs) {
        return {
            tag,
            type: ELEMENT_TYPE,
            children: [],
            attrs,
            parent: null
        };
    }

    // 最终需要转换成一颗抽象语法树
    function start(tag,attrs) {
        let node = createASTElement(tag,attrs);
        if(!root) { // 如果是空树，那么将当前节点当作根节点
            root = node;
        }
        if(top) {   // 父子节点双向记住
            node.parent = top;
            top.children.push(node);
        }
        stack.push(node);
        top = node;
    }

    function chars(text) {  
        text = text.replace(/\s/g,'');
        text && top.children.push({ // 文本直接放到当前节点中
            type: TEXT_TYPE,
            text,
            parent: top
        });
    }

    function end(tag) {
        let node = stack.pop();
        if(node !== tag) {  // 校验是否合法
            // todo...
        }
        top = stack = stack[stack.length - 1];
    }

    function advance(n) {
        html = html.substring(n);
    }

    function parseStartTag() {
        const start = html.match(startTagOpen);
        if (start) {
            const match = {
                tagName: start[1],
                attrs: []
            }
            advance(start[0].length);   // 截取，才好继续匹配后面的内容\
            // 如果不是结束标签就一直匹配
            let attr, end;
            while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
                advance(attr[0].length);
                match.attrs.push({name: attr[1],value: attr[3] || attr[4] || attr[5]});
            }
            if (end) {
                advance(end[0].length);
            }
            return match;
        }


        return false;   // 不是开始标签
    }

    while (html) {
        // textEnd = 0,说明是一个开始标签或结束标签 <div>   ></div>
        // textEnd > 0,说明是文本的结束位置 xxxx</div>
        let textEnd = html.indexOf('<');
        if(textEnd == 0) {
            const startTagMatch = parseStartTag();
            if(startTagMatch) {
                start(startTagMatch.tagName,startTagMatch.attrs);
                continue;
            }
            let endTagMatch = html.match(endTag);
            if(endTagMatch) {
                advance(endTagMatch[0].length);
                end(endTagMatch[1]);
                continue;
            }
        }
        else if(textEnd > 0) {  
            let text = html.substring(0,textEnd);   // 文本内容
            if(text) {
                chars(text);
                advance(text.length);
            }
        }
    }
}

export function compileToFunction(template) {
    // 将template 转换成ast语法树
    let ast = parseHTML(template);
    // 生成render函数 （执行后获得虚拟DOM）
}