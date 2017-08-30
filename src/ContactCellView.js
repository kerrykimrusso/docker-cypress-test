import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ContactCellView extends Component {

    render() {
        const { id, pic, name, email, removeBtnHandler } = this.props;

        return (
            <li className="contact-list-item">
                <div className="contact-avatar" style={{backgroundImage: `url(${pic})`}}></div>
                <div className="contact-details">
                    <p>{name}</p>
                    <p>{email}</p>
                </div>
                <button className="contact-remove" onClick={(e) => removeBtnHandler(id)}>Remove</button>
            </li>
        );
    }
}

ContactCellView.propTypes = {
    pic: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string.isRequired,
    removeBtnHandler: PropTypes.func.isRequired
}