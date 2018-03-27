

requirejs(['jquery', 'bootstrap'], function ($) {
    var ajax = $.ajax({
        url: Api.getcategorytitle,
        success: function (data) {
            var html = "";
            for (var i = 0; i < data.result.length; i++) {
                var obj = data.result[i];
                var title = `<div class='category_list clearfix' data-toggle="collapse" data-target="#collapse${obj.titleId}" aria-expanded="false" aria-controls="collapse${obj.titleId}" >
                                                    <span>${obj.title}</span>
                                                    <span class="glyphicon glyphicon-chevron-down pull-right"></span>
                                                </div>`
                html += title;
                html += `<div data-isGet='false' data-id='${obj.titleId}' class="collapse pindao list_fenlei list_fenlei${obj.titleId}" id="collapse${obj.titleId}"></div>`
            }
            $('.category').html(html);
        }
    })
    ajax.done(function () {
        $('.pindao').on('show.bs.collapse', function () {
            var $this = $(this);
            if(!$this.data('isGet')){//判断，只请求一次，避免多次请求
                var id = $this.data('id')
                $.ajax({
                    url: Api.getcategory,
                    data: { titleid: id },
                    dataType: "JSON",
                    success: function (data) {
                        // console.log(data);
                        var html = "<ul class='clearfix'>"
                        for (var i = 0; i < data.result.length; i++) {
                            var list = `<li>${data.result[i].category}</li>`
                            html += list;
                        }
                        html += "</ul>"
                        // console.log(html);   
                        $('.list_fenlei' + id).html(html);
                        $this.data('isGet',true);
                        // $(".category ").append($('.list_fenlei').html(html));
                    }
                })
            }
     
        })
    })




   


})



