/** Used to style WP's login page */
;(function($){
    $(document).on('ready.impresariologin', function(){
        var impresarioTemplateSelector = '.impresario-login-template',
            $loginForm = $("#loginform"),
            $lostPasswordForm = $('#lostpasswordform'),
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

        function applyLoginForm(){
            var $loginFormTemplate = getTemplateElementChildren('.login-form-template');
        
            $('.user-group', $loginFormTemplate).prepend($userLoginInput);
            $('.pass-group', $loginFormTemplate).prepend($passwordInput);
            $('.remember-group', $loginFormTemplate).prepend($rememberMeInput);
    
            $passwordInput.addClass('form-control').attr('placeholder', 'Password');
            $loginForm.empty().append($loginFormTemplate);
        }

        function applyLostPasswordForm(){
            var $lostPasswordTemplate = getTemplateElementChildren('.lostpassword-form-template');
            $('.user-group', $lostPasswordTemplate).prepend($userLoginInput);
            $lostPasswordForm.empty().append($lostPasswordTemplate);
        }

        function applyShared(){
            $messages.removeClass('message').addClass('notification notification-info');
            $userLoginInput.addClass('form-control').attr('placeholder', 'Username or Email');
            $loginError.removeAttr('id').addClass('notification notification-red');
            $navElement.remove();
            $backToBlog.remove();
        }

        applyShared();

        if($loginForm.size()){
            applyLoginForm();
        } else if($lostPasswordForm.size()){
            applyLostPasswordForm();
        }


    });
}(jQuery));