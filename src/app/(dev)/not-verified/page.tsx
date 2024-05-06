import React from "react";

const Page = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[url('/images/bg_dummy.png')] p-4">
      <div>
        <h2 className="mb-8 text-8xl font-bold text-white">
          You will be granted access soon
        </h2>
        <p className="text-2xl text-gray-300">
          ... sorry for the wait. We will get back to you as soon as possible.
        </p>
      </div>
    </main>
  );
};

export default Page;
