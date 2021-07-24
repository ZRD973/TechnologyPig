function convert(obj){
    Object.keys(obj).forEach(key =>{
        let inetnalValue = obj[key]
        Object.defineProperty(obj,key,{
            get(){
                console.log(`getting key "${key}":${inetnalValue}`);
                return inetnalValue
            },
            set(newValue){
                console.log(`setting key "${key}":${newValue}`);
                inetnalValue = newValue
            }
        })
    })
}
const obj = { foo: 123 }
convert(obj)

obj.foo
obj.foo = 2222
obj.foo