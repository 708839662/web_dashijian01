$(function () {
    // 1.获取用户信息
    getUserInof();
    //2.退出
    var layer = layui.layer;
    $('#btnLogout').on('click', function () {
        // 框架提供的询问框
        layer.confirm('是否确认退出?', { icon: 3, title: '提示' }, function (index) {
            // 清空本地token
            localStorage.removeItem('token');
            // 2.页面跳转
            location.href = "/login.html"
            // 关闭询问框
            layer.close(index);
        });

    })

})
// 获取用户信息（封装在入口函数外面）
// 原因：后面的页面要调用
function getUserInof() {
    //发送AJAX
    $.ajax({
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem("token") || ""
        // },
        success: function (res) {
            //判断状态码
            if (res.status !== 0) {
                return layui.layer.msg(res.message);
            }
            //请求成功 渲染用户头像信息
            renderAvatar(res.data)

        }
    })
}
// 封装用户头像渲染信息
function renderAvatar(user) {
    //1.用户名 昵称优先 ，没有用username
    var name = user.nickname || user.username;
    $("#welcome").html("欢迎&nbsp;&nbsp;" + name)
    // 2.用户头像
    if (user.user_pic !== null) {
        //有头像
        $('.layui-nav-img').show().attr("src", user.user_pic);
        $(".user-avatar").hide();
    } else {
        //没头像
        $(".layui-nav-img").hide();
        var text = name[0].toUpperCase();
        $('.user-avatar').show().html(text)
    }
}
