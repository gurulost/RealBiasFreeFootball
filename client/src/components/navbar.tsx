import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { TrendingUp, Activity, BarChart3, Shield, BookOpen, Eye } from "lucide-react";

export function Navbar() {
  const [location] = useLocation();

  const navItems = [
    { href: "/", label: "Live Rankings", icon: TrendingUp, isActive: location === "/" },
    { href: "/rankings", label: "Rankings", icon: BarChart3, isActive: location === "/rankings" },
    { href: "/conference-analysis", label: "Conference Analysis", icon: Activity, isActive: location === "/conference-analysis" },
    { href: "/bias-audit", label: "Bias Audit", icon: Shield, isActive: location === "/bias-audit" },
    { href: "/methodology", label: "Methodology", icon: BookOpen, isActive: location === "/methodology" },
    { href: "/transparency", label: "Transparency", icon: Eye, isActive: location === "/transparency" },
  ];

  return (
    <header className="bg-card/95 backdrop-blur-lg border-b border-border sticky top-0 z-50 shadow-2xl shadow-black/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-amber-500 rounded-lg flex items-center justify-center shadow-2xl group-hover:scale-105 transition-all duration-200 border border-primary/20">
                <span className="text-primary-foreground font-display font-bold text-sm">CFB</span>
              </div>
              <div>
                <h1 className="text-xl font-display font-bold text-foreground tracking-wider">BIAS-FREE RANKINGS</h1>
                <p className="text-xs text-muted-foreground font-body font-medium tracking-wide">TWO-LAYER PAGERANK SYSTEM</p>
              </div>
            </Link>
          </div>
          
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center space-x-2 px-4 py-2 rounded-lg font-body font-medium transition-all duration-200",
                    item.isActive
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 px-3 py-1.5 bg-success/20 rounded-full border border-success/30">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <span className="text-sm text-success font-body font-medium">LIVE</span>
            </div>
            <div className="text-sm text-muted-foreground">
              <span className="font-numeric bg-secondary/50 px-3 py-1.5 rounded-lg border border-border/50">2024 SEASON FINAL</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
