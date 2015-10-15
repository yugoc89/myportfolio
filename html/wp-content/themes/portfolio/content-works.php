
<div id="content" class="content content--works no_bg clear">
	<div class="overlay ol_white"></div>
	<section class="section section1 section--works content-inner" id="section--works">
		<?php
		$works = get_posts(
			array(
				'post_type' => 'works', 
				'posts_per_page' => 10,
			)
		);
		global $post;
		setup_postdata($post); 
		$id = get_the_ID();

		$genres = get_the_terms( $id, 'work_type' );
		$post_class = NULL;
		foreach ($genres as $genre) :	
			$genre_name = $genre->name;
			$genre_slug = $genre->slug;
		endforeach;
		?>

		<ul class="work-items clear">
			<?php $thumb = wp_get_attachment_image_src( get_post_thumbnail_id($post->ID), 'full' );?>

			<?php if ($genre_slug == 'web'): ?>
			<li class="items__panel panel-1 items__panel--web">
				<div class="cube-container">
					<div class="Zcube">
						<div class="Ycube">
							<div class="cube">
								<a class="panel-link panel-link--web" href="<?php echo $thumb['0'];?>">
									<img src="<?php echo $thumb['0'];?>" alt="wEB IMAGE">
								</a>
							</div>
						</div>
					</div>
				</div>
			</li>
			<?php else: ?>
			<li class="items__panel panel-1">
				<a class="panel-link" href="<?php echo $thumb['0'];?>" style="background-image: url('<?php echo $thumb['0'];?>')"></a>
			</li>
			<?php endif; ?>

			<?php if ($genre_slug == 'web'): ?>
			<li class="items__panel panel-2 items__panel--web-2">
			<?php else: ?>
			<li class="items__panel panel-2">
			<?php endif; ?>
				<nav class="post-nav">
					<?php
					$prev_post = get_adjacent_post(false, '', true);
					if(!empty($prev_post)) {
						echo '<a href="' . $prev_post->post_name . '" title="' . $prev_post->post_title . '" class="link link--before">&lt;</a>'; }
					?>
					<?php 
					$next_post = get_adjacent_post(false, '', false);
					if(!empty($next_post)) {
						echo '<a href="' . $next_post->post_name . '" title="' . $next_post->post_title . '" class="link link--after">&gt;</a>'; }
					?>
				</nav>
				<div class="panel__description">
					<?php if ($genre_slug == 'web'): ?>
						<div class="description__web">
							<h6 class="headline--web"><?php the_title(); ?><i class="fa fa-file-code-o right"></i></h6>
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
					<?php else: ?>
						<div class="description__photo">
							<h6><?php the_title(); ?><i class="fa fa-camera-retro right"></i></h6>
							<?php the_content(); ?>
						</div>
					<?php endif; ?>
				</div>
			</li>

			<?php if ($genre_slug == 'photography'): ?>
				<?php 
					$counter = 3;
					if( get_field('gallery') ): 
					while( has_sub_field('gallery')):
					$gallery = get_sub_field('gallery_image');
					$image = wp_get_attachment_image_src( $gallery['id'], $size);
				?>
					<li class="items__panel panel-<?php echo $counter; ?>">
						<a class="panel-link" href="<?php echo $image[0]; ?>" style="background-image: url('<?php echo $image[0]; ?>')"></a>
					</li>
				<?php $counter++; endwhile; endif; ?>
			<?php endif; ?>

		</ul>
		<?php wp_reset_postdata();?>
	</section>
</div>