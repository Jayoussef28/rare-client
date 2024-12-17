import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleCategory } from '../../../api/categoryData';
import CategoryForm from '../../../components/Forms/CategoryForm';

export default function EditCategory() {
  const [editobj, setEditobj] = useState({});
  const router = useRouter();

  const { id } = router.query;

  const getTheCategory = () => {
    getSingleCategory(id).then(setEditobj);
  };

  useEffect(() => {
    getTheCategory();
  }, [id]);

  console.warn(editobj);

  return (
    <>
      <div style={{ marginTop: '15px' }} />
      <CategoryForm obj={editobj} />
    </>
  );
}
