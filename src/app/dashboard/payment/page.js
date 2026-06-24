"use client";

export default function PaymentPage() {

  const handlePayment = async () => {

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,

      amount: 200 * 100,

      currency: "INR",

      name: "Matrimony",

      description: "1 Year Premium Membership",

      handler: function (response) {

        alert(
          "Payment Success: " +
            response.razorpay_payment_id
        );

      },
    };

    const razorpay =
      new window.Razorpay(options);

    razorpay.open();
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow p-8">

        <h1 className="text-3xl font-bold">
          Premium Payment
        </h1>

        <p className="mt-4">
          Premium Membership Fee
        </p>

        <h2 className="text-4xl font-bold mt-4">
          ₹200 / Year
        </h2>

        <button
          onClick={handlePayment}
          className="mt-6 bg-green-600 text-white px-8 py-3 rounded-lg"
        >
          Pay Now
        </button>

      </div>
    </div>
  );
}