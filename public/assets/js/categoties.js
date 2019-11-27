//添加文章分类
$('#addCategoties').on('submit',function(){
    var forData=$(this).serialize();
    $.ajax({
        type:'post',
        url:'/categories',
        data:forData,
        success:function(){
            location.reload()
        }
    })
    return false;
});
//实现文章分类展示
$.ajax({
    type:'get',
    url:'/categories',
    success:function(response){
       var html= template('categotiesTpl',{data:response});
       $('#categotiesTbody').html(html)   
    }
});
//文章分类编辑展示
$('#categotiesTbody').on('click','.edit',function(){
      var id=$(this).attr('data-id')
      $.ajax({
          type:'get',
          url:'/categories/'+id,
          success:function(response){
              var html=template('modifyCategotiesTpl',response);
              $('#categotiesBax').html(html)
          }
      })
})
//文章分类修改成功
$('#categotiesBax').on('submit','#modifyCategoties',function(){
    var forData=$(this).serialize();
    var id=$(this).attr('data-id');
    $.ajax({
        type:'put',
        url:'/categories/'+id,
        data:forData,
        success:function(response){
            location.reload();
        }
    })
    return false;
})
//文章分类删除
$('#categotiesTbody').on('click','.delete',function(){
    var id=$(this).attr('data-id');
    $.ajax({
        type:'delete',
        url:'/categories/'+id,
        success:function(){
            location.reload();
        }
    })
})
