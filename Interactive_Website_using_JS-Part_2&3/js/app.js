var main = function(){
    
    var menuDropdown = function(){
    $('.weather_forcast').toggle();
    }
    
    $('.dropdown-toggle').click(menuDropdown);
    
    var sliderEventEfect = function(){
        
        if(this.class == "arrow-next"){
        
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
            
        } else if(this.class == 'd1'){
            $('.robot').removeClass('active-slide');
            $('.r1').addClass('active-slide');
            $('.dot').removeClass('active-dot');
            $('.d1').addClass('active-dot');
            
            
        } else if(this.class == 'd2'){
            $('.robot').removeClass('active-slide')
            $('.r2').addClass('active-slide');
            $('.dot').removeClass('active-dot');
            $('.d2').addClass('active-dot');
            
        } else if(this.class == 'd3'){
            $('.robot').removeClass('active-slide');
            $('.r3').addClass('active-slide');
            $('.dot').removeClass('active-dot');
            $('.d3').addClass('active-dot');
            
        } else if(this.class == 'd4'){
            $('.robot').removeClass('active-slide');
            $('.r4').addClass('active-slide');
            $('.dot').removeClass('active-dot');
            $('.d4').addClass('active-dot');
            
        } else if(this.class == 'd5'){
            $('.robot').removeClass('active-slide');
            $('.r5').addClass('active-slide');
            $('.dot').removeClass('active-dot');
            $('.d5').addClass('active-dot');
            
        } else if(this.class == 'd6'){
            $('.robot').removeClass('active-slide');
            $('.r6').addClass('active-slide');
            $('.dot').removeClass('active-dot');
            $('.d6').addClass('active-dot');
            
        } else if(this.class == 'd7'){
            $('.robot').removeClass('active-slide');
            $('.r7').addClass('active-slide');
            $('.dot').removeClass('active-dot');
            $('.d7').addClass('active-dot');
            
        } else if(this.class == 'd8'){
            $('.robot').removeClass('active-slide');
            $('.r8').addClass('active-slide');
            $('.dot').removeClass('active-dot');
            $('.d8').addClass('active-dot');
            
        } else if(this.class == 'd9'){
            $('.robot').removeClass('active-slide');
            $('.r9').addClass('active-slide');
            $('.dot').removeClass('active-dot');
            $('.d9').addClass('active-dot');
            
        } else if(this.class == 'd10'){
            $('.robot').removeClass('active-slide');
            $('.r10').addClass('active-slide');
            $('.dot').removeClass('active-dot');
            $('.d10').addClass('active-dot');
            
        } else if(this.class == 'arrow-prev'){
        
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
        }
    }
    
    $('.slide').click(sliderEventEfect)
    
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
    
};

$(document).ready(main);