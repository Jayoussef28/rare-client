import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Button, Card } from 'react-bootstrap';
import { deletePost } from '../api/PostData';

function PostCard({ postObj }) {
  const deleteThisPost = () => {
    if (window.confirm('Are you Sure you want to delete this Post?')) {
      deletePost(postObj.id).then();
    }
  };

  return (
    <Card className="card" style={{ width: '18rem', margin: '10px', border: '1px solid' }}>
      <Card.Title style={{ textAlign: 'center', paddingTop: '10px' }}>{postObj.title}</Card.Title>
      <Card.Body>
        <Card.Img variant="top" src={postObj.image_url} alt={postObj.title} style={{ height: '400px', borderRadius: '0.5rem' }} />
        <p className="card-text bold">{postObj.publication_date}</p>
        <p className="card-text bold">{postObj.content}</p>
        <Link href={`/posts/edit/${postObj.id}`} passHref>
          <Button variant="outline-dark" color="success">EDIT</Button>
        </Link>
        <Link href={`/posts/view/${postObj.id}`} passHref>
          <Button variant="outline-dark" color="success">View Comments</Button>
        </Link>
        <Button variant="outline-danger" onClick={deleteThisPost} className="m-2">
          DELETE
        </Button>
      </Card.Body>
    </Card>
  );
}

PostCard.propTypes = {
  postObj: PropTypes.shape({
    id: PropTypes.number,
    user: PropTypes.string,
    category: PropTypes.string,
    title: PropTypes.string,
    publication_date: PropTypes.instanceOf(Date),
    image_url: PropTypes.string,
    content: PropTypes.string,
    approved: PropTypes.bool,
  }).isRequired,
};

export default PostCard;
