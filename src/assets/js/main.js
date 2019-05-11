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
			infinite: false,
			responsive: [
				{
					breakpoint: 1239,
					settings: {
						slidesToShow: 3,
						slidesToScroll: 3,
						dots: true,
						arrows: false
					}
				},
			]
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

		$('#js-location__header, .location-choose__close').on('click', function () {
			$('#js-location__body').addClass('is-location-choose');
		});

		$('.location-choose__close').on('click', function () {
			$('#js-location__body').hide();
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
				// $('.form-success__block').hide();
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
						"req-textarea": {
							required: true,
						},
						password: {
							required: true
						}
					},
					messages: {
						name: 'Введите корректное имя',
						phone: 'Введите корректный номер',
						email: 'Введите корректный email',
						password: 'Введите корректный пароль',
						"req-textarea": "Заполните поле"
					},
					errorPlacement: function (error, element) {
						console.log(error);
						console.log(element);
						element.attr("placeholder", error[0].outerText);
					}
				});
				if ($(this).valid()) {
					let wrap = $(this)[0].closest('.hide-on-succes');
					console.log(wrap);
					if (wrap) {
						$(wrap).siblings('.show-on-succes').show();
						$(wrap).hide();
					}
				}
				return false;
			});
		});
	};

	let reviewLine = function () {
		$('#js-review-line__inner .review-line__number').on('click', function () {
			let left = $(this).parent().position().left;
			$('#js-review-line').css('width', left - 1);

			$('#js-review-line__inner .review-line__item').removeClass('review-line__item--active');

			$(this).parent().addClass('review-line__item--active');
		});
	};

	let contactPopups = function () {
		$('.contacts-popup .contacts-popup__toggle').on('click', function () {
			let contactsParent = $(this).parent();
			contactsParent.addClass('contacts-popup--active');
		});

		$('.contacts-popup__close').on('click', function () {
			$(this).closest('.contacts-popup').removeClass('contacts-popup--active');
		});
	};

	productPrevSlider();
	sandwitch();
	locationChoose();
	popupLink();
	fileupload();
	formValidate();
	reviewLine();
	contactPopups();


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
		sliderElement.slick('unslick');
	}


};

$(window).on('resize', function () {
	popularCategoriesSlider();
});

if ($('div').is('.contacts-popup__map')) {
	ymaps.ready(function () {
		var myMap = new ymaps.Map('js-contacts-popup__map', {
			center: [55.751574, 37.573856],
			zoom: 9
		}, {
				searchControlProvider: 'yandex#search'
			}),

			myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
			}, {
					// Опции.
					// Необходимо указать данный тип макета.
					iconLayout: 'default#image',
					// Своё изображение иконки метки.
					iconImageHref: 'assets/i/placeholder.svg',
					// Размеры метки.
					iconImageSize: [76, 89],
					// Смещение левого верхнего угла иконки относительно
					// её "ножки" (точки привязки).
					iconImageOffset: [-5, -38]
				});

		myMap.geoObjects
			.add(myPlacemark)
	});
}
