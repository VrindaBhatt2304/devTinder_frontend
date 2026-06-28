import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";
import DevTinderLogo from "../icon.png";

const Navbar = () => {
  const userr = useSelector((store) => store.user);

  const naviagte = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      naviagte("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="navbar bg-slate-950/40 backdrop-blur-md border-b border-slate-800/50 sticky top-0 z-50 px-6 h-16">
      <div className="flex-1">
        <Link to="/">
          <div className="h-16 w-16 flex items-center justify-center">
            <img src={DevTinderLogo} alt="DevTinder" />
          </div>
        </Link>
      </div>
      <div className="flex gap-2">
        {userr && (
          <div className="dropdown dropdown-end mx-5 flex">
            <p className="p-4 items-center">
              Welcome, <span className="font-bold">{userr.firstName}</span>
            </p>
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <img
                  alt="Navbar component"
                  src={userr.photoURL}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-slate-950/90 backdrop-blur-lg border border-slate-800/80 rounded-xl z-[100] mt-3 w-52 p-2 shadow-2xl text-slate-200"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                </Link>
              </li>
              <li>
                <Link to="/feed">Feed</Link>
              </li>
              <li>
                <Link to="/connections">Connections</Link>
              </li>
              <li>
                <Link to="/requests">Requests</Link>
              </li>
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
