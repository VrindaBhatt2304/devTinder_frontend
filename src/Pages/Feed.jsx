import axios from 'axios';
import { addFeed } from '../utils/feedSlice';
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from '../utils/constants';
import { useEffect } from 'react';
import UserCard from '../components/UserCard';
const Feed = () => {
    const feed = useSelector((store) => store.feed);
    const dispatch = useDispatch();

    

    const getFeed = async () => {
        try{
        if(feed) return;
        const res = await axios.get(BASE_URL + "/user/feed",{ withCredentials: true, });

        dispatch(addFeed(res.data));
        }
        catch(err){
            console.log(err);
        }
    };
    useEffect(()=>{
        getFeed();
    },[]);

    if(!feed || feed.length === 0){
        return (
            <div className="flex items-center justify-center p-8">
                <h1 className="text-2xl font-bold">No more users to show</h1>
                
            </div>
        );
    }  
    
  return (
    feed && (<div className="flex items-center justify-center p-8">
    <UserCard user={feed[0]}/>
    </div>)
  );
};

export default Feed;