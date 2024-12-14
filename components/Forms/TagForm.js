import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { createTag, updateTag } from '../../api/tagData';

const initialState = {
  id: '',
  label: '',
};

export default function TagForm({ obj, onSubmit }) {
  const [formInput, setFormInput] = useState(initialState);

  // IF WE ARE EDITING A TAG, THIS WILL SET THE FORMINPUT STATE TO THE VALUES OF THE TAG, BUT IF WE ARE CREATING A NEW TAG, IT WILL SET THE POST_ID OF THE INITAL STATE TO THE POST_ID ON WHICH WE ARE TAGING
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
      const updatedTag = {
        id: obj.id,
        label: formInput.label,
      };
      updateTag(updatedTag).then(onSubmit);
    } else {
      const payload = {
        label: formInput.label,
      };
      createTag(payload).then(() => {
        setFormInput(initialState);
        onSubmit();
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {/* <h4 className="text-white mt-5">{obj.id ? 'Update' : 'Add'} Tag</h4> */}
      {/* CONTENT TEXTAREA  */}
      <FloatingLabel controlId="floatingTextarea" label="Create a new tag" className="mb-3">
        <Form.Control
          as="textarea"
          placeholder="Create a new tag"
          style={{ height: '200px', width: '400px' }}
          name="label"
          value={formInput.label}
          onChange={handleChange}
          required
        />

        {/* SUBMIT BUTTON  */}
        <Button type="submit">{obj.id ? 'Update' : 'Add'} Tag</Button>
      </FloatingLabel>

    </Form>
  );
}

TagForm.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    label: PropTypes.string,
  }),
  onSubmit: PropTypes.func.isRequired,
};

TagForm.defaultProps = {
  obj: initialState,
};
