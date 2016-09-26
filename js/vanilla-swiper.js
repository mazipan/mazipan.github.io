let slideIndex = 1;
let interval = null;

function doSlide(index) {
  showSlide(slideIndex += index);
  resetIntervalSlide();
}

function showSlide(index) {
  var allSlide = document.getElementsByClassName("swipper__img");

  if (index > allSlide.length) slideIndex = 1;
  if (index < 1) slideIndex = allSlide.length;

  for (var i = 0; i < allSlide.length; i++) {
  	
  	allSlide[i].classList.remove('swipper__img--show'); 
  	//allSlide[i].style.display = "none";	
  	
  }

  //allSlide[slideIndex-1].style.display = "block";  
  allSlide[slideIndex-1].classList.add('swipper__img--show');
}

function resetIntervalSlide(){
    clearInterval(interval);

    interval = setInterval(function(){

      doSlide(1);

    }, 5000);
}

// run auto play
setInterval(function(){

  doSlide(1);

}, 5000);
