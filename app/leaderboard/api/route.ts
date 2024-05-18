import { NextResponse } from 'next/server';

export async function GET() {
  const res = await fetch(
    'https://golf-leaderboard-data.p.rapidapi.com/leaderboard/658',
    {
      headers: {
        'x-rapidapi-key': 'b50098b208mshbc6268242ffa8ccp1b5cd1jsn138cea70642d',
        'x-rapidapi-host': 'golf-leaderboard-data.p.rapidapi.com',
        'Content-Type': 'application/json',
      },
      next: { revalidate: 600 },
    },
  );
  const data = await res.json();

  if (!data?.results?.leaderboard) {
    console.error('No data available');
  }

  return NextResponse.json({ data });
}
