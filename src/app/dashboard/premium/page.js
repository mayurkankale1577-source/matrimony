"use client";

export default function PremiumPage() {
  const upiId = "mayurkankale15-2@okaxis";

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

        {/* Payment Instructions */}

        <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-5">

          <h3 className="font-semibold text-lg mb-3">
            Payment Instructions
          </h3>

          <ol className="list-decimal pl-5 space-y-2">
            <li>Click <b>Pay ₹200 Now</b> or scan the QR Code.</li>
            <li>Complete the payment.</li>
            <li>Send the payment screenshot on WhatsApp.</li>
            <li>
              Premium access will be activated within
              <b> 1 hour </b>
              after payment verification.
            </li>
          </ol>

          <div className="mt-5">
            <p className="font-semibold">
              UPI ID
            </p>

            <div className="flex gap-2 mt-2 flex-wrap">

              <input
                readOnly
                value={upiId}
                className="border rounded px-3 py-2 flex-1"
              />

              <button
                onClick={() =>
                  navigator.clipboard.writeText(upiId)
                }
                className="bg-gray-700 text-white px-4 rounded"
              >
                Copy
              </button>

            </div>
          </div>

          <p className="mt-5">
            <b>WhatsApp:</b> +91 9356882028
          </p>

          <p>
            <b>Call:</b> +91 9356882028
          </p>

        </div>

        {/* UPI Button */}

        <div className="mt-6 flex justify-center">

        <a
  href="upi://pay?pa=mayurkankale15-2@okaxis&pn=Matrimony&cu=INR&tn=Premium Membership"
  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold"
>
  Pay with UPI
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
            rel="noopener noreferrer"
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg"
          >
            Send Payment Screenshot
          </a>

        </div>

        <p className="mt-8 text-sm text-gray-500 text-center">
          By purchasing Premium Membership you agree to our
          Terms & Conditions and Refund Policy.
        </p>

      </div>
    </div>
  );
}