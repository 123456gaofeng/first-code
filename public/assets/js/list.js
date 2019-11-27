//在地址栏获取通过分类列表传过来的id
var listId=getUrlParams('id');
// console.log(listId);
//根据id获得文章内容
$.ajax({
    type:'get',
    url:'/posts/category/'+listId,
    success:function(response){
        //渲染页面内容
        var html=template('listTpl',{data: response});
        console.log(html);
        $('#listBox').html(html); 
    }
});
// 根据id获取分类信息
$.ajax({
    type:'get',
    url:'/categories/'+listId,
    success:function(response){ 
        console.log(response); 
        $('#textBox').html(response.title)
    }
})