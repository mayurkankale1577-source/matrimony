import Link from "next/link";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import db from "@/lib/db";
import { getProfileById } from "@/services/profile.service";
import LikeButton from "@/app/components/LikeButton";

export default async function ProfilePage({ params }) {
  const { id } = await params;

  const profile = await getProfileById(id);

  if (!profile) {
    return (
      <div className="p-10 text-center text-xl">
        Profile not found
      </div>
    );
  }

  const cookieStore = await cookies();

  const token =
    cookieStore.get("token")?.value;

  const isLoggedIn = !!token;

  let isPremium = false;

  if (token) {
    try {
      const currentUser =
        verifyToken(token);

      const [rows] =
        await db.query(
          `
          SELECT is_premium
          FROM users
          WHERE id = ?
          `,
          [currentUser.id]
        );

      isPremium =
        rows[0]?.is_premium == 1;
    } catch {}
  }

  return (
    <div className="max-w-7xl mx-auto p-6">

      <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

        {/* Header */}

        <div className="bg-gradient-to-r from-pink-600 to-pink-500 p-8 text-white">

          <div className="flex flex-col md:flex-row gap-8">

            <div>

              <img
                src={
                  profile.image_url ||
                  "https://via.placeholder.com/400"
                }
                alt={profile.user_full_name}
                className="w-72 h-80 object-cover rounded-2xl border-4 border-white shadow-xl"
              />

            </div>

            <div className="flex-1">

              <h1 className="text-5xl font-bold">

              {profile.user_full_name}

              </h1>

              <p className="mt-3 text-xl">

                Matrimony Profile

              </p>

              <div className="grid md:grid-cols-2 gap-4 mt-8">

                <div className="bg-white/10 rounded-xl p-4">

                  <p className="text-pink-100">
                    Religion
                  </p>

                  <h3 className="font-bold text-xl">
                    {profile.religion || "-"}
                  </h3>

                </div>

                <div className="bg-white/10 rounded-xl p-4">

                  <p className="text-pink-100">
                    Height
                  </p>

                  <h3 className="font-bold text-xl">
                    {profile.height || "-"}
                  </h3>

                </div>

                <div className="bg-white/10 rounded-xl p-4">

                  <p className="text-pink-100">
                    Education
                  </p>

                  <h3 className="font-bold text-xl">
                    {profile.education || "-"}
                  </h3>

                </div>

                <div className="bg-white/10 rounded-xl p-4">

                  <p className="text-pink-100">
                    Occupation
                  </p>

                  <h3 className="font-bold text-xl">
                    {profile.occupation || "-"}
                  </h3>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* Personal Information */}

        <div className="p-8">

          <h2 className="text-3xl font-bold text-pink-600 mb-6">

            Personal Information

          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            <div className="border rounded-xl p-5">

              <p className="text-gray-500">
                Full Name
              </p>

              <h3 className="font-semibold text-lg">
              {profile.user_full_name}
              </h3>

            </div>

            <div className="border rounded-xl p-5">

              <p className="text-gray-500">
                Gender
              </p>

              <h3 className="font-semibold text-lg">
                {profile.gender || "-"}
              </h3>

            </div>

            <div className="border rounded-xl p-5">

              <p className="text-gray-500">
                Birth Date
              </p>

              <h3 className="font-semibold text-lg">
              {
  profile.birth_date
    ? new Date(profile.birth_date).toLocaleDateString("en-GB")
    : "-"
}
              </h3>

            </div>

            <div className="border rounded-xl p-5">

              <p className="text-gray-500">
                Birth Place
              </p>

              <h3 className="font-semibold text-lg">
                {profile.birth_place || "-"}
              </h3>

            </div>

            <div className="border rounded-xl p-5">

              <p className="text-gray-500">
                Mother Tongue
              </p>

              <h3 className="font-semibold text-lg">
                {profile.mother_tongue || "-"}
              </h3>

            </div>

            <div className="border rounded-xl p-5">

              <p className="text-gray-500">
                Annual Income
              </p>

              <h3 className="font-semibold text-lg">
                {profile.annual_income || "-"}
              </h3>

            </div>

          </div>

                    {/* Family Information */}

                    <div className="mt-12">

<h2 className="text-3xl font-bold text-pink-600 mb-6">
  Family Information
</h2>

<div className="grid md:grid-cols-2 gap-6">

  <div className="border rounded-xl p-5">
    <p className="text-gray-500">Father Name</p>
    <h3 className="font-semibold text-lg">
      {profile.father_name || "-"}
    </h3>
  </div>

  <div className="border rounded-xl p-5">
    <p className="text-gray-500">Father Occupation</p>
    <h3 className="font-semibold text-lg">
      {profile.father_occupation || "-"}
    </h3>
  </div>

  <div className="border rounded-xl p-5">
    <p className="text-gray-500">Mother Name</p>
    <h3 className="font-semibold text-lg">
      {profile.mother_name || "-"}
    </h3>
  </div>

  <div className="border rounded-xl p-5">
    <p className="text-gray-500">Brothers</p>
    <h3 className="font-semibold text-lg whitespace-pre-line">
      {profile.brothers || "-"}
    </h3>
  </div>

  <div className="border rounded-xl p-5">
    <p className="text-gray-500">Sisters</p>
    <h3 className="font-semibold text-lg whitespace-pre-line">
      {profile.sisters || "-"}
    </h3>
  </div>

  <div className="border rounded-xl p-5">
    <p className="text-gray-500">Maternal Uncle</p>
    <h3 className="font-semibold text-lg whitespace-pre-line">
      {profile.maternal_uncle || "-"}
    </h3>
  </div>

  <div className="border rounded-xl p-5">
    <p className="text-gray-500">Kaka</p>
    <h3 className="font-semibold text-lg whitespace-pre-line">
      {profile.kaka_name || "-"}
    </h3>
  </div>

  <div className="border rounded-xl p-5">
    <p className="text-gray-500">Mother Side</p>
    <h3 className="font-semibold text-lg whitespace-pre-line">
      {profile.mothe_baba || "-"}
    </h3>
  </div>

  <div className="border rounded-xl p-5">
    <p className="text-gray-500">Mavshi</p>
    <h3 className="font-semibold text-lg whitespace-pre-line">
      {profile.mavshi || "-"}
    </h3>
  </div>

  <div className="border rounded-xl p-5">
    <p className="text-gray-500">Aatemama</p>
    <h3 className="font-semibold text-lg whitespace-pre-line">
      {profile.aatemama || "-"}
    </h3>
  </div>

</div>

</div>

{/* About Me */}

<div className="mt-12">

<h2 className="text-3xl font-bold text-pink-600 mb-6">
  About Me
</h2>

<div className="bg-gray-50 rounded-2xl border p-6">

  <p className="leading-8 text-gray-700 whitespace-pre-line">
    {profile.about_me || "No description available."}
  </p>

</div>

</div>

{/* Partner Preference */}

<div className="mt-12">

<h2 className="text-3xl font-bold text-pink-600 mb-6">
  Partner Preference
</h2>

<div className="bg-pink-50 border border-pink-100 rounded-2xl p-6">

  <p className="leading-8 whitespace-pre-line">
    {profile.partner_preference ||
      "Not provided."}
  </p>

</div>

</div>

          {/* Contact Information */}

          <div className="mt-12">

            <h2 className="text-3xl font-bold text-pink-600 mb-6">
              Contact Information
            </h2>

            {isPremium ? (

              <div className="grid md:grid-cols-2 gap-6">

                <div className="border rounded-xl p-5">
                  <p className="text-gray-500">
                    Mobile Number
                  </p>

                  <h3 className="font-semibold text-lg">
                    {profile.mobile || "-"}
                  </h3>
                </div>

                <div className="border rounded-xl p-5">
                  <p className="text-gray-500">
                    Email Address
                  </p>

                  <h3 className="font-semibold text-lg">
                    {profile.email || "-"}
                  </h3>
                </div>

                <div className="md:col-span-2 border rounded-xl p-5">
                  <p className="text-gray-500">
                    Address
                  </p>

                  <h3 className="font-semibold text-lg whitespace-pre-line">
                    {profile.address || "-"}
                  </h3>
                </div>

              </div>

            ) : (

              <div className="bg-gradient-to-r from-pink-50 to-purple-50 border-2 border-dashed border-pink-300 rounded-2xl p-10 text-center">

                <div className="text-7xl mb-5">
                  🔒
                </div>

                <h3 className="text-3xl font-bold text-pink-600">
                  Premium Members Only
                </h3>

                <p className="mt-4 text-gray-600 max-w-xl mx-auto">
                  Contact Number, WhatsApp, Email Address and
                  Complete Address are visible only to Premium Members.
                </p>

                <Link
                  href="/dashboard/premium"
                  className="inline-block mt-8 bg-pink-600 hover:bg-pink-700 text-white px-10 py-4 rounded-xl font-semibold text-lg"
                >
                  Upgrade to Premium
                </Link>

              </div>

            )}

          </div>

          {/* Action Buttons */}

          <div className="mt-12 flex flex-wrap gap-4 justify-center">

            {isLoggedIn && (
              <LikeButton userId={profile.id} />
            )}

            <Link
              href={
                !isLoggedIn
                  ? "/login"
                  : isPremium
                  ? `/dashboard/messages/${profile.id}`
                  : "/dashboard/premium"
              }
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl"
            >
              💬 Message
            </Link>

            <Link
              href={
                !isLoggedIn
                  ? "/login"
                  : isPremium
                  ? `tel:${profile.mobile}`
                  : "/dashboard/premium"
              }
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl"
            >
              📞 Call
            </Link>

            <Link
  href={
    !isLoggedIn
      ? "/login"
      : isPremium
      ? `/profile/${profile.id}/biodata`
      : "/dashboard/premium"
  }
  className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-xl"
>
  📄 Download Biodata
</Link>

          </div>

        </div>

      </div>

    </div>
  );
}