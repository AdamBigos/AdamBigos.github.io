var main = function() {
    $('.top_wraper').click(function() {
    ('.menu').show();
   });
    
    $('.icon_close').click(function() {
    ('.menu').hide();
   });
    
  $('.title_row').click(function() {
    $('.title_row').removeClass('current');
    $('.description_row').hide();

    $(this).addClass('current');
    $(this).children('.description_row').show();
  });

  $(document).keypress(function(event) {
    if(event.which === 111) {
      $('.description_row').hide();

      $('.current').children('.description_row').show();
    }

    else if(event.which === 110) {
      var currentArticle = $('.current');
      var nextArticle = currentArticle.next();
      
      currentArticle.removeClass('current');
      nextArticle.addClass('current');
    }
  });
}

$(document).ready(main);