import React from 'react';
import Skeleton from 'react-loading-skeleton';

const UserAvatarSkeleton = ({ avatarSize = 140 }) => {
  return (
    <Skeleton
      style={{
        width: `${avatarSize}px`,
        height: `${avatarSize}px`,
        border: '4px solid var(--main-white)',
        borderRadius: '50%',
        objectFit: 'cover',
      }}
    />
  );
};

export default UserAvatarSkeleton;
