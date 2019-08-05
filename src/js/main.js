export default class Main {
  constructor(){
      this.$window = $(window);
      this.$document = $(document);
      this.$loader = $('#loader');
      this.$slider = $('.slider');
      this.$sliderView = $('.slider__wrapper');
      this.$sliderTracker = $('.slider__tracker');
      this.count = 1;
  }
  setWidthHeight(){ //set height and width from json
    if(this.width > 100) {this.width = '100'}
    if(this.height > this.$window.height()) {this.height = this.$window.height();}
    this.$slider.width(this.width + '%');
    this.$slider.height(this.height + 'px');
  }
}