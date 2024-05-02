"use client";

import { useState } from "react";

const TestEmail = () => {
  // const [userInformation, setUserInformation] = useState(null);
  const handleFetchUserInformation = async () => {
    const response = await fetch("/api/test-email/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response);
    // const data = await response.json();
    // console.log(data);
    // setUserInformation(data);
  };

  return (
    <div>
      {" "}
      <button
        onClick={handleFetchUserInformation}
        className="flex w-full justify-center rounded-md bg-sand px-3 py-1.5 text-sm font-semibold leading-6 text-himmel shadow-sm hover:bg-sand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sand"
      >
        Test email
      </button>
      {/* {userInformation && (
        <div className="mt-4 text-white">
          <pre>{JSON.stringify(userInformation, null, 2)}</pre>
        </div>
      )} */}
    </div>
  );
};

export default TestEmail;
