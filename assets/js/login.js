//入口函数
$(function () {
    //1.点击去注册账号，则隐藏登陆区域，显示注册区域
    $('#link_reg').on('click', function () {
        $('.reg-box').show()
        $('.login-box').hide()
    })
    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })
})