import React, { Component } from 'react'
import { NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import LoadingScreen from '../LoadingScreen';
import TinderCard from 'react-tinder-card';
export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  onSwipe = (direction) => {
    console.log('You swiped: ' + direction);
      this.props.history.push("/game");
  }
  render() {
    return (
      <TinderCard
        onSwipe={this.onSwipe}
        
      >
        <div className="sas__home" style={{height: window.innerHeight}}></div>
      </TinderCard>

    );
  }

}
