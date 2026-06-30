"use client";

export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg"
    >
      📄 PDF डाउनलोड करा
    </button>
  );
}