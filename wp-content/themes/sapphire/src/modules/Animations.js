// register GSAP ScrollTrigger

class Animations {
	constructor() {
		gsap.registerPlugin(ScrollTrigger, SplitText);

		this.hero = document.querySelector('.hero-block');
		this.sapphireContent = document.querySelector('.sapphire-content');
		this.featuredPosts = document.querySelector('.sapphire-featured-posts');
		this.events();
		if (this.hero) {
			this.heroAnimations();
		}
		if (this.sapphireContent) {
			this.sapphireContentAnimations();
		}
		if (this.featuredPosts) {
			this.sapphireFeaturedPosts();
		}
	}
	// End Constructor

	events() {
		gsap.to('body', { opacity: 1, duration: 1 });
		window.addEventListener('resize', () => {
			ScrollTrigger.refresh();
			ScrollSmoother.refresh();
		});
	}

	heroAnimations() {
		const heroHeading = this.hero.querySelector('.hero-heading');
		const heroParagraph = this.hero.querySelector('p');
		const heroButtons = this.hero.querySelectorAll('.button');
		const heroContentWrap = this.hero.querySelector('.block-content-wrap');

		const heroTimeline = gsap.timeline({});
		if (heroHeading) {
			heroTimeline.from(heroHeading, {
				autoAlpha: 0,
				// x: -800,
				duration: 1,
			});
		}
		if (heroParagraph) {
			heroTimeline.from(heroParagraph, {
				autoAlpha: 0,
				y: -20,
				duration: 1,
			});
		}
		if (heroButtons.length) {
			heroTimeline.from(heroButtons, {
				autoAlpha: 0,
				duration: 1,
			});
		}
		if (heroContentWrap) {
			heroTimeline.to(heroContentWrap, {
				scrollTrigger: {
					trigger: heroContentWrap,
					scrub: 1,
					start: 'top 20px',
					end: 'bottom -100%',
				},
				y: -100,
				opacity: 0,
				ease: 'power4.out',
			});
		}
		heroTimeline.delay(0.5);
	}
	// End Hero

	// Sapphire Content
	sapphireContentAnimations() {
		const bgSvgs = this.sapphireContent.querySelectorAll('.background svg');
		if (bgSvgs.length) {
			bgSvgs.forEach((svg, i) => {
				gsap.to(svg, {
					scrollTrigger: {
						trigger: this.sapphireContent,
						scrub: true,
						start: 'top 50%',
						toggleActions: 'play reverse none reverse',
						// markers: true,
					},
					y: i * '300',
				});
			});
		}
	} // End Sapphire Content

	// Sapphire Featured Posts
	sapphireFeaturedPosts() {
		const heading = this.featuredPosts.querySelector('h2');
		const posts = this.featuredPosts.querySelectorAll('.single-post');

		if (heading) {
			heading.split = new SplitText(heading, {
				type: 'lines,words,chars',
				linesClass: 'split-line',
			});

			// Set up the anim
			heading.anim = gsap.from(heading.split.chars, {
				scrollTrigger: {
					trigger: heading,
					toggleActions: 'restart pause resume reverse',
					start: 'top 80%',
				},
				duration: 0.6,
				ease: 'circ.out',
				y: 80,
				stagger: 0.02,
			});
		} // End heading

		if (posts.length) {
			// posts.forEach((post) => {
			gsap.from(posts, {
				scrollTrigger: {
					trigger: this.featuredPosts,
					start: 'top 80%',
					end: 'top 50%',
					scrub: true,
					toggleActions: 'play reverse none reverse',
					// markers: true,
				},
				// duration: 1,
				// delay: 0.8,
				// stagger: 0.5,
				opacity: 0,
				// y: 50,
			});
			// });
		}
	}
	// End Sapphire Featured Posts
}

export default Animations;
