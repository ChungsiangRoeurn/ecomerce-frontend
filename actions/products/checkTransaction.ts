// app/actions/checkPayment.ts
"use server";

import axios from "axios";

export async function checkPaymentStatus(md5: string) {
  const url = "https://api-bakong.nbc.gov.kh/v1/check_transaction_by_md5";
  console.log("Checking payment status for MD5:", md5);

  try {
    const response = await axios.post(
      url,
      { md5 },
      {
        headers: {
          Authorization: `Bearer ${process.env.BAKONG_API_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Payment check success:", response.data);
    return { success: true, data: response.data };
  } catch (error: any) {
    console.error("❌ Payment check failed:", error?.response?.data || error.message);
    return { success: false, error: error?.response?.data || error.message };
  }
}
