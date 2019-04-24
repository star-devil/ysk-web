from django.urls import path
from . import views

app_name = 'yskauth'

urlpatterns = [
    path('', views.index, name='index'),
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),
    path('reset/', views.reset_password, name='reset'),
    path('sms_captcha/', views.sms_captcha, name='sms_captcha'),
]