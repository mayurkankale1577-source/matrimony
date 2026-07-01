"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function ProfileFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [gender, setGender] = useState(
    searchParams.get("gender") || ""
  );

  const [district, setDistrict] = useState(
    searchParams.get("district") || ""
  );

  const [districts, setDistricts] = useState([]);

  useEffect(() => {
    async function loadDistricts() {
      try {
        const res = await fetch(
          "/api/profiles?dropdown=districts"
        );

        const data = await res.json();

        if (data.success) {
          setDistricts(data.data);
        }
      } catch (error) {
        console.error(error);
      }
    }

    loadDistricts();
  }, []);

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (gender) params.set("gender", gender);

    if (district) params.set("district", district);

    router.push(`/?${params.toString()}`);
  };

  return (
    <div className="bg-white rounded-xl shadow p-6 mb-10">
      <div className="grid md:grid-cols-3 gap-4">

        {/* Gender */}
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="border rounded-lg p-3"
        >
          <option value="">All Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        {/* District */}
        <select
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
          className="border rounded-lg p-3"
        >
          <option value="">All District</option>

          {districts.map((item) => (
            <option
              key={item.district}
              value={item.district}
            >
              {item.district}
            </option>
          ))}
        </select>

        <button
          onClick={handleSearch}
          className="bg-pink-600 text-white rounded-lg px-5 py-3 hover:bg-pink-700"
        >
          Search
        </button>

      </div>
    </div>
  );
}