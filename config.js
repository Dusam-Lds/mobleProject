const url = 'http://193.112.55.79:9090/api/';

const Api = {
    getindexmenu: url +'getindexmenu',//首页菜单
    getmoneyctrl: url +'getmoneyctrl',//获取超值推荐列表
    getcategorytitle: url +'getcategorytitle',//获取菜单分类标题
    getcategory: url + 'getcategory',//分类菜单的子分类菜单
    getcategorybyid: url + 'getcategorybyid',//根据子分类菜单的id获取分类的名称
    getcategorybyid: url + 'getcategorybyid',
}


requirejs.config({
    paths: {
        jquery: '/js/lib/jquery-1.12.2',
        bootstrap: '/js/lib/bootstrap',
    
    },
    shim: {
        jquery: {
            exports: 'jquery'
        },
        bootstrap: {
            deps: ['jquery']
        }
    }
})

