(function ($, window, document, undefined) {


	// Get window width and height
	$(document).ready(function() {
		getWidthAndHeight();
	});
	// make sure div stays full width/height on resize
	$(window).resize(function() {
		getWidthAndHeight();
	});
	function getWidthAndHeight (){
		var winWidth = $(window).width();
		var winHeight = $(window).height();
		$('.cols2').css({'width': winWidth,'height': winHeight,});
		$('.content--work .section').css({'min-height': winHeight,});
		$('.content--blog #fullpage').css({
			'width': winWidth,
			'height': winHeight
		});
	}

	// Add scroller
	$('.scroller').click(function(){
		$('html, body').animate({scrollTop: $('#' + $(this).data('to')).offset().top-120},1400);
		return false;
	});

	//
	//	CLASSIE
	//
	( function( window ) {
	// class helper functions from bonzo https://github.com/ded/bonzo

		function classReg( className ) {
		  return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
		}

		// classList support for class management
		// altho to be fair, the api sucks because it won't accept multiple classes at once
		var hasClass, addClass, removeClass;

		if ( 'classList' in document.documentElement ) {
		  hasClass = function( elem, c ) {
		    return elem.classList.contains( c );
		  };
		  addClass = function( elem, c ) {
		    elem.classList.add( c );
		  };
		  removeClass = function( elem, c ) {
		    elem.classList.remove( c );
		  };
		}
		else {
		  hasClass = function( elem, c ) {
		    return classReg( c ).test( elem.className );
		  };
		  addClass = function( elem, c ) {
		    if ( !hasClass( elem, c ) ) {
		      elem.className = elem.className + ' ' + c;
		    }
		  };
		  removeClass = function( elem, c ) {
		    elem.className = elem.className.replace( classReg( c ), ' ' );
		  };
		}

		function toggleClass( elem, c ) {
		  var fn = hasClass( elem, c ) ? removeClass : addClass;
		  fn( elem, c );
		}

		var classie = {
		  // full names
		  hasClass: hasClass,
		  addClass: addClass,
		  removeClass: removeClass,
		  toggleClass: toggleClass,
		  // short names
		  has: hasClass,
		  add: addClass,
		  remove: removeClass,
		  toggle: toggleClass
		};

		// transport
		if ( typeof define === 'function' && define.amd ) {
		  // AMD
		  define( classie );
		} else {
		  // browser global
		  window.classie = classie;
		}

	})( window );

	//
	//	PATHLOADER
	//
	;( function( window ) {

		function PathLoader( el ) {
			this.el = el;
			// clear stroke
			this.el.style.strokeDasharray = this.el.style.strokeDashoffset = this.el.getTotalLength();
		}

		PathLoader.prototype._draw = function( val ) {
			this.el.style.strokeDashoffset = this.el.getTotalLength() * ( 1 - val );
		};

		PathLoader.prototype.setProgress = function( val, callback ) {
			this._draw(val);
			if( callback && typeof callback === 'function' ) {
				// give it a time (ideally the same like the transition time) so that the last progress increment animation is still visible.
				setTimeout( callback, 200 );
			}
		};

		PathLoader.prototype.setProgressFn = function( fn ) {
			if( typeof fn === 'function' ) { fn( this ); }
		};

		// add to global namespace
		window.PathLoader = PathLoader;

	})( window );

	//
	//	LOADING EFFECT PROCESS
	//
	(function() {

		var support = { animations : Modernizr.cssanimations },
			container = document.getElementById( 'main' ),
			header = container.querySelector( 'header.header' ),
			loader = new PathLoader( document.getElementById( 'ip-loader-circle' ) ),
			animEndEventNames = { 'WebkitAnimation' : 'webkitAnimationEnd', 'OAnimation' : 'oAnimationEnd', 'msAnimation' : 'MSAnimationEnd', 'animation' : 'animationend' },
			// animation end event name
			animEndEventName = animEndEventNames[ Modernizr.prefixed( 'animation' ) ];

		function init() {
			var onEndInitialAnimation = function() {
				if( support.animations ) {
					this.removeEventListener( animEndEventName, onEndInitialAnimation );
				}

				startLoading();
			};

			// disable scrolling
			//window.addEventListener( 'scroll', noscroll );

			// initial animation
			classie.add( container, 'loading' );

			if( support.animations ) {
				container.addEventListener( animEndEventName, onEndInitialAnimation );
			}
			else {
				onEndInitialAnimation();
			}
		}

		function startLoading() {
			// simulate loading something..
			var simulationFn = function(instance) {
				var progress = 0,
					interval = setInterval( function() {
						progress = Math.min( progress + Math.random() * 0.1, 1 );

						instance.setProgress( progress );

						// reached the end
						if( progress === 1 ) {
							classie.remove( container, 'loading' );
							classie.add( container, 'loaded' );
							clearInterval( interval );

							var onEndHeaderAnimation = function(ev) {
								if( support.animations ) {
									if( ev.target !== header ) return;
									this.removeEventListener( animEndEventName, onEndHeaderAnimation );
								}

								classie.add( document.body, 'layout-switch' );
								window.removeEventListener( 'scroll', noscroll );
							};

							if( support.animations ) {
								header.addEventListener( animEndEventName, onEndHeaderAnimation );
							}
							else {
								onEndHeaderAnimation();
							}
						}
					}, 80 );
					$('.loaded').delay(1000).addClass('after-load');
			};

			loader.setProgressFn( simulationFn );
		}
		
		function noscroll() {
			window.scrollTo( 0, 0 );
		}

		init();

	})();

	function parallax(){
		var scrolled = $(window).scrollTop();
		$('.image').css('top',''+-(scrolled*0.6)+'px');
	}

	/**
	* 
	* slide up on scroll 
	* 
	*/
	function comeup(){
		(function($) {

			/**
			* Copyright 2012, Digital Fusion
			* Licensed under the MIT license.
			* http://teamdf.com/jquery-plugins/license/
			*
			* @author Sam Sehnert
			* @desc A small plugin that checks whether elements are within
			*     the user visible viewport of a web browser.
			*     only accounts for vertical position, not horizontal.
			*/

			$.fn.visible = function(partial) {

				var $t = $(this),
				$w = $(window),
				viewTop = $w.scrollTop(),
				viewBottom = viewTop + $w.height(),
				_top = $t.offset().top,
				_bottom = _top + $t.height(),
				compareTop = partial === true ? _bottom : _top,
				compareBottom = partial === true ? _top : _bottom;

				return ((compareBottom <= viewBottom) && (compareTop >= viewTop));

			};

		})(jQuery);

		var win = $(window);

		var allMods = $('.blog__post').not('.blog__post:first-child, .blog__post:nth-child(2)');

		allMods.each(function(i, el) {
			var el = $(el);
			if (el.visible(true)) {
				el.addClass("visible"); 
			} else {
				el.css('visibility', 'hidden');
			}
			
		});

		win.scroll(function(event) {
			allMods.each(function(i, el) {
				var el = $(el);
				if (el.visible(true)) {
					el.addClass("comein"); 
					el.css('visibility', 'visible');
				} 
			});
		});
	}

	/**
	* 
	* Progress bar on load
	* 
	*/
	function progress(percent, $element) {
		var progressBarWidth = percent * $element.width() / 100;
		$element.find('span').animate({ width: progressBarWidth }, 500);
	}

	$.fn.animateRotate = function(angle, duration, easing, complete) {
	    var args = $.speed(duration, easing, complete);
	    var step = args.step;
	    return this.each(function(i, e) {
	        args.step = function(now) {
	            $.style(e, 'transform', 'rotate(' + now + 'deg)');
	            if (step) return step.apply(this, arguments);
	        };

	        $({deg: 0}).animate({deg: angle}, args);
	    });
	};

	/**
	* 
	* Load Animation
	* 
	*/
	function loadProgress(loadingEl) {
		$(loadingEl).animate({
			width: '4px'
		}, 500).animate({
			height: '100px'
		}, 500, function(){
			$(this).animateRotate(90, 300, 'linear');

			setTimeout( function() {
				var winWidth = $(window).width();
				$(loadingEl).animate({
					height: winWidth
				});
			}, 500);
			return false;
		});
	}

	/**
	* 
	* Scale up the image when hovering on blog
	* 
	*/
	function scale(){
		$('.blog__post .link').each(function(index, el) {
			$(this).mouseover(function(event) {
				$('.blog__post').removeClass('hover clearPseudo').eq(index).addClass('hover clearPseudo');
				$('.post-date').removeClass('clearEl').eq(index).addClass('clearEl');
			});
			$(this).mouseout(function(event) {
				$('.blog__post').removeClass('hover clearPseudo');
				$('.post-date').removeClass('clearEl');
			});
		});
	}

	/**
	* 
	* Tab menu on blog 
	* 
	*/
	function loadTabs() {
		$('.thumbnail-inner').each(function(index) {
			$(this).on('click', function(event) {
				$('.thumbnail-inner').removeClass('active');
				$(this).addClass('active');
				$('.blog__post').hide().html($(this).html()).fadeIn('1200');
				scale();
			});
		});
	}
	
	$(document).ready(function() {
		// on page load
		
		function loadContents(sourceDir){
			
			$('#load').fadeIn('fast', function(){
				//progress(100, $('#load'));
				$(this).addClass('loading');
				loadProgress('.load__element');
				$('#wrapper').fadeOut();
				console.log('                   loaded!!');
			});
			
			function loaded () {

				var winHeight = $(window).height();

				$('#load span').animate({
					width: winHeight,
					opacity: 0
				}, 300, function() {
					$('#load').removeClass('loading');
					$(this).removeAttr('style');
					getWidthAndHeight();
					$('#wrapper').fadeIn();
				});
			}

			setTimeout(function(){
				
				if(window.location.hash){
					$('#wrapper').load( '/' + sourceDir + '/ #content', function() {
						$('body').removeClass('home');
						loaded();
						var work = $('.content').hasClass('content--single-work');
						// var	path = window.location.pathname;
						// path = path.split("/");

						if (work) {
							mouseEvent();
						}
						
						if (location.hash === "#blog"){
							scale();
							loadTabs();
						}
					});
				} else {
					$('#wrapper').load( '/ #content', function() {
						$('body').addClass('home');
						loaded();
					});
				}
			}, 1100);
		}
		// If hash exists
		if(window.location.hash){
			console.log('                   hashed!!');
			var dir = window.location.hash.substr(1);
			loadContents(dir);
		}

		// If hash changed
		$(window).bind( 'hashchange', function(){
			console.log('                   hashchange!!');
			var dir = window.location.hash.substr(1);
			loadContents(dir);
		});

		// If menu is clicked, close the menu and open the next page.
		$('.bt-menu ul a').on('click', function(){
			var menu = document.getElementById( 'bt-menu' );
			classie.remove( menu, 'bt-menu-open' );
		});

		// If navigation menu is clicked
		$('#main').not('.link_exc').on('click','a:not(.link_exc)', function(e){
			e.preventDefault();
			window.location.hash = $(e.currentTarget).attr('href').substr(0, $(e.currentTarget).attr('href').length).replace(/\//g,'');
		});

	});

	/**
	* 
	* Move event on single work image
	* 
	*/	
	function mouseEvent(){
		var myContainer = $('.content--single-work .items-right img');
		var sensitivityMultiplier = 0.05;
		var wrapperOffset = myContainer.offset();
		var CenterX = wrapperOffset.left + (myContainer.width()/2) ;
		var CenterY = wrapperOffset.top + (myContainer.height()/2) ;

		$(window).mousemove(function(e) {
			var mouseX = e.pageX;
			var mouseY = e.pageY;
			mouseAction(mouseX,mouseY);
		});

		function mouseAction(mouseX,mouseY){
			var RelX = ( mouseX - CenterX ) * sensitivityMultiplier;
			var RelY = ( ( mouseY - CenterY ) * -1 ) * sensitivityMultiplier;
			myContainer.css('-webkit-transform', 'translateY(' + RelX + 'px) translateX(' + RelY + 'px)' );
			myContainer.css('transform', 'translateY(' + RelX + 'px) translateX(' + RelY + 'px)' );
		}

	}



	/**
	* 
	* BT menu
	* 
	*/
	(function() {

		// http://stackoverflow.com/a/11381730/989439
		function mobilecheck() {
			var check = false;
			(function(a){if(/(android|ipad|playbook|silk|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
			return check;
		}

		function init() {

			var menu = document.getElementById( 'bt-menu' ),
			trigger = menu.querySelector( 'a.bt-menu-trigger' ),
			// event type (if mobile, use touch events)
			eventtype = mobilecheck() ? 'touchstart' : 'click',
			resetMenu = function() {
				classie.remove( menu, 'bt-menu-open' );
				classie.add( menu, 'bt-menu-close' );
			},
			closeClickFn = function( ev ) {
				resetMenu();
				overlay.removeEventListener( eventtype, closeClickFn );
			};

			var overlay = document.createElement('div');
			overlay.className = 'bt-overlay';
			menu.appendChild( overlay );

			trigger.addEventListener( eventtype, function( ev ) {
				ev.stopPropagation();
				ev.preventDefault();

				if( classie.has( menu, 'bt-menu-open' ) ) {
					resetMenu();
					$('h2').fadeIn();
				}
				else {
					classie.remove( menu, 'bt-menu-close' );
					classie.add( menu, 'bt-menu-open' );
					$('h2').fadeOut();
					overlay.addEventListener( eventtype, closeClickFn );
				}
			});

		}

		init();

	})();

})(jQuery, window, document);
