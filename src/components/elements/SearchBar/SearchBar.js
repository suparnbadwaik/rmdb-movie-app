import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import './SearchBar.css';

class SearchBar extends Component {

    timeout = null;

    state = {
        value: ''       /* Value from the input field */
    }

    doSearch = (event) => {
        this.setState({ value: event.target.value });
        clearTimeout(this.timeout);

        this.timeout = setTimeout(() => {
            this.props.callback(this.state.value);      /* IMPORTANT */
        }, 500);
    }

    render () {
        return (
            <div className="rmdb-searchbar">
                <div className="rmdb-searchbar-content">
                    <FontAwesome className="rmdb-fa-search" size="2x" name="search" />
                    <input  type="text"
                            className="rmdb-searchbar-input" 
                            placeholder="Search"
                            onChange={this.doSearch}
                            value={this.state.value}
                            />
                </div>
            </div>
        )
    }
}

export default SearchBar;