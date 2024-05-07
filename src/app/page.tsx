import { redirect } from "next/navigation";

const Page = () => {
  redirect("/login");
  return <div>Page</div>;
};

export default Page;
