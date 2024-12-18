import { useEffect, useState } from 'react';
import { getCommentsByPostId } from '../../api/commentsData';
import CommentCard from '../../components/CommentCard';
import CommentForm from '../../components/Forms/commentForm';

export default function Tags() {
  const [comments, setComments] = useState([]);

  const getCommentsByPost = () => {
    getCommentsByPostId().then(setComments);
  };

  useEffect(() => {
    getCommentsByPost();
  }, []);

  return (
    <>
      <h1 style={{ textAlign: 'center', color: 'white', marginTop: '20px' }}>Post Titles Comments</h1>
      <CommentForm onSubmit={getCommentsByPostId} />
      <div style={{
        display: 'flex', columnGap: '20px', rowGap: '20px', flexWrap: 'wrap', marginLeft: '200px', marginTop: '40px', marginRight: '200px', justifyContent: 'center',
      }}
      >

        {comments.map((comment) => (
          <CommentCard key={comment.id} commentObj={comment} onUpdate={getCommentsByPostId} />
        ))}
      </div>
    </>
  );
}
