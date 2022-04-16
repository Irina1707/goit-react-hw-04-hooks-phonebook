import { useState } from 'react';
//import PropTypes from 'prop-types';
//import { nanoid } from 'nanoid';
import { Form, Label, Input, Button } from './ContactForm.styled'

function ContactForm({ onSubmit }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChangeName = (event) => {
    setName(event.currentTarget.value)
  }

  const handleChangeNumber = (event) => {
    setNumber(event.currentTarget.value)
  }
  
  // useEffect( 
  // , [])

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {name, number}
    onSubmit(data);
    reset();
  }

  const reset = () => {
    setName('');
    setNumber('')
  }

 
    return (
    <div>
    
    <Form onSubmit={handleSubmit}>
      <Label htmlFor="">
          Name
      <Input
      type="text"
              name="name"
              value={name}
              onChange={handleChangeName}
      pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
      title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
      required
          /> 
          </Label>
        <Label htmlFor="">
          Number
      <Input
      type="tel"
              name="number"
              value={number}
              onChange={handleChangeNumber}
      pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
      title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
      required
      /> 
      </Label>
      <Button type="submit">Add contact</Button>
        </Form>
        </div>
    );
}

export default ContactForm;