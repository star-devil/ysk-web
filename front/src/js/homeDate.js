(function init() {
    $.ajax({
        // url: 'https://easy-mock.com/mock/5c9c2e7fd172204b3a07ec75/homeData',
        url: '/cms/get_ondoor_patient/',
        // async: 'true',
        success: function (res) {
            var myDate = new Date();
            var myYear = myDate.getFullYear();
            var month = myDate.getMonth() + 1;
            var myMonth = month < 10 ? ('0' + month) : month ;
            var myDay = myDate.getDate() < 10 ? ('0' + myDate.getDate()) : myDate.getDate();
            var date = myYear + '-' + myMonth + '-' + myDay;
            var arr = [];
            var r=res.data;
            r.forEach(function(ele,index){
                if(ele.date === date) {
                    arr.push(ele);
                }
            });
            if(arr.length === 0){
                $('.noPatient').text("今天没有需要上门服务的居民！请合理安排工作！").css({fontSize:'20px',color: 'darkred'});
            }
            $.each(arr,function () {
                //处理函数
                //初始变量
                var oUl1 = document.getElementsByClassName('infoWrapper')[1];
                var oInput1 = document.getElementsByClassName('search')[1];
                var store = createStore({text: '', keywords: '所有'});
                var lastFilterArr = combineFilter({
                    text: filterArrByText,
                    keywords: filterArrByKeywords,
                });

                store.subscribe(function () {
                    //更新视图
                    renderPage(lastFilterArr(arr));
                });
//数据渲染
                function renderPage (data) {
                    //遍历
                    var htmlStr = '';
                    oUl1.innerHTML = '';
                    data.forEach(function (ele, index, self) {
                        // console.log(ele,index,self);
                        htmlStr = htmlStr + '<li class="patientInfo"><p class="date">' + ele.time +'</p><p class="name">' + ele.smname +'</p><p class="address">' + ele.address +'</p><p class="des">'+ ele.smkind + '</p></li>';
                        // console.log(htmlStr);
                    });
                    oUl1.innerHTML = htmlStr;
                }
                renderPage(arr);

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
// 添加行为
                oInput1.oninput = debounce(function () {
                    store.dispatch({type: 'text', value: this.value});
                },500);


//筛选
                var oBtnArr = [].slice.call(document.getElementsByClassName('hBtn'),0);
                var lastActiveBtn = oBtnArr[3];
                oBtnArr.forEach(function (ele,index,self) {
                    ele.onclick = function () {
                        $('.hBtn').removeClass('sActive');
                        $(this).addClass('sActive');
                        store.dispatch({type:'keywords', value: this.getAttribute('keywords')});
                        // console.log(this.getAttribute);
                    }
                });

//文本过滤
                function filterArrByText (data,text) {
                    if (!text) {
                        return data;
                    }else{
                        return data.filter(function (ele,index){
                            //    如果输入的字符连续存在于已有数据中会返回一个不为-1的值
                            return ele.smname.indexOf(text) !== -1;
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
                            return ele.smkind.indexOf(keywords) !== -1;
                        })
                    }
                }
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
            $('.label-warning').text(arr.length);
            $('.homeNum').text(arr.length);
            $('.homeNum-title').text(arr.length);

        },
        error: function (e) {
            console.log(e.status,e.statusText);//错误状态码和错误信息
        },
//         complete: function () {
//             //可以放假数据处理函数
//             var homeArr = [
//                 {date:'9:00',name:'吕一苗',phone:'18388451263',des:'糖尿病足换药',kind:'换药'},
//                 {date:'9:30',name:'乐健美',phone:'18388451263',des:'高血压康复训练',kind:'康复'},
//                 {date:'10:00',name:'梁世谨',phone:'18388451263',des:'右肢残疾康复训练',kind:'康复'},
//                 {date:'10:30',name:'路东飞',phone:'18388451263',des:'抑郁症随访',kind:'随访'},
//                 {date:'11:00',name:'窦凯',phone:'18388451263',des:'卧床病人随访',kind:'随访'},
//                 {date:'13:00',name:'毛丽新',phone:'18388451263',des:'产妇随访',kind:'随访'},
//                 {date:'14:00',name:'孟跃',phone:'18388451263',des:'老年痴呆随访',kind:'随访'},
//                 {date:'15:30',name:'莫三勇',phone:'18388451263',des:'独居老人随访',kind:'随访'},
//                 {date:'16:00',name:'慕子吟',phone:'18388451263',des:'术后康复训练',kind:'康复'},
//             ];
//             //初始变量
//             var oUl1 = document.getElementsByClassName('infoWrapper')[1];
//             var oInput1 = document.getElementsByClassName('search')[1];
//             var store = createStore({text: '', kind: '所有'});
//             var lastFilterArr = combineFilter({
//                 text: filterArrByText,
//                 kind: filterArrByKind,
//             });

//             store.subscribe(function () {
//                 //更新视图
//                 renderPage(lastFilterArr(homeArr));
//             });
// //数据渲染
//             function renderPage (data) {
//                 //遍历
//                 var htmlStr = '';
//                 oUl1.innerHTML = '';
//                 data.forEach(function (ele, index, self) {
//                     // console.log(ele,index,self);
//                     htmlStr = htmlStr + '<li class="patientInfo"><p class="date">' + ele.date +'</p><p class="name">' + ele.name +'</p><p class="phone">' + ele.phone +'</p><p class="des">'+ ele.des + '</p></li>';
//                     // console.log(htmlStr);
//                 });
//                 oUl1.innerHTML = htmlStr;
//             }
//             renderPage(homeArr);

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
// // 添加行为
//             oInput1.oninput = debounce(function () {
//                 store.dispatch({type: 'text', value: this.value});
//             },500);


// //筛选
//             var oBtnArr = [].slice.call(document.getElementsByClassName('hBtn'),0);
//             var lastActiveBtn = oBtnArr[3];
//             oBtnArr.forEach(function (ele,index,self) {
//                 ele.onclick = function () {
//                     $('.hBtn').removeClass('sActive');
//                     $(this).addClass('sActive');
//                     store.dispatch({type:'kind', value: this.getAttribute('kind')});
//                 }
//             });

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
        // url: 'https://easy-mock.com/mock/5c9c2e7fd172204b3a07ec75/homeData',
        url: '/cms/get_ondoor_patient/',
        // async: 'true',
        success: function (res) {
            var myDate = new Date();
            var myYear = myDate.getFullYear();
            var month = myDate.getMonth() + 1;
            var myMonth = month < 10 ? ('0' + month) : month ;
            var myDay = myDate.getDate() < 10 ? ('0' + myDate.getDate()) : myDate.getDate();
            var date = myYear + '-' + myMonth + '-' + myDay;
            var arr = [];
            var r=res.data;
            r.forEach(function(ele,index){
                if(ele.date === date) {
                    arr.push(ele);
                }
            });
            if(arr.length === 0){
                $('.noPatient').text("今天没有需要上门服务的居民！请合理安排工作！").css({fontSize:'20px',color: 'darkred'});
            }
            $.each(arr,function () {
                //处理函数
                //初始变量
                var oUl1 = document.getElementsByClassName('infoWrapper')[1];
                var oInput1 = document.getElementsByClassName('search')[1];
                var store = createStore({text: '', keywords: '所有'});
                var lastFilterArr = combineFilter({
                    text: filterArrByText,
                    keywords: filterArrByKeywords,
                });

                store.subscribe(function () {
                    //更新视图
                    renderPage(lastFilterArr(arr));
                });
//数据渲染
                function renderPage (data) {
                    //遍历
                    var htmlStr = '';
                    oUl1.innerHTML = '';
                    data.forEach(function (ele, index, self) {
                        // console.log(ele,index,self);
                        htmlStr = htmlStr + '<li class="patientInfo"><p class="date">' + ele.time +'</p><p class="name">' + ele.smname +'</p><p class="address">' + ele.address +'</p><p class="des">'+ ele.smkind + '</p></li>';
                        // console.log(htmlStr);
                    });
                    oUl1.innerHTML = htmlStr;
                }
                renderPage(arr);

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
// 添加行为
                oInput1.oninput = debounce(function () {
                    store.dispatch({type: 'text', value: this.value});
                },500);


//筛选
                var oBtnArr = [].slice.call(document.getElementsByClassName('hBtn'),0);
                var lastActiveBtn = oBtnArr[3];
                oBtnArr.forEach(function (ele,index,self) {
                    ele.onclick = function () {
                        $('.hBtn').removeClass('sActive');
                        $(this).addClass('sActive');
                        store.dispatch({type:'keywords', value: this.getAttribute('keywords')});
                        // console.log(this.getAttribute);
                    }
                });

//文本过滤
                function filterArrByText (data,text) {
                    if (!text) {
                        return data;
                    }else{
                        return data.filter(function (ele,index){
                            //    如果输入的字符连续存在于已有数据中会返回一个不为-1的值
                            return ele.smname.indexOf(text) !== -1;
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
                            return ele.smkind.indexOf(keywords) !== -1;
                        })
                    }
                }
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
            $('.label-warning').text(arr.length);
            $('.homeNum').text(arr.length);
            $('.homeNum-title').text(arr.length);

        },
        error: function (e) {
            console.log(e.status,e.statusText);//错误状态码和错误信息
        },
//         complete: function () {
//             //可以放假数据处理函数
//             var homeArr = [
//                 {date:'9:00',name:'吕一苗',phone:'18388451263',des:'糖尿病足换药',kind:'换药'},
//                 {date:'9:30',name:'乐健美',phone:'18388451263',des:'高血压康复训练',kind:'康复'},
//                 {date:'10:00',name:'梁世谨',phone:'18388451263',des:'右肢残疾康复训练',kind:'康复'},
//                 {date:'10:30',name:'路东飞',phone:'18388451263',des:'抑郁症随访',kind:'随访'},
//                 {date:'11:00',name:'窦凯',phone:'18388451263',des:'卧床病人随访',kind:'随访'},
//                 {date:'13:00',name:'毛丽新',phone:'18388451263',des:'产妇随访',kind:'随访'},
//                 {date:'14:00',name:'孟跃',phone:'18388451263',des:'老年痴呆随访',kind:'随访'},
//                 {date:'15:30',name:'莫三勇',phone:'18388451263',des:'独居老人随访',kind:'随访'},
//                 {date:'16:00',name:'慕子吟',phone:'18388451263',des:'术后康复训练',kind:'康复'},
//             ];
//             //初始变量
//             var oUl1 = document.getElementsByClassName('infoWrapper')[1];
//             var oInput1 = document.getElementsByClassName('search')[1];
//             var store = createStore({text: '', kind: '所有'});
//             var lastFilterArr = combineFilter({
//                 text: filterArrByText,
//                 kind: filterArrByKind,
//             });

//             store.subscribe(function () {
//                 //更新视图
//                 renderPage(lastFilterArr(homeArr));
//             });
// //数据渲染
//             function renderPage (data) {
//                 //遍历
//                 var htmlStr = '';
//                 oUl1.innerHTML = '';
//                 data.forEach(function (ele, index, self) {
//                     // console.log(ele,index,self);
//                     htmlStr = htmlStr + '<li class="patientInfo"><p class="date">' + ele.date +'</p><p class="name">' + ele.name +'</p><p class="phone">' + ele.phone +'</p><p class="des">'+ ele.des + '</p></li>';
//                     // console.log(htmlStr);
//                 });
//                 oUl1.innerHTML = htmlStr;
//             }
//             renderPage(homeArr);

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
// // 添加行为
//             oInput1.oninput = debounce(function () {
//                 store.dispatch({type: 'text', value: this.value});
//             },500);


// //筛选
//             var oBtnArr = [].slice.call(document.getElementsByClassName('hBtn'),0);
//             var lastActiveBtn = oBtnArr[3];
//             oBtnArr.forEach(function (ele,index,self) {
//                 ele.onclick = function () {
//                     $('.hBtn').removeClass('sActive');
//                     $(this).addClass('sActive');
//                     store.dispatch({type:'kind', value: this.getAttribute('kind')});
//                 }
//             });

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




