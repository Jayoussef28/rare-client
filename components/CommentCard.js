import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import { useState } from 'react';
import { useAuth } from '../utils/context/authContext';
import { deleteComments, updateComments } from '../api/commentsData';
import CommentForm from './Forms/commentForm';

function CommentCard({ commentObj, onUpdate }) {
  const { user } = useAuth();
  const [commentText, SetCommentText] = useState(commentObj.content);
  const [Edit, setEdit] = useState(false);

  const handleCommentDelete = () => {
    if (window.confirm('Are you sure you want to delete this comment? :(')) {
      deleteComments(commentObj.id).then(() => onUpdate());
    }
  };

  const handleSubmit = (obj) => {
    updateComments(obj).then((updatedCommentObj) => {
      SetCommentText(updatedCommentObj.label);
      onUpdate();
    });
    setEdit(false);
  };

  const resetEdit = () => {
    onUpdate();
    SetCommentText(commentObj.content);
    setEdit(false);
  };

  const editThisComment = () => {
    SetCommentText(<CommentForm obj={commentObj} onSubmit={handleSubmit} />);
    setEdit(true);
  };

  return (
    <Card style={{ width: '18rem', borderRadius: '20px' }}>
      <Card.Body>
        <Card.Title />
        <Card.Subtitle style={{ display: 'flex', textAlign: 'center' }} className="mb-2 text-muted">{commentText}
          <svg onClick={(Edit === false) ? (editThisComment) : (resetEdit)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-gear-fill" viewBox="0 0 16 16">
            <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z" />
          </svg>
          <svg onClick={handleCommentDelete} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
          </svg>
        </Card.Subtitle>
        <Card.Text style={{ textAlign: 'center' }}>
          {user.fbUser.displayName}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

CommentCard.propTypes = {
  commentObj: PropTypes.shape({
    id: PropTypes.number,
    author_id: PropTypes.number,
    post_id: PropTypes.number,
    content: PropTypes.string,
    created_on: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]),
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default CommentCard;
