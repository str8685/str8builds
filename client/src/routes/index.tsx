import { FC, lazy, Suspense } from "react";
import { Route, Switch } from "wouter";
import { useAuth } from "@/hooks/useAuth";

// Loader component with the space/cyan theme
import LogoLoader from "@/components/LogoLoader";

// Lazy-loaded components for better code splitting
const Login = lazy(() => import("@/pages/Login"));
const Register = lazy(() => import("@/pages/Register"));
const Dashboard = lazy(() => import("@/pages/Dashboard"));
const Projects = lazy(() => import("@/pages/Projects"));
const Clients = lazy(() => import("@/pages/Clients"));
const Timer = lazy(() => import("@/pages/Timer"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const Settings = lazy(() => import("@/pages/Settings"));

// Professional loading component with space/cyan theme
const PageLoader: FC = () => (
  <div
    className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 to-slate-800"
    data-oid="uobg:jk"
  >
    <div className="relative" data-oid="06sgk0w">
      {/* Animated background elements - matches space theme */}
      <div
        className="absolute inset-0 -z-10 overflow-hidden opacity-30"
        data-oid="3xs.:56"
      >
        <div className="star-small" data-oid="i817cwn"></div>
        <div className="star-medium" data-oid="i6l1k0j"></div>
        <div className="star-large" data-oid="tzng_m6"></div>
      </div>

      {/* Glow effect with pulse animation */}
      <div
        className="absolute -inset-10 bg-cyan-500/20 rounded-full blur-3xl opacity-70 animate-pulse"
        data-oid="nss4gtv"
      ></div>

      <LogoLoader data-oid="oobx.7v" />
    </div>
  </div>
);

// Protected route component
interface ProtectedRouteProps {
  component: FC;
  path: string;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({
  component: Component,
  path,
}) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <PageLoader data-oid="umjs0ln" />;
  }

  return (
    <Route
      path={path}
      component={() =>
        user ? <Component data-oid="p-o0z09" /> : <Login data-oid="a5bsl60" />
      }
      data-oid="zpwtef."
    />
  );
};

// Main routing component with preloading hints
const AppRoutes: FC = () => {
  // Preload critical routes on idle time
  const preloadCriticalRoutes = () => {
    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      (window as any).requestIdleCallback(() => {
        // Preload dashboard in background for faster transitions
        import("@/pages/Dashboard");
        import("@/pages/Projects");
      });
    }
  };

  // Start preloading after component mounts
  import("react").then(({ useEffect }) => {
    useEffect(() => {
      preloadCriticalRoutes();
    }, []);
  });

  return (
    <Suspense fallback={<PageLoader data-oid="825a_zw" />} data-oid="yuno-yy">
      <Switch data-oid="817d.74">
        <Route path="/login" component={Login} data-oid="htbz:sp" />
        <Route path="/register" component={Register} data-oid="hsptbcw" />

        <ProtectedRoute path="/" component={Dashboard} data-oid="ed8acar" />
        <ProtectedRoute
          path="/dashboard"
          component={Dashboard}
          data-oid="6bubkdi"
        />

        <ProtectedRoute
          path="/projects"
          component={Projects}
          data-oid="6q2jnl9"
        />

        <ProtectedRoute
          path="/clients"
          component={Clients}
          data-oid="coz7zm4"
        />

        <ProtectedRoute path="/timer" component={Timer} data-oid="l5bgyhn" />
        <ProtectedRoute
          path="/settings"
          component={Settings}
          data-oid="igf.kwq"
        />

        <Route component={NotFound} data-oid="q-kf--a" />
      </Switch>
    </Suspense>
  );
};

export default AppRoutes;
