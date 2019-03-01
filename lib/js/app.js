"use strict";

(function () {
  'use strict';

  function getData() {
    return $.getJSON('data.json');
  }

  $.when(getData()).then(function (data) {
    var app = {
      init: function init() {
        this.$window = $(window);
        this.$document = $(document);
        this.$loader = $('#loader');
        this.$loader.hide();
        this.$slider = $('.slider');
        this.$sliderView = $('.slider__wrapper');
        this.$sliderTracker = $('.slider__tracker');
        this.count = 1;
        this.fadeTime = data.speed;
        this.width = data.width;
        this.height = data.height;
        this.sliders = data.sliders;
        this.renderSlides();
        this.setWidthHeight();
        setInterval(this.runSlides.bind(this), this.fadeTime * 6);
        this.$sliderDivgt = $(".slider__wrapper > div:gt(0)");
        this.$sliderDivFirst = $(".slider__wrapper > div:first");
        this.$sliderTitle = $('.slider__title');
        this.$sliderText = $('.slider__text--wrapper');
        this.$sliderLink = $('.slider__link');
        this.$trackerFirst = $(".trackers:first");
        this.$trackerSpan = $('.slider__tracker span');
        this.showFirstSlide();
      },
      setWidthHeight: function setWidthHeight() {
        //set height and width from json
        if (this.width > 100) {
          this.width = '100';
        }

        if (this.height > this.$window.height()) {
          this.height = this.$window.height();
        }

        this.$slider.width(this.width + '%');
        this.$slider.height(this.height + 'px');
      },
      renderSlides: function renderSlides() {
        // For each object in json slider append to html slider wrapper tag
        this.$slider.show();

        for (var i = 0; i < this.sliders.length; i++) {
          this.$sliderView.append("<div class = \"slider__img\" style = \"background-image:url(".concat(this.sliders[i].src, ")\">\n              <div class =\"slider__box\">\n                <div class = \"slider__info\">\n                  <h2 class = \"slider__title\">\n                    ").concat(this.sliders[i].title, "\n                  </h2>\n                  <div class =\"slider__text--wrapper\">\n                    <h5 class = \"slider__text\">\n                      ").concat(this.sliders[i].text, "\n                    </h5>\n                  </div>\n                  <button class = \"slider__link\">\n                    ").concat(this.sliders[i].btn, "\n                  </button>\n                </div>\n              </div>\n            </div>"));
          this.$sliderTracker.append("<span class = \"trackers\"></span>");
        }
      },
      showFirstSlide: function showFirstSlide() {
        // Show the first slider 
        this.$sliderDivgt.hide();
        this.$sliderDivFirst.find(this.$sliderTitle).animate({
          marginTop: '0px'
        }, 1000);
        this.$sliderDivFirst.find(this.$sliderText).delay(this.fadeTime).animate({
          marginLeft: '0px'
        }, 1000);
        this.$sliderDivFirst.find(this.$sliderLink).delay(this.fadeTime * 2).animate({
          opacity: '1'
        }, this.fadeTime);
        this.$trackerFirst.css('background-color', '#09C');
      },
      runSlides: function runSlides() {
        var _this = this;

        //slide animation fucntion
        var self = this;
        $('.slider__wrapper > div:first').fadeOut(this.fadeTime, function () {
          $(_this).find(_this.$sliderTitle).animate({
            marginTop: '-999px'
          });
          $(_this).find(_this.$sliderText).delay(_this.fadeTime).animate({
            marginLeft: '3999px'
          });
          $(_this).find(self.$sliderLink).delay(self.fadeTime * 2).animate({
            opacity: '0'
          });

          if (self.count === self.sliders.length) {
            $(self.$trackerSpan[0]).delay(self.fadeTime).css('background-color', '#09C');
          } else {
            $(self.$trackerSpan[0]).delay(self.fadeTime).css('background-color', '#242424');
          }

          $(self.$trackerSpan[self.count - 1]).delay(self.fadeTime).css('background-color', '#242424');
          $(self.$trackerSpan[self.count]).delay(self.fadeTime).css('background-color', '#09C');
          self.count < self.sliders.length ? self.count++ : self.count = 1;
        }).next().delay(this.fadeTime).fadeIn(this.fadeTime, function () {
          $(this).find(self.$sliderTitle).animate({
            marginTop: '0px'
          }, 1000);
          $(this).find(self.$sliderText).delay(self.fadeTime).animate({
            marginLeft: '0px'
          }, 1000);
          $(this).find(self.$sliderLink).delay(self.fadeTime * 2).animate({
            opacity: '1'
          }, self.fadeTime);
        }).end().appendTo('.slider__wrapper');
      }
    };
    $(window).on('load', function () {
      app.init();
    });
  });
})();