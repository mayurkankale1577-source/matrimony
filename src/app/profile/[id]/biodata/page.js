 
import PrintButton from "@/app/components/PrintButton";
import { getProfileById } from "@/services/profile.service";
import Link from "next/link";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import db from "@/lib/db";

export default async function BiodataPage({ params }) {
  const { id } = await params;

  const profile = await getProfileById(id);

  const cookieStore = await cookies();

const token = cookieStore.get("token")?.value;

let isPremium = false;

if (token) {
  try {
    const user = verifyToken(token);

    const [rows] = await db.query(
      `
      SELECT is_premium
      FROM users
      WHERE id = ?
      `,
      [user.id]
    );

    isPremium = rows[0]?.is_premium == 1;
  } catch {}
}

  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold">
          Profile Not Found
        </h1>
      </div>
    );
  }

  return (
    <div className="bg-pink-100 min-h-screen py-10">

      <div
        id="biodata"
        className="max-w-4xl mx-auto bg-white border-[8px] border-pink-500 rounded-xl shadow-xl p-8"
      >

       

        <div className="text-center">

          <h2 className="text-red-700 text-xl font-bold">
            ॥ श्री गणेशाय नमः ॥
          </h2>

          <h1 className="text-4xl font-bold text-pink-600 mt-2">
            विवाह परिचय
          </h1>

          <p className="text-gray-500 mt-2">
            Matrimony Biodata
          </p>

        </div>

        

        <div className="grid md:grid-cols-3 gap-8 mt-10">

          <div className="flex justify-center">

            <img
              src={
                profile.image_url ||
                "https://via.placeholder.com/250"
              }
              alt={profile.user_full_name}
              className="w-56 h-72 object-cover border-4 border-pink-500 rounded-lg"
            />

          </div>

          <div className="md:col-span-2">

            <table className="w-full border-collapse">

              <tbody>

                <tr>
                  <td className="border p-3 font-semibold w-44">
                    पूर्ण नाव
                  </td>

                  <td className="border p-3">
                    {profile.user_full_name}
                  </td>
                </tr>

                <tr>
                  <td className="border p-3 font-semibold">
                    धर्म
                  </td>

                  <td className="border p-3">
                    {profile.religion}
                  </td>
                </tr>

                <tr>
                  <td className="border p-3 font-semibold">
                    शिक्षण
                  </td>

                  <td className="border p-3">
                    {profile.education}
                  </td>
                </tr>

                <tr>
                  <td className="border p-3 font-semibold">
                    व्यवसाय
                  </td>

                  <td className="border p-3">
                    {profile.occupation}
                  </td>
                </tr>

                <tr>
                  <td className="border p-3 font-semibold">
                    उंची
                  </td>

                  <td className="border p-3">
                    {profile.height}
                  </td>
                </tr>

              </tbody>

            </table>

          </div>

        </div>

        

        <div className="mt-10">

          <h2 className="bg-pink-600 text-white px-5 py-3 rounded font-bold text-xl">
            वैयक्तिक माहिती
          </h2>

          <div className="mt-5 grid grid-cols-2 gap-4">

            <div className="border p-3 rounded">
              <strong>जन्म तारीख</strong>

              <br />

              {profile.birth_date
                ? new Date(
                    profile.birth_date
                  ).toLocaleDateString("en-GB")
                : "-"}
            </div>

            <div className="border p-3 rounded">
              <strong>जन्म ठिकाण</strong>

              <br />

              {profile.birth_place}
            </div>

            <div className="border p-3 rounded">
              <strong>मातृभाषा</strong>

              <br />

              {profile.mother_tongue}
            </div>

            <div className="border p-3 rounded">
              <strong>वार्षिक उत्पन्न</strong>

              <br />

              {profile.annual_income}
            </div>

          </div>

        </div>

       
 
 

        <div className="mt-10">

          <h2 className="bg-pink-600 text-white px-5 py-3 rounded font-bold text-xl">
            कौटुंबिक माहिती
          </h2>

          <div className="mt-5 grid grid-cols-2 gap-4">

            <div className="border p-3 rounded">
              <strong>वडिलांचे नाव</strong>
              <br />
              {profile.father_name || "-"}
            </div>

            <div className="border p-3 rounded">
              <strong>वडिलांचा व्यवसाय</strong>
              <br />
              {profile.father_occupation || "-"}
            </div>

            <div className="border p-3 rounded">
              <strong>आईचे नाव</strong>
              <br />
              {profile.mother_name || "-"}
            </div>

            <div className="border p-3 rounded">
              <strong>भाऊ</strong>
              <br />
              {profile.brothers || "-"}
            </div>

            <div className="border p-3 rounded">
              <strong>बहिण</strong>
              <br />
              {profile.sisters || "-"}
            </div>

            <div className="border p-3 rounded">
              <strong>मामा</strong>
              <br />
              {profile.maternal_uncle || "-"}
            </div>

            <div className="border p-3 rounded">
              <strong>काका</strong>
              <br />
              {profile.kaka_name || "-"}
            </div>

            <div className="border p-3 rounded">
              <strong>मोठे बाबा</strong>
              <br />
              {profile.mothe_baba || "-"}
            </div>

            <div className="border p-3 rounded">
              <strong>मावशी</strong>
              <br />
              {profile.mavshi || "-"}
            </div>

            <div className="border p-3 rounded">
              <strong>आतेमामा</strong>
              <br />
              {profile.aatemama || "-"}
            </div>

          </div>

        </div>
 

        <div className="mt-10">

          <h2 className="bg-pink-600 text-white px-5 py-3 rounded font-bold text-xl">
            माझ्याबद्दल
          </h2>

          <div className="border rounded p-5 mt-5 leading-8">

            {profile.about_me || "माहिती उपलब्ध नाही"}

          </div>

        </div>

        

        <div className="mt-10">

          <h2 className="bg-pink-600 text-white px-5 py-3 rounded font-bold text-xl">
            जोडीदार अपेक्षा
          </h2>

          <div className="border rounded p-5 mt-5 leading-8">

            {profile.partner_preference || "माहिती उपलब्ध नाही"}

          </div>

        </div>

 

<div className="mt-10">

<h2 className="bg-pink-600 text-white px-5 py-3 rounded font-bold text-xl">
  संपर्क माहिती
</h2>

{isPremium ? (

  <div className="grid grid-cols-2 gap-4 mt-5">

    <div className="border p-3 rounded">
      <strong>मोबाईल क्रमांक</strong>
      <br />
      {profile.mobile || "-"}
    </div>

    <div className="border p-3 rounded">
      <strong>ई-मेल</strong>
      <br />
      {profile.email || "-"}
    </div>

    <div className="border p-3 rounded col-span-2">
      <strong>पत्ता</strong>
      <br />
      {profile.address || "-"}
    </div>

  </div>

) : (

  <div className="border-2 border-dashed border-pink-400 rounded-lg p-8 text-center mt-5">

    <div className="text-6xl">
      🔒
    </div>

    <h3 className="text-2xl font-bold text-pink-600 mt-4">
      Premium Members Only
    </h3>

    <p className="mt-3 text-gray-600">
      संपर्क माहिती पाहण्यासाठी Premium Membership घ्या.
    </p>

    <Link
      href="/dashboard/premium"
      className="inline-block mt-6 bg-pink-600 text-white px-8 py-3 rounded-lg"
    >
      Premium घ्या
    </Link>

  </div>

)}

</div>

</div>


<div className="mt-10 flex justify-center gap-4 print:hidden">

<div className="mt-10 flex justify-center gap-4 print:hidden">

<PrintButton />

<Link
  href={`/profile/${profile.id}`}
  className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-3 rounded-lg"
>
  ← Profile
</Link>

</div>

</div>

</div>
);
}