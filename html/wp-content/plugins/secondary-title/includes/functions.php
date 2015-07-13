<?php
	/*
	 * This file contains the main functions that can be used to return,
	 * display or modify every information that is related to the plugin.
	 *
	 * @package Secondary Title
	 * @subpackage Global
	 */

	/**
	 * Stop script when the file is called directly.
	 *
	 * @since 0.1
	 */
	if(!function_exists("add_action")) {
		return false;
	}

	/**
	 * Sets the default settings when plugin is activated (and no settings exist).
	 *
	 * @since 0.1
	 */
	function secondary_title_install() {
		/** Use update_option() to create the default options  */
		foreach(secondary_title_get_default_settings() as $setting => $value) {
			if(!get_option($setting) == "") {
				continue;
			}
			update_option($setting, $value);
		}

		return true;
	}

	/**
	 * Returns all settings and their default values used by Secondary Title.
	 *
	 * @return array|mixed|void
	 *
	 * @since 0.1
	 */
	function secondary_title_get_default_settings() {
		/** Define the default settings and their values */
		$default_settings = array(
			"secondary_title_post_types"             => array(),
			"secondary_title_categories"             => array(),
			"secondary_title_post_ids"               => array(),
			"secondary_title_auto_show"              => "on",
			"secondary_title_title_format"           => "%secondary_title%: %title%",
			"secondary_title_title_input_position"   => "above",
			"secondary_title_only_show_in_main_post" => "on",
			"secondary_title_use_in_permalinks"      => "off"
		);
		$default_settings = apply_filters("secondary_title_get_default_settings", $default_settings);

		return $default_settings;
	}

	/**
	 * Returns a single default setting and its value.
	 *
	 * @since 0.1
	 *
	 * @param string $setting
	 *
	 * @return array
	 */
	function secondary_title_get_default_setting($setting) {
		/** Setting up default settings and values */
		$default_settings = secondary_title_get_default_settings();
		/** Check if parameter is set; else use default setting value */
		if(!empty($setting)) {
			if(isset($default_settings[$setting])) {
				$default_settings = $default_settings[$setting];
			}
			else {
				$default_settings = false;
			}
		}

		return $default_settings;
	}

	/**
	 * Returns all settings generated by Secondary Title and their current values.
	 *
	 * @since 0.1
	 *
	 * @return array
	 */
	function secondary_title_get_settings() {
		$settings = array();
		foreach(secondary_title_get_default_settings() as $setting => $default_value) {
			$option = get_option($setting);
			$value  = $default_value;
			if($option) {
				$value = $option;
			}
			$settings[$setting] = $value;
		}

		return $settings;
	}

	/**
	 * Returns a specific setting for the plugin. If the selected
	 * option is unset, the default value will be returned.
	 *
	 * @since 0.1
	 *
	 * @param $setting
	 *
	 * @return array|mixed|void
	 */
	function secondary_title_get_setting($setting) {
		$settings = secondary_title_get_settings();
		if(!isset($settings["secondary_title_" . $setting])) {
			return false;
		}

		return $settings["secondary_title_" . $setting];
	}

	/**
	 * Resets all settings generated by Secondary Title.
	 *
	 * @since 0.1
	 */
	function secondary_title_reset_settings() {
		$settings = secondary_title_get_settings();
		foreach($settings as $setting => $value) {
			delete_option($setting);
		}
	}

	/**
	 * Returns the IDs of the posts for which secondary title is activated.
	 *
	 * @since 0.1
	 *
	 * @return array|mixed|void Post IDs
	 */
	function get_secondary_title_post_ids() {
		return secondary_title_get_setting("post_ids");
	}

	/**
	 * Returns the post types for which secondary title is activated.
	 *
	 * @since 0.1
	 *
	 * @return array|mixed|void Post types
	 */
	function get_secondary_title_post_types() {
		return secondary_title_get_setting("post_types");
	}

	/**
	 * Returns the categories for which secondary title is activated.
	 *
	 * @since 0.1
	 *
	 * @return array|mixed|void Selected categories
	 */
	function get_secondary_title_post_categories() {
		return secondary_title_get_setting("categories");
	}

	/**
	 * Get the secondary title from post ID $post_id
	 *
	 * @since 0.1
	 *
	 * @param int    $post_id      ID of target post.
	 * @param string $prefix       To be added in front of the secondary title.
	 * @param string $suffix       To be added after the secondary title.
	 * @param bool   $use_settings Use filters set on Secondary Title settings page.
	 *
	 * @return mixed The secondary title
	 */
	function get_secondary_title($post_id = 0, $prefix = "", $suffix = "", $use_settings = false) {
		/** If $post_id not set, use current post ID */
		if(!$post_id) {
			$post_id = get_the_ID();
		}

		/** Get the secondary title and return false if it's empty actually empty */
		$secondary_title = get_post_meta($post_id, "_secondary_title", true);
		if(!$secondary_title) {
			return false;
		}

		/** Use filters set on Secondary Title settings page */
		if($use_settings && !secondary_title_validate($post_id)) {
			return false;
		}

		$secondary_title = $prefix . $secondary_title . $suffix;

		/** Apply filters to secondary title if used with Word Filter Plus plugin */
		if(class_exists("WordFilter")) {
			$word_filter     = new WordFilter;
			$secondary_title = $word_filter->filter_title($secondary_title);
		}
		$secondary_title = apply_filters("get_secondary_title", $secondary_title, $post_id, $prefix, $suffix);
		
		return $secondary_title;
	}

	/**
	 * Prints the secondary title and adds an optional suffix.
	 *
	 * @since 0.1
	 *
	 * @param int    $post_id      ID of target post.
	 * @param string $prefix       To be added in front of the secondary title.
	 * @param string $suffix       To be added after the secondary title.
	 * @param bool   $use_settings Use filters set on Secondary Title settings page.
	 */
	function the_secondary_title($post_id = 0, $prefix = "", $suffix = "", $use_settings = false) {
		$secondary_title = get_secondary_title($post_id, $prefix, $suffix, $use_settings);
		$secondary_title = apply_filters("the_secondary_title", $secondary_title, $post_id, $prefix, $suffix);
		echo $secondary_title;
	}

	/**
	 * @since 0.5
	 *
	 * @param int    $post_id      ID of target post.
	 * @param string $prefix       To be added in front of the secondary title.
	 * @param string $suffix       To be added after the secondary title.
	 * @param bool   $use_settings Use filters set on Secondary Title settings page.
	 * @param array  $options      Additional options.
	 *
	 * @return bool|string
	 */
	function get_secondary_title_link($post_id = 0, $prefix = "", $suffix = "", $use_settings = false, array $options = array()) {
		/** If $post_id not set, use current post ID */
		if(!$post_id) {
			$post_id = get_the_ID();
		}
		$secondary_title = get_secondary_title($post_id, $prefix, $suffix, $use_settings);

		/** Return false if post does not have a secondary title */
		if(!$secondary_title) {
			return false;
		}

		/** Define default options */
		$default_options = array(
			"id"          => "",
			"class"       => "secondary-title secondary-title-link",
			"target"      => "",
			"before"      => "",
			"after"       => "",
			"before_link" => "",
			"after_link"  => "",
		);
		$merged_options  = array();

		/** Use default option value if option is not set */
		foreach($default_options as $default_option => $default_value) {
			if(isset($options[$default_option])) {
				$value = $options[$default_option];
			}
			else {
				$value = $default_value;
			}
			$merged_options[$default_option] = $value;
		}
		$options = $merged_options;

		/** Define attributes */
		$attributes      = array(
			"id",
			"class",
			"target"
		);
		$link_attributes = "";
		/** Build attributes if set */
		foreach($attributes as $attribute) {
			if(!empty($options[$attribute])) {
				$link_attributes .= " " . $attribute . '="' . $options[$attribute] . '"';
			}
		}
		/** Build the final link */
		$link = $options["before_link"] . '<a href="' . get_permalink($post_id) . '"' . $link_attributes . '>' . $options["before"] . $secondary_title . $options["after"] . '</a>' . $options["after_link"];

		return $link;
	}

	/**
	 * Displays the secondary title link.
	 *
	 * @since 0.5
	 *
	 * @param int    $post_id
	 * @param string $prefix
	 * @param string $suffix
	 * @param bool   $use_settings
	 * @param array  $options
	 */
	function the_secondary_title_link($post_id = 0, $prefix = "", $suffix = "", $use_settings = false, $options = array()) {
		echo get_secondary_title_link($post_id, $prefix, $suffix, $use_settings, $options);
	}

	/**
	 * Returns whether the specified post has a
	 * secondary title or not.
	 *
	 * @since 0.5.1
	 *
	 * @param $post_id
	 *
	 * @return bool
	 */
	function has_secondary_title($post_id = 0) {
		$secondary_title = get_secondary_title($post_id);
		$has             = false;
		if(!empty($secondary_title)) {
			$has = true;
		}

		return $has;
	}

	/**
	 * Returns all available post types except pages, attachments,
	 * revision ans nav_menu_items.
	 *
	 * @since 0.1
	 *
	 * @return array
	 */
	function get_secondary_title_filtered_post_types() {
		/** Returns all registered post types */
		$post_types = get_post_types(
			array(
				"public" => true, // Only show post types that are publicly accessible in the front end
			)
		);

		return $post_types;
	}

	/**
	 * Returns all posts that have a valid
	 * secondary title.
	 *
	 * @param array $additional_query
	 *
	 * @internal param int $count
	 *
	 * @since    0.9.2
	 *
	 * @return array
	 */
	function get_posts_with_secondary_title($additional_query = array()) {
		$query_arguments = array(
			"post_type"    => "any",
			"meta_key"     => "_secondary_title",
			"meta_value"   => " ",
			"meta_compare" => "!=",
			"post_status"  => "publish"
		);
		$query_arguments = array_merge($query_arguments, $additional_query);
		$posts           = new WP_Query($query_arguments);
		/** Return false if no posts have been found */
		if(!$posts->found_posts) {
			return false;
		}

		return $posts->posts;
	}

	/**
	 * Returns a random post that has a valid
	 * secondary title.
	 *
	 * @since 0.9.2
	 *
	 * @return bool
	 */
	function get_random_post_with_secondary_title() {
		$post = get_posts_with_secondary_title(
			array(
				"showposts" => 1,
				"orderby"   => "rand"
			)
		);
		if(!$post) {
			return false;
		}

		return $post[0];
	}

	if(!function_exists("chk")) {
		/**
		 * @param        $setting
		 * @param        $value
		 * @param string $type
		 */
		function chk($setting, $value, $type = "checked") {
			if(secondary_title_get_setting($setting) == $value) {
				echo " " . $type . '="' . $type . '"';
			}
		}
	}

	/**
	 * @param array $new_settings
	 *
	 * @since 1.4
	 *
	 * @return bool
	 */
	function secondary_title_update_settings(array $new_settings = array()) {
		$saved  = false;
		$arrays = array(
			"post_types",
			"categories",
		);
		foreach(secondary_title_get_default_settings() as $full_setting_name => $default_value) {
			$setting_name = str_replace("secondary_title_", "", $full_setting_name);
			$value        = "";
			if(isset($new_settings[$setting_name])) {
				$value = $new_settings[$setting_name];
				if($setting_name == "post_ids") {
					$value = preg_replace("'[^0-9,]'", "", $value);
					$value = explode(",", $value);
				}
				if($setting_name == "post_ids" && empty($new_settings[$setting_name])) {
					$value = array();
				}
			}
			if(in_array($setting_name, $arrays) && !isset($new_settings[$setting_name])) {
				$value = array();
			}
			if(update_option($full_setting_name, $value)) {
				$saved = true;
			}
		}

		return $saved;
	}

	/**
	 * Checks whether the secondary title is allowed
	 * to be displayed according to the settings set
	 * on Secondary Title's settings page.
	 *
	 * @since 1.4
	 *
	 * @param $post_id
	 *
	 * @return bool
	 */
	function secondary_title_validate($post_id) {
		$allowed_post_types = get_secondary_title_post_types();
		$allowed_categories = get_secondary_title_post_categories();
		$allowed_post_ids   = get_secondary_title_post_ids();
		$post_categories    = wp_get_post_categories($post_id);

		/** Check if post type is among the allowed post types */
		if(count($allowed_post_types) && !in_array(get_post_type($post_id), $allowed_post_types)) {
			return false;
		}

		/** Check if post's categories are among the allowed categories */
		$in_categories = false;
		foreach($post_categories as $category_id) {
			if(in_array($category_id, $allowed_categories)) {
				$in_categories = true;
			}
		}
		if(count($allowed_categories) && !$in_categories) {
			return false;
		}

		/** Check if post ID is among the allowed post IDs */
		if(count($allowed_post_ids) && !in_array($post_id, $allowed_post_ids)) {
			return false;
		}

		return true;
	}