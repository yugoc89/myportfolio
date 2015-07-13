<?php
get_header()
?>
<div id="content" class="content content--single-work panel-items cols2">
	<?php query_posts($query_string.'&posts_per_page=8');?>
	<?php $counter = 1; ?>
	<?php if ( have_posts() ) : while ( have_posts() ) : the_post();?>
	<?php
	remove_filter( 'the_content', 'wpautop' );
	remove_filter( 'the_excerpt', 'wpautop' );
	?>
	<div id="panel" class="panel clear" data-panel="panel-<?php echo $counter++; ?>">
		<section id="items-right" class="section right items-right">
			<div class="Zcube">
				<div class="Ycube">
					<div class="cube">
						<?php the_post_thumbnail( 'single-post-thumbnail' ); ?>
					</div>
				</div>
			</div>
		</section>
		<nav class="post-nav">
			<?php
			$prev_post = get_adjacent_post(false, '', true);
			if(!empty($prev_post)) {
				echo '<a href="' . $prev_post->post_name . '" title="' . $prev_post->post_title . '" class="link">&#8672;</a>'; }
			?>
			<?php 
			$next_post = get_adjacent_post(false, '', false);
			if(!empty($next_post)) {
				echo '<a href="' . $next_post->post_name . '" title="' . $next_post->post_title . '" class="link">&#8674;</a>'; }
			?>
		</nav>
		<section class="section left items-left">
			<div class="section-inner">
				<h3><?php the_title(); ?></h3>
				<div class="text-area clear">
					<span class="work-title">Languages</span>
					<span class="work-description"><?php the_field('languages'); ?></span>
				</div>
				<div class="text-area clear">
					<span class="work-title">Features</span>
					<span class="work-description"><?php the_field('features'); ?></span>
				</div>
				<div class="text-area clear">
					<span class="work-title">URL</span>
					<a href="<?php the_field('url'); ?>" target="_blank" class="work-description link_exc"><?php the_field('url'); ?></a>
				</div>
				<div class="text-area clear">
					<span class="work-title">Description</span>
					<span class="work-description work-description--description"><?php the_field('description'); ?></span>
				</div>
			</div>
		</section>
	</div>
	<?php
	endwhile;
	endif;
	?>
</div>

<?php
get_footer()
?>