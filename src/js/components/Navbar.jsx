import React from 'react';
import PokerIcon from '../../img/poker-icon.png';
import {Link, NavLink} from 'react-router-dom';

export default class Navbar extends React.Component{
    
    render(){
        return (
            <nav className="main-navbar navbar navbar-light bg-light">
                <Link className="navbar-brand" to="/">
                    <img className="mr-2" src={PokerIcon}/>
                    The Poker Society
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/home">Home</NavLink>
                            <a className="nav-link" href="mailto:info@thepokersociety.com">Contact Us</a>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}