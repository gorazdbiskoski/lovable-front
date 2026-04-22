import { Leaf } from "lucide-react";
import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

interface AuthFormPanelProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

/**
 * Inner content used by Login/Register pages. The outer AuthShell renders
 * the brand panel + a sliding container; pages just declare their form content.
 */
export const AuthFormPanel = ({ title, subtitle, children }: AuthFormPanelProps) => {
  return (
    <div className="w-full max-w-md space-y-8 animate-in fade-in duration-500">
      <div className="lg:hidden flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
          <Leaf size={20} className="text-primary-foreground" />
        </div>
        <span className="font-display font-bold text-xl">SmartDrop</span>
      </div>

      <div className="space-y-2">
        <h1 className="font-display font-bold text-3xl">{title}</h1>
        <p className="text-muted-foreground">{subtitle}</p>
      </div>

      {children}
    </div>
  );
};

const BrandPanel = () => (
  <>
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-lg bg-primary-foreground/15 backdrop-blur flex items-center justify-center">
        <Leaf size={22} />
      </div>
      <span className="font-display font-bold text-2xl">SmartDrop</span>
    </div>

    <div className="relative z-10 space-y-6 max-w-md">
      <h2 className="font-display font-bold text-4xl leading-tight">
        Grow smarter, water wiser.
      </h2>
      <p className="text-primary-foreground/80 text-lg leading-relaxed">
        AI-powered irrigation predictions tailored to your fields, weather and crops.
      </p>
      <div className="grid grid-cols-3 gap-4 pt-4">
        {[
          { v: "32%", l: "Less water" },
          { v: "+18%", l: "Yield boost" },
          { v: "24/7", l: "AI insights" },
        ].map((s) => (
          <div key={s.l} className="rounded-lg bg-primary-foreground/10 backdrop-blur p-3">
            <div className="font-display font-bold text-2xl">{s.v}</div>
            <div className="text-xs text-primary-foreground/70">{s.l}</div>
          </div>
        ))}
      </div>
    </div>

    <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-primary-foreground/10 blur-3xl pointer-events-none" />
    <div className="absolute top-12 right-12 w-40 h-40 rounded-full bg-primary-foreground/5 blur-2xl pointer-events-none" />

    <p className="text-sm text-primary-foreground/60 relative z-10">
      © {new Date().getFullYear()} SmartDrop Agriculture
    </p>
  </>
);

interface AuthShellProps {
  children: ReactNode;
}

/**
 * Persistent shell across /login and /register. The brand panel and form
 * panel swap sides with a smooth horizontal slide when the route changes.
 */
export const AuthShell = ({ children }: AuthShellProps) => {
  const location = useLocation();
  const isRegister = location.pathname.startsWith("/register");

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Mobile: stack form only, brand panel hidden */}
      <div className="lg:hidden min-h-screen flex items-center justify-center p-6">
        {children}
      </div>

      {/* Desktop: two panels that swap sides via transform */}
      <div className="hidden lg:block relative min-h-screen">
        {/* Brand panel — slides between left (login) and right (register) */}
        <div
          className={cn(
            "absolute inset-y-0 left-0 w-1/2 bg-primary text-primary-foreground p-12",
            "flex flex-col justify-between overflow-hidden",
            "transition-transform duration-700 ease-[cubic-bezier(0.65,0,0.35,1)] will-change-transform",
            isRegister ? "translate-x-full" : "translate-x-0",
          )}
        >
          <BrandPanel />
        </div>

        {/* Form panel — slides opposite direction */}
        <div
          className={cn(
            "absolute inset-y-0 left-0 w-1/2 flex items-center justify-center p-10",
            "transition-transform duration-700 ease-[cubic-bezier(0.65,0,0.35,1)] will-change-transform",
            isRegister ? "-translate-x-full" : "translate-x-full",
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

/**
 * Helper link used inside auth forms — uses replace navigation so the back
 * button does not bounce between login/register.
 */
export const AuthSwitchLink = ({ to, children }: { to: string; children: ReactNode }) => (
  <Link to={to} replace className="text-primary font-medium hover:underline">
    {children}
  </Link>
);
