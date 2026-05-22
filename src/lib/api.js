export async function sendContactMessage(payload) {
  const { recaptchaToken, ...formData } = payload;

  await new Promise((resolve) => window.setTimeout(resolve, 1000));

  return {
    ok: true,
    data: {
      ...formData,
      recaptchaToken,
    },
  };
}
