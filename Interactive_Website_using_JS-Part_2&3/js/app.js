var menuDropdown = function(){
        $('.weather_forcast').toggle();
}

var arrowClickHandler = function(){
        
        var currentSlide = $('.active-slide');
        
        currentSlide.removeClass('active-slide');
        
        var currentDot = $('.active-dot');
        
        currentDot.removeClass('active-dot');
        
        if(this.id == 'next'){
            var nextSlide = currentSlide.next();
            var nextDot = currentDot.next();
            
            if(nextSlide.length === 0){
            nextSlide = $('.robot').first();
            }
            
            nextSlide.addClass('active-slide');
            
            if(nextDot.length === 0){
            nextDot = $('.dot').first();
            }
            
            nextDot.addClass('active-dot');
            
        } else if(this.id == 'prev'){
            var prevSlide = currentSlide.prev();
            var prevDot = currentDot.prev();
            
            if(prevSlide.length === 0){
            prevSlide = $('.robot').last();
            }
            
            prevSlide.addClass('active-slide');
            
            if(prevDot.length === 0){
            prevDot = $('.dot').last();
            }
            
            prevDot.addClass('active-dot');
        }
}

var dotClickHandler = function() {
        
        $('.robot').removeClass('active-slide');
        $('.dot').removeClass('active-dot');
        
        var kimono = this.dataset.order;
        $(this).addClass('active-dot');
        $('.robot[data-order='+kimono+']').addClass('active-slide');
}

var buttonEvent = function() {
        var post = $('.form').val();

        $('<li>').text(post).prependTo('.posts');
        $('.form').val('');
        $('.counter').text('200');
        $('.button').addClass('disabled'); 
}

var formEvent = function() {
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
}

var main = function(){
    
    $('.dropdown-toggle').click(menuDropdown);
    
    $('.arrow').click(arrowClickHandler);

    $('.dot').click(dotClickHandler);
    
    $('.button').click(buttonEvent);
    
    $('.form').keyup(formEvent);
  
    $('.button').addClass('disabled');
    
}

$(document).ready(main);
