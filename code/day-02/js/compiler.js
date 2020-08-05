class Compiler {
    constructor(vm){
        this.el = vm.$el
        this.vm = vm
        this.compile(this.el)
    }

    compile(el){
        let childNodes = el.childNodes
        Array.from(childNodes).forEach(node => {
            if (this.isTextNode(node)) {
                this.compileText(node)
            } else if (this.isElementNode(node)){
                this.CompileElement(node)
            } 
            //判断node是否有子节点
            if (node.childNodes && node.childNodes.length){
                this.compile(node)
            }
        })

    }
    //编译元素节点
    CompileElement(node){
        console.log(node.attributes)
        //遍历所有的属性节点
        Array.from(node.attributes).forEach(attr => {
            let attrName = attr.name;
            if (this.isDirective(attrName)) {
                attrName = attrName.substr(2);
                let key = attr.value;
                this.update(node, key, attrName);
            }
        })

    }
    update(node, key, attrName){
        let updateFn = this[attrName + 'Updater']
        updateFn && updateFn.call(this, node, this.vm[key], key)
    }
    textUpdater(node, value, key){
        node.textContent = value;
        new Watcher(this.vm, key, (newValue) => {
            node.textContent = newValue
        })
    }

    //v-model
    modelUpdater(node, value, key){
        node.value = value
        new Watcher(this.vm, key, (newValue) => {
            node.value = newValue
        })
        //双向绑定
        node.addEventListener('input', () => {
            this.vm[key] = newValue
        })
    }
    //编译文本节点，处理差值表达式
    compileText(node){
        // console.dir(node)
        //
        let reg = /\{\{(.+?)\}\}/
        let value = node.textContent
        if (reg.test(value)){
            let key = RegExp.$1.trim()
            node.textContent = value.replace(reg, this.vm[key])
            //
            new Watcher(this.vm, key, (newValue) => {
                node.textContent = newValue
            })
        }
    }
    //判断元素属性是否是指令
    isDirective(attrName){
        return attrName.startsWith('v-')
    }
    //判断节点是否文本节点
    isTextNode(node){
        return node.nodeType === 3
    }

    //判断节点是否元素节点
    isElementNode(node){
        return node.nodeType === 1
    }
}