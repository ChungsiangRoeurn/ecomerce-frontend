'use server';

import axios from "axios";

interface VariantPayload {
  variant_id: number;
  quantity: number;
}

interface AddToCartPayload {
  user_id: string;
  product_id: number;
  variants: VariantPayload[];
}

export async function addToCart({ user_id, product_id, variants }: AddToCartPayload) {
  try {
    console.log("Adding to cart with payload:", {
      user_id,
        product_id,
        variants,
    });
    const response = await axios.post(
      `${process.env.API_KEY_URL}/transaction/cart.php`,
      {
        user_id,
        product_id,
        variants,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Add to cart response:", response.data);

    if (response.data?.success) {
      return {
        success: true,
        message: response.data.message || "Added to cart successfully",
      };
    } else {

      return {
        success: false,
        message: response.data.message || "Unknown error occurred",
        error: response.data.error || null,
      };
    }
  } catch (error: any) {
    console.error("Error adding to cart:", error.message);

    return {
      success: false,
      message: "Failed to add to cart",
      error: error.response?.data || error.message,
    };
  }
}
