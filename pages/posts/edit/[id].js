import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSinglePost } from '../../../api/PostData';
import PostForm from '../../../components/Forms/PostForm';

export default function EditPost() {
  const [editobj, setEditobj] = useState({});
  const router = useRouter();

  const { id } = router.query;

  useEffect(() => {
    getSinglePost(id).then(setEditobj);
  }, [id]);
  return (<PostForm obj={editobj} />);
}
