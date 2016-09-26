$(window).load(function(){
    'use strict';

    function showOffCanvas(){
          $('body').addClass("site--overflow-hidden");
          $('.offcanvas').show();   
          $('.header__nav-btn').addClass("header__nav-btn--close");
    }

    function hideOffCanvas(){
          $('body').removeClass("site--overflow-hidden");
          $('.offcanvas').hide();
          $('.header__nav-btn').removeClass("header__nav-btn--close");
    }

    $("#menu-toggle").on('click', function(evt){

          if($('body').hasClass("site--overflow-hidden")){

              hideOffCanvas();

          }else{

              showOffCanvas();    

          }

    });

    $('.offcanvas li').on('click ', function(evt){
          hideOffCanvas();
    });

});