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
      data-oid="46uaynq"
    >
      <i
        className="fas fa-file-invoice-dollar text-xs absolute top-0 right-0 transition-all duration-300"
        data-oid="_88fy21"
      ></i>
      <i
        className="fas fa-clock text-xs absolute bottom-0 left-0 transition-all duration-300"
        data-oid="s2bqnnv"
      ></i>
      <i
        className="fas fa-dollar-sign text-base absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300"
        data-oid="qg5kz82"
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
        data-oid="x48-mzc"
      >
        {/* Background highlight with better gradient */}
        <div
          className={`absolute inset-0 rounded-xl transition-all duration-300 ${
            active
              ? "bg-gradient-to-tr from-cyan-900/30 to-blue-900/20 backdrop-blur-sm shadow-inner shadow-cyan-500/5"
              : "bg-transparent group-hover:bg-space-800/40 group-hover:backdrop-blur-sm"
          }`}
          data-oid="skky:3p"
        >
          {/* Interactive overlay to ensure clicks work */}
          <span
            className="absolute inset-0 w-full h-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
            data-component-name={label}
            data-oid="shjrt27"
          ></span>
        </div>

        {/* Custom glow effect */}
        {active && (
          <div
            className="absolute inset-0 -z-10 rounded-xl opacity-30 bg-cyan-500/10 blur-md"
            data-oid="c66iepu"
          ></div>
        )}

        {/* Icon container */}
        <div
          className={`relative transition-all duration-300 ${active ? "scale-110" : "group-hover:scale-110"}`}
          data-oid="k9d6ra_"
        >
          {customIcon ? (
            customIcon
          ) : (
            <i
              className={`fas fa-${icon} ${isMobile ? "text-lg" : "text-xl"} relative transition-all duration-300 ${
                active ? "animate-pulse" : "group-hover:animate-pulse-subtle"
              }`}
              data-oid="yejg2ki"
            ></i>
          )}

          {/* Ripple effect for active items */}
          {active && (
            <span
              className="absolute -inset-3 rounded-full bg-cyan-400/5 animate-ping-slow opacity-30"
              data-oid="9duz_ye"
            ></span>
          )}
        </div>

        {/* Label with better animation */}
        <span
          className={`${isMobile ? "text-[0.65rem]" : "text-xs"} font-medium mt-1 relative transition-all duration-300 group-hover:tracking-wide`}
          data-oid="az:y2xl"
        >
          {label}
        </span>

        {/* Active indicator bar */}
        <div
          className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 overflow-hidden h-0.5 transition-all duration-300
          group-hover:w-6 group-hover:bg-cyan-400/30
          ${active ? 'w-8 bg-cyan-400' : 'w-0'}"
          data-oid="60botnd"
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
      data-oid="9d-xbtv"
    >
      <div className="container mx-auto px-2" data-oid="ikl4isx">
        <div
          className="flex justify-around items-center overflow-x-auto md:overflow-visible px-1 py-0.5 scrollbar-hide"
          data-oid=".b52xoh"
        >
          {/* Dashboard link */}
          <NavItem path="/" icon="home" label="Dashboard" data-oid=".2xahf2" />

          {/* Finance link (Combined Invoices & Timesheets) */}
          <NavItem
            path={financePaths}
            label="Finance"
            customIcon={<FinanceIcon data-oid="j-245:v" />}
            data-oid="ct8hkjd"
          />

          {/* Other nav items */}
          <NavItem
            path="/calculators"
            icon="calculator"
            label="Calculators"
            data-oid="8a8kvlr"
          />

          <NavItem
            path="/resources"
            icon="book"
            label="Resources"
            data-oid="eqe9fvk"
          />

          {/* Jobs navigation - completely rebuilt as a hardcoded HTML anchor tag for maximum compatibility */}
          <a
            href="/jobs"
            className="jobs-nav-item group flex flex-col items-center px-3.5 py-2 relative transition-all duration-300
              cursor-pointer z-50 text-gray-400 hover:text-cyan-200"
            style={{ pointerEvents: "auto" }}
            onClick={() => (window.location.href = "/jobs")}
            data-oid="l-sc_uj"
          >
            <div
              className="absolute inset-0 rounded-xl transition-all duration-300 bg-transparent group-hover:bg-space-800/40 group-hover:backdrop-blur-sm pointer-events-none"
              data-oid="mx_m_pg"
            ></div>

            <div
              className="relative transition-all duration-300 group-hover:scale-110 pointer-events-none"
              data-oid="6sz9hie"
            >
              <i
                className="fas fa-briefcase text-xl relative transition-all duration-300 group-hover:animate-pulse-subtle"
                data-oid="r.y0852"
              ></i>
            </div>

            <span
              className="text-xs font-medium mt-1 relative transition-all duration-300 group-hover:tracking-wide pointer-events-none"
              data-oid="rgtj24."
            >
              Jobs
            </span>

            <div
              className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 overflow-hidden h-0.5 transition-all duration-300
              group-hover:w-6 group-hover:bg-cyan-400/30 w-0 pointer-events-none"
              data-oid="n48.30a"
            ></div>
          </a>

          {/* Direct HTML button alternative for Jobs as a failsafe */}
          <button
            type="button"
            onClick={() => (window.location.href = "/jobs")}
            className="jobs-fallback-btn fixed left-1/2 -translate-x-1/2 bottom-[120px] z-[9999] bg-gradient-to-r from-cyan-600 to-cyan-700 text-white px-4 py-2 rounded-full shadow-glow-md hover:shadow-glow-cyan transition-all duration-300 flex items-center gap-2 border border-cyan-500/30"
            style={{ display: "none" }}
            data-oid="s.t2tcq"
          >
            <i className="fas fa-briefcase" data-oid="k1bzjdq"></i>
            <span data-oid="p2wfakl">Go to Jobs</span>
          </button>

          {/* Help Manual */}
          <NavItem
            path="/help"
            icon="question-circle"
            label="Help"
            data-oid="z54vxd-"
          />

          {/* Only show Admin option for the str8 user */}
          {isAdmin && (
            <Link
              href="/admin"
              className="group flex flex-col items-center px-3.5 py-2 relative transition-all duration-300 text-cyan-300 scale-105 font-medium"
              data-oid="myfb9s_"
            >
              <div
                className="absolute inset-0 rounded-xl transition-all duration-300 bg-gradient-to-tr from-purple-900/50 to-cyan-900/30 backdrop-blur-sm shadow-inner shadow-cyan-500/20"
                data-oid="we0g021"
              ></div>
              <div
                className="absolute inset-0 -z-10 rounded-xl opacity-40 bg-cyan-500/20 blur-md"
                data-oid="ozgvza7"
              ></div>
              <div
                className="relative transition-all duration-300 scale-110"
                data-oid=":itq8ln"
              >
                <i
                  className="fas fa-shield-alt text-xl relative transition-all duration-300 animate-pulse"
                  data-oid="i84hwq9"
                ></i>
                <span
                  className="absolute -inset-3 rounded-full bg-cyan-400/10 animate-ping-slow opacity-50"
                  data-oid="q_bz7rn"
                ></span>
              </div>
              <span
                className="text-xs font-medium mt-1 relative transition-all duration-300 group-hover:tracking-wide"
                data-oid="1k8.psd"
              >
                Admin
              </span>
              <div
                className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 overflow-hidden h-0.5 transition-all duration-300 w-8 bg-cyan-400"
                data-oid="zz:7a36"
              ></div>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default BottomNav;
