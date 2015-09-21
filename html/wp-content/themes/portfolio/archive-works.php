<?php
get_header()
?>


<div id="content" class="content content--works-archive no_bg clear">
	<section class="section section1 section--works-archive content-inner" id="section--works-archive">
		<div class="overlay overlay--white"></div>
		<img class="bg-map" src="/wp-content/themes/portfolio/assets/images/common/bg_works.jpg" alt="" usemap="#map" />
		<map name="map">
		    <area class="map-area" shape="poly" coords="2326, 329, 1528, 433, 1543, 1302, 3121, 1310, 3113, 249" />
		    <area class="map-area" shape="poly" coords="586, 884, 462, 938, 293, 1032, 68, 1153, 62, 1579, 127, 1593, 126, 1645, 365, 1847, 1107, 1799, 1104, 1654, 1204, 1467, 1179, 1267, 1118, 1207, 1120, 1052, 939, 935" />
		</map>
		<!-- <map name="map">
		    <area class="map-area" href="#ppg" shape="circle" coords="1062, 980, 20" />
		    <area class="map-area" href="#ppg" shape="circle" coords="2257, 431, 20" />
		</map> -->

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
				$term_name = $term->name;
				$term_slug = $term->slug;

			$works = get_posts(
				array(
					'post_type' => 'works', 
					'posts_per_page' => 1,
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
		<a class="map-link" href="/<?php echo the_slug(); ?>/"><span></span></a>
		<?php $counter++; endforeach; endforeach; wp_reset_postdata();?>
	</section>
</div>

<?php
get_footer()
?>