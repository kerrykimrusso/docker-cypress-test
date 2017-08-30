import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ListView extends Component {
    render() {
        return (
            <ol className="contact-list">
                {this.props.cells}
            </ol>
        );
    }
}

ListView.propTypes =  {
    cells: PropTypes.arrayOf(PropTypes.element).isRequired
}