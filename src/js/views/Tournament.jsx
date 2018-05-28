import React from "react";
import Flux from "@4geeksacademy/react-flux-dash";
import { Link } from "react-router-dom";
//include images into your bundle
import pokerImg from '../../img/poker-society.jpg';
import Navbar from "../components/Navbar.jsx";
import API from '../API';
import ReactDisqusComments from 'react-disqus-comments';


export default class Tournament extends Flux.View {
    
    constructor(){
        super();
        this.state = {
           title: 'Loading...', 
           description: null ,
           blinds: '' ,
           slug: null,
           id: null,
           buyin: null ,
           resultsLink: null ,
           startingStack: null ,
           structureSheet: null
        };
    }
    componentWillMount(){
        // Promises
        const tourId = this.props.match.params.tour_id;
        if(tourId)
        {
            API.tournament().id(tourId).then(( data ) => {
                // do something with the returned posts
                this.setState({
                   title: data.post_title, 
                   slug: data.post_name, 
                   description: data.post_content ,
                   blinds: (data.blinds) ? data.blinds : '',
                   id: tourId,
                   buyin: data['buy-in'] ,
                   resultsLink: data['results-link'] ,
                   startingStack: data['starting-stack'] ,
                   structureSheet: data['structure-sheet']
                });
                console.log(data);
            }).catch(function( err ) {
                // handle error
                console.error(err);
            });
        }
    }
    handleNewComment(comment) {
        console.log(comment.text);
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
                <div className='row'>
                    <div className='col-11 mx-auto p-3 tournament-heading'
                        dangerouslySetInnerHTML={{ __html: titles }}
                    >
                    </div>
                </div>
                <div className='row bg-secondary py-2 text-white'>
                    <div className='col-4 pt-2'>
                        <h3>Buy In</h3>
                    </div>
                    <div className='col-4'>
                        <h3>Starting Stack</h3>
                    </div>
                    <div className='col-4 pt-2'>
                        <h3>Blinds</h3>
                    </div>
                </div>
                <div className='row bg-light py-2'>
                    <div className='col-4'>
                        { (this.state.buyin) ? this.state.buyin : 'No info' }
                    </div>
                    <div className='col-4'>
                        { (this.state.startingStack) ? this.state.startingStack : 'No info' }
                    </div>
                    <div className='col-4'>
                        {this.state.blinds}
                    </div>
                </div>
                <div className='row py-4'>
                    <div className='col-12'>
                        <p>{this.state.description}</p>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-11 mx-auto p-3 text-left'>
                        <div className="btn-group w-100" role="group" aria-label="Basic example">
                            { (this.state.structureSheet && this.state.structureSheet.trim() != '') ?
                                <a target="_blank" href={this.state.structureSheet} className="btn btn-light form-control">Structure</a>
                                :''
                            }
                            { (this.state.resultsLink && this.state.resultsLink.trim() != '') ?
                                <a target="_blank" href={this.state.resultsLink} className="btn btn-light form-control">Results</a>
                                :''
                            }
                            <button onClick={() => this.props.history.goBack()} className="btn btn-light form-control">Back</button>
                        </div>
                    </div>
                </div>
            </div>
            {
                // (this.state.slug) ?
                //     <div className='p-4'>
                //         <ReactDisqusComments
                //             shortname="the-poker-society"
                //             identifier={this.state.slug}
                //             title={this.state.title}
                //             url={window.location.href}
                //             category_id="123456"
                //             onNewComment={this.handleNewComment}/>
                //     </div>
                //     :''
            }
        </div>
    );
  }
}