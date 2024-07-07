import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const TweetBasicCardSkeleton = ({ cards }) => {
  return Array(cards)
    .fill(0)
    .map((item, i) => (
      <div className='tweet-card-basic' key={i}>
        <div className='left-col'>
          <Skeleton circle width={50} height={50} />
        </div>
        <div className='tweet-card-left-info'>
          <Skeleton borderRadius={20} />
          <Skeleton
            style={{
              borderRadius: '20px',
              width: '75%',
            }}
          />
          <Skeleton
            style={{
              borderRadius: '20px',
              width: '50%',
            }}
          />
        </div>
      </div>
    ));
};

export default TweetBasicCardSkeleton;
