import React from "react";

export default function GoogleMap() {
  const openDirections = (address) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
      address
    )}`;
    window.open(url, "_blank");
  };

  return (
    <div>
      <button
        onClick={() => openDirections("kakthota hondadmane ullor 11")}
        className="px-3 py-1 bg-green-600 text-white rounded"
      >
        Navigate
      </button>
    </div>
  );
}
