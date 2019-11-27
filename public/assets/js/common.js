//渲染左侧边栏的用户头像和密码
$.ajax({
    type:'get',
    url:'/users/'+userId,
    success:function(response){
        $('.profile .avatar').attr('src',response.avatar);
        $('.profile .name').html(response.nickName);
    }
})