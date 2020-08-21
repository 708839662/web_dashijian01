$(function () {
    // 1.定义校验规则
    var form = layui.form;
    form.verify({
        //    1.1密码
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],

        // 1.2新旧密码不能等重复
        samePwd: function (value) {
            //value是新密码，新密码需要获取
            if (value == $("[name=oldPwd]").val()) {
                return "两次输入密码不能一致！"
            }
        },
        //1.3两次新密码不一致
        rePwd: function (value) {
            if (value !== $("[name=newPwd]").val()) {
                return "两次密码不一致请重新输入"
            }
        }
    });
    // 2.表单提交
    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            method: "POST",
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message);

                }
                layui.layer.msg('修改密码成功！');
                layui.layer.msg('修改密码成功！');
                $(".layui-form")[0].reset();
            }
        })
    })

})