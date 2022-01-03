$('._site-nav__list').find('a').on('click', function() {
  if ($('._site-nav__burger-checkbox').is(':checked')){
    $('._site-nav__burger-checkbox').click();
  }
})
