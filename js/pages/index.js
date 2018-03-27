
requirejs(['jquery','bootstrap'], function ($) {
    // 首页菜单的数据请求
  var ajax =  $.ajax({
        url: Api.getindexmenu,
        success:function(data) {
            // console.log(data);
            var html = "<div class='row'>"
            for (var i = 0; i < data.result.length; i++) {
                var obj = data.result[i];
                var menu = `<div class='col-xs-3'>
                                <a href='./pages/${obj.titlehref}'>
                                    ${obj.img}
                                    <span>${obj.name}</span>
                                </a>
                            </div>`
                html+=menu;
            }
            html +="</div> "
            $('.custom_menus').html(html);
        }
    })
    // 首页获取超值推荐列表
    ajax.done(function(){
        $.ajax({
            url: Api.getmoneyctrl,
            success: function(data) {
                // console.log(data);
                var html = "<div class='row'>"
                for (var i = 0; i < data.result.length; i++) {
                    var obj = data.result[i];
                    var lists = `<div class="shop_lists clearfix">
                                    <a class="pull-left">${obj.productImgSm}</a>
                                    <div class="info_right pull-right">
                                        <p>${obj.productName}<span>${obj.productPinkage}</span></p>                                    
                                        <div class="clearfix"><span>${obj.productFrom} | ${obj.productTime}</span><span class="glyphicon glyphicon-edit pull-right"></span></div>
                                    </div>
                                </div>`
                    html+=lists;
                }
                html +="</div > "
                $('.zhekou_lists').html(html);
                
            }
        })
    })
});


