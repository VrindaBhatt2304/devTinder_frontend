import { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequests } from "../utils/requestSlice";
const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const reviewRequest = async (status, _id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true },
      );

      dispatch(removeRequests(_id));
    } catch (err) {
      console.log(err);
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      console.log(res.data.data);
      dispatch(addRequests(res?.data?.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests || requests.length === 0) {
    return (
      <div className="flex justify-center my-10">
        <h1 className="text-bold text-2xl">No Requests Found</h1>
      </div>
    );
  }

  return (
    <div className="justify-center my-6 flex flex-col items-center px-4">
      <h1 className="font-extrabold text-3xl mb-8 tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
        Incoming Requests
      </h1>

      <div className="flex flex-col gap-6 items-center w-full">
        {requests && requests.length > 0 ? (
          requests.map((request) => {
            const { firstName, lastName, photoURL, gender, about, skills } =
              request.fromUserId;

            return (
              <div
                key={request._id}
                className="card bg-slate-900/90 border border-slate-800/80 w-full max-w-sm sm:w-96 shadow-xl rounded-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:border-slate-700/80 group overflow-hidden"
              >
                <figure className="pt-6 pb-2 flex justify-center relative overflow-hidden">
                  <div className="absolute w-32 h-32 bg-violet-600/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <img
                    className="h-32 w-32 rounded-full object-cover border-4 border-slate-800 group-hover:border-violet-500/50 shadow-md transition-all duration-500 relative z-10"
                    src={photoURL || "https://placeholder.co/150"}
                    alt={`${firstName} ${lastName}`}
                  />
                </figure>

                <div className="card-body p-6 gap-3 text-left">
                  <div className="flex justify-between items-baseline">
                    <h2 className="card-title text-xl font-bold text-white tracking-tight">
                      {firstName} {lastName}
                    </h2>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                      {gender}
                    </span>
                  </div>

                  <div className="space-y-2 mt-1 text-sm text-slate-300">
                    <p className="line-clamp-3 text-slate-400 leading-relaxed">
                      <span className="font-semibold text-slate-200">
                        About:
                      </span>{" "}
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

                  <div className="card-actions mt-5 grid grid-cols-2 gap-3 w-full">
                    <button
                      className="btn border border-red-500/30 bg-red-950/20 text-red-400 hover:bg-red-600 hover:text-white hover:border-red-600 hover:shadow-lg hover:shadow-red-600/20 active:scale-95 transition-all duration-200 font-semibold rounded-xl py-3 h-auto"
                      onClick={() => reviewRequest("rejected", request._id)}
                    >
                      ❌ Reject
                    </button>
                    <button
                      className="btn border border-emerald-500/30 bg-emerald-950/20 text-emerald-400 hover:bg-emerald-600 hover:text-white hover:border-emerald-600 hover:shadow-lg hover:shadow-emerald-600/20 active:scale-95 transition-all duration-200 font-semibold rounded-xl py-3 h-auto"
                      onClick={() => reviewRequest("accepted", request._id)}
                    >
                      ✅ Accept
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-12 text-slate-500 italic">
            No incoming requests found. Check back later!
          </div>
        )}
      </div>
    </div>
  );
};

export default Requests;
