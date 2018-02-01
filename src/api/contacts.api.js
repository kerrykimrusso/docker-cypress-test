const baseUrl = 'http://0.0.0.0:3001/api';

export default class ContactsApi {
  static getAll = () =>
    fetch(`${baseUrl}/contacts`)
      .then(res => res.json())
      .catch(console.log);

  static remove = (contact) =>
    fetch(`${baseUrl}/contacts/${contact.id}`, { 
      method: 'DELETE' 
    })
      .then(res => res.json())
      .then(data => data.contact)
      .catch(console.log);

  static create = (body) =>
    fetch(`${baseUrl}/contacts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then(res => res.json())
      .catch(console.log);
}