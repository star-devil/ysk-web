from rest_framework import serializers
from .models import CenterService, OnDoorService, CommunityInformation, InstitutionNews


class CenterSerializer(serializers.ModelSerializer):
    class Meta:
        model = CenterService
        fields = ('svid', 'name', 'sex', 'age', 'status', 'phone', 'date', 'kind')


class OnDoorSerializer(serializers.ModelSerializer):
    class Meta:
        model = OnDoorService
        fields = ('svid', 'smname', 'sex', 'smphone', 'address', 'date', 'time', 'smkind')


class CommunitySerializer(serializers.ModelSerializer):
    class Meta:
        model = CommunityInformation
        fields = ('stationName', 'totalNumber', 'malePeople', 'femalePeople', 'staffCount', 'physicianCount',
                  'doctorCount', 'recoveryCount', 'preventCount', 'nurseCount', 'familyCount', 'singleParent',
                  'mainFamily', 'uniteFamily', 'otherFamily', 'spinsterhoodCount', 'marriedCount', 'remarryCount',
                  'divorceCount', 'widCount', 'illiteracyCount', 'primarySchool', 'middleSchool', 'seniorSchool',
                  'technicalSecondary', 'juniorCollege', 'regularCollege', 'masterPeople', 'doctorPeople', 'age01',
                  'age24', 'age59', 'age1014', 'age1518', 'age1924', 'age2530', 'age3140', 'age4150', 'age5160',
                  'age6170', 'age7180', 'age80up')


class InstitutionNewsSerializer(serializers.ModelSerializer):
    class Meta:
        model = InstitutionNews
        fields = ('title', 'text', 'author', 'date')
