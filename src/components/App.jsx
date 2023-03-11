import { useState, useEffect } from 'react';
import { GlobalStyle } from './GlobalStyle';
import { nanoid } from 'nanoid';

import FormContact from './FormContact';
import SearchFilter from './SearchFilter';
import ListContact from './ListContact';

export default function App() {
  const [contacts, setContacts] = useState(() => {
    const savedContacts = localStorage.getItem('contacts');
    return savedContacts !== null ? JSON.parse(savedContacts) : [];
  });

  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleSubmit = (values, { resetForm }) => {
    const newContact = values;

    const check = contacts.find(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );

    if (check) {
      alert(`${newContact.name} is already in contacts`);
      return;
    }

    newContact.id = nanoid();

    setContacts(prevState => [...prevState, newContact]);

    resetForm({
      name: '',
      number: '',
    });
  };

  const handleFilter = ({ target: { value } }) => {
    setFilter(value);
  };

  const handleDelete = id => {
    setContacts(contacts.filter(el => el.id !== id));
  };

  const makeFiltredContacts = () => {
    return contacts.filter(({ name }) => {
      return name.toLowerCase().includes(filter.toLowerCase());
    });
  };

  return (
    <div>
      <GlobalStyle />
      <h1>Phonebook</h1>
      <FormContact onSubmit={handleSubmit} />
      <h2>Contacts</h2>
      <SearchFilter onFilter={handleFilter} />
      <ListContact contacts={makeFiltredContacts()} onDelete={handleDelete} />
    </div>
  );
}

