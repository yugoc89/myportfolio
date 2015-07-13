<?php
get_header()
?>

<div id="content" class="content content--work no_bg clear">
	<div class="overlay ol_white"></div>
	<section class="section section1 work__section content-inner">
		<ul class="work-items clear">
			<?php $counter = 1; ?>
			<?php
			$works = get_posts(
			array(
			'post_type' => 'works', 
			'posts_per_page' => 10,
			)
			);
			global $post;
			foreach ($works as $post) : setup_postdata($post); 
			$id = get_the_ID();
			?>
			<?php $thumb = wp_get_attachment_image_src( get_post_thumbnail_id($post->ID), 'full' );?>
			<li class="items__panel panel-<?php echo $counter; $counter++; ?>">
				<div class="bg bg--work">
					<a href="/<?php echo $post->post_name; ?>/">
						<img src="<?php echo $thumb['0'];?>">
					</a>
				</div>
			</li>
			<?php endforeach; wp_reset_postdata(); ?>
		</ul>
	</section>
</div>

<?php
get_footer()
?>