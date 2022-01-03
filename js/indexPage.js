"use strict";

$('.slider__block').slick({
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  dots: true
}); // кастомный select

var renderSelect = function renderSelect(selectClass, selectNumber) {
  $('.' + selectClass).each(function() {
    var _this = $(this),
      selectOption = _this.find('option'),
      selectOptionLength = selectOption.length,
      selectedOption = selectOption.filter(':selected'),
      duration = 450; // длительность анимации


    _this.hide();

    _this.wrap('<div class="size__select size__select--' + selectNumber + ' calculate-cost__form__select"></div>');

    $('<div>', {
      "class": 'size__input--select',
      text: _this.children('option:disabled').text()
    }).insertAfter(_this);

    var selectHead = _this.next('.size__input--select');

    var formDiagnosticsSelect = $('.size__select--' + selectNumber);
    $('<div>', {
      "class": 'size--select__list'
    }).insertAfter(selectHead);
    var selectList = selectHead.next('.size--select__list');

    for (var i = 1; i < selectOptionLength; i++) {
      $('<div>', {
        "class": 'size--select__item',
        html: $('<span>', {
          text: selectOption.eq(i).text()
        })
      }).attr('data-value', selectOption.eq(i).val()).appendTo(selectList);
    }

    var selectItem = selectList.find('.size--select__item');
    selectList.slideUp(0);
    formDiagnosticsSelect.on('click', function() {
      if (!$(this).hasClass('on')) {
        $('.size--select__list').slideUp();
        $('.calculate-cost__form__select').removeClass('on');
        $(this).addClass('on');
        selectList.slideDown(duration);
        selectItem.on('click', function() {
          var chooseItem = $(this).data('value');
          $('select').val(chooseItem).attr('selected', 'selected');
          selectHead.text($(this).find('span').text());
          selectList.slideUp(duration);
          selectHead.removeClass('on');
        });
      } else {
        $(this).removeClass('on');
        selectList.slideUp(duration);
      }
    });
  });
};

renderSelect('_calculate-cost__form__select--custom-first', 'first');
renderSelect('_calculate-cost__form__select--custom-second', 'second');
renderSelect('_calculate-cost__form__select--custom-five', 'five');
renderSelect('_calculate-cost__form__select--custom-6', '6');
renderSelect('_calculate-cost__form__select--custom-7', '7');
renderSelect('_calculate-cost__form__select--custom-8', '8');
renderSelect('_calculate-cost__form__select--custom-9', '9');
renderSelect('_delivery__products__form__select', 'third');
ymaps.ready(init);

function init() {
  var myMap = new ymaps.Map("map", {
    center: [55.219000, 37.270213],
    zoom: 17,
    controls: ['smallMapDefaultSet']
  }, {
    searchControlProvider: 'yandex#search'
  });

  if (window.matchMedia("(max-width: 1500px)").matches) {
    myMap.setCenter([55.219900, 37.268000]);
  };

  if (window.matchMedia("(max-width: 992px)").matches) {
    myMap.setCenter([55.220000, 37.270000]);
  };

  if (window.matchMedia("(max-width: 767px)").matches) {
    myMap.setCenter([55.220000, 37.270000]);
    myMap.behaviors //  - drag - перемещение карты при нажатой левой кнопки мыши;
      //  - magnifier.rightButton - увеличение области, выделенной правой кнопкой мыши.
      .disable('scrollZoom'); // myMap.behaviors.disable('multiTouch');

    myMap.behaviors.disable('drag');
  }

  ; // Создаем геообъект с типом геометрии "Точка".

  var myGeoObject = new ymaps.GeoObject({
    // Описание геометрии.
    geometry: {
      type: "Point",
      coordinates: [55.2193, 37.270300]
    }

  }, {
    // Иконка метки будет растягиваться под размер ее содержимого.
    // Метку можно перемещать.
    draggable: false,
    // Необходимо указать данный тип макета.
    iconLayout: 'default#image',
    // Своё изображение иконки метки.
    iconImageHref: 'images/icon/place.png',
    // iconImageHref: 'images/icon/123.png',
    // Размеры метки.
    iconImageSize: [94, 48 // 5,5
    ],
    // Смещение левого верхнего угла иконки относительно
    // её "ножки" (точки привязки).
    iconImageOffset: [-50, -48]
  });
  myMap.behaviors // Отключаем часть включенных по умолчанию поведений:
    .disable('scrollZoom'); // .disable('drag');

  myMap.geoObjects.add(myGeoObject); // myMap.geoObjects.add(myPlacemark)
} // плавная прокрутка к анкору


$("a[href^='#']").click(function() {
  event.preventDefault();

  var _goto = $($(this).attr("href"));

  $('html,body').stop().animate({
    scrollTop: $(_goto).offset().top
  }, 1500, 'swing');

  if ($(this).attr("href") == "#calculate-cost") {
    _goto.find('input[name="name"]').focus();
  }

});
// показываем список марок для выбранной продукции

$('#sand_concrete').parent().hide();
var selectItem = $('.size__select--first').find('.size--select__item');
selectItem.on('click', function() {
  var chooseItem = $(this).data('value');
  $('input[name="brand_select"]').val('');

  if (chooseItem == 'concrete') {
    $('#concrete').parent().find('.size__input--select').text('Выберите марку');
    $('#concrete').parent().show();
    $('#sand_concrete').parent().hide();
  } else {
    $('#sand_concrete').parent().find('.size__input--select').text('Выберите марку');
    $('#sand_concrete').parent().show();
    $('#concrete').parent().hide();
  }
});
$('._modal__button-close').click(function(event) {
  $('._modal').fadeOut();

  if ($('.size--select__list').is(':visible')) {
    $('.size__select--9').click();
  }
}); // Клик заказать звонок в header

$('._user-nav__button').click(function() {
  $('._modal').fadeOut(); // $('#').find('._another_title').text('Оставьте заявку на расчет');
  // $('#').find('._another_description--top').hide();

  $('#modal_user').fadeIn();
});
$('._find_out_cost').click(function() {
  $('._modal').fadeOut();
  $('#modal_price').fadeIn();
});
$('._submit_your_application').click(function() {
  $('._modal').fadeOut();
  $('#modal_light').find('._another_title').text('Оставьте заявку');
  $('#modal_light').find('._another_description--top').show();
  $('#modal_light').fadeIn();
}); //маска телефона

$('input[name="phone"]').mask('9 (999) 999-99-99');
$('#button__privacy-policy').click(function() {
  event.preventDefault();
  $('._modal').fadeOut();
  $('#privacy-policy').fadeIn();
});