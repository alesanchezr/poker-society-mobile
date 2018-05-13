import React from "react";
import Flux from "@4geeksacademy/react-flux-dash";
import { Link } from "react-router-dom";
//include images into your bundle
import pokerImg from '../../img/poker-society.jpg';
import Navbar from "../components/Navbar.jsx";
import API from '../API';

export default class Casino extends Flux.View {
    
    constructor(){
        super();
        this.state = {
           title: 'Loading...', 
           description: null,
           website: null,
           location: null
        };
    }
    componentWillMount(){
        // Promises
        const casinoId = this.props.match.params.cas_id;
        if(casinoId)
        {
            API.casino().id(casinoId).then(( data ) => {
                // do something with the returned posts
                this.setState({
                   title: data.post_title, 
                   description: data.post_content,
                   website: data.website,
                   id: casinoId,
                   location: data.location
                });
                console.log(data);
            }).catch(function( err ) {
                // handle error
                console.error(err);
            });
        }
    }
  render() {
      
    const reducer = (accumulator, str, i) => {
        return accumulator + `<h${i}>${str}</h>`;
    };
    const titles = [''].concat(this.state.title.split('-').filter(str => str !== '-')).reduce(reducer);
    return (
        <div>
            <Navbar />
            <div className="tournament text-center">
                <div className='row bg-lite'>
                    <div className='col-11 mx-auto p-3 tournament-heading'
                        dangerouslySetInnerHTML={{ __html: titles }}
                    >
                    </div>
                </div>
                { (this.state.location) ?
                    <div className='row bg-secondary text-white'>
                        <div className='col-11 mx-auto p-3 tournament-heading'>
                            <small>{this.state.location.address}</small>
                        </div>
                    </div> : ''
                }
                <div className='row py-4'>
                    <div className='col-12'>
                        <p>{this.state.description}</p>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-11 mx-auto p-3 text-left'>
                        <div className="btn-group w-100" role="group" aria-label="Basic example">
                            { (this.state.website) ?
                                <a target="_blank" rel="nofollow" href={this.state.website} className="btn btn-light form-control">Go to Website</a>
                                :''
                            }
                            { (this.state.location) ?
                                <a target="_blank" rel="nofollow" href={`https://www.google.com/maps?daddr=${this.state.location.lat},${this.state.location.lng}`} className="btn btn-light form-control">See it on maps</a>
                                :''
                            }
                            <button onClick={() => this.props.history.goBack()} className="btn btn-light form-control">Back to calendar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}