import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./components/Auth/AuthContext.jsx";
// import { AuthProvider } from './context/AuthContext';
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
  
      <BrowserRouter>
      <AuthProvider>
      <App />
    </AuthProvider>
      </BrowserRouter>

  </QueryClientProvider>
);
