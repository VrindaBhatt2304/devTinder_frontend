import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { removeFeed } from "../utils/feedSlice";
import { useDispatch } from "react-redux";

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, photoURL, gender, about, skills } = user;
  const dispatch = useDispatch();
  const handleSendRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true },
      );
      console.log(res.data);
      dispatch(removeFeed(userId));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="card bg-slate-900 border border-slate-800 w-full max-w-sm sm:w-96 shadow-xl rounded-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:border-slate-700/80 group overflow-hidden">
      <figure className="pt-6 pb-2 flex justify-center relative overflow-hidden">
        <div className="absolute w-32 h-32 bg-violet-600/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <img
          className="h-36 w-36 rounded-full object-cover border-4 border-slate-800 group-hover:border-violet-500/50 shadow-md transition-all duration-500 relative z-10"
          src={photoURL || "https://placeholder.co/150"}
          alt={`${firstName}'s profile`}
        />
      </figure>

      <div className="card-body p-6 gap-3">
        <div className="flex justify-between items-baseline">
          <h2 className="card-title text-2xl font-bold text-white tracking-tight">
            {firstName} {lastName}
          </h2>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
            {gender}
          </span>
        </div>

        <div className="space-y-2 mt-1 text-sm text-slate-300">
          <p className="line-clamp-3 text-slate-400 leading-relaxed">
            <span className="font-semibold text-slate-200">About:</span>{" "}
            {about || "No bio provided yet."}
          </p>

          <div className="pt-2">
            <span className="font-semibold text-slate-200 block mb-1.5">
              Skills:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {skills && skills.length > 0 ? (
                skills.map((skill, index) => (
                  <span
                    key={index}
                    className="text-xs font-medium px-2 py-0.5 rounded bg-violet-500/10 text-violet-400 border border-violet-500/20 shadow-sm"
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <span className="text-xs italic text-slate-500">
                  No skills added
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="card-actions mt-6 grid grid-cols-2 gap-3 w-full">
          <button
            className="btn border border-red-500/30 bg-red-950/20 text-red-400 hover:bg-red-600 hover:text-white hover:border-red-600 hover:shadow-lg hover:shadow-red-600/20 active:scale-95 transition-all duration-200 font-semibold rounded-xl py-3 h-auto"
            onClick={() => handleSendRequest("ignored", _id)}
          >
            ❌ Ignore
          </button>
          <button
            className="btn border border-emerald-500/30 bg-emerald-950/20 text-emerald-400 hover:bg-emerald-600 hover:text-white hover:border-emerald-600 hover:shadow-lg hover:shadow-emerald-600/20 active:scale-95 transition-all duration-200 font-semibold rounded-xl py-3 h-auto"
            onClick={() => handleSendRequest("interested", _id)}
          >
            🔥 Interested
          </button>
        </div>
      </div>
    </div>
  );
};
export default UserCard;
