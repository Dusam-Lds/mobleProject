//调用百度的方法获取上个页面location传过来的id
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return (r[2]); return null;
}

requirejs(['jquery','bootstrap'],function($) {
    //获取子分类下的分类列表
    // var id = getQueryString('categoryid');
    ajax = $.ajax({
        url: Api.getproductlist,
        //接收上个页面传送过来的id，
        data: { categoryid: getQueryString('categoryid')},
        dataType: "JSON",
        success:function(data) {
            console.log(data);
            var html = "<div class='row'>"
            for (var i = 0; i < data.result.length; i++) {
                var obj = data.result[i];
                var lists = `<div class="shop_lists clearfix">
                                    <a href="../../pages/allCategory/detail.html?productid=${obj.productId}" class="pull-left">${obj.productImg}</a>
                                    <div class="info_right pull-right">
                                        <p>${obj.productName}</p>                                    
                                        <span>${obj.productPrice}</span>
                                        <div><span>${obj.productQuote}</span><span>${obj.productCom}</span></div>
                                    </div>
                                </div>`
                html += lists;
            }

            html +="</div>"
            $('.allCategory').html(html);
            
        }
    })
    //获取本地已存储的值
    var keyword = localStorage.getItem("keyword");
    $(".breadcrumb li.active").text(keyword);
})

