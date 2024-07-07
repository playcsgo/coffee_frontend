import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserLikedTweets } from '../../api/twitter';
import TweetCardLike from '../basic/TweetCardLike';
import { useAuth } from '../context/AuthContext';
import TweetBasicCardSkeleton from '../skeleton/TweetBasicCardSkeleton.jsx';
import EmptyState from '../basic/EmptyState';

const LikeLists = ({ pathId, tabIndex, setPathId }) => {
  const [userLiked, setUserLiked] = useState([]);
  const navigate = useNavigate();
  const { like, handleChangeLikeMode, member } = useAuth();
  const [isTweetLoading, setIsTweetLoading] = useState(true); //tweets-loading狀態

  const handleClickCard = ({ userId }) => {
    userId === member.id
      ? navigate(`/user/${userId}`)
      : userId !== undefined && navigate(`/other/${userId}`);
    setPathId(userId);
  };

  useEffect(() => {
    const getUserLikedTweetsAsync = async () => {
      setIsTweetLoading(true);
      try {
        const data = await getUserLikedTweets(pathId);
        setUserLiked(data);
        setIsTweetLoading(false);
        // if (userLiked.length === 0) {
        //   setIsDataEmpty(true);
        // }
        // console.log(userLiked);
      } catch (error) {
        console.log(error);
        setIsTweetLoading(false);
      }
    };
    getUserLikedTweetsAsync();
  }, [like, pathId]);

  // console.log(isDataEmpty);

  return (
    <div className='TweetLists'>
      {isTweetLoading && <TweetBasicCardSkeleton cards={4} />}
      {!isTweetLoading && userLiked.length === 0 ? (
        <EmptyState typeName='喜歡' />
      ) : (
        userLiked.map((tweet) => {
          return (
            <TweetCardLike
              key={tweet.id}
              {...tweet}
              tabIndex={tabIndex}
              onClick={handleClickCard}
              onToggleLike={handleChangeLikeMode}
            />
          );
        })
      )}
    </div>
  );
};

export default LikeLists;
