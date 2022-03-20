import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import '../../contents/styles/porfolio/styles.scss';
import oiilogo from '../../contents/images/porfolio/oii-logo.png';
import oiisocial from '../../contents/images/porfolio/social.png';
import oiiprofile from '../../contents/images/porfolio/sas-profile.png';
export default class PortfolioNavbar extends Component {
  render() {
    return (
      <div className="porfolio__nav">
        <NavLink activeClassName="active" className="nav-link" 
              to="/"
            ><img src={oiilogo} /></NavLink>
          
          <div className="nav__right">
            <div className="right__links">
            <NavLink activeClassName="active" className="nav-link" to="/">Projects</NavLink>
            <NavLink activeClassName="active" className="nav-link" 
              to="/oii-studio/about"
            >About</NavLink>
            </div>
            <div className="right__contact">
              <a href="mailto:nguyendangtrung09@gmail.com" >dangtrung@hotmail.com</a>
              <a href="tel:393516304306">+39 3516 304 306</a>
            </div>
          </div>
        </div>
    )
  }
}
