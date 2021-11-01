import { ToasterProvider } from "context/ToasterContext";

import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <ToasterProvider>
      <Component {...pageProps} />
    </ToasterProvider>
  );
}

export default MyApp;
