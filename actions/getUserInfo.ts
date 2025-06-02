"use server";
import axios from "axios";

export default async function GetUserInfo(token: string) {
  try {
    const response = await axios.get(`${process.env.API_KEY_URL}/users`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const responseUserInfo = response.data;
    return responseUserInfo; // return the user data, including image
  } catch (error) {
    console.log("Error fetching user info:", error);
    return null;
  }
}
