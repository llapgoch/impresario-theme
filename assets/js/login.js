/** Used to style WP's login page */
;(function($){
    $(document).on('ready.impresariologin', function(){
        var impresarioTemplateSelector = '.impresario-login-template',
            $loginForm = $("#loginform"),
            $impresarioTemplateElement = $(impresarioTemplateSelector),
            $userLoginInput = $('#user_login').addClass('form-control'),
            $passwordInput = $('#user_pass').addClass('form-control'),
            $rememberMeInput = $('#rememberme');

        function getTemplateElementChildren(selector){
            return $(selector, $impresarioTemplateElement).children();
        }

        var $loginFormTemplate = getTemplateElementChildren('.login-form-template');
        
        $('.user-group', $loginFormTemplate).prepend($userLoginInput);
        $('.pass-group', $loginFormTemplate).prepend($passwordInput);
        $('.remember-group', $loginFormTemplate).prepend($rememberMeInput);

        $loginForm.append($loginFormTemplate);
        


    });
}(jQuery));