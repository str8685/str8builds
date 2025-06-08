import { FC, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import GlassCard from "@/components/ui/GlassCard";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";

interface Section {
  id: string;
  title: string;
  icon: string;
  color: string;
}

const Help: FC = () => {
  const { toast } = useToast();

  // Define the different help sections
  const sections: Section[] = [
    { id: "dashboard", title: "Dashboard", icon: "home", color: "blue" },
    { id: "tools", title: "Professional Tools", icon: "tools", color: "cyan" },
    {
      id: "calculator",
      title: "Calculators",
      icon: "calculator",
      color: "teal",
    },
    { id: "resources", title: "Resources", icon: "book", color: "indigo" },
    { id: "jobs", title: "Jobs", icon: "briefcase", color: "purple" },
    { id: "finance", title: "Finance", icon: "dollar-sign", color: "green" },
    { id: "voice", title: "Voice Commands", icon: "microphone", color: "red" },
    {
      id: "shortcuts",
      title: "Keyboard Shortcuts",
      icon: "keyboard",
      color: "yellow",
    },
    { id: "faq", title: "FAQ", icon: "question", color: "orange" },
  ];

  const [activeSection, setActiveSection] = useState("dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchResults, setSearchResults] = useState<
    { section: string; title: string }[]
  >([]);

  // Show a welcome toast when the manual is opened
  useEffect(() => {
    toast({
      title: "Welcome to STR8 BUILD Manual",
      description: "Explore all features of your professional construction app",
      variant: "default",
    });
  }, []);

  // Handle search functionality
  const handleSearch = (query: string) => {
    setSearchQuery(query);

    if (query.length < 2) {
      setShowSearchResults(false);
      return;
    }

    // Simulate search results based on content
    const results = [
      { section: "tools", title: "Measure Tool" },
      { section: "tools", title: "Level Tool" },
      { section: "finance", title: "Invoices" },
      { section: "jobs", title: "Project Management" },
      { section: "voice", title: "Voice Commands" },
    ].filter((item) => item.title.toLowerCase().includes(query.toLowerCase()));

    setSearchResults(results);
    setShowSearchResults(true);
  };

  const handleResultClick = (section: string) => {
    setActiveSection(section);
    setShowSearchResults(false);
    setSearchQuery("");
  };

  // Render content based on active section
  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <DashboardHelp data-oid="beoxat_" />;
      case "tools":
        return <ToolsHelp data-oid="2--6y36" />;
      case "calculator":
        return <CalculatorHelp data-oid="sdymm1m" />;
      case "resources":
        return <ResourcesHelp data-oid="c4jvbod" />;
      case "jobs":
        return <JobsHelp data-oid="lcsc04v" />;
      case "finance":
        return <FinanceHelp data-oid="r.ou.uo" />;
      case "voice":
        return <VoiceHelp data-oid="x6:up1t" />;
      case "shortcuts":
        return <ShortcutsHelp data-oid=":1i.c3d" />;
      case "faq":
        return <FAQHelp data-oid="3dyxknv" />;
      default:
        return <DashboardHelp data-oid="rykff3z" />;
    }
  };

  return (
    <div
      className="container mx-auto py-4 px-3 sm:py-6 sm:px-4 max-w-7xl"
      data-oid="l4w3s_t"
    >
      <motion.div
        className="mb-4 sm:mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        data-oid="7ts3o7e"
      >
        <div
          className="flex flex-col sm:flex-row items-center mb-2"
          data-oid="osyf0my"
        >
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "loop",
              ease: "linear",
            }}
            className="mr-0 mb-2 sm:mr-3 sm:mb-0 text-cyan-400"
            data-oid="d8.jre2"
          >
            <i
              className="fas fa-cog text-2xl sm:text-3xl"
              data-oid="0_p9xcu"
            ></i>
          </motion.div>
          <h1
            className="text-2xl sm:text-3xl text-center sm:text-left font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent"
            data-oid="zxh-f72"
          >
            STR8 BUILD App Manual
          </h1>
        </div>
        <p
          className="text-gray-300 text-center sm:text-left ml-0 sm:ml-10 text-sm sm:text-base"
          data-oid="els7t_w"
        >
          Your comprehensive guide to maximizing productivity with your
          construction management app
        </p>

        {/* Search bar */}
        <div className="mt-4 ml-0 sm:ml-10 relative" data-oid="bz7o9vz">
          <div
            className="relative max-w-full sm:max-w-md mx-auto sm:mx-0"
            data-oid=".w-bwmn"
          >
            <input
              type="text"
              placeholder="Search for features..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full bg-space-900/60 border border-space-700 rounded-md py-2 pl-10 pr-4 text-sm sm:text-base text-gray-300 focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500"
              data-oid="sczq_hd"
            />

            <div
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              data-oid="c0_e3wx"
            >
              <i className="fas fa-search" data-oid="a20ix45"></i>
            </div>
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setShowSearchResults(false);
                }}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200"
                data-oid="5o:9.1b"
              >
                <i className="fas fa-times" data-oid="gv4ydb7"></i>
              </button>
            )}
          </div>

          {/* Search results dropdown */}
          <AnimatePresence data-oid="nuy199.">
            {showSearchResults && searchResults.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute z-10 mt-2 w-full max-w-md bg-space-900 border border-space-700 rounded-md shadow-lg overflow-hidden"
                data-oid="n3jhvrb"
              >
                <div className="max-h-60 overflow-y-auto" data-oid="cuu204c">
                  {searchResults.map((result, index) => (
                    <button
                      key={index}
                      onClick={() => handleResultClick(result.section)}
                      className="w-full text-left px-4 py-2 hover:bg-space-800 flex items-center space-x-2"
                      data-oid="ff74lv1"
                    >
                      <i
                        className={`fas fa-${sections.find((s) => s.id === result.section)?.icon} text-${sections.find((s) => s.id === result.section)?.color}-400`}
                        data-oid="sobz4dk"
                      ></i>
                      <span className="text-gray-300" data-oid="q8:sorp">
                        {result.title}
                      </span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Section navigation */}
      {/* Mobile-friendly horizontal scrollable tabs for small screens */}
      <div
        className="block md:hidden mb-4 -mx-3 px-3 overflow-x-auto pb-2"
        data-oid="xsy_sbv"
      >
        <motion.div
          className="flex space-x-3 min-w-max"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          data-oid="r-mhkai"
        >
          {sections.map((section, index) => (
            <motion.button
              key={section.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
              onClick={() => setActiveSection(section.id)}
              className={cn(
                "py-2 px-3 rounded-lg text-xs font-medium whitespace-nowrap transition-all duration-300",
                "flex items-center justify-center gap-1.5",
                "border border-space-700 hover:border-" +
                  section.color +
                  "-500/50",
                activeSection === section.id
                  ? "bg-gradient-to-br from-" +
                      section.color +
                      "-900/50 to-" +
                      section.color +
                      "-900/20 text-white shadow-md shadow-" +
                      section.color +
                      "-500/20"
                  : "bg-space-900/60 text-gray-300",
              )}
              whileTap={{ scale: 0.95 }}
              data-oid="aw_fgbv"
            >
              <div
                className={cn(
                  "w-6 h-6 rounded-full flex items-center justify-center mr-1",
                  activeSection === section.id
                    ? "bg-" +
                        section.color +
                        "-500/20 text-" +
                        section.color +
                        "-400"
                    : "bg-space-800/60 text-gray-400",
                )}
                data-oid="-31-0_g"
              >
                <i
                  className={`fas fa-${section.icon} text-xs`}
                  data-oid="tki.ts5"
                ></i>
              </div>
              <span data-oid="d1.d90.">{section.title}</span>
            </motion.button>
          ))}
        </motion.div>
      </div>

      {/* Desktop grid layout */}
      <motion.div
        className="hidden md:grid md:grid-cols-3 lg:grid-cols-5 gap-3 mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        data-oid="8p0cs0t"
      >
        {sections.map((section, index) => (
          <motion.button
            key={section.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.1 * index }}
            onClick={() => setActiveSection(section.id)}
            className={cn(
              "py-3 px-4 rounded-lg text-sm font-medium transition-all duration-300",
              "flex items-center justify-center gap-2",
              "border border-space-700 hover:border-" +
                section.color +
                "-500/50",
              activeSection === section.id
                ? "bg-gradient-to-br from-" +
                    section.color +
                    "-900/50 to-" +
                    section.color +
                    "-900/20 text-white shadow-md shadow-" +
                    section.color +
                    "-500/20"
                : "bg-space-900/60 text-gray-300 hover:bg-space-800/60",
            )}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            data-oid="6n_nig-"
          >
            <div
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center mr-2",
                activeSection === section.id
                  ? "bg-" +
                      section.color +
                      "-500/20 text-" +
                      section.color +
                      "-400"
                  : "bg-space-800/60 text-gray-400",
              )}
              data-oid="_jsig.5"
            >
              <i className={`fas fa-${section.icon}`} data-oid="we-crju"></i>
            </div>
            <span data-oid="00e9w5n">{section.title}</span>
          </motion.button>
        ))}
      </motion.div>

      {/* Content area */}
      <GlassCard
        className="p-3 sm:p-6 shadow-xl shadow-cyan-500/5 border-t border-cyan-500/20"
        data-oid="7wbwf1p"
      >
        <AnimatePresence mode="wait" data-oid="1fhimfe">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            data-oid="kbl660m"
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>

        {/* Quick navigation footer */}
        <motion.div
          className="mt-8 sm:mt-10 pt-4 sm:pt-6 border-t border-space-700/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          data-oid="32y_9hd"
        >
          <div
            className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0"
            data-oid="lk1zash"
          >
            <div className="text-sm text-gray-400" data-oid="7mfezpi">
              <Link
                href="/"
                className="text-cyan-400 hover:underline inline-flex items-center gap-1"
                data-oid="nklrh4d"
              >
                <i className="fas fa-home text-xs" data-oid="3nbalqy"></i>
                <span data-oid="4h05iib">Back to Dashboard</span>
              </Link>
            </div>
            <div
              className="flex space-x-4 sm:space-x-6 text-xs sm:text-sm"
              data-oid="r735_i7"
            >
              <button
                onClick={() => window.print()}
                className="text-gray-400 hover:text-cyan-400 flex items-center gap-1"
                data-oid="d._lxpz"
              >
                <i className="fas fa-print" data-oid="8_x-i.s"></i>
                <span data-oid="tug91eq">Print Manual</span>
              </button>
              <button
                onClick={() => {
                  toast({
                    title: "Feedback Sent",
                    description:
                      "Thank you for helping us improve the STR8 BUILD app!",
                  });
                }}
                className="text-gray-400 hover:text-cyan-400 flex items-center gap-1"
                data-oid="_d55i_h"
              >
                <i className="fas fa-comment" data-oid=":am-tew"></i>
                <span data-oid="9hddc-g">Send Feedback</span>
              </button>
            </div>
          </div>
        </motion.div>
      </GlassCard>
    </div>
  );
};

