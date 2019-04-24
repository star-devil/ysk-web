from django import forms
from apps.forms import FormMixin
from django.core.cache import cache
from .models import User


# 登录验证
class LoginForm(forms.Form, FormMixin):
    telephone = forms.CharField(max_length=11, required=True, error_messages={"required": "账号不能为空"})
    password = forms.CharField(max_length=20, min_length=6, required=True,
                               error_messages={"max_length": "密码最多不能超过20个字符", "min_length": "密码最少不能少于6个字符",
                                               "required": "密码不能为空"})
    remember = forms.IntegerField(required=False)


# 重置密码验证
class ResetPasswordForm(forms.Form, FormMixin):
    telephone = forms.CharField(max_length=11, min_length=11, required=True, error_messages={'required': '请输入手机号'})
    sms_captcha = forms.CharField(max_length=4, min_length=4)
    password1 = forms.CharField(max_length=20, min_length=6, required=True,
                                error_messages={"max_length": "密码最多不能超过20个字符", "min_length": "密码最少不能少于6个字符",
                                                "required": "密码不能为空"})
    password2 = forms.CharField(max_length=20, min_length=6, required=True,
                                error_messages={"max_length": "密码最多不能超过20个字符", "min_length": "密码最少不能少于6个字符",
                                                "required": "密码不能为空"})

    def clean(self):
        cleaned_data = super(ResetPasswordForm, self).clean()

        telephone = cleaned_data.get('telephone')
        exists = User.objects.filter(telephone=telephone).exists()
        if not exists:
            raise forms.ValidationError("该用户不存在，请联系管理员解决！")

        password1 = cleaned_data.get('password1')
        password2 = cleaned_data.get('password2')

        if password1 != password2:
            raise forms.ValidationError("两次密码输入不一致")

        sms_captcha = cleaned_data.get('sms_captcha')
        cached_sms_captcha = cache.get(telephone)
        print(cached_sms_captcha)

        if not cached_sms_captcha or cached_sms_captcha.lower() != sms_captcha.lower():
            raise forms.ValidationError("短信验证码错误")

        return cleaned_data

