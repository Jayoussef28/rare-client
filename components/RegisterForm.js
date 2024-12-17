import PropTypes from 'prop-types';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { registerUser } from '../utils/auth'; // Update with path to registerUser

function RegisterForm({ user, updateUser }) {
  console.warn(user);
  const fullName = user.fbUser.displayName.split(' ');
  const date = new Date();
  if (!fullName[1]) {
    fullName[1] = 'Doe';
  }

  const [formData, setFormData] = useState({
    firstName: fullName[0],
    lastName: fullName[1],
    bio: '',
    profileImageUrl: '',
    email: user.fbUser.email,
    created_on: date.getDate(),
    uid: user.uid,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser(formData).then(() => updateUser(user.uid));
  };

  return (
    <Form onSubmit={handleSubmit} id="register-form">
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control as="textarea" name="bio" required placeholder="tell me about you..." onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))} />
        <Form.Control as="textarea" name="profileImageUrl" required placeholder="put an image url here..." onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))} style={{ marginTop: '30px' }} />
      </Form.Group>
      <Button variant="primary" type="submit" id="submit">
        submit
      </Button>
    </Form>
  );
}

RegisterForm.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
    fbUser: PropTypes.shape({
      displayName: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  updateUser: PropTypes.func.isRequired,
};

export default RegisterForm;
