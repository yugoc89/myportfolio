<?php
//WordPress loop for custom post type
$my_query = new WP_Query('post_type=Blog');
while ($my_query->have_posts()) : $my_query->the_post(); ?>
<div class="post-date">
	<?php the_time('jS F, Y') ?>
</div>
<h4><a href="<?php echo get_permalink(); ?>"><?php the_title(); ?></a></h4>
<?php the_post_thumbnail(); ?>
<?php the_content(); ?>
<?php endwhile;  wp_reset_query(); ?>
