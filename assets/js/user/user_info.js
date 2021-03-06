$(function () {
    var form = layui.form;
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return "昵称长度为1~6为之间！"
            }
        }
    });

    //2.用户渲染
    initUserInfo();
    //倒出layer
    var layer = layui.layer;
    // 封装函数
    function initUserInfo() {
        // 发送ajax
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                //成功后渲染
                form.val('formUserInfo', res.data)
            }
        })
    }
    //3.表单重置
    $('#btnReset').on('click', function (e) {
        // 阻止表单重置
        e.preventDefault();
        //重新用户渲染
        initUserInfo()
    })
    //4.修改用户信息
    $('.layui-form').on('submit', function (e) {
        //阻止默认提交
        e.preventDefault();
        //发送ajax
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                //成功
                layer.msg('恭喜您，修改信息成功！')
                //调用父框架的全局方法
                window.parent.getUserInof()

            }
        })
    })













})