//入口函数
$(function () {
    //1.点击去注册账号，则隐藏登陆区域，显示注册区域
    $('#link_reg').on('click', function () {
        $('.reg-box').show()
        $('.login-box').hide()
    })
    //2.点击去登陆，则隐藏注册区域，显示登陆区域
    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })
    //3.自定义校验规则

    var form = layui.form;
    form.verify({
        // 密码规则
        pass: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        // 密码确认规则
        repass: function (value) {
            var repas = $('#form_reg [name=password]').val()
            if (value !== repas) {
                return '两次密码不一致'
            }
        }
    })
    //4.注册功能
    var layer = layui.layer;
    $('#form_reg').on('submit', function (e) {
        //阻止表单默认提交事件
        e.preventDefault()
        // 发送ajax
        $.ajax({
            method: 'POST',
            url: '/api/reguser',
            data: {
                username: $('.reg-box [name =username ]').val(),
                password: $('.reg-box [name=password]').val()
            },
            success: function (res) {
                //返回的状态
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('注册成功请登陆')
                $('#link_login').click();
                $('#form_reg')[0].reset();
            }

        })
    })
    //5.登陆功能（给form标签绑定事件，button按钮触发提交事件）
    $('#form_login').submit(function (e) {
        //阻止表单默认提交事件
        e.preventDefault();
        //发送ajax
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                //校验返回状态
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('登陆成功'),
                    //保存token ,未来的接口要使用
                    localStorage.setItem('token', res.token)
                //跳转后台主业
                location.href = '/index.html'
            }
        })
    })

})