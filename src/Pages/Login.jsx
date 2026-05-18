import { useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [email, setEmail] = useState("vrinda02@gmail.com");
  const [password, setPassword] = useState("Vrinda@2002");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async() =>{
    try{
      const res=await axios.post(BASE_URL + "/login",{
      email,
      password
    },{ withCredentials: true });
    dispatch(addUser(res.data)); 
    navigate("/");
    }
    catch(err){
      setError(err?.response?.data?.message || "An error occurred during login. Please try again.");
      console.log(err);
    }
  }
  return (
    <div className="flex justify-center my-10">
      <div className="card card-dash bg-base-300 w-96">
        <div className="card-body">
          <h1 className="card-title justify-center text-2xl">Login to your account</h1>

          <fieldset className="fieldset">
            <legend className="fieldset-legend my-2">Email ID</legend>
            <input type="email" value={email} 
              className="input" placeholder="Type your e-mail"
              onChange={(e) => setEmail(e.target.value)} />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend my-2">Password</legend>
            <input type="password" value={password} 
              className="input" placeholder="Type your password"
              onChange={(e) => setPassword(e.target.value)} />
          </fieldset>

          <p className="text-red-500 text-center">
            {error}
          </p>

          <p className="flex justify-center">
            if not already a member, click here to
            <Link to="/signup" className="text-blue-500">
             Sign Up
            </Link>
          </p>

          <div className="card-actions justify-center">
            <button className="btn bg-base-200 text-white border-base-200 p-4" onClick={handleLogin}>Login</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
