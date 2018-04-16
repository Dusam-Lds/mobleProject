//调用百度的方法获取上个页面location传过来的id
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return (r[2]); return null;
}

requirejs(['jquery','bootstrap'],function($) {
    //获取子分类下的分类列表
    var id = getQueryString('categoryid');
    ajax = $.ajax({
        url: Api.getproductlist,
        //接收上个页面传送过来的id，
        data: { categoryid: id},
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

//封装一个ajax函数，方便取出里面的值，动态传入初始化分页里，写活
function hanshu(num, type) {
    var id = getQueryString('categoryid');
    $.ajax({
        url: Api.getproductlist,
        async: false, //同步请求，省略这行代码默认为异步
        //接收上个页面传送过来的id，
        data: { categoryid: id, pageid: num },
        dataType: "JSON",
        success: function (data) {
            getAjax = data;
            //    console.log(data);
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
            html += "</div>"
            $('.allCategory').html(html);
        }
    })
}
//设置一个全局变量来接收hanshu()里面传来的值
var getAjax = '';
hanshu();//调用之后，入口函数里面才能接到已封装的函数里面的数据
$(function() {
    var category = {
        tc : getAjax.totalCount,
        ps : getAjax.pagesize,
    }
    //引入jQuery和jqPaginator，初始化分页
    $('#demo4').jqPaginator({
        visiblePages: 3,
        currentPage: 1,
        totalCounts: category.tc, //设置分页的总条目数
        pageSize: category.ps, //设置每一页的条目数
        last: '', //为空的话，结构就消失
        first: '',
        onPageChange: function (num, type) {
           hanshu(num,type);
        }
    });
})
