import { useEffect, useState } from 'react';
import { getCategory } from '../../api/categoryData';
import CategoryCard from '../../components/CategoryCard';
import CategoryForm from '../../components/Forms/CategoryForm';

export default function Category() {
  const [categories, setCategory] = useState([]);

  const getTheCategories = () => {
    getCategory().then(setCategory);
  };

  useEffect(() => {
    getTheCategories();
  }, []);

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <div style={{ width: '60%' }}>
          <h1 style={{ display: 'flex', justifyContent: 'center', margin: '10px' }}>Categories</h1>
          {categories.map((category) => (
            <CategoryCard key={category.id} categoryObj={category} onUpdate={getTheCategories} />
          ))}
        </div>
        <div style={{
          height: '250px', border: '3px solid black', borderRadius: '50px', margin: '15px', padding: '25px 25px 15px 25px',
        }}
        >
          <h2 style={{ margin: '15px' }}>Create a New Category</h2>
          <CategoryForm onSubmit={getTheCategories} />
        </div>
      </div>
    </>
  );
}
