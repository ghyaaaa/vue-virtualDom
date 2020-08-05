class Observer{
    constructor(data){
        this.walk(data)
    }
    walk(data){
        //1.是否是对象
        if (!data || typeof data !== 'object'){
            return
        }
        Object.keys(data).forEach(key => {
            this.defineReactive(data, key, data[key])
        })
    }
    defineReactive(obj, key, val){
        let _this = this;
        //收集依赖 发送通知
        let dep = new Dep;
        //
        this.walk(val);
        Object.defineProperty(obj, key, {
            enumerable: true,
            configurable: true,
            get(){
                Dep.target && dep.addSub(Dep.target)
                return val
            },
            set(newValue){
                if (newValue === val){
                    return;
                }
                val = newValue;
                _this.walk(newValue);
                //发送
                dep.notify()
            }
        })
    }
}