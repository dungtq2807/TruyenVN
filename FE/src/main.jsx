
import ReactDOM from "react-dom/client";
import App from "./App.jsx";


import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { ClerkProvider } from '@clerk/clerk-react'
const queryClient = new QueryClient();

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}
ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
   <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
   <BrowserRouter>
   <App />
 </BrowserRouter>
 </ClerkProvider>
  </QueryClientProvider>
);
