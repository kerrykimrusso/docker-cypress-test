import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ListView from './ListView';
import TextInput from './ControlledTextInput';

export default class FilterableListView extends Component {
    state = {
        query: ''
    }

    clearQuery = () => {
        this.setState((prevState) => {
            let newState = {
                query: ''
            };
            this.props.filterHandler(newState.query);
            return newState;
        });
    }

    changeHandler = ({ value, error }) => {
        if(error) return;

        this.setState((prevState) => {
            return {
                query: value
            }
        });

        this.props.filterHandler(value);
    }

    render() {
        const { 
            cells, 
            children, 
            placeholder, 
            totalCellsCount 
        } = this.props;
        
        const { query } = this.state;

        return (
            <div className="list-contacts">
                <div className='list-contacts-top'>
                    <TextInput name='filterInput' placeholder={placeholder} value={query} changeHandler={this.changeHandler} />
                    {children}
                </div>
                {cells.length < totalCellsCount && 
                    <FilterStatus numUnfiltered={cells.length} total={totalCellsCount} showAllHandler={this.clearQuery} />
                }
                <ListView cells={cells} />
            </div>
        )
    }
}

FilterableListView.propTypes = {
    placeholder: PropTypes.string,
    cells: PropTypes.arrayOf(PropTypes.element).isRequired,
    totalCellsCount: PropTypes.number.isRequired,
    filterHandler: PropTypes.func.isRequired
}

function FilterStatus(props) {
    const { numUnfiltered, total, showAllHandler } = props;

    return (
        <div className='showing-contacts'>
            <span>Now showing {numUnfiltered} of {total} total</span>
            <button onClick={showAllHandler}>Show all</button>
        </div>
    );
}

FilterStatus.propTypes = {
    numUnfiltered: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    showAllHandler: PropTypes.func.isRequired
}