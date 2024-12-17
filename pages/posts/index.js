import { useEffect, useState } from 'react';
import Link from 'next/link';
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
      <div style={{
        color: 'white', width: '100%', display: 'flex', justifyContent: 'space-between', marginTop: '15px',
      }}
      >
        <h1>Posts</h1>
        <Link passHref href="/posts/new">Add A Post</Link>
      </div>
      {posts.map((post) => (
        <PostCard key={post.id} postObj={post} onUpdate={getAllPosts} />
      ))}
    </>
  );
}
