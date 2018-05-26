import React from "react";
import Flux from "@4geeksacademy/react-flux-dash";
import { Link } from "react-router-dom";
//include images into your bundle
import pokerImg from '../../img/poker-society.jpg';

import Navbar from "../components/Navbar.jsx";
import API from '../API';
import * as PCActions from '../actions/PSActions';
import PCStore from '../stores/PSStore';

export default class Home extends Flux.View {
    constructor(){
        super();
        PCActions.getMenu();
        
        this.state = {
            menu: []
        };
        
    }
    
    componentDidMount() {
        this.menuSubscription = PCStore.subscribe("menu", (state) => {
            this.setState({menu: state});
        });
    }
    
    menuChilds(menu){
        return menu.children.map((item, i) => ( <div key={i}>
            { (typeof item.children == 'undefined' || item.children.length == 0) ?
                <Link className="dropdown-item" to={item.url}>{item.title}</Link>
                :
                <div className="submenu">
                    <button className="nav-link submenu-toggle">{item.title}</button>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                        {this.menuChilds(item)}
                    </div>
                </div>
            }
        </div>));
    } 

    render() {
        const menuItems = this.state.menu.map((menu, i) => (
            <li key={i} className="nav-item dropdown">
                <a  className="nav-link dropdown-toggle" to="#" id="navbarDropdown"
                    onClick={() => console.log('asd')}
                    role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {menu.title}
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                    {this.menuChilds(menu)}
                </div>
            </li>
        ));
        return (
            <div>
                <Navbar />
                <div className="home text-center" style={{backgroundImage: `url(${pokerImg})`}}>
                    <nav className="navbar navbar-expand-lg navbar-light bg-light select-tournament">
                        <div className="collapse navbar-collapse show active" id="navbarTogglerDemo03">
                            <ul className="navbar-nav mr-auto">
                                {menuItems}
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
        );
    }
}