
//获取轮播图列表
$.ajax({
    url:'/slides',
    type:'get',
    success:function(response){
        console.log(response);
        var indexTpl=`
        {{each data}}
        <li>
        <a href="/admin/posts.html?id={{$value.link}}">
          <img src="{{$value.image}}">
          <span>{{$value.title}}</span>
        </a>
      </li>
        {{/each}}
       ` //轮播图动画
        var html=template.render(indexTpl,{data:response});
        $('#swipeBox').html(html);
        var swiper = Swipe(document.querySelector('.swipe'), {
            auto: 3000,
            transitionEnd: function (index) {
              // index++;
      
              $('.cursor span').eq(index).addClass('active').siblings('.active').removeClass('active');
            }
          });
      
          // 上/下一张
          $('.swipe .arrow').on('click', function () {
            var _this = $(this);
      
            if(_this.is('.prev')) {
              swiper.prev();
            } else if(_this.is('.next')) {
              swiper.next();
            }
          });
    }
});
//获取最新发布文章
$.ajax({
  url:'/posts/lasted',
  type:'get',
  success:function(response){ 
      console.log(response);
      var commentsTpl=`
        {{each data}}
        <div class="entry">
        <div class="head">
          <span class="sort">{{$value.title}}</span>
          <a href="detail.html?id={{$value._id}}">{{$value.category.title}}</a>
        </div>
        <div class="main">
          <p class="info">{{$value.author.nickName}} 发表于 {{$value.author.createTime.split('T')[0]}}</p>
          <p class="brief">{{$value.category.content}}</p>
          <p class="extra">
            <span class="reading">阅读({{$value.meta.views}})</span>
            <span class="comment">评论({{$value.meta.comments}})</span>
            <a href="javascript:;" class="like" data-id='{{$value._id}}' id='likess'>
              <i class="fa fa-thumbs-up"></i>
              <span>赞({{$value.meta.likes}})</span>
            </a>
            <a href="detail.html?id={{$value._id}}" class="tags">
              分类：<span>{{$value.category.title}}</span>
            </a>
          </p>
          <a href="detail.html?id={{$value._id}}" class="thumb">
            <img src="{{$value.thumbnail}}" alt="">
          </a>
        </div>
      </div>
        {{/each}}
      `
      var html=template.render(commentsTpl,{data:response});
      $('#commentsBox').html(html);
  }
});
$('#commentsBox').on('click','#likess',function(){
     var id=$(this).attr('data-id');
     console.log(id);
     $.ajax({
       type:'post',
       url:'/posts/fabulous/'+id,
       success:function(response){
         location.reload();
       }
     })
})
