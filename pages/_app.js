import { ToasterProvider } from "context/ToasterContext";
import { AuthProvider } from "context/AuthContext";

import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <ToasterProvider>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ToasterProvider>
  );
}

export default MyApp;
