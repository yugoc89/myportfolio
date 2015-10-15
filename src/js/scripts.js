(function ($, window, document, undefined) {



	/*
	* rwdImageMaps jQuery plugin v1.5
	*
	* Allows image maps to be used in a responsive design by recalculating the area coordinates to match the actual image size on load and window.resize
	*
	* Copyright (c) 2013 Matt Stow
	* https://github.com/stowball/jQuery-rwdImageMaps
	* http://mattstow.com
	* Licensed under the MIT license
	*/
	(function(a){a.fn.rwdImageMaps=function(){var c=this;var b=function(){c.each(function(){if(typeof(a(this).attr("usemap"))=="undefined"){return}var e=this,d=a(e);a("<img />").load(function(){var g="width",m="height",n=d.attr(g),j=d.attr(m);if(!n||!j){var o=new Image();o.src=d.attr("src");if(!n){n=o.width}if(!j){j=o.height}}var f=d.width()/100,k=d.height()/100,i=d.attr("usemap").replace("#",""),l="coords";a('map[name="'+i+'"]').find("area").each(function(){var r=a(this);if(!r.data(l)){r.data(l,r.attr(l))}var q=r.data(l).split(","),p=new Array(q.length);for(var h=0;h<p.length;++h){if(h%2===0){p[h]=parseInt(((q[h]/n)*100)*f)}else{p[h]=parseInt(((q[h]/j)*100)*k)}}r.attr(l,p.toString())})}).attr("src",d.attr("src"))})};a(window).resize(b).trigger("resize");return this}})(jQuery);
	
	/**
	* 
	* Classie
	* 
	*/
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

	/**
	* 
	* Loader function
	* 
	*/
	(function( window ) {

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

	$(window).resize(function() {
		getWidthAndHeight();
	});

	$(document).ready(function() {
		// on page load
		$('.menu__works').imagePanning();
		loadingEffect();
		getWidthAndHeight();
		btWidth();
		splitLetters();
		btMenu();

		console.log('Could you do the washing up without any washing up liquid?');

		function loadContents(sourceDir){
			
			$('#load').fadeIn('fast', function(){
				$(this).addClass('loading');
				$('body').removeClass('content-on');

				loadProgress('#load .load--small');
				console.log('                   loaded!!');
			});
			
			function loaded () {
				var winHeight = $(window).height();

				var first = $.when(
					getWidthAndHeight(),
					$('img[usemap]').rwdImageMaps()
				);

				first.done( function(){
					mapLink();
				});
				$('#load span').animate({
					//width: 0,
					opacity: 0
				}, 300, function() {
					$('#load').removeClass('loading');
					$('#load span').removeAttr('style');
				});
			}

			setTimeout(function(){

				if(window.location.hash) {
					$('#wrapper').load( '/' + sourceDir + '/ #content', function() {
						var work = $('.content').hasClass('content--works');

						$('body').removeClass('home');
						loaded();
						colorBox();
						pathMatch();
						// mouseEvent();
						$('body').addClass('content-on');
						if (work) {
							mouseEvent();
						}
					});
				} else {
					$('#wrapper').load( '/ #content', function() {
						$('body').addClass('home');
						loaded();
					});
				}
			}, 700);
		}
		// If hash exists
		if(window.location.hash){
			console.log('                   hashed!!');
			var dir = window.location.hash.substr(1);
			loadContents(dir);
		} else if($('body').hasClass('home')) {
			console.log("it's home!");
		} else {
			window.location = '/';
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
			$('.sketch').removeClass('active');
		});

		$('.menu__global a').not('.link_exc').on('click', function(event) {
			var menu = document.getElementById( 'bt-menu' );
			classie.remove( menu, 'bt-menu-open' );
		});

		// If navigation menu is clicked
		$('#main').on('click','a:not(.link_exc):not(.panel-link)', function(e){
			e.preventDefault();
			window.location.hash = $(e.currentTarget).attr('href').substr(0, $(e.currentTarget).attr('href').length).replace(/\//g,'');
		});

	});

	/**
	* 
	* Add class active on a current link
	* 
	*/
	function pathMatch() {
		var path = window.location.hash.split('#')[1];
		var url = '.works__list a[href*="/' +path+ '/"]';

		$(url).parent('li').addClass('active');
		$('.works__list a').not(url).parent('li').removeClass('active');
	}

	/**
	* 
	* get works items total size
	* 
	*/
	function btWidth(){
		$('.works__list').each(function(index, el) {
			var max_length = -1;
			var size = $(this).find('li').length;
			max_length = Math.max(max_length, size);
			console.log(max_length);
			var contentHeight = 288*max_length + 40*max_length + 288;
			var windowWidth = $(window).width();
			if (windowWidth > 1350) {
				$('.works__list').css({
					height: contentHeight/2
				});
			} else {
				$('.works__list').css({
					height: contentHeight
				});
			}
		});
	}

	/**
	* 
	* Loading animation
	* 
	*/
	function loadingEffect() {

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

							// for (var i = 0; i <= $('#page-title').children().size(); i++) {
							// 	$('#page-title').children('span:eq('+i+')').delay(50*i).animate({'opacity': 1},300);
							// }

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

	}

	/**
	* 
	* Get window size
	* 
	*/
	function getWidthAndHeight (){
		var winWidth = $(window).width();
		var winHeight = $(window).height();
		$('.content--about, .content--home').css({'width': winWidth,'height': winHeight,});
		$('.section--works, .section--works-archive').css({'height': winHeight,});
		$('.content--blog #fullpage, .content--contact').css({
			'width': winWidth,
			'height': winHeight
		});
	}

	/**
	 * add spans on navigation menu
	 * 
	 */
	function splitLetters() {	
		$('#page-title').children().andSelf().contents().each(function() {
		    if (this.nodeType == 3) {
		        $(this).replaceWith($(this).text().replace(/(\S)/g, '<span>$1</span>'));
		    }
		});
	}

	/**
	* 
	* Parallax effect
	* 
	*/
	function parallax(){
		var scrolled = $(window).scrollTop();
		$('.image').css('top',''+-(scrolled*0.6)+'px');
	}

	/**
	* 
	* mousemove
	* 
	*/
	$.fn.imagePanning=function(){
		var init="center",
			speed=800, //animation/tween speed
			//custom js tween
			_tweenTo=function(el,prop,to,duration,easing,overwrite){
				if(!el._mTween){el._mTween={top:{},left:{}};}
				var startTime=_getTime(),_delay,progress=0,from=el.offsetTop,elStyle=el.style,_request,tobj=el._mTween[prop];
				if(prop==="left"){from=el.offsetLeft;}
				var diff=to-from;
				if(overwrite!=="none"){_cancelTween();}
				_startTween();
				function _step(){
					progress=_getTime()-startTime;
					_tween();
					if(progress>=tobj.time){
						tobj.time=(progress>tobj.time) ? progress+_delay-(progress-tobj.time) : progress+_delay-1;
					if(tobj.time<progress+1){tobj.time=progress+1;}
					}
					if(tobj.time<duration){tobj.id=_request(_step);}
				}
				function _tween(){
					if(duration>0){
						tobj.currVal=_ease(tobj.time,from,diff,duration,easing);
						elStyle[prop]=Math.round(tobj.currVal)+"px";
					}else{
						elStyle[prop]=to+"px";
					}
				}
				function _startTween(){
					_delay=1000/60;
					tobj.time=progress+_delay;
					_request=(!window.requestAnimationFrame) ? function(f){_tween(); return setTimeout(f,0.01);} : window.requestAnimationFrame;
					tobj.id=_request(_step);
				}
				function _cancelTween(){
					if(tobj.id==null){return;}
					if(!window.requestAnimationFrame){clearTimeout(tobj.id);
					}else{window.cancelAnimationFrame(tobj.id);}
					tobj.id=null;
				}
				function _ease(t,b,c,d,type){
					var ts=(t/=d)*t,tc=ts*t;
					return b+c*(0.499999999999997*tc*ts + -2.5*ts*ts + 5.5*tc + -6.5*ts + 4*t);
				}
				function _getTime(){
					if(window.performance && window.performance.now){
						return window.performance.now();
					}else{
						if(window.performance && window.performance.webkitNow){
							return window.performance.webkitNow();
						}else{
							if(Date.now){return Date.now();}else{return new Date().getTime();}
						}
					}
				}
			};
			return this.each(function(){
				var $this=$(this),timer,dest;
				if($this.data("imagePanning")) return;
				$this.data("imagePanning",1)
			//create markup
			.wrap("<div class='img-pan-container' />")
			.after("<div class='resize' style='position:absolute; width:auto; height:auto; top:0; right:0; bottom:0; left:0; margin:0; padding:0; overflow:hidden; visibility:hidden; z-index:-1'><iframe style='width:100%; height:0; border:0; visibility:visible; margin:0' /><iframe style='width:0; height:100%; border:0; visibility:visible; margin:0' /></div>")
			//image loaded fn
			.one("load",function(){
				setTimeout(function(){ $this.addClass("loaded").trigger("mousemove",1); },1);
			}).each(function(){ //run load fn even if cached
				if(this.complete) $(this).load();
			})
	         //panning fn
			.parent().on("mousemove touchmove MSPointerMove pointermove",function(e,p){
				var cont=$(this);
				e.preventDefault();
				var contH=cont.height(),contW=cont.width(),
				isTouch=e.type.indexOf("touch")!==-1,isPointer=e.type.indexOf("pointer")!==-1,
				evt=isPointer ? e.originalEvent : isTouch ? e.originalEvent.touches[0] || e.originalEvent.changedTouches[0] : e,
				coords=[
					!p ? evt.pageY-cont.offset().top : init==="center" ? contH/2 : 0,
					!p ? evt.pageX-cont.offset().left : init==="center" ? contW/2 : 0
				];
				dest=[Math.round(($this.outerHeight(true)-contH)*(coords[0]/contH)),Math.round(($this.outerWidth(true)-contW)*(coords[1]/contW))];
			})
			//resize fn
			.find(".resize iframe").each(function(){
				$(this.contentWindow || this).on("resize",function(){
					$this.trigger("mousemove",1);
				});
			});
			//panning animation 60FPS
			if(timer) clearInterval(timer);
			timer=setInterval(function(){
				_tweenTo($this[0],"top",-dest[0],speed);
				_tweenTo($this[0],"left",-dest[1],speed);
			},16.6);
		});
	};

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
			if ($(el).visible(true)) {
				$(el).addClass("visible"); 
			} else {
				$(el).css('visibility', 'hidden');
			}
			
		});

		win.scroll(function(event) {
			allMods.each(function(i, el) {
				if ($(el).visible(true)) {
					$(el).addClass("comein"); 
					$(el).css('visibility', 'visible');
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

	/**
	* 
	* Rotation animation
	* 
	*/
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
		// $(loadingEl).animate({
		// 	width: '4px'
		// }, 500).animate({
		// 	height: '100px'
		// }, 500, function(){
		// 	$(this).animateRotate(90, 300, 'linear');

		// 	setTimeout( function() {
		// 		var winWidth = $(window).width();
		// 		$(loadingEl).animate({
		// 			height: winWidth
		// 		});
		// 	}, 500);
		// 	return false;
		// });
		$(loadingEl).animate({
			width: '100%'
		}, 800);
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

	/**
	* 
	* Colourbox plugin 
	* 
	*/
	function colorBox() {
		var windowWidth = $(window).width(),
			windowHeight = $(window).height();

		$('.panel-link').colorbox({
			ransition: 'fade',
			onOpen: function(){
				// $('body').addClass('panel-open');
				$('.content--works').fadeOut(400);
			},
			onComplete: function(){
				$('.cboxPhoto').unbind().click($.colorbox.close);
				$('#colorbox, #cboxWrapper, #cboxContent, #cboxLoadedContent').css({
					width: windowWidth,
					height: windowHeight,
				});
				$("#colorbox img").imagePanning();
			},
			onClosed: function(){
				$('.content--works').fadeIn(400);
			}
		});
		$('.cboxPhoto').bind('click', function(){
			$.colorbox.close();
		});
	}

	/**
	* 
	* Works galleries
	* 
	*/
	function galleryAjax(){

		var post_url = $(this).attr('href');

		$('.post-nav a').each(function(index, el) {
			$('#section--works').on('click', this, function(event) {
				event.preventDefault();
				$('#section--works').load( post_url, function(){
					console.log('loaaaaded');
				});
			});
		});
	}

	/**
	* 
	* Add link on images using map
	* 
	*/
	function mapLink() {
		
		setTimeout( function(){

			$('.map-area').each(function(index, el) {

				var i, x = [], y = [];
				var c = $(this).attr('coords').split(',');

				// var t = c[1] - c[2];
				// var l = c[0] - c[2];
				for (i=0; i < c.length; i++){
				 x.push( c[i++] );
				 y.push( c[i] );
				}
				var t = y.sort(num)[0] ;
				var l = x.sort(num)[0] ;
				console.log(c);

				function num(a, b){ return (a-b); }

				var secWidth = $('.map-link').eq(index).height() *2;

				$(function (){
					$('.map-link').eq(index).css({
						top: t + 'px',
						left: l + 'px'
					});

				});

			});
		}, 400);
	}

	// $(document).ready(function($) {
	// 	// setTimeout(webGL, 500);
	// });

	/**
	* 
	* Move event on single work image
	* 
	*/	
	function mouseEvent(){
		var myContainer = $('.cube-container img');
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
	function btMenu() {

		// http://stackoverflow.com/a/11381730/989439
		function mobilecheck() {
			var check = false;
			(function(a){if(/(android|ipad|playbook|silk|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
			return check;
		}

		function init() {

			var menu = document.getElementById( 'bt-menu' ),
			// trigger = menu.querySelector( 'a.bt-menu-trigger' ),
			trigger2 = document.getElementById( 'nav-menu' ).querySelector( 'a.bt-menu-trigger-2' ),
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

			// trigger.addEventListener( eventtype, function( ev ) {
			// 	ev.stopPropagation();
			// 	ev.preventDefault();

			// 	if( classie.has( menu, 'bt-menu-open' ) ) {
			// 		resetMenu();
			// 		$('h2').fadeIn();
			// 		// $('canvas.sketch').remove();
			// 		$('.sketch').removeClass('active');
			// 	}
			// 	else {
			// 		classie.remove( menu, 'bt-menu-close' );
			// 		classie.add( menu, 'bt-menu-open' );
			// 		$('h2').fadeOut();
			// 		overlay.addEventListener( eventtype, closeClickFn );
			// 		// setTimeout(webGL, 500);
			// 		$('.sketch').addClass('active');
			// 	}
			// });
			trigger2.addEventListener( eventtype, function( ev ) {
				ev.stopPropagation();
				ev.preventDefault();

				if( classie.has( menu, 'bt-menu-open' ) ) {
					resetMenu();
					$('h2').fadeIn();
					// $('canvas.sketch').remove();
					$('.sketch').removeClass('active');
				}
				else {
					classie.remove( menu, 'bt-menu-close' );
					classie.add( menu, 'bt-menu-open' );
					$('h2').fadeOut();
					overlay.addEventListener( eventtype, closeClickFn );
					// setTimeout(webGL, 500);
					$('.sketch').addClass('active');
				}
			});
		}

		init();
	}

	// Generated by CoffeeScript 1.6.3
	function webGL() {
		var GLSL, error, gl, gui, nogl;

		GLSL = {
			vert: "\n#ifdef GL_ES\nprecision mediump float;\n#endif\n\n// Uniforms\nuniform vec2 u_resolution;\n\n// Attributes\nattribute vec2 a_position;\n\nvoid main() {\n    gl_Position = vec4 (a_position, 0, 1);\n}\n",
			frag: "\n#ifdef GL_ES\nprecision mediump float;\n#endif\n\nuniform bool u_scanlines;\nuniform vec2 u_resolution;\n\nuniform float u_brightness;\nuniform float u_blobiness;\nuniform float u_particles;\nuniform float u_millis;\nuniform float u_energy;\n\n// http://goo.gl/LrCde\nfloat noise( vec2 co ){\n    return fract( sin( dot( co.xy, vec2( 12.9898, 78.233 ) ) ) * 43758.5453 );\n}\n\nvoid main( void ) {\n\n    vec2 position = ( gl_FragCoord.xy / u_resolution.x );\n    float t = u_millis * 0.001 * u_energy;\n    \n    float a = 0.0;\n    float b = 0.0;\n    float c = 0.0;\n\n    vec2 pos, center = vec2( 0.5, 0.5 * (u_resolution.y / u_resolution.x) );\n    \n    float na, nb, nc, nd, d;\n    float limit = u_particles / 20.0;\n    float step = 0.2 / u_particles;\n    float n = 0.5;\n    \n    for ( float i = 0.0; i <= 1.0; i += 0.025 ) {\n\n        if ( i <= limit ) {\n\n            vec2 np = vec2(n, 1-1);\n            \n            na = noise( np * 1.1 );\n            nb = noise( np * 2.8 );\n            nc = noise( np * 0.7 );\n            nd = noise( np * 3.2 );\n\n            pos = center;\n            pos.x += sin(t*na) * cos(t*nb) * tan(t*na*0.15) * 0.3;\n            pos.y += tan(t*nc) * sin(t*nd) * 0.1;\n            \n            d = pow( 1.6*na / length( pos - position ), u_blobiness );\n            \n            if ( i < limit * 0.3333 ) a += d;\n            else if ( i < limit * 0.6666 ) b += d;\n            else c += d;\n\n            n += step;\n        }\n    }\n    \n    vec3 col = vec3(a*c,b*c,a*b) * 0.0001 * u_brightness;\n    \n    if ( u_scanlines ) {\n        col -= mod( gl_FragCoord.y, 1.0 ) < 1.0 ? 0.5 : 0.0;\n    }\n    \n    gl_FragColor = vec4( col, 1.0 );\n\n}\n"
		};

		try {
			gl = Sketch.create({
				container: document.getElementById('main'),
				type: Sketch.WEBGL,
				brightness: 0.8,
				blobiness: 1.5,
				particles: 30,
				energy: 0.3,
				scanlines: true
			});
		} catch (_error) {
			error = _error;
			nogl = document.getElementById('nogl');
			nogl.style.display = 'block';
		}

		if (gl) {
			gl.setup = function() {
				var frag, vert;
				this.clearColor(0.5, 0.5, 0.5, 1.0);
				vert = this.createShader(this.VERTEX_SHADER);
				frag = this.createShader(this.FRAGMENT_SHADER);
				this.shaderSource(vert, GLSL.vert);
				this.shaderSource(frag, GLSL.frag);
				this.compileShader(vert);
				this.compileShader(frag);
				if (!this.getShaderParameter(vert, this.COMPILE_STATUS)) {
					throw this.getShaderInfoLog(vert);
				}
				if (!this.getShaderParameter(frag, this.COMPILE_STATUS)) {
					throw this.getShaderInfoLog(frag);
				}
				this.shaderProgram = this.createProgram();
				this.attachShader(this.shaderProgram, vert);
				this.attachShader(this.shaderProgram, frag);
				this.linkProgram(this.shaderProgram);
				if (!this.getProgramParameter(this.shaderProgram, this.LINK_STATUS)) {
					throw this.getProgramInfoLog(this.shaderProgram);
				}
				this.useProgram(this.shaderProgram);
				this.shaderProgram.attributes = {
					position: this.getAttribLocation(this.shaderProgram, 'a_position')
				};
				this.shaderProgram.uniforms = {
					resolution: this.getUniformLocation(this.shaderProgram, 'u_resolution'),
					brightness: this.getUniformLocation(this.shaderProgram, 'u_brightness'),
					blobiness: this.getUniformLocation(this.shaderProgram, 'u_blobiness'),
					particles: this.getUniformLocation(this.shaderProgram, 'u_particles'),
					scanlines: this.getUniformLocation(this.shaderProgram, 'u_scanlines'),
					energy: this.getUniformLocation(this.shaderProgram, 'u_energy'),
					millis: this.getUniformLocation(this.shaderProgram, 'u_millis')
				};
				this.geometry = this.createBuffer();
				this.geometry.vertexCount = 6;
				this.bindBuffer(this.ARRAY_BUFFER, this.geometry);
				this.bufferData(this.ARRAY_BUFFER, new Float32Array([-1.0, -1.0, 1.0, -1.0, -1.0, 1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0]), this.STATIC_DRAW);
				this.enableVertexAttribArray(this.shaderProgram.attributes.position);
				this.vertexAttribPointer(this.shaderProgram.attributes.position, 2, this.FLOAT, false, 0, 0);
				return this.resize();
			};
			gl.updateUniforms = function() {
				if (!this.shaderProgram) {
					return;
				}
				this.uniform2f(this.shaderProgram.uniforms.resolution, this.width, this.height);
				this.uniform1f(this.shaderProgram.uniforms.brightness, this.brightness);
				this.uniform1f(this.shaderProgram.uniforms.blobiness, this.blobiness);
				this.uniform1f(this.shaderProgram.uniforms.particles, this.particles);
				this.uniform1i(this.shaderProgram.uniforms.scanlines, this.scanlines);
				return this.uniform1f(this.shaderProgram.uniforms.energy, this.energy);
			};
			gl.draw = function() {
				this.uniform1f(this.shaderProgram.uniforms.millis, this.millis + 5000);
				this.clear(this.COLOR_BUFFER_BIT | this.DEPTH_BUFFER_BIT);
				this.bindBuffer(this.ARRAY_BUFFER, this.geometry);
				return this.drawArrays(this.TRIANGLES, 0, this.geometry.vertexCount);
			};
			gl.resize = function() {
				this.viewport(0, 0, this.width, this.height);
				return this.updateUniforms();
			};
			// gui = new dat.GUI();
			// gui.add(gl, 'particles').step(1.0).min(8).max(40).onChange(function() {
			// 	return gl.updateUniforms();
			// });
			// gui.add(gl, 'brightness').step(0.01).min(0.1).max(1.0).onChange(function() {
			// 	return gl.updateUniforms();
			// });
			// gui.add(gl, 'blobiness').step(0.01).min(0.8).max(1.5).onChange(function() {
			// 	return gl.updateUniforms();
			// });
			// gui.add(gl, 'energy').step(0.01).min(0.1).max(4.0).onChange(function() {
			// 	return gl.updateUniforms();
			// });
			// gui.add(gl, 'scanlines').onChange(function() {
			// 	return gl.updateUniforms();
			// });
			// gui.close();
		}

	}
// .call(this);


})(jQuery, window, document);
