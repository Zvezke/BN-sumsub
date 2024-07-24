import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import CryptoJS from "crypto-js";

export async function POST(req: NextRequest) {
  const SUMSUB_APP_TOKEN = process.env.SUMSUB_APP_TOKEN!;
  const SUMSUB_SECRET_KEY = process.env.SUMSUB_SECRET_KEY!;
  const {
    userId = "someUniqueUserIdPostman",
    levelName = "basic-kyc-level",
    ttlInSecs = 600,
  } = await req.json();

  const sumsub_root_url = "https://api.sumsub.com";
  const method = "POST";
  const url = `${sumsub_root_url}/resources/accessTokens?userId=${userId}&levelName=${levelName}`;
  console.log("URL Path:", url);
  // const urlPath =
  //   "https://api.sumsub.com/resources/accessTokens?userId=random-postman-user-ft6ca0j0r&levelName=basic-kyc-level";

  const stamp = Math.floor(Date.now() / 1000).toString();
  const valueToSign = `${stamp}${method}${url}`;
  console.log("Value to Sign:", valueToSign);
  const signature = CryptoJS.enc.Hex.stringify(
    CryptoJS.HmacSHA256(valueToSign, SUMSUB_SECRET_KEY),
  );

  const headers = {
    "X-App-Token": SUMSUB_APP_TOKEN,
    "X-App-Access-Ts": stamp.toString(),
    "X-App-Access-Sig": signature,
    "Content-Type": "application/json",
  };

  // Log headers, URL, and signature for debugging
  console.log("Generated Headers:", headers);
  console.log("Generated Signature:", signature);
  console.log("Value to Sign:", valueToSign);
  console.log("URL Path:", url);
  console.log("Timestamp:", stamp);

  console.log("Axios url:", `${url}`);

  try {
    const response = await axios.post(`${url}`, {}, { headers });
    return NextResponse.json(response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return new NextResponse(
        JSON.stringify(
          error.response?.data || { error: "Internal Server Error, 1" },
        ),
        { status: error.response?.status || 500 },
      );
    } else {
      return new NextResponse(
        JSON.stringify({ error: "Internal Server Error, 2" }),
        { status: 500 },
      );
    }
  }
}

// Example of 'Stamp' from console log from respectively NextJS and Postman (within a few seconds of each other):
// 1721585241
// 1721585239

// Example of 'Value to sign' from console log:
// NextJS
// 1721586272POSThttps://api.sumsub.com/resources/accessTokens?userId=random-postman-user-5kixf6sqi&levelName=basic-kyc-level

// Postman
// 1721586239POSThttps://api.sumsub.com/resources/accessTokens?userId=random-postman-user-ft6ca0j0r&levelName=basic-kyc-level
