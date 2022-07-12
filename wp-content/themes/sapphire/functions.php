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
	// Recipe Post Type
  register_post_type('recipe', array(
    'menu_icon' => 'dashicons-food',
    'labels' => array(
      'name' => 'Recipes',
      'add_new_item' => 'Add New Recipe',
      'edit_item' => 'Edit Recipe',
      'all_items' => 'All Recipes',
      'singular_name' => 'Recipe'
    ),
		'taxonomies' => array(
			// 'post_tag',
			'category'
		),
		'show_in_rest' => true,
    'supports' => array('title', 'editor', 'thumbnail'),
    'public' => true,
  ));
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
