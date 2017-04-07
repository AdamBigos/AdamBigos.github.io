var main = function(){
    var leftOnesHandler = function(){
        $('.highlighted').removeClass('highlighted');
        $('.left').addClass('highlighted');
    }
    
    var rightOnesHandler = function(){
        $('.highlighted').removeClass('highlighted');
        $('.right').addClass('highlighted');
    }
    
    var mouseenterHandler = function(){
        $(this).find('#price_top').animate({'opacity': '1'},'fast');
    }
    
    var mouseleaveHandler = function(){
        $(this).find('#price_top').animate({'opacity': '0'},'fast');
    }
    
    var keyupHandler = function(){
        var instalments = +$(this).closest('.offer').data('price');
        var monthsCounter = +$(this).val();
        $(this).closest('.offer').find('#instalments').text(instalments / monthsCounter);
    }
    
    var changeHandler = function(){
        var instalments = +$(this).closest('.offer').data('price');
        var monthsCounter = +$(this).val();
        $(this).closest('.offer').find('#instalments').text(instalments / monthsCounter);
    }
    
    var detailsHandler = function(){
        $('.highlighted').removeClass('highlighted');
        $(this).closest('.offer').addClass('highlighted');
        $(this).closest('.offer').find('.details').toggle();
    }
    
    $('.menu').on('click','.leftOnes', leftOnesHandler);
    
    $('.menu').on('click','.rightOnes', rightOnesHandler);
    
    $('.offer').on('mouseenter', mouseenterHandler);
    
    $('.offer').on('mouseleave', mouseleaveHandler);
    
    $('.offer').on('keyup', '#quantity', keyupHandler);
    
    $('.offer').on('change', '#quantity', changeHandler);
    
    $('.offer').on('click', '.image_wraper', detailsHandler);
    
}

$(document).ready(main);