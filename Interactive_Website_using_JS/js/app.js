var main = function() {
    $('.close_ikon').click(function() {
        $('.menu').hide();
        $('.top_wraper').show();
});
    
    $('.top_wraper').click(function() {
        $('.menu').show();
        $('.top_wraper').hide();
});
    
    $('h3').click(function() {
        $('h3').removeClass('current');
        $('p').hide();

        $(this).addClass('current');
        $(this).next('p').show();
});

  $(document).keypress(function(event) {
      if(event.which === 111) {
          $('p').hide();
          $('.current').next('p').show();
}

      else if(event.which === 110) {
          var currentArticle = $('.current');
          var nextArticle = currentArticle.next('h3');
      
          currentArticle.removeClass('current');
          nextArticle.addClass('current');
    }
  });
}

$(document).ready(main);

$(this).find('h3').toggleClass('current');
