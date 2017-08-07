(function () {

 function getData() {
  return $.getJSON('data.json');
 }

 $(document).ready(function(){
 
  $.when(getData()).then(function (data) {

     var sliderView = $('.slider__wrapper');
     var sliderTracker = $('.slider__tracker');
     var _count = 1; 
     var fadeTime = 1500; // Change this to adjust speed
     var sliders = data;


    // For each object in json slider append to html slider wrapper tag

     for(var i = 0; i < sliders.length; i++){
       sliderView.append('<div class = "slider__img" style = "background-image:url(' + sliders[i].src + ')"><div class ="slider__box"><div class = "slider__info"><h2 class = "slider__title"> ' + sliders[i].title + ' </h2><div class ="slider__text--wrapper"><h5 class = "slider__text">' + sliders[i].text + '</h5></div><button class = "slider__link">' + sliders[i].btn +'</button></div></div></div>');
       sliderTracker.append('<span class = "trackers"></span>');
    }

    // Show the first slider

    $(".slider__wrapper > div:gt(0)").hide();
    $(".slider__wrapper > div:first").find('.slider__title').animate({marginTop:'0px'}, 1000);
    $(".slider__wrapper > div:first").find('.slider__text--wrapper').delay(fadeTime).animate({marginLeft:'0px'}, 1000);
    $(".slider__wrapper > div:first").find('.slider__link').delay(fadeTime*2).animate({opacity:'1'}, fadeTime);
    $(".trackers:first").css('background-color','#09C');
           
    //slide animation fucntion

    setInterval(function() { 
      $('.slider__wrapper > div:first')
          .fadeOut(fadeTime, function(){
				$(this).find('.slider__title').animate({marginTop:'-350px'});
				$(this).find('.slider__text--wrapper').delay(fadeTime).animate({marginLeft:'3999px'});
				$(this).find('.slider__link').delay(fadeTime*2).animate({opacity:'0'});
				if(_count == sliders.length){
			     	  $($('.slider__tracker span')[0]).delay(fadeTime).css('background-color', '#09C');
      			 	} else{
			     	  $($('.slider__tracker span')[0]).delay(fadeTime).css('background-color', '#242424');
      			 	}
      			 	$($('.slider__tracker span')[_count-1]).delay(fadeTime).css('background-color', '#242424');
      			 	$($('.slider__tracker span')[_count]).delay(fadeTime).css('background-color', '#09C');
      			 	_count < sliders.length ? _count++ : _count = 1;
				})
          .next()
          .delay(fadeTime)
          .fadeIn(fadeTime, function(){
				$(this).find('.slider__title').animate({marginTop:'0px'}, 1000);
				$(this).find('.slider__text--wrapper').delay(fadeTime).animate({marginLeft:'0px'}, 1000);
				$(this).find('.slider__link').delay(fadeTime*2).animate({opacity:'1'}, fadeTime);
				})
          .end()
	  .appendTo('.slider__wrapper');

    }, fadeTime*6);

  })

 });

})();
