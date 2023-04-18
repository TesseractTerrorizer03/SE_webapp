import { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, child } from 'firebase/database';

const Tags = () => {
  const [tag, setTag] = useState('');
  const [pushIds, setPushIds] = useState([]);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    if (tag) {
      const db = getDatabase();
      const tagsRef = ref(db, `Tags/${tag}`);
      const questionsRef = ref(db, 'Questions');

      onValue(tagsRef, (snapshot) => {
        const pushIds = [];
        snapshot.forEach((childSnapshot) => {
          
          const value = childSnapshot.val();
          if (value === true) {
            pushIds.push(childSnapshot.key);
          }
        });
        // console.log(pushIds);
        setPushIds(pushIds);

        Promise.all(
          pushIds.map((pushId) =>
            new Promise((resolve) => {
              const queryRef = child(questionsRef, `${pushId}/query`);
              onValue(queryRef, (snapshot) => {
                const query = snapshot.val();
                resolve(query);
              });
            })
          )
        ).then((queries) => {
          setQuestions(queries);
        });
      });
    }
  }, [tag]);

  const handleTagChange = (e) => {
    setTag(e.target.value);
    setPushIds([]);
    setQuestions([]);
  };

  return (
    <div>
      <select value={tag} onChange={handleTagChange}>
        <option value="">Select a tag</option>
        <option value="CS Course">CS Course</option>
        <option value="Chemistry">Chemistry</option>
        <option value="MAL Course">MAL Course</option>
        <option value="EE Course">EE Course</option>
      </select>
      
      {questions.length > 0 ? (
        <div>
          Questions for {tag}:
          <ul>
            {questions.map((query) => (
              <li key={query}>{query}</li>
            ))}
          </ul>
        </div>
      ) : (
        <div>No questions found</div>
      )}
    </div>
  );
};

export default Tags;
