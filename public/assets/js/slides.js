//选择文件
$('#picture').on('change',function(){
    var file=this.files[0];
    var forData=new FormData();
    forData.append('picture',file);
    $.ajax({
        type:'post',
        url:'/upload',
        processData:false,
        contentType:false,
        data:forData,
        success:function(response){
            console.log(response);
            
            $('#imgs').val(response[0].picture)
        }
    })
});
//添加轮播图
$('#slidesBox').on('submit',function() {
    var forData=$(this).serialize();
    console.log(forData);
    $.ajax({
        type:'post',
        url:'/slides',
        data:forData,
        success:function() {
            location.reload()
        }
    })
    return false;
});
//渲染轮播图到页面
$.ajax({
    type:'get',
    url:'/slides',
    success:function(response) {
        console.log(response);
        var html=template('slideTpl',{data:response})
        console.log(html);
        
        $('#slidesBoxs').html(html)
    }
});
$('#slidesBoxs').on('click','.delete',function(){
    var id=$(this).attr('data-id');
    $.ajax({
        url:'/slides/'+id,
        type:'delete',
        success:function() {
            location.reload();
        }
    })
})

