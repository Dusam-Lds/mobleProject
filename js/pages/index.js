requirejs(['jquery','bootstrap'], function ($) {
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
    
   
});