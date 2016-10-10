$(document).ready(function () {

   $("#swipper__slide").responsiveSlides({
        auto: true,
        speed: 500,
        timeout: 4000,
        pager: false,
        nav: true,
        random: false,
        pause: false,
        pauseControls: true,
        prevText: "<i class='fa fa-angle-left'></i>",
        nextText: "<i class='fa fa-angle-right'></i>"
    });

   $("#about__slide").responsiveSlides({
        auto: true,
        speed: 500,
        timeout: 5000,
        pager: false,
        nav: false,
        random: false,
        pause: false,
        pauseControls: false
    });

});
