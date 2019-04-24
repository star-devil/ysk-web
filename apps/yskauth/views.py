from django.shortcuts import render, redirect, reverse
from django.contrib.auth import login, logout, authenticate
from django.views.decorators.http import require_POST
from apps.yskauth.forms import LoginForm, ResetPasswordForm
from utils import restful, smssender
from utils.captcha.xfzcaptcha import Captcha
from .models import User, SmsCaptcha
from django.core.cache import cache
from django.http import HttpResponse


def index(request):
    return render(request, 'login.html')


# 用户登录视图
@require_POST
def login_view(request):
    form = LoginForm(request.POST)
    print(request.POST)
    if form.is_valid():
        telephone = form.cleaned_data.get('telephone')
        password = form.cleaned_data.get('password')
        remember = form.cleaned_data.get('remember')
        user = authenticate(request, username=telephone, password=password)

        if user:
            if user.is_active:
                login(request, user)
                if remember:
                    request.session.set_expiry(None)
                else:
                    request.session.set_expiry(0)
                return restful.ok()
            else:
                return restful.unauth_error(message="您的账号已经被冻结")
        else:
            return restful.params_error(message="账号或者密码错误")
    else:
        errors = form.get_errors()
        return restful.params_error(message=errors)


# 退出登录
def logout_view(request):
    logout(request)
    return redirect(reverse('news:index'))


# 重置密码
def reset_password(request):
    print(request.POST)
    form = ResetPasswordForm(request.POST)
    if form.is_valid():
        telephone = form.cleaned_data.get('telephone')
        password = form.cleaned_data.get('password1')

        User.objects.filter(telephone=telephone).update(password=password)
        return restful.ok()
    else:
        return restful.params_error(message=form.get_errors())


# 短信验证码
def sms_captcha(request):
    telephone = request.GET.get('telephone')
    code = Captcha.gene_text()
    # exists = SmsCaptcha.objects.filter(telephone=telephone).exists()
    # if exists:
    #     SmsCaptcha.objects.filter(telephone=telephone).update(captcha=code)
    # else:
    #     SmsCaptcha.objects.create(telephone=telephone, captcha=code)
    cache.set(telephone, code, 5*60)
    print('短信验证码', code)
    result = smssender.send(telephone, code)
    if result:
        return restful.ok()
    else:
        return restful.params_error(message='短信验证码发送失败！')
    # return HttpResponse('success')
