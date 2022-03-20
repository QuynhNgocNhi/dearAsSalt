import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import '../../contents/styles/porfolio/styles.scss';
import '../../contents/styles/porfolio/port-about.scss';
import oiilogo from '../../contents/images/porfolio/oii-logo.png';
import oiisocial from '../../contents/images/porfolio/social.png';
import oiiprofile from '../../contents/images/porfolio/sas-profile.png';
import PortfolioNavbar from 'porfolio/PortfolioNavbar';
export default class PorfolioAbout extends Component {
  render() {
    return (
      <div className="porfolio">
        <PortfolioNavbar />
        <div className="porfolio__about">
          <div className="container">
            <div className="row">
              <div className="col-12 col-md-8">
                <h1>HI THERE!</h1>
              </div>
              <div className="col-12 col-md-8">
                <div>
                  OI! is an independent design studio of a designer with specialties in graphic design,UI/UX and illustration based in Milan. The approach is simple, a genuine interest in the people and communication leads to thoughtful and relevant design outcomes.
            </div>
                <div>
                  (i) Without any specific meaning in Vietnamese, but “oi” somehow becomes the most commonly used word in communication. It can be used both ways: calling and answering in order to show familiarity in the relationship between people.
            </div>
              </div>
            </div>
          </div>
          {/* <div className="content__social">
            <img src={oiisocial} />
          </div> */}
          {/* <div className="content__coming">
            coming soon
          </div> */}
        </div>
      </div>
    )
  }
}
