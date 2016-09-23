let slideIndex = 1;
showDivs(slideIndex);

let interval = setInterval(function(){
	plusDivs(1);
}, 5000);

function resetIntervalSlide(){
  	clearInterval(interval);
	interval = setInterval(function(){
		plusDivs(1);
	}, 5000);
}

function plusDivs(n) {
  showDivs(slideIndex += n);
  resetIntervalSlide();
}

function showDivs(n) {
  var i, x = document.getElementsByClassName("swipper__img");

  if (n > x.length) slideIndex = 1;

  if (n < 1) slideIndex = x.length;

  for (i = 0; i < x.length; i++) {
  	
	x[i].classList.remove('swipper__img--show'); 
	x[i].style.display = "none";	
  	
  }

  x[slideIndex-1].style.display = "block";  
  x[slideIndex-1].classList.add('swipper__img--show');
}