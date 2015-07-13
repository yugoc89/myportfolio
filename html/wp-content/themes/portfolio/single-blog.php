<?php
get_header()
?>
<div id="content" class="content content--single-blog">
	<section class="section single-blog__section">
		
	<?php query_posts($query_string.'&posts_per_page=8');?>
	<?php $counter = 1; ?>
	<?php if ( have_posts() ) : while ( have_posts() ) : the_post();?>
	<?php /* Start the Loop */ ?>
		
		<article class="col">
			<nav class="post-nav">
				<?php
				$prev_post = get_adjacent_post(false, '', true);
				if(!empty($prev_post)) {
					echo '<a href="' . $prev_post->post_name . '" title="' . $prev_post->post_title . '" class="link">&lt;</a>'; }
				?>
				<?php 
				$next_post = get_adjacent_post(false, '', false);
				if(!empty($next_post)) {
					echo '<a href="' . $next_post->post_name . '" title="' . $next_post->post_title . '" class="link">&gt;</a>'; }
				?>
				<a href="/blog/" class="link"></a>
			</nav>

			<h5><?php the_title(); ?></h5>
			
			<?php

			if ( has_post_thumbnail() ) {
				the_post_thumbnail();
			}
			else {
				echo '<img src="' . get_bloginfo( 'template_directory' ) . '/images/home/image1.jpg" />';
			}
			?>
			<div class="col-inner">
				<?php the_content(); ?>
			</div>
		</article>

	<?php
	endwhile;
	endif;
	?>
	</section>
</div>

<?php
get_footer()
?>