
const selectItem_modal_light = $('#modal_light').find('.size--select__item');

selectItem_modal_light.on('click', function () {
  const chooseItem = $(this).data('value');
  $('input[name="products_select"]').val(chooseItem);
});

$("#modal_light_form").on("submit", function(){
  event.preventDefault();

let validate = false;
  switch ('') {
    case $('#modal_light').find('input[name="name"]').val():
      alert( 'Введите имя' );
      break;
    case $('#modal_light').find('input[name="phone"]').val():
      alert( 'Введите телефон' );
      break;
    case $('#modal_light').find('input[name="products_select"]').val():
      alert( 'Выберите продукцию' );
      break;
    default:
      validate = true;
  }

  if(validate) {
   $('.loading').removeClass('visually-hidden');
    $.ajax({
      url: 'admin/mail.php',
      method: 'post',
      dataType: 'html',
      data: $(this).serialize(),
      success: function(data) {
        $('.loading').addClass('visually-hidden');

        $('#modal_light').fadeOut();
        $('#modal_success').fadeIn();
        setTimeout(function(){
          $('#modal_success').fadeOut();
        }, 1500);
      }
    });
  }

});


$("#modal_user_form").on("submit", function(){
  event.preventDefault();

let validate = false;
  switch ('') {
    case $('#modal_user_form').find('input[name="name"]').val():
      alert( 'Введите имя' );
      break;
    case $('#modal_user_form').find('input[name="phone"]').val():
      alert( 'Введите телефон' );
      break;
    default:
      validate = true;
  }

  if(validate) {
   $('.loading').removeClass('visually-hidden');
    $.ajax({
      url: 'admin/mail.php',
      method: 'post',
      dataType: 'html',
      data: $(this).serialize(),
      success: function(data) {
        $('.loading').addClass('visually-hidden');

        $('#modal_user').fadeOut();
        $('#modal_success').fadeIn();
        setTimeout(function(){
          $('#modal_success').fadeOut();
        }, 1500);
      }
    });
  }

});




const selectItem_first = $('.size__select--first').find('.size--select__item');

selectItem_first.on('click', function () {
  const chooseItem = $(this).data('value');
  $('#calculate-cost_form').find('input[name="products_select"]').val(chooseItem);
});


const selectItem_second = $('.size__select--second').find('.size--select__item');

selectItem_second.on('click', function () {
  const chooseItem = $(this).data('value');
  $('#calculate-cost_form').find('input[name="brand_select"]').val(chooseItem);
  console.log(  $('#calculate-cost_form').find('input[name="brand_select"]').val())
});


const selectItem_five = $('.size__select--five').find('.size--select__item');

selectItem_five.on('click', function () {
  const chooseItem = $(this).data('value');
  $('#calculate-cost_form').find('input[name="brand_select"]').val(chooseItem);
});



$("#calculate-cost_form").on("submit", function(){
  event.preventDefault();

let validate = false;
  switch ('') {
    case $('#calculate-cost_form').find('input[name="name"]').val():
      alert( 'Введите имя' );
      break;
    case $('#calculate-cost_form').find('input[name="products_select"]').val():
      alert( 'Выберите продукцию' );
      break;
    case $('#calculate-cost_form').find('input[name="brand_select"]').val():
      alert( 'Выберите марку' );
      break;
    case $('#calculate-cost_form').find('input[name="volume"]').val():
      alert( 'Укажите объем' );
      break;
    case $('#calculate-cost_form').find('input[name="phone"]').val():
      alert( 'Введите телефон' );
      break;
    default:
      validate = true;
  }

  if(validate) {
    $('.loading').removeClass('visually-hidden');

    $.ajax({
      url: 'admin/mail.php',
      method: 'post',
      dataType: 'html',
      data: $(this).serialize(),
      success: function(data) {
        $('.loading').addClass('visually-hidden');

        $('#modal_success').fadeIn();
        setTimeout(function(){
          $('#modal_success').fadeOut();
        }, 1500);
      }
    });
  }

});





const selectItem_products_footer_form = $('#delivery__products__footer__form').find('.size--select__item');

selectItem_products_footer_form.on('click', function () {
  const chooseItem = $(this).data('value');
  $('input[name="products_select"]').val(chooseItem);
});

$("#delivery__products__footer__form").on("submit", function(){
  event.preventDefault();

let validate = false;
  switch ('') {
    case $('#delivery__products__footer__form').find('input[name="name"]').val():
      alert( 'Введите имя' );
      break;
    case $('#delivery__products__footer__form').find('input[name="phone"]').val():
      alert( 'Введите телефон' );
      break;
    case $('#delivery__products__footer__form').find('input[name="products_select"]').val():
      alert( 'Выберите продукцию' );
      break;
    default:
      validate = true;
  }

  if(validate) {
    $('.loading').removeClass('visually-hidden');

    $.ajax({
      url: 'admin/mail.php',
      method: 'post',
      dataType: 'html',
      data: $(this).serialize(),
      success: function(data) {
        $('.loading').addClass('visually-hidden');

        $('#modal_success').fadeIn();
        setTimeout(function(){
          $('#modal_success').fadeOut();
        }, 1500);
      }
    });
  }

});




$("#main-footer__form").on("submit", function(){
  event.preventDefault();

let validate = false;
  switch ('') {
    case $('#main-footer__form').find('input[name="name"]').val():
      alert( 'Введите имя' );
      break;
    case $('#main-footer__form').find('input[name="email"]').val():
      alert( 'Введите Email' );
      break;
    default:
      validate = true;
  }

  if(validate) {
    $('.loading').removeClass('visually-hidden');

    $.ajax({
      url: 'admin/mail.php',
      method: 'post',
      dataType: 'html',
      data: $(this).serialize(),
      success: function(data) {
        $('.loading').addClass('visually-hidden');

        $('#modal_success').fadeIn();
        setTimeout(function(){
          $('#modal_success').fadeOut();
        }, 1500);
      }
    });
  }

});
