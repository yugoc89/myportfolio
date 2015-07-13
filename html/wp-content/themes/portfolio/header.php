<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-GB"> <!--<![endif]-->
	<head>
		<meta charset="UTF-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge"> 
		<meta name="viewport" content="width=device-width, initial-scale=1"> 
		<title><?php wp_title(' | ', true, 'right'); ?><?php bloginfo('name'); ?></title>
		<meta name="description" content="This is the portfolio made by Yugo Ito" />
		<meta name="keywords" content="portfolio, Yugo Ito, web design, front-end, mark up, design, minimal" />
		<meta name="author" content="Yugo Ito" />
		<link rel="shortcut icon" href="/favicon.ico">
		<link rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/style.css">
	
		<script async src="<?php echo get_template_directory_uri(); ?>/assets/js/vendor/modernizr.custom.js"></script>
	</head>
	<body <?php body_class(); ?>>
		<!--[if lt IE 7]>
		<p class="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
		<![endif]-->
		<div class="overlay overlay--white"></div>
		<div class="bg bg--main"></div>
		<div id="load"><span class="load--large load__element"></span><span class="load--small load__element"></span></div>
		<main id="main" class="ip-container main">
			<!-- initial header -->
			<header class="header">
				<svg class="dummy_bg bg--left" width="50%" height="100%" viewBox="0 0 300 160" preserveAspectRatio="xMidYMin meet" aria-labelledby="logo_title">
				</svg>
				<svg class="dummy_bg bg--right" width="50%" height="100%" viewBox="0 0 300 160" preserveAspectRatio="xMidYMin meet" aria-labelledby="logo_title">
				</svg>
				<div class="ip-loader">
					<svg class="ip-inner" width="60px" height="60px" viewBox="0 0 80 80">
						<path class="ip-loader-circlebg" d="M40,10C57.351,10,71,23.649,71,40.5S57.351,71,40.5,71 S10,57.351,10,40.5S23.649,10,40.5,10z"/>
						<path id="ip-loader-circle" class="ip-loader-circle" d="M40,10C57.351,10,71,23.649,71,40.5S57.351,71,40.5,71 S10,57.351,10,40.5S23.649,10,40.5,10z"/>
					</svg>
				</div>
			</header>
			<nav id="bt-menu" class="bt-menu">
				<a href="#" class="bt-menu-trigger link_exc"><span></span></a>
				<ul>
					<li><a href="/">HOME</a></li>
					<li><a href="/about/">ABOUT</a></li>
					<li><a href="/works/">WORKS</a></li>
					<li><a href="/blog/">BLOG</a></li>
					<li><a href="/contact/">CONTACT</a></li>
				</ul>
			</nav><!--bt-menu-->
			<article id="wrapper">