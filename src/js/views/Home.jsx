import React from "react";
import Flux from "@4geeksacademy/react-flux-dash";
import { Link } from "react-router-dom";
//include images into your bundle
import pokerImg from '../../img/poker-society.jpg';

import Navbar from "../components/Navbar.jsx";

export default class Home extends Flux.View {
  render() {
    return (
        <div>
            <Navbar />
            <div className="home text-center" style={{backgroundImage: `url(${pokerImg})`}}>
            
            </div>
        </div>
    );
  }
}
