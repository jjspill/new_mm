// pages/api/subway.ts
import { getAPIUrl } from 'config/config';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const apiUrl = getAPIUrl();

    const res = await fetch(`${apiUrl}/subway`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
      },
      // next: { revalidate: 30 },
      body: JSON.stringify(body),
    });

    const result = await res.json();
    return new Response(JSON.stringify(result));
  } catch (error) {
    console.error('Failed to find nearest subway stations:', error);
    return new Response(
      JSON.stringify({
        message: 'Failed to find nearest subway stations',
        error,
      }),
    );
  }
}
