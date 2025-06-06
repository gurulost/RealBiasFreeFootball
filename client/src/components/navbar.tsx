import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { TrendingUp, Activity, BarChart3, Shield, BookOpen } from "lucide-react";

export function Navbar() {
  const [location] = useLocation();

  const navItems = [
    { href: "/", label: "Live Rankings", icon: TrendingUp, isActive: location === "/" },
    { href: "/rankings", label: "Rankings", icon: BarChart3, isActive: location === "/rankings" },
    { href: "/conference-analysis", label: "Conference Analysis", icon: Activity, isActive: location === "/conference-analysis" },
    { href: "/bias-audit", label: "Bias Audit", icon: Shield, isActive: location === "/bias-audit" },
    { href: "/methodology", label: "Methodology", icon: BookOpen, isActive: location === "/methodology" },
  ];

  return (
    <header className="bg-white/80 backdrop-blur-lg border-b border-border sticky top-0 z-50 shadow-elegant">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-200">
                <span className="text-white font-bold text-sm">CFB</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground tracking-tight">Bias-Free Rankings</h1>
                <p className="text-xs text-muted-foreground font-medium">Two-Layer PageRank System</p>
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
                    "flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200",
                    item.isActive
                      ? "bg-primary text-primary-foreground shadow-elegant"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 px-3 py-1.5 bg-green-50 rounded-full border border-green-200">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-green-700 font-medium">Live</span>
            </div>
            <div className="text-sm text-muted-foreground">
              <span className="font-mono bg-muted px-2 py-1 rounded">2024 Season Final</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
