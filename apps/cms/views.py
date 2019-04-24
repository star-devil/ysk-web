from django.shortcuts import render
from django.contrib.admin.views.decorators import staff_member_required
from .forms import CenterForm, OnDoorForm, CommunityForm, InstitutionNewsForm
from django.views.decorators.http import require_POST, require_GET
from .models import CenterService, OnDoorService, CommunityInformation, InstitutionNews
from utils import restful
from .serializers import CenterSerializer, OnDoorSerializer, CommunitySerializer, InstitutionNewsSerializer
import os
from django.conf import settings


@staff_member_required(login_url='news:index')
def index(request):
    return render(request, 'home.html')


# 获取中心服务居民数据
def get_center_patient(request):
    centerdata = CenterService.objects.all()
    data = CenterSerializer(centerdata, many=True).data
    return restful.result(data=data)


# 新增中心服务居民
@require_POST
def add_center_patient(request):
    form = CenterForm(request.POST)
    if form.is_valid():
        print(request.POST)
        svid = form.cleaned_data.get('svid')
        name = form.cleaned_data.get('name')
        sex = form.cleaned_data.get('sex')
        age = form.cleaned_data.get('age')
        status = form.cleaned_data.get('status')
        phone = form.cleaned_data.get('phone')
        date = form.cleaned_data.get('date')
        kind = form.cleaned_data.get('kind')

        exists = CenterService.objects.filter(svid=svid).exists()
        if exists:
            return restful.params_error('该ID已被使用！')
        else:
            CenterService.objects.create(svid=svid, name=name, sex=sex, age=age, status=status, phone=phone, date=date, kind=kind)
            return restful.ok()
    else:
        return restful.params_error(message=form.get_errors())


# 编辑中心服务居民数据
def edit_center_patient(request):
    form = CenterForm(request.POST)
    if form.is_valid():
        svid = form.cleaned_data.get('svid')
        name = form.cleaned_data.get('name')
        sex = form.cleaned_data.get('sex')
        age = form.cleaned_data.get('age')
        status = form.cleaned_data.get('status')
        phone = form.cleaned_data.get('phone')
        date = form.cleaned_data.get('date')
        kind = form.cleaned_data.get('kind')

        CenterService.objects.filter(svid=svid).update(svid=svid, name=name, sex=sex, age=age, status=status,
                                                       phone=phone, date=date, kind=kind)
        return restful.ok()
    else:
        return restful.params_error(message=form.get_errors())


# 删除中心服务居民数据
def delete_center_patient(request):
    svid = request.POST.get('svid')
    try:
        CenterService.objects.filter(svid=svid).delete()
        return restful.ok()
    except:
        return restful.params_error('该数据不存在！')


# 获取上门服务居民数据
def get_ondoor_patient(request):
    ondoordata = OnDoorService.objects.all()
    data = OnDoorSerializer(ondoordata, many=True).data
    return restful.result(data=data)


# 新增上门服务居民
@require_POST
def add_ondoor_patient(request):
    form = OnDoorForm(request.POST)
    if form.is_valid():
        svid = form.cleaned_data.get('svid')
        smname = form.cleaned_data.get('smname')
        sex = form.cleaned_data.get('sex')
        smphone = form.cleaned_data.get('smphone')
        address = form.cleaned_data.get('address')
        date = form.cleaned_data.get('date')
        time = form.cleaned_data.get('time')
        smkind = form.cleaned_data.get('smkind')

        exists = OnDoorService.objects.filter(svid=svid).exists()
        if exists:
            return restful.params_error('该ID已被使用！')
        else:
            OnDoorService.objects.create(svid=svid, smname=smname, sex=sex, smphone=smphone, date=date, time=time,
                                         address=address, smkind=smkind)
            return restful.ok()
    else:
        return restful.params_error(message=form.get_errors())


