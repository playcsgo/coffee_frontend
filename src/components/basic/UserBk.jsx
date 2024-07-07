import React from 'react';
// import DefaultBk from '../../assets/images/bk.jpg';
import UserBkSkeleton from '../skeleton/UserBkSkeleton';
const UserBk = ({ bkUrl = null, isLoading }) => {
  return (
    <>
      <div className='profile-bk-clip'>
        {isLoading && <UserBkSkeleton />}
        {!isLoading && (
          <img src={bkUrl} alt='mountain pic' className='profile-bk-image' />
        )}
        {/* ? : */}
      </div>
    </>
  );
};

export default UserBk;
