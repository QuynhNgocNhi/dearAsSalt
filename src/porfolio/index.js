import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import '../contents/styles/porfolio/styles.scss';
import oiilogo from '../contents/images/porfolio/oii-logo.png';
import oiisocial from '../contents/images/porfolio/social.png';
import oiiprofile from '../contents/images/porfolio/sas-profile.png';
import PortfolioNavbar from './PortfolioNavbar';
export default class Porfolio extends Component {
  render() {
    return (
      <div className="porfolio">
        <PortfolioNavbar/>
        <div className="porfolio__content">
          <div className="content__paging">
            project 1/9
          </div>
          
          <div className="content__items">
            <div className="item__img">
              <img src={oiiprofile} />
            </div>
            <div className="item__names">
                        <div className="name__style name__active" onClick={() => this.props.history.push("/home")}>Dear as salt</div>
              <div className="name__style" onClick={()=> window.open('https://ndrcldrll.github.io/kelby/about/')}>the town of kelby</div>
              <div className="name__style">sugar and salt</div>
              <div className="name__style">MODA</div>
              <div className="name__style">Oi!studio</div>
              <div className="name__style">Kelby</div>
              <div className="name__style">Infopoetry WOW</div>
            </div>
          </div>
          <div className="content__social">
          <img src={oiisocial} />
          </div>
          <div className="content__coming">
            coming soon
          </div>
        </div>
      </div>
    )
  }
}
