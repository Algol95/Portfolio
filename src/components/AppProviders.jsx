import PropTypes from "prop-types";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

const recaptchaSiteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

export function AppProviders({ children }) {
  if (!recaptchaSiteKey) {
    return children;
  }

  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={recaptchaSiteKey}
      language="es"
      scriptProps={{
        async: true,
        appendTo: "head",
        defer: true,
      }}
    >
      {children}
    </GoogleReCaptchaProvider>
  );
}

AppProviders.propTypes = {
  children: PropTypes.node.isRequired,
};
