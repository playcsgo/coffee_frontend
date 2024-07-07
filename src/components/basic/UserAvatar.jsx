import React from 'react';
// import skeleton-loading
import UserAvatarSkeleton from '../skeleton/UserAvatarSkeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const UserAvatar = ({ avatar, onClick, userId, isLoading, avatarSize }) => {
  return (
    <>
      <div
        className='avatar'
        onClick={(e) => {
          onClick?.({ userId });
          e.stopPropagation();
          //因為在最內層點擊事件 外層有相對應的事件 也會跟著觸發 因此加入e.stopPropagation()來避免外層觸發的可能
        }}
      >
        {isLoading && <UserAvatarSkeleton avatarSize={avatarSize} />}
        {!isLoading && (
          <img src={avatar} alt='userAvatar' className='user-avatar' />
        )}
      </div>
    </>
  );
};

export default UserAvatar;
