import { getAPIUrl } from 'config/config';

export async function POST(request: Request) {
  const body = await request.json();
  const apiUrl = getAPIUrl();

  if (body?.code) {
    try {
      const res = await fetch(`${apiUrl}/account/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const result = await res.json();
      return new Response(JSON.stringify(result));
    } catch (error) {
      console.error('Failed to login:', error);
      return new Response(
        JSON.stringify({ message: 'Failed to login', error }),
      );
    }
  }

  try {
    const res = await fetch(`${apiUrl}/account/forgot-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const result = await res.json();
    return new Response(JSON.stringify(result));
  } catch (error) {
    console.error('Failed to login:', error);
    return new Response(JSON.stringify({ message: 'Failed to login', error }));
  }
}
