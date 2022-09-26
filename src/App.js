import React, { useState, useEffect } from 'react';
import './App.css';
import ModifyItem from './ModifyItem/ModifyItem';
import TweetItem from './Tweet/TweetItem';

function App() {
  const [tweetArr, setTweetArr] = useState(
    localStorage.getItem('tweets')
      ? JSON.parse(localStorage.getItem('tweets'))
      : []
  );
  const [modifyItem, setModifyItem] = useState(false);
  const [itemInput, setItemInput] = useState('');
  const [massege, setMassege] = useState('');
  const [likeButton, setLikeButton] = useState(false);
  const [showLikedPage, setShowLikedPage] = useState(false);

  const setTweetsWithSave = (newTweets) => {
    setTweetArr(newTweets);
    localStorage.setItem('tweets', JSON.stringify(newTweets));
  };

  function removeTweet(id) {
    const idNumber = id.id.match(/\d+/gi)[0] - 1;
    const newTweets = tweetArr.filter((tweet, index) => index !== idNumber);

    setTweetsWithSave(newTweets);
  }

  function likeTweet(target) {
    const idNumber = target.id.match(/\d+/gi)[0] - 1;

    if (!tweetArr[idNumber].like) {
      setMassege(`Hooray! You liked tweet with id ${idNumber + 1}!`);
    } else {
      setMassege(`Sorry you no longer like tweet with id ${idNumber + 1}!`);
    }
    setTimeout(() => setMassege(''), 2000);

    const newTweets = tweetArr.map((tweet, index) => {
      if (index === idNumber) {
        return { ...tweet, like: !tweet.like };
      } else {
        return tweet;
      }
    });
   
    setTweetsWithSave(newTweets);
  }

  useEffect(() => {
    if (tweetArr.find((elem) => elem.like === true) && !showLikedPage) {
      setLikeButton(true);
    } else if (!tweetArr.find((elem) => elem.like === true) && showLikedPage) {
      setShowLikedPage(false)
    } else {
      setLikeButton(false);
      
    }
  }, [tweetArr, showLikedPage]);

  function modifyTweet(target) {
    const idNumber = target.id.match(/\d+/gi)[0];

    setItemInput(tweetArr[idNumber - 1].tweet);
    setModifyItem(idNumber);
  }

  function GetLikedPage() {
    if (showLikedPage) {
      return tweetArr.map((tweet, index) => {
        if (tweet.like) {
          return (
            <TweetItem
              tweet={tweet}
              key={index}
              index={index}
              removeTweet={removeTweet}
              likeTweet={likeTweet}
              showLikedPage={showLikedPage}
              modifyTweet={modifyTweet}
            />
          );
        } else {
          return null;
        }
      });
    } else {
      return tweetArr.map((tweet, index) => {
        return (
          <TweetItem
            tweet={tweet}
            key={index}
            index={index}
            removeTweet={removeTweet}
            likeTweet={likeTweet}
            showLikedPage={showLikedPage}
            modifyTweet={modifyTweet}
          />
        );
      });
    }
  }

  return (
    <>
      <div id="root">
        <div id="alertMessage" className={massege ? '' : 'hidden'}>
          <span id="alertMessageText">{massege}</span>
        </div>
        <div
          id="tweetItems"
          className={'listPage' + (modifyItem ? ' hidden' : '')}
        >
          <h1>{showLikedPage ? 'Liked Tweets' : 'Simple Twitter'}</h1>
          <div id="navigationButtons">
            <button
              className={'addTweet' + (showLikedPage ? ' hidden' : '')}
              onClick={() => setModifyItem(true)}
            >
              Add tweet
            </button>
            <button
              className={likeButton ? '' : 'hidden'}
              onClick={() => {
                setShowLikedPage(true);
                setLikeButton(false);
              }}
            >
              Go to liked
            </button>
            <button
              className={showLikedPage ? '' : 'hidden'}
              onClick={() => setShowLikedPage(false)}
            >
              back
            </button>
          </div>
          <ul id="list">
            <GetLikedPage />
          </ul>
        </div>
        <ModifyItem
          modifyItem={modifyItem}
          setModifyItem={setModifyItem}
          tweetArr={tweetArr}
          setMassege={setMassege}
          itemInput={itemInput}
          setItemInput={setItemInput}
          setTweetsWithSave={setTweetsWithSave}
        />
      </div>
    </>
  );
}

export default App;
