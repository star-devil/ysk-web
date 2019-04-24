from django import forms
from apps.forms import FormMixin
from .models import InstitutionNews


# 中心服务居民验证表
class CenterForm(forms.Form, FormMixin):
    svid = forms.CharField(max_length=50)
    name = forms.CharField(max_length=50)
    sex = forms.CharField(max_length=10)
    age = forms.IntegerField()
    status = forms.CharField()
    phone = forms.CharField(max_length=11)
    date = forms.CharField(max_length=100)
    kind = forms.CharField(max_length=300)


# 上门服务居民验证表
class OnDoorForm(forms.Form, FormMixin):
    svid = forms.CharField(max_length=50)
    smname = forms.CharField(max_length=50)
    sex = forms.CharField(max_length=10)
    smphone = forms.CharField(max_length=11)
    address = forms.CharField(max_length=300)
    date = forms.CharField(max_length=100)
    time = forms.CharField(max_length=30)
    smkind = forms.CharField(max_length=300)


# 社区资料验证表
class CommunityForm(forms.Form, FormMixin):
    stationName = forms.CharField(max_length=100, required=True, error_messages={'required': '请输入社区名称'})
    totalNumber = forms.CharField(max_length=20)
    malePeople = forms.CharField(max_length=20)
    femalePeople = forms.CharField(max_length=20)
    staffCount = forms.CharField(max_length=20)
    physicianCount = forms.CharField(max_length=20)
    doctorCount = forms.CharField(max_length=20)
    recoveryCount = forms.CharField(max_length=20)
    preventCount = forms.CharField(max_length=20)
    nurseCount = forms.CharField(max_length=20)
    familyCount = forms.CharField(max_length=20)
    singleParent = forms.CharField(max_length=20)
    mainFamily = forms.CharField(max_length=20)
    uniteFamily = forms.CharField(max_length=20)
    otherFamily = forms.CharField(max_length=20)
    spinsterhoodCount = forms.CharField(max_length=20)
    marriedCount = forms.CharField(max_length=20)
    remarryCount = forms.CharField(max_length=20)
    divorceCount = forms.CharField(max_length=20)
    widCount = forms.CharField(max_length=20)
    illiteracyCount = forms.CharField(max_length=20)
    primarySchool = forms.CharField(max_length=20)
    middleSchool = forms.CharField(max_length=20)
    seniorSchool = forms.CharField(max_length=20)
    technicalSecondary = forms.CharField(max_length=20)
    juniorCollege = forms.CharField(max_length=20)
    regularCollege = forms.CharField(max_length=20)
    masterPeople = forms.CharField(max_length=20)
    doctorPeople = forms.CharField(max_length=20)
    age01 = forms.CharField(max_length=20)
    age24 = forms.CharField(max_length=20)
    age59 = forms.CharField(max_length=20)
    age1014 = forms.CharField(max_length=20)
    age1518 = forms.CharField(max_length=20)
    age1924 = forms.CharField(max_length=20)
    age2530 = forms.CharField(max_length=20)
    age3140 = forms.CharField(max_length=20)
    age4150 = forms.CharField(max_length=20)
    age5160 = forms.CharField(max_length=20)
    age6170 = forms.CharField(max_length=20)
    age7180 = forms.CharField(max_length=20)
    age80up = forms.CharField(max_length=20)


# 公告验证表
class InstitutionNewsForm(forms.Form, FormMixin):
    title = forms.CharField(max_length=100)
    image = forms.URLField()
    text = forms.CharField()
