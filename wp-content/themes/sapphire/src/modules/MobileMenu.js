class MobileMenu {
  constructor() {
		this.header = document.querySelector('.site-header');
    this.menu = document.querySelector(".site-header .header-nav")
    this.openButton = document.querySelector(".nav-trigger")
		this.closeButton = document.querySelector('.nav-trigger-close')
		this.window = window
    this.events()
 }

  events() {
		if (this.openButton && this.closeButton) {
			this.openButton.addEventListener("click", () => this.openMenu())
			this.closeButton.addEventListener('click', () => this.closeMenu())
			this.window.addEventListener('resize', () => this.hideOnDesktop())
		}
  }

  openMenu() {
    this.header.classList.add('menu-open')
  }

	closeMenu() {
		this.header.classList.remove('menu-open');
	}

	hideOnDesktop() {
		if (window.innerWidth > 768) {
			this.closeMenu();
		}
	}
}

export default MobileMenu
