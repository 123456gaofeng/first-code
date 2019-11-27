//添加用户
$('#userform').on('submit',function(){
    var value=$(this).serialize();
    // return false;
    $.ajax({
      type:'post',
      url:'/users',
      data:value,
      success:function(response){
        location.reload();
      },
      error:function(){
        alert('添加失败')
      }
    })
    return false;
  });
  //上传用户头像
 $('#modifyBox').on('change','#avatar',function(){
   //  console.log(this.files[0])
     var fordata=new FormData();
     fordata.append('avatar',this.files[0]);
     $.ajax({
       type:'post',
       url:'/upload',
       data:fordata,
       processData:false,
       contentType:false,
       success:function(response){
         console.log(response);
         //实现头像预览
         $('#preview').attr('src',response[0].avatar);
         //在隐藏域中显示图片
         $('#hiddens').val(response[0].avatar);
       },
       error:function(){
         console.log('文件上传失败');
         
       }
     })

 });
$.ajax({
    url:'/users',
    type:'get',
    success:function(response){
       var html= template('userTpl',{data:response});
       $('#tbodyBox').html(html);
    }
});
//编辑用户信息
$('#tbodyBox').on('click','.modify',function(){
   var id=$(this).attr('data-id')
  //  console.log(id);
    $.ajax({
        type:'get',
        url:'/users/'+id,
        success:function(response){
          console.log(response);
          
          var html=template('modifyTpl',response)
          $('#modifyBox').html(html);
           //实现头像预览
        //  $('#preview').attr('src',response[0].avatar);
        //  //在隐藏域中显示图片
        //  $('#hiddenBox').val(response[0].avatar);
          
        }
    })
     
});
//修改用户信息
$('#modifyBox').on('submit','#userform',function(){
    var forData=$(this).serialize();
    console.log(forData);
    var id= $(this).attr('data-id');
    console.log(id);
    $.ajax({
       type:'put',
       url:'/users/'+id,
       data:forData,
       success:function(response){
         console.log(response);
         
         location.reload();
       },
       error:function(){
         alert('修改失败')
       }
    })
    return false;
})
//删除用户信息
$('#tbodyBox').on('click','.develop',function(){
  var id=$(this).attr('data-id');
    if(confirm('您真的要删除吗')){
      $.ajax({
        type:'delete',
        url:'/users/'+id,
        success:function(response){
          location.reload();
        }
      })
    }
  
})
//批量删除
$('#selectAll').on('change',function(){
  //当前全选按钮的选中状态
   var status=$(this).prop('checked');
   //获取所有用户并将用户状态与全选按钮保持一致
  $('#tbodyBox').find('input').prop('checked',status);
})
$('#tbodyBox').on('change','#select',function(){
    var inputs=$('#tbodyBox').find('input');
    if(inputs.length==inputs.filter(':checked').length){
        $('#selectAll').prop('checked',true);
    }else{
      $('#selectAll').prop('checked',false);
    }
})
$('#selectAll').on('change',function(){
  var status=$(this).prop('checked');
  if(status){
    $('#selectLittle').show();
  }else{
    $('#selectLittle').hide();
  }
})
$('#tbodyBox').on('change','#select',function(){
  var inputs=$('#tbodyBox').find('input');
  // console.log(inputs.filter(':checked').length);
  if(inputs.filter(':checked').length>0){
    $('#selectLittle').show();
  }else{
    $('#selectLittle').hide();
  }
});
$('#selectLittle').on('click',function(){
  var ids=[];
   var inputChecked=$('#tbodyBox').find('input').filter(':checked');
   inputChecked.each(function(index,ele){
        ids.push($(ele).attr('data-id'))
   });
  //  console.log(ids);
  if(confirm('你真的要删除吗')){
    $.ajax({
      type:'delete',
      url:'/users/'+ids.join('-'),
      success:function(){
        location.reload();
      }
    }) 
  }
})