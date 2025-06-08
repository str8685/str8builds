import { FC, useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "../hooks/useAuth";
import { useIsMobile } from "../hooks/use-mobile";

const BottomNav: FC = () => {
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const { user } = useAuth();

  // Only show admin panel for the str8 user account
  const isAdmin = user && (user as any)?.username === "str8";

  // Effect for detecting scroll position
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Helper function to check if a path is active
  const isActive = (path: string | string[]) => {
    if (Array.isArray(path)) {
      return path.some((p) => location === p);
    }
    return location === path;
  };

  // Finance paths
  const financePaths = ["/combined", "/invoices", "/timesheet"];

  // Finance icon has a stacked icon effect to show both invoice and timesheet
  const FinanceIcon = () => (
    <div
      className="relative w-7 h-7 flex items-center justify-center transition-transform duration-300"
      data-oid="fx55q90"
    >
      <i
        className="fas fa-file-invoice-dollar text-xs absolute top-0 right-0 transition-all duration-300"
        data-oid="af584of"
      ></i>
      <i
        className="fas fa-clock text-xs absolute bottom-0 left-0 transition-all duration-300"
        data-oid="n16m_5d"
      ></i>
      <i
        className="fas fa-dollar-sign text-base absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300"
        data-oid="5.at0p1"
      ></i>
    </div>
  );

  // A more sophisticated nav item component with consistent styling
  const NavItem = ({
    path,
    icon,
    label,
    customIcon,
  }: {
    path: string | string[];
    icon?: string;
    label: string;
    customIcon?: React.ReactNode;
  }) => {
    const active = isActive(path);
    const pathStr = Array.isArray(path) ? path[0] : path;
    const isMobile = useIsMobile();

    return (
      <Link
        href={pathStr}
        className={`group flex flex-col items-center ${isMobile ? "px-2.5" : "px-3.5"} py-2 relative transition-all duration-300
          ${
            active
              ? "text-cyan-300 scale-105 font-medium"
              : "text-gray-400 hover:text-cyan-200"
          }`}
        data-oid="d67:bda"
      >
        {/* Background highlight with better gradient */}
        <div
          className={`absolute inset-0 rounded-xl transition-all duration-300 ${
            active
              ? "bg-gradient-to-tr from-cyan-900/30 to-blue-900/20 backdrop-blur-sm shadow-inner shadow-cyan-500/5"
              : "bg-transparent group-hover:bg-space-800/40 group-hover:backdrop-blur-sm"
          }`}
          data-oid="y.3o8v_"
        >
          {/* Interactive overlay to ensure clicks work */}
          <span
            className="absolute inset-0 w-full h-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
            data-component-name={label}
            data-oid="eei8hxi"
          ></span>
        </div>

        {/* Custom glow effect */}
        {active && (
          <div
            className="absolute inset-0 -z-10 rounded-xl opacity-30 bg-cyan-500/10 blur-md"
            data-oid="2tnkkfa"
          ></div>
        )}

        {/* Icon container */}
        <div
          className={`relative transition-all duration-300 ${active ? "scale-110" : "group-hover:scale-110"}`}
          data-oid="7a1z-x5"
        >
          {customIcon ? (
            customIcon
          ) : (
            <i
              className={`fas fa-${icon} ${isMobile ? "text-lg" : "text-xl"} relative transition-all duration-300 ${
                active ? "animate-pulse" : "group-hover:animate-pulse-subtle"
              }`}
              data-oid="k8-lmqe"
            ></i>
          )}

          {/* Ripple effect for active items */}
          {active && (
            <span
              className="absolute -inset-3 rounded-full bg-cyan-400/5 animate-ping-slow opacity-30"
              data-oid="7qqlw0n"
            ></span>
          )}
        </div>

        {/* Label with better animation */}
        <span
          className={`${isMobile ? "text-[0.65rem]" : "text-xs"} font-medium mt-1 relative transition-all duration-300 group-hover:tracking-wide`}
          data-oid="v6tj2dc"
        >
          {label}
        </span>

        {/* Active indicator bar */}
        <div
          className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 overflow-hidden h-0.5 transition-all duration-300
          group-hover:w-6 group-hover:bg-cyan-400/30
          ${active ? 'w-8 bg-cyan-400' : 'w-0'}"
          data-oid="z:4kami"
        ></div>
      </Link>
    );
  };

  return (
    <nav
      className={`fixed bottom-0 left-0 right-0 bg-opacity-80 border-t backdrop-blur-lg py-1.5 z-50 transition-all duration-500 
        ${
          scrolled
            ? "bg-space-950 border-cyan-900/20 shadow-[0_-5px_25px_rgba(0,210,255,0.07)]"
            : "bg-space-900/95 border-cyan-900/10 shadow-lg"
        }`}
      data-component-name="BottomNav"
      data-oid="fjb4w.:"
    >
      <div className="container mx-auto px-2" data-oid="0g5k:_6">
        <div
          className="flex justify-around items-center overflow-x-auto md:overflow-visible px-1 py-0.5 scrollbar-hide"
          data-oid="jqfalg8"
        >
          {/* Dashboard link */}
          <NavItem path="/" icon="home" label="Dashboard" data-oid="x5tfj:m" />

          {/* Finance link (Combined Invoices & Timesheets) */}
          <NavItem
            path={financePaths}
            label="Finance"
            customIcon={<FinanceIcon data-oid="x86_01h" />}
            data-oid="xqyuslf"
          />

          {/* Other nav items */}
          <NavItem
            path="/calculators"
            icon="calculator"
            label="Calculators"
            data-oid="t0t3aki"
          />

          <NavItem
            path="/resources"
            icon="book"
            label="Resources"
            data-oid="g0h9mqr"
          />

          {/* Jobs navigation - completely rebuilt as a hardcoded HTML anchor tag for maximum compatibility */}
          <a
            href="/jobs"
            className="jobs-nav-item group flex flex-col items-center px-3.5 py-2 relative transition-all duration-300
              cursor-pointer z-50 text-gray-400 hover:text-cyan-200"
            style={{ pointerEvents: "auto" }}
            onClick={() => (window.location.href = "/jobs")}
            data-oid="lfxrdsv"
          >
            <div
              className="absolute inset-0 rounded-xl transition-all duration-300 bg-transparent group-hover:bg-space-800/40 group-hover:backdrop-blur-sm pointer-events-none"
              data-oid="bku-9ns"
            ></div>

            <div
              className="relative transition-all duration-300 group-hover:scale-110 pointer-events-none"
              data-oid=".wqv.cp"
            >
              <i
                className="fas fa-briefcase text-xl relative transition-all duration-300 group-hover:animate-pulse-subtle"
                data-oid="y0.a0ua"
              ></i>
            </div>

            <span
              className="text-xs font-medium mt-1 relative transition-all duration-300 group-hover:tracking-wide pointer-events-none"
              data-oid="s0ce5te"
            >
              Jobs
            </span>

            <div
              className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 overflow-hidden h-0.5 transition-all duration-300
              group-hover:w-6 group-hover:bg-cyan-400/30 w-0 pointer-events-none"
              data-oid="kv:6wzg"
            ></div>
          </a>

          {/* Direct HTML button alternative for Jobs as a failsafe */}
          <button
            type="button"
            onClick={() => (window.location.href = "/jobs")}
            className="jobs-fallback-btn fixed left-1/2 -translate-x-1/2 bottom-[120px] z-[9999] bg-gradient-to-r from-cyan-600 to-cyan-700 text-white px-4 py-2 rounded-full shadow-glow-md hover:shadow-glow-cyan transition-all duration-300 flex items-center gap-2 border border-cyan-500/30"
            style={{ display: "none" }}
            data-oid="onn_iwf"
          >
            <i className="fas fa-briefcase" data-oid="ik12601"></i>
            <span data-oid="8:gwdph">Go to Jobs</span>
          </button>

          {/* Help Manual */}
          <NavItem
            path="/help"
            icon="question-circle"
            label="Help"
            data-oid="arp9bkz"
          />

          {/* Only show Admin option for the str8 user */}
          {isAdmin && (
            <Link
              href="/admin"
              className="group flex flex-col items-center px-3.5 py-2 relative transition-all duration-300 text-cyan-300 scale-105 font-medium"
              data-oid="21r:lgx"
            >
              <div
                className="absolute inset-0 rounded-xl transition-all duration-300 bg-gradient-to-tr from-purple-900/50 to-cyan-900/30 backdrop-blur-sm shadow-inner shadow-cyan-500/20"
                data-oid="n1gso:c"
              ></div>
              <div
                className="absolute inset-0 -z-10 rounded-xl opacity-40 bg-cyan-500/20 blur-md"
                data-oid="_c90ml:"
              ></div>
              <div
                className="relative transition-all duration-300 scale-110"
                data-oid="p:nqyqp"
              >
                <i
                  className="fas fa-shield-alt text-xl relative transition-all duration-300 animate-pulse"
                  data-oid="1k1eczh"
                ></i>
                <span
                  className="absolute -inset-3 rounded-full bg-cyan-400/10 animate-ping-slow opacity-50"
                  data-oid="::xql7t"
                ></span>
              </div>
              <span
                className="text-xs font-medium mt-1 relative transition-all duration-300 group-hover:tracking-wide"
                data-oid="pr8uvtt"
              >
                Admin
              </span>
              <div
                className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 overflow-hidden h-0.5 transition-all duration-300 w-8 bg-cyan-400"
                data-oid="jo2pkm9"
              ></div>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default BottomNav;
