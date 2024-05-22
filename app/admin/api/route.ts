export async function POST(request: Request) {
  const body = await request.json();

  console.log('Making POST request with body');
  const res = await fetch(
    'https://preview.api.james-spillmann.com/experiences',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(body),
    },
  );

  const result = await res.json();
  console.log('Result:', result);

  return new Response(JSON.stringify(result), {
    headers: { 'Content-Type': 'application/json' },
  });
}
