import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    if (e) e.preventDefault();
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        { email, password },
        { withCredentials: true },
      );

      dispatch(addUser(res.data));
      setShowToast(true);

      setTimeout(() => {
        setShowToast(false);
        navigate("/feed");
      }, 2000);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "An error occurred during login. Please try again.",
      );
      console.log(err);
    }
  };

  return (
    <div className="flex justify-center items-center my-12 px-4 w-full relative min-h-[60vh]">
      {showToast && (
        <div className="fixed top-24 right-6 z-[200] flex items-center gap-3 bg-slate-900/90 backdrop-blur-md border border-emerald-500/30 text-emerald-400 px-5 py-4 rounded-xl shadow-2xl min-w-[280px]">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-base">
            🚀
          </div>
          <div>
            <p className="font-bold text-sm text-white">Welcome Back!</p>
            <p className="text-xs text-slate-400">
              Loading your developer feed...
            </p>
          </div>
          <div className="absolute bottom-0 left-0 h-[3px] bg-gradient-to-r from-emerald-500 to-teal-400 w-full rounded-b-xl animate-shrink-width"></div>
        </div>
      )}

      <div className="card bg-slate-900/80 backdrop-blur-md border border-slate-800/80 w-full max-w-md shadow-2xl rounded-2xl overflow-hidden transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-2xl hover:border-violet-500/40 group">
        <div className="card-body p-6 sm:p-8">
          <h1 className="font-extrabold text-3xl text-center mb-1 tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
            Welcome Back
          </h1>
          <p className="text-center text-xs text-slate-400 mb-6">
            Enter your terminal credentials to login
          </p>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-2.5 rounded-xl text-sm text-center font-medium mb-4">
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <fieldset className="fieldset flex flex-col">
              <legend className="text-xs font-semibold text-slate-400 mb-1.5 ml-1">
                Email ID
              </legend>
              <input
                type="email"
                value={email}
                className="bg-slate-950/60 border border-slate-800 focus:border-violet-500/60 text-slate-100 placeholder-slate-600 rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200 shadow-inner focus:ring-1 focus:ring-violet-500/20"
                placeholder="developer@example.com"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </fieldset>

            <fieldset className="fieldset flex flex-col">
              <legend className="text-xs font-semibold text-slate-400 mb-1.5 ml-1">
                Password
              </legend>
              <input
                type="password"
                value={password}
                className="bg-slate-950/60 border border-slate-800 focus:border-violet-500/60 text-slate-100 placeholder-slate-600 rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200 shadow-inner focus:ring-1 focus:ring-violet-500/20"
                placeholder="••••••••"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </fieldset>

            <div className="card-actions justify-center pt-4">
              <button
                type="submit"
                className="btn w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:opacity-95 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-violet-600/20 active:scale-[0.99] transition-all duration-200 h-auto text-center transform hover:-translate-y-0.5"
              >
                Sign In
              </button>
            </div>
          </form>

          <p className="text-center text-xs text-slate-500 mt-6">
            If not already a member...{" "}
            <Link
              to="/signup"
              className="text-violet-400 hover:text-violet-300 font-medium transition duration-150 underline decoration-violet-500/30 underline-offset-4"
            >
              SignUp
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
