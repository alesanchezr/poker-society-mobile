import React from 'react';
import PropTypes from 'prop-types';

class SearchBar extends React.Component{
    constructor(){
        super();
        this.state = {
            filters: [
                { label: 'Filter', slug: 'filter', msg: 'Type tournament name, date, etc.' },
                { label: 'Date', slug: 'date', msg: 'Month, day Number, day of the week...' },
                { label: 'Time', slug: 'time', msg: 'Type the time: E.g: 3pm or 3:30pm' },
                { label: 'Where', slug: 'where', msg: 'Type the venue name' },
                { label: 'Tournament', slug: 'tournament', msg: 'Type tournament name' },
                { label: 'Buy in', slug: 'buyin', msg: 'Type the amount in dollars, E.g: $100' },
                { label: 'Starting Stack', slug: 'starting', msg: 'E.g: 10,000' },
                { label: 'Blinds', slug: 'blinds', msg: '' }
            ],
            currentFilter: 0
        };
    }
    
    onChange(e){
        this.props.onChange(e.target.value.toLowerCase(), this.state.filters[this.state.currentFilter].slug);
        this.setState({ searchString: e.target.value.toLowerCase()});
    }
    
    render(){
        const filters = this.state.filters.map((item, i) => (
            <a 
                key={i} className="dropdown-item" href="#"
                onClick={ ()=> {
                    this.setState({currentFilter: i});
                }}
            >
                {item.label}
            </a>
        ));
        return (
            <div className="searchbar sticky-top">
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <div className="dropdown">
                            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                {this.state.filters[this.state.currentFilter].label}
                            </button>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                {filters}
                            </div>
                        </div>
                    </div>
                    <input type="text" className="form-control" placeholder="click to search" 
                        onChange={this.onChange.bind(this)}
                        onFocus={(e) => e.target.placeholder = this.state.filters[this.state.currentFilter].msg}
                        onBlur={(e) => e.target.placeholder = "click to search"}
                    />
                </div>
            </div>
        );
    }
}
SearchBar.propTypes = {
    onChange: PropTypes.func,
};
SearchBar.defaultProps = {
  onChange: null,
};
export default SearchBar;