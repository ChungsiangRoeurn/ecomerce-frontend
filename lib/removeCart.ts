// app/lib/removeCart.ts (or somewhere like this)
import axios from "axios";

export async function removeCartItem(cart_id: number) {
  return await axios.post(`${process.env.NEXT_PUBLIC_API_KEY_URL}/transaction/removeCart.php`, { cart_id });
}
