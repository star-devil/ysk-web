function communityInfo() {

    // 渲染社区资料表
   $.ajax({
        url: '/cms/get_community_information/',
        async: 'true',
        success: function (res) {
            var data = res['data'][0];
            var infoForm = $("#informationForm")[0];
            // console.log(infoForm);
            for(var prop in data){
                if(infoForm[prop]){
                    infoForm[prop].value = data[prop];
                }
            }
        }
   });
    // 获取社区资料并提交
    $('#saveBtn').click(function (e) {
        e.preventDefault();
        const stationName = $('#stationName').val();
        const totalNumber = $('#totalNumber').val();
        const malePeople = $('#malePeople').val();
        const femalePeople = $('#femalePeople').val();
        const staffCount = $('#staffCount').val();
        const physicianCount = $('#physicianCount').val();
        const doctorCount = $('#doctorCount').val();
        const recoveryCount = $('#recoveryCount').val();
        const preventCount = $('#preventCount').val();
        const nurseCount = $('#nurseCount').val();
        const familyCount = $('#familyCount').val();
        const singleParent = $('#singleParent').val();
        const mainFamily = $('#mainFamily').val();
        const uniteFamily = $('#uniteFamily').val();
        const otherFamily = $('#otherFamily').val();
        const spinsterhoodCount = $('#spinsterhoodCount').val();
        const marriedCount = $('#marriedCount').val();
        const remarryCount = $('#remarryCount').val();
        const divorceCount = $('#divorceCount').val();
        const widCount = $('#widCount').val();
        const illiteracyCount = $('#illiteracyCount').val();
        const primarySchool = $('#primarySchool').val();
        const middleSchool = $('#middleSchool').val();
        const seniorSchool = $('#seniorSchool').val();
        const technicalSecondary = $('#technicalSecondary').val();
        const juniorCollege = $('#juniorCollege').val();
        const regularCollege = $('#regularCollege').val();
        const masterPeople = $('#masterPeople').val();
        const doctorPeople = $('#doctorPeople').val();
        const age01 = $('#age01').val();
        const age24 = $('#age24').val();
        const age59 = $('#age59').val();
        const age1014 = $('#age1014').val();
        const age1518 = $('#age1518').val();
        const age1924 = $('#age1924').val();
        const age2530 = $('#age2530').val();
        const age3140 = $('#age3140').val();
        const age4150 = $('#age4150').val();
        const age5160 = $('#age5160').val();
        const age6170 = $('#age6170').val();
        const age7180 = $('#age7180').val();
        const age80up = $('#age80up').val();

        yskajax.post({
            'url': '/cms/edit_community_information/',
            'data': {
                'stationName': stationName,
                'totalNumber': totalNumber,
                'malePeople': malePeople,
                'femalePeople': femalePeople,
                'staffCount': staffCount,
                'physicianCount': physicianCount,
                'doctorCount': doctorCount,
                'recoveryCount': recoveryCount,
                'preventCount': preventCount,
                'nurseCount': nurseCount,
                'familyCount': familyCount,
                'singleParent': singleParent,
                'mainFamily': mainFamily,
                'uniteFamily': uniteFamily,
                'otherFamily': otherFamily,
                'spinsterhoodCount': spinsterhoodCount,
                'marriedCount': marriedCount,
                'remarryCount': remarryCount,
                'divorceCount': divorceCount,
                'widCount': widCount,
                'illiteracyCount': illiteracyCount,
                'primarySchool': primarySchool,
                'middleSchool': middleSchool,
                'seniorSchool': seniorSchool,
                'technicalSecondary': technicalSecondary,
                'juniorCollege': juniorCollege,
                'regularCollege': regularCollege,
                'masterPeople': masterPeople,
                'doctorPeople': doctorPeople,
                'age01': age01,
                'age24': age24,
                'age59': age59,
                'age1014': age1014,
                'age1518': age1518,
                'age1924': age1924,
                'age2530': age2530,
                'age3140': age3140,
                'age4150': age4150,
                'age5160': age5160,
                'age6170': age6170,
                'age7180': age7180,
                'age80up': age80up,
            },
            'success': function (result) {
                if (result['code'] === 200) {
                    window.messageBox.showSuccess('保存成功！')
                }else {
                    window.messageBox.showError('保存失败！')
                }
            }
        })
    })
}