import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { createPost, updatePost } from '../../api/PostData';
import { useAuth } from '../../utils/context/authContext';

const initialState = {
  categoryid: '',
  title: '',
  publication_date: '',
  image_url: '',
  content: '',
  approved: true,
};

export default function PostForm({ obj }) {
  const [postInput, setPostInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj.id) {
      setPostInput(obj);
    } else {
      setPostInput(initialState);
    }
  }, [obj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.id) {
      const postItem = {
        id: obj.id,
        user: obj.user.id,
        categoryid: postInput.category.id,
        title: postInput.title,
        publication_date: postInput.publication_date,
        image_url: postInput.image_url,
        content: postInput.content,
        approved: postInput.approved,
      };
      updatePost(postItem).then(() => router.push('/posts'));
    } else {
      const payload = {
        ...postInput,
        user: user.uid,
        approved: postInput.approved,
      };
      createPost(payload).then(() => router.push('/posts'));
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-black mt-5">{obj.id ? 'Update' : 'Create'} Item</h2>
      <FloatingLabel controlId="floatingInput1" label="title" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter your Post Title"
          name="title"
          value={postInput.title}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput1" label="publication_date" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter your publication Date"
          name="publication_date"
          value={postInput.publication_date}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput1" label="image_url" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter your image URL"
          name="image_url"
          value={postInput.image_url}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput1" label="content" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter your Post Content"
          name="content"
          value={postInput.content}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <Form.Control
        type="hidden"
        name="category"
        value={postInput.category}
        required
      />

      <Form.Control
        type="hidden"
        name="approved"
        value={postInput.approved}
        required
      />

      <Button type="submit">{obj.id ? 'Update' : 'Create'} Post</Button>
    </Form>
  );
}

PostForm.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    user: PropTypes.number,
    category: PropTypes.number,
    title: PropTypes.string,
    // publication_date: PropTypes.instanceOf(Date),
    publication_date: PropTypes.string,
    image_url: PropTypes.string,
    content: PropTypes.string,
    approved: PropTypes.bool,
  }),
  // onSubmit: PropTypes.func.isRequired,
};

PostForm.defaultProps = {
  obj: initialState,
};
