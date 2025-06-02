// app/api/cart/remove/route.ts

import { NextRequest, NextResponse } from "next/server";
import axios from "axios"; // or your helper if you’ve modularized it

export async function POST(req: NextRequest) {
  try {
    const { cart_id } = await req.json();

    const response = await axios.post(`${process.env.API_KEY_URL}/transaction/removeCart.php`, {
      cart_id,
    });

    return NextResponse.json({
      success: true,
      data: response.data,
    });
  } catch (error) {
    console.error("Remove cart error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to remove item" },
      { status: 500 }
    );
  }
}
