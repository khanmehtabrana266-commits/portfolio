import React from "react";
import { Toaster } from "react-hot-toast";

const GlobalToaster = () => {
  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      gutter={12}
      containerStyle={{
        position: "fixed",
        top: "80px",
        right: "25px",
        zIndex: 999999,
      }}
      toastOptions={{
        duration: 4000,

        style: {
          background: "#11111a",
          color: "#ffffff",
          border: "1px solid rgba(255, 255, 255, 0.12)",
          borderRadius: "12px",
          padding: "15px 18px",
          minWidth: "320px",
          maxWidth: "420px",
          fontSize: "14px",
          fontWeight: "500",
          boxShadow: "0 15px 45px rgba(0, 0, 0, 0.5)",
        },

        success: {
          duration: 3500,
          style: {
            background: "#11111a",
            color: "#ffffff",
            border: "1px solid rgba(34, 197, 94, 0.45)",
          },
          iconTheme: {
            primary: "#22c55e",
            secondary: "#ffffff",
          },
        },

        error: {
          duration: 4500,
          style: {
            background: "#11111a",
            color: "#ffffff",
            border: "1px solid rgba(255, 59, 79, 0.55)",
          },
          iconTheme: {
            primary: "#ff3b4f",
            secondary: "#ffffff",
          },
        },
      }}
    />
  );
};

export default GlobalToaster;