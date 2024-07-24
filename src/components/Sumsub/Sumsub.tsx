"use client";

import { useState } from "react";

export default function SumsubToken() {
  const [token, setToken] = useState(null);

  const getToken = async () => {
    const response = await fetch("/api/sumsub", {
      method: "POST",
      body: JSON.stringify({
        // userId: "random-postman-user-5kixf6sqi",
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
    <div>
      <button
        onClick={getToken}
        className="flex w-full justify-center rounded-md bg-sand px-3 py-1.5 text-sm font-semibold leading-6 text-himmel shadow-sm hover:bg-sand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sand"
      >
        Get Sumsub Token
      </button>
      {token && (
        <pre className="text-gray-300">{JSON.stringify(token, null, 2)}</pre>
      )}
    </div>
  );
}