# 编辑上门服务居民数据
def edit_ondoor_patient(request):
    form = OnDoorForm(request.POST)
    if form.is_valid():
        print(request.POST)
        svid = form.cleaned_data.get('svid')
        smname = form.cleaned_data.get('smname')
        sex = form.cleaned_data.get('sex')
        smphone = form.cleaned_data.get('smphone')
        address = form.cleaned_data.get('address')
        date = form.cleaned_data.get('date')
        time = form.cleaned_data.get('time')
        smkind = form.cleaned_data.get('smkind')

        OnDoorService.objects.filter(svid=svid).update(svid=svid, smname=smname, sex=sex, smphone=smphone, date=date,
                                                       time=time, address=address, smkind=smkind)
        return restful.ok()
    else:
        return restful.params_error(message=form.get_errors())


# 删除上门服务居民数据
def delete_ondoor_patient(request):
    svid = request.POST.get('svid')
    try:
        OnDoorService.objects.filter(svid=svid).delete()
        return restful.ok()
    except:
        return restful.params_error('该数据不存在！')


# 获取社区资料
@require_GET
def get_community_information(request):
    communityInfo = CommunityInformation.objects.all()
    data = CommunitySerializer(communityInfo, many=True).data
    return restful.result(data=data)


# 社区资料修改操作
@require_POST
def edit_community_information(request):
    form = CommunityForm(request.POST)
    print(request.POST)
    if form.is_valid():
        stationName = form.cleaned_data.get('stationName')
        totalNumber = form.cleaned_data.get('totalNumber')
        malePeople = form.cleaned_data.get('malePeople')
        femalePeople = form.cleaned_data.get('femalePeople')
        staffCount = form.cleaned_data.get('staffCount')
        physicianCount = form.cleaned_data.get('physicianCount')
        doctorCount = form.cleaned_data.get('doctorCount')
        recoveryCount = form.cleaned_data.get('recoveryCount')
        preventCount = form.cleaned_data.get('preventCount')
        nurseCount = form.cleaned_data.get('nurseCount')
        familyCount = form.cleaned_data.get('familyCount')
        singleParent = form.cleaned_data.get('singleParent')
        mainFamily = form.cleaned_data.get('mainFamily')
        uniteFamily = form.cleaned_data.get('uniteFamily')
        otherFamily = form.cleaned_data.get('otherFamily')
        spinsterhoodCount = form.cleaned_data.get('spinsterhoodCount')
        marriedCount = form.cleaned_data.get('marriedCount')
        remarryCount = form.cleaned_data.get('remarryCount')
        divorceCount = form.cleaned_data.get('divorceCount')
        widCount = form.cleaned_data.get('widCount')
        illiteracyCount = form.cleaned_data.get('illiteracyCount')
        primarySchool = form.cleaned_data.get('primarySchool')
        middleSchool = form.cleaned_data.get('middleSchool')
        seniorSchool = form.cleaned_data.get('seniorSchool')
        technicalSecondary = form.cleaned_data.get('technicalSecondary')
        juniorCollege = form.cleaned_data.get('juniorCollege')
        regularCollege = form.cleaned_data.get('regularCollege')
        masterPeople = form.cleaned_data.get('masterPeople')
        doctorPeople = form.cleaned_data.get('doctorPeople')
        age01 = form.cleaned_data.get('age01')
        age24 = form.cleaned_data.get('age24')
        age59 = form.cleaned_data.get('age59')
        age1014 = form.cleaned_data.get('age1014')
        age1518 = form.cleaned_data.get('age1518')
        age1924 = form.cleaned_data.get('age1924')
        age2530 = form.cleaned_data.get('age2530')
        age3140 = form.cleaned_data.get('age3140')
        age4150 = form.cleaned_data.get('age4150')
        age5160 = form.cleaned_data.get('age5160')
        age6170 = form.cleaned_data.get('age6170')
        age7180 = form.cleaned_data.get('age7180')
        age80up = form.cleaned_data.get('age80up')

        exists = CommunityInformation.objects.filter(stationName=stationName).exists()
        if exists:
            CommunityInformation.objects.update(stationName=stationName, totalNumber=totalNumber, malePeople=malePeople,
                                                femalePeople=femalePeople, staffCount=staffCount,
                                                physicianCount=physicianCount,
                                                doctorCount=doctorCount, recoveryCount=recoveryCount,
                                                preventCount=preventCount,
                                                nurseCount=nurseCount, familyCount=familyCount,
                                                singleParent=singleParent,
                                                mainFamily=mainFamily, uniteFamily=uniteFamily, otherFamily=otherFamily,
                                                spinsterhoodCount=spinsterhoodCount, marriedCount=marriedCount,
                                                remarryCount=remarryCount, divorceCount=divorceCount, widCount=widCount,
                                                illiteracyCount=illiteracyCount, primarySchool=primarySchool,
                                                middleSchool=middleSchool, seniorSchool=seniorSchool,
                                                technicalSecondary=technicalSecondary,
                                                juniorCollege=juniorCollege, regularCollege=regularCollege,
                                                masterPeople=masterPeople,
                                                doctorPeople=doctorPeople, age01=age01, age24=age24, age59=age59,
                                                age1014=age1014, age1518=age1518, age1924=age1924, age2530=age2530,
                                                age3140=age3140, age4150=age4150, age5160=age5160, age6170=age6170,
                                                age7180=age7180, age80up=age80up)
            return restful.ok()
        else:
            CommunityInformation.objects.create(stationName=stationName, totalNumber=totalNumber, malePeople=malePeople,
                                                femalePeople=femalePeople, staffCount=staffCount,
                                                physicianCount=physicianCount,
                                                doctorCount=doctorCount, recoveryCount=recoveryCount,
                                                preventCount=preventCount,
                                                nurseCount=nurseCount, familyCount=familyCount,
                                                singleParent=singleParent,
                                                mainFamily=mainFamily, uniteFamily=uniteFamily, otherFamily=otherFamily,
                                                spinsterhoodCount=spinsterhoodCount, marriedCount=marriedCount,
                                                remarryCount=remarryCount, divorceCount=divorceCount, widCount=widCount,
                                                illiteracyCount=illiteracyCount, primarySchool=primarySchool,
                                                middleSchool=middleSchool, seniorSchool=seniorSchool,
                                                technicalSecondary=technicalSecondary,
                                                juniorCollege=juniorCollege, regularCollege=regularCollege,
                                                masterPeople=masterPeople,
                                                doctorPeople=doctorPeople, age01=age01, age24=age24, age59=age59,
                                                age1014=age1014, age1518=age1518, age1924=age1924, age2530=age2530,
                                                age3140=age3140, age4150=age4150, age5160=age5160, age6170=age6170,
                                                age7180=age7180, age80up=age80up)
            return restful.ok()
    else:
        return restful.params_error(message=form.get_errors())


