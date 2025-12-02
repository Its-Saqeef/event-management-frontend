import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Explore from "@/pages/explore";
import EventDetails from "@/pages/event-details";
import Login from "@/pages/login";
import Register from "@/pages/register";
import Dashboard from "@/pages/dashboard";
import Organizer from "@/pages/organizer";
import Checkout from "@/pages/checkout";
import { AuthProvider } from "./components/Auth/AuthContext";
import { ProtectedRoute } from "../src/components/Auth/ProtectedRoute";
import { PublicRoute } from "../src/components/Auth/PublicRoute";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/explore" component={Explore} />
      <Route path="/event/:slug" component={EventDetails} />
      <Route path="/login">
        <PublicRoute>
          <Login />
        </PublicRoute>
      </Route>
      <Route path="/register">
        <PublicRoute>
          <Register />
        </PublicRoute>
      </Route>
      <Route path="/dashboard">
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      </Route>
      <Route path="/organizer">
        <ProtectedRoute>
          <Organizer />
        </ProtectedRoute>
      </Route>
      <Route path="/checkout/:slug">
        <ProtectedRoute>
          <Checkout/>
        </ProtectedRoute>
      </Route>
      <Route path="/organize">
        <ProtectedRoute>
          <Organizer/>
        </ProtectedRoute>
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <Router />
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
