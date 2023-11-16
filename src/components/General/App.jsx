import { ContactForm } from '../ContactForm/ContactForm';
import { Filter } from '../Filter/Filter';
import { ContactList } from '../ContactList/ContactList';
import { useDispatch, useSelector } from 'react-redux';
import { selectContacts, selectError, selectIsLoading } from 'redux/selectors';
import {
  MainTitle,
  Message,
  SecondaryTitle,
} from './Title.styled';
import { useEffect } from 'react';
import { fetchContacts } from 'redux/API';

export const App = () => {
  const contacts = useSelector(selectContacts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div>
      <MainTitle>Phonebook</MainTitle>
      <ContactForm />
      <SecondaryTitle>Contacts</SecondaryTitle>
      <Filter />
      {contacts.length > 0 ? (
        <ContactList />
      ) : (
        <Message>Phonebook is empty</Message>
      )}
    </div>
  );
};