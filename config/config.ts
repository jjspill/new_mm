export function getAPIUrl() {
  const stage = process.env.NEXT_PUBLIC_VERCEL_ENV || 'development';

  if (stage === 'development') {
    return 'http://localhost:3001';
  } else if (stage === 'production') {
    return 'https://api.james-spillmann.com';
  } else {
    return 'https://preview.api.james-spillmann.com';
  }
}
