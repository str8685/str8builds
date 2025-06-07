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
    data-oid="x:5ghgf"
  >
    <div className="relative" data-oid="99tn_cv">
      {/* Animated background elements - matches space theme */}
      <div
        className="absolute inset-0 -z-10 overflow-hidden opacity-30"
        data-oid="rq8zq3z"
      >
        <div className="star-small" data-oid="xng5pie"></div>
        <div className="star-medium" data-oid="ec0lrz6"></div>
        <div className="star-large" data-oid="l1imcso"></div>
      </div>

      {/* Glow effect with pulse animation */}
      <div
        className="absolute -inset-10 bg-cyan-500/20 rounded-full blur-3xl opacity-70 animate-pulse"
        data-oid="fjx:td9"
      ></div>

      <LogoLoader data-oid="yxkmxsx" />
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
    return <PageLoader data-oid="4ztje0s" />;
  }

  return (
    <Route
      path={path}
      component={() =>
        user ? <Component data-oid="lyh534f" /> : <Login data-oid="v9d-s6o" />
      }
      data-oid="g4ryq0w"
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
    <Suspense fallback={<PageLoader data-oid="f7m.wr:" />} data-oid="o-r9xmc">
      <Switch data-oid="p9508s_">
        <Route path="/login" component={Login} data-oid="qffc_5u" />
        <Route path="/register" component={Register} data-oid="_1x89g." />

        <ProtectedRoute path="/" component={Dashboard} data-oid="w7:-jxp" />
        <ProtectedRoute
          path="/dashboard"
          component={Dashboard}
          data-oid="4mg.da3"
        />

        <ProtectedRoute
          path="/projects"
          component={Projects}
          data-oid="4eps_8n"
        />

        <ProtectedRoute
          path="/clients"
          component={Clients}
          data-oid="e601xl0"
        />

        <ProtectedRoute path="/timer" component={Timer} data-oid="o9hctwj" />
        <ProtectedRoute
          path="/settings"
          component={Settings}
          data-oid="2wtekgx"
        />

        <Route component={NotFound} data-oid="1k6axpw" />
      </Switch>
    </Suspense>
  );
};

export default AppRoutes;
