export function getAPIUrl() {
  const stage = process.env.STAGE || 'dev';

  if (stage === 'dev') {
    return 'http://localhost:3001';
  } else if (stage === 'prod') {
    return 'https://api.james-spillmann.com';
  } else {
    return 'https://preview.api.james-spillmann.com';
  }
}
