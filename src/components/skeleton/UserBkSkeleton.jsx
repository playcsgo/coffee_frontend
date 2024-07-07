import React from 'react';
import Skeleton from 'react-loading-skeleton';

const UserBkSkeleton = () => {
  return (
    <Skeleton
      style={{
        width: '100%',
        objectFit: 'cover',
        height: '100%',
      }}
    />
  );
};

export default UserBkSkeleton;
