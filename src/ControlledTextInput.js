import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ControlledTextInput extends Component {
    state = {
        value: ''
    }

    changeHandler = (e) => {
        const value = e.target.value;
        const { name, validate } = this.props;
        
        this.setState((prevState) => {
            return { value }
        });

        this.props.changeHandler({
            name: name,
            value: value,
            error: validate ? validate(value) : false
        })
    }

    componentWillReceiveProps(nextProps) {
        this.setState((prevState) => {
            return {
                value: nextProps.value
            }
        });
    }

    render() {
        const { placeholder, name } = this.props;

        return (
            <input className="search-contacts" type="text" name={name} placeholder={placeholder} value={this.state.value} onChange={this.changeHandler} />
        );
    }
}

ControlledTextInput.propTypes = {
    name: PropTypes.string,
    value: PropTypes.string,
    validate: PropTypes.func,
    changeHandler: PropTypes.func.isRequired
}