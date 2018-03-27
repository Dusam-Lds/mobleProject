

requirejs(['jquery', 'bootstrap'], function ($) {
    //请求分类列表标题的数据
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
                        //自定义添加属性
                html += `<div data-isGet='false' data-id='${obj.titleId}' class="collapse pindao list_fenlei list_fenlei${obj.titleId}" id="collapse${obj.titleId}"></div>`
            }
            $('.category').html(html);
        }
    })
    ajax.done(function () {
        $('.pindao').on('show.bs.collapse', function () {
            var $this = $(this);
            //h5的新增data方法，data-isGet 前缀可省略,只要data里面包含有isGet这个属性
            if(!$this.data('isGet')){//判断，只请求一次，避免多次请求！！！！！！！
                var id = $this.data('id')
                //请求分类列表标题下的子分类     
                $.ajax({
                    url: Api.getcategory,
                    data: { titleid: id },
                    dataType: "JSON",
                    success: function (data) {
                        console.log(data);
                        
                        var html = "<ul class='clearfix'>"
                        for (var i = 0; i < data.result.length; i++) {
                            var obj = data.result[i];
                            // var list = `<li><a href='http://193.112.55.79:9090/api/getcategorybyid?categoryid=${obj.categoryId}'>${obj.category}</a></li>`
                            // var list = `<li><a href='../../pages/category/TV.html?categoryid=${obj.categoryId}'>${obj.category}</a></li>`

                            //动态跳转至子分类的商品详情
                            var list = `<li><a href='../../pages/categorySub/subClass.html?categoryid=${obj.categoryId}'>${obj.category}</a></li>`

                            html += list;
                        }
                        html += "</ul>"
                        // console.log(html);   
                        $('.list_fenlei' + id).html(html);
                        $this.data('isGet',true);
                    }
                })
            }
     
        })
    })




   


})