// Dashboard Help Section
const DashboardHelp: FC = () => (
  <div data-oid="2b2edoi">
    <h2
      className="text-xl font-bold text-blue-400 mb-4 flex items-center"
      data-oid="rxpp1h9"
    >
      <i className="fas fa-home mr-2" data-oid="qz0zp0:"></i> Dashboard
    </h2>
    <p className="mb-4 text-gray-200" data-oid="5.rjwlh">
      The Dashboard is your command center for managing all aspects of your
      construction business.
    </p>

    <div className="space-y-4" data-oid="i52bx.4">
      <div className="border-l-2 border-blue-500 pl-4" data-oid="hshh2xg">
        <h3
          className="text-lg font-semibold text-white mb-2"
          data-oid="jye4wku"
        >
          Professional Tools Bar
        </h3>
        <p className="text-gray-300" data-oid="7ao2:g7">
          Located at the top of your dashboard, the Professional Tools bar
          provides quick access to essential construction tools:
        </p>
        <ul
          className="list-disc list-inside text-gray-300 mt-2 ml-4 space-y-1"
          data-oid="gywh65d"
        >
          <li data-oid="koq4q:_">
            <span className="text-cyan-400" data-oid="lbflr.t">
              Measure Tool
            </span>{" "}
            - For precise measurements with calibration
          </li>
          <li data-oid="cak6ykd">
            <span className="text-cyan-400" data-oid=":kf1ewl">
              Level Tool
            </span>{" "}
            - Digital bubble level for perfect alignment
          </li>
          <li data-oid="fs7ear.">
            <span className="text-cyan-400" data-oid="q41cdnm">
              Angle Tool
            </span>{" "}
            - Measures angles for precise construction work
          </li>
          <li data-oid=":5u0g6h">
            <span className="text-cyan-400" data-oid=":8r8nyw">
              Calculator
            </span>{" "}
            - Construction-specific calculations
          </li>
          <li data-oid="qu3gq-f">
            <span className="text-cyan-400" data-oid="xuda.6k">
              Project Cam
            </span>{" "}
            - Document your projects with photos
          </li>
          <li data-oid="wpb5eg3">
            <span className="text-cyan-400" data-oid="4un8ut8">
              Sound Meter
            </span>{" "}
            - Measure job site noise levels
          </li>
        </ul>
      </div>

      <div className="border-l-2 border-blue-500 pl-4" data-oid="lsdo8xo">
        <h3
          className="text-lg font-semibold text-white mb-2"
          data-oid="-j682f2"
        >
          Job Timer
        </h3>
        <p className="text-gray-300" data-oid="dfknbp1">
          Track your time on projects with start/pause functionality. All time
          entries are automatically saved to the timesheet for billing.
        </p>
      </div>

      <div className="border-l-2 border-blue-500 pl-4" data-oid="a9n1m75">
        <h3
          className="text-lg font-semibold text-white mb-2"
          data-oid="hcwz1qb"
        >
          Weather Widgets
        </h3>
        <p className="text-gray-300" data-oid="pwrz9ax">
          View current weather conditions and forecasts to plan your work
          accordingly.
        </p>
      </div>

      <div className="border-l-2 border-blue-500 pl-4" data-oid="b_ugt4e">
        <h3
          className="text-lg font-semibold text-white mb-2"
          data-oid="u.24msv"
        >
          Quick Access Cards
        </h3>
        <p className="text-gray-300" data-oid="n3qewlw">
          The dashboard contains cards for Active Projects, Pending Invoices,
          and Recent Time Entries for at-a-glance business management.
        </p>
      </div>
    </div>
  </div>
);

