(function login(){

    // 监听登录事件
function listenLoginEvent() {
    var self = this;
    var login = $('.login');
    var telephoneInput = login.find("input[name='telephone']");
    var passwordInput = login.find("input[name='password']");
    var rememberInput = login.find("input[name='remember']");
    var submitBtn = $('#btn1');

    submitBtn.click(function () {
        setCookie();
        var telephone = telephoneInput.val();
        var password = passwordInput.val();
        var remember = rememberInput.prop('checked');

        yskajax.post({
            'url': '/account/login/',
            'async': false,
            'data': {
               'telephone': telephone,
                'password': password,
                'remember': remember?1:0
            },
            'success': function (result) {
                if (result['code'] === 200) {
                    yskajax.get({
                        'url': '/cms/get_url/',
                        'success': function (result) {
                            if (result['code'] === 200) {
                                window.location.href=result['data']['cms_url'];
                            }
                        }
                    });

                }else {
                    window.messageBox.showInfo('用户名或密码错误！');
                }
            }
        });
    });
}
// 监听短信验证码的发送
$('#fi-checkCode').on('click', function (e) {
     e.preventDefault();
     const telephone = $('#phoneNumber').val();
     console.log(telephone);
     if (telephone !== ''){
         yskajax.get({
             "url": '/account/sms_captcha/',
             "data": {
                 'telephone': telephone
             },
             "success": function (result) {
                 console.log('result', result['data']);
                 if (result['code'] === 200) {
                     window.messageBox.showSuccess("短信验证码发送成功！")
                 }
             }
         })
     }
});
// 监听重置密码事件
$('#find').on('click', function (e) {
    e.preventDefault();
    const telephone = $('#phoneNumber').val();
    const sms_captcha = $('#findPin').val();
    const password1 = $('#findPassword').val();
    const password2 = $('#rePassword').val();

    yskajax.post({
        "url": '/account/reset/',
        "data": {
            'telephone': telephone,
            'sms_captcha': sms_captcha,
            'password1': password1,
            'password2': password2,
        },
        "success": function (result) {
            if (result['code'] === 200) {
                alert('密码重置成功！');
                window.location.reload();
            }
        }
    })
});

//记住密码-存cookie
$(function () {
    listenLoginEvent();
    getCookie();
});
function setCookie() {
    var username = $("#loginUser").val(); //获取用户名信息
    var pwd = $("#loginPassword").val(); //获取登陆密码信息
    var checked = $("input[id='rememberBtn']").prop("checked");
    console.log(checked)
    if (checked) {
        $.cookie("username", username, { expires: 7 }); //设置cookie中的用户名
        $.cookie("password", pwd, { expires: 7 }); //设置cookie中的登陆密码
    } else {
        $.cookie("password", null);
    }
}
//记住密码--读cookie
function getCookie() {
    var loginCode = $.cookie("username");
    var passWord = $.cookie("password"); //获取cookie中的登陆密码
    if (passWord) { //密码存在的话把“记住用户名和密码”复选框勾选住
        $("[id='rememberBtn']").attr("checked", "true");
    }
    if (loginCode) { //用户名填充
        $("#loginUser").val(loginCode);
    }
    if (passWord) { //密码填充
        $("#loginPassword").val(passWord);
    }
}
})();


