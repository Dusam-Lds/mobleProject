//调用百度的方法获取上个页面location传过来的id
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return (r[2]); return null;
}

requirejs(['jquery', 'bootstrap'], function ($) {
    // 获取子分类下的商品详情
    ajax = $.ajax({
        url: Api.getproduct,
        data: { productid: getQueryString('productid') },
        success: function (data) {
            console.log(data);
            // console.log(data.result[0].productName);
            //分类标题里面的子标题
            var detail_title_subTitle = data.result[0].productName.split(" ")[0];
            $(".detail_nav li .detail_brand").text(detail_title_subTitle);

            
            for (let i = 0; i < data.result.length; i++) {
                var obj = data.result[i];
                var html = `<div class="datail_show">
                            <div class="img_info">
                                <p>${obj.productName}</p>
                                ${obj.productImg}
                                <div class="collect">收藏</div>
                            </div>
                            <ul class="clearfix">
                                <li>比价购买</li>
                                <li>产品参数</li>
                                <li>评价(222)</li>
                            </ul>
                            <div class="JD_price clearfix">
                                <span>京东商城</span>
                                <div>
                                    <span>￥1999.00</span>
                                    <span>去购买</span>
                                </div>
                            </div>
                            <p class="explain">*实际价格以各网站列出的实时售价为准，我们提供的价格可能有数小时至数日的延迟</p>
                            <div class="comment">网友评价</div>
                        </div>`
            }
            $('.detail').append(html);
        }
    })
    //动态获取商品详情的标题
    var detail_title = localStorage.getItem("keyword");
    // console.log(detail_title);
    $(".detail_nav li .detail_title").text(detail_title);
    

})