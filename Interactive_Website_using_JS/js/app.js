var main = function() {
    $('.close_ikon').click(function() {
        $('.menu').hide();
        $('.top_wraper').show();
    });
    
    $('.top_wraper').click(function() {
        $('.menu').show();
        $('.top_wraper').hide();
    });
    
    $('.article').click(function() {
        $('.article').removeClass('current');
        $('p').hide();

        $(this).addClass('current');
        $(this).children().show();
    });

    $(document).keypress(function(event) {
        if(event.which === 111) {
            $('p').hide();
            $('.current').children('p').toggle();
        }

        else if(event.which === 110) {
            var currentArticle = $('.current');
            var nextArticle = $('.current').next();
      
            currentArticle.removeClass('current');
            nextArticle.addClass('current');
        }
        else if(event.which === 112){
            var currentArticle = $('.current');
            var previueArticle = $('.current').prev();
          
            currentArticle.removeClass('current');
            previueArticle.addClass('current');
        }
    });
}

$(document).ready(main);
