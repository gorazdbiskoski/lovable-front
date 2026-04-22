import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Outlet, Route, Routes, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import FieldDetail from "./pages/FieldDetail.tsx";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import NotFound from "./pages/NotFound.tsx";
import { AuthShell } from "./components/AuthLayout";

const queryClient = new QueryClient();

/**
 * Persistent shell across /login and /register so the slide animation between
 * them runs without unmounting the panels. We re-key the inner Outlet by
 * pathname so the form content fades in fresh on each route change.
 */
const AuthLayoutRoute = () => {
  const location = useLocation();
  return (
    <AuthShell>
      <div key={location.pathname} className="w-full flex justify-center">
        <Outlet />
      </div>
    </AuthShell>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<AuthLayoutRoute />}>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
          <Route path="/dashboard" element={<Index />} />
          <Route path="/field/:fieldId" element={<FieldDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
