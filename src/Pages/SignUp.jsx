import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'

const SignUp = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    emailId: '',
    password: '',
    about: '',
    skills: [''],
    photoURL: ['']
  })

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  const handleArrayChange = (field, index, value) => {
    const updated = [...form[field]]
    updated[index] = value
    setForm(prev => ({ ...prev, [field]: updated }))
  }

  const addArrayItem = (field) => {
    setForm(prev => ({ ...prev, [field]: [...prev[field], ''] }))
  }

  const removeArrayItem = (field, index) => {
    setForm(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }))
  }

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
      alert('SignUp Successful');
      navigate('/login');
    } catch (err) {
      setError(err?.response?.data?.message || 'An error occurred during login. Please try again.');
      console.log(err);
    }
  }

  return (
    <div className="flex justify-center my-10 px-4">
      <div className="card card-dash bg-base-300 w-full max-w-2xl">
        <div className="card-body">
          <h1 className="card-title justify-center text-2xl">Sign Up for an account</h1>
          {error && <p className="text-error text-sm text-center">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <fieldset className="fieldset">
                <legend className="fieldset-legend my-2">First Name</legend>
                <input
                  type="text"
                  className="input"
                  placeholder="Type your first name"
                  value={form.firstName}
                  onChange={(e) => handleChange('firstName', e.target.value)}
                  required
                />
              </fieldset>

              <fieldset className="fieldset">
                <legend className="fieldset-legend my-2">Last Name</legend>
                <input
                  type="text"
                  className="input"
                  placeholder="Type your last name"
                  value={form.lastName}
                  onChange={(e) => handleChange('lastName', e.target.value)}
                />
              </fieldset>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <fieldset className="fieldset">
                <legend className="fieldset-legend my-2">Gender</legend>
                <select
                  className="input"
                  value={form.gender}
                  onChange={(e) => handleChange('gender', e.target.value)}
                  required
                >
                  <option value="">Select your gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Others">Others</option>
                </select>
              </fieldset>

              <fieldset className="fieldset">
                <legend className="fieldset-legend my-2">Email ID</legend>
                <input
                  type="email"
                  className="input"
                  placeholder="Type your e-mail"
                  value={form.emailId}
                  onChange={(e) => handleChange('emailId', e.target.value)}
                  required
                />
              </fieldset>
            </div>

            <fieldset className="fieldset">
              <legend className="fieldset-legend my-2">Password</legend>
              <input
                type="password"
                className="input"
                placeholder="Type your password"
                value={form.password}
                onChange={(e) => handleChange('password', e.target.value)}
                required
              />
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend my-2">About</legend>
              <textarea
                className="textarea h-24"
                placeholder="Tell us about yourself"
                value={form.about}
                onChange={(e) => handleChange('about', e.target.value)}
              />
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend my-2">Skills</legend>
              <div className="space-y-2">
                {form.skills.map((skill, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      className="input flex-1"
                      placeholder={`Skill ${index + 1}`}
                      value={skill}
                      onChange={(e) => handleArrayChange('skills', index, e.target.value)}
                    />
                    {form.skills.length > 1 && (
                      <button
                        type="button"
                        className="btn btn-sm btn-error"
                        onClick={() => removeArrayItem('skills', index)}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button type="button" className="btn btn-sm btn-outline" onClick={() => addArrayItem('skills')}>
                  Add skill
                </button>
              </div>
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend my-2">Photo URLs</legend>
              <div className="space-y-2">
                {form.photoURL.map((photo, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="url"
                      className="input flex-1"
                      placeholder={`Photo URL ${index + 1}`}
                      value={photo}
                      onChange={(e) => handleArrayChange('photoURL', index, e.target.value)}
                    />
                    {form.photoURL.length > 1 && (
                      <button
                        type="button"
                        className="btn btn-sm btn-error"
                        onClick={() => removeArrayItem('photoURL', index)}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button type="button" className="btn btn-sm btn-outline" onClick={() => addArrayItem('photoURL')}>
                  Add photo URL
                </button>
              </div>
            </fieldset>

            <div className="card-actions justify-center pt-4">
              <button type="submit" className="btn bg-base-200 text-white border-base-200 p-4 w-full"
                onClick={handleSubmit}>
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignUp;
