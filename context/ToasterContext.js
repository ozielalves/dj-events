import { createContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToasterContext = createContext();

export const ToasterProvider = ({ children }) => {
  return (
    <ToasterContext.Provider value={toast}>
      {children}
      <ToastContainer position="bottom-right" pauseOnHover />
    </ToasterContext.Provider>
  );
};

export default ToasterContext;
