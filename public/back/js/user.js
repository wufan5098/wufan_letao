$(function(){
    var currentPage = 1;
    var pageSize = 5;

    var currentId;
    var isDelete;

    render();
    // 页面重新渲染
    function render(){
        $.ajax({
            type:"get",
            url:"/user/queryUser",
            data:{
                page:currentPage,
                pageSize:pageSize 
            },
            dataType:"json",
            success:function( info ) {
                console.log( info ); 
                
              var htmlStr = template("tpl", info );
              $('tbody').html( htmlStr );
               
            //  分页器测试
            $("#pagintor").bootstrapPaginator({
                bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
                currentPage:info.page,//当前页
                totalPages:Math.ceil(info.total/info.size),//总页数
                size:"large",//设置控件的大小，mini, small, normal,large
                onPageClicked:function(event, originalEvent, type,page){
                    currentPage= page;
                    render();
                }
              });                  
            }  
        })
    } 
    
    // 启用禁用按钮
    $(function(){
        $('tbody').on("click",".btn",function(){
            $('#userModal').modal("show");
            currentId = $(this).parent().data("id");
            isDelete = $(this).hasClass("btn-danger") ? 0 : 1 ;
        });

        $('#submitBtn').on("click",function(){
            console.log(currentId ,isDelete );  
           $.ajax({
               type:"post",
               url:"/user/updateUser",
               data:{
                id:currentId,
                isDelete:isDelete
               },
               dataType:"json",
               success:function( info ) {
               console.log( info ); 
                if(info.success) {
                    $('#userModal').modal("hide");
                    render();
                }    
               }
           });
        })
});
})
 