import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [location] = useLocation();

  const navItems = [
    { href: "/", label: "Live Rankings", isActive: location === "/" },
    { href: "/rankings", label: "Rankings", isActive: location === "/rankings" },
    { href: "/bias-audit", label: "Bias Audit", isActive: location === "/bias-audit" },
    { href: "/methodology", label: "Methodology", isActive: location === "/methodology" },
  ];

  return (
    <header className="bg-white border-b border-neutral-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">CFB</span>
              </div>
              <div>
                <h1 className="text-lg font-bold text-neutral-900">Bias-Free Rankings</h1>
                <p className="text-xs text-neutral-600">Two-Layer PageRank System</p>
              </div>
            </Link>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "pb-4 font-medium transition-colors",
                  item.isActive
                    ? "text-primary-600 border-b-2 border-primary-600"
                    : "text-neutral-600 hover:text-neutral-900"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-600 rounded-full"></div>
              <span className="text-sm text-neutral-600">System Operational</span>
            </div>
            <div className="text-sm text-neutral-500">
              Last Update: <span className="font-mono">Nov 12, 2024 03:00 ET</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
