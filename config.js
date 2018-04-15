const url = 'http://193.112.55.79:9090/api/';

const Api = {
    getindexmenu: url +'getindexmenu',//首页菜单
    getmoneyctrl: url +'getmoneyctrl',//获取超值推荐列表
    getcategorytitle: url +'getcategorytitle',//获取菜单分类标题
    getcategory: url + 'getcategory',//分类菜单的子分类菜单
    getcategorybyid: url + 'getcategorybyid',//根据子分类菜单的id获取分类的名称
    getproductlist: url + 'getproductlist',//子分类下的商品列表
    getproduct: url + 'getproduct',//子分类下的商品详情
}


requirejs.config({
    paths: {
        jquery: '/js/lib/jquery-1.12.2',
        bootstrap: '/js/lib/bootstrap',
        // jqPaginator:'/js/lib/jqPaginator',
    
    },
    shim: {
        jquery: {
            exports: 'jquery'//exports 表示输出的对象名
        },
        bootstrap: {
            deps: ['jquery']// deps 为数组,表示其依赖的库
        }
    }
})

