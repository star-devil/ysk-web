from django.db import models


# 中心服务居民表
class CenterService(models.Model):
    svid = models.CharField(max_length=20,unique=True)
    name = models.CharField(max_length=50)
    sex = models.CharField(max_length=10)
    age = models.IntegerField(default=0)
    status = models.CharField(max_length=100, default='良好')
    phone = models.CharField(max_length=11)
    date = models.CharField(max_length=100)
    kind = models.CharField(max_length=200)

    class Meta:
        ordering = ['date']


# 上门服务居民表
class OnDoorService(models.Model):
    svid = models.CharField(max_length=20, unique=True)
    smname = models.CharField(max_length=50)
    sex = models.CharField(max_length=10)
    smphone = models.CharField(max_length=11)
    address = models.CharField(max_length=300)
    date = models.CharField(max_length=100)
    time = models.CharField(max_length=30)
    smkind = models.CharField(max_length=300)

    class Meta:
        ordering = ['date']


# 社区资料表
class CommunityInformation(models.Model):
    stationName = models.CharField(max_length=100, null=False)
    totalNumber = models.CharField(max_length=20)
    malePeople = models.CharField(max_length=20)
    femalePeople = models.CharField(max_length=20)
    staffCount = models.CharField(max_length=20)
    physicianCount = models.CharField(max_length=20)
    doctorCount = models.CharField(max_length=20)
    recoveryCount = models.CharField(max_length=20)
    preventCount = models.CharField(max_length=20)
    nurseCount = models.CharField(max_length=20)
    familyCount = models.CharField(max_length=20)
    singleParent = models.CharField(max_length=20)
    mainFamily = models.CharField(max_length=20)
    uniteFamily = models.CharField(max_length=20)
    otherFamily = models.CharField(max_length=20)
    spinsterhoodCount = models.CharField(max_length=20)
    marriedCount = models.CharField(max_length=20)
    remarryCount = models.CharField(max_length=20)
    divorceCount = models.CharField(max_length=20)
    widCount = models.CharField(max_length=20)
    illiteracyCount = models.CharField(max_length=20)
    primarySchool = models.CharField(max_length=20)
    middleSchool = models.CharField(max_length=20)
    seniorSchool = models.CharField(max_length=20)
    technicalSecondary = models.CharField(max_length=20)
    juniorCollege = models.CharField(max_length=20)
    regularCollege = models.CharField(max_length=20)
    masterPeople = models.CharField(max_length=20)
    doctorPeople = models.CharField(max_length=20)
    age01 = models.CharField(max_length=20)
    age24 = models.CharField(max_length=20)
    age59 = models.CharField(max_length=20)
    age1014 = models.CharField(max_length=20)
    age1518 = models.CharField(max_length=20)
    age1924 = models.CharField(max_length=20)
    age2530 = models.CharField(max_length=20)
    age3140 = models.CharField(max_length=20)
    age4150 = models.CharField(max_length=20)
    age5160 = models.CharField(max_length=20)
    age6170 = models.CharField(max_length=20)
    age7180 = models.CharField(max_length=20)
    age80up = models.CharField(max_length=20)


# 社区公告表
class InstitutionNews(models.Model):
    title = models.CharField(max_length=100)
    image = models.URLField(default='http://img3.redocn.com/20120707/Redocn_2012070708552281.jpg')
    text = models.TextField()
    author = models.CharField(max_length=100, default='医时空社区卫生服务中心')
    date = models.DateField(auto_now_add=True)

    class Meta:
        ordering = ['-date']
