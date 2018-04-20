import React from 'react';
import {NavLink} from 'react-router-dom';
import PropTypes from 'prop-types';

class BottomBar extends React.Component{
    
    constructor(){
        super();
        this.state = {
            menuItems: []
        };
    }
    
    componentWillReceiveProps(){
        this.setState({
            menuItems: this.props.menuItems
        });
    }
    
    componentWillMount(){
        this.setState({
            menuItems: this.props.menuItems
        });
    }
    
    render(){
        
        const menuItems = this.state.menuItems.map((item,i) => 
            (<li key={i} className="nav-item">
                {
                    (item.icon) ? <i className={item.icon+" fa-lg"}></i> : ''
                }
                <a className="nav-link" onClick={() => this.props.onClick(item)}>{item.label}</a>
            </li>)
        );
        return (
            <ul className="bottom-bar nav nav-fill pt-2">
                {menuItems}
            </ul>
        );
    }
}

BottomBar.propTypes = {
  // You can declare that a prop is a specific JS primitive. By default, these
  // are all optional.
  onClick: PropTypes.func.isRequired,
  menuItems: PropTypes.array.isRequired
};
BottomBar.defaultProps = {
};
export default BottomBar;