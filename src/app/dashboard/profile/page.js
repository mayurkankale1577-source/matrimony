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
  <div className="min-h-screen bg-gray-100 py-10 px-4">
    <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-600 to-purple-600 p-8 text-white text-center">
        <h1 className="text-4xl font-bold">My Profile</h1>
        <p className="mt-2 text-pink-100">
          Complete your matrimony profile
        </p>
      </div>

      <div className="p-8">

       {/* Profile Photo */}

<div className="flex flex-col items-center mb-10">

{form.image_url && !removePhoto ? (
  <>
    <div className="relative">

      <img
        src={form.image_url}
        alt="Profile"
        className="w-48 h-48 rounded-full object-cover border-4 border-pink-500 shadow-xl"
      />

      <label
        htmlFor="photo-upload"
        className="absolute bottom-2 right-2 w-12 h-12 bg-pink-600 text-white rounded-full flex items-center justify-center cursor-pointer shadow-lg hover:bg-pink-700 transition"
      >
        📷
      </label>

    </div>

    <h2 className="mt-4 text-2xl font-bold text-gray-800">
      {form.full_name || "Profile"}
    </h2>

    <p className="text-gray-500 mb-4">
      Matrimony Profile
    </p>

    <button
      type="button"
      onClick={() => {
        setRemovePhoto(true);

        setForm({
          ...form,
          image_url: "",
        });
      }}
      className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg"
    >
      फोटो काढून टाका
    </button>
  </>
) : (
  <>
    <div className="w-48 h-48 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 border-4 border-pink-300">
      No Photo
    </div>

    <label
      htmlFor="photo-upload"
      className="mt-4 bg-pink-600 hover:bg-pink-700 text-white px-5 py-2 rounded-lg cursor-pointer"
    >
      फोटो अपलोड करा
    </label>
  </>
)}

<input
  id="photo-upload"
  type="file"
  accept="image/*"
  className="hidden"
  onChange={(e) => setPhoto(e.target.files[0])}
/>

{photo && (
  <p className="mt-3 text-sm text-gray-600">
    निवडलेली फाइल: {photo.name}
  </p>
)}

</div>

<form
onSubmit={updateProfile}
className="space-y-10"
>
         {/* Personal Information */}

<div>
  <h2 className="text-2xl font-bold text-pink-600 border-b-2 border-pink-500 pb-2 mb-6">
    वैयक्तिक माहिती
  </h2>

  <div className="grid md:grid-cols-2 gap-5">

    <div>
      <label className="font-medium block mb-2">
        पूर्ण नाव
      </label>

      <input
        name="full_name"
        value={form.full_name}
        onChange={handleChange}
        placeholder="पूर्ण नाव"
        className="w-full border rounded-lg p-3"
      />
    </div>

    <div>
      <label className="font-medium block mb-2">
        जन्म तारीख
      </label>

      <input
        type="date"
        name="birth_date"
        value={form.birth_date}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
      />
    </div>

    <div>
      <label className="font-medium block mb-2">
        जन्म स्थळ
      </label>

      <input
        name="birth_place"
        value={form.birth_place}
        onChange={handleChange}
        placeholder="जन्म स्थळ"
        className="w-full border rounded-lg p-3"
      />
    </div>

    <div>
      <label className="font-medium block mb-2">
        जात
      </label>

      <input
        name="religion"
        value={form.religion}
        onChange={handleChange}
        placeholder="जात"
        className="w-full border rounded-lg p-3"
      />
    </div>

    <div>
      <label className="font-medium block mb-2">
        शिक्षण
      </label>

      <input
        name="education"
        value={form.education}
        onChange={handleChange}
        placeholder="शिक्षण"
        className="w-full border rounded-lg p-3"
      />
    </div>

    <div>
      <label className="font-medium block mb-2">
        कुळदेवत
      </label>

      <input
        name="mother_tongue"
        value={form.mother_tongue}
        onChange={handleChange}
        placeholder="कुळदेवत"
        className="w-full border rounded-lg p-3"
      />
    </div>

    <div>
      <label className="font-medium block mb-2">
        उंची
      </label>

      <input
        name="height"
        value={form.height}
        onChange={handleChange}
        placeholder="उंची"
        className="w-full border rounded-lg p-3"
      />
    </div>

    <div>
      <label className="font-medium block mb-2">
        नोकरी / व्यवसाय
      </label>

      <input
        name="occupation"
        value={form.occupation}
        onChange={handleChange}
        placeholder="नोकरी / व्यवसाय"
        className="w-full border rounded-lg p-3"
      />
    </div>

    <div>
      <label className="font-medium block mb-2">
        वार्षिक उत्पन्न
      </label>

      <input
        name="annual_income"
        value={form.annual_income}
        onChange={handleChange}
        placeholder="वार्षिक उत्पन्न"
        className="w-full border rounded-lg p-3"
      />
    </div>

    <div>
      <label className="font-medium block mb-2">
        लिंग
      </label>

      <select
        name="gender"
        value={form.gender}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
      >
        <option value="">
          लिंग निवडा
        </option>

        <option value="male">
          पुरुष
        </option>

        <option value="female">
          महिला
        </option>
      </select>
    </div>

  </div>
</div>

         {/* Family Information */}

<div>
  <h2 className="text-2xl font-bold text-pink-600 border-b-2 border-pink-500 pb-2 mb-6">
    कौटुंबिक माहिती
  </h2>

  <div className="grid md:grid-cols-2 gap-5">

    <div>
      <label className="font-medium block mb-2">
        वडिलांचे नाव
      </label>

      <textarea
        name="father_name"
        value={form.father_name}
        onChange={handleChange}
        rows={4}
        placeholder="वडिलांचे संपूर्ण नाव, पत्ता, व्यवसाय"
        className="w-full border rounded-lg p-3"
      />
    </div>

    <div>
      <label className="font-medium block mb-2">
        वडिलांचा व्यवसाय
      </label>

      <textarea
        name="father_occupation"
        value={form.father_occupation}
        onChange={handleChange}
        rows={4}
        placeholder="वडिलांचा व्यवसाय"
        className="w-full border rounded-lg p-3"
      />
    </div>

    <div>
      <label className="font-medium block mb-2">
        मोठे बाबा
      </label>

      <textarea
        name="mothe_baba"
        value={form.mothe_baba}
        onChange={handleChange}
        rows={4}
        placeholder="मोठे बाबा यांची माहिती"
        className="w-full border rounded-lg p-3"
      />
    </div>

    <div>
      <label className="font-medium block mb-2">
        काका
      </label>

      <textarea
        name="kaka_name"
        value={form.kaka_name}
        onChange={handleChange}
        rows={4}
        placeholder="काका यांची माहिती"
        className="w-full border rounded-lg p-3"
      />
    </div>

    <div>
      <label className="font-medium block mb-2">
        आईचे नाव
      </label>

      <input
        name="mother_name"
        value={form.mother_name}
        onChange={handleChange}
        placeholder="आईचे नाव"
        className="w-full border rounded-lg p-3"
      />
    </div>

    <div>
      <label className="font-medium block mb-2">
        मावशी
      </label>

      <textarea
        name="mavshi"
        value={form.mavshi}
        onChange={handleChange}
        rows={4}
        placeholder="मावशी यांची माहिती"
        className="w-full border rounded-lg p-3"
      />
    </div>

    <div>
      <label className="font-medium block mb-2">
        आत्तेमामा
      </label>

      <textarea
        name="aatemama"
        value={form.aatemama}
        onChange={handleChange}
        rows={4}
        placeholder="आत्तेमामा यांची माहिती"
        className="w-full border rounded-lg p-3"
      />
    </div>

    <div>
      <label className="font-medium block mb-2">
        बहिण
      </label>

      <textarea
        name="sisters"
        value={form.sisters}
        onChange={handleChange}
        rows={4}
        placeholder="बहिणींची माहिती"
        className="w-full border rounded-lg p-3"
      />
    </div>

    <div>
      <label className="font-medium block mb-2">
        भाऊ
      </label>

      <textarea
        name="brothers"
        value={form.brothers}
        onChange={handleChange}
        rows={4}
        placeholder="भावांची माहिती"
        className="w-full border rounded-lg p-3"
      />
    </div>

    <div>
      <label className="font-medium block mb-2">
        मामा
      </label>

      <textarea
        name="maternal_uncle"
        value={form.maternal_uncle}
        onChange={handleChange}
        rows={4}
        placeholder="मामांची माहिती"
        className="w-full border rounded-lg p-3"
      />
    </div>

  </div>
</div>

{/* Partner Preference */}

<div>
  <h2 className="text-2xl font-bold text-pink-600 border-b-2 border-pink-500 pb-2 mb-6">
    वधू / वर अपेक्षा
  </h2>

  <div>
    <label className="font-medium block mb-2">
      अपेक्षित जोडीदाराबद्दल माहिती
    </label>

    <textarea
      name="partner_preference"
      value={form.partner_preference}
      onChange={handleChange}
      rows={6}
      placeholder="उंची, शिक्षण, व्यवसाय, कुटुंब, स्वभाव व इतर अपेक्षा लिहा..."
      className="w-full border rounded-lg p-3"
    />
  </div>
</div>
{/* Contact Information */}

<div>
  <h2 className="text-2xl font-bold text-pink-600 border-b-2 border-pink-500 pb-2 mb-6">
    संपर्क माहिती
  </h2>

  <div>
    <label className="font-medium block mb-2">
      पत्ता व संपर्क
    </label>

    <textarea
      name="address"
      value={form.address}
      onChange={handleChange}
      rows={5}
      placeholder="संपूर्ण पत्ता, मोबाईल क्रमांक व इतर संपर्क माहिती"
      className="w-full border rounded-lg p-3"
    />
  </div>
</div>
          <button
            type="submit"
            className="w-full bg-pink-600 hover:bg-pink-700 text-white py-4 rounded-xl font-semibold text-lg"
          >
              प्रोफाइल अपडेट करा
          </button>
        </form>
      </div>
    </div>
  </div>
);
}
