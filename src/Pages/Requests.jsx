import { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequests } from "../utils/requestSlice";
const Requests = () => {
    const requests = useSelector((store)=>store.requests);
    const dispatch = useDispatch();

    const reviewRequest = async (status, _id) =>{
      try{
          const res = await axios.post(BASE_URL + "/request/review/"+status+"/"+_id,{},{withCredentials: true});

          dispatch(removeRequests(_id));
      }
      catch(err)
      {
          console.log(err);
      }
    };

    const fetchRequests =  async () => {
        try{
            const res = await axios.get(BASE_URL + "/user/requests/received",{withCredentials: true});
            console.log(res.data.data);
            dispatch(addRequests(res?.data?.data));
        }
        catch(err){
            console.log(err);
        }
    };

    useEffect(()=>{
        fetchRequests();
    },[]);

    if(!requests || requests.length === 0) {
    return (
      <div className="flex justify-center my-10">   
        <h1 className="text-bold text-2xl">No Requests Found</h1>
      </div>
    );
  };
 
  return (
  <div className="justify-center my-10 flex flex-col items-center">
    <h1 className="font-bold text-2xl">Requests</h1>

    {requests.map((request) => {
      const { firstName, lastName, photoURL, gender, about, skills } =
        request.fromUserId;

      return (
        <div className="bg-white p-4 m-4 rounded-2xl shadow-lg w-96 text-center">
          <h2 className="text-gray-900 text-lg font-bold">
            {firstName + " " + lastName}
          </h2>

          <img
            src={photoURL}
            alt={`${firstName} ${lastName}`}
            className="w-40 h-40 mx-auto rounded-lg object-cover mt-4"
          />

          <p className="text-gray-900">{gender}</p>

          {about && (
            <p className="text-gray-900 mt-2">{about}</p>
          )}

          <div className="flex flex-wrap gap-2 mt-2 justify-center">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="bg-gray-700 text-white px-2 py-1 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>

          <div className="flex gap-4 mt-4 justify-center">
            <button className="btn btn-success bg-green-800 hover:bg-green-900 p-4" 
              onClick={()=>reviewRequest("accepted", request._id)}>
                Accept
            </button>
            <button className="btn btn-error bg-red-800 hover:bg-red-900 p-4"
              onClick={()=>reviewRequest("rejected", request._id)}>
                Reject 
            </button>
          </div>
        </div>
      );
    })}
  </div>
);
};

export default Requests;