import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const ProfileEdit = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName || "");
  const [lastName, setLastName] = useState(user.lastName || "");
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about || "");
  const [skills, setSkills] = useState(user.skills || "");
  const [photoURL, setPhotoURL] = useState(user.photoURL || "");
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);

  const dispatch = useDispatch();

  const saveProfile = async () => {
    try {
      setError("");
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          gender,
          about,
          skills,
          photoURL,
        },
        { withCredentials: true },
      );
      console.log(res.data);
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start gap-8 my-6 px-4 w-full max-w-5xl mx-auto">
        <div className="card bg-slate-900/80 backdrop-blur-md border border-slate-800/80 w-full max-w-md shadow-2xl rounded-2xl overflow-hidden">
          <div className="card-body p-6 sm:p-8">
            <h1 className="font-extrabold text-2xl text-center mb-1 tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              Edit Profile
            </h1>
            <p className="text-center text-xs text-slate-400 mb-6">
              Keep your developer credentials current
            </p>

            <div className="space-y-4">
              <fieldset className="fieldset flex flex-col">
                <legend className="text-xs font-semibold text-slate-400 mb-1.5 ml-1">
                  First Name
                </legend>
                <input
                  type="text"
                  value={firstName}
                  className="bg-slate-950/60 border border-slate-800 focus:border-violet-500/60 text-slate-100 placeholder-slate-600 rounded-xl px-4 py-2.5 text-sm outline-none transition-all duration-200 shadow-inner focus:ring-1 focus:ring-violet-500/20"
                  placeholder="Type your first name"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </fieldset>

              <fieldset className="fieldset flex flex-col">
                <legend className="text-xs font-semibold text-slate-400 mb-1.5 ml-1">
                  Last Name
                </legend>
                <input
                  type="text"
                  value={lastName}
                  className="bg-slate-950/60 border border-slate-800 focus:border-violet-500/60 text-slate-100 placeholder-slate-600 rounded-xl px-4 py-2.5 text-sm outline-none transition-all duration-200 shadow-inner focus:ring-1 focus:ring-violet-500/20"
                  placeholder="Type your last name"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </fieldset>

              <fieldset className="fieldset flex flex-col">
                <legend className="text-xs font-semibold text-slate-400 mb-1.5 ml-1">
                  Gender
                </legend>
                <select
                  value={gender}
                  className="bg-slate-950/60 border border-slate-800 focus:border-violet-500/60 text-slate-100 placeholder-slate-600 rounded-xl px-4 py-2.5 text-sm outline-none transition-all duration-200 shadow-inner focus:ring-1 focus:ring-violet-500/20 appearance-none"
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="Male" className="bg-slate-900">
                    Male
                  </option>
                  <option value="Female" className="bg-slate-900">
                    Female
                  </option>
                  <option value="Other" className="bg-slate-900">
                    Other
                  </option>
                </select>
              </fieldset>

              <fieldset className="fieldset flex flex-col">
                <legend className="text-xs font-semibold text-slate-400 mb-1.5 ml-1">
                  About
                </legend>
                <textarea
                  value={about}
                  className="bg-slate-950/60 border border-slate-800 focus:border-violet-500/60 text-slate-100 placeholder-slate-600 rounded-xl px-4 py-2.5 text-sm outline-none transition-all duration-200 shadow-inner focus:ring-1 focus:ring-violet-500/20 h-24 resize-none"
                  placeholder="Tell us about yourself"
                  onChange={(e) => setAbout(e.target.value)}
                />
              </fieldset>

              <fieldset className="fieldset flex flex-col">
                <legend className="text-xs font-semibold text-slate-400 mb-1.5 ml-1">
                  Skills (comma-separated)
                </legend>
                <input
                  type="text"
                  value={skills}
                  className="bg-slate-950/60 border border-slate-800 focus:border-violet-500/60 text-slate-100 placeholder-slate-600 rounded-xl px-4 py-2.5 text-sm outline-none transition-all duration-200 shadow-inner focus:ring-1 focus:ring-violet-500/20"
                  placeholder="e.g. React, Node, C++"
                  onChange={(e) => setSkills(e.target.value)}
                />
              </fieldset>

              <fieldset className="fieldset flex flex-col">
                <legend className="text-xs font-semibold text-slate-400 mb-1.5 ml-1">
                  Photo URL
                </legend>
                <input
                  type="text"
                  value={photoURL}
                  className="bg-slate-950/60 border border-slate-800 focus:border-violet-500/60 text-slate-100 placeholder-slate-600 rounded-xl px-4 py-2.5 text-sm outline-none transition-all duration-200 shadow-inner focus:ring-1 focus:ring-violet-500/20"
                  placeholder="Enter profile image link"
                  onChange={(e) => setPhotoURL(e.target.value)}
                />
              </fieldset>

              <div className="card-actions justify-center pt-4">
                <button
                  className="btn w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:opacity-95 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-violet-600/20 active:scale-[0.99] transition-all duration-200 h-auto"
                  onClick={saveProfile}
                >
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="sticky top-24 transition-all duration-300">
          <UserCard user={user} />
        </div>
      </div>
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile updated successfully.</span>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileEdit;
