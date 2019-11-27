
//根据浏览器地址获得id
// var id=location.search.split('=')[1].split('&')[0];
var id=getUrlParams('id');
//根据浏览器地址获得分类标题并渲染到页面
// console.log(detailId);
//根据id获得文章内容
$.ajax({
    url:'/posts/'+id,
    type:'get',
    success:function(response){
        var idc=response.category;
        // console.log(idc);
        console.log(response);
        $.ajax({
            type:'get',
            url:'/categories/'+idc,
            success:function(adc){
                 response.ed=adc.title;
                 var articleTpl=`
                 <div class="breadcrumb">
                   <dl>
                     <dt>当前位置：</dt>
                     <dd><a href="javascript:;">{{ed}}</a></dd>
                     <dd>{{content}}</dd>
                   </dl>
                 </div>
                 <h2 class="title">
                   <a href="javascript:;">{{title}}</a>
                 </h2>
                 <div class="meta">
                   <span>{{author}} 发布于 {{createAt.split('T')[0]}}</span>
                   <span id='titles'>分类: <a href="javascript:;">{{ed}}</a></span>
                   <span>阅读: ({{meta.views}})</span>
                   <span>评论: ({{meta.comments}})</span>
                   <a href="javascript:;" id='like'>赞: ({{meta.likes}})</a>
         
                 </div>
                 ` 
                 var html=template.render(articleTpl,response);
                 $('#articleBox').html(html);
            }
        })
       
    }
});
//点赞功能
$('#articleBox').on('click','#like',function(){
    $.ajax({
      url:'/posts/fabulous/'+id,
      type:'post',
      success:function(response){
          alert('点赞成功');
          location.reload();
      }
    })
  });
  //获取网站配置
  $.ajax({
    url:'/settings',
    type:'get',
    success:function(response){
      review=response.review;
      console.log(response);
      //判断管理员是否开启了评论功能
      if(response.comment){
          var html=template('commentTpl');
          $('#comment').html(html);
      }  
    }
  });
  //评论表单发生提交行为时
  $('#comment').on('submit','form',function(){
     // 获取用户输入的评论内容
	  var content = $(this).find('textarea').val();
      var state;
      if(review){
        //要经过审核
        state=0;
      }else{
        state=1;
      };
        $.ajax({
          url:'/comments/',
          type:'get',
          data:{
            content:content,
            post:id,
            state:state,  
          },
          success:function(response){
             alert('评论成功');
             location.reload();
          }
        })
     return false;
  })
  



