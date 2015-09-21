<?php

function curPageURL() {
	$pageURL = 'http';
	if ($_SERVER["HTTPS"] == "on") {
		$pageURL .= "s";
	}
	$pageURL .= "://";
	if ($_SERVER["SERVER_PORT"] != "80") {
		$pageURL .= $_SERVER["SERVER_NAME"].":".$_SERVER["SERVER_PORT"].$_SERVER["REQUEST_URI"];
	}
	else {
		$pageURL .= $_SERVER["SERVER_NAME"].$_SERVER["REQUEST_URI"];
	}
	return $pageURL;
}

function get_relative_permalink( $url ) {
	return str_replace( home_url(), "", $url );
}

function the_slug($echo=true){
	$slug = basename(get_permalink());
	do_action('before_slug', $slug);
	$slug = apply_filters('slug_filter', $slug);
	if( $echo ) echo $slug;
	do_action('after_slug', $slug);
	//return $slug;
}
/*
* Add thumbnails in a post
*/
add_theme_support( 'post-thumbnails' );

/*
* remove p and br from a visual editor
*/
//remove_filter ( 'the_content', 'wpautop' );
//remove_filter ( 'the_excerpt', 'wpautop' );

/*
* Creating a function to create our CPT
*/

/**
 * add custom post[works]
 *
 *
 */
function custom_post_type2() {
  $main_label = 'Works';
  $labels = array (
    'name' => _x($main_label, 'Works'),
    'singular_name' => _x($main_label, 'Works')
  );
  $supports = array (
    'title',
    'editor',
    'thumbnail',
    'page-attributes',
    'post-formats'
  );
  $args = array (
    'labels' => $labels,
    'public' => true,
    'show_ui' => true,
    'query_var' => true,
    'rewrite' =>  array('slug' => 'works', 'with_front' => false),
    'hierarchical' => true,
    'menu_position' => 5,
    'supports' => $supports,
    'has_archive' => true,
    'paged' => true,
    'publicly_queryable'  => true,
    'capability_type'     => 'page',
    'taxonomies' => array('works')
  );
  register_post_type('works', $args);
}
add_action('init', 'custom_post_type2');


function new_excerpt_more( $more ) {
	return ' <a class="read-more" href="'. get_permalink( get_the_ID() ) . '">' . __('...', 'your-text-domain') . '</a>';
}
add_filter( 'excerpt_more', 'new_excerpt_more' );

function new_excerpt_length($length) {
	return 40;
}
add_filter('excerpt_length', 'new_excerpt_length');

/**
 * Add custom taxonomies
 *
 */
function add_custom_taxonomies() {
  // Add new "Locations" taxonomy to Posts
  register_taxonomy('work_type', 'works', array(
    // Hierarchical taxonomy (like categories)
    'hierarchical' => true,
    // This array of options controls the labels displayed in the WordPress Admin UI
    'labels' => array(
      'name' => _x( 'Work Category', 'taxonomy general name' ),
      'singular_name' => _x( 'Work Category', 'taxonomy singular name' ),
      'search_items' =>  __( 'search for Work Category' ),
      'all_items' => __( 'all Work Category' ),
      'parent_item' => __( 'Parent Work Category' ),
      'parent_item_colon' => __( 'Parent Work Category:' ),
      'edit_item' => __( 'edit Work Category' ),
      'update_item' => __( 'update Work Category' ),
      'add_new_item' => __( 'add new Work Category' ),
      'new_item_name' => __( 'new Work Category name' ),
      'menu_name' => __( 'Work Category' ),
    ),
    // Control the slugs used for this taxonomy
    'rewrite' => array(
      'slug' => 'work_type', // This controls the base slug that will display before each term
      'with_front' => false, // Don't display the category base before "/locations/"
      'hierarchical' => true // This will allow URL's like "/locations/boston/cambridge/"
    ),
  ));
}
add_action( 'init', 'add_custom_taxonomies', 0 );


// add_filter(
//     'post_type_link',
//     'custom_post_type_link',
//     10,
//     3
// );
 
// function custom_post_type_link($permalink, $post, $leavename) {
//     if (!gettype($post) == 'post') {
//         return $permalink;
//     }
//     switch ($post->post_type) {
//         case 'works':
//             $permalink = get_home_url() . '/' . $post->post_name . '/';
//             break;
//     }
 
//     return $permalink;
// }

// $result = $wpdb->get_row(
//     $wpdb->prepare(
//         'SELECT wpp1.post_type, wpp2.post_name AS parent_post_name FROM ' . $wpdb->posts . ' as wpp1 LEFT JOIN ' . $wpdb->posts . ' as wpp2 ON wpp1.post_parent = wpp2.ID WHERE wpp1.post_name = %s LIMIT 1',
//         $post_name
//     )
// );
 
// switch($post_type) {
//     case 'works':
//         if ($result->parent_post_name !== '') {
//             $post_name = $result->parent_post_name . '/' . $post_name;
//         }
//         $query->set('works', $post_name);
//         $query->set('post_type', $post_type);
//         $query->is_single = true;
//         $query->is_page = false;
//         break;
// }