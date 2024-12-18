import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createComments, updateComments } from '../../api/commentsData';

const initialState = {
  author_id: 1,
  post_id: 1,
  content: '',
  created_on: new Date(),
};

export default function CommentForm({ obj, onSubmit, id }) {
  const [formInput, setFormInput] = useState(initialState);
  const { user } = useAuth();

  useEffect(() => {
    if (obj.content) {
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
      const updatedComment = {
        id: obj.id,
        author_id: user.uid,
        post_id: obj.post_id,
        content: formInput.content,
        created_on: obj.created_on,
      };
      updateComments(updatedComment).then(onSubmit);
    } else {
      const payload = {
        label: formInput.label,
        author_id: user.uid,
        post_id: id,
        content: formInput.content,
        created_on: (new Date()).toISOString().split('T')[0],
      };
      createComments(payload).then(() => {
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
          placeholder={obj.id ? 'Update Comment' : 'Add New Comment'}
          style={obj.id ? { height: '100px', width: '60%' } : { height: '100px', width: '20%' }}
          name="content"
          value={formInput.content}
          onChange={handleChange}
          required
        />

        {/* SUBMIT BUTTON  */}
        <Button style={obj.id ? { marginLeft: '10px', width: '60px', height: '60px' } : { width: '200px', marginTop: '10px' }} type="submit">{obj.id ? 'Update' : 'Add'} Comment</Button>
        {/* </FloatingLabel> */}
      </div>

    </Form>
  );
}

CommentForm.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    author_id: PropTypes.number,
    post_id: PropTypes.number,
    content: PropTypes.string,
    created_on: PropTypes.instanceOf(Date),
  }),
  onSubmit: PropTypes.func.isRequired,
  id: PropTypes.number,
};

CommentForm.defaultProps = {
  obj: initialState,
  id: 0,
};
