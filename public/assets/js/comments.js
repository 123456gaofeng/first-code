// 创建评论
// $.ajax({
//     type:'post',
//     url:'/comments',
//     data:{
//         author:'5dde11fbedcb8b4b7c64413c',
//         content:'萨瓦迪卡哈哈哈哈哈',
//         post:'5ddd3fbbcdffca3214142c4f',
//     },
//     success:function(response){
//         console.log(response);
        
//     },error:function(res){
//         console.log('cuowu');
        
//     }
// })
// 获取评论列表
$.ajax({
    url:'/comments',
    type:'get',
    success:function(response){
        console.log(response);
        var html=template('commentTpl',response); 
        $('#commentsBox').html(html);
        var page=template('pageTpl',response);
        $('#pageBox').html(page)
    }
});
//分页
function changePage(page){
    $.ajax({
        url:'/comments',
        type:'get',
        data:{
            page:page,
        },
        success:function(response){
            var html=template('commentTpl',response); 
            $('#commentsBox').html(html);
            var page=template('pageTpl',response);
            $('#pageBox').html(page)
        }
    })
};
//审核状态
$('#commentsBox').on('click','.modify',function(){
    var status=$(this).attr('data-status');
    var id=$(this).attr('data-id')
    $.ajax({
        type:'put',
        url:'/comments/'+id,
        data:{
            state:status==0 ? 1 : 0,
        },
        success:function(){
            location.reload();
        }
    })
});
//删除评论
$('#commentsBox').on('click','.delete',function(){
    var id=$(this).attr('data-id');
    $.ajax({
        url:'/comments/'+id,
        type:'delete',
        success:function(response){
           location.reload();
        }
    })
})