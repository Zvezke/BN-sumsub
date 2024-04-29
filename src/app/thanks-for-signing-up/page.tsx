import React from "react";

const Page = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[url('/images/bg_dummy.png')] p-4">
      <div>
        <h2 className="mb-8 text-8xl font-bold text-white">
          Thanks for signing up
        </h2>
        <p className="text-2xl text-gray-300">
          ... now go and check your inbox. :)
        </p>
      </div>
    </main>
  );
};

export default Page;