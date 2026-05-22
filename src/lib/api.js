export async function sendContactMessage(payload) {
  await new Promise((resolve) => window.setTimeout(resolve, 1000));

  return {
    ok: true,
    data: payload,
  };
}