// Tools Help Section
const ToolsHelp: FC = () => (
  <div data-oid="t.2tpfz">
    <h2
      className="text-xl font-bold text-cyan-400 mb-4 flex items-center"
      data-oid="1l0yn6l"
    >
      <i className="fas fa-tools mr-2" data-oid="bgi..aw"></i> Professional
      Tools
    </h2>
    <p className="mb-4 text-gray-200" data-oid="1yb_nk9">
      STR8 BUILD provides a comprehensive suite of professional construction
      tools to make your job easier.
    </p>

    <div className="space-y-6" data-oid="apn6jwg">
      <div className="border-l-2 border-cyan-500 pl-4" data-oid="j_npxeh">
        <h3
          className="text-lg font-semibold text-white mb-2"
          data-oid="-ii:nad"
        >
          Measure Tool
        </h3>
        <p className="text-gray-300 mb-2" data-oid="xdmdcia">
          A precision measurement tool that allows you to measure distances
          directly on your device.
        </p>
        <div className="bg-space-900/50 p-3 rounded-md" data-oid="ggskwar">
          <h4 className="font-medium text-cyan-300 mb-1" data-oid="bd_:0z8">
            How to Use:
          </h4>
          <ol
            className="list-decimal list-inside text-gray-300 space-y-1 ml-2"
            data-oid="_s.zsdn"
          >
            <li data-oid="4f5-c8f">
              Open the Measure Tool from the Professional Tools bar
            </li>
            <li data-oid="up9g_3c">
              Calibrate the tool using a known reference (like a dollar bill)
            </li>
            <li data-oid="5s:3tle">
              Tap to place start and end points for measurement
            </li>
            <li data-oid="pdpg0si">
              View accurate measurements in your preferred units (in/cm)
            </li>
          </ol>
        </div>
      </div>

      <div className="border-l-2 border-cyan-500 pl-4" data-oid="0ycrjgh">
        <h3
          className="text-lg font-semibold text-white mb-2"
          data-oid="_i:_z-8"
        >
          Level Tool
        </h3>
        <p className="text-gray-300 mb-2" data-oid="5tg8ecf">
          A digital bubble level that uses your device's sensors to check if
          surfaces are perfectly level.
        </p>
        <div className="bg-space-900/50 p-3 rounded-md" data-oid="op._3v7">
          <h4 className="font-medium text-cyan-300 mb-1" data-oid="9ga:jwi">
            How to Use:
          </h4>
          <ol
            className="list-decimal list-inside text-gray-300 space-y-1 ml-2"
            data-oid="j2srn-e"
          >
            <li data-oid="vc5wpr8">
              Open the Level Tool from the Professional Tools bar
            </li>
            <li data-oid="oukv6m9">
              Place your device against the surface you want to level
            </li>
            <li data-oid="2pgs:p7">
              The digital bubble will show you the exact degree of tilt
            </li>
            <li data-oid="ydokcaf">
              When perfectly level, the display will turn green
            </li>
          </ol>
        </div>
      </div>

      <div className="border-l-2 border-cyan-500 pl-4" data-oid="agkqhzf">
        <h3
          className="text-lg font-semibold text-white mb-2"
          data-oid="shtqgex"
        >
          Angle Tool
        </h3>
        <p className="text-gray-300 mb-2" data-oid="--cml7j">
          Measure angles between two lines for precise construction work.
        </p>
        <div className="bg-space-900/50 p-3 rounded-md" data-oid="1yg3j9l">
          <h4 className="font-medium text-cyan-300 mb-1" data-oid="6cvwd8h">
            How to Use:
          </h4>
          <ol
            className="list-decimal list-inside text-gray-300 space-y-1 ml-2"
            data-oid=":.h7.kp"
          >
            <li data-oid="723ai1l">
              Open the Angle Tool from the Professional Tools bar
            </li>
            <li data-oid="gov1s43">
              Tap to place the center point of your angle
            </li>
            <li data-oid="z3thcjv">
              Tap to place the first and second points of your angle
            </li>
            <li data-oid="5ezs05u">
              View the precise angle measurement in degrees
            </li>
          </ol>
        </div>
      </div>

      <div className="border-l-2 border-cyan-500 pl-4" data-oid="nzz85q:">
        <h3
          className="text-lg font-semibold text-white mb-2"
          data-oid="m-tkewa"
        >
          Calculator Tool
        </h3>
        <p className="text-gray-300 mb-2" data-oid="nuxemnj">
          A specialized calculator with construction-specific calculations for
          area, volume, and material estimates.
        </p>
        <div className="bg-space-900/50 p-3 rounded-md" data-oid="ft2s58w">
          <h4 className="font-medium text-cyan-300 mb-1" data-oid="pg16-h_">
            Key Features:
          </h4>
          <ul
            className="list-disc list-inside text-gray-300 space-y-1 ml-2"
            data-oid=".292kan"
          >
            <li data-oid="u:v0717">Standard calculator functions</li>
            <li data-oid="u.j58yx">Area calculations (square footage)</li>
            <li data-oid="ls9o468">Volume calculations (cubic yards)</li>
            <li data-oid="h-n1zk4">Material cost estimations</li>
            <li data-oid="s9jam6z">
              Conversion between imperial and metric units
            </li>
          </ul>
        </div>
      </div>

      <div className="border-l-2 border-cyan-500 pl-4" data-oid="knfyj7p">
        <h3
          className="text-lg font-semibold text-white mb-2"
          data-oid="9:klgi4"
        >
          Project Cam
        </h3>
        <p className="text-gray-300 mb-2" data-oid="s2-skcg">
          Document your projects with photos that are automatically saved to
          your project files.
        </p>
        <div className="bg-space-900/50 p-3 rounded-md" data-oid="h3ihxbz">
          <h4 className="font-medium text-cyan-300 mb-1" data-oid="vybiv43">
            Key Features:
          </h4>
          <ul
            className="list-disc list-inside text-gray-300 space-y-1 ml-2"
            data-oid="kigd-9u"
          >
            <li data-oid="2n.zdb3">Take photos with your device camera</li>
            <li data-oid="p.7t:26">
              Auto-assign photos to current active project
            </li>
            <li data-oid="7e7_zwp">Add notes or annotations to photos</li>
            <li data-oid="yg_ssd2">View photo history for each project</li>
          </ul>
        </div>
      </div>

      <div className="border-l-2 border-cyan-500 pl-4" data-oid=":p22-s0">
        <h3
          className="text-lg font-semibold text-white mb-2"
          data-oid="v0k5nwp"
        >
          Sound Meter
        </h3>
        <p className="text-gray-300 mb-2" data-oid="wnhqldc">
          Measure job site noise levels to ensure safety compliance.
        </p>
        <div className="bg-space-900/50 p-3 rounded-md" data-oid="5lw5isc">
          <h4 className="font-medium text-cyan-300 mb-1" data-oid="l7.0smy">
            Key Features:
          </h4>
          <ul
            className="list-disc list-inside text-gray-300 space-y-1 ml-2"
            data-oid="jgv4jpv"
          >
            <li data-oid="ptd0_2p">Real-time decibel level measurement</li>
            <li data-oid="u6pdv4h">Safety threshold indicators</li>
            <li data-oid=".h_-8o6">Recording of peak noise levels</li>
            <li data-oid="sql0r8f">OSHA compliance guidelines</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
);

