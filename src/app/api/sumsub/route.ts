import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  // Load environment variables
  const SUMSUB_APP_TOKEN = process.env.SUMSUB_APP_TOKEN;
  const SUMSUB_SECRET_KEY = process.env.SUMSUB_SECRET_KEY;
  const SUMSUB_BASE_URL = process.env.SUMSUB_BASE_URL;

  if (!SUMSUB_APP_TOKEN || !SUMSUB_SECRET_KEY || !SUMSUB_BASE_URL) {
    return NextResponse.json(
      { error: "Missing environment variables" },
      { status: 500 },
    );
  }

  // Parse the request body
  const { userId, levelName, ttlInSecs } = await req.json();

  const config: any = {
    baseURL: SUMSUB_BASE_URL,
    method: "POST",
    url: `/resources/accessTokens?userId=${encodeURIComponent(userId)}&ttlInSecs=${ttlInSecs || 600}&levelName=${encodeURIComponent(levelName || "basic-kyc-level")}`,
    headers: {
      Accept: "application/json",
      "X-App-Token": SUMSUB_APP_TOKEN,
    },
    data: null,
  };

  function createSignature(config: any) {
    const ts = Math.floor(Date.now() / 1000);
    const signature = crypto.createHmac(
      "sha256",
      process.env.SUMSUB_SECRET_KEY || "",
    );
    signature.update(ts + config.method.toUpperCase() + config.url);

    if (config.data) {
      signature.update(config.data.getBuffer());
    } else if (config.data) {
      signature.update(config.data);
    }

    config.headers["X-App-Access-Ts"] = ts;
    config.headers["X-App-Access-Sig"] = signature.digest("hex");

    return config;
  }

  axios.interceptors.request.use(createSignature, function (error) {
    return Promise.reject(error);
  });

  function createAccessToken(
    externalUserId = "random-postman-user-5kixf6sqi",
    levelName = "basic-kyc-level",
    ttlInSecs = 600,
  ) {
    console.log("Creating an access token for initializng SDK...");

    const method = "post";
    const url =
      "/resources/accessTokens?userId=" +
      encodeURIComponent(externalUserId) +
      "&ttlInSecs=" +
      ttlInSecs +
      "&levelName=" +
      encodeURIComponent(levelName);

    const headers = {
      Accept: "application/json",
      "X-App-Token": SUMSUB_APP_TOKEN,
    };

    config.method = method;
    config.url = url;
    config.headers = headers;
    config.data = null;

    return config;
  }

  try {
    const response = await axios(
      createAccessToken(userId, levelName, ttlInSecs),
    );
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
