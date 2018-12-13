/** Used to style WP's login page */
;(function($){
    $(document).on('ready.impresariologin', function(){
        var impresarioTemplateSelector = '.impresario-login-template',
            $loginForm = $("#loginform"),
            $impresarioTemplateElement = $(impresarioTemplateSelector),
            $userLoginInput = $('#user_login'),
            $passwordInput = $('#user_pass'),
            $rememberMeInput = $('#rememberme'),
            $navElement = $('#nav'),
            $backToBlog = $('#backtoblog'),
            $loginError = $('#login_error'),
            $messages = $('.message');

        function getTemplateElementChildren(selector){
            return $(selector, $impresarioTemplateElement).children();
        }

        var $loginFormTemplate = getTemplateElementChildren('.login-form-template');
        
        $('.user-group', $loginFormTemplate).prepend($userLoginInput);
        $('.pass-group', $loginFormTemplate).prepend($passwordInput);
        $('.remember-group', $loginFormTemplate).prepend($rememberMeInput);

        $userLoginInput.addClass('form-control').attr('placeholder', 'Username or Email');
        $passwordInput.addClass('form-control').attr('placeholder', 'Password');
        $loginForm.empty().append($loginFormTemplate);
        $navElement.remove();
        $backToBlog.remove();

        $loginError.removeAttr('id').addClass('notification notification-red');
        $messages.removeClass('message').addClass('notification notification-info');

    });
}(jQuery));