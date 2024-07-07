import React, { useEffect, useState } from 'react';
import { getUserRepliedTweets } from '../../api/twitter';
import TweetCardReply from '../basic/TweetCardReply';
import TweetBasicCardSkeleton from '../skeleton/TweetBasicCardSkeleton.jsx';
import EmptyState from '../basic/EmptyState';

const ReplyLists = ({ pathId, onClick }) => {
  const [userReplied, setUserReplied] = useState([]);
  const [isTweetLoading, setIsTweetLoading] = useState(true); //tweets-loading狀態

  useEffect(() => {
    const getUserRepliedTweetsAsync = async () => {
      setIsTweetLoading(true);
      try {
        const data = await getUserRepliedTweets(pathId);
        setIsTweetLoading(false);
        setUserReplied(data);
      } catch (error) {
        setIsTweetLoading(false);
      }
    };
    getUserRepliedTweetsAsync();
  }, [pathId]);
  return (
    <div className='TweetLists'>
      {isTweetLoading && <TweetBasicCardSkeleton cards={4} />}

      {userReplied.length >= 0 ? (
        <EmptyState typeName='回覆' />
      ) : (
        userReplied.map((tweet) => {
          return (
            <TweetCardReply
              key={tweet.id}
              {...tweet}
              // onClick={({id,userId})=>{
              //   onClick?.({id,userId})
              // }}
            />
          );
        })
      )}
    </div>
  );
};

export default ReplyLists;
