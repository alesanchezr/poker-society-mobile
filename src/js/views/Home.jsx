import React from "react";
import Flux from "@4geeksacademy/react-flux-dash";
import { Link } from "react-router-dom";
//include images into your bundle
import pokerImg from '../../img/poker-society.jpg';

import Navbar from "../components/Navbar.jsx";
import API from '../API';

export default class Home extends Flux.View {
    constructor(){
        super();
        this.state = {
            menu: [
                { id: 1, title: 'Vegas Summer Series', children: [
                        { id: 2, title: 'Vegas 2018', calendar: 2978, url:'/calendar/2978' },
                        { id: 2, title: 'Vegas 2017 (Results)', calendar: 1746, url:'/calendar/1746' }
                    ]
                },
                { id: 3, title: 'Ft Lauderdale - Miami', children: [
                        { id: 4, title: 'May 2018', url:'/calendar/4190', calendar: 4190 },
                    ]
                }
            ]
        };
        
    }
    
    menuChilds(menu){
        return menu.children.map((m, i) => (<Link key={i} className="dropdown-item" to={m.url}>{m.title}</Link>));
    } 

    render() {
        const menuItems = this.state.menu.map((menu, i) => (
            <li key={i} className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
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