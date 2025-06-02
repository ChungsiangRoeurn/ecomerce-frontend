'use server';
import axios from "axios";

export default async function removeFromCart(cart_id: number) {
  try {
    const response = await axios.post(`${process.env.API_KEY_URL}/transaction/removeCart.php`, {
      cart_id,
    });

    return response.data;
  } catch (error: any) {
    console.error("❌ removeFromCart failed:", {
      message: error.message,
      response: error.response?.data,
      cart_id,
    });
    throw new Error("Failed to remove from cart");
  }
}
