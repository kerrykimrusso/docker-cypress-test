import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ImageInput from './ImageInput';

export default class CreateContactForm extends Component {
    handleSubmit = (e) => {

    }

    render() {
        return (
            <div>
                <Link className='close-create-contact' to='/'>Close</Link>
                <form onSubmit={this.handleSubmit} className='create-contact-form'>
                <ImageInput
                    className='create-contact-avatar-input'
                    name='avatarURL'
                    maxHeight={64}
                />
                <div className='create-contact-details'>
                    <input type='text' name='name' placeholder='Name'/>
                    <input type='text' name='email' placeholder='Email'/>
                    <button>Add Contact</button>
                </div>
                </form>
            </div>
        );
    }
}