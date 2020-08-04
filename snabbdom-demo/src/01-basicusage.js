// import { h, thunk, init } from 'snabbdom'
// console.log(h, thunk, init);
// var snabbdom = require('snabbdom');
// console.log(snabbdom);

// 导入时指定接收的成员
import { h, thunk, init } from 'snabbdom';
// console.log(h, thunk, init);

//返回值 patch函数，作用对比两个vnode的差异更新到dom
let patch = init([]);
//第一个参数 标签+选择器
//第二个参数：如果是字符串的话就是标签中的内容
let vnode = h('div#container.cls', 'hello world')

let app = document.querySelector('#app');
//第一个参数： 可以是dom元素，内部会把dom转换成vnode
//第二个参数：vnode
let oldVnode = patch(app, vnode);

//假设时刻
vnode = h('div', 'hello snabbdom');

patch(oldVnode, vnode);

