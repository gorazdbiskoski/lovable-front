import { Leaf } from "lucide-react";
import { ReactNode } from "react";

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

export const AuthLayout = ({ title, subtitle, children }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-background">
      {/* Brand panel */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-primary text-primary-foreground p-12 flex-col justify-between">
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

        {/* Decorative blobs */}
        <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-primary-foreground/10 blur-3xl" />
        <div className="absolute top-12 right-12 w-40 h-40 rounded-full bg-primary-foreground/5 blur-2xl" />

        <p className="text-sm text-primary-foreground/60 relative z-10">
          © {new Date().getFullYear()} SmartDrop Agriculture
        </p>
      </div>

      {/* Form panel */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-md space-y-8">
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
      </div>
    </div>
  );
};
