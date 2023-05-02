import { parseHTML } from "./parse";

function genProps(attrs) {  // 属性是一个数组
    let str = '';
    for(let i = 0;i < attrs.length;++ i) {
        let attr = attrs[i];    // {name,value};
        if(attr.name === 'style') { // 对于style属性需要在外面加一个大括号  style: {color: 'red'};
            let obj = {};
            attr.value.split(';').forEach(item => {
                const [key,val] = item.split(':');
                obj[key] = val;
            });
            attr.value = obj;
        }
        str += `${attr.name}:${JSON.stringify(attr.value)},`;
    }
    // 去掉多余逗号
    return `{${str.slice(0,-1)}}`;
}

function genChildren(children) {
    if(children) {
        return children.map(child => gen(child)).join(',');
    }
}

function gen(node) {
    if(node.type === 1) {
        return codegen(node);
    } else if(node.type === 3) {    // 对于文本属性，需要判断是否带有变量，没有带变量直接返回
        let text = node.text;
        const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g;
        if(!defaultTagRE.test(text)) {  // 不带变量文本 
            return `_v(${JSON.stringify(text)})`;
        } else {
            defaultTagRE.lastIndex = 0; // 去掉全局匹配，避免exec无法继续匹配
            let tokens = [],match,lastIndex = 0;
            while(match = defaultTagRE.exec(text)) {
                let index = match.index;    // 匹配的位置
                if(index > lastIndex) {
                    tokens.push(JSON.stringify(text.slice(lastIndex,index)));
                }
                tokens.push(`_s(${match[1].trim()})`);
                lastIndex = index + match[0].length;
            }
            if(lastIndex < text.length) {   // 拿到剩余不带变量的字符
                tokens.push(JSON.stringify(text.slice(lastIndex)));
            }
            return `_v(${tokens.join('+')})`;
        }
    }
}

function codegen(ast) {
    let children = genChildren(ast.children);
    // 生成对应标签
    let code = (`_c('${ast.tag}',${ast.attrs.length > 0? genProps(ast.attrs) : 'null'}${ast.children.length? `,${children}` : ''})`);
    return code;
}

export function compileToFunction(template) {
    // 将template 转换成ast语法树
    let ast = parseHTML(template);
    // 生成render函数 （执行后获得虚拟DOM）
    let code = codegen(ast);
    code = `with(this) {return ${code}}`;   // 为了取变量的值，将作用域改变
    console.log(code);
    let render = new Function(code);
    return render;
}