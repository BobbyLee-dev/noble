<?php 
// make sure there is a button and video
if (array_key_exists('buttonText', $attributes) && array_key_exists('video', $attributes)):
?>

<section class="sapphire-video-popup">

	<a href="#0" class="button secondary yt-button"><?= $attributes['buttonText'] ?></a>
	<div class="yt-overlay">
		<button class="close-popup"><i></i></button>
		<div class="yt-wrapper">
			<div class="ytvideo" data-video="<?= $attributes['video'] ?>"></div>
		</div>
	</div>

</section>

<?php endif; ?>


