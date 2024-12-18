import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { ClerkProvider } from "@clerk/clerk-react";
import { dark } from "@clerk/themes";

import { BrowserRouter } from "react-router";
import AppRoutes from "@/routes";

import { Provider as ReduxProvider } from "react-redux";
import store from "@/store.ts";


const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
if (!PUBLISHABLE_KEY) {
    throw new Error("Missing Publishable Key");
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/" appearance={{ baseTheme: dark }}>
          <ReduxProvider store={store}>
              <BrowserRouter>
                  <AppRoutes />
              </BrowserRouter>
          </ReduxProvider>
      </ClerkProvider>
  </StrictMode>,
);
