<?php

function generate_featured_posts($post_type, $heading = '') {
	$heading = $heading ? '<h2>'.$heading.'</h2>' : '';
	$posts_html = '';
	$post_query = '';
 
	// Get latests posts
	if( in_array($post_type, array('post', 'news')) ) {
		$post_query = new WP_Query( array(
			'post_status' => 'publish',
			'post_type' => $post_type,
			'posts_per_page' => 3,
			'orderby' => 'date',
			'order'=>'DESC',
		));
	} 

	// Build the posts
	if ($post_query && $post_query->have_posts() ) { 
		while ( $post_query->have_posts() ) : $post_query->the_post();

			$post_url = get_permalink();

			// Feature image with fallback.
			$featured_image = get_the_post_thumbnail_url() ?: get_bloginfo('template_url').'/assets/img/placeholder-'.$post_type.'.webp';

			// Categories
			$categories_html = '';
			$categories = get_the_category();
			if($categories) {
				$categories_html .= '<div class="post-categories">';
					foreach($categories as $item) { 
						$categories_html .= '<span>'.$item->name .'</span><span class="cat-sep">|</span>';
					}
				$categories_html .= '</div>';
			}
			// End categories

			$posts_html .= '
				<a href="'.$post_url.'" class="single-post">
					<div class="post-image" style="background-image: url('.$featured_image.');"></div>
					<div class="post-content">
						<div class="post-title">'. get_the_title() .'</div>
						'.$categories_html.'
					</div>
				</a>
			';

		endwhile;
		wp_reset_postdata();
	
	} // End build the posts

	// Create section
	if($posts_html) {
		return '<section class="sapphire-featured-posts">
				 			'.$heading.'
							<div class="posts-wrap">'. $posts_html .'</div>
						</section>';
	} elseif($post_type) { 
		return '<section class="sapphire-featured-posts">
							<div class="h3">Sorry no posts found, you need to add some posts</div>
						</section>';
	} else {
		return '<section class="sapphire-featured-posts">
							<div class="h3">Select a post type</div>
						</section>';
	}
	
}