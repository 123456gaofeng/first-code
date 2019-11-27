
$('#logo').on('change',function(){
    var file=this.files[0];
    var formData=new FormData();
    formData.append('logo',file);
    $.ajax({
        type:'post',
        url:'/upload',
        data:formData,
        processData:false,
        contentType:false,
        success:function(response){
            console.log(response);
            $('#site_logo').val(response[0].logo);
            //头像预览
            $('#preview').attr('src',response[0].logo)
        },
    }) ;  
});
//表单提交网站配置
$('#previewForm').on('submit',function(){
    var forData=$(this).serialize();
    // console.log(forData);
    $.ajax({
       url:'/settings',
       type:'post',
       data:forData,
       success:function(response){
           console.log(12);
           
           location.reload();
       }
    })
    return false;
});
//获取网站配置
$.ajax({
    url:'/settings',
    type:'get',
    success:function(response){
        console.log(response);
        if(response){
            $('input[name="logo"]').val(response.logo);
            $('img[id="preview"]').attr('src',response.logo);
            //站点名称
            $('input[name="title"]').val(response.title);
            //站点描述
            $('textarea[name="description"]').val(response.description);
            //站点关键词
            $('input[name="keywords"]').val(response.keywords);
            //评论功能
            $('input[name="comment"]').prop('checked',response.comment);
            //人工审核
            $('input[name="review"]').prop('checked',response.review);
        }   
    }
});
