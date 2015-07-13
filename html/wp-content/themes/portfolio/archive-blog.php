<?php
get_header()
?>

<div id="content" class="content--blog content clear">
	<section id="fullpage" class="section content-inner">
		<article class="blog__post clear">
			<div class="text">
				<div class="text-inner blog-post__text">
					<div class="post-date">
						<?php the_time('jS F, Y') ?>
					</div>
					<h4 class="title"><?php the_title(); ?></h4>
					<a href="/<?php echo $post->post_name; ?>/" class="link">&#8674;</a>
				</div>
			</div>
			<div class="image">
				<?php the_post_thumbnail(); ?>
			</div>
		</article>

		<div class="blog__thumbnails">
			<ul class="thumbnails__list clear">
			<?php $counter = 1; ?>
			<?php
			$blog = get_posts(
			array(
			'post_type' => 'blog', 
			'posts_per_page' => 10,
			)
			);
			global $post;
			foreach ($blog as $post) : setup_postdata($post); 
			$id = get_the_ID();
			?>

				<li class="thumbnail-inner">
					<div class="text">
						<div class="text-inner blog-post__text">
							<div class="post-date">
								<?php the_time('jS F, Y') ?>
							</div>
							<h4 class="title"><?php the_title(); ?></h4>
							<a href="/<?php echo $post->post_name; ?>/" class="link">&#8674;</a>
						</div>
					</div>
					<div class="image">
						<?php the_post_thumbnail(); ?>
					</div>
				</li>

			<?php endforeach; wp_reset_postdata(); ?>
			</ul>
		</div>
	</section>
<!-- main content -->
</div>

<?php
get_footer()
?>