import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const isRecaptchaConfigured = Boolean(import.meta.env.VITE_RECAPTCHA_SITE_KEY);

const API = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

export const sendContactForm = (formData) => {
  return API.post("/api/contacto", {
    name: formData.name,
    email: formData.email,
    company: formData.company,
    subject: formData.subject,
    message: formData.message,
    recaptchaToken: formData.recaptchaToken,
  });
};

export async function sendContactMessage(payload) {
  const { recaptchaToken } = payload;

  if (isRecaptchaConfigured) {
    if (!recaptchaToken) {
      return {
        ok: false,
        errorCode: "recaptcha_missing",
      };
    }
  }

  try {
    const response = await sendContactForm(payload);

    return {
      ok: true,
      data: response.data,
    };
  } catch (error) {
    return {
      ok: false,
      errorCode: "request_failed",
      message: error instanceof Error ? error.message : "Request failed",
      status: axios.isAxiosError(error)
        ? (error.response?.status ?? null)
        : null,
    };
  }
}

export default API;
