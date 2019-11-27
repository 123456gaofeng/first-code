$.ajax({
    type:'get',
    url:'/categories',
    success:function(response){
        var html=template('postaddTpl',{data:response})
        $('#category').html(html);
    }
});
//上传文章头像
$('#divBox').on('change','#feature',function(){
    // console.log(this.files[0])
    var formdata=new FormData();
    formdata.append('avatar',this.files[0]);
    $.ajax({
        type:'post',
        url:'/upload',
        processData:false,
        contentType:false,
        data:formdata,
        success:function(response){
         $('#img').css({'display':'block'});
         $('#img').prop('src',response[0].avatar);
         $('#thumbnail').val(response[0].avatar);
        }
    })
})
// 创建文章
$('#postBox').on('submit',function(){
     var forData=$(this).serialize();
     $.ajax({
         type:'post',
         url:'/posts',
         data:forData,
         success:function(response){
            //  console.log(response);
            location.href='posts.html';
         }
     })
     return false;
});
//得到浏览器地址上的id,获取修改文章的数据并渲染
var id=location.search.substr(1).split('&')[0].split('=')[1];
if(id){
    $.ajax({
        type:'get',
        url:'/posts/'+id,
        success:function(response){
            $.ajax({
                url: '/categories',
		        type: 'get',
                success:function(categories){
                    response.categories=categories;
                    console.log(response); 
                   var html=template('modifyTpl',response);
                   $('#divBox').html(html)
                }
            })
        }
    })
}

// 修改文章操作添加表单提交事件
$('#divBox').on('submit','#modifyForm',function(){
    var forData=$(this).serialize();
    var id=$(this).attr('data-id');
    $.ajax({
        type:'put',
        url:'/posts/'+id,
        data:forData,
        success:function(response){
            location.href='/admin/posts.html'   
        },
    })
    return false; 
})
