import Link from "next/link";
export default function PremiumPage() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow p-8">
        <h1 className="text-3xl font-bold text-pink-600">Premium Membership</h1>

        <p className="mt-4 text-gray-600">
          Unlock all premium matrimony features.
        </p>

        <div className="mt-6 space-y-3">
          <p>✅ Unlimited Messages</p>
          <p>✅ Contact Number Access</p>
          <p>✅ Full Profile View</p>
          <p>✅ Biodata Download</p>
          <p>✅ Family Details Access</p>
        </div>

        <div className="mt-8">
          <h2 className="text-4xl font-bold">₹200</h2>
          <p>✓ Premium access for 12 months</p>

          <p className="text-gray-500">One Time Membership</p>

          By purchasing Premium Membership you agree to our
Terms & Conditions and Refund Policy.
        </div>

        <Link
          href="/dashboard/payment"
          className="inline-block mt-6 bg-pink-600 text-white px-8 py-3 rounded-lg"
        >
          Upgrade Now
        </Link>
      </div>
    </div>
  );
}
