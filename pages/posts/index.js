import { useEffect, useState } from 'react';
import { getPosts } from '../../api/PostData';
import PostCard from '../../components/PostCard';

export default function Tags() {
  const [posts, setPosts] = useState([]);

  const getAllPosts = () => {
    getPosts().then(setPosts);
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <>
      <h1>Posts</h1>
      {posts.map((post) => (
        <PostCard key={post.id} postObj={post} onUpdate={getAllPosts} />
      ))}
    </>
  );
}
