import React from "react";
// Fix for timesheet entries not appearing
import "@/lib/fixTimeEntries";
import { useState, useEffect } from "react";
import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppLayout } from "@/layouts/AppLayout";
import Dashboard from "@/pages/Dashboard";
import Tools from "@/pages/Tools";
import Calculators from "@/pages/Calculators";
import Resources from "@/pages/Resources";
import Jobs from "@/pages/Jobs";
import InvoicesPage from "@/pages/InvoicesPage";
import TimesheetPage from "@/pages/TimesheetPage";
import TestTimesheetEntry from "@/pages/TestTimesheetEntry";
import CombinedPage from "@/pages/CombinedPage";
import Admin from "@/pages/Admin";
import Help from "@/pages/Help";
import LoaderDemo from "@/pages/LoaderDemo";
import NotFound from "@/pages/not-found";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import IconExample from "@/components/examples/IconExample";
import FontIconExample from "@/components/examples/FontIconExample";
import GlassCardExample from "@/components/examples/GlassCardExample";
import { AuthProvider, useAuth } from "@/hooks/useAuth";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

function App() {
  // Set session storage flag to prevent initial loader from appearing
  // and ensure all welcome popups are permanently disabled
  useEffect(() => {
    try {
      // Immediately disable all welcome screens, popups, and tutorials
      sessionStorage.setItem("hasVisitedSTR8BUILD", "true");
      sessionStorage.setItem("dashboardLoaded", "true");
      localStorage.setItem("str8build_welcome_completed", "true");
      localStorage.setItem("str8build_tutorial_completed", "true");
      localStorage.setItem("str8build_popup_disabled", "true");
      localStorage.setItem("str8build_all_modals_disabled", "true");

      // Ensure these settings persist by checking and setting them on every app load
      const disableAllPopups = () => {
        sessionStorage.setItem("hasVisitedSTR8BUILD", "true");
        sessionStorage.setItem("dashboardLoaded", "true");
        localStorage.setItem("str8build_welcome_completed", "true");
        localStorage.setItem("str8build_tutorial_completed", "true");
      };

      // Run this check periodically to ensure popups never appear
      const intervalId = setInterval(disableAllPopups, 5000);

      // Clean up interval on component unmount
      return () => clearInterval(intervalId);
    } catch (e) {
      console.error("Error accessing storage:", e);
    }
  }, []);

  // Define Router inside App to ensure it has access to AuthProvider
  const Router = () => {
    const [location] = useLocation();
    const { isAuthenticated } = useAuth();

    // Check if current route is login or register
    const isAuthPage = location === "/login" || location === "/register";

    // Robust authentication check - only rely on the auth context
    const isLoggedIn = isAuthenticated;

    // Ultra-simplified redirection logic
    if (!isLoggedIn && !isAuthPage) {
      window.location.href = "/login";
      return null;
    }

    if (isLoggedIn && isAuthPage) {
      window.location.href = "/";
      return null;
    }

    // Pages that don't require the app layout (login, register)
    if (isAuthPage) {
      return (
        <Switch data-oid="kavbzrw">
          <Route path="/login" component={Login} data-oid="7zms2vp" />
          <Route path="/register" component={Register} data-oid="hu8p694" />
        </Switch>
      );
    }

    // Main app with protected routes
    return (
      <AppLayout data-oid="00ywz6o">
        <Switch data-oid="9ypn4vd">
          <Route path="/" data-oid="yyy3jzl">
            <ProtectedRoute data-oid="6vk3c-0">
              <Dashboard data-oid="_w7k8jt" />
            </ProtectedRoute>
          </Route>
          <Route path="/tools" data-oid="lcrgzhg">
            <ProtectedRoute data-oid="mscvqu:">
              <Tools data-oid="h-ngebp" />
            </ProtectedRoute>
          </Route>
          <Route path="/calculators" data-oid="ci4bl4_">
            <ProtectedRoute data-oid="t09tigy">
              <Calculators data-oid="ztc_4wp" />
            </ProtectedRoute>
          </Route>
          <Route path="/resources" data-oid="qe2oi44">
            <ProtectedRoute data-oid="nnwujs8">
              <Resources data-oid="42ooe:k" />
            </ProtectedRoute>
          </Route>
          <Route path="/jobs" data-oid="97b-0k0">
            <ProtectedRoute data-oid="25k-al5">
              <Jobs data-oid="5ie-9mp" />
            </ProtectedRoute>
          </Route>
          <Route path="/invoices" data-oid="vz3xp5m">
            <ProtectedRoute data-oid="2ulc:72">
              <InvoicesPage data-oid="m9l9yop" />
            </ProtectedRoute>
          </Route>
          <Route path="/timesheet" data-oid="wbhv38y">
            <ProtectedRoute data-oid="cq2uv7r">
              <TimesheetPage data-oid="smh:hh-" />
            </ProtectedRoute>
          </Route>
          <Route path="/test-timesheet" data-oid="avrj.aa">
            <ProtectedRoute data-oid="agcd3x1">
              <TestTimesheetEntry data-oid="2u5wkv-" />
            </ProtectedRoute>
          </Route>
          <Route path="/combined" data-oid="567duud">
            <ProtectedRoute data-oid="6x:1zra">
              <CombinedPage data-oid="lnldrjo" />
            </ProtectedRoute>
          </Route>
          <Route path="/admin" data-oid="246o.zx">
            <ProtectedRoute data-oid="d756jo2">
              <Admin data-oid="ym38xm." />
            </ProtectedRoute>
          </Route>
          <Route path="/help" data-oid="m4fe725">
            <ProtectedRoute data-oid="3htgmfh">
              <Help data-oid="900kmy-" />
            </ProtectedRoute>
          </Route>
          <Route path="/loader-demo" data-oid="4r3.eox">
            <ProtectedRoute data-oid="6wi64_x">
              <LoaderDemo data-oid="6.mnul." />
            </ProtectedRoute>
          </Route>
          <Route path="/icon-example" data-oid="zsh_9o9">
            <ProtectedRoute data-oid="q2qa34.">
              <IconExample data-oid="h7:-sks" />
            </ProtectedRoute>
          </Route>
          <Route path="/font-icon-example" data-oid="u:9n4gf">
            <ProtectedRoute data-oid="qb:7fcz">
              <FontIconExample data-oid="w2qw.p9" />
            </ProtectedRoute>
          </Route>
          <Route path="/glass-card-example" data-oid="uq944xp">
            <ProtectedRoute data-oid="4gl6swn">
              <GlassCardExample data-oid="0nkhq6h" />
            </ProtectedRoute>
          </Route>
          <Route data-oid="4si9o75">
            <ProtectedRoute data-oid="4pny:rn">
              <NotFound data-oid=":vd9_wl" />
            </ProtectedRoute>
          </Route>
        </Switch>
      </AppLayout>
    );
  };

  return (
    <QueryClientProvider client={queryClient} data-oid="jkqpjwb">
      <AuthProvider data-oid=":m:foz9">
        <TooltipProvider data-oid="r0ur39e">
          <Toaster data-oid="bors19_" />
          <Router data-oid="shpi2kh" />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
