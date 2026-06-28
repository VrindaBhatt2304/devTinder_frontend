import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import { Link } from "react-router-dom";

const Connections = () => {
  const connections = useSelector((store) => store.connection);
  const dispatch = useDispatch();
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      console.log(res.data.data);
      dispatch(addConnections(res?.data?.data));
    } catch (err) {
      console.error("Error fetching connections:", err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections || connections.length === 0) {
    return (
      <div className="flex justify-center my-10">
        <h1 className="text-bold text-2xl">No Connections Found</h1>
      </div>
    );
  }

  return (
    <div className="justify-center my-6 flex flex-col items-center px-4">
      <h1 className="font-extrabold text-3xl mb-8 tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
        Your Connections
      </h1>

      <div className="flex flex-col gap-6 items-center w-full">
        {connections && connections.length > 0 ? (
          connections.map((connection) => {
            const {
              _id,
              firstName,
              lastName,
              photoURL,
              gender,
              about,
              skills,
            } = connection;

            return (
              <div
                key={_id}
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

                  <div className="card-actions mt-5 w-full">
                    <Link to={`/chat/${_id}`} className="w-full">
                      <button className="btn w-full border border-violet-500/30 bg-violet-950/20 text-violet-400 hover:bg-gradient-to-r hover:from-violet-600 hover:to-fuchsia-600 hover:text-white hover:border-transparent hover:shadow-lg hover:shadow-violet-600/20 active:scale-95 transition-all duration-200 font-semibold rounded-xl py-3 h-auto text-center">
                        💬 Open Chat
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-12 text-slate-500 italic">
            You haven't made any connections yet. Keep exploring the feed!
          </div>
        )}
      </div>
    </div>
  );
};

export default Connections;
