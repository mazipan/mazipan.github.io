$(window).load(function(){
    'use strict';    
    var parent = $('.portofolio__box-inner');
    parent.isotope({
        itemSelector : '.portofolio__box-item',
        layoutMode : 'fitRows'
    });
    
    var item = $('.portofolio__tab-item');
    item.on('click', function(){
        item.removeClass('portofolio__tab-item--active');
        $(this).addClass('portofolio__tab-item--active');

        var selector = $(this).attr('data-filter');
        parent.isotope({ filter: selector });
        return false;
    });

});