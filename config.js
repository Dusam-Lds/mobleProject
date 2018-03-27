const url = 'http://193.112.55.79:9090/api/';

const Api = {
    getindexmenu: url +'getindexmenu',//首页菜单
    getmoneyctrl: url +'getmoneyctrl',//获取超值推荐列表
    getcategorytitle: url +'getcategorytitle',//获取菜单分类标题
    getcategory: url + 'getcategory',//菜单分类标题下的子分类
}


requirejs.config({
    paths: {
        jquery: '/js/lib/jquery-1.12.2',
        bootstrap: '/js/lib/bootstrap'
      
    
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