// Calculator Help Section
const CalculatorHelp: FC = () => (
  <div data-oid="tbv:yqj">
    <h2
      className="text-xl font-bold text-teal-400 mb-4 flex items-center"
      data-oid="1wb5p7f"
    >
      <i className="fas fa-calculator mr-2" data-oid="rsahha9"></i> Calculators
    </h2>
    <p className="mb-4 text-gray-200" data-oid="6k4ya5g">
      Access specialized construction calculators to make complex calculations
      simple.
    </p>

    <div className="space-y-4" data-oid="9ogpjq_">
      <div className="border-l-2 border-teal-500 pl-4" data-oid="l2odv6q">
        <h3
          className="text-lg font-semibold text-white mb-2"
          data-oid="c0ogtfl"
        >
          Material Calculators
        </h3>
        <p className="text-gray-300" data-oid="5o82dhi">
          Calculate material quantities for concrete, lumber, paint, and more
          based on your project dimensions.
        </p>
        <ul
          className="list-disc list-inside text-gray-300 mt-2 ml-4"
          data-oid="ojar7xd"
        >
          <li data-oid="zrsvaqs">
            Concrete Calculator - cubic yards needed based on dimensions
          </li>
          <li data-oid="wsg553_">
            Paint Calculator - gallons needed based on wall area
          </li>
          <li data-oid="vq_e8dm">
            Flooring Calculator - square footage with waste factor
          </li>
        </ul>
      </div>

      <div className="border-l-2 border-teal-500 pl-4" data-oid="8eg3a4g">
        <h3
          className="text-lg font-semibold text-white mb-2"
          data-oid="zmvi:uv"
        >
          Cost Estimators
        </h3>
        <p className="text-gray-300" data-oid="_a:gcmi">
          Estimate project costs based on materials, labor, and other factors.
        </p>
        <ul
          className="list-disc list-inside text-gray-300 mt-2 ml-4"
          data-oid="7ow6r-q"
        >
          <li data-oid="d9ov5g2">
            Labor Cost Calculator - estimate hours and rates
          </li>
          <li data-oid="yi:407m">
            Project Cost Calculator - comprehensive estimation
          </li>
          <li data-oid="whgyhph">
            Markup Calculator - determine pricing with profit margins
          </li>
        </ul>
      </div>

      <div className="border-l-2 border-teal-500 pl-4" data-oid="lrrmwtt">
        <h3
          className="text-lg font-semibold text-white mb-2"
          data-oid="lz321p."
        >
          Conversion Tools
        </h3>
        <p className="text-gray-300" data-oid="reod6o2">
          Convert between different units of measurement commonly used in
          construction.
        </p>
        <ul
          className="list-disc list-inside text-gray-300 mt-2 ml-4"
          data-oid="d6vjbum"
        >
          <li data-oid="nadmtrq">
            Length Converter - between inches, feet, meters, etc.
          </li>
          <li data-oid="3e2y4.8">
            Area Converter - between square feet, square meters, acres, etc.
          </li>
          <li data-oid="l3a_wm6">
            Volume Converter - between cubic feet, cubic yards, gallons, etc.
          </li>
        </ul>
      </div>
    </div>
  </div>
);

// Resources Help Section
const ResourcesHelp: FC = () => (
  <div data-oid="hshl6y_">
    <h2
      className="text-xl font-bold text-indigo-400 mb-4 flex items-center"
      data-oid="2e6bg8u"
    >
      <i className="fas fa-book mr-2" data-oid="635i10-"></i> Resources
    </h2>
    <p className="mb-4 text-gray-200" data-oid="1gfl:ea">
      Access valuable resources to enhance your construction knowledge and
      efficiency.
    </p>

    <div className="space-y-4" data-oid="0801945">
      <div className="border-l-2 border-indigo-500 pl-4" data-oid=":pq7czw">
        <h3
          className="text-lg font-semibold text-white mb-2"
          data-oid="1j21m9t"
        >
          Reference Materials
        </h3>
        <p className="text-gray-300" data-oid="jxljoi1">
          Access building codes, safety regulations, and technical
          specifications.
        </p>
      </div>

      <div className="border-l-2 border-indigo-500 pl-4" data-oid="3zi7xp3">
        <h3
          className="text-lg font-semibold text-white mb-2"
          data-oid="tc77lxn"
        >
          Tutorials
        </h3>
        <p className="text-gray-300" data-oid="05o1gkx">
          Step-by-step guides for construction techniques and best practices.
        </p>
      </div>

      <div className="border-l-2 border-indigo-500 pl-4" data-oid="pbhuw99">
        <h3
          className="text-lg font-semibold text-white mb-2"
          data-oid="hqg_k2m"
        >
          Supplier Directory
        </h3>
        <p className="text-gray-300" data-oid="pw0l3h3">
          Find local suppliers for materials and equipment, with contact
          information and pricing.
        </p>
      </div>

      <div className="border-l-2 border-indigo-500 pl-4" data-oid="7cmr8hz">
        <h3
          className="text-lg font-semibold text-white mb-2"
          data-oid="3l3--ui"
        >
          Material Data Sheets
        </h3>
        <p className="text-gray-300" data-oid="4-6.9uj">
          Technical specifications and safety information for common
          construction materials.
        </p>
      </div>
    </div>
  </div>
);

