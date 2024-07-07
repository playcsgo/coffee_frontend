import React from 'react';
import TweetCardBasic from '../basic/TweetCardBasic';
import TweetBasicCardSkeleton from '../skeleton/TweetBasicCardSkeleton.jsx';
import EmptyState from '../basic/EmptyState';

const TweetsLists = ({ tweets, onClick, onToggleLike, isLoading }) => {
  return (
    <div className='TweetLists'>
      {isLoading && <TweetBasicCardSkeleton cards={8} />}
      {!isLoading && tweets.length > 0 ? (
        tweets.map((tweet) => {
          return (
            <TweetCardBasic
              key={tweet.id}
              {...tweet}
              onClick={({ tweetId, userId }) => {
                onClick?.({ tweetId, userId });
              }}
              onToggleLike={({ id, isLike }) => {
                onToggleLike?.({ id, isLike });
              }}
            />
          );
        })
      ) : (
        <EmptyState typeName='推文' />
      )}
    </div>
  );
};

export default TweetsLists;
