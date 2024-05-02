import type { Metadata } from "next";
import { Hanken_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const hanken = Hanken_Grotesk({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BN",
  description: "Created by Asta Media",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="h-full" lang="en">
      <body className={`h-full ${hanken.className}`}>
        <main className="flex min-h-screen flex-col justify-center bg-[url('/images/bg_dummy.png')] p-4">
          {children}
        </main>
      </body>
    </html>
  );
}

//////////////////////////////////
// To be used when in live mode //
//////////////////////////////////

// import type { Metadata } from "next";
// import { Hanken_Grotesk, Inter } from "next/font/google";
// import "./globals.css";

// const hanken = Hanken_Grotesk({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "BN",
//   description: "Created by Asta Media",
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html className="h-full" lang="en">
//       <body className={`h-full ${hanken.className}`}>{children}</body>
//     </html>
//   );
// }
