import { useEffect, useState } from 'react';
import { getCategory } from '../../api/categoryData';
import CategoryCard from '../../components/CategoryCard';

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
      <h2>CATEGORIES</h2>
      {categories.map((category) => (
        <CategoryCard key={category.id} categoryObj={category} onUpdate={getTheCategories} />
      ))}
    </>
  );
}
