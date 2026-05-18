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
      <div className="flex justify-center m-10">
        <div className="flex justify-center mx-10">
          <div className="card card-dash bg-base-300 w-96 shadow-2xl">
            <div className="card-body">
              <h1 className="card-title justify-center text-2xl">
                Edit Profile
              </h1>
              <fieldset className="fieldset">
                <legend className="fieldset-legend my-2">First Name</legend>
                <input
                  type="text"
                  value={firstName}
                  className="input p-2"
                  placeholder="Type your first name"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend my-2">Last Name</legend>
                <input
                  type="text"
                  value={lastName}
                  className="input p-2"
                  placeholder="Type your last name"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend my-2">Gender</legend>
                <select
                  value={gender}
                  className="input p-2"
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend my-2">About</legend>
                <textarea
                  value={about}
                  className="input p-2"
                  placeholder="Tell us about yourself"
                  onChange={(e) => setAbout(e.target.value)}
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend my-2">Skills</legend>
                <input
                  type="text"
                  value={skills}
                  className="input p-2"
                  placeholder="Type your skills"
                  onChange={(e) => setSkills(e.target.value)}
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend my-2">Photo URL</legend>
                <input
                  type="text"
                  value={photoURL}
                  className="input p-2"
                  placeholder="Enter photo URL"
                  onChange={(e) => setPhotoURL(e.target.value)}
                />
              </fieldset>
              <div className="card-actions justify-center">
                <button
                  className="btn bg-base-200 text-white border-base-200 p-4"
                  onClick={saveProfile}
                >
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>

        <UserCard user={user} />
      </div>
      {showToast && (
                <div className="toast toast-top toast-center">
                  <div className="alert alert-success">
                    <span>Profile updated successfully.</span>
                  </div>
                </div>)}
    </>
  );
};

export default ProfileEdit;
