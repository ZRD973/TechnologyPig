function formatTen (num) {
    return num > 9 ? (num + '') : ('0' + num);
}
/* 日期格式化 */
export const format = function (_date,_format) {
    if (!_date || !_format) {
        return '';
    }
    let format = _format.toLowerCase()
    var date = new Date(_date)
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    if (format === 'yyyy-mm-dd hh:mm:ss'){
        return year + '-' + formatTen(month) + '-' + formatTen(day) + ' ' + formatTen(hour) + ':' + formatTen(minute) + ':' + formatTen(second);
    } else {
        return year + '-' + formatTen(month) + '-' + formatTen(day);
    }
}
/* 数组去重:返回数组 */
export const uniqArr = function (array){
    var temp = [];
    var index = [];
    var l = array.length;
    for (var i = 0; i < l; i++){
        for (var j = i + 1; j < l; j++){
            if (array[i] === array[j]){
                i++;
                j = i;
            }
        }
        temp.push(array[i]);
        index.push(i);
    }
    return temp;
};

/* 数组去重:返回数组下标 */
export const uniqArrIndex = function (array){
    var temp = [];
    var index = [];
    var l = array.length;
    for (var i = 0; i < l; i++){
        for (var j = i + 1; j < l; j++){
            if (array[i] === array[j]){
                i++;
                j = i;
            }
        }
        temp.push(array[i]);
        index.push(i);
    }
    return index;
};

/* JSON数组去重 */

export const uniqJson = function (c) {
    let temp = {}; //用于id判断重复
    let result = [];//最后的回新数组
    //遍历c数组，将每个item.tag在temp中是否存在值做判断，如不存在则对应的item赋值给新数组，并将答temp中item.tag对应的key赋值，下次对相同值做判断时便不会走此分支，达到判断重复值的目的；
    c.map((item,index) => {
        if (!temp[item.tag]){
            result.push(item);
            temp[item.tag] = true
        }
    })
    return result;
}

/**
 *
 * @param fn {Function}   实际要执行的函数
 * @param threshold {Number}  执行间隔，单位是毫秒（ms）
 *
 * @return {Function}     返回一个“节流”函数
 */

export const throttle = (fn, threshold) => {

    // 记录上次执行的时间
    let last;

    // 定时器
    let timer;

    // 默认间隔为 250ms
    threshold || (threshold = 250);

    // 返回的函数，每过 threshhold 毫秒就执行一次 fn 函数
    return function () {

        // 保存函数调用时的上下文和参数，传递给 fn
        let context = this;
        let args = arguments;

        let now = +new Date();

        // 如果距离上次执行 fn 函数的时间小于 threshhold，那么就放弃
        // 执行 fn，并重新计时
        if (last && now < last + threshold) {
            clearTimeout(timer);

            // 保证在当前时间区间结束后，再执行一次 fn
            timer = setTimeout(function () {
                last = now;
                fn.apply(context, args)
            }, threshold)

            // 在时间区间的最开始和到达指定间隔的时候执行一次 fn
        } else {
            last = now;
            fn.apply(context, args)
        }
    }
}


/**
 *
 * @param fn {Function}   实际要执行的函数
 * @param delay {Number}  延迟时间，也就是阈值，单位是毫秒（ms）
 *
 * @return {Function}     返回一个“去弹跳”了的函数
 */
export const debounce = (fn, delay=1000) => {

    // 定时器，用来 setTimeout
    let timer;

    // 返回一个函数，这个函数会在一个时间区间结束后的 delay 毫秒时执行 fn 函数
    return function () {

        // 保存函数调用时的上下文和参数，传递给 fn
        let context = this;
        let args = arguments;

        // 每次这个返回的函数被调用，就清除定时器，以保证不执行 fn
        clearTimeout(timer);

        // 当返回的函数被最后一次调用后（也就是用户停止了某个连续的操作），
        // 再过 delay 毫秒就执行 fn
        timer = setTimeout(function () {
            fn.apply(context, args)
        }, delay)
    }
}
/**
 *
 * @param {*} list {Array} - 要迭代的数组
 * @param {*} limit {Number} - 并发数据量控制数
 * @param {*} asyncHandle {Function} - 对list的每一项的处理函数，参数为当前处理项，必须return 一个Promise来确定是否继续进行迭代
 * @return {*} {Promise} - 返回一个Promise值来确认所有数据是否迭代完成
 */
export const mapLimit = (list,limit,asyncHandle) => {
    let recursion = (arr) => {
        return asyncHandle(arr.shift())
            .then(()=>{
                if (arr.length!==0) return recursion(arr) //数组还未迭代完，递归继续进行迭代
                else {
                    debugger;
                    return 'finish'
                };
            })
    }

    let listCopy = [].concat(list);
    let asyncList = []; //正在进行的所有并发异步操作
    if (limit > listCopy.length) limit = listCopy.length; // 若并发数据大于数组长度，设置并发数为数组长度
    while(limit--) {
        asyncList.push(recursion(listCopy));
    }
    return Promise.all(asyncList);
}


// 控制最大并发
export class concurrentPoll {
    constructor(max = 10) {
        this.tasks = []; // 任务队列
        this.max = max; // 最大并发数
        setTimeout(() => { // 函数主体执行完后立即执行
            this.run();
        },0);
    }
    // 添加任务方法
    addTask(task) {
        this.tasks.push(task);
    }
    // 任务运行方法
    run() {
        if (this.tasks.length === 0) return; // 判断是否还有任务
        let min = Math.min(this.tasks.length, this.max); // 取任务个数与最大并发数最小值
        for(let i=0; i<min; i++) {
            this.max--; // 执行最大并发递减
            let task = this.tasks.shift(); // 从数组投标取任务
            task().then(res => { // 当for循环执行完毕后异步请求执行回调，此时max变为0
                console.log(res);
            }).catch(err => {
                console.log(err);
            }).finally(() => { // 当所有请求完成并返回结果后，执行finally回调，此时回调将按照for循环依次执行，此时max为0
                this.max++; // 超过最大并发10以后的任务将按照任务顺序依次执行。此处可理解为递归操作。
                this.run();
            })
        }
    }
}

