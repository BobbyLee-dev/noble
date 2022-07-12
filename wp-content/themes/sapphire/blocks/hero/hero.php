<?php 
	// $image = array_key_exists('image', $attributes) ? $attributes['image'] : '';
	// $heading = array_key_exists('heading', $attributes) ? $attributes['heading'] : '';
	// $content = array_key_exists('content', $attributes) ? $attributes['content'] : '';
	// $button_text1 = array_key_exists('buttonText1', $attributes) ? $attributes['buttonText1'] : ''; 
	// $link_object1 = array_key_exists('linkObject1', $attributes) ? $attributes['linkObject1'] : '';
	// $button_text2 = array_key_exists('buttonText2', $attributes) ? $attributes['buttonText2'] : ''; 
	// $link_object2 = array_key_exists('linkObject2', $attributes) ? $attributes['linkObject2'] : '';
	// $has_buttons = false;
	// if($button_text1 || $button_text2) {
	// 	$has_buttons = true;
	// }

if (!$attributes['imageURL']) {
  $attributes['imageURL'] = get_theme_file_uri('/images/default-hero.jpg');
}
	
?>

<section class="hero-block" style="background-image: url('<?= $attributes['imageURL'] ?>')">

	<div class="block-content-wrap">
		<?php echo $content; ?>
	</div>

</section>