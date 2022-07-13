<?php

// Hide admin bar
add_action('after_setup_theme', 'remove_admin_bar');
function remove_admin_bar() {
	show_admin_bar(false);
}

function sapphire_files() {
	// remove jquery from loading on frontend
	if (!is_admin()) {
		wp_deregister_script('jquery');
		wp_register_script('jquery', false);
	}

  wp_enqueue_script('main-sapphire-js', get_theme_file_uri('/build/index.js'), array(), '1.0', true);
	// Included fonts locally - Generated web fonts here - https://google-webfonts-helper.herokuapp.com/fonts/poppins?subsets=latin
  // wp_enqueue_style('custom-google-fonts-playfair', '//https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;700;800&display=swap');
  wp_enqueue_style('sapphire_main_styles', get_theme_file_uri('/build/style-index.css'));

}

add_action('wp_enqueue_scripts', 'sapphire_files');

function sapphire_features() {
  add_theme_support('title-tag');
  add_theme_support('post-thumbnails');
  add_theme_support('editor-styles');
  add_editor_style(array('//https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;700;800&display=swap', 'build/style-index.css', 'build/index.css', 'build/admin.css'));
}

add_action('after_setup_theme', 'sapphire_features');

// Custom post types
function sapphire_post_types() {

	// News***
	register_post_type(
		'news',
		array(
			'menu_icon' => 'dashicons-media-document',
			'labels' => array(
				'name' => __('News', ''),
				'singular_name' => __('News', ''),
				'add_new' => __('Add New', ''),
				'add_new_item' => __('Add New News', ''),
				'edit' => __('Edit', ''),
				'edit_item' => __('Edit News', ''),
				'new_item' => __('New News', ''),
				'view' => __('View News', ''),
				'view_item' => __('View News', ''),
				'search_items' => __('Search News', ''),
				'not_found' => __('No News found', ''),
				'not_found_in_trash' => __('No News found in Trash', '')
			),
			'public' => true,
			'supports' => array(
				'title',
				'editor',
				// 'excerpt',
				'thumbnail'
			),
			'can_export' => true,
			'taxonomies' => array(
				// 'post_tag',
				'category'
			),
			'rewrite' => array(
				'with_front' => false,
				'slug' => 'news'
			),
			'publicly_queryable' => true,
			'show_in_rest' => true,
		)
	); // end news
}

add_action('init', 'sapphire_post_types');


class Sapphire_block {
	public function __construct($name) {
		$this->name = $name;
		add_action('init', [$this, 'on_init_register_block']);
	}

	public function on_init_register_block() {
		wp_register_script($this->name, get_stylesheet_directory_uri() . "/build/{$this->name}.js", array('wp-blocks', 'wp-editor'), true);
		register_block_type("sapphiretheme/{$this->name}", array(
		'editor_script' => $this->name,
	));
	}
}

new Sapphire_block('sapphire-button');
new Sapphire_block('sapphire-heading');


class Sapphire_block_php_render {
	public function __construct($name) {
		$this->name = $name;
		add_action('init', [$this, 'on_init_register_block']);
	}

	public function sapphireRenderCallback($attributes, $content) {
    ob_start();
    require get_theme_file_path("/blocks/{$this->name}/{$this->name}.php");
    return ob_get_clean();
  }

	public function on_init_register_block() {
		wp_register_script($this->name, get_stylesheet_directory_uri() . "/build/{$this->name}.js", array('wp-blocks', 'wp-editor'), true);
			register_block_type("sapphiretheme/{$this->name}", array(
			'editor_script' => $this->name,
			'render_callback' => [$this, 'sapphireRenderCallback']
		));
	}
}

new Sapphire_block_php_render('hero');
new Sapphire_block_php_render('sapphire-content');
new Sapphire_block_php_render('sapphire-video-popup');



// Featured Posts Block with rest endpoint
class Sapphire_block_featured_posts {

	public function __construct($name) {
		$this->name = $name;
		// The function that will generate the markup.
		require_once plugin_dir_path(__FILE__) . 'inc/generate_featured_posts.php';
		add_action('init', [$this, 'on_init_register_block']);
		add_action('rest_api_init', [$this, 'posts_html_route']);
	}

	public function posts_html_route() {
		register_rest_route('featured-posts/v1', 'get-html', array(
      'methods' => WP_REST_SERVER::READABLE,
      'callback' => [$this, 'get_posts_html'],
			'permission_callback' => '__return_true',
    ));
	}

	// Render admin markup - called from register rest route callback.
	// $post_type = url parameters ex: ?post-type=news;
	public function get_posts_html($post_type) {
		// render string of text - made into JSON by WP :)
		return generate_featured_posts($post_type['post-type']);
	}
	  
	// Render front markup
	public function sapphire_render_callback($attributes) {
    if ($attributes['postType']) {
      return generate_featured_posts($attributes['postType'], $attributes['heading']);
    } else {
      return NULL;
    }
  }

	public function on_init_register_block() {
		wp_register_script($this->name, get_stylesheet_directory_uri() . "/build/{$this->name}.js", array('wp-blocks', 'wp-editor'), true);
			register_block_type("sapphiretheme/{$this->name}", array(
			'editor_script' => $this->name,
			'render_callback' => [$this, 'sapphire_render_callback']
		));
	}
}

new Sapphire_block_featured_posts('sapphire-featured-posts');
