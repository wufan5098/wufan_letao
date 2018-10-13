// 根据ajax全局事件，开启进度条
$(function(){
$(document).ajaxStart(function(){
  NProgress.start();
});
$(document).ajaxStop(function(){
  NProgress.done();
})
 setTimeout(function(){
  NProgress.done() ;
 },500)
}); 



// 左侧边栏二级菜单切换
$(function(){
  $('.lt_aside .category').click(function(){
    $('.lt_aside .child').stop().slideToggle();
  });
})  

$('.icon_menu').click(function(){
  $('.lt_aside').toggleClass("hidemenu");
  $('.lt_main').toggleClass("hidemenu");
  $('.lt_topbar').toggleClass("hidemenu");
})

// 模态框
$('.icon_logout').click(function(){
  $('#logoutModal').modal("show");
});

// 登出处理
$('#logoutBtn').click(function() {
  $.ajax({
    type: "get",
    url: "/employee/employeeLogout",
    dataType: "json",
    success: function( info ) {
    console.log(info);
    
      if ( info.success ) {
        // 退出成功, 跳转到登陆页
        location.href = "login.html";
      }
    }
  })
});

