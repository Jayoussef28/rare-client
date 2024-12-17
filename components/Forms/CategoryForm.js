/* eslint-disable react/style-prop-object */
/* eslint-disable react/require-default-props */
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Form, Button, FloatingLabel } from 'react-bootstrap';
import { createCategory, updateCategory } from '../../api/categoryData';

const initialState = {
  id: '',
  label: '',
};

export default function CategoryForm({ obj, onSubmit }) {
  const [formInput, setFormInput] = useState(initialState);

  // STATE
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
      updateCategory(updatedCategory).then(onSubmit);
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
      <FloatingLabel controlId="floatingTextarea" label="category" className="mb-3">
        <Form.Control
          as="textarea"
          placeholder="category"
          style={{ height: '100px' }}
          name="category"
          value={formInput.label}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <Button type="submit">{obj.id ? 'Update' : 'Create'} CATEGORY</Button>
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
