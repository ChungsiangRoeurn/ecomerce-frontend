import type { NextApiRequest, NextApiResponse } from 'next';
const { BakongKHQR, khqrData, IndividualInfo } = require('bakong-khqr');


type RequestBody = {
  bakongID: string;
  username: string;
  location: string;
  amount: number;
};

type ResponseData =
  | {
      Decode: any;
      qr: string;
      md5: string;
    }
  | {
      error: string;
    };
export default function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const body = req.body as RequestBody;
  const amount = Number(body.amount);

  if (!amount || isNaN(amount) || amount <= 0) {
    return res.status(400).json({ error: 'Invalid amount provided, must be greater than 0' });
  }

  const optionalData = {
    currency: 116,
    amount: amount,
    mobileNumber: '85585886808',
    storeLabel: 'BLUSH',
    terminalLabel: 'Cashier_1',
    purposeOfTransaction: 'oversea',
    languagePreference: 'km',
    merchantNameAlternateLanguage: 'HIN MINHSEU',
    merchantCityAlternateLanguage: 'PHNOM PENH',
    upiMerchantAccount: '011425877',
    expirationTimestamp: String(Date.now() + 3600 * 1000).slice(0, 13)

  };

  const individualInfo = new IndividualInfo(
    body.bakongID,
    body.username,
    body.location,
    optionalData
  );

  const KHQR = new BakongKHQR();

  try {
    const individual = KHQR.generateIndividual(individualInfo);
    console.log("Generated KHQR:", individual);
    console.log("accountid", individualInfo)

    // Defensive check:
    if (!individual || !individual.data || typeof individual.data.qr !== "string") {
      console.error("Invalid KHQR response:", individual);
      return res.status(500).json({ error: "QR generation failed or returned invalid data." });
    }

    const decodeValue = BakongKHQR.decode(individual.data.qr);

    return res.status(200).json({
      qr: individual.data.qr,
      md5: individual.data.md5,
      Decode: decodeValue,
    });
  } catch (error) {
    console.error("Error generating QR:", error);
    return res.status(500).json({ error: "Error generating QR code" });
  }

}
