import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { createCategory, updateCategory } from '../../api/categoryData';

const initialState = {
  id: '',
  label: '',
};

export default function CategoryForm({ obj, onSubmit }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();

  useEffect(() => {
    if (obj.id) {
      setFormInput(obj);
    } else {
      setFormInput(initialState);
    }
  }, [obj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.id) {
      const updatedCategory = {
        id: obj.id,
        label: formInput.label,
      };
      updateCategory(updatedCategory).then(() => router.push('/category'));
    } else {
      const payload = formInput.label;
      createCategory(payload).then(() => {
        setFormInput(initialState);
        onSubmit();
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div style={obj.id ? {
        display: 'flex', width: '100%', justifyContent: 'space-between', padding: '0px', margin: '0px',
      } : {
        display: 'flex', flexDirection: 'column', alignItems: 'center', flexWrap: 'wrap', width: '100%', padding: '0px', margin: '0px',
      }}
      >
        <Form.Control
          as="textarea"
          placeholder={obj.id ? '' : 'Create a new category'}
          style={obj.id ? { height: '20px', width: '90%' } : { height: '20px', width: '80%' }}
          name="label"
          value={formInput.label}
          onChange={handleChange}
          required
        />

        <Button style={obj.id ? { marginLeft: '10px', width: '160px' } : { width: '120px', marginTop: '10px' }} type="submit">{obj.id ? 'Update' : 'Add'} Category</Button>
      </div>

    </Form>
  );
}

CategoryForm.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    label: PropTypes.string,
  }),
  onSubmit: PropTypes.func.isRequired,
};

CategoryForm.defaultProps = {
  obj: initialState,
};
