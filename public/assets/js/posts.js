// 向服务器端发送请求获取文章列表
$.ajax({
    type:'get',
    url:'/posts',
    success:function(response){
        console.log(response);
        
        var html=template('postsTpl',response); 
        $('#postsBox').html(html);
        var page=template('pageTpl',response);
        $('#pages').html(page);
    }
});
//处理时间的函数
function FormDate(date){
    //将日期字符串转换成对象
    date=new Date(date);
    return date.getFullYear()+'-'+( date.getMonth()+1)+'-'+date.getDate()
};
// 分页
function changePage(page){
    $.ajax({
        type:'get',
        url:'/posts',
        data:{page:page},
        success:function(response){
            var html=template('postsTpl',response); 
            $('#postsBox').html(html);
            var page=template('pageTpl',response);
            $('#pages').html(page);
        }
    });
};
// 向服务器端索要分类列表
$.ajax({
    type:'get',
    url:'/categories',
    success:function(response){
        var html=template('filter',{data:response});
        $('#filtersBox').html(html)      
    }
});
$('#filterButton').on('submit',function(){
      var formdata=$(this).serialize();
    //   console.log(formdata);
      $.ajax({
        type:'get',
        url:'/posts',
        data: formdata,
        success:function(response){
            // console.log(response);   
            var html=template('postsTpl',response); 
            $('#postsBox').html(html);
            var page=template('pageTpl',response);
            $('#pages').html(page);
        }
    });
      return false ;
});
//删除文章操作
$('#postsBox').on('click','.develop',function(){
    var id=$(this).attr('data-id');
    $.ajax({
        type:'delete',
        url:'/posts/'+id,
        success:function(response){
            location.reload();
        }
    })
});
