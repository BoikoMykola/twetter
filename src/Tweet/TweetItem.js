import React from 'react';
import PropTypes from 'prop-types';

function TweetItem({ tweet, index, removeTweet, likeTweet, modifyTweet }) {
  return (
    <li className="listItem">
      <span
        id={'tweet' + (index + 1)}
        className="tweetText"
        onClick={(event) => modifyTweet(event.target)}
      >
        {tweet.tweet}
      </span>
      <button
        id={'remove' + (index + 1)}
        className="removeTweet"
        onClick={(event) => removeTweet(event.target)}
      >
        remove
      </button>
      <button
        id={'like' + (index + 1)}
        className="likeTweet"
        onClick={(event) => likeTweet(event.target)}
      >
        {tweet.like ? 'unlike' : 'like'}
      </button>
    </li>
  );
}

TweetItem.propTypes = {
  tweet: PropTypes.object.isRequired,
  index: PropTypes.number,
};

export default TweetItem;
