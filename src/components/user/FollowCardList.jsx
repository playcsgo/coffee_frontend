import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTopUsers } from '../../api/twitter';
import FollowCard from '../basic/FollowCard';
import { useAuth } from '../context/AuthContext';
import FollowCardSkeleton from '../skeleton/FollowCardSkeleton';

const FollowCardList = ({ setPathId }) => {
  const [users, setUsers] = useState([]);
  const { member, userIsFollowing } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleClickCard = ({ userId }) => {
    userId === member.id
      ? navigate(`/user/${userId}`)
      : userId !== undefined && navigate(`/other/${userId}`);
    setPathId(userId);
  };

  const getUsersAsync = async () => {
    setIsLoading(true);
    try {
      const data = await getTopUsers();
      setUsers(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  //initial render
  useEffect(() => {
    setIsLoading(true);
  }, []);
  //把setIsLoading(true);放到這裡面

  // render when userIsFollowing changing
  useEffect(() => {
    getUsersAsync();
  }, [userIsFollowing]);
  // 兩個一樣的useEffect 使用相同的函示，第一次配合loading，其他經過改變後的替換渲染，
  return (
    <>
      <div className='follow-list-container'>
        <div className='title-secondary'>
          <h4>推薦跟隨</h4>
        </div>
        {/* 固定 8 名 */}
        {isLoading && <FollowCardSkeleton cards={8} />}
        {!isLoading &&
          users.map((user) => {
            console.log(users)
            return (
              <FollowCard key={user.id} {...user} onClick={handleClickCard} />
            );
          })}
      </div>
    </>
  );
};

export default FollowCardList;
