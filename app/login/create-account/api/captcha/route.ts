export async function POST(request: Request) {
  const body = await request.json();
  const VERIFY_URL = `https://www.google.com/recaptcha/api/siteverify`;
  const recaptchaToken = body.token;

  try {
    const res = await fetch(VERIFY_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${process.env.CAPTCHA_SECRET_KEY}&response=${recaptchaToken}`,
    });

    const result = await res.json();

    if (result?.success) {
      return new Response(JSON.stringify({ success: true }));
    } else {
      return new Response(JSON.stringify({ success: false }));
    }
  } catch (error) {
    console.error('Failed to verify reCAPTCHA:', error);
    return new Response(
      JSON.stringify({ message: 'Failed to verify reCAPTCHA', error }),
    );
  }
}
