import React from 'react';
import iconEmpty from '../../assets/images/icon/empty.png';

const EmptyState = ({ typeName }) => {
  return (
    <>
      <div className='empty-state-container'>
        <img src={iconEmpty} alt='Back to pre page' className='icon-empty' />
        <p> 尚無任何{typeName}的內容</p>
      </div>
    </>
  );
};

export default EmptyState;
