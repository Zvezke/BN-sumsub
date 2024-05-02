// retrieve-user-information/route.ts

export async function GET() {
  const url =
    `${process.env.NEXT_PUBLIC_PAYWISER_DEV_URL}/api/v1/users/${process.env.NEXT_PUBLIC_ELISHA_GREGORY_IBAN}/` ??
    "";
  console.log(url);
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + process.env.NEXT_PUBLIC_ACCESS_TOKEN,
    },
  });
  const data = await res.json();
  console.log(data);

  return Response.json({ data });
}
