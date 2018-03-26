const url = 'http://193.112.55.79:9090/api/';

const Api = {
    getindexmenu: url +'getindexmenu'
}


requirejs.config({
    paths: {
        jquery: 'js/lib/jquery-1.12.2',
        bootstrap: './js/lib/bootstrap',
        jCokie: 'https://cdn.bootcss.com/jquery-cookie/1.4.1/jquery.cookie'
    
    },
    shim: {
        jquery: {
            exports: 'jquery'
        },
        bootstrap: {
            deps: ['jquery']
        },
        jCokie: {
            deps: ['jquery']
        }
    }
})