import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navbar } from "@/components/navbar";
import { BiasAlert } from "@/components/bias-alert";
import Home from "@/pages/home";
import Rankings from "@/pages/rankings";
import BiasAudit from "@/pages/bias-audit";
import Methodology from "@/pages/methodology";
import ConferenceAnalysis from "@/pages/conference-analysis";
import Transparency from "@/pages/transparency";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/rankings" component={Rankings} />
      <Route path="/bias-audit" component={BiasAudit} />
      <Route path="/methodology" component={Methodology} />
      <Route path="/conference-analysis" component={ConferenceAnalysis} />
      <Route path="/transparency" component={Transparency} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/10 animate-fade-in">
          <Navbar />
          <BiasAlert />
          <div className="relative">
            <Router />
          </div>
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