// Jobs Help Section
const JobsHelp: FC = () => (
  <div data-oid="bk_xe0h">
    <h2
      className="text-xl font-bold text-purple-400 mb-4 flex items-center"
      data-oid="n284g38"
    >
      <i className="fas fa-briefcase mr-2" data-oid="w7ll515"></i> Jobs
      Management
    </h2>
    <p className="mb-4 text-gray-200" data-oid="u_kvw9f">
      Manage all your construction projects, clients, and job details in one
      place.
    </p>

    <div className="space-y-4" data-oid="pf3s58i">
      <div className="border-l-2 border-purple-500 pl-4" data-oid="m:l_wuz">
        <h3
          className="text-lg font-semibold text-white mb-2"
          data-oid="x7c-ct9"
        >
          Projects
        </h3>
        <p className="text-gray-300" data-oid="yh_quao">
          Create and manage construction projects with comprehensive details.
        </p>
        <div className="bg-space-900/50 p-3 rounded-md mt-2" data-oid="d6z-esp">
          <h4 className="font-medium text-purple-300 mb-1" data-oid="f3ruopu">
            Key Features:
          </h4>
          <ul
            className="list-disc list-inside text-gray-300 space-y-1 ml-2"
            data-oid="buto7l_"
          >
            <li data-oid="dat.vw:">
              Create new projects with detailed information
            </li>
            <li data-oid="77urgux">Track project status and timeline</li>
            <li data-oid="xxqlzxb">Assign tasks and responsibilities</li>
            <li data-oid="21a3x0a">Upload and manage project documents</li>
            <li data-oid="mi9:39s">Log project notes and updates</li>
          </ul>
        </div>
      </div>

      <div className="border-l-2 border-purple-500 pl-4" data-oid="gj7k2cr">
        <h3
          className="text-lg font-semibold text-white mb-2"
          data-oid=":p-qr1_"
        >
          Clients
        </h3>
        <p className="text-gray-300" data-oid="c2t5ntj">
          Manage client information, contact details, and project history.
        </p>
        <div className="bg-space-900/50 p-3 rounded-md mt-2" data-oid="6yyjjsh">
          <h4 className="font-medium text-purple-300 mb-1" data-oid="dg5v:e-">
            Key Features:
          </h4>
          <ul
            className="list-disc list-inside text-gray-300 space-y-1 ml-2"
            data-oid="bcdcmwg"
          >
            <li data-oid="dft7l19">Add and manage client profiles</li>
            <li data-oid="-a:sa9:">Track client communication history</li>
            <li data-oid="3.klx3b">
              View all projects associated with each client
            </li>
            <li data-oid="l8ix:d2">Manage client documents and contracts</li>
          </ul>
        </div>
      </div>

      <div className="border-l-2 border-purple-500 pl-4" data-oid="7f9129y">
        <h3
          className="text-lg font-semibold text-white mb-2"
          data-oid="..ugux1"
        >
          Job Site Details
        </h3>
        <p className="text-gray-300" data-oid="f:7dm01">
          Document job site information, conditions, and requirements.
        </p>
        <div className="bg-space-900/50 p-3 rounded-md mt-2" data-oid="yvtl3k3">
          <h4 className="font-medium text-purple-300 mb-1" data-oid="m4b1236">
            Tracked Information:
          </h4>
          <ul
            className="list-disc list-inside text-gray-300 space-y-1 ml-2"
            data-oid="7a9bihi"
          >
            <li data-oid="hegvd_p">Site address and access information</li>
            <li data-oid="6ia224u">Site conditions and limitations</li>
            <li data-oid="lsn:jez">Required permits and inspections</li>
            <li data-oid="86fifwj">Safety considerations and requirements</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
);

// Finance Help Section
const FinanceHelp: FC = () => (
  <div data-oid=".winqj8">
    <h2
      className="text-xl font-bold text-green-400 mb-4 flex items-center"
      data-oid="ffhs1yl"
    >
      <i className="fas fa-dollar-sign mr-2" data-oid="w3yh_g6"></i> Finance
    </h2>
    <p className="mb-4 text-gray-200" data-oid="veivsiv">
      Manage your construction business finances with invoicing and time
      tracking tools.
    </p>

    <div className="space-y-4" data-oid="v:i-rtq">
      <div className="border-l-2 border-green-500 pl-4" data-oid="qvfo6s0">
        <h3
          className="text-lg font-semibold text-white mb-2"
          data-oid="qt:mfbn"
        >
          Invoices
        </h3>
        <p className="text-gray-300" data-oid="-yub6oo">
          Create, send, and track professional invoices for your construction
          projects.
        </p>
        <div className="bg-space-900/50 p-3 rounded-md mt-2" data-oid="hik45-w">
          <h4 className="font-medium text-green-300 mb-1" data-oid="de9c:xd">
            Key Features:
          </h4>
          <ul
            className="list-disc list-inside text-gray-300 space-y-1 ml-2"
            data-oid="a62fj-n"
          >
            <li data-oid="08v5ij7">Generate itemized invoices for projects</li>
            <li data-oid="f54u6pj">
              Track payment status (pending, paid, overdue)
            </li>
            <li data-oid="5k.k890">Send automatic payment reminders</li>
            <li data-oid="m4n3v2c">
              Accept online payments through integrations
            </li>
            <li data-oid="4zs1xb8">
              Generate financial reports for accounting
            </li>
          </ul>
        </div>
      </div>

      <div className="border-l-2 border-green-500 pl-4" data-oid="zg0f133">
        <h3
          className="text-lg font-semibold text-white mb-2"
          data-oid="7f9f.jt"
        >
          Timesheet
        </h3>
        <p className="text-gray-300" data-oid="i3:-pm.">
          Track working hours and labor costs for accurate billing and project
          management.
        </p>
        <div className="bg-space-900/50 p-3 rounded-md mt-2" data-oid="5m:b:-4">
          <h4 className="font-medium text-green-300 mb-1" data-oid="yotdkt_">
            Key Features:
          </h4>
          <ul
            className="list-disc list-inside text-gray-300 space-y-1 ml-2"
            data-oid="t_n490y"
          >
            <li data-oid="yl6q9yc">Log work hours with the Job Timer</li>
            <li data-oid="46tgx:5">
              Categorize time entries by project and task
            </li>
            <li data-oid="_cre7t7">Track billable vs. non-billable hours</li>
            <li data-oid="w:tr2.x">Generate timesheet reports for payroll</li>
            <li data-oid="2yr_ly.">
              Automatically calculate labor costs for projects
            </li>
          </ul>
        </div>
      </div>

      <div className="border-l-2 border-green-500 pl-4" data-oid="f_n3nf:">
        <h3
          className="text-lg font-semibold text-white mb-2"
          data-oid="z:p3qhp"
        >
          Expense Tracking
        </h3>
        <p className="text-gray-300" data-oid="zq18k0y">
          Record and categorize project expenses for accurate cost tracking and
          client billing.
        </p>
        <div className="bg-space-900/50 p-3 rounded-md mt-2" data-oid="ja616kt">
          <h4 className="font-medium text-green-300 mb-1" data-oid="8a8d5l1">
            Key Features:
          </h4>
          <ul
            className="list-disc list-inside text-gray-300 space-y-1 ml-2"
            data-oid="6w48njt"
          >
            <li data-oid="krxi.kj">Log expenses with photos of receipts</li>
            <li data-oid="2s_14:6">Categorize expenses by type and project</li>
            <li data-oid="-idnzdv">
              Track reimbursable vs. non-reimbursable expenses
            </li>
            <li data-oid="a:2vsnw">Generate expense reports for accounting</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
);

