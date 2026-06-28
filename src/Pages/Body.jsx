import { useEffect } from "react";
import Navbar from "../components/Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import HeroBanner from "../Hero_Banner.jpg";
const Body = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((store) => store.user);
  const fetchUser = async () => {
    try {
      const user = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });

      dispatch(addUser(user.data));
    } catch (err) {
      navigate("/login");
      console.log(err);
    }
  };
  useEffect(() => {
    if (!userData) {
      fetchUser();
    }
  }, []);

  return (
    <>
      <div
        className="min-h-screen bg-cover bg-center text-slate-100 flex flex-col font-sans relative overflow-x-hidden"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(15, 23, 42, 0.85), rgba(15, 23, 42, 0.75)), url(${HeroBanner})`,
        }}
      >
        <Navbar />
        <div className="flex-1 flex flex-col justify-center">
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Body;