# 获取全部公告
def get_institution_news(request):
    news = InstitutionNews.objects.all()
    data = InstitutionNewsSerializer(news, many=True).data
    return restful.result(data=data)


# 获取公告到首页
@require_GET
def get_news(request):
    newses = InstitutionNews.objects.all()[:3]
    print(newses)
    context = {
        'newses': newses
    }
    return render(request, 'index.html', context=context)


# 新增公告
def add_institution_news(request):
    form = InstitutionNewsForm(request.POST)
    if form.is_valid():
        print(request.POST)
        title = form.cleaned_data.get('title')
        text = form.cleaned_data.get('text')
        image = form.cleaned_data.get('image')

        InstitutionNews.objects.create(title=title, text=text, image=image)
        return restful.ok()
    else:
        return restful.params_error(message=form.get_errors())


# 删除公告
def delete_institution_news(request):
    title = request.POST.get('title')
    text = request.POST.get('text')
    try:
        InstitutionNews.objects.filter(title=title, text=text).delete()
        return restful.ok()
    except:
        return restful.params_error('操作失败！')


# 获取url
@require_GET
def get_url(request):
    cms_url = request.build_absolute_uri('/cms/')
    index_url = request.build_absolute_uri('/')
    return restful.result(data={'cms_url': cms_url, 'index_url': index_url})


# 上传图片
@require_POST
def upload_file(request):
    file = request.FILES.get('file')
    name = file.name
    with open(os.path.join(settings.MEDIA_ROOT, name), 'wb') as fp:
        for chunk in file.chunks():
            fp.write(chunk)
    url = request.build_absolute_uri(settings.MEDIA_URL+name)
    return restful.result(data={'url': url})
