import { NextResponse } from 'next/server';

export async function GET() {
  const fakeProducts = [
    { id: 1, name: 'Fake Product 1', price: 10 },
    { id: 2, name: 'Fake Product 2', price: 20 },
  ];
  return NextResponse.json(fakeProducts);
}
