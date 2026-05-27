import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useEffect } from 'react';
import { useDispatch , useSelector} from 'react-redux';
import { addConnections } from '../utils/connectionSlice';
import { Link } from 'react-router-dom';

const Connections = () => {
  const connections = useSelector((store) => store.connection);
  const dispatch = useDispatch();
  const fetchConnections = async () => {
    try{
        const res = await axios.get(BASE_URL + "/user/connections", {withCredentials: true});
        console.log(res.data.data);
        dispatch(addConnections(res?.data?.data));
    }
    catch(err)
    {
        console.error('Error fetching connections:', err);
    }
  };

  useEffect(()=>{
    fetchConnections();
  },[]);

  if(!connections || connections.length === 0) {
    return (
      <div className="flex justify-center my-10">   
        <h1 className="text-bold text-2xl">No Connections Found</h1>
      </div>
    );
  }

  return (
    <div className="justify-center my-10 flex flex-col items-center">
        <h1 className="text-bold text-2xl">Connections</h1>

        {connections.map((connection) => {
         const {firstName, lastName, photoURL, gender, about, skills} = connection;
         return (
           <div className="bg-white p-4 m-4 rounded-2xl shadow-lg w-96 text-center">
             <h2 className="text-gray-900 text-lg font-bold">{firstName+" " +lastName}</h2>
             <img src={photoURL} alt={`${firstName} ${lastName}`} className="w-40 h-40 mx-auto rounded-lg object-cover mt-4" />
             <p className="text-gray-900">{gender}</p>
             {about && <p className="text-gray-900">{about}</p>}
             <div className="flex flex-wrap gap-2 mt-2 justify-center">
               {skills.map((skill, index) => (
                 <span key={index} className="bg-gray-700 text-white px-2 py-1 rounded-full text-sm">
                   {skill}
                 </span>
               ))}
             </div>
             <Link to={`/chat/${connection._id}`}>
               <button className="btn btn-black bg-gray-900 text-white px-4 py-2 m-2 rounded-lg">Chat</button>
             </Link>
           </div>
         );
        })}    
    </div>
  );
};

export default Connections;