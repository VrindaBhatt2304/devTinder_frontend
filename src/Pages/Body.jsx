import { useEffect } from 'react'
import Navbar from '../components/Navbar'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../utils/userSlice'


const Body = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((store) => store.user);
  const fetchUser = async () => {
    try{
      const user= await axios.get(BASE_URL + "/profile/view",
      { withCredentials: true, }
    );

    dispatch(addUser(user.data));
    }
    catch(err){
      navigate("/login");
      console.log(err);
    }
  };
  useEffect(()=>{
    if(!userData){
      fetchUser();
    }
  },[]);

  return (
    <>
    <Navbar/>
    <Outlet/>
    <Footer/>
    </>
  )
}

export default Body;