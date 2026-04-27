import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import AppLayout from "./components/AppLayout";
import Index from "./pages/Index.tsx";
import FieldDetail from "./pages/FieldDetail.tsx";
import FarmDetail from "./pages/FarmDetail.tsx";
import Farms from "./pages/Farms.tsx";
import Fields from "./pages/Fields.tsx";
import Predictions from "./pages/Predictions.tsx";
import Alerts from "./pages/Alerts.tsx";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<Index />} />
            <Route path="/farms" element={<Farms />} />
            <Route path="/fields" element={<Fields />} />
            <Route path="/predictions" element={<Predictions />} />
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/farm/:farmId" element={<FarmDetail />} />
            <Route path="/field/:fieldId" element={<FieldDetail />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
