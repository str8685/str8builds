import { FC, useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import GlassCard from "@/components/ui/GlassCard";
import JobTimer from "@/components/dashboard/JobTimer";
import JobInsights from "@/components/dashboard/JobInsights";
import WeatherImpactor from "@/components/dashboard/WeatherImpactor";
import ActiveProjects from "@/components/dashboard/ActiveProjects";
import PendingInvoices from "@/components/dashboard/PendingInvoices";
import WeatherWidget from "@/components/dashboard/WeatherWidget";
import ResourcesWidget from "@/components/dashboard/ResourcesWidget";
import ToolsWidget from "@/components/dashboard/ToolsWidget";
import SupplierLocator from "@/components/dashboard/SupplierLocator";
import RecentTimeEntries from "@/components/dashboard/RecentTimeEntries";
import JobsQuickAccess from "@/components/dashboard/JobsQuickAccess";
import CardEditControl from "@/components/dashboard/CardEditControl";
import AddWidgetDialog from "@/components/dashboard/AddWidgetDialog";
import LogoLoader from "@/components/LogoLoader";
import str8BuildLogo from "@/assets/str8-build-logo.png";
import ApiTest from "@/components/ApiTest";

// Card type definition
interface DashboardCard {
  id: string;
  title: string;
  enabled: boolean;
  component: React.ReactNode;
  size: "small" | "medium" | "large" | "full";
}

const Dashboard: FC = () => {
  // Get user information
  const { user } = useAuth();

  // Loading state - optimized for faster initial render
  const [isLoading, setIsLoading] = useState(false); // Start with false to skip loading screen

  // Ultra-fast loading for immediate user experience
  useEffect(() => {
    // Check if this is the first time loading the dashboard in this session
    const needsLoadingEffect =
      sessionStorage.getItem("dashboardLoaded") !== "true";

    if (needsLoadingEffect) {
      // Show a minimal loading indicator for just 50ms for visual feedback
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
        // Mark dashboard as already loaded to skip this brief animation on subsequent visits
        sessionStorage.setItem("dashboardLoaded", "true");
      }, 50); // Ultra-short loading time

      return () => clearTimeout(timer);
    }
  }, []);

  // Define all available dashboard cards with their initial state
  const [dashboardCards, setDashboardCards] = useState<DashboardCard[]>([
    {
      id: "jobs-quick-access",
      title: "Jobs Quick Access",
      enabled: false, // Disabled as requested
      component: <JobsQuickAccess data-oid="qhya9xm" />,
      size: "full",
    },
    {
      id: "job-timer",
      title: "Job Timer",
      enabled: true,
      component: (
        <div className="space-y-3" data-oid="265eoza">
          <ToolsWidget className="mb-1" data-oid="vr_7wx." />
          <JobTimer data-oid="iwa.ulq" />
        </div>
      ),

      size: "full",
    },
    {
      id: "job-insights",
      title: "Job Insights",
      enabled: true,
      component: <JobInsights data-oid="k:qzjh6" />,
      size: "full",
    },
    {
      id: "weather-impactor",
      title: "Weather Impact Analyzer",
      enabled: true,
      component: <WeatherImpactor data-oid="v087sfw" />,
      size: "full",
    },
    {
      id: "time-entries",
      title: "Recent Time Entries",
      enabled: true,
      component: <RecentTimeEntries data-oid="mg99q_7" />,
      size: "full",
    },
    {
      id: "active-projects",
      title: "Active Projects",
      enabled: true,
      component: <ActiveProjects data-oid=".xn26p4" />,
      size: "medium",
    },
    {
      id: "pending-invoices",
      title: "Pending Invoices",
      enabled: true,
      component: <PendingInvoices data-oid="yjvx_n_" />,
      size: "medium",
    },
    {
      id: "weather",
      title: "Weather",
      enabled: true,
      component: <WeatherWidget data-oid="jn2u12w" />,
      size: "medium",
    },
    {
      id: "resources",
      title: "Resources",
      enabled: true,
      component: <ResourcesWidget data-oid="7dnr92_" />,
      size: "medium",
    },
    {
      id: "tools",
      title: "Tools",
      enabled: false, // Disabled since we're showing it above the job timer
      component: <ToolsWidget data-oid="1rkyau1" />,
      size: "medium",
    },
    {
      id: "supplier-locator",
      title: "Supplier Locator",
      enabled: true,
      component: <SupplierLocator data-oid="ow72pwr" />,
      size: "full",
    },
  ]);

  // State for customization mode and dialog
  const [customizeMode, setCustomizeMode] = useState(false);
  const [addWidgetDialogOpen, setAddWidgetDialogOpen] = useState(false);

  // Remove a card
  const removeCard = (cardId: string) => {
    setDashboardCards((prevCards) =>
      prevCards.map((card) =>
        card.id === cardId ? { ...card, enabled: false } : card,
      ),
    );

    toast({
      title: "Card Removed",
      description: "You can add it back from the Add Widget menu.",
      variant: "default",
    });
  };

  // Add a card
  const addCard = (cardId: string) => {
    setDashboardCards((prevCards) =>
      prevCards.map((card) =>
        card.id === cardId ? { ...card, enabled: true } : card,
      ),
    );

    toast({
      title: "Widget Added",
      description: "The widget has been added to your dashboard.",
      variant: "default",
    });
  };

  // Shows the add widget dialog
  const showAddWidgetDialog = () => {
    const removedCards = dashboardCards.filter((card) => !card.enabled);

    if (removedCards.length === 0) {
      toast({
        title: "All Widgets Active",
        description:
          "You already have all available widgets on your dashboard.",
        variant: "default",
      });
      return;
    }

    setAddWidgetDialogOpen(true);
  };

  // Get available widgets for dialog
  const availableWidgets = dashboardCards.map((card) => ({
    id: card.id,
    title: card.title,
    description: `Add the ${card.title} widget to your dashboard.`,
    icon: getWidgetIcon(card.id),
    disabled: card.enabled,
  }));

  // Helper to get appropriate icons for widgets
  function getWidgetIcon(cardId: string): string {
    const iconMap: Record<string, string> = {
      "job-timer": "fa-stopwatch",
      "job-insights": "fa-chart-bar",
      "weather-impactor": "fa-cloud-bolt",
      "time-entries": "fa-history",
      "active-projects": "fa-project-diagram",
      "pending-invoices": "fa-file-invoice-dollar",
      weather: "fa-cloud-sun",
      resources: "fa-book",
      tools: "fa-tools",
      "supplier-locator": "fa-map-marker-alt",
    };

    return iconMap[cardId] || "fa-th-large";
  }

  // Toggle customization mode
  const toggleCustomizeMode = () => {
    setCustomizeMode(!customizeMode);
    if (customizeMode) {
      toast({
        title: "Dashboard Saved",
        description: "Your dashboard layout has been saved.",
        variant: "default",
      });
    } else {
      toast({
        title: "Edit Mode Activated",
        description: "You can now rearrange or remove dashboard cards.",
        variant: "default",
      });
    }
  };

  // Get active cards
  const activeCards = dashboardCards.filter((card) => card.enabled);
  const activeSmallCards = activeCards.filter((card) => card.size === "small");
  const activeMediumCards = activeCards.filter(
    (card) => card.size === "medium",
  );
  const activeLargeCards = activeCards.filter((card) => card.size === "large");
  const activeFullCards = activeCards.filter((card) => card.size === "full");

  // Show loading screen with optimized performance
  if (isLoading) {
    return (
      <LogoLoader
        fullScreen
        skipDelay
        size="large"
        text="Loading your Dashboard..."
        data-oid="f_tjj12"
      />
    );
  }

  return (
    <main
      className="container mx-auto px-4 py-4 dashboard-overview"
      data-oid="lhg_lwo"
    >
      {/* STR8 BUILD Website Promotion - COMPACT VERSION */}
      <div className="mb-4 mt-2 mx-auto" data-oid="s1e_7n9">
        <GlassCard className="overflow-hidden relative" data-oid="kp2e7ma">
          {/* Small attention marker */}
          <div
            className="absolute -top-1 -right-1 w-16 h-16 overflow-hidden z-10"
            data-oid="t583db5"
          >
            <div
              className="absolute transform rotate-45 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold py-1 right-[-35px] top-[10px] w-[120px] text-center text-xs shadow-lg"
              data-oid="tydip2d"
            >
              NEW
            </div>
          </div>

          {/* Compact promotional content */}
          <div
            className="flex flex-col md:flex-row items-center gap-4 p-4"
            data-oid="825lk8w"
          >
            {/* Logo */}
            <div
              className="shrink-0 w-16 h-16 rounded-lg bg-gradient-to-br from-space-800 to-space-900 border border-cyan-500/30 flex items-center justify-center shadow-glow-sm"
              data-oid="g5d3:ow"
            >
              <div
                className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
                data-oid="s4mgdkg"
              >
                STR8
              </div>
            </div>

            {/* Content */}
            <div className="flex-1" data-oid="srlwnmq">
              <h3
                className="text-xl font-space font-bold bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent flex items-center"
                data-oid="755zl7r"
              >
                <i
                  className="fas fa-globe text-cyan-400 mr-2"
                  data-oid="da7kb.n"
                ></i>
                Official Website:{" "}
                <span className="text-cyan-400 ml-1" data-oid="05yiw.v">
                  www.str8build.com
                </span>
              </h3>
              <p className="text-gray-300 text-sm mt-1" data-oid="fvo9srb">
                Professional construction resources and tools for builders
              </p>

              <div className="mt-2 flex flex-wrap gap-2" data-oid="m7.t6et">
                <a
                  href="https://www.str8build.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium rounded-md shadow-glow-sm hover:shadow-glow-md transition-all duration-300 text-sm"
                  data-oid="gub_opp"
                >
                  <span className="flex items-center" data-oid="tktye8t">
                    <span data-oid="8wtajd9">Visit Site</span>
                    <i
                      className="fas fa-external-link-alt ml-1.5 text-xs"
                      data-oid="yr3g0-4"
                    ></i>
                  </span>
                </a>

                <div
                  className="inline-flex items-center text-sm text-gray-400 gap-3"
                  data-oid="cfovqc8"
                >
                  <span className="flex items-center" data-oid="q-.7i9c">
                    <i
                      className="fas fa-check-circle text-cyan-400 mr-1 text-xs"
                      data-oid="gwa:2jt"
                    ></i>{" "}
                    Resources
                  </span>
                  <span className="flex items-center" data-oid="-n.0fe5">
                    <i
                      className="fas fa-check-circle text-cyan-400 mr-1 text-xs"
                      data-oid="haxrqi2"
                    ></i>{" "}
                    Tools
                  </span>
                  <span className="flex items-center" data-oid="ifqb:zg">
                    <i
                      className="fas fa-check-circle text-cyan-400 mr-1 text-xs"
                      data-oid="oqhgotm"
                    ></i>{" "}
                    Guides
                  </span>
                </div>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>
      {/* Professional welcome message */}
      <div className="mb-6 text-center relative" data-oid="lep-a4c">
        <div
          className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 via-blue-500/10 to-cyan-500/20 blur-xl animate-pulse-slow rounded-full"
          data-oid="uj_gq-e"
        ></div>
        <div
          className="relative inline-block px-10 py-3 rounded-full bg-space-950/80 backdrop-blur-md border border-cyan-400/30 shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:shadow-[0_0_25px_rgba(6,182,212,0.4)] transition-all duration-300"
          data-oid="sk5wi9a"
        >
          <div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/5 to-transparent animate-shimmer-slow rounded-full overflow-hidden"
            data-oid="5xgyq46"
          ></div>
          <div
            className="absolute -top-px left-10 right-10 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent"
            data-oid="f8.--7o"
          ></div>
          <div
            className="absolute -bottom-px left-10 right-10 h-px bg-gradient-to-r from-transparent via-blue-400/40 to-transparent"
            data-oid="61o-h.g"
          ></div>
          <p
            className="text-lg font-space font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-cyan-200 to-blue-300 drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]"
            data-component-name="Dashboard"
            data-oid="7e_qg-3"
          >
            Welcome,{" "}
            <span className="text-white/90" data-oid="-q_m-88">
              {user?.username || "Builder"}
            </span>{" "}
            <span
              className="animate-pulse-slow inline-block"
              data-oid="our1.yv"
            >
              ✦
            </span>
          </p>
        </div>
      </div>
      {/* Banner with STR8 BUILD Logo */}
      <div className="mb-4 text-center relative" data-oid="62504gq">
        <div
          className="relative inline-block group cursor-pointer"
          data-oid="0z60-8n"
        >
          {/* Clickable overlay with higher z-index and better interaction */}
          <span
            className="absolute inset-0 w-full h-full bg-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-800 z-20 pointer-events-auto cursor-pointer active:bg-cyan-500/40"
            data-component-name="Jobs"
            style={{ pointerEvents: "auto", cursor: "pointer" }}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              console.log("Jobs span clicked!");

              // Try multiple navigation methods
              try {
                window.location.href = "/jobs";
                window.location.assign("/jobs");
                window.open("/jobs", "_self");
              } catch (err) {
                console.error("Navigation error:", err);
              }

              return false;
            }}
            data-oid="x:rav92"
          >
            {/* Debug indicator visible when clicked/active */}
            <div
              className="hidden absolute inset-0 bg-cyan-500/50 flex items-center justify-center active:flex"
              data-oid="q2o1hvj"
            >
              <span className="text-white font-bold" data-oid="m2_:5jd">
                JOBS
              </span>
            </div>
          </span>
          {/* Improved visual feedback on hover */}
          <div
            className="absolute inset-0 rounded-full bg-cyan-500/0 group-hover:bg-cyan-500/10 transition-colors duration-300"
            data-oid="v97k-en"
          ></div>
          <img
            src={str8BuildLogo}
            alt="STR8 BUILD Logo"
            className="w-56 md:w-72 h-auto mx-auto relative drop-shadow-[0_0_25px_rgba(59,130,246,0.5)] group-hover:drop-shadow-[0_0_35px_rgba(59,130,246,0.7)] transition-all duration-300"
            style={{
              animation: "gentleFloat 6s ease-in-out infinite",
            }}
            data-oid="asrwfpl"
          />

          {/* Custom keyframes for gentler floating animation */}
          <style jsx data-oid="_hvacsv">{`
            @keyframes gentleFloat {
              0%,
              100% {
                transform: translateY(0);
              }
              50% {
                transform: translateY(-8px);
              }
            }
          `}</style>
          <div
            className="absolute -inset-1 bg-gradient-to-r from-blue-500/10 to-cyan-400/10 blur-xl rounded-full -z-10 group-hover:from-blue-500/20 group-hover:to-cyan-400/20 transition-all duration-300"
            data-oid="no4i_q8"
          ></div>
        </div>{" "}
        {/* Closes div.relative.inline-block.group.cursor-pointer */}
      </div>{" "}
      {/* Closes div.mb-4.text-center.relative */}
      {/* Dashboard Header */}
      <div
        className="flex flex-wrap md:flex-nowrap justify-between items-center mb-6 gap-3"
        data-oid="w_9atcw"
      >
        <h2
          className="text-2xl font-space font-bold text-white"
          data-oid="g3k3.:."
        >
          Dashboard
        </h2>

        <div className="inline-flex items-center gap-2" data-oid="whwtmdz">
          <div
            className="inline-flex items-center overflow-hidden rounded-full border border-cyan/30 bg-space-900/80 backdrop-blur-sm order-2 md:order-3"
            data-oid="6.s047v"
          >
            <button
              className="text-xs md:text-sm text-cyan px-3 py-1.5 hover:bg-purple-900 border-r border-cyan/30 transition-colors"
              onClick={showAddWidgetDialog}
              data-oid="7w90f4q"
            >
              <i className="fas fa-plus mr-1" data-oid="5lpjqti"></i>{" "}
              <span className="hidden md:inline" data-oid="27y93el">
                Add
              </span>{" "}
              Widget
            </button>
            <button
              className={`text-xs md:text-sm px-3 py-1.5 transition-colors ${
                customizeMode
                  ? "bg-cyan/30 text-white"
                  : "text-cyan hover:bg-space-800"
              }`}
              onClick={toggleCustomizeMode}
              data-oid="ekqlk:1"
            >
              <i
                className={`fas ${customizeMode ? "fa-save" : "fa-edit"} mr-1`}
                data-oid="xp2ap-y"
              ></i>
              {customizeMode ? "Save" : "Edit"}
            </button>
          </div>
        </div>
      </div>
      {/* Full-width Cards with improved mobile handling */}
      {activeFullCards.map((card) => (
        <div key={card.id} className="relative mb-4 sm:mb-6" data-oid="argofdx">
          {customizeMode && (
            <CardEditControl
              cardId={card.id}
              title={card.title}
              onRemove={removeCard}
              data-oid="utcjw3j"
            />
          )}
          <div
            className="touch-manipulation overflow-x-auto"
            data-oid="iuxlie9"
          >
            {card.component}
          </div>
        </div>
      ))}
      {/* API Connection Test */}
      <div className="mb-4" data-oid="b:a-:0u">
        <GlassCard data-oid="e6mrwi:">
          <ApiTest data-oid="565ftea" />
        </GlassCard>
      </div>
      {/* Medium Cards (3 columns on desktop, 2 on tablet, 1 on mobile) */}
      {activeMediumCards.length > 0 && (
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6"
          data-oid="4.gy6ia"
        >
          {activeMediumCards.map((card) => (
            <div key={card.id} className="relative" data-oid="-facj6v">
              {customizeMode && (
                <CardEditControl
                  cardId={card.id}
                  title={card.title}
                  onRemove={removeCard}
                  data-oid="0g6dw8q"
                />
              )}
              <div className="touch-manipulation" data-oid="33-h6l0">
                {card.component}
              </div>
            </div>
          ))}
        </div>
      )}
      {/* Large Cards (2 columns on tablet+, 1 on mobile) */}
      {activeLargeCards.length > 0 && (
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6"
          data-oid="uqxr6rp"
        >
          {activeLargeCards.map((card) => (
            <div key={card.id} className="relative" data-oid="ruf682l">
              {customizeMode && (
                <CardEditControl
                  cardId={card.id}
                  title={card.title}
                  onRemove={removeCard}
                  data-oid="40_3s6y"
                />
              )}
              <div className="touch-manipulation" data-oid="8mtqsuw">
                {card.component}
              </div>
            </div>
          ))}
        </div>
      )}
      {/* Empty state if all cards are removed */}
      {activeCards.length === 0 && (
        <GlassCard
          className="p-8 flex flex-col items-center justify-center text-center"
          data-oid="trjnk1j"
        >
          <div className="text-4xl text-cyan mb-4" data-oid="-8758.j">
            <i className="fas fa-th-large" data-oid="r28l:sq"></i>
          </div>
          <h3 className="text-xl font-space text-white mb-2" data-oid="98_lxbp">
            Your Dashboard is Empty
          </h3>
          <p className="text-gray-300 mb-4" data-oid="ymfap:c">
            You've removed all dashboard widgets. Click "Add Widget" to restore
            them.
          </p>
          <button
            className="bg-purple-900 text-cyan px-4 py-2 rounded hover:bg-purple-800 btn-glow btn-glow-cyan"
            onClick={showAddWidgetDialog}
            data-oid=":xd_wuv"
          >
            <i className="fas fa-plus mr-1" data-oid="eryzs:b"></i> Add Widget
          </button>
        </GlassCard>
      )}
      {/* Add Widget Dialog */}
      <AddWidgetDialog
        open={addWidgetDialogOpen}
        onOpenChange={setAddWidgetDialogOpen}
        availableWidgets={availableWidgets}
        onAddWidget={addCard}
        data-oid="4ifakhj"
      />
    </main>
  );
};

export default Dashboard;
