$(function(){
    var currentPage = 1;
    var pageSize = 5;
    render ();
    function render () {
    $.ajax({
        type:"get",
        url:"/category/queryTopCategoryPaging",
        dataType:"json",
        data:{
            page:currentPage,
            pageSize:pageSize
        },
        success:function( info ){

               // 模板引擎
        var htmlStr = template("tpl",info);
        $("tbody").html(htmlStr);

        $('#paginator').bootstrapPaginator({
            bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
            currentPage:info.page,//当前页
            totalPages:Math.ceil(info.total / info.size),//总页数
            size:"small",//设置控件的大小，mini, small, normal,large
            onPageClicked:function(event, originalEvent, type,page){
                currentPage = page;
                render();
            }
          });
          
        }
        });
        
    }
    $('#form').bootstrapValidator({
   
  
        //2. 指定校验时的图标显示，默认是bootstrap风格
        feedbackIcons: {
          valid: 'glyphicon glyphicon-ok',
          invalid: 'glyphicon glyphicon-remove',
          validating: 'glyphicon glyphicon-refresh'
        },
      
        //3. 指定校验字段
        fields: {
          //校验用户名，对应name表单的name属性
          categoryName: {
            validators: {
              //不能为空
              notEmpty: {
                message: '请输入一级分类名称'
              },
            }
          },
        }
      });
      $("#form").on('success.form.bv', function (e) {
        e.preventDefault();
        //使用ajax提交逻辑
        $.ajax({
            type:"post",
            url:"/category/addTopCategory",
            dataType:"json",
            data:$('#form').serialize(),
            success:function( info ){
                console.log( info );
               if(info.success){
                currentPage = 1;
                render();
                $('#addModal').modal("hide"); 
               } 
            }
        })
    });
});




$(function(){
    $("#addBtn").on("click",function(){
        $('#addModal').modal("show");
      })
})
