"use client";

import { useState } from "react";

const RetrieveUserInformation = () => {
  const [userInformation, setUserInformation] = useState(null);
  const handleFetchUserInformation = async () => {
    const response = await fetch("/api/retrieve-user-information/");
    const data = await response.json();
    console.log(data);
    setUserInformation(data);
  };

  return (
    <div>
      {" "}
      <button
        onClick={handleFetchUserInformation}
        className="flex w-full justify-center rounded-md bg-sand px-3 py-1.5 text-sm font-semibold leading-6 text-himmel shadow-sm hover:bg-sand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sand"
      >
        Retrieve user information
      </button>
      {userInformation && (
        <div className="mt-4 text-white">
          <pre>{JSON.stringify(userInformation, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default RetrieveUserInformation;
