//通过关键字搜索文章
var key=getUrlParams('key');
var size=decodeURIComponent(key);
// console.log(size);
$.ajax({
  type:'get',
  url:'/posts/search/'+size,
  success:function(response){
    console.log(response);
    var html=template('serachTpl',{data:response});
      $('#textBox').html(html);
  }
});