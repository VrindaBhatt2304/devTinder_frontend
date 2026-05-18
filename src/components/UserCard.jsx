import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { removeFeed } from "../utils/feedSlice";
import { useDispatch } from "react-redux";

const UserCard = ({ user }) => {
    const {_id, firstName, lastName, photoURL, gender, about, skills} = user;
    const dispatch = useDispatch();
    const handleSendRequest = async (status, userId) => {
      try{
        const res = await axios.post(BASE_URL + "/request/send/"+status+"/"+userId,{},{ withCredentials: true, });
        console.log(res.data);
        dispatch(removeFeed(userId));
      }
      catch(err){
          console.log(err);
      }
    };
  
    return (
    <div className="card bg-base-300 w-96 shadow-lg">
      <figure>
        <img className="h-32 w-32 p-2"
          src={photoURL}
          alt="User"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName +" " + lastName}</h2>
        <p>
            Gender : {gender}
        </p>
        <p>
            About : {about}
        </p>
        <p>
            Skills : {skills.join(", ")}
        </p>
        <div className="card-actions m-4 justify-center">
          <button className="btn btn-success bg-green-700 p-2"
            onClick={() =>handleSendRequest("interested", _id)}>Intrested</button>
          <button className="btn btn-error bg-red-700 p-2"
            onClick={() =>handleSendRequest("ignored", _id)}>Ignore</button>
        </div>
      </div>
    </div>
  );
};
export default UserCard;
