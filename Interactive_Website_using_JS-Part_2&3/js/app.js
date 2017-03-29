var main = function(){
    
    var menuDropdown = function(){
        $('.weather_forcast').toggle();
        }
    
    $('.dropdown-toggle').click(menuDropdown);
    
    
    var arrowEvent = function(){
        
        var currentSlide = $('.active-slide');
        var nextSlide = currentSlide.next();
        var prevSlide = currentSlide.prev();
        
        currentSlide.removeClass('active-slide');
        
        var currentDot = $('.active-dot');
        var nextDot = currentDot.next();
        var prevDot = currentDot.prev();
        
        currentDot.removeClass('active-dot');
        
        if(this.id == 'next'){
            
            if(nextSlide.length === 0){
            nextSlide = $('.robot').first();
            }
            
            nextSlide.addClass('active-slide');
            
            if(nextDot.length === 0){
            nextDot = $('.dot').first();
            }
            
            nextDot.addClass('active-dot');
        }
        
        if(this.id == 'prev'){
            
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
    
    $('.arrow').click(arrowEvent);

    var dotEvent = function() {
        
        $('.robot').removeClass('active-slide');
        $('.dot').removeClass('active-dot');
        
        $(this).addClass('active-dot');
        $('.robot[data-order='+this.dataset.order+']').addClass('active-slide');
    }
    
    $('.dot').click(dotEvent);
    
    var buttonEvent = function() {
        var post = $('.form').val();

        $('<li>').text(post).prependTo('.posts');
        $('.form').val('');
        $('.counter').text('200');
        $('.button').addClass('disabled'); 
    }
    
    $('.button').click(buttonEvent);
    
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
    
  
    $('.form').keyup(formEvent);
  
    $('.button').addClass('disabled');
    
}

$(document).ready(main);