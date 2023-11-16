import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, Label, ModernField, ModernForm } from './ContactForm.styled';
import { useDispatch, useSelector } from 'react-redux';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { selectContacts } from 'redux/selectors';
import { addContact } from 'redux/API';;

const schema = Yup.object().shape({
  name: Yup.string()
    .min(1, 'Too Short!')
    .max(30, 'Too Long!')
    .required('Required'),
  number: Yup.string()
    .min(10, 'Short phone number')
    .max(22, 'Long phone number')
    .required('Required'),
});

export const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

  const handlerAdd = inputValue => {
    if (contacts.find(({ name }) => name === inputValue.name)) {
      return Notify.failure(`${inputValue.name} is already in contacts`);
    }

    dispatch(addContact({ ...inputValue, createdAt: new Date() }));
  };

  return (
    <Formik
      initialValues={{
        name: '',
        number: '',
      }}
      validationSchema={schema}
      onSubmit={(values, actions) => {
        handlerAdd(values);
        actions.resetForm();
      }}
    >
      <ModernForm>
        <Label>
          Name
          <ModernField name="name" placeholder="Jane Doe" />
          <ErrorMessage component="span" name="name" />
        </Label>

        <Label>
          Phone number
          <ModernField
            type="tel"
            name="number"
            placeholder="+38(099)-000-0000"
          />
          <ErrorMessage component="span" name="number" />
        </Label>

        <Button type="submit">Add contact</Button>
      </ModernForm>
    </Formik>
  );
};