// Voice Commands Help Section
const VoiceHelp: FC = () => (
  <div data-oid="nd12g1_">
    <h2
      className="text-xl font-bold text-red-400 mb-4 flex items-center"
      data-oid="t8wipp0"
    >
      <i className="fas fa-microphone mr-2" data-oid="3nax.19"></i> Voice
      Commands
    </h2>
    <p className="mb-4 text-gray-200" data-oid="v.od3zq">
      Control your STR8 BUILD app hands-free with voice commands - perfect for
      when your hands are dirty or busy on the job site.
    </p>

    <div className="space-y-4" data-oid="778mb-y">
      <div className="border-l-2 border-red-500 pl-4" data-oid="hiud-n_">
        <h3
          className="text-lg font-semibold text-white mb-2"
          data-oid="pzzlco9"
        >
          How to Use Voice Commands
        </h3>
        <ol
          className="list-decimal list-inside text-gray-300 space-y-2 ml-2"
          data-oid="fdpdscy"
        >
          <li className="pb-2" data-oid="8jiqbc.">
            <span className="font-medium text-white" data-oid="85wc8b3">
              Activate the voice listener
            </span>
            <p className="text-sm text-gray-400 ml-6 mt-1" data-oid="_z3x0vp">
              Click the microphone icon in the Professional Tools bar
            </p>
          </li>
          <li className="pb-2" data-oid="c7ot71p">
            <span className="font-medium text-white" data-oid="z_8a_hj">
              Wait for the "Listening" indicator
            </span>
            <p className="text-sm text-gray-400 ml-6 mt-1" data-oid=".fr_3ht">
              The microphone icon will pulse red when actively listening
            </p>
          </li>
          <li className="pb-2" data-oid="5g2:bzh">
            <span className="font-medium text-white" data-oid="5wipvu6">
              Speak a command clearly
            </span>
            <p className="text-sm text-gray-400 ml-6 mt-1" data-oid="i40c-9s">
              Say the name of the tool you want to open
            </p>
          </li>
          <li data-oid="ne638tg">
            <span className="font-medium text-white" data-oid="sukb5p-">
              The tool will open automatically
            </span>
            <p className="text-sm text-gray-400 ml-6 mt-1" data-oid="ncwx7g0">
              A confirmation toast will appear showing the recognized command
            </p>
          </li>
        </ol>
      </div>

      <div className="border-l-2 border-red-500 pl-4" data-oid="y.t:36e">
        <h3
          className="text-lg font-semibold text-white mb-2"
          data-oid="_vu1qhz"
        >
          Available Voice Commands
        </h3>
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2"
          data-oid="xzc.iv_"
        >
          <div className="bg-space-900/50 p-3 rounded-md" data-oid="0_u-x8q">
            <p className="font-medium text-red-300" data-oid="r3q.gsw">
              "Measure"
            </p>
            <p className="text-gray-300 text-sm" data-oid="f3jbpsx">
              Opens the Measure Tool
            </p>
          </div>
          <div className="bg-space-900/50 p-3 rounded-md" data-oid="0jn_n2p">
            <p className="font-medium text-red-300" data-oid="j5:0l77">
              "Level"
            </p>
            <p className="text-gray-300 text-sm" data-oid="jvtsm:-">
              Opens the Level Tool
            </p>
          </div>
          <div className="bg-space-900/50 p-3 rounded-md" data-oid="5iij8j-">
            <p className="font-medium text-red-300" data-oid="tzu:yc3">
              "Angle"
            </p>
            <p className="text-gray-300 text-sm" data-oid=".ws-fwm">
              Opens the Angle Tool
            </p>
          </div>
          <div className="bg-space-900/50 p-3 rounded-md" data-oid="kqha7zx">
            <p className="font-medium text-red-300" data-oid="vqwejm5">
              "Calculator" or "Calc"
            </p>
            <p className="text-gray-300 text-sm" data-oid="_zza8:h">
              Opens the Calculator Tool
            </p>
          </div>
          <div className="bg-space-900/50 p-3 rounded-md" data-oid="rl_ixzh">
            <p className="font-medium text-red-300" data-oid="x7:ehjg">
              "Camera" or "Cam"
            </p>
            <p className="text-gray-300 text-sm" data-oid=".37xb73">
              Opens the Project Camera
            </p>
          </div>
          <div className="bg-space-900/50 p-3 rounded-md" data-oid=".5i30-2">
            <p className="font-medium text-red-300" data-oid="3gzlvne">
              "Sound" or "Meter"
            </p>
            <p className="text-gray-300 text-sm" data-oid="k_ykha1">
              Opens the Sound Meter
            </p>
          </div>
        </div>
      </div>

      <div className="border-l-2 border-red-500 pl-4" data-oid="zgrwvca">
        <h3
          className="text-lg font-semibold text-white mb-2"
          data-oid="g:-oun0"
        >
          Tips for Best Results
        </h3>
        <ul
          className="list-disc list-inside text-gray-300 mt-2 ml-2 space-y-1"
          data-oid="2heh.7w"
        >
          <li data-oid="043ksv:">Speak clearly and at a normal volume</li>
          <li data-oid="b0ttqv4">Minimize background noise when possible</li>
          <li data-oid="cesn9qe">
            Hold your device within 2 feet when speaking
          </li>
          <li data-oid="gxbf6_-">
            Use Chrome or Edge browsers for best recognition
          </li>
          <li data-oid="i_lk._y">Allow microphone permissions when prompted</li>
        </ul>
      </div>
    </div>
  </div>
);

