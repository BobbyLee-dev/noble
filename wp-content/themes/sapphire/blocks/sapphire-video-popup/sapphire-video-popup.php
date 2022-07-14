<?php 
// make sure there is a button and video
if (array_key_exists('buttonText', $attributes) && array_key_exists('video', $attributes)):
?>

<section class="sapphire-video-popup">

	<button class="button secondary yt-button"><?= $attributes['buttonText'] ?></button>
	<div class="yt-overlay">
		<button class="close-popup" aria-label="close popup"><i></i></button>
		<div class="yt-wrapper">
			<div class="ytvideo" data-video="<?= $attributes['video'] ?>"></div>
		</div>
	</div>

</section>

<?php endif; ?>


