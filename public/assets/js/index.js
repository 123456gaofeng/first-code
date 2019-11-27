//获取文章数量
$.ajax({
    type:'get',
    url:'/posts/count',
    success:function(response) {
        console.log(response);
        $('#article').html('<strong>'+ response.draftCount+'</strong>篇文章（<strong>'+ response.postCount+'</strong>篇草稿）')
    }
});
//查询分类数量
$.ajax({
   type:'get',
   url:'/categories/count',
   success:function(response) {
       console.log(response);
       $('#classify').html('<strong>'+ response.categoryCount+'</strong>个分类')
   }
});
//查询评论数量
$.ajax({
    type:'get',
    url:'/comments/count',
    success:function(response){
        console.log(response);
        $('#comment').html('<strong>'+response.commentCount+'</strong>条评论')
    }
})