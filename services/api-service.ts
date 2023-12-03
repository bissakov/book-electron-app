import axios from "axios";
import { getAccessToken } from "./auth-service";

export async function getPrivateData(): Promise<string> {
  const result = await axios.get("http://localhost:3000/private", {
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });
  return result.data;
}

module.exports = {
  getPrivateData,
};
