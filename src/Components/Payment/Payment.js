import React from "react";

function Payment() {
  return (
    <div>
      <div className="content">
        <svg width="400" height="400">
          <circle
            fill="none"
            stroke="#68E534"
            stroke-width="20"
            cx="200"
            cy="200"
            r="190"
            strokeLinecap="round"
            transform="rotate(-90 200 200)"
            className="circle"
          />
          <polyline
            fill="none"
            stroke="#68E534"
            points="88,214 173,284 304,138"
            strokeWidth="24"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="tick"
          />
        </svg>
      </div>

      <h4>Thank you for submiting the Form</h4>
    </div>
  );
}

export default Payment;
