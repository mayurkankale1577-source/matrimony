"use client";

import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    full_name: "",
    gender: "",
    
    birth_date: "",
    birth_place: "",
    religion: "",
    education: "",
    occupation: "",
    about_me: "",
    height: "",
    
    mother_tongue: "",
    
    annual_income: "",
    partner_preference: "",
    image_url: "",
    father_name: "",
    mothe_baba: "",
    kaka_name: "",
    mavshi: "",
    aatemama: "",
    father_occupation: "",
    mother_name: "",
    sisters: "",
    brothers: "",
    maternal_uncle: "",
    relatives: "",
    address: "",
    mobile: "",
    whatsapp: "",
    email: "",
  });

  const [photo, setPhoto] = useState(null);
  const [removePhoto, setRemovePhoto] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await fetch("/api/profile/me");

      const data = await res.json();

      if (data.profile) {
        setForm({
          full_name: data.profile.full_name || "",
          gender: data.profile.gender || "",
         
          birth_date: data.profile.birth_date
            ? data.profile.birth_date.split("T")[0]
            : "",
          birth_place: data.profile.birth_place || "",
          religion: data.profile.religion || "",
          education: data.profile.education || "",
          occupation: data.profile.occupation || "",
          about_me: data.profile.about_me || "",
          height: data.profile.height || "",
          
          mother_tongue: data.profile.mother_tongue || "",
         
          annual_income: data.profile.annual_income || "",
          partner_preference: data.profile.partner_preference || "",
          image_url: data.profile.image_url || "",
          father_name: data.profile.father_name || "",
          mothe_baba: data.profile.mothe_baba || "",

          kaka_name: data.profile.kaka_name || "",

          mavshi: data.profile.mavshi || "",

          aatemama: data.profile.aatemama || "",

          father_occupation: data.profile.father_occupation || "",

          mother_name: data.profile.mother_name || "",

          brothers: data.profile.brothers || "",

          sisters: data.profile.sisters || "",

          maternal_uncle: data.profile.maternal_uncle || "",

          relatives: data.profile.relatives || "",

          address: data.profile.address || "",

          mobile: data.profile.mobile || "",

          whatsapp: data.profile.whatsapp || "",

          email: data.profile.email || "",
        });
      }
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const updateProfile = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    Object.keys(form).forEach((key) => {
      formData.append(key, form[key]);
    });

    if (photo) {
      formData.append("photo", photo);
    }

    formData.append("removePhoto", removePhoto ? "true" : "false");

    const res = await fetch("/api/profile/update", {
      method: "PUT",
      body: formData,
    });

    const data = await res.json();

    alert(data.message);

    setRemovePhoto(false);

    fetchProfile();
  };

  if (loading) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow p-6">
        <h1 className="text-3xl font-bold mb-6">My Profile</h1>

        {form.image_url && !removePhoto && (
          <div className="mb-6">
            <img
              src={form.image_url}
              alt="Profile"
              className="w-40 h-40 object-cover rounded-lg border"
            />
            <button
              type="button"
              onClick={() => {
                setRemovePhoto(true);

                setForm({
                  ...form,
                  image_url: "",
                });
              }}
              className="mt-2 bg-red-500 text-white px-4 py-2 rounded"
            >
              Remove Photo
            </button>
          </div>
        )}

        <div className="mb-6">
          <label className="block mb-2 font-medium">Change Profile Photo</label>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setPhoto(e.target.files[0])}
          />
        </div>

        <form onSubmit={updateProfile} className="grid md:grid-cols-2 gap-4">
          <div className="border p-3 rounded bg-gray-50"> नाव</div>

          <input
            name="full_name"
            value={form.full_name}
            onChange={handleChange}
            placeholder="पूर्ण नाव"
            className="border p-3 rounded"
          />

          <div className="border p-3 rounded bg-gray-50"> जन्म तारीख</div>

          <input
            type="date"
            name="birth_date"
            value={form.birth_date}
            onChange={handleChange}
            placeholder="जन्म तारीख"
            className="border p-3 rounded"
          />

          <div className="border p-3 rounded bg-gray-50"> जन्म स्थळ</div>

          <input
            name="birth_place"
            value={form.birth_place}
            onChange={handleChange}
            placeholder="जन्म स्थळ"
            className="border p-3 rounded"
          />

          <div className="border p-3 rounded bg-gray-50"> जात</div>

          <input
            name="religion"
            value={form.religion}
            onChange={handleChange}
            placeholder="  जात"
            className="border p-3 rounded"
          />

          <div className="border p-3 rounded bg-gray-50">शिक्षण</div>

          <input
            name="education"
            value={form.education}
            onChange={handleChange}
            placeholder="शिक्षण"
            className="border p-3 rounded"
          />

          <div className="border p-3 rounded bg-gray-50">कुळदेवत</div>

          <input
            name="mother_tongue"
            value={form.mother_tongue}
            onChange={handleChange}
            placeholder="कुळदेवताचे नाव"
            className="border p-3 rounded"
          />

          <div className="border p-3 rounded bg-gray-50">उंची</div>

          <input
            name="height"
            value={form.height}
            onChange={handleChange}
            placeholder="उंची"
            className="border p-3 rounded"
          />

          <div className="border p-3 rounded bg-gray-50">नोकरी/व्यवसाय</div>

          <input
            name="occupation"
            value={form.occupation}
            onChange={handleChange}
            placeholder="कंपनी / व्यवसाय"
            className="border p-3 rounded"
          />

          <div className="border p-3 rounded bg-gray-50">वेतन/उत्पन्न</div>

          <input
            name="annual_income"
            value={form.annual_income}
            onChange={handleChange}
            placeholder="वार्षिक उत्पन्न"
            className="border p-3 rounded"
          />

          {/* Family Information */}

          <div className="border p-3 rounded bg-gray-50">वडिलांचे नाव</div>

          <textarea
            name="father_name"
            value={form.father_name}
            onChange={handleChange}
            rows={4}
            placeholder="वडिलांचे संपूर्ण नाव, पत्ता, व्यवसाय, इतर माहिती"
            className="border p-3 rounded"
          />

          <div className="border p-3 rounded bg-gray-50">वडिलांचा व्यवसाय</div>

          <textarea
            name="father_occupation"
            value={form.father_occupation}
            onChange={handleChange}
            rows={3}
            placeholder="वडिलांचा व्यवसाय / नोकरी"
            className="border p-3 rounded"
          />
          <div className="border p-3 rounded bg-gray-50">मोठे बाबा</div>

          <textarea
            name="mothe_baba"
            value={form.mothe_baba}
            onChange={handleChange}
            rows={4}
            placeholder="मोठे बाबा यांची माहिती"
            className="border p-3 rounded"
          />
          <div className="border p-3 rounded bg-gray-50">काका</div>

          <textarea
            name="kaka_name"
            value={form.kaka_name}
            onChange={handleChange}
            rows={4}
            placeholder="काका चे नाव, पत्ता, माहिती"
            className="border p-3 rounded"
          />
          <div className="border p-3 rounded bg-gray-50">आईचे नाव</div>

          <input
            name="mother_name"
            value={form.mother_name}
            onChange={handleChange}
            placeholder="आईचे संपूर्ण नाव"
            className="border p-3 rounded"
          />
          <div className="border p-3 rounded bg-gray-50">मावशी</div>

          <textarea
            name="mavshi"
            value={form.mavshi}
            onChange={handleChange}
            rows={4}
            placeholder="मावशी यांची माहिती"
            className="border p-3 rounded"
          />
          <div className="border p-3 rounded bg-gray-50">आत्तेमामा</div>

          <textarea
            name="aatemama"
            value={form.aatemama}
            onChange={handleChange}
            rows={4}
            placeholder="आत्तेमामा यांची माहिती"
            className="border p-3 rounded"
          />

          <div className="border p-3 rounded bg-gray-50">बहीण</div>

          <textarea
            name="sisters"
            value={form.sisters}
            onChange={handleChange}
            rows={3}
            placeholder="बहिणींची संख्या, नाव, शिक्षण इ."
            className="border p-3 rounded"
          />

          <div className="border p-3 rounded bg-gray-50">भाऊ</div>

          <textarea
            name="brothers"
            value={form.brothers}
            onChange={handleChange}
            rows={3}
            placeholder="भावांची संख्या, नाव, व्यवसाय इ."
            className="border p-3 rounded"
          />

          <div className="border p-3 rounded bg-gray-50">मामा</div>

          <textarea
            name="maternal_uncle"
            value={form.maternal_uncle}
            onChange={handleChange}
            rows={3}
            placeholder="मामाचे नाव व माहिती"
            className="border p-3 rounded"
          />

          <div className="border p-3 rounded bg-gray-50">नातेवाईक</div>

          <textarea
            name="relatives"
            value={form.relatives}
            onChange={handleChange}
            rows={4}
            placeholder="नातेवाईकांची माहिती"
            className="border p-3 rounded"
          />

          <div className="border p-3 rounded bg-gray-50">अपेक्षा</div>

          <textarea
            name="partner_preference"
            value={form.partner_preference}
            onChange={handleChange}
            rows={5}
            placeholder="वधू/वर बद्दल अपेक्षा"
            className="border p-3 rounded"
          />

          <div className="border p-3 rounded bg-gray-50">संपर्क</div>

          <textarea
            name="address"
            value={form.address}
            onChange={handleChange}
            rows={4}
            placeholder="संपर्क"
            className="border p-3 rounded"
          />

          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            className="border p-3 rounded"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>

          <button
            type="submit"
            className="bg-pink-600 text-white py-3 rounded md:col-span-2"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
}
