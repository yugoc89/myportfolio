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
		<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">
	
		<script src="<?php echo get_template_directory_uri(); ?>/assets/js/vendor/modernizr.custom.js"></script>
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
			<nav class="navigation menu__global" id="menu__global" role="navigation">
				<ul class="clear" id="nav-menu">
					<li>
						<a class="home-icon" title="home" href="/">
							<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
							 width="26px" height="26px" viewBox="0 0 512 512" enable-background="new 0 0 512 512" xml:space="preserve">
							<path id="grid-small-view-icon" fill="#fff" d="M304.564,305.068h-98.136v-98.136h98.136V305.068z M206.429,50v98.075h98.136V50H206.429z
								 M50,305.068h97.571v-98.136H50V305.068z M363.422,148.075H462V50h-98.578V148.075z M304.564,462v-98.074h-98.136V462H304.564z
								 M147.571,363.926H50V462h97.571V363.926z M462,206.933h-98.578v98.136H462V206.933z M363.422,363.926V462H462v-98.074H363.422z
								 M147.571,148.075V50H50v98.075H147.571z"/>
							</svg>
						</a>
					</li>
					<li><a title="about" href="/about/">ABOUT</a></li>
					<li><a class="bt-menu-trigger-2 link_exc" title="works" href="#">WORKS</a></li>
					<li><a title="contact" href="/contact/">CONTACT</a></li>
				</ul>
			</nav>
			<nav id="bt-menu" class="bt-menu">
<!-- 				<a href="#" class="bt-menu-trigger link_exc">
					<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
					 width="26px" height="26px" viewBox="0 0 512 512" enable-background="new 0 0 512 512" xml:space="preserve">
					<path id="grid-small-view-icon" fill="#fff" d="M304.564,305.068h-98.136v-98.136h98.136V305.068z M206.429,50v98.075h98.136V50H206.429z
						 M50,305.068h97.571v-98.136H50V305.068z M363.422,148.075H462V50h-98.578V148.075z M304.564,462v-98.074h-98.136V462H304.564z
						 M147.571,363.926H50V462h97.571V363.926z M462,206.933h-98.578v98.136H462V206.933z M363.422,363.926V462H462v-98.074H363.422z
						 M147.571,148.075V50H50v98.075H147.571z"/>
					</svg>
				</a> -->
				<div class="menu__works bt-menu-inner">
					<?php
						$counter = 1;
						$args = array( 
							'orderby' => 'slug', 
							'order' => 'DESC', 
							'hide_empty' => 'false', 
							//'parent' => 0, 
							'get' => 'all'
						);
						$terms  = get_terms( 'work_type' , $args );
						foreach( $terms as $term ):
					?>
					<div class="works__list clear">
						<!-- <h4><?php echo $term->name; ?></h4> -->
						<ul class="clear">
						<?php
							$works = get_posts(
								array(
									'post_type' => 'works', 
									'posts_per_page' => -1,
									'tax_query' => array(
										array(
										'taxonomy' => 'work_type',
										'field' => 'slug',
										'terms' => explode(' ', $term->slug)
										)
									),
								)
							);

							global $post;
							foreach ($works as $post):
							setup_postdata($post); 
							$id = get_the_ID();
							$slug = $post->slug;
							$thumbnail_id = get_post_thumbnail_id($post->ID); 
							// 指定サイズの画像内容を取得（引数にmediumをセット）
							$thumbnail = wp_get_attachment_image_src( $thumbnail_id , array(120,60) );
							$post->thumbnail = (!empty($thumbnail)) ? $thumbnail[0] : "";
						?>

							<li>
								<a href="/<?php echo the_slug(); ?>/"><img src="<?php echo $post->thumbnail;?>"></a>
							</li>

						<?php endforeach; ?>
						</ul>
					</div>
				<?php endforeach; ?>
				</div>
				
				<?php wp_reset_postdata(); ?>
			</nav><!--bt-menu-->
			<article id="wrapper">