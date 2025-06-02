'use server';
import axios from "axios";

export default async function cartDisplay(user_id: string) {
  try {
    const response = await axios.post(`${process.env.API_KEY_URL}/transaction/cartDisplay.php`, {
      user_id,
    }, {
      headers: {
        "Content-Type": "application/json",
      }
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching cart data:", error);
    throw error;
  }
}
