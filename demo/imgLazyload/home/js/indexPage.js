// jquery来写的
var flag = null
$(function () {
  // 第一步 上来加载第一页的数据
  var num = 1
  flag = true
  imgList(num)
  // 判断懒加载的时机  很简单 判断滚动条是否触底
  $(window).scroll(function () {
    // 滚动条和顶部的高度
    var scrollTop = Math.ceil($(this).scrollTop())
    // 获取当前视口的一个高度
    var _h = $(this).height()
    // 当前页面的高度
    var h = $(document).height()
    // 说明滚动条触底了
    if (scrollTop + _h >= h) {
      if (flag) {
        num++
        imgList(num)
      }
    }
  })
})


function imgList (size) {
  // 发送异步的请求了
  $.ajax({
    type: 'get',
    url: `http://127.0.0.1:3000/home?page=${size}`,
    dataType: 'json',
    success: function (res) {
      console.log(res.data)
      if (res.status === 200) {
        // 渲染数据
        var data = res.data
        // 渲染数据
        if (data.length > 0) {
          // 循环遍历 jquery
          $.each(data, function (index, item) {
            var str = `
            <li class="lists">
            <img src=${item.imgUrl} width="150" height="150">
            <label>
              <b class="discount">${item.newPrice}</b>
              <span class="price-text">${item.oldPrice}</span>
            </label>
          </li>
            `
            // 追加到ul
            $('.index-main ul').append(str)
          })
        }
      } else {
        flag = false
        $(".buttom-p").show()
      }
    }
  })
}