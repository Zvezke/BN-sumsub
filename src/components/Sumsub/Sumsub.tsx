"use client";

import { useState } from "react";

export default function SumsubToken() {
  const [token, setToken] = useState(null);

  const getToken = async () => {
    const response = await fetch("/api/sumsub", {
      method: "POST",
      body: JSON.stringify({
        userId: "1234",
        // levelName: "basic-kyc-level",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setToken(data);
  };

  return (
    <div className="grid grid-cols-1 grid-rows-2">
      {token && (
        <pre className="row-start-1 text-gray-300">
          {JSON.stringify(token, null, 2)}
        </pre>
      )}
      <div className="row-start-2 flex items-start justify-center">
        <button
          onClick={getToken}
          className="rounded-md bg-sand px-3 py-1.5 text-sm font-semibold leading-6 text-himmel shadow-sm hover:bg-sand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sand"
        >
          Get Sumsub Token
        </button>
      </div>
    </div>
  );
}
