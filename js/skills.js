$(document).ready(function () {

    $('.skills__content-wrapper')
        .bind('inview', 
            function(event, visible, visiblePartX, visiblePartY) {

        setAndAnimateSkills();

    });
        

});

function setAndAnimateSkills(){
    $('.skills__content-wrapper')
        .children('.skills__item')
        .each(function(index){
            let progress = $(this).find('.skills__item-progress-fill');
            let value = progress.attr('data-value');

            if(value){
                var elmValue = $(this).find('.skills__item-progress-value');
                doSetProgress($(progress), elmValue, value);
            }
            
        }); 

    function doSetProgress(elmProgress, elmValue, value){
        var intValue = parseInt(value), 
            widthNow = 0, 
            interval = setInterval(setValue, 10);

        function setValue(){
            if(widthNow >= intValue){
                clearInterval(interval);
            }else{
                widthNow++;
                elmProgress.css("width", widthNow + "%");
                elmValue.html(widthNow + "%");
            }
        }
    }
}
