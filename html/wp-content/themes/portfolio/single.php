<?php get_header(); ?>
 
<?php
if ( have_posts() ) : while ( have_posts() ) : the_post();
?>
<div class="left single-left">
	<h3><?php the_title(); ?></h3>
	<section class="single-content section">
		<div class="inner">
			<?php the_content(); ?>
		</div>
	</section>
	<section class="comment section"><?php comments_template(); ?></section>
</div>
<div class="right single-right">
	<div class="overlay--white overlay"></div>
	<?php

	if ( has_post_thumbnail() ) {
		the_post_thumbnail();
	}
	else {
		echo '<img src="' . get_bloginfo( 'template_directory' ) . '/images/home/image1.jpg" />';
	}
	?>
</div>
<a href="/" class="bl-icon bl-icon-close close-trigger"></a>
 
<?php
endwhile;
endif;
?>
<?php get_footer(); ?>