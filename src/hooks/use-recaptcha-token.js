import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

const hasRecaptchaSiteKey = Boolean(import.meta.env.VITE_RECAPTCHA_SITE_KEY);

export function useRecaptchaToken() {
  const { executeRecaptcha } = useGoogleReCaptcha();

  const getRecaptchaToken = async (action) => {
    if (!hasRecaptchaSiteKey || !executeRecaptcha) {
      return null;
    }

    try {
      return await executeRecaptcha(action);
    } catch {
      return null;
    }
  };

  return {
    getRecaptchaToken,
    isRecaptchaReady: hasRecaptchaSiteKey && Boolean(executeRecaptcha),
    isRecaptchaEnabled: hasRecaptchaSiteKey,
  };
}
