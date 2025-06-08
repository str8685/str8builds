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
        <Switch data-oid="y4f83c-">
          <Route path="/login" component={Login} data-oid="_q61a27" />
          <Route path="/register" component={Register} data-oid="m9dwmm7" />
        </Switch>
      );
    }

    // Main app with protected routes
    return (
      <AppLayout data-oid="i5rpa4x">
        <Switch data-oid="yrszumj">
          <Route path="/" data-oid="kmkr:9d">
            <ProtectedRoute data-oid="nefm7pw">
              <Dashboard data-oid="axrx0o8" />
            </ProtectedRoute>
          </Route>
          <Route path="/tools" data-oid=":vyp661">
            <ProtectedRoute data-oid="t3-:_zc">
              <Tools data-oid="pm0yhi5" />
            </ProtectedRoute>
          </Route>
          <Route path="/calculators" data-oid="sg0pctj">
            <ProtectedRoute data-oid="3alphnk">
              <Calculators data-oid=":5gco._" />
            </ProtectedRoute>
          </Route>
          <Route path="/resources" data-oid="vhdbcu5">
            <ProtectedRoute data-oid=":sxsy4.">
              <Resources data-oid="tpnz-wa" />
            </ProtectedRoute>
          </Route>
          <Route path="/jobs" data-oid="_ymsqkc">
            <ProtectedRoute data-oid="672vamg">
              <Jobs data-oid="3u61z07" />
            </ProtectedRoute>
          </Route>
          <Route path="/invoices" data-oid="tcibfkm">
            <ProtectedRoute data-oid="x_vlj:6">
              <InvoicesPage data-oid="to2lsy2" />
            </ProtectedRoute>
          </Route>
          <Route path="/timesheet" data-oid="_88d.xx">
            <ProtectedRoute data-oid="trhx8ko">
              <TimesheetPage data-oid="x37hkiy" />
            </ProtectedRoute>
          </Route>
          <Route path="/test-timesheet" data-oid="19m0qo2">
            <ProtectedRoute data-oid="co1svi1">
              <TestTimesheetEntry data-oid="-6_egre" />
            </ProtectedRoute>
          </Route>
          <Route path="/combined" data-oid="ntq_48d">
            <ProtectedRoute data-oid="6f.ui6s">
              <CombinedPage data-oid="1v6s-_c" />
            </ProtectedRoute>
          </Route>
          <Route path="/admin" data-oid="6zh79r0">
            <ProtectedRoute data-oid="hxh54-4">
              <Admin data-oid="5.cy722" />
            </ProtectedRoute>
          </Route>
          <Route path="/help" data-oid="-gei-rj">
            <ProtectedRoute data-oid="fy4jo0v">
              <Help data-oid="7ds9muj" />
            </ProtectedRoute>
          </Route>
          <Route path="/loader-demo" data-oid="fvx3yyb">
            <ProtectedRoute data-oid="ef8ktai">
              <LoaderDemo data-oid="jtcwb_v" />
            </ProtectedRoute>
          </Route>
          <Route path="/icon-example" data-oid="asqbhzk">
            <ProtectedRoute data-oid="8cwv.c5">
              <IconExample data-oid="w7u9_3b" />
            </ProtectedRoute>
          </Route>
          <Route path="/font-icon-example" data-oid="lohkupp">
            <ProtectedRoute data-oid="vus3j2k">
              <FontIconExample data-oid="7vs.a-k" />
            </ProtectedRoute>
          </Route>
          <Route path="/glass-card-example" data-oid="tia683_">
            <ProtectedRoute data-oid="ahvv:0c">
              <GlassCardExample data-oid="o5gj.mi" />
            </ProtectedRoute>
          </Route>
          <Route data-oid="cqr5hp4">
            <ProtectedRoute data-oid="mbsmqqr">
              <NotFound data-oid=".6rn2wg" />
            </ProtectedRoute>
          </Route>
        </Switch>
      </AppLayout>
    );
  };

  return (
    <QueryClientProvider client={queryClient} data-oid="ma4_9mn">
      <AuthProvider data-oid="w-v.xb.">
        <TooltipProvider data-oid="r3d6j83">
          <Toaster data-oid="7djkaa." />
          <Router data-oid="gm4gof3" />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
