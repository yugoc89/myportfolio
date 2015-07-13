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

function custom_post_type() {

// Set UI labels for Custom Post Type
	$labels = array(
		'name'                => _x( 'Blog', 'Post Type General Name', 'portfolio' ),
		'singular_name'       => _x( 'Blog', 'Post Type Singular Name', 'portfolio' ),
		'menu_name'           => __( 'Blog', 'portfolio' ),
		'parent_item_colon'   => __( 'Parent Blog', 'portfolio' ),
		'all_items'           => __( 'All Blog', 'portfolio' ),
		'view_item'           => __( 'View Blog', 'portfolio' ),
		'add_new_item'        => __( 'Add New Blog', 'portfolio' ),
		'add_new'             => __( 'Add New', 'portfolio' ),
		'edit_item'           => __( 'Edit Blog', 'portfolio' ),
		'update_item'         => __( 'Update Blog', 'portfolio' ),
		'search_items'        => __( 'Search Blog', 'portfolio' ),
		'not_found'           => __( 'Not Found', 'portfolio' ),
		'not_found_in_trash'  => __( 'Not found in Trash', 'portfolio' ),
	);
	
// Set other options for Custom Post Type
	
	$args = array(
		'label'               => __( 'blog', 'portfolio' ),
		'description'         => __( 'blog and hobbies', 'portfolio' ),
		'labels'              => $labels,
		// Features this CPT supports in Post Editor
		'supports'            => array( 'title', 'editor', 'excerpt', 'author', 'thumbnail', 'comments', 'revisions', 'custom-fields', ),
		// You can associate this CPT with a taxonomy or custom taxonomy. 
		'taxonomies'          => array( 'genres' ),
		/* A hierarchical CPT is like Pages and can have
		* Parent and child items. A non-hierarchical CPT
		* is like Posts.
		*/	
		'hierarchical'        => false,
		'public'              => true,
		'show_ui'             => true,
		'show_in_menu'        => true,
		'show_in_nav_menus'   => true,
		'show_in_admin_bar'   => true,
		'menu_position'       => 5,
		'can_export'          => true,
		'has_archive'         => true,
		'exclude_from_search' => false,
		'publicly_queryable'  => true,
		'capability_type'     => 'page',
	);
	
	// Registering your Custom Post Type
	register_post_type( 'blog', $args );

}
add_action( 'init', 'custom_post_type', 0 );
/* Hook into the 'init' action so that the function
* Containing our post type registration is not 
* unnecessarily executed. 
*/



/**
 * add custom post[blog]
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
  register_taxonomy('blog_category', 'blog', array(
    // Hierarchical taxonomy (like categories)
    'hierarchical' => true,
    // This array of options controls the labels displayed in the WordPress Admin UI
    'labels' => array(
      'name' => _x( 'Blog Category', 'taxonomy general name' ),
      'singular_name' => _x( 'Blog Category', 'taxonomy singular name' ),
      'search_items' =>  __( 'search for Blog Category' ),
      'all_items' => __( 'all Blog Category' ),
      'parent_item' => __( 'Parent Blog Category' ),
      'parent_item_colon' => __( 'Parent Blog Category:' ),
      'edit_item' => __( 'edit Blog Category' ),
      'update_item' => __( 'update Blog Category' ),
      'add_new_item' => __( 'add new Blog Category' ),
      'new_item_name' => __( 'new Blog Category name' ),
      'menu_name' => __( 'Blog Category' ),
    ),
    // Control the slugs used for this taxonomy
    'rewrite' => array(
      'slug' => 'topic', // This controls the base slug that will display before each term
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