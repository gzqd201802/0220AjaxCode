
// 以后 global 这个单词可以被代码压缩工具压缩成一个字母，节省容量
(function (global) {

    // 用一个对象统一管理起来 get 和 post 两个功能
    const heima = {
        author: '黑马程序员',
        get: function (url, data, fn) {
            // 1. new 创建ajax对象 小黄人对象
            const xhr = new XMLHttpRequest();
            // 2. open 设置 请求的方法 和请求的地址
            xhr.open('get', `${url}?${data}`);
            // 3. send 发送请求
            xhr.send();
            // 4. onload 注册回调函数
            xhr.onload = function () {
                // console.log(xhr.responseText);
                // 把 xhr.responseText 作为函数调用的实参
                fn(xhr.responseText);
            };
        },
        post: function (url, data, fn) {
            // 1. new 创建ajax对象 小黄人对象
            const xhr = new XMLHttpRequest();
            // 2. open 设置 请求的方法 和请求的地址
            xhr.open('post', url);
            // 3. 设置请求头(固定写法)
            xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
            // 4. send 发送请求
            xhr.send(data);
            // 5. onload 注册回调函数
            xhr.onload = function () {
                // console.log(xhr.responseText);
                // 调用函数并传递实参
                fn(xhr.responseText);
            };
        },
        ajax: function ajax(obj) {
            // 由于传入的是对象 - 之前的数据需要从对象中通过点语法获取
            let type = obj.type || 'get';  // 甚至可以用 || 设置默认值
            let url = obj.url;
            let data = obj.data;
            let fn = obj.success;

            // 1. new 创建ajax对象 小黄人对象
            const xhr = new XMLHttpRequest();
            // 2. 只有 get 需要把参数拼接到 url 中，判断处理 get 情况即可
            if (type === 'get') {
                url += `?${data}`;
            }
            // type 为请求方式
            xhr.open(type, url);

            // 3. post 在 send() 中传递参数
            //  补充：get 不需要传参的时候可以设置默认值 null
            let myDate = null;
            if (type === 'post') {
                xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
                myDate = data;
            }
            // 都要 send 发送，get 的时候发送默认值 null
            xhr.send(myDate);

            // 4. 不管  get 和 post 都要注册回调函数
            xhr.onload = function () {
                fn(xhr.responseText);
            };
        }
    };

    // 把 heima 添加到全局对象中，哪里都能访问
    global.heima = heima;

})(window);
// 沙箱传递 window 的好处：
//   代码压缩的时候，会把函数内所有的局部变量都压缩成一个字母