import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const SignUp = () => {
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    emailId: "",
    password: "",
    about: "",
    skills: [""],
    photoURL: [""],
  });

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleArrayChange = (field, index, value) => {
    const updated = [...form[field]];
    updated[index] = value;
    setForm((prev) => ({ ...prev, [field]: updated }));
  };

  const addArrayItem = (field) => {
    setForm((prev) => ({ ...prev, [field]: [...prev[field], ""] }));
  };

  const removeArrayItem = (field, index) => {
    setForm((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const payload = {
        email: form.emailId,
        password: form.password,
        firstName: form.firstName,
        lastName: form.lastName,
        gender: form.gender,
        skills: form.skills.filter((skill) => skill?.trim()),
      };

      if (form.about?.trim()) {
        payload.about = form.about.trim();
      }

      const filteredPhotoURLs = form.photoURL
        .map((url) => url?.trim())
        .filter((url) => url);

      if (filteredPhotoURLs.length > 0) {
        payload.photoURL = filteredPhotoURLs;
      }

      const res = await axios.post(BASE_URL + "/signup", payload, {
        withCredentials: true,
      });
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        navigate("/login");
      }, 2500);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "An error occurred during login. Please try again.",
      );
      console.log(err);
    }
  };

  return (
    <div className="flex justify-center my-6 px-4 w-full">
      <div className="card bg-slate-900/80 backdrop-blur-md border border-slate-800/80 w-full max-w-2xl shadow-2xl rounded-2xl overflow-hidden">
        <div className="card-body p-6 sm:p-8">
          <h1 className="font-extrabold text-3xl text-center mb-2 tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
            Create Your Account
          </h1>
          <p className="text-center text-sm text-slate-400 mb-6">
            Join the global community of developers
          </p>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-2.5 rounded-xl text-sm text-center font-medium mb-4 animate-shake">
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid gap-4 md:grid-cols-2">
              <fieldset className="fieldset flex flex-col">
                <legend className="text-xs font-semibold text-slate-400 mb-1.5 ml-1">
                  First Name
                </legend>
                <input
                  type="text"
                  className="bg-slate-950/60 border border-slate-800 focus:border-violet-500/60 text-slate-100 placeholder-slate-600 rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200 shadow-inner focus:ring-1 focus:ring-violet-500/20"
                  placeholder="Type your first name"
                  value={form.firstName}
                  onChange={(e) => handleChange("firstName", e.target.value)}
                  required
                />
              </fieldset>

              <fieldset className="fieldset flex flex-col">
                <legend className="text-xs font-semibold text-slate-400 mb-1.5 ml-1">
                  Last Name
                </legend>
                <input
                  type="text"
                  className="bg-slate-950/60 border border-slate-800 focus:border-violet-500/60 text-slate-100 placeholder-slate-600 rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200 shadow-inner focus:ring-1 focus:ring-violet-500/20"
                  placeholder="Type your last name"
                  value={form.lastName}
                  onChange={(e) => handleChange("lastName", e.target.value)}
                />
              </fieldset>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <fieldset className="fieldset flex flex-col">
                <legend className="text-xs font-semibold text-slate-400 mb-1.5 ml-1">
                  Gender
                </legend>
                <select
                  className="bg-slate-950/60 border border-slate-800 focus:border-violet-500/60 text-slate-100 placeholder-slate-600 rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200 shadow-inner focus:ring-1 focus:ring-violet-500/20 appearance-none"
                  value={form.gender}
                  onChange={(e) => handleChange("gender", e.target.value)}
                  required
                >
                  <option value="" className="bg-slate-900">
                    Select your gender
                  </option>
                  <option value="Male" className="bg-slate-900">
                    Male
                  </option>
                  <option value="Female" className="bg-slate-900">
                    Female
                  </option>
                  <option value="Others" className="bg-slate-900">
                    Others
                  </option>
                </select>
              </fieldset>

              <fieldset className="fieldset flex flex-col">
                <legend className="text-xs font-semibold text-slate-400 mb-1.5 ml-1">
                  Email ID
                </legend>
                <input
                  type="email"
                  className="bg-slate-950/60 border border-slate-800 focus:border-violet-500/60 text-slate-100 placeholder-slate-600 rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200 shadow-inner focus:ring-1 focus:ring-violet-500/20"
                  placeholder="Type your e-mail"
                  value={form.emailId}
                  onChange={(e) => handleChange("emailId", e.target.value)}
                  required
                />
              </fieldset>
            </div>

            <fieldset className="fieldset flex flex-col">
              <legend className="text-xs font-semibold text-slate-400 mb-1.5 ml-1">
                Password
              </legend>
              <input
                type="password"
                className="bg-slate-950/60 border border-slate-800 focus:border-violet-500/60 text-slate-100 placeholder-slate-600 rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200 shadow-inner focus:ring-1 focus:ring-violet-500/20"
                placeholder="Create a strong password"
                value={form.password}
                onChange={(e) => handleChange("password", e.target.value)}
                required
              />
            </fieldset>

            <fieldset className="fieldset flex flex-col">
              <legend className="text-xs font-semibold text-slate-400 mb-1.5 ml-1">
                About
              </legend>
              <textarea
                className="bg-slate-950/60 border border-slate-800 focus:border-violet-500/60 text-slate-100 placeholder-slate-600 rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200 shadow-inner focus:ring-1 focus:ring-violet-500/20 h-24 resize-none"
                placeholder="Tell us about your developer journey..."
                value={form.about}
                onChange={(e) => handleChange("about", e.target.value)}
              />
            </fieldset>

            <fieldset className="fieldset flex flex-col">
              <legend className="text-xs font-semibold text-slate-400 mb-2 ml-1">
                Skills Stack
              </legend>
              <div className="space-y-2.5">
                {form.skills.map((skill, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      className="bg-slate-950/60 border border-slate-800 focus:border-violet-500/60 text-slate-100 placeholder-slate-600 rounded-xl px-4 py-2.5 text-sm outline-none transition-all duration-200 flex-1"
                      placeholder={`e.g. React, Node, C++ (Skill ${index + 1})`}
                      value={skill}
                      onChange={(e) =>
                        handleArrayChange("skills", index, e.target.value)
                      }
                    />
                    {form.skills.length > 1 && (
                      <button
                        type="button"
                        className="border border-red-500/30 bg-red-950/20 text-red-400 hover:bg-red-600 hover:text-white hover:border-transparent rounded-xl px-4 text-xs font-semibold transition-all duration-150 active:scale-95"
                        onClick={() => removeArrayItem("skills", index)}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  className="btn btn-sm border border-slate-800 bg-slate-950/40 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl px-4 font-medium normal-case transition-all duration-200 mt-1"
                  onClick={() => addArrayItem("skills")}
                >
                  ➕ Add skill
                </button>
              </div>
            </fieldset>

            <fieldset className="fieldset flex flex-col">
              <legend className="text-xs font-semibold text-slate-400 mb-2 ml-1">
                Profile Photo URLs
              </legend>
              <div className="space-y-2.5">
                {form.photoURL.map((photo, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="url"
                      className="bg-slate-950/60 border border-slate-800 focus:border-violet-500/60 text-slate-100 placeholder-slate-600 rounded-xl px-4 py-2.5 text-sm outline-none transition-all duration-200 flex-1"
                      placeholder={`https://example.com/image${index + 1}.jpg`}
                      value={photo}
                      onChange={(e) =>
                        handleArrayChange("photoURL", index, e.target.value)
                      }
                    />
                    {form.photoURL.length > 1 && (
                      <button
                        type="button"
                        className="border border-red-500/30 bg-red-950/20 text-red-400 hover:bg-red-600 hover:text-white hover:border-transparent rounded-xl px-4 text-xs font-semibold transition-all duration-150 active:scale-95"
                        onClick={() => removeArrayItem("photoURL", index)}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  className="btn btn-sm border border-slate-800 bg-slate-950/40 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl px-4 font-medium normal-case transition-all duration-200 mt-1"
                  onClick={() => addArrayItem("photoURL")}
                >
                  📷 Add photo URL
                </button>
              </div>
            </fieldset>

            <div className="card-actions justify-center pt-4">
              <button
                type="submit"
                className="btn w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:opacity-95 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-violet-600/20 active:scale-[0.99] transition-all duration-200 h-auto"
                onClick={handleSubmit}
              >
                Create Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
