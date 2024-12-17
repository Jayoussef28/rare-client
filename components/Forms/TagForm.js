import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
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
      const payload = formInput.label;
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
      {/* <FloatingLabel controlId="floatingTextarea" label="Create a new tag" className="mb-3"> */}
      <div style={obj.id ? {
        display: 'flex', width: '100%', justifyContent: 'space-between', padding: '0px', margin: '0px',
      } : {
        display: 'flex', flexDirection: 'column', alignItems: 'center', flexWrap: 'wrap', width: '100%', padding: '0px', margin: '0px',
      }}
      >
        <Form.Control
          as="textarea"
          placeholder={obj.id ? '' : 'Create a new tag'}
          style={obj.id ? { height: '20px', width: '90%' } : { height: '20px', width: '80%' }}
          name="label"
          value={formInput.label}
          onChange={handleChange}
          required
        />

        {/* SUBMIT BUTTON  */}
        <Button style={obj.id ? { marginLeft: '10px', width: '120px' } : { width: '120px', marginTop: '10px' }} type="submit">{obj.id ? 'Update' : 'Add'} Tag</Button>
        {/* </FloatingLabel> */}
      </div>

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
