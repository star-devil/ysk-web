function noticeList() {
    // 渲染表格
    if ($.fn.dataTable.isDataTable('#noticeTable')) {
        $('#noticeTable').DataTable().ajax.reload(null,false);
    } else {
        $('#noticeTable').DataTable({
            ajax: {
                // url: " https://easy-mock.com/mock/5c9c2e7fd172204b3a07ec75/noticeData",
                url: '/cms/get_all_news/'
            },
            searching: true,
            autoWidth: false,
            pagingType: "full_numbers",
            language: {
                "sProcessing": "处理中...",
                "sLengthMenu": "显示 _MENU_ 项结果",
                "sZeroRecords": "没有匹配结果",
                "sInfo": "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
                "sInfoEmpty": "显示第 0 至 0 项结果，共 0 项",
                "sInfoFiltered": "(由 _MAX_ 项结果过滤)",
                "sInfoPostFix": "",
                "sSearch": "按标题搜索:",
                "sUrl": "",
                "sEmptyTable": "表中数据为空",
                "sLoadingRecords": "载入中...",
                "sInfoThousands": ",",
                "oPaginate": {
                    "sFirst": "首页",
                    "sPrevious": "&lt;",
                    "sNext": "&gt;",
                    "sLast": "末页"
                }
            },
            aoColumnDefs: [{
                "bSortable": false,
                "aTargets": [0, 5]
            }],
            aaSorting: [
                [0, "asc"]
            ],
            columns: [{
                    "className": "index",
                    "data": null,
                    "render": function (data, type, row, meta) {
                        var no = meta.settings._iDisplayStart + meta.row + 1;
                        return no;
                    }
                },
                {
                    "data": "title"
                },
                {
                    "data": "text"
                },
                {
                    "data": "author"
                },
                {
                    "data": 'date'
                    //     function(obj){
                    //           return getMyDate(obj.update_time);//update_time是实体类的属性
                    // }
                },
                {
                    "className": "table-control",
                    "data": null,
                    "render": function (data, type, row, meta) {
                                            var html = "<td><i title='删除' class='fa fa-trash-o table-delete-btn' aria-hidden='true' data-index=" + meta.row + ">删除</i>";
                                            return html;
                    }
                }
            ]
        });
    }
   //将时间戳格式化
    function getMyDate(time){
    if(typeof(time)=="undefined"){
        return "";
    }
    var oDate = new Date(time),
     oYear = oDate.getFullYear(),
     oMonth = oDate.getMonth()+1,
     oDay = oDate.getDate(),
     oHour = oDate.getHours(),
     oMin = oDate.getMinutes(),
     oSen = oDate.getSeconds(),
     oTime = oYear +'-'+ getzf(oMonth) +'-'+ getzf(oDay) +' '+ getzf(oHour) +':'+ getzf(oMin) +':'+getzf(oSen);//最后拼接时间

     return oTime;
    };

     //补0操作,当时间数据小于10的时候，给该数据前面加一个0
    function getzf(num){
        if(parseInt(num) < 10){
            num = '0'+num;
        }
        return num;
    }

    //删除操作
    $("#noticeTable tbody").on("click", ".table-delete-btn", function () {
        var $tds = $(this).parent().parent().children();
        var $tr = $(this).parent().parent();
        var ClassId = $($tds[1]).text();
        const text = $($tds[2]).text();
        swal({
                title: "确定删除该条公告?",
                text: "一旦删除不能撤销,请谨慎操作！",
                icon: "warning",
                buttons: true,
                buttons: ["取消", "确认"]
            })
            .then((willDelete) => {
                if (willDelete) {
                    yskajax.post({
                        'url': '/cms/delete_news/',
                        'data': {
                            'title': ClassId,
                            'text': text
                        },
                        'success': function (result) {
                            if (result['code'] === 200) {
                                swal("删除成功", '', "success");
                                // $tr.remove(); //删除页面中那一行数据
                                $('.loadTab').trigger('click');
                            }else {
                                swal("啊哦。。。", "服务器走丢了。。。", "error"); //后端删除失败
                            }
                        }
                    });
                    // $.ajax({
                    //     type: "post",
                    //     url: "",
                    //     data: {
                    //         "ClassId": ClassId
                    //     },
                    //     success: function (data) {
                    //         var dataObj = $.parseJSON(data);
                    //         if (dataObj.status === 1) { //后端删除成功
                    //             swal("删除成功", '', "success");
                    //             $tr.remove(); //删除页面中那一行数据
                    //             $('.loadTab').trigger('showNotSys()');
                    //         } else {
                    //             swal("出错啦。。。", dataObj.msg, "error"); //后端删除失败
                    //         }
                    //     },
                    //     error: function () { // ajax请求失败
                    //         swal("啊哦。。。", "服务器走丢了。。。", "error");
                    //     }
                    // });
                } else {
                    swal("您已取消删除");
                }
            });
    });
}

    // 上传图片到服务器
    const uploadBtn = $('#thumbnail-btn');
    uploadBtn.change(function () {
        const file = uploadBtn[0].files[0];
        const formData = new FormData();
        formData.append('file', file);
        yskajax.post({
            'url': "/cms/upload_file/",
            'data': formData,
            'processData': false,
            'contentType': false,
            'success': function (result) {
                if (result['code'] === 200) {
                    var url = result['data']['url'];
                    var thumbnail = $('#thumbnail-form');
                    thumbnail.val(url);
                }
            }
        });
    });

    // 发布公告
    const subminBtn = $('#submitBtn');
    subminBtn.click(function () {
        const title = $('.notGroup input').val();
        const image = $('input[id="thumbnail-form"]').val();
        const text = editor2.txt.text();//获取的喊标签的值

        yskajax.post({
            'url': '/cms/add_news/',
            'data': {
                'title': title,
                'image': image,
                'text': text,
            },
            'success': function (result) {
                if (result['code'] === 200) {
                    window.messageBox.showSuccess('公告发布成功！');
                    $('.notGroup input').val('');
                    $('input[id="thumbnail-form"]').val('');
                    editor2.txt.text('');
                }else {
                    window.messageBox.showError('公告发布失败！');
                }
            }
        })
    })

//获取发布公告中的值传给首页
// $('.notBtn').on('click',function () {
//     var noticeData = $('.notGroup input').val();
//     var text = editor2.txt.html();//获取的喊标签的值
//     // var text = editor2.txt.text();//获取纯文本的值
//     console.log(noticeData,text);
// });



