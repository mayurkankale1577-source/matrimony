"use client";

export default function PaymentPage() {
  const handlePayment = async () => {
    const res = await fetch(
      "/api/payment/order",
      {
        method: "POST",
      }
    );

    const data = await res.json();

    const options = {
      key: data.key,
      amount: data.order.amount,
      currency: "INR",
      name: "Radhakrishna Vadhuvar Suchak Mandal",
      description: "Premium Membership",
      order_id: data.order.id,

      handler: function (response) {
        alert(
          "Payment Success\n" +
            response.razorpay_payment_id
        );
      },
    };

    const rzp =
      new window.Razorpay(options);

    rzp.open();
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">
        Razorpay Test
      </h1>

      <button
        onClick={handlePayment}
        className="bg-pink-600 text-white px-6 py-3 rounded"
      >
        Pay ₹200
      </button>

      <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
    </div>
  );
}