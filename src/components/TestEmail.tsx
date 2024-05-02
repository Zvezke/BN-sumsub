"use client";

const TestEmail = () => {
  const handleFetchUserInformation = async () => {
    const response = await fetch("/api/test-email/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response);
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
    </div>
  );
};

export default TestEmail;
