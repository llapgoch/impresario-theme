<!doctype html>
<html <?php language_attributes(); ?> class="no-js">
	<head>
		<meta charset="<?php bloginfo('charset'); ?>">
		<title><?php wp_title(''); ?><?php if(wp_title('', false)) { echo ' :'; } ?> <?php bloginfo('name'); ?></title>

        <link href="<?php echo get_template_directory_uri(); ?>/img/icons/favicon.ico" rel="shortcut icon">
        <link href="<?php echo get_template_directory_uri(); ?>/img/icons/touch.png" rel="apple-touch-icon-precomposed">
        <link href="http://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">

		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta name="description" content="<?php bloginfo('description'); ?>">

		<?php wp_head(); ?>
	</head>
	<body <?php body_class(); ?>>

		<!-- wrapper -->
		<div class="mm-page main-wrapper">

                <!-- header -->
			<header class="header clear" role="banner">
                <div class="navbar navbar-default navbar-fixed-top navbar-transparent-black mm-fixed-top" role="navigation" id="navbar">
                    <!-- Branding -->
                    <div class="navbar-header col-md-2">
                        <a class="navbar-brand" href="/">
                            <strong>IMPRESARIO</strong>
                        </a>
                    </div>

                    <ul class="nav navbar-nav quick-actions">
                        <li>
                            <a class=" button" data-toggle="dropdown" href="#">
                                <i class="fa fa-tasks"></i>
                                <span class="label label-transparent-black">X Tasks for User</span>
                            </a>

                            <ul class="dropdown-menu wide arrow nopadding bordered">
                                <li><h1>You have <strong>2</strong> new tasks</h1></li>
                                <li>
                                    <a href="#">
                                        <div class="task-info">
                                            <div class="desc">Layout</div>
                                            <div class="percent">80%</div>
                                        </div>
                                        <div class="progress progress-striped progress-thin">
                                            <div class="progress-bar progress-bar-green" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width: 80%">
                                                <span class="sr-only">40% Complete (success)</span>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <div class="task-info">
                                            <div class="desc">Schemes</div>
                                            <div class="percent">15%</div>
                                        </div>
                                        <div class="progress progress-striped active progress-thin">
                                            <div class="progress-bar progress-bar-cyan" role="progressbar" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100" style="width: 15%">
                                                <span class="sr-only">45% Complete</span>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <div class="task-info">
                                            <div class="desc">Forms</div>
                                            <div class="percent">5%</div>
                                        </div>
                                        <div class="progress progress-striped progress-thin">
                                            <div class="progress-bar progress-bar-orange" role="progressbar" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100" style="width: 5%">
                                                <span class="sr-only">5% Complete (warning)</span>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <div class="task-info">
                                            <div class="desc">JavaScript</div>
                                            <div class="percent">30%</div>
                                        </div>
                                        <div class="progress progress-striped progress-thin">
                                            <div class="progress-bar progress-bar-red" role="progressbar" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100" style="width: 30%">
                                                <span class="sr-only">30% Complete (danger)</span>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <div class="task-info">
                                            <div class="desc">Dropdowns</div>
                                            <div class="percent">60%</div>
                                        </div>
                                        <div class="progress progress-striped progress-thin">
                                            <div class="progress-bar progress-bar-amethyst" role="progressbar" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100" style="width: 60%">
                                                <span class="sr-only">60% Complete</span>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                                <li><a href="#">Check all tasks <i class="fa fa-angle-right"></i></a></li>
                            </ul>

                        </li>
                    </ul>


                </div>


			</header>
			<!-- /header -->
