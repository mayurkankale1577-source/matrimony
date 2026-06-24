import Link from "next/link";

export default function PremiumPage() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow p-8">

        <h1 className="text-3xl font-bold text-pink-600">
          Premium Membership
        </h1>

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
          <h2 className="text-4xl font-bold">
            ₹200 / Year
          </h2>

          <p className="mt-2 text-green-600 font-semibold">
            ✓ Premium access for 12 months
          </p>

          <p className="text-gray-500">
            One Time Payment
          </p>
        </div>

        <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="font-semibold">
            Payment Instructions
          </p>

          <p className="mt-2">
            1. Click "Pay ₹200 Now" or scan QR Code.
          </p>

          <p>
            2. Complete the payment.
          </p>

          <p>
            3. Send payment screenshot on WhatsApp.
          </p>

          <p>
            4. Premium access will be activated within 1 hour after payment verification.
          </p>

          <p className="mt-3 font-medium">
            WhatsApp: +91 9356882028
          </p>

          <p>
            Call: +91 9356882028
          </p>
        </div>

        {/* Direct UPI Payment Button */}
        <div className="mt-6 flex justify-center">
        <a
  href="upi://pay?pa=mayurkankale15-3@oksbi&pn=Matrimony&am=200&cu=INR"
  className="bg-blue-600 text-white px-8 py-3 rounded-lg"
>
  Pay ₹200 Now
</a>
        </div>

        {/* QR Code */}
        <div className="mt-8 flex justify-center">
          <img
            src="/images/qr.png"
            alt="UPI QR Code"
            className="w-64 h-64 border rounded-lg"
          />
        </div>

        {/* WhatsApp */}
        <div className="mt-6 flex justify-center">
          <a
            href="https://wa.me/919356882028"
            target="_blank"
            className="bg-green-600 text-white px-8 py-3 rounded-lg"
          >
            Send Payment Screenshot
          </a>
        </div>

        <p className="mt-8 text-sm text-gray-500">
          By purchasing Premium Membership you agree to our
          Terms & Conditions and Refund Policy.
        </p>

      </div>
    </div>
  );
}