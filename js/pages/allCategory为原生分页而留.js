//调用百度的方法获取上个页面location传过来的id
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return (r[2]); return null;
}
var tatalPage = 0;
function render() {
    var str = '<li class="disabled"><a class="previous" href = "#" aria - label="Previous" ><span aria-hidden="true">上一页</span></a ></li >';
    for (var j = 0; j < tatalPage; j++) {
        if (j === 0) {
            var list = `<li class="active"><a href="#">${j + 1}</a></li>`;

        } else {
            var list = `<li><a href="#">${j + 1}</a></li>`;
        }

        str += list;
    }
    str += '<li><a class="next" href="#" aria-label="Next"><span aria-hidden="true">下一页</span></a></li>';
    $(".pagination").html(str);


}

requirejs(['jquery', 'bootstrap'], function ($) {
    //获取子分类下的分类列表
    var id = getQueryString('categoryid');
    ajax = $.ajax({
        url: Api.getproductlist,
        //接收上个页面传送过来的id，
        data: { categoryid: id },
        dataType: "JSON",
        success: function (data) {
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
            html += "</div>"
            $('.allCategory').html(html);

            var pagesize = data.pagesize; //每页的显示数量
            var totalCount = data.totalCount; //总数量
            //计算总共多少页 = 总行数/每页显示行数
            tatalPage = Math.ceil(totalCount / pagesize);//向上取整
            render();
        }
    })
    //获取本地已存储的值
    var keyword = localStorage.getItem("keyword");
    $(".breadcrumb li.active").text(keyword);
})
//点击上下页功能
$(function () {
    var currentPage = "";
    $(".pagination").on("click", "li", function () {
        //上一页按钮
        var firstLi = $(".pagination>li:first-child").children().children().text();
        //下一页按钮
        var lastLi = $(".pagination>li:last-child").children().children().text();
        var _this = $(this).children().children().text();

        //点击数字时候样式改变
        if (_this !== firstLi && _this !== lastLi) {
            $(this).addClass("active").siblings().removeClass("active");
            currentPage = $(this).children().text();
            var id = getQueryString('categoryid');
            $.ajax({
                url: Api.getproductlist,
                //接收上个页面传送过来的id，
                data: { categoryid: id, pageid: currentPage },
                dataType: "JSON",
                success: function (data) {
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

        } else {
            //点击上一页
            if (_this === firstLi) {
                var fl = parseInt($(".pagination>li.active").children().text());
                if (fl > 1) {
                    $(".pagination>li.active").prev().addClass("active").siblings().removeClass("active");
                }
            } else if (_this === lastLi) {
                //点击下一页
                var ll = parseInt($(".pagination>li.active").children().text());
                var childLength = $(".pagination").children().length - 2;
                if (ll < childLength) {
                    $(".pagination>li.active").next().addClass("active").siblings().removeClass("active");
                }
            }
        }
    })

    $(".pagination").on("click", ".previous,.next", function () {
        setTimeout(function () {//定时功能是为了能够准确获取所点击的元素的值
            $(".pagination>li.active").each(function (i, e) {
                currentPage = parseInt($(e).children().text());
            })
            var id = getQueryString('categoryid');
            $.ajax({
                url: Api.getproductlist,
                //接收上个页面传送过来的id，
                data: { categoryid: id, pageid: currentPage },
                dataType: "JSON",
                success: function (data) {

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
        }, 1)
    })

})

