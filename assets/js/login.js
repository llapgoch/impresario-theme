/** Used to style WP's login page */
;(function($){
    $(document).on('ready.impresariologin', function(){
        var impresarioTemplateSelector = '.impresario-login-template',
            $loginForm = $("#loginform"),
            $lostPasswordForm = $('#lostpasswordform'),
            $resetPassForm = $('#resetpassform'),
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

        function applyResetPasswordForm(){
            var $resetPasswordTemplate = getTemplateElementChildren('.resetpassword-form-template'),
                $pass1 = $('#pass1'),
                $pass1Text = $('#pass1-text'),
                $hideButton = $('.wp-hide-pw'),
                $strengthResult = $('#pass-strength-result'),
                $rpKey = $('[name="rp_key"]'),
                $weakPasswordCheckbox = $('.pw-checkbox'),
                $passwordAdvice = $('.indicator-hint'),
                showPasswordClass = 'show-password';

                $pass1.addClass('form-control');
                $pass1Text.addClass('form-control');
                $weakPasswordCheckbox.attr('id', 'weak-pw-accept');
                
                $('.pass-group', $resetPasswordTemplate)
                    .prepend($pass1)
                    .prepend($pass1Text)
                    .append($hideButton);

                $('.password-advice', $resetPasswordTemplate)
                    .prepend($passwordAdvice);
                $resetPassForm.empty().append($resetPasswordTemplate);

                $('.strength-result', $resetPasswordTemplate)
                    .append($strengthResult);

                $('.weak-pw-group', $resetPasswordTemplate)
                    .prepend($weakPasswordCheckbox);

   
                $resetPasswordTemplate.append($rpKey);
             
                $hideButton.on('click.impresario', function(){
                    var $passGroup = $('.pass-group');

                    if($passGroup.hasClass(showPasswordClass)){
                        $passGroup.removeClass(showPasswordClass)
                    }else{
                        $passGroup.addClass(showPasswordClass);
                    }
                });
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
        } else if($resetPassForm.size()){
            applyResetPasswordForm();
        }


    });
}(jQuery));