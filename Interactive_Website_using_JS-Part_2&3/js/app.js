var main = function(){
    $('.dropdown-toggle').click(function(){
    $('.weather_forcast').toggle();
    });
    
    $('.arrow-next').click(function(){
        
        var currentSlide = $('.active-slide');
        var nextSlide = currentSlide.next();
        
        if(nextSlide.length === 0){
            nextSlide = $('.robot').first();
        }
        
        currentSlide.removeClass('active-slide');
        nextSlide.addClass('active-slide');
        
        var currentDot = $('.active-dot');
        var nextDot = currentDot.next();
        
        if(nextDot.length === 0){
            nextDot = $('.dot').first();
        }
        
        currentDot.removeClass('active-dot');
        nextDot.addClass('active-dot');
    });
    
    $('.arrow-prev').click(function(){
        
        var currentSlide = $('.active-slide');
        var nextSlide = currentSlide.prev();
        
        if(nextSlide.length === 0){
            nextSlide = $('.robot').last();
        }
        
        currentSlide.removeClass('active-slide');
        nextSlide.addClass('active-slide');
        
        var currentDot = $('.active-dot');
        var nextDot = currentDot.prev();
        if(nextDot.length === 0){
            nextDot = $('.dot').last();
        }
        currentDot.removeClass('active-dot');
        nextDot.addClass('active-dot');
    });
    
    $('.button').click(function() {
        var post = $('.form').val();

        $('<li>').text(post).prependTo('.posts');
        $('.form').val('');
        $('.counter').text('200');
        $('.button').addClass('disabled'); 
    });
  
    $('.form').keyup(function() {
        var postLength = $(this).val().length;
        var charactersLeft = 200 - postLength;
        $('.counter').text(charactersLeft);

        if(charactersLeft < 0) {
          $('.button').addClass('disabled'); 
        }
        else if(charactersLeft == 200) {
          $('.button').addClass('disabled');
        }
        else {
          $('.button').removeClass('disabled');
        }
    });
  
    $('.button').addClass('disabled');
    
    $('robota h1').click(function() {
        setInterval(function(){ 
            $('.robot').fadeOut(10)
            .next()
            .fadeIn(10)
            .end()
            .appendTo('.robot'); 
        }, 1000);
    });
    
};

$(document).ready(main);