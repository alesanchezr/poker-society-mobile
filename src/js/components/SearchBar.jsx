import React from 'react';

export default class SearchBar extends React.Component{
    constructor(){
        super();
    }
    
    render(){
        return (
            <div className="searchbar">
                <input type="text" className="form-control" placeholder="click to search" 
                    onChange={(e) => this.setState({ searchString: e.target.value.toLowerCase()}) }
                    onBlur={(e) => e.target.placeholder = "Type tournament name, date, etc."}
                    onBlurOut={(e) => e.target.placeholder = "click to search"}
                />
                <i className="fas fa-sliders-h"></i>
            </div>
        );
    }
}