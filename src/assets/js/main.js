$(function () {
  /*
      https://www.jqueryscript.net/animation/Smooth-Mouse-Wheel-Scrolling-Plugin-With-jQuery-easeScroll.html
      ===========================*/
	$("html").easeScroll({
		frameRate: 60,
		animationTime: 1000,
		stepSize: 90,
		pulseAlgorithm: 1,
		pulseScale: 8,
		pulseNormalize: 1,
		accelerationDelta: 20,
		accelerationMax: 1,
		keyboardSupport: true,
		arrowScroll: 50,
		touchpadSupport: true,
		fixedBackground: true
	});

	let sandwitch = function () {
		$(document).on('click', '.catalog-nav__header', function () {
			let catalogNav = $(this).closest('.catalog-nav');
			catalogNav.toggleClass('catalog-nav--active');
			let sandwitch = $(this).find('.sandwitch');
			sandwitch.toggleClass('sandwitch--active');
		});
	};


	if ($(window).width() < 768) {
		$('#js-categories-prev').slick({
			slidesToShow: 2,
			slidesToScroll: 1
		});
	}

	let productPrevSlider = function () {
		let sliderCount = $('.product-slider__count');
		let productSlider = $('.js-product-prev-slider');

		productSlider.on('init afterChange', function (event, slick, currentSlide) {
			let i = (currentSlide ? currentSlide : 0) + 1;
			sliderCount.text('Страниц ' + i + ' из ' + slick.slideCount);
		});

		$('.js-product-prev-slider').slick({
			slidesToShow: 4,
			slidesToScroll: 1,
			prevArrow: '.slider-nav--prev',
			nextArrow: '.slider-nav--next',
			infinite: false
		});
	};

	var locationChoose = function () {
		$('.location-question__btn').on('click', function () {
			var answer = $(this).data('location');
			if (answer === 'no') {
				$('#js-location__body').addClass('is-location-choose');
			}
			$('#js-location-question').hide();
		});

		$('#js-location-choose__list .location-choose__item').on('click', function () {
			var locationChooseItemText = $(this).text();
			var locationCurrent = $('#js-location__current');

			locationCurrent.text(locationChooseItemText);

			$('#js-location__body').removeClass('is-location-choose');
		});

		$('#js-location-choose__list .location-choose__item').on('mouseenter', function () {
			$('#js-location-input').val($(this).text());
		});

		$('#js-location__header').on('click', function () {
			$('#js-location__body').addClass('is-location-choose');
		});
	};

	let popupLink = function () {
		$('.js-popup-link').magnificPopup({
			showCloseBtn: false
		});

		$(document).on('click', '.popup-close', function () {
			$.magnificPopup.close();
		});
	};

	let fileupload = function () {
		$(".file-upload input[type=file]").change(function () {
			let filename = $(this).val().replace(/.*\\/, "");
			$(this).closest('.file-upload').find('.file-upload__text').html(filename);
		});
	};

	let formValidate = function () {
		$('.form').each(function () {
			$(this).on(' submit', function () {
				$(this).validate({
					rules: {
						name: {
							required: true,
						},
						phone: {
							required: true
						},
						email: {
							required: true,
							email: true
						},
						password: {
							required: true
						}
					},
					messages: {
						name: 'Введите корректное имя',
						phone: 'Введите корректный номер',
						email: 'Введите корректный email',
						password: 'Введите корректный пароль'
					},
					errorPlacement: function (error, element) {
						console.log(error);
						console.log(element);
						element.attr("placeholder", error[0].outerText);
					}
				});
				if ($(this).valid()) {
					let wrap = $(this)[0].closest('.hide-on-succes');
					if (wrap) {
						$(wrap).siblings('.show-on-succes').show();
						$(wrap).hide();
					}
				}
				return false;
			});
		});
	};

	productPrevSlider();
	sandwitch();
	locationChoose();
	popupLink();
	fileupload();
	formValidate();


});

// out of jquery
let popularCategoriesSlider = function () {
	let sliderElement = $('#js-categories-prev');

	if ($(window).width() < 768 && !(sliderElement.hasClass('slick-initialized'))) {
		console.log('< 768');
		sliderElement.slick({
			slidesToShow: 2,
			slidesToScroll: 1
		});
	} else if ($(window).width() > 768 && sliderElement.hasClass('slick-initialized')) {
		console.log('> 768');
		sliderElement.slick('unslick');
	}


};

$(window).on('resize', function () {
	popularCategoriesSlider();
});
