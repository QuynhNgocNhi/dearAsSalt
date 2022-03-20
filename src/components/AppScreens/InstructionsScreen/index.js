import React, { Component } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import instructionimg1 from "contents/images/instructions-screen1.png";
import instructionimg2 from "contents/images/instructions-screen2.png";
//import 'contents/styles/components/_instructions.scss';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
export default class InstructionsScreen extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: false,
      arrows: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      initialSlide: 0,
    };
    return (
      <div
        className="sas__blankpaper instructions"
        style={{ height: window.innerHeight }}
      >
        <div className="sas__instructions">
          <Slider {...settings}>
            <div>
              <img src={instructionimg1} className="instructions__one" />
            </div>
            <div>
              <img src={instructionimg2} className="instructions__two" />
            </div>
          </Slider>
        </div>
      </div>
    );
  }
}
