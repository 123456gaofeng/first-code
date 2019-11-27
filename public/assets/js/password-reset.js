$('#reset').on('submit',function(){
    var forData=$(this).serialize();
    console.log(forData);
    $.ajax({
        type:'put',
        url:'/users/password',
        data:forData,
        success:function(){
            location.href='/admin/login.html'
        }
    })
    return false;
})