import React from "react";
import Flux from "@4geeksacademy/react-flux-dash";
import { Link } from "react-router-dom";
import BottomBar from "../components/BottomBar";
import SearchBar from "../components/SearchBar";

export default class Home extends Flux.View {
    
    constructor(){
        super();
        this.state = {
            tournaments: [],
            zoom: 0.3,
            searchString: ''
        };
    }
    
    componentWillMount(){
        this.goFetch('GET', 'https://pokersociety-alesanchezr.c9users.io/api/tournaments');
    }
    
    goFetch(method, url){
        let opts = { 
            method, 
            headers: {'Content-Type': 'application/json'}
        };
        
        fetch(url, opts)
        .then(resp => resp.json())
        .then((data) => {
            this.setState({
                tournaments: data
            });
        })
        .catch((error) => {
            console.error(error);
        });
    }
    
    bottomBarClick(item){
        switch(item.slug){
            case "zoom": this.setState({ zoom: (this.state.zoom === 1) ? 0.3 : 1 }); break;
            case "scroll-top": 
                window.scrollTo(0,0); 
            break;
        }
    }
    
    render() {
        
        const filteredTournaments = this.state.tournaments.filter((t) => {
            if(t[0].toLowerCase().indexOf(this.state.searchString) != -1) return true;
            else if(t[1].toLowerCase().indexOf(this.state.searchString) != -1) return true;
            else if(t[2].toLowerCase().indexOf(this.state.searchString) != -1) return true;
            else if(t[3].toLowerCase().indexOf(this.state.searchString) != -1) return true;
            else if(t[4].toLowerCase().indexOf(this.state.searchString) != -1) return true;
            else if(t[5].toLowerCase().indexOf(this.state.searchString) != -1) return true;
            else if(t[6].toLowerCase().indexOf(this.state.searchString) != -1) return true;
            
            return false;
        });
        
        const tournaments = filteredTournaments.map((tour, i) => 
            (<tr key={i}>
                <th className='date'>{tour[0]}</th>
                <th className='day'>{tour[1]}</th>
                <th className='time'>{tour[2]}</th>
                <th className='where'>{tour[3]}</th>
                <th className='tournament'>{tour[4]}</th>
                <th className='buyin'>{tour[5]}</th>
                <th className='starting'>{tour[6]}</th>
                <th className='blinds'>{tour[7]}</th>
            </tr>)
        );
        return (
            <div className="tournaments">
                <SearchBar />
                <div className="calendar" ref={(c) => this.calendar = c}
                    style={{
                        zoom: this.state.zoom
                    }}
                >
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th id="Date" data-type="String">Date</th>
                                <th id="Day" data-type="String">Day</th>
                                <th id="Time" data-type="String">Time</th>
                                <th id="Where" data-type="String">Where</th>
                                <th id="Tournament" data-type="String">Tournament</th>
                                <th id="Buy_in" data-type="String">Buyin</th>
                                <th id="Starting_Stack" data-type="String">Starting</th>
                                <th id="Blinds" data-type="String">Blinds</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tournaments}
                        </tbody>
                    </table>
                </div>
                <BottomBar 
                    menuItems={[
                        { label: 'Zoom', slug: 'zoom', icon: 'fas fa-search' },
                        { label: 'Scroll Top', slug: 'scroll-top', icon: 'fas fa-arrow-up' }
                    ]} 
                    onClick={(item) => this.bottomBarClick(item)}
                />
            </div>
        );
    }
}
