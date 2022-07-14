class SapphireVideoPopup {
	constructor() {
		this.sapphirePopupSections = document.querySelectorAll(
			'.sapphire-video-popup'
		);
		this.body = document.querySelector('body');
		this.events();

		window.addEventListener('click', function (e) {
			console.log(e.target);
		});
	}

	events() {
		if (this.sapphirePopupSections.length) {
			this.sapphirePopupSections.forEach((section) => {
				const body = document.querySelector('body');
				const popupButton = section.querySelector('.yt-button');
				const videoOverlay = section.querySelector('.yt-overlay');
				const closeButton = section.querySelector('.close-popup');
				const videoWrapper = section.querySelector('.ytvideo');
				const video = videoWrapper.dataset.video;

				// When using GSAP ScrollSmoother
				// this needs to be outside the content.
				body.appendChild(videoOverlay);

				popupButton.addEventListener('click', () =>
					this.showPopup(videoOverlay, videoWrapper, video)
				);
				closeButton.addEventListener('click', () =>
					this.hidePopup(videoOverlay, videoWrapper)
				);
			});
		}
	}

	showPopup(videoOverlay, videoWrapper, video) {
		if (video.includes('http')) {
			video = video.split('v=').pop();
		}
		this.body.classList.add('has-popup');
		videoOverlay.classList.add('on');

		videoWrapper.innerHTML = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${video}?rel=0&autoplay=1" frameborder="0" allow="autoplay; accelerometer; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
	}

	hidePopup(videoOverlay, videoWrapper) {
		this.body.classList.remove('has-popup');
		videoOverlay.classList.remove('on');
		videoWrapper.innerHTML = '';
	}
}

export default SapphireVideoPopup;
