<?php 
if (!array_key_exists('imageURL', $attributes)) {
  $attributes['imageURL'] = get_theme_file_uri('/assets/img/default-hero.webp');
}
?>

<section class="hero-block" style="background-image: url('<?= $attributes['imageURL'] ?>')">

	<div class="block-content-wrap">
		<?php echo $content; ?>
	</div>

</section>