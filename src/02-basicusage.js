// 2. div中放置子元素 h1 p
import { h, init } from 'snabbdom'

let patch = init([])

let vnode = h('div#container', [
    h('h1', 'Hello Sabbdom'),
    h('p', '这是一个p标签')
])

let app = document.querySelector('#app')

let oldVnode = patch(app, vnode);

setTimeout(() => {
    vnode = h('div#container.cls', [
      h('h1', 'Hello world'),
      h('p', 'Hello p')
    ])
    //上次  这次
    vnode = patch(oldVnode, vnode);

    //清空
    //错误
    // patch(endVnode, null);
    // 通过创建注释节点来实现
    vnode = patch(vnode, h('!'));
    // Vnode节点仍然存在
    // patch(vnode, h('div', '又在原位置出现'))
}, 2000)


