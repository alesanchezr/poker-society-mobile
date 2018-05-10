/* global process */
import React from "react";
import Flux from "@4geeksacademy/react-flux-dash";
import { Link } from "react-router-dom";
import BottomBar from "../components/BottomBar";
import SearchBar from "../components/SearchBar";
import Navbar from "../components/Navbar.jsx";
import Tournament from "../components/Tournament";
import TheStore from '../store';
import chrono from 'chrono-node';

export default class Calendar extends Flux.View {
    
    constructor(){
        super();
        this.state = {
            tournaments: [],
            zoom: 0.3,
            searchType: null,
            searchString: '',
            error: null
        };
    }
    
    componentWillMount(){
        const HOST = process.env.API_HOST+'/ps/v1';
        const tournaments = TheStore.getTournaments(this.props.match.params.cal_id);
        if(!tournaments) this.goFetch('GET', `${HOST}/tournament/calendar/${this.props.match.params.cal_id}`);
        else this.fillTournaments(tournaments);
    }
    
    goFetch(method, url){
        let opts = { 
            method, 
            headers: {'Content-Type': 'application/json'}
        };
        
        fetch(url, opts)
        .then(resp => {
            if(resp.code == 404) throw new Error('Calendar not found');
            return resp.json();
        })
        .then((data) => {
            if(Array.isArray(data)){
                TheStore.setTournaments(this.props.match.params.cal_id,data);
                this.fillTournaments(data);
            }
            else throw new Error('Invalid  not found');
        })
        .catch((error) => {
            this.setState({ error: 'Calendar not found'});
        });
    }
    
    fillTournaments(data){
        this.setState({ 
            tournaments: data.map((t) => {
                t[0] = new Date(t[0]);
                return t;
            })
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
    
    dateHasPassed(strDate){
        var theDate = this.stringToDate(strDate);
        var today = new Date();
        today.setDate(today.getDate() - 1);
        return (today<theDate);
    }
    
    stringToDate(strDate){
        
        var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var parts = strDate.split('-');
        //please put attention to the month (parts[0]), Javascript counts months from 0:
        // January - 0, February - 1, etc
        return new Date('20'+parts[2],monthNames.indexOf(parts[1]),parts[0]);
    }
    
    render() {
        
        let filteredTournaments = this.state.tournaments;
        if(this.state.searchString.length > 1) 
            filteredTournaments = this.state.tournaments.filter((t) => {
                if(this.state.searchType && this.state.searchType!=='filter'){
                    if(this.state.searchType == 'date'){
                        const searchDate = chrono.parseDate(this.state.searchString);
                        if(!searchDate) return false;
                        else{
                            return (t[0].getTime() <= searchDate.getTime());
                        }
                    }
                    else if(this.state.searchType == 'where'){
                        if(t[3].toLowerCase().indexOf(this.state.searchString) != -1) return true;
                    }
                    else if(this.state.searchType == 'tournament'){
                        if(t[4].toLowerCase().indexOf(this.state.searchString) != -1) return true;
                    }
                    else if(this.state.searchType == 'buyin'){
                        if(t[5].toLowerCase().indexOf(this.state.searchString) != -1) return true;
                    }
                    else if(this.state.searchType == 'time'){
                        if(t[3].toLowerCase().indexOf(this.state.searchString) != -1) return true;
                    }
                    else if(this.state.searchType == 'starting'){
                        if(t[6].toLowerCase().indexOf(this.state.searchString) != -1) return true;
                    }
                    else if(this.state.searchType == 'blinds'){
                        if(t[7].toLowerCase().indexOf(this.state.searchString) != -1) return true;
                    }
                }
                else{
                    if(t[0].toString().toLowerCase().indexOf(this.state.searchString) != -1) return true;
                    else if(t[1].toLowerCase().indexOf(this.state.searchString) != -1) return true;
                    else if(t[2].toLowerCase().indexOf(this.state.searchString) != -1) return true;
                    else if(t[3].toLowerCase().indexOf(this.state.searchString) != -1) return true;
                    else if(t[4].toLowerCase().indexOf(this.state.searchString) != -1) return true;
                    else if(t[5].toLowerCase().indexOf(this.state.searchString) != -1) return true;
                    else if(t[6].toLowerCase().indexOf(this.state.searchString) != -1) return true;
                }
                
                return false;
            });
        
        const tournaments = filteredTournaments.map((tour, i) => (<Tournament key={i} data={{
            date: tour[0],
            day: tour[1],
            time: tour[2],
            venueName: tour[3],
            venueId: tour[9],
            tournament: tour[4],
            tournamentId: tour[10],
            buyin: tour[5],
            starting: tour[6],
            blinds: tour[7]
        }} />));
        return (
            <div className="tournaments">
                <Navbar />
                { (this.state.error) ? 
                    <div className='alert alert-danger text-center'>{this.state.error}</div>
                    :
                    <div>
                        <SearchBar onChange={(token, type) => this.setState({
                            searchString: token,
                            searchType: type
                        })} />
                        {
                            (!this.state.tournaments || this.state.tournaments.length==0) ?
                                <div className='alert alert-info text-center'>Loading tournaments...</div> : ''
                        }
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
                }
            </div>
        );
    }
}