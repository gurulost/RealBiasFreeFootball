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
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/rankings" component={Rankings} />
      <Route path="/bias-audit" component={BiasAudit} />
      <Route path="/methodology" component={Methodology} />
      <Route path="/conference-analysis" component={ConferenceAnalysis} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-neutral-50">
          <Navbar />
          <BiasAlert />
          <Router />
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
