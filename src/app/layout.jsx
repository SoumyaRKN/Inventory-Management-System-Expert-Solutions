"use client"

import "./globals.css";
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from "react";
import { baselightTheme } from "@/utils/theme/DefaultColors";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { ToastContainer } from 'react-toastify';

// Server Actions
import { createSuperAdmin } from "@/actions";

export default function RootLayout({ children }) {
  const addDefaultDataHandler = async () => {
    const createSuperAdminResponse = await createSuperAdmin();
    console.log(createSuperAdminResponse);
  };

  useEffect(() => {
    addDefaultDataHandler();
  }, []);

  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={baselightTheme}>
          <CssBaseline />
          <ToastContainer newestOnTop pauseOnFocusLoss />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
};