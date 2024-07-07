import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const FollowCardSkeleton = ({ cards }) => {
  return Array(cards)
    .fill(0)
    .map((item, i) => (
      <div className='follow-card follow-card-skeleton' key={i}>
        <div className='left-col'>
          <Skeleton circle width={50} height={50} />
        </div>
        <div className='right-col'>
          <Skeleton
            style={{
              borderRadius: '20px',
              width: '100%',
              height: '14px',
            }}
          />
          <Skeleton
            style={{
              borderRadius: '20px',
              width: '75%',
              height: '14px',
            }}
          />
        </div>
      </div>
    ));
};

export default FollowCardSkeleton;
