import {useState, useEffect} from 'react';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactsList/ContactsList';
import { nanoid } from 'nanoid';
import Filter from './Filter/Filter';
import { AppBlock } from './App.styled';



export default function App() {
  const initialContacts = [
    { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
    { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
    { id: "id-3", name: "Eden Clements", number: "645-17-79" },
    { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
  ];
  const [contacts, setContacts] = useState(() => {
    return (JSON.parse(window.localStorage.getItem('contacts')) ?? initialContacts)
});

  const [filter, setFilter] = useState('');
  
  const addFormContact = (data) => {
    const { name, number } = data;
    const contact = {
      id: nanoid(),
      name,
      number
    }
    if (contacts.some(({ name }) => name === contact.name)) {
      alert(`${name} is already in contacts.`);
      return;
    }
    setContacts([contact, ...contacts])
  }
   
  const changeFilter = (event) => {
    setFilter(event.currentTarget.value)
  }

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  }

  const deleteContact = (contactId) => {
    setContacts(prevContacts => prevContacts.filter(contact => contact.id !== contactId)
    )
  }

  useEffect(() => {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    
    if (parsedContacts) {
      setContacts(parsedContacts);
      
    } 
  }, []);

  useEffect(() => localStorage.setItem('contacts', JSON.stringify(contacts))
  , [contacts])

    const visibleContacts = getVisibleContacts();
  return (
    <AppBlock>
      <h2>Phonebook</h2>
      <ContactForm 
        onSubmit={addFormContact} />
      
      <h2>Contacts</h2>
      <Filter filter={filter} onChange={changeFilter} />
      
      <ContactList
        contacts={visibleContacts} onDeleteContact={deleteContact} />
      </AppBlock>
  )
};

