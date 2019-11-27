//解析浏览器地址栏上的乱码情况
function getUrlInfo(){
  var url = location.search; //获取url中"?"符后的字串 
               theRequest = new Object();
              if (url.indexOf("?") != -1) {
                  var str = url.substr(1);
                  strs = str.split("&");
                  for (var i = 0; i < strs.length; i++) {
                      theRequest[strs[i].split("=")[0]] = decodeURIComponent(strs[i].split("=")[1]);
                  }
              }};
              // 从浏览器的地址栏中获取查询参数
function getUrlParams(name) {
	var paramsAry = location.search.substr(1).split('&');
	// 循环数据
	for (var i = 0; i < paramsAry.length; i++) {
		var tmp = paramsAry[i].split('=');
		if (tmp[0] == name) {
			return tmp[1];
		}
	}
	return -1;
}
//获取热门推荐并渲染到页面
$.ajax({
    type:'get',
    url:'/posts/recommend',
    success:function(response){
        // console.log(response);
        var recommendTpl=`
        {{each data}}
        <li>
        <a href="javascript:;">
          <img src="{{$value.thumbnail}}" alt="">
          <span>{{$value.title}}</span>
        </a>
      </li>
      {{/each}}
        `    
        var html=template.render(recommendTpl,{data:response});
        $('#recommend').html(html)
    }
});
//获取随机推荐
$.ajax({
    url:'/posts/random',
    type:'get',
    success:function(response){
        // console.log(response);
        var randomTpl=`
        {{each data}}
        <li>
        <a href="detail.html?id={{$value._id}}">
          <p class="title">{{$value.title}}</p>
          <p class="reading">阅读({{$value.meta.views}})</p>
          <div class="pic">
            <img src="{{$value.thumbnail}}" alt="">
          </div>
        </a>
      </li>
        {{/each}}
        `
        var html=template.render(randomTpl,{data:response});
        $('#randonBox').html(html);
    }
});
//获取最新评论
$.ajax({
  type:'get',
  url:'/comments/lasted',
  success:function(response){
    console.log(response);
    var commentTpl=`
    {{each data}}
    <li>
            <a href="javascript:;">
              <div class="avatar">
                <img src="{{$value.author.avatar}}" alt="">
              </div>
              <div class="txt">
                <p>
                  <span>{{$value.author.nickName}}</span>{{$value.createAt}}说:
                </p>
                <p>{{$value.content}}</p>
              </div>
            </a>
          </li>
       {{/each}}
    `
    var html=template.render(commentTpl,{data:response});
    $('#commentBox').html(html)
  }
});
//侧边栏分类列表
$.ajax({
  type:'get',
  url:'/categories',
  success:function(response){
    console.log(response);
    var homeTpl=`
    {{each data}}
    <li><a href="list.html?id={{$value._id}}"><i class="fa {{$value.className}}"></i>{{$value.title}}</a></li>
    {{/each}}
    `
    var html=template.render(homeTpl,{data:response});
    $('#navBox').html(html);
    $('#topnavBox').html(html);
  }
});
//搜索表单添加提交事件
$('.search form').on('submit',function(){
      var keys=$(this).find('.keys').val();
      location.href='/search.html?key='+keys;
     return false;
});




