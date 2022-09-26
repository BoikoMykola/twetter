import React from 'react';

function ModifyItem(props) {
  const {
    modifyItem,
    itemInput,
    setItemInput,
    setModifyItem,
    tweetArr,
    setMassege,
    setTweetsWithSave
  } = props;

  function getSave() {
    let check = tweetArr.findIndex((item) => {
      return item.tweet === itemInput;
    });

    if (check >= 0 && check !== modifyItem - 1) {
      setMassege("Error! You can't tweet about that");
      setTimeout(() => setMassege(''), 2000);
      return;
    } else if (itemInput === '') {
      return;
    } else if (typeof modifyItem !== 'boolean') {
      const newTweets = tweetArr.map((tweet, index) => {
            if (index === modifyItem - 1) {
              return { ...tweet, tweet: itemInput };
            } else {
              return tweet;
            }
          })
      
      setTweetsWithSave(newTweets);
      setItemInput('');
      setModifyItem(false);
    } else {
      let newTweet = {
        tweet: itemInput,
        like: false,
      };
      const newTweets = [...tweetArr, newTweet]
      
      setTweetsWithSave(newTweets);
      setItemInput('');
      setModifyItem(false);
    }
  }

  return (
    <div id="modifyItem" className={modifyItem ? '' : 'hidden'}>
      <h1 id="modifyItemHeader">Edit tweet</h1>
      <textarea
        id="modifyItemInput"
        onChange={(e) => setItemInput(e.target.value)}
        value={itemInput}
      />
      <div className="formButtons">
        <button
          id="cancelModification"
          onClick={() => {
            setModifyItem(false);
            setItemInput('');
          }}
        >
          Cancel
        </button>
        <button id="saveModifiedItem" onClick={getSave}>
          Save Changes
        </button>
      </div>
    </div>
  );
}

export default ModifyItem;