// Keyboard Shortcuts Help Section
const ShortcutsHelp: FC = () => (
  <div data-oid="r4pkl02">
    <h2
      className="text-xl font-bold text-yellow-400 mb-4 flex items-center"
      data-oid="_2agqct"
    >
      <i className="fas fa-keyboard mr-2" data-oid="vgf51rr"></i> Keyboard
      Shortcuts
    </h2>
    <p className="mb-4 text-gray-200" data-oid="6oqy9l3">
      Speed up your workflow with these time-saving keyboard shortcuts.
    </p>

    <div className="space-y-4" data-oid="n1030xc">
      <div className="border-l-2 border-yellow-500 pl-4" data-oid="xgyfm_h">
        <h3
          className="text-lg font-semibold text-white mb-2"
          data-oid="jq2e3nv"
        >
          Navigation Shortcuts
        </h3>
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3"
          data-oid="yh-lfaf"
        >
          <div className="bg-space-900/50 p-3 rounded-md" data-oid="x4s7vzv">
            <div
              className="flex justify-between items-center"
              data-oid="9q_drb0"
            >
              <span className="text-gray-300" data-oid="to4nnjb">
                Dashboard
              </span>
              <div className="flex space-x-1" data-oid="15xzdyh">
                <kbd
                  className="px-2 py-1 bg-space-800 text-gray-300 text-xs font-mono rounded"
                  data-oid="addm5:6"
                >
                  Alt
                </kbd>
                <kbd
                  className="px-2 py-1 bg-space-800 text-gray-300 text-xs font-mono rounded"
                  data-oid="1lm8z76"
                >
                  H
                </kbd>
              </div>
            </div>
          </div>
          <div className="bg-space-900/50 p-3 rounded-md" data-oid="a5:ml:b">
            <div
              className="flex justify-between items-center"
              data-oid="h.8no9k"
            >
              <span className="text-gray-300" data-oid="gcyo.81">
                Jobs
              </span>
              <div className="flex space-x-1" data-oid="31nsys4">
                <kbd
                  className="px-2 py-1 bg-space-800 text-gray-300 text-xs font-mono rounded"
                  data-oid="82ak_54"
                >
                  Alt
                </kbd>
                <kbd
                  className="px-2 py-1 bg-space-800 text-gray-300 text-xs font-mono rounded"
                  data-oid="jxw2bhy"
                >
                  J
                </kbd>
              </div>
            </div>
          </div>
          <div className="bg-space-900/50 p-3 rounded-md" data-oid="k5:u_8:">
            <div
              className="flex justify-between items-center"
              data-oid="7ke7wdl"
            >
              <span className="text-gray-300" data-oid="fsuewv6">
                Calculators
              </span>
              <div className="flex space-x-1" data-oid="vrmg407">
                <kbd
                  className="px-2 py-1 bg-space-800 text-gray-300 text-xs font-mono rounded"
                  data-oid="18ad3l9"
                >
                  Alt
                </kbd>
                <kbd
                  className="px-2 py-1 bg-space-800 text-gray-300 text-xs font-mono rounded"
                  data-oid="m144m30"
                >
                  C
                </kbd>
              </div>
            </div>
          </div>
          <div className="bg-space-900/50 p-3 rounded-md" data-oid="7auhv:i">
            <div
              className="flex justify-between items-center"
              data-oid="tc_as3v"
            >
              <span className="text-gray-300" data-oid="s0j6bo:">
                Finance
              </span>
              <div className="flex space-x-1" data-oid="q660ka9">
                <kbd
                  className="px-2 py-1 bg-space-800 text-gray-300 text-xs font-mono rounded"
                  data-oid="uvm7j7g"
                >
                  Alt
                </kbd>
                <kbd
                  className="px-2 py-1 bg-space-800 text-gray-300 text-xs font-mono rounded"
                  data-oid=".3k.5jm"
                >
                  F
                </kbd>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-l-2 border-yellow-500 pl-4" data-oid="okrvx56">
        <h3
          className="text-lg font-semibold text-white mb-2"
          data-oid="o9fd0df"
        >
          Tool Shortcuts
        </h3>
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3"
          data-oid="mb.1bmo"
        >
          <div className="bg-space-900/50 p-3 rounded-md" data-oid="mmm6ou3">
            <div
              className="flex justify-between items-center"
              data-oid="9nokl_8"
            >
              <span className="text-gray-300" data-oid="tyvbhon">
                Measure Tool
              </span>
              <div className="flex space-x-1" data-oid="zsfrg50">
                <kbd
                  className="px-2 py-1 bg-space-800 text-gray-300 text-xs font-mono rounded"
                  data-oid="jho9.w-"
                >
                  Ctrl
                </kbd>
                <kbd
                  className="px-2 py-1 bg-space-800 text-gray-300 text-xs font-mono rounded"
                  data-oid="54eb14w"
                >
                  M
                </kbd>
              </div>
            </div>
          </div>
          <div className="bg-space-900/50 p-3 rounded-md" data-oid="f8z4ty4">
            <div
              className="flex justify-between items-center"
              data-oid="qdi1irr"
            >
              <span className="text-gray-300" data-oid="18ul751">
                Calculator
              </span>
              <div className="flex space-x-1" data-oid="4ul35._">
                <kbd
                  className="px-2 py-1 bg-space-800 text-gray-300 text-xs font-mono rounded"
                  data-oid="vlvm2gr"
                >
                  Ctrl
                </kbd>
                <kbd
                  className="px-2 py-1 bg-space-800 text-gray-300 text-xs font-mono rounded"
                  data-oid="q96z556"
                >
                  C
                </kbd>
              </div>
            </div>
          </div>
          <div className="bg-space-900/50 p-3 rounded-md" data-oid="xp0qofk">
            <div
              className="flex justify-between items-center"
              data-oid="x5n50t7"
            >
              <span className="text-gray-300" data-oid="dc5.4yq">
                Camera
              </span>
              <div className="flex space-x-1" data-oid="sawt6e6">
                <kbd
                  className="px-2 py-1 bg-space-800 text-gray-300 text-xs font-mono rounded"
                  data-oid="e.s_q8s"
                >
                  Ctrl
                </kbd>
                <kbd
                  className="px-2 py-1 bg-space-800 text-gray-300 text-xs font-mono rounded"
                  data-oid="ej5giib"
                >
                  P
                </kbd>
              </div>
            </div>
          </div>
          <div className="bg-space-900/50 p-3 rounded-md" data-oid="hsyzco5">
            <div
              className="flex justify-between items-center"
              data-oid="69ep.p2"
            >
              <span className="text-gray-300" data-oid="a0z_706">
                Level Tool
              </span>
              <div className="flex space-x-1" data-oid="4o_wof:">
                <kbd
                  className="px-2 py-1 bg-space-800 text-gray-300 text-xs font-mono rounded"
                  data-oid=":a5w654"
                >
                  Ctrl
                </kbd>
                <kbd
                  className="px-2 py-1 bg-space-800 text-gray-300 text-xs font-mono rounded"
                  data-oid="vh8xx54"
                >
                  L
                </kbd>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-l-2 border-yellow-500 pl-4" data-oid="du0479b">
        <h3
          className="text-lg font-semibold text-white mb-2"
          data-oid=":9df7l5"
        >
          Job Timer Controls
        </h3>
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3"
          data-oid="y0qgn49"
        >
          <div className="bg-space-900/50 p-3 rounded-md" data-oid="tn.jiwp">
            <div
              className="flex justify-between items-center"
              data-oid="0nfcqvt"
            >
              <span className="text-gray-300" data-oid="-onu_:f">
                Start/Stop Timer
              </span>
              <div className="flex space-x-1" data-oid="joepmaj">
                <kbd
                  className="px-2 py-1 bg-space-800 text-gray-300 text-xs font-mono rounded"
                  data-oid="3qsl8q3"
                >
                  F2
                </kbd>
              </div>
            </div>
          </div>
          <div className="bg-space-900/50 p-3 rounded-md" data-oid="r.ryh4g">
            <div
              className="flex justify-between items-center"
              data-oid="mqxg7fd"
            >
              <span className="text-gray-300" data-oid="m75mjfs">
                Reset Timer
              </span>
              <div className="flex space-x-1" data-oid="i_0uxbz">
                <kbd
                  className="px-2 py-1 bg-space-800 text-gray-300 text-xs font-mono rounded"
                  data-oid="sgo7zz-"
                >
                  Shift
                </kbd>
                <kbd
                  className="px-2 py-1 bg-space-800 text-gray-300 text-xs font-mono rounded"
                  data-oid="1bvm1tw"
                >
                  F2
                </kbd>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// FAQ Help Section
const FAQHelp: FC = () => (
  <div data-oid="oyag_0j">
    <h2
      className="text-xl font-bold text-orange-400 mb-4 flex items-center"
      data-oid="lhi-3g9"
    >
      <i className="fas fa-question-circle mr-2" data-oid="c3ujxfk"></i>{" "}
      Frequently Asked Questions
    </h2>
    <p className="mb-4 text-gray-200" data-oid="b75ma6a">
      Quick answers to common questions about using the STR8 BUILD app.
    </p>

    <div className="space-y-6 mt-6" data-oid="rb:_joc">
      <div
        className="bg-space-900/30 rounded-lg overflow-hidden border border-space-700/50"
        data-oid="ohkc6_m"
      >
        <div
          className="bg-space-800/50 px-4 py-3 border-b border-space-700/50"
          data-oid="4b0voz-"
        >
          <h3 className="font-semibold text-orange-300" data-oid="5gy2-4s">
            How do I track time for different projects?
          </h3>
        </div>
        <div className="p-4 text-gray-300" data-oid=".0hz08o">
          <p data-oid="2d6y7-b">
            Use the Job Timer on the Dashboard to track time for any project.
            Select the project from the dropdown menu before starting the timer.
            All time entries are automatically saved to your timesheet and can
            be reviewed later in the Finance section.
          </p>
        </div>
      </div>

      <div
        className="bg-space-900/30 rounded-lg overflow-hidden border border-space-700/50"
        data-oid="kd3l5hx"
      >
        <div
          className="bg-space-800/50 px-4 py-3 border-b border-space-700/50"
          data-oid="l8vp7vv"
        >
          <h3 className="font-semibold text-orange-300" data-oid="5a2erok">
            Can I use the app offline?
          </h3>
        </div>
        <div className="p-4 text-gray-300" data-oid="k51u68t">
          <p data-oid="aimx76_">
            Yes, many features of STR8 BUILD work offline. Time tracking,
            calculators, and measurement tools function without an internet
            connection. Your data will sync automatically when you're back
            online.
          </p>
        </div>
      </div>

      <div
        className="bg-space-900/30 rounded-lg overflow-hidden border border-space-700/50"
        data-oid="_jo2rra"
      >
        <div
          className="bg-space-800/50 px-4 py-3 border-b border-space-700/50"
          data-oid="0htp9aq"
        >
          <h3 className="font-semibold text-orange-300" data-oid="uu_l84g">
            How do I create and send invoices to clients?
          </h3>
        </div>
        <div className="p-4 text-gray-300" data-oid="lojd64h">
          <p data-oid="x7m680d">
            Navigate to the Finance section and select the Invoices tab. Click
            "Create New Invoice" and select the client and project. Add line
            items for labor (pulled from your timesheet) and materials. Preview
            the invoice, then send it directly via email or download as a PDF.
          </p>
        </div>
      </div>

      <div
        className="bg-space-900/30 rounded-lg overflow-hidden border border-space-700/50"
        data-oid="or2qpt7"
      >
        <div
          className="bg-space-800/50 px-4 py-3 border-b border-space-700/50"
          data-oid="6ssfm1."
        >
          <h3 className="font-semibold text-orange-300" data-oid="z1178w2">
            How accurate are the measurement tools?
          </h3>
        </div>
        <div className="p-4 text-gray-300" data-oid="bl3b:4_">
          <p data-oid="qovxn4.">
            The accuracy of the Measure Tool depends on proper calibration. Use
            a known reference object (like a dollar bill) to calibrate before
            taking measurements. The Level Tool uses your device's sensors and
            is accurate to within 0.1 degrees when properly calibrated.
          </p>
        </div>
      </div>

      <div
        className="bg-space-900/30 rounded-lg overflow-hidden border border-space-700/50"
        data-oid="d6kzino"
      >
        <div
          className="bg-space-800/50 px-4 py-3 border-b border-space-700/50"
          data-oid="omb0yka"
        >
          <h3 className="font-semibold text-orange-300" data-oid="56o4zu7">
            Can I share projects with my team members?
          </h3>
        </div>
        <div className="p-4 text-gray-300" data-oid="6l659xf">
          <p data-oid="c63iply">
            Yes, STR8 BUILD supports team collaboration. In the Jobs section,
            open any project and click the "Share" button. You can invite team
            members by email and set their permission levels (view only, edit,
            or admin).
          </p>
        </div>
      </div>
    </div>

    <div
      className="mt-8 p-4 bg-cyan-900/20 rounded-lg border border-cyan-700/30"
      data-oid="ss48ya6"
    >
      <div className="flex items-start" data-oid="5hd3vqy">
        <div className="flex-shrink-0 pt-1" data-oid="_aamrjz">
          <i
            className="fas fa-headset text-cyan-400 text-xl"
            data-oid="t90f6m2"
          ></i>
        </div>
        <div className="ml-4" data-oid="5katu7o">
          <h3 className="font-semibold text-white" data-oid="s4ogn4e">
            Need more help?
          </h3>
          <p className="text-gray-300 mt-1" data-oid="6u:z0df">
            Our support team is available Monday-Friday, 8am-6pm.
          </p>
          <div className="mt-3 flex space-x-4" data-oid="c_8sjpz">
            <button
              className="text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1"
              data-oid="r6_gl.n"
            >
              <i className="fas fa-envelope" data-oid="z.xx963"></i>
              <span data-oid="3.hjh-j">Email Support</span>
            </button>
            <button
              className="text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1"
              data-oid="z2:xfze"
            >
              <i className="fas fa-phone" data-oid="yqpn4yz"></i>
              <span data-oid="r9tay4t">Call Us</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Help;
