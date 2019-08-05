import Main from './main.js';

export default class Renderer extends Main {
  renderSlides(){ // For each object in json slider append to html slider wrapper tag
    this.$slider.show();
    for(let i = 0; i < this.sliders.length; i++){
      this.$sliderView.append(
        `<div class = "slider__img" style = "background-image:url(${this.sliders[i].src})">
          <div class ="slider__box">
            <div class = "slider__info">
              <h2 class = "slider__title">
                ${this.sliders[i].title}
              </h2>
              <div class ="slider__text--wrapper">
                <h5 class = "slider__text">
                  ${this.sliders[i].text}
                </h5>
              </div>
              <button class = "slider__link">
                ${this.sliders[i].btn}
              </button>
            </div>
          </div>
        </div>`
      );
      this.$sliderTracker.append(
        `<span class = "trackers"></span>`
      );
    }
  }

  showFirstSlide(){ // Show the first slider 
    $(".slider__wrapper > div:gt(0)").hide();
    $(".slider__wrapper > div:first").find('.slider__title').animate({marginTop:'0px'}, 1000);
    $(".slider__wrapper > div:first").find('.slider__text--wrapper').delay(this.fadeTime).animate({marginLeft:'0px'}, 1000);
    $(".slider__wrapper > div:first").find('.slider__link').delay(this.fadeTime*2).animate({opacity:'1'}, this.fadeTime);
    $(".trackers:first").css('background-color','#09C');
  }

  runSlides(){ //slide animation function
    $('.slider__wrapper > div:first').fadeOut(this.fadeTime, ()=> {
      $('.slider__title').animate({marginTop:'-999px'});
      $('.slider__text--wrapper').delay(this.fadeTime).animate({marginLeft:'3999px'});
      $('.slider__link').delay(this.fadeTime).animate({opacity:'0'});
      if(this.count === this.sliders.length){
        $($('.slider__tracker span')[0]).delay(this.fadeTime).css('background-color', '#09C');
      } else{
        $($('.slider__tracker span')[0]).delay(this.fadeTime).css('background-color', '#242424');
      }
      $($('.slider__tracker span')[this.count-1]).delay(this.fadeTime).css('background-color', '#242424');
      $($('.slider__tracker span')[this.count]).delay(this.fadeTime).css('background-color', '#09C');
      this.count < this.sliders.length ? this.count++ : this.count = 1;
    })
      .next()
      .delay(this.fadeTime)
      .fadeIn(this.fadeTime, ()=>{
      $('.slider__title').animate({marginTop:'0px'}, 1000);
      $('.slider__text--wrapper').delay(this.fadeTime).animate({marginLeft:'0px'}, 1000);
      $('.slider__link').delay(this.fadeTime*2).animate({opacity:'1'}, this.fadeTime);
    })
      .end()
      .appendTo('.slider__wrapper');
  }
}