import { Config } from "../src/types/types";
import dotenv from "dotenv";

dotenv.config();

function getConfiguration(): Config {
  const auth0Domain = process.env.auth0Domain || "";
  const clientId = process.env.clientId || "";
  const apiIdentifier = process.env.apiIdentifier || "";

  if (!auth0Domain || !clientId || !apiIdentifier) {
    throw new Error(
      "auth0Domain or clientId environment variables are not set.",
    );
  }

  return {
    auth0Domain,
    clientId,
    apiIdentifier,
  };
}

export const config = getConfiguration();
