import { jwtDecode } from "jwt-decode";
import axios from "axios";
import url from "url";
import { app, safeStorage } from "electron";
import fs from "fs";
import path from "path";

const auth0Domain = "";
const clientId = "";

const redirectUri = "http://localhost/callback";

const tokenFilePath = path.join(app.getPath("userData"), "tokenData");

let accessToken: string | null = null;
let profile: string | null = null;
let refreshToken = null;

export function getAccessToken(): string | null {
  return accessToken;
}

export function getProfile(): string | null {
  return profile;
}

export function getAuthenticationURL(): string {
  return (
    "https://" +
    auth0Domain +
    "/authorize?" +
    "scope=openid profile offline_access&" +
    "response_type=code&" +
    "client_id=" +
    clientId +
    "&" +
    "redirect_uri=" +
    redirectUri
  );
}

export function storeEncryptedToken(token: string): void {
  const encryptedToken = safeStorage.encryptString(token);
  fs.writeFileSync(tokenFilePath, encryptedToken);
}

export function readEncryptedToken(): string | null {
  if (fs.existsSync(tokenFilePath)) {
    const encryptedToken = fs.readFileSync(tokenFilePath);
    try {
      return safeStorage.decryptString(encryptedToken);
    } catch (error) {
      console.error("Failed to decrypt token:", error);
      return null;
    }
  }
  return null;
}

export async function refreshTokens(): Promise<void> {
  refreshToken = readEncryptedToken();

  if (refreshToken) {
    const refreshOptions = {
      method: "POST",
      url: `https://${auth0Domain}/oauth/token`,
      headers: { "content-type": "application/json" },
      data: {
        grant_type: "refresh_token",
        client_id: clientId,
        refresh_token: refreshToken,
      },
    };

    try {
      const response = await axios(refreshOptions);
      accessToken = response.data.access_token;
      profile = jwtDecode(response.data.id_token);
    } catch (error) {
      await logout();
      throw error;
    }
  } else {
    throw new Error("No available refresh token.");
  }
}

export async function loadTokens(callbackURL: string): Promise<void> {
  const urlParts = url.parse(callbackURL, true);
  const query = urlParts.query;

  const exchangeOptions = {
    grant_type: "authorization_code",
    client_id: clientId,
    code: query.code,
    redirect_uri: redirectUri,
  };

  const options = {
    method: "POST",
    url: `https://${auth0Domain}/oauth/token`,
    headers: {
      "content-type": "application/json",
    },
    data: JSON.stringify(exchangeOptions),
  };

  try {
    const response = await axios(options);
    accessToken = response.data.access_token;
    profile = jwtDecode(response.data.id_token);
    refreshToken = response.data.refresh_token;

    if (refreshToken) {
      storeEncryptedToken(refreshToken);
    }
  } catch (error) {
    await logout();
    throw error;
  }
}

export async function logout(): Promise<void> {
  if (fs.existsSync(tokenFilePath)) {
    fs.unlinkSync(tokenFilePath);
  }
  accessToken = null;
  profile = null;
  refreshToken = null;
}

export function getLogOutUrl(): string {
  return `https://${auth0Domain}/v2/logout`;
}

module.exports = {
  getAccessToken,
  getAuthenticationURL,
  getLogOutUrl,
  getProfile,
  loadTokens,
  logout,
  refreshTokens,
  storeEncryptedToken,
  readEncryptedToken,
};
