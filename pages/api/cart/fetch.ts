// pages/api/cart/fetch.ts
import type { NextApiRequest, NextApiResponse } from "next";
import cartDisplay from "@/actions/products/cartDisplay";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { user_id } = req.body;
  if (!user_id) {
    return res.status(400).json({ error: "user_id is required" });
  }

  try {
    const data = await cartDisplay(user_id);
    return res.status(200).json(data);
  } catch (err) {
    console.error("cart fetch error:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
