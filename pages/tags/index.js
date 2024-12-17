import { useEffect, useState } from 'react';
// import { useAuth } from '../../utils/context/authContext';
import { getTags } from '../../api/tagData';
import TagCard from '../../components/TagCard';
import TagForm from '../../components/Forms/TagForm';

export default function Tags() {
  // const { user } = useAuth();
  const [tags, setTags] = useState([]);

  const getTheTags = () => {
    getTags().then(setTags);
  };

  useEffect(() => {
    getTheTags();
  }, []);

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <div style={{ width: '60%' }}>
          <h1 style={{ display: 'flex', justifyContent: 'center', margin: '10px' }}>Tags</h1>
          {tags.map((tag) => (
            <TagCard key={tag.id} tagObj={tag} onUpdate={getTheTags} />
          ))}
        </div>
        <div style={{
          height: '250px', border: '3px solid black', borderRadius: '50px', margin: '15px', padding: '25px 25px 15px 25px',
        }}
        >
          <h1 style={{ margin: '15px' }}>Create a New Tag</h1>
          <TagForm onSubmit={getTheTags} />
        </div>
      </div>
    </>
  );
}
