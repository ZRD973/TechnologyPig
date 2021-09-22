$(function(){
    $.ajax({
        type:'get',
        url:'http://127.0.0.1:2000/home',
        dataType:'json',
        success:function(res){
            var data = res.data;
            if(data.length >0){
                // append到页面
                $.each(data,function(index,item){
                    var str = `<li class="lists">
                    <img data-original=${item.imgUrl} src="img/loading.gif" width="150" height="150">
                    <label>
                        <b class="discount">${item.newPrice}</b>
                        <span class="price-text">${item.oldPrice}</span> 
                    </label>            
                </li>`
                $(".index-main ul").append(str)
                })
                $(".index-main ul img").lazyload({
                    effect:'fadeIn'
                })
            }
        }
    })
});
