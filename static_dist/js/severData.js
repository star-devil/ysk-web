(function innit(){
     $.ajax({
        // url: 'https://easy-mock.com/mock/5c9c2e7fd172204b3a07ec75/severData',
        url: '/cms/get_center_patient/',
        async: 'true',
        success: function (res) {
            var myDate = new Date();
            var myYear = myDate.getFullYear();
            var month = myDate.getMonth() + 1;
            var myMonth = month < 10 ? ('0' + month) : month ;
            var myDay = myDate.getDate() < 10 ? ('0' + myDate.getDate()) : myDate.getDate();
            var date = myYear + myMonth + myDay;
            var test=res.data;
            var arrDate=[];
            test.forEach(function(ele,index){
                // console.log($('.patientInfo'));
                var eleDate = ele.date.replace(/[-]/g,"");
                if((eleDate - date) <= 2 && (eleDate - date) > 0) {
                    arrDate.push(ele);
                }
                return  arrDate;
            });
            var arr = arrDate.slice(0,1);
            var arrNum = arr[0].date.replace(/[-]/g,"");
            $(".label-success").text(arrDate.length);
            $(".severNum").text(arrDate.length);
            console.log(arr);
            $('.first-name').text(arr[0].name);
            $('.message').text(arr[0].kind);
            $('.days').text(arrNum - date);
            $.each(arrDate,function () {
                //处理函数
                //初始变量
                var oUl0 = document.getElementsByClassName('infoWrapper')[0];
                var oInput0 = document.getElementsByClassName('search')[0];
                var store = createStore({text: '', keywords: '所有'});

                store.subscribe(function () {
                    //更新视图
                    renderPage(lastFilterArr(arrDate));
                });

                //数据渲染
                function renderPage (data) {
                    //遍历
                    var htmlStr = '';
                    oUl0.innerHTML = '';
                    data.forEach(function (ele, index, self) {
                        htmlStr = htmlStr + '<li class="patientInfo"><p class="date">' + ele.date +'</p><p class="name">' + ele.name +'</p><p class="phone">' + ele.phone +'</p><p class="des">'+ ele.kind + '</p></li>';
                        // console.log(htmlStr);
                    });
                    oUl0.innerHTML = htmlStr;
                }
                renderPage(arrDate);

// 添加行为
                oInput0.oninput = debounce(function () {
                    store.dispatch({type: 'text', value: this.value});
                },500);
//筛选
                var oBtnArr = [].slice.call(document.getElementsByClassName('sBtn'),0);
                var lastActiveBtn = oBtnArr[3];
                oBtnArr.forEach(function (ele,index,self) {
                    ele.onclick = function () {
                        $('.sBtn').removeClass('sActive');
                        $(this).addClass('sActive');
                        store.dispatch({type:'keywords', value: this.getAttribute('keywords')});
                    }
                });
//防抖函数
                function debounce (handler,delay) {
                    var timer = null;
                    return function (e) {
                        var _self = this, _arg = arguments;
                        clearTimeout(timer);
                        timer = setTimeout(function () {
                            handler.apply(_self,_arg);
                        }, delay);
                    }
                }
//文本过滤
                function filterArrByText (data,text) {
                    if (!text) {
                        return data;
                    }else{
                        return data.filter(function (ele,index){
                            //    如果输入的字符连续存在于已有数据中会返回一个不为-1的值
                            return ele.name.indexOf(text) !== -1;
                        });
                    }
                }
//筛选类型
                function filterArrByKeywords (data,keywords) {
                    if (keywords === '所有') {
                        return data;
                    }else{
                        return data.filter(function (ele,index,self) {
                            // return ele.keywords === keywords;
                            return ele.kind.indexOf(keywords) !== -1;
                        })
                    }
                }
//对事件状态进行深层组合控制的高级函数
//理论依据redux状态管理机制
                function combineFilter (config){
                    return function (data) {
                        for (var prop in config) {
                            // console.log(prop,config[prop],state)
                            data = config[prop](data, store.getState(prop));
                        }
                        return data;
                    }
                }
                var lastFilterArr = combineFilter({
                    text: filterArrByText,
                    keywords: filterArrByKeywords,
                });
//create store
                function createStore (initialState) {
                    var state = initialState || {};
                    var list = [];
                    function getState (type) {
                        return state[type];
                    }
                    function dispatch (action) {
                        state[action.type] = action.value;
                        //调用之前订阅过的函数
                        list.forEach(function (ele) {
                            ele();
                        })
                    }
                    function subscribe (func) {
                        list.push(func);
                    }
                    return {
                        getState: getState,
                        dispatch: dispatch,
                        subscribe: subscribe
                    }
                }
            });
             // console.log(this);//不加 context 时 this 指向url中的对象，加了context，this指向$里的对象
        },
        error: function (e) {
            console.log(e.status,e.statusText);//错误状态码和错误信息
        },
//         complete: function () {
//             //可以放假数据处理函数
//             var severArr = [
//                 {date:'2018/12/31',name:'李富贵',phone:'13512564895',des:'高血压体脂肪检查',keywords:'检查'},
//                 {date:'2018/12/25',name:'曾宝强',phone:'13512564895',des:'糖尿病空腹血糖检查',kind:'检查'},
//                 {date:'2018/12/11',name:'陈飞',phone:'13512564895',des:'幼儿卡介苗接种',kind:'接种'},
//                 {date:'2018/12/6',name:'黄丽',phone:'13512564895',des:'孕期B超检查',kind:'检查'},
//                 {date:'2018/12/3',name:'王成',phone:'13512564895',des:'骨折之后康复治疗',kind:'康复'},
//                 {date:'2018/11/29',name:'吕一丽',phone:'13512564895',des:'乙肝疫苗接种',kind:'接种'},
//                 {date:'2018/11/19',name:'卢玉兰',phone:'13512564895',des:'糖尿病肾功能检查',kind:'检查'},
//                 {date:'2018/11/16',name:'刘万鹏',phone:'13512564895',des:'高血压康复治疗',kind:'康复'},
//                 {date:'2018/11/13',name:'雷乔亚',phone:'13512564895',des:'产后恢复康复治疗',kind:'康复'},
//             ];

// //初始变量
//             var oUl0 = document.getElementsByClassName('infoWrapper')[0];
//             var oInput0 = document.getElementsByClassName('search')[0];
//             var store = createStore({text: '', kind: '所有'});

//             store.subscribe(function () {
//                 //更新视图
//                 renderPage(lastFilterArr(severArr));
//             });

// //数据渲染
//             function renderPage (data) {
//                 //遍历
//                 var htmlStr = '';
//                 oUl0.innerHTML = '';
//                 data.forEach(function (ele, index, self) {
//                     // console.log(ele,index,self);
//                     htmlStr = htmlStr + '<li class="patientInfo"><p class="date">' + ele.date +'</p><p class="name">' + ele.name +'</p><p class="phone">' + ele.phone +'</p><p class="des">'+ ele.des + '</p></li>';
//                     // console.log(htmlStr);
//                 });
//                 oUl0.innerHTML = htmlStr;
//             }
//             renderPage(severArr);

// // 添加行为
//             oInput0.oninput = debounce(function () {
//                 store.dispatch({type: 'text', value: this.value});
//             },500);
// //筛选
//             var oBtnArr = [].slice.call(document.getElementsByClassName('sBtn'),0);
//             var lastActiveBtn = oBtnArr[3];
//             oBtnArr.forEach(function (ele,index,self) {
//                 ele.onclick = function () {
//                     $('.sBtn').removeClass('sActive');
//                     $(this).addClass('sActive');
//                     store.dispatch({type:'kind', value: this.getAttribute('kind')});
//                 }
//             });
// //防抖函数
//             function debounce (handler,delay) {
//                 var timer = null;
//                 return function (e) {
//                     var _self = this, _arg = arguments;
//                     clearTimeout(timer);
//                     timer = setTimeout(function () {
//                         handler.apply(_self,_arg);
//                     }, delay);
//                 }
//             }
// //文本过滤
//             function filterArrByText (data,text) {
//                 if (!text) {
//                     return data;
//                 }else{
//                     return data.filter(function (ele,index){
//                         //    如果输入的字符连续存在于已有数据中会返回一个不为-1的值
//                         return ele.name.indexOf(text) !== -1;
//                     });
//                 }
//             }
// //筛选类型
//             function filterArrByKind (data,kind) {
//                 if (kind === '所有') {
//                     return data;
//                 }else{
//                     return data.filter(function (ele,index,self) {
//                         return ele.kind === kind;
//                     })
//                 }
//             }
// //对事件状态进行深层组合控制的高级函数
// //理论依据redux状态管理机制
//             function combineFilter (config){
//                 return function (data) {
//                     for (var prop in config) {
//                         // console.log(prop,config[prop],state)
//                         data = config[prop](data, store.getState(prop));
//                     }
//                     return data;
//                 }
//             }
//             var lastFilterArr = combineFilter({
//                 text: filterArrByText,
//                 kind: filterArrByKind,
//             });
// //create store
//             function createStore (initialState) {
//                 var state = initialState || {};
//                 var list = [];
//                 function getState (type) {
//                     return state[type];
//                 }
//                 function dispatch (action) {
//                     state[action.type] = action.value;
//                     //调用之前订阅过的函数
//                     list.forEach(function (ele) {
//                         ele();
//                     })
//                 }
//                 function subscribe (func) {
//                     list.push(func);
//                 }
//                 return {
//                     getState: getState,
//                     dispatch: dispatch,
//                     subscribe: subscribe
//                 }
//             }
//         },
        context: $('.wrapper')
    });
})();

$('.sever-data').click(function () {
     $.ajax({
        // url: 'https://easy-mock.com/mock/5c9c2e7fd172204b3a07ec75/severData',
        url: '/cms/get_center_patient/',
        async: 'true',
        success: function (res) {
            var myDate = new Date();
            var myYear = myDate.getFullYear();
            var month = myDate.getMonth() + 1;
            var myMonth = month < 10 ? ('0' + month) : month ;
            var myDay = myDate.getDate() < 10 ? ('0' + myDate.getDate()) : myDate.getDate();
            var date = myYear + myMonth + myDay;
            var test=res.data;
            var arrDate=[];
            test.forEach(function(ele,index){
                var eleDate = ele.date.replace(/[-]/g,"");
                if((eleDate - date) <= 2 && (eleDate - date) >= 0) {
                    arrDate.push(ele);
                }
                return  arrDate;
            });
            var arr = arrDate.slice(0,1);
            var arrNum = arr[0].date.replace(/[-]/g,"");
            $(".label-success").text(arrDate.length);
            $(".severNum").text(arrDate.length);
            console.log(arr);
            $('.first-name').text(arr[0].name);
            $('.message').text(arr[0].kind);
            $('.days').text(arrNum - date);
            $.each(arrDate,function () {
                //处理函数
                //初始变量
                var oUl0 = document.getElementsByClassName('infoWrapper')[0];
                var oInput0 = document.getElementsByClassName('search')[0];
                var store = createStore({text: '', keywords: '所有'});

                store.subscribe(function () {
                    //更新视图
                    renderPage(lastFilterArr(arrDate));
                });

                //数据渲染
                function renderPage (data) {
                    //遍历
                    var htmlStr = '';
                    oUl0.innerHTML = '';
                    data.forEach(function (ele, index, self) {
                        htmlStr = htmlStr + '<li class="patientInfo"><p class="date">' + ele.date +'</p><p class="name">' + ele.name +'</p><p class="phone">' + ele.phone +'</p><p class="des">'+ ele.kind + '</p></li>';
                        // console.log(htmlStr);
                    });
                    oUl0.innerHTML = htmlStr;
                }
                renderPage(arrDate);

// 添加行为
                oInput0.oninput = debounce(function () {
                    store.dispatch({type: 'text', value: this.value});
                },500);
//筛选
                var oBtnArr = [].slice.call(document.getElementsByClassName('sBtn'),0);
                var lastActiveBtn = oBtnArr[3];
                oBtnArr.forEach(function (ele,index,self) {
                    ele.onclick = function () {
                        $('.sBtn').removeClass('sActive');
                        $(this).addClass('sActive');
                        store.dispatch({type:'keywords', value: this.getAttribute('keywords')});
                    }
                });
//防抖函数
                function debounce (handler,delay) {
                    var timer = null;
                    return function (e) {
                        var _self = this, _arg = arguments;
                        clearTimeout(timer);
                        timer = setTimeout(function () {
                            handler.apply(_self,_arg);
                        }, delay);
                    }
                }
//文本过滤
                function filterArrByText (data,text) {
                    if (!text) {
                        return data;
                    }else{
                        return data.filter(function (ele,index){
                            //    如果输入的字符连续存在于已有数据中会返回一个不为-1的值
                            return ele.name.indexOf(text) !== -1;
                        });
                    }
                }
//筛选类型
                function filterArrByKeywords (data,keywords) {
                    if (keywords === '所有') {
                        return data;
                    }else{
                        return data.filter(function (ele,index,self) {
                            // return ele.keywords === keywords;
                            return ele.kind.indexOf(keywords) !== -1;
                        })
                    }
                }
//对事件状态进行深层组合控制的高级函数
//理论依据redux状态管理机制
                function combineFilter (config){
                    return function (data) {
                        for (var prop in config) {
                            // console.log(prop,config[prop],state)
                            data = config[prop](data, store.getState(prop));
                        }
                        return data;
                    }
                }
                var lastFilterArr = combineFilter({
                    text: filterArrByText,
                    keywords: filterArrByKeywords,
                });
//create store
                function createStore (initialState) {
                    var state = initialState || {};
                    var list = [];
                    function getState (type) {
                        return state[type];
                    }
                    function dispatch (action) {
                        state[action.type] = action.value;
                        //调用之前订阅过的函数
                        list.forEach(function (ele) {
                            ele();
                        })
                    }
                    function subscribe (func) {
                        list.push(func);
                    }
                    return {
                        getState: getState,
                        dispatch: dispatch,
                        subscribe: subscribe
                    }
                }
            });
             // console.log(this);//不加 context 时 this 指向url中的对象，加了context，this指向$里的对象
        },
        error: function (e) {
            console.log(e.status,e.statusText);//错误状态码和错误信息
        },
//         complete: function () {
//             //可以放假数据处理函数
//             var severArr = [
//                 {date:'2018/12/31',name:'李富贵',phone:'13512564895',des:'高血压体脂肪检查',keywords:'检查'},
//                 {date:'2018/12/25',name:'曾宝强',phone:'13512564895',des:'糖尿病空腹血糖检查',kind:'检查'},
//                 {date:'2018/12/11',name:'陈飞',phone:'13512564895',des:'幼儿卡介苗接种',kind:'接种'},
//                 {date:'2018/12/6',name:'黄丽',phone:'13512564895',des:'孕期B超检查',kind:'检查'},
//                 {date:'2018/12/3',name:'王成',phone:'13512564895',des:'骨折之后康复治疗',kind:'康复'},
//                 {date:'2018/11/29',name:'吕一丽',phone:'13512564895',des:'乙肝疫苗接种',kind:'接种'},
//                 {date:'2018/11/19',name:'卢玉兰',phone:'13512564895',des:'糖尿病肾功能检查',kind:'检查'},
//                 {date:'2018/11/16',name:'刘万鹏',phone:'13512564895',des:'高血压康复治疗',kind:'康复'},
//                 {date:'2018/11/13',name:'雷乔亚',phone:'13512564895',des:'产后恢复康复治疗',kind:'康复'},
//             ];

// //初始变量
//             var oUl0 = document.getElementsByClassName('infoWrapper')[0];
//             var oInput0 = document.getElementsByClassName('search')[0];
//             var store = createStore({text: '', kind: '所有'});

//             store.subscribe(function () {
//                 //更新视图
//                 renderPage(lastFilterArr(severArr));
//             });

// //数据渲染
//             function renderPage (data) {
//                 //遍历
//                 var htmlStr = '';
//                 oUl0.innerHTML = '';
//                 data.forEach(function (ele, index, self) {
//                     // console.log(ele,index,self);
//                     htmlStr = htmlStr + '<li class="patientInfo"><p class="date">' + ele.date +'</p><p class="name">' + ele.name +'</p><p class="phone">' + ele.phone +'</p><p class="des">'+ ele.des + '</p></li>';
//                     // console.log(htmlStr);
//                 });
//                 oUl0.innerHTML = htmlStr;
//             }
//             renderPage(severArr);

// // 添加行为
//             oInput0.oninput = debounce(function () {
//                 store.dispatch({type: 'text', value: this.value});
//             },500);
// //筛选
//             var oBtnArr = [].slice.call(document.getElementsByClassName('sBtn'),0);
//             var lastActiveBtn = oBtnArr[3];
//             oBtnArr.forEach(function (ele,index,self) {
//                 ele.onclick = function () {
//                     $('.sBtn').removeClass('sActive');
//                     $(this).addClass('sActive');
//                     store.dispatch({type:'kind', value: this.getAttribute('kind')});
//                 }
//             });
// //防抖函数
//             function debounce (handler,delay) {
//                 var timer = null;
//                 return function (e) {
//                     var _self = this, _arg = arguments;
//                     clearTimeout(timer);
//                     timer = setTimeout(function () {
//                         handler.apply(_self,_arg);
//                     }, delay);
//                 }
//             }
// //文本过滤
//             function filterArrByText (data,text) {
//                 if (!text) {
//                     return data;
//                 }else{
//                     return data.filter(function (ele,index){
//                         //    如果输入的字符连续存在于已有数据中会返回一个不为-1的值
//                         return ele.name.indexOf(text) !== -1;
//                     });
//                 }
//             }
// //筛选类型
//             function filterArrByKind (data,kind) {
//                 if (kind === '所有') {
//                     return data;
//                 }else{
//                     return data.filter(function (ele,index,self) {
//                         return ele.kind === kind;
//                     })
//                 }
//             }
// //对事件状态进行深层组合控制的高级函数
// //理论依据redux状态管理机制
//             function combineFilter (config){
//                 return function (data) {
//                     for (var prop in config) {
//                         // console.log(prop,config[prop],state)
//                         data = config[prop](data, store.getState(prop));
//                     }
//                     return data;
//                 }
//             }
//             var lastFilterArr = combineFilter({
//                 text: filterArrByText,
//                 kind: filterArrByKind,
//             });
// //create store
//             function createStore (initialState) {
//                 var state = initialState || {};
//                 var list = [];
//                 function getState (type) {
//                     return state[type];
//                 }
//                 function dispatch (action) {
//                     state[action.type] = action.value;
//                     //调用之前订阅过的函数
//                     list.forEach(function (ele) {
//                         ele();
//                     })
//                 }
//                 function subscribe (func) {
//                     list.push(func);
//                 }
//                 return {
//                     getState: getState,
//                     dispatch: dispatch,
//                     subscribe: subscribe
//                 }
//             }
//         },
        context: $('.wrapper')
    });
 });

