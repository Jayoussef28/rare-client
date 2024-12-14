import PropTypes from 'prop-types';
import { useState } from 'react';
// useEffect
// import { useAuth } from '../utils/context/authContext';
import { deleteTag, updateTag } from '../api/tagData';
import TagForm from './Forms/TagForm';

function TagCard({ tagObj, onUpdate }) {
  // const [tagUser, SetTagUser] = useState({});
  const [tagText, SetTagText] = useState(tagObj.label);
  // const [edit, setEdit] = useState(false);

  // useEffect(() => {
  //   getSingleUser(user.uid).then((obj) => {
  //     SetTagUser(obj);
  //   });
  // });

  const deleteThisTag = () => {
    if (window.confirm('Delete this tag?')) {
      deleteTag(tagObj.id).then(() => onUpdate());
    }
  };

  const handleSubmit = (obj) => {
    updateTag(obj).then((updatedTagObj) => {
      SetTagText(updatedTagObj.label);
      onUpdate();
    });
    // setEdit(false);
  };

  const editThisTag = () => {
    SetTagText(<TagForm obj={tagObj} onSubmit={handleSubmit} />);
    // setEdit(true);
  };

  return (
    <>
      <a href={editThisTag}>&#xF4CB;</a><a href={deleteThisTag}>&#xF78B;</a><p>{tagText}</p>
    </>
  );
}

TagCard.propTypes = {
  tagObj: PropTypes.shape({
    id: PropTypes.number,
    label: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default TagCard;
