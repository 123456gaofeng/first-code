$('#logout').on('click',function(){
    var isconfirm=confirm('你真的要退出吗');
    if(isconfirm){
      $.ajax({
        url:'/logout',
        type:'post',
        success:function(){
          location.href='login.html'
        },
        error:function(){
          alert('退出失败');
          
        }
      })
    }
  })