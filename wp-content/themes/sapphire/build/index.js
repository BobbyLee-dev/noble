/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _css_style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../css/style.scss */ "./css/style.scss");
/* harmony import */ var _css_admin_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../css/admin.scss */ "./css/admin.scss");
/* harmony import */ var _modules_Animations__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/Animations */ "./src/modules/Animations.js");
/* harmony import */ var _modules_SapphireVideoPopup__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/SapphireVideoPopup */ "./src/modules/SapphireVideoPopup.js");

 // Modules / classes


 // Instantiate a new object using our modules/classes

const animations = new _modules_Animations__WEBPACK_IMPORTED_MODULE_2__["default"]();
const sapphireVideoPopup = new _modules_SapphireVideoPopup__WEBPACK_IMPORTED_MODULE_3__["default"]();

/***/ }),

/***/ "./src/modules/Animations.js":
/*!***********************************!*\
  !*** ./src/modules/Animations.js ***!
  \***********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");


// register GSAP ScrollTrigger
class Animations {
  constructor() {
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "getRatio", el => window.innerHeight / (window.innerHeight + el.offsetHeight));

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
  } // End Constructor


  events() {
    gsap.to('body', {
      opacity: 1,
      duration: 1
    });
    window.addEventListener('resize', () => {
      ScrollTrigger.refresh();
    });
  }

  heroAnimations() {
    const heroBg = this.hero.querySelector('.hero-bg');
    const heroHeading = this.hero.querySelector('.hero-heading');
    const heroParagraph = this.hero.querySelector('p');
    const heroButtons = this.hero.querySelectorAll('.button');
    const heroContentWrap = this.hero.querySelector('.block-content-wrap'); // hero content

    const heroTimeline = gsap.timeline({});

    if (heroHeading) {
      heroTimeline.from(heroHeading, {
        autoAlpha: 0,
        // x: -800,
        duration: 1
      });
    }

    if (heroParagraph) {
      heroTimeline.from(heroParagraph, {
        autoAlpha: 0,
        y: -20,
        duration: 1
      });
    }

    if (heroButtons.length) {
      heroTimeline.from(heroButtons, {
        autoAlpha: 0,
        duration: 1
      });
    }

    if (heroContentWrap) {
      heroTimeline.to(heroContentWrap, {
        scrollTrigger: {
          trigger: heroContentWrap,
          scrub: 1,
          start: 'top 20px',
          end: 'bottom -100%'
        },
        y: -100,
        opacity: 0,
        ease: 'power4.out'
      });
    }

    heroTimeline.delay(0.5);
  } // End Hero
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
            toggleActions: 'play reverse none reverse' // markers: true,

          },
          y: i * '300'
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
        linesClass: 'split-line'
      }); // Set up the anim

      heading.anim = gsap.from(heading.split.chars, {
        scrollTrigger: {
          trigger: heading,
          toggleActions: 'restart pause resume reverse',
          start: 'top 80%'
        },
        duration: 0.6,
        ease: 'circ.out',
        y: 80,
        stagger: 0.02
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
          toggleActions: 'play reverse none reverse' // markers: true,

        },
        // duration: 1,
        // delay: 0.8,
        // stagger: 0.5,
        opacity: 0 // y: 50,

      }); // });
    }
  } // End Sapphire Featured Posts


}

/* harmony default export */ __webpack_exports__["default"] = (Animations);

/***/ }),

/***/ "./src/modules/SapphireVideoPopup.js":
/*!*******************************************!*\
  !*** ./src/modules/SapphireVideoPopup.js ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
class SapphireVideoPopup {
  constructor() {
    this.sapphirePopupSections = document.querySelectorAll('.sapphire-video-popup');
    this.body = document.querySelector('body');
    this.events();
    window.addEventListener('click', function (e) {
      console.log(e.target);
    });
  }

  events() {
    if (this.sapphirePopupSections.length) {
      this.sapphirePopupSections.forEach(section => {
        const body = document.querySelector('body');
        const popupButton = section.querySelector('.yt-button');
        const videoOverlay = section.querySelector('.yt-overlay');
        const closeButton = section.querySelector('.close-popup');
        const videoWrapper = section.querySelector('.ytvideo');
        const video = videoWrapper.dataset.video; // When using GSAP ScrollSmoother
        // this needs to be outside the content.

        body.appendChild(videoOverlay);
        popupButton.addEventListener('click', () => this.showPopup(videoOverlay, videoWrapper, video));
        closeButton.addEventListener('click', () => this.hidePopup(videoOverlay, videoWrapper));
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

/* harmony default export */ __webpack_exports__["default"] = (SapphireVideoPopup);

/***/ }),

/***/ "./css/admin.scss":
/*!************************!*\
  !*** ./css/admin.scss ***!
  \************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./css/style.scss":
/*!************************!*\
  !*** ./css/style.scss ***!
  \************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/defineProperty.js ***!
  \*******************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ _defineProperty; }
/* harmony export */ });
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	!function() {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = function(result, chunkIds, fn, priority) {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var chunkIds = deferred[i][0];
/******/ 				var fn = deferred[i][1];
/******/ 				var priority = deferred[i][2];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every(function(key) { return __webpack_require__.O[key](chunkIds[j]); })) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	!function() {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"index": 0,
/******/ 			"./style-index": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = function(chunkId) { return installedChunks[chunkId] === 0; };
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = function(parentChunkLoadingFunction, data) {
/******/ 			var chunkIds = data[0];
/******/ 			var moreModules = data[1];
/******/ 			var runtime = data[2];
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some(function(id) { return installedChunks[id] !== 0; })) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunksapphire"] = self["webpackChunksapphire"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["./style-index"], function() { return __webpack_require__("./src/index.js"); })
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map