import { useEffect, useState } from 'react';
// import { useAuth } from '../../utils/context/authContext';
import { getTags } from '../../api/tagData';
import TagCard from '../../components/TagCard';

export default function Tags() {
  // const { user } = useAuth();
  const [tags, setTags] = useState([]);
  // const [userDetails, setUserDetails] = useState({});

  const getTheTags = () => {
    getTags().then(setTags);
  };

  // const getTheUser = () => {
  //   getSingleUser(user.uid).then(setUserDetails);
  // };

  useEffect(() => {
    getTheTags();
  }, []);

  // useEffect(() => {
  //   getTheUser();
  // }, []);

  return (
    <>
      <h1>Tags</h1>
      {tags.map((tag) => (
        <TagCard key={tag.id} tagObj={tag} onUpdate={getTheTags} />
      ))}
    </>
  );
}
