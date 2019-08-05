import _ from 'lodash';
import './css/style.css';
import Main from './js/main.js';
import Data from './js/data.js';
import Renderer from './js/renderer.js';

let data = new Data();
$(window).on("load", ()=> {
  let main = new Main();
  $.when(data.getData()).then((data)=> {
    let renderer = new Renderer();
    main.$loader.hide();
    main.setWidthHeight();
    renderer.fadeTime = data.speed; 
    renderer.width = data.width;
    renderer.height = data.height;
    renderer.sliders = data.sliders;
    renderer.renderSlides();
    setInterval(()=>{renderer.runSlides()}, renderer.fadeTime*6);
    renderer.showFirstSlide();
  })
});