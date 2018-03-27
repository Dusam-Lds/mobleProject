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
            // console.log(data);
            
           
            
        }
    })
})