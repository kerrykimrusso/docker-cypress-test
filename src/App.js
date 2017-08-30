import React, { Component } from 'react';
import sortBy from 'sort-by';
import * as ContactsAPI from './utils/ContactsAPI';
import FilterableListView from './FilterableListView';
import ContactCellView from './ContactCellView';

class App extends Component {
  state = {
    contacts: [],
    query: ''
  };

  componentDidMount() {
    ContactsAPI.getAll()
      .then((contacts) => {
        this.setState({
          contacts: contacts.sort(sortBy('name'))
        });
      });
  }

  addContact = (newContact) => {
    this.setState({
      contacts: [...this.state.contacts, newContact].sort(sortBy('name'))
    })

    // ContactsAPI.create(newContact);
  }

  filterContacts = () => {
    const { contacts, query } =  this.state;

    return !query.length ? contacts : contacts.filter((contact) => {
      return contact.name.toLowerCase().indexOf(query) > -1 ||
        contact.email.toLowerCase().indexOf(query) > -1
    })
  }
  
  storeFilterQuery = (query) => {
    query = query.trim().toLowerCase();
    
    this.setState({
      query: query 
    });
  }

  removeContact = (id) => {
    let contactToRemove;
    const updatedContacts = [];
    this.state.contacts.forEach((val) => {
      if(val.id !== id) {
        updatedContacts.push(Object.assign({}, val));
      } else {
        contactToRemove = val; 
      }
    });

    this.setState((prevState) => {
      return {
        contacts: updatedContacts
      }
    });
    
    ContactsAPI.remove(contactToRemove);
  }

  render() {
    let filteredContacts = this.filterContacts();
    const { contacts } = this.state;

    const cells = filteredContacts.map(({ id, avatarURL, name, email }) => 
      <ContactCellView key={id} id={id} pic={avatarURL} name={name} email={email} removeBtnHandler={this.removeContact} />)

    return (
      <FilterableListView cells={cells} totalCellsCount={contacts.length} filterHandler={this.storeFilterQuery} placeholder='Filter'>
        <button className='add-contact'>Add Contact</button>
      </FilterableListView>
    );
  }
}

export default App;
