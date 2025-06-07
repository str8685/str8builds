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
        return <DashboardHelp data-oid="oq_189p" />;
      case "tools":
        return <ToolsHelp data-oid="z773tfk" />;
      case "calculator":
        return <CalculatorHelp data-oid="71q102i" />;
      case "resources":
        return <ResourcesHelp data-oid="5ygfmdn" />;
      case "jobs":
        return <JobsHelp data-oid="7u9a28r" />;
      case "finance":
        return <FinanceHelp data-oid="t1utbat" />;
      case "voice":
        return <VoiceHelp data-oid="r5b5817" />;
      case "shortcuts":
        return <ShortcutsHelp data-oid="wbnu_uu" />;
      case "faq":
        return <FAQHelp data-oid="up9_slz" />;
      default:
        return <DashboardHelp data-oid="a7pnb0x" />;
    }
  };

  return (
    <div
      className="container mx-auto py-4 px-3 sm:py-6 sm:px-4 max-w-7xl"
      data-oid="xkhgb8r"
    >
      <motion.div
        className="mb-4 sm:mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        data-oid="nt.46:r"
      >
        <div
          className="flex flex-col sm:flex-row items-center mb-2"
          data-oid="g-_7.5x"
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
            data-oid="jppdnrb"
          >
            <i
              className="fas fa-cog text-2xl sm:text-3xl"
              data-oid="5sgj9h4"
            ></i>
          </motion.div>
          <h1
            className="text-2xl sm:text-3xl text-center sm:text-left font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent"
            data-oid="8p2ce5l"
          >
            STR8 BUILD App Manual
          </h1>
        </div>
        <p
          className="text-gray-300 text-center sm:text-left ml-0 sm:ml-10 text-sm sm:text-base"
          data-oid="zcsjjb8"
        >
          Your comprehensive guide to maximizing productivity with your
          construction management app
        </p>

        {/* Search bar */}
        <div className="mt-4 ml-0 sm:ml-10 relative" data-oid="58xq230">
          <div
            className="relative max-w-full sm:max-w-md mx-auto sm:mx-0"
            data-oid="-8bd43z"
          >
            <input
              type="text"
              placeholder="Search for features..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full bg-space-900/60 border border-space-700 rounded-md py-2 pl-10 pr-4 text-sm sm:text-base text-gray-300 focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500"
              data-oid="uk_lvz5"
            />

            <div
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              data-oid="_gpvamc"
            >
              <i className="fas fa-search" data-oid="jahyudr"></i>
            </div>
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setShowSearchResults(false);
                }}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200"
                data-oid="em686yb"
              >
                <i className="fas fa-times" data-oid="3tf-83c"></i>
              </button>
            )}
          </div>

          {/* Search results dropdown */}
          <AnimatePresence data-oid=":.uc4hj">
            {showSearchResults && searchResults.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute z-10 mt-2 w-full max-w-md bg-space-900 border border-space-700 rounded-md shadow-lg overflow-hidden"
                data-oid="lnzda5."
              >
                <div className="max-h-60 overflow-y-auto" data-oid="uwtdxsh">
                  {searchResults.map((result, index) => (
                    <button
                      key={index}
                      onClick={() => handleResultClick(result.section)}
                      className="w-full text-left px-4 py-2 hover:bg-space-800 flex items-center space-x-2"
                      data-oid=".x75kxs"
                    >
                      <i
                        className={`fas fa-${sections.find((s) => s.id === result.section)?.icon} text-${sections.find((s) => s.id === result.section)?.color}-400`}
                        data-oid="je0y14y"
                      ></i>
                      <span className="text-gray-300" data-oid="0d47gyj">
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
        data-oid="f99qx8b"
      >
        <motion.div
          className="flex space-x-3 min-w-max"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          data-oid="qlm7-4l"
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
              data-oid="3udz9fc"
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
                data-oid="8lm7d-_"
              >
                <i
                  className={`fas fa-${section.icon} text-xs`}
                  data-oid="pmxx360"
                ></i>
              </div>
              <span data-oid="cf94fif">{section.title}</span>
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
        data-oid="oopuf-l"
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
            data-oid="s69v3mf"
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
              data-oid="-n1lx7m"
            >
              <i className={`fas fa-${section.icon}`} data-oid="funcrjj"></i>
            </div>
            <span data-oid="1bftxsw">{section.title}</span>
          </motion.button>
        ))}
      </motion.div>

      {/* Content area */}
      <GlassCard
        className="p-3 sm:p-6 shadow-xl shadow-cyan-500/5 border-t border-cyan-500/20"
        data-oid="-cqaz2f"
      >
        <AnimatePresence mode="wait" data-oid="bxnr-ei">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            data-oid="2:r5mlz"
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
          data-oid="-03sojg"
        >
          <div
            className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0"
            data-oid="k7x-oxi"
          >
            <div className="text-sm text-gray-400" data-oid="ew5vadx">
              <Link
                href="/"
                className="text-cyan-400 hover:underline inline-flex items-center gap-1"
                data-oid="-hd1tm:"
              >
                <i className="fas fa-home text-xs" data-oid="15to-:j"></i>
                <span data-oid="ev3l28c">Back to Dashboard</span>
              </Link>
            </div>
            <div
              className="flex space-x-4 sm:space-x-6 text-xs sm:text-sm"
              data-oid="lb8wjfe"
            >
              <button
                onClick={() => window.print()}
                className="text-gray-400 hover:text-cyan-400 flex items-center gap-1"
                data-oid="vmihu-y"
              >
                <i className="fas fa-print" data-oid="r2cxeln"></i>
                <span data-oid="gug:285">Print Manual</span>
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
                data-oid="ara_60m"
              >
                <i className="fas fa-comment" data-oid="gcq802q"></i>
                <span data-oid="qphdxok">Send Feedback</span>
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
  <div data-oid="fajoa48">
    <h2
      className="text-xl font-bold text-blue-400 mb-4 flex items-center"
      data-oid="fvpn8ve"
    >
      <i className="fas fa-home mr-2" data-oid="x3ppphh"></i> Dashboard
    </h2>
    <p className="mb-4 text-gray-200" data-oid="ec1pm8l">
      The Dashboard is your command center for managing all aspects of your
      construction business.
    </p>

    <div className="space-y-4" data-oid="96seos0">
      <div className="border-l-2 border-blue-500 pl-4" data-oid="7stmg8j">
        <h3
          className="text-lg font-semibold text-white mb-2"
          data-oid="cgmlkz6"
        >
          Professional Tools Bar
        </h3>
        <p className="text-gray-300" data-oid="rltt2qq">
          Located at the top of your dashboard, the Professional Tools bar
          provides quick access to essential construction tools:
        </p>
        <ul
          className="list-disc list-inside text-gray-300 mt-2 ml-4 space-y-1"
          data-oid="uu9c9k1"
        >
          <li data-oid="j-l8l4c">
            <span className="text-cyan-400" data-oid=".-tnlqp">
              Measure Tool
            </span>{" "}
            - For precise measurements with calibration
          </li>
          <li data-oid="j48ojfx">
            <span className="text-cyan-400" data-oid="p6wahgs">
              Level Tool
            </span>{" "}
            - Digital bubble level for perfect alignment
          </li>
          <li data-oid="l3wr6p2">
            <span className="text-cyan-400" data-oid="dn14oir">
              Angle Tool
            </span>{" "}
            - Measures angles for precise construction work
          </li>
          <li data-oid="ayyt3d9">
            <span className="text-cyan-400" data-oid="jszjkf9">
              Calculator
            </span>{" "}
            - Construction-specific calculations
          </li>
          <li data-oid="a1mzj8z">
            <span className="text-cyan-400" data-oid="ohw:jr6">
              Project Cam
            </span>{" "}
            - Document your projects with photos
          </li>
          <li data-oid="jftlp:d">
            <span className="text-cyan-400" data-oid="cywv_bo">
              Sound Meter
            </span>{" "}
            - Measure job site noise levels
          </li>
        </ul>
      </div>

      <div className="border-l-2 border-blue-500 pl-4" data-oid="74t3mv-">
        <h3
          className="text-lg font-semibold text-white mb-2"
          data-oid=":h9uh28"
        >
          Job Timer
        </h3>
        <p className="text-gray-300" data-oid="_-7qc-p">
          Track your time on projects with start/pause functionality. All time
          entries are automatically saved to the timesheet for billing.
        </p>
      </div>

      <div className="border-l-2 border-blue-500 pl-4" data-oid="t8m_k9s">
        <h3
          className="text-lg font-semibold text-white mb-2"
          data-oid="drmp96:"
        >
          Weather Widgets
        </h3>
        <p className="text-gray-300" data-oid="mwz25n9">
          View current weather conditions and forecasts to plan your work
          accordingly.
        </p>
      </div>

      <div className="border-l-2 border-blue-500 pl-4" data-oid="t_bqpuu">
        <h3
          className="text-lg font-semibold text-white mb-2"
          data-oid="5yufmwn"
        >
          Quick Access Cards
        </h3>
        <p className="text-gray-300" data-oid="sfejbca">
          The dashboard contains cards for Active Projects, Pending Invoices,
          and Recent Time Entries for at-a-glance business management.
        </p>
      </div>
    </div>
  </div>
);

// Tools Help Section
const ToolsHelp: FC = () => (
  <div data-oid="ru57yl0">
    <h2
      className="text-xl font-bold text-cyan-400 mb-4 flex items-center"
      data-oid="jr_a788"
    >
      <i className="fas fa-tools mr-2" data-oid="8-fxt:7"></i> Professional
      Tools
    </h2>
    <p className="mb-4 text-gray-200" data-oid="uw49ek3">
      STR8 BUILD provides a comprehensive suite of professional construction
      tools to make your job easier.
    </p>

    <div className="space-y-6" data-oid="i_2ko9k">
      <div className="border-l-2 border-cyan-500 pl-4" data-oid="7c5p00t">
        <h3
          className="text-lg font-semibold text-white mb-2"
          data-oid="8-o6.jv"
        >
          Measure Tool
        </h3>
        <p className="text-gray-300 mb-2" data-oid="bwl527m">
          A precision measurement tool that allows you to measure distances
          directly on your device.
        </p>
        <div className="bg-space-900/50 p-3 rounded-md" data-oid="2ognp9q">
          <h4 className="font-medium text-cyan-300 mb-1" data-oid="qk:n897">
            How to Use:
          </h4>
          <ol
            className="list-decimal list-inside text-gray-300 space-y-1 ml-2"
            data-oid="dodiini"
          >
            <li data-oid="t.5ys1_">
              Open the Measure Tool from the Professional Tools bar
            </li>
            <li data-oid="havmau.">
              Calibrate the tool using a known reference (like a dollar bill)
            </li>
            <li data-oid="zxc8c:r">
              Tap to place start and end points for measurement
            </li>
            <li data-oid="5u9gt6s">
              View accurate measurements in your preferred units (in/cm)
            </li>
          </ol>
        </div>
      </div>

      <div className="border-l-2 border-cyan-500 pl-4" data-oid="wjuo9x2">
        <h3
          className="text-lg font-semibold text-white mb-2"
          data-oid="bwvgcdn"
        >
          Level Tool
        </h3>
        <p className="text-gray-300 mb-2" data-oid=".-y9rgs">
          A digital bubble level that uses your device's sensors to check if
          surfaces are perfectly level.
        </p>
        <div className="bg-space-900/50 p-3 rounded-md" data-oid="5.ue4i.">
          <h4 className="font-medium text-cyan-300 mb-1" data-oid="2sg5uea">
            How to Use:
          </h4>
          <ol
            className="list-decimal list-inside text-gray-300 space-y-1 ml-2"
            data-oid="e31uom-"
          >
            <li data-oid="6sl74n7">
              Open the Level Tool from the Professional Tools bar
            </li>
            <li data-oid="22dfzd1">
              Place your device against the surface you want to level
            </li>
            <li data-oid="eoh4n4e">
              The digital bubble will show you the exact degree of tilt
            </li>
            <li data-oid="2q1b7p3">
              When perfectly level, the display will turn green
            </li>
          </ol>
        </div>
      </div>

      <div className="border-l-2 border-cyan-500 pl-4" data-oid="5kni_8y">
        <h3
          className="text-lg font-semibold text-white mb-2"
          data-oid="cay4fg-"
        >
          Angle Tool
        </h3>
        <p className="text-gray-300 mb-2" data-oid="mq_aay6">
          Measure angles between two lines for precise construction work.
        </p>
        <div className="bg-space-900/50 p-3 rounded-md" data-oid=":olp2-8">
          <h4 className="font-medium text-cyan-300 mb-1" data-oid="q:as448">
            How to Use:
          </h4>
          <ol
            className="list-decimal list-inside text-gray-300 space-y-1 ml-2"
            data-oid="w8j6pnu"
          >
            <li data-oid="itopp89">
              Open the Angle Tool from the Professional Tools bar
            </li>
            <li data-oid="ec75s7b">
              Tap to place the center point of your angle
            </li>
            <li data-oid="m6ukdt8">
              Tap to place the first and second points of your angle
            </li>
            <li data-oid="l6uuxdf">
              View the precise angle measurement in degrees
            </li>
          </ol>
        </div>
      </div>

      <div className="border-l-2 border-cyan-500 pl-4" data-oid="nxfhx4m">
        <h3
          className="text-lg font-semibold text-white mb-2"
          data-oid="q:bi5n6"
        >
          Calculator Tool
        </h3>
        <p className="text-gray-300 mb-2" data-oid="q3fw_d_">
          A specialized calculator with construction-specific calculations for
          area, volume, and material estimates.
        </p>
        <div className="bg-space-900/50 p-3 rounded-md" data-oid="fiyq.kl">
          <h4 className="font-medium text-cyan-300 mb-1" data-oid="y6liesb">
            Key Features:
          </h4>
          <ul
            className="list-disc list-inside text-gray-300 space-y-1 ml-2"
            data-oid="lqkwv3_"
          >
            <li data-oid="0s0n_-4">Standard calculator functions</li>
            <li data-oid="582q4.w">Area calculations (square footage)</li>
            <li data-oid="5pc92a4">Volume calculations (cubic yards)</li>
            <li data-oid="ew0i7m_">Material cost estimations</li>
            <li data-oid="x0hd6yw">
              Conversion between imperial and metric units
            </li>
          </ul>
        </div>
      </div>

      <div className="border-l-2 border-cyan-500 pl-4" data-oid="vm6vh3m">
        <h3
          className="text-lg font-semibold text-white mb-2"
          data-oid="3go-z-c"
        >
          Project Cam
        </h3>
        <p className="text-gray-300 mb-2" data-oid="_wltlhh">
          Document your projects with photos that are automatically saved to
          your project files.
        </p>
        <div className="bg-space-900/50 p-3 rounded-md" data-oid="ul02dg6">
          <h4 className="font-medium text-cyan-300 mb-1" data-oid="1cem64n">
            Key Features:
          </h4>
          <ul
            className="list-disc list-inside text-gray-300 space-y-1 ml-2"
            data-oid="nbx8pen"
          >
            <li data-oid="o9y.x2c">Take photos with your device camera</li>
            <li data-oid="eowd:4e">
              Auto-assign photos to current active project
            </li>
            <li data-oid="ej::6wd">Add notes or annotations to photos</li>
            <li data-oid="0ym5egk">View photo history for each project</li>
          </ul>
        </div>
      </div>

      <div className="border-l-2 border-cyan-500 pl-4" data-oid=".-oyf5c">
        <h3
          className="text-lg font-semibold text-white mb-2"
          data-oid=":.q3geb"
        >
          Sound Meter
        </h3>
        <p className="text-gray-300 mb-2" data-oid="6u_6_69">
          Measure job site noise levels to ensure safety compliance.
        </p>
        <div className="bg-space-900/50 p-3 rounded-md" data-oid="trs0s5u">
          <h4 className="font-medium text-cyan-300 mb-1" data-oid="0pl.w1z">
            Key Features:
          </h4>
          <ul
            className="list-disc list-inside text-gray-300 space-y-1 ml-2"
            data-oid="294983u"
          >
            <li data-oid="su9wk9a">Real-time decibel level measurement</li>
            <li data-oid="xci10zd">Safety threshold indicators</li>
            <li data-oid="3:i7tbj">Recording of peak noise levels</li>
            <li data-oid="ejul05p">OSHA compliance guidelines</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
);

// Calculator Help Section
const CalculatorHelp: FC = () => (
  <div data-oid="uhppyd4">
    <h2
      className="text-xl font-bold text-teal-400 mb-4 flex items-center"
      data-oid="on_5:bf"
    >
      <i className="fas fa-calculator mr-2" data-oid="yle0-fz"></i> Calculators
    </h2>
    <p className="mb-4 text-gray-200" data-oid="3-u8jtu">
      Access specialized construction calculators to make complex calculations
      simple.
    </p>

    <div className="space-y-4" data-oid=":ffo7l2">
      <div className="border-l-2 border-teal-500 pl-4" data-oid=".3dv-o9">
        <h3
          className="text-lg font-semibold text-white mb-2"
          data-oid="k8r0jwr"
        >
          Material Calculators
        </h3>
        <p className="text-gray-300" data-oid="md:t0qk">
          Calculate material quantities for concrete, lumber, paint, and more
          based on your project dimensions.
        </p>
        <ul
          className="list-disc list-inside text-gray-300 mt-2 ml-4"
          data-oid="fabiv7c"
        >
          <li data-oid="qmjw95g">
            Concrete Calculator - cubic yards needed based on dimensions
          </li>
          <li data-oid="9heifzy">
            Paint Calculator - gallons needed based on wall area
          </li>
          <li data-oid="jd-om8e">
            Flooring Calculator - square footage with waste factor
          </li>
        </ul>
      </div>

      <div className="border-l-2 border-teal-500 pl-4" data-oid="t7fzzez">
        <h3
          className="text-lg font-semibold text-white mb-2"
          data-oid="xkud718"
        >
          Cost Estimators
        </h3>
        <p className="text-gray-300" data-oid="uzi7qjb">
          Estimate project costs based on materials, labor, and other factors.
        </p>
        <ul
          className="list-disc list-inside text-gray-300 mt-2 ml-4"
          data-oid="-u5.:5c"
        >
          <li data-oid="a:9x_2c">
            Labor Cost Calculator - estimate hours and rates
          </li>
          <li data-oid="o23c36-">
            Project Cost Calculator - comprehensive estimation
          </li>
          <li data-oid="arouuve">
            Markup Calculator - determine pricing with profit margins
          </li>
        </ul>
      </div>

      <div className="border-l-2 border-teal-500 pl-4" data-oid="r4d24_s">
        <h3
          className="text-lg font-semibold text-white mb-2"
          data-oid="0dyo5w7"
        >
          Conversion Tools
        </h3>
        <p className="text-gray-300" data-oid="4owex00">
          Convert between different units of measurement commonly used in
          construction.
        </p>
        <ul
          className="list-disc list-inside text-gray-300 mt-2 ml-4"
          data-oid="rgoit56"
        >
          <li data-oid="49:v0c1">
            Length Converter - between inches, feet, meters, etc.
          </li>
          <li data-oid="p16s6m5">
            Area Converter - between square feet, square meters, acres, etc.
          </li>
          <li data-oid="7hrubs5">
            Volume Converter - between cubic feet, cubic yards, gallons, etc.
          </li>
        </ul>
      </div>
    </div>
  </div>
);

// Resources Help Section
const ResourcesHelp: FC = () => (
  <div data-oid="eguna7m">
    <h2
      className="text-xl font-bold text-indigo-400 mb-4 flex items-center"
      data-oid="kida537"
    >
      <i className="fas fa-book mr-2" data-oid="76.4nsc"></i> Resources
    </h2>
    <p className="mb-4 text-gray-200" data-oid="0aquanf">
      Access valuable resources to enhance your construction knowledge and
      efficiency.
    </p>

    <div className="space-y-4" data-oid="i11k2oq">
      <div className="border-l-2 border-indigo-500 pl-4" data-oid="d2arurl">
        <h3
          className="text-lg font-semibold text-white mb-2"
          data-oid="xxqce70"
        >
          Reference Materials
        </h3>
        <p className="text-gray-300" data-oid="az94636">
          Access building codes, safety regulations, and technical
          specifications.
        </p>
      </div>

      <div className="border-l-2 border-indigo-500 pl-4" data-oid="k43tnto">
        <h3
          className="text-lg font-semibold text-white mb-2"
          data-oid="e2k8csy"
        >
          Tutorials
        </h3>
        <p className="text-gray-300" data-oid="pgoppyo">
          Step-by-step guides for construction techniques and best practices.
        </p>
      </div>

      <div className="border-l-2 border-indigo-500 pl-4" data-oid="5_lk600">
        <h3
          className="text-lg font-semibold text-white mb-2"
          data-oid="_4:9th7"
        >
          Supplier Directory
        </h3>
        <p className="text-gray-300" data-oid="fuuh-5w">
          Find local suppliers for materials and equipment, with contact
          information and pricing.
        </p>
      </div>

      <div className="border-l-2 border-indigo-500 pl-4" data-oid="a0wb._w">
        <h3
          className="text-lg font-semibold text-white mb-2"
          data-oid="ti3pzqp"
        >
          Material Data Sheets
        </h3>
        <p className="text-gray-300" data-oid="s64mwqc">
          Technical specifications and safety information for common
          construction materials.
        </p>
      </div>
    </div>
  </div>
);

// Jobs Help Section
const JobsHelp: FC = () => (
  <div data-oid="rla0c5h">
    <h2
      className="text-xl font-bold text-purple-400 mb-4 flex items-center"
      data-oid="gb8gkmt"
    >
      <i className="fas fa-briefcase mr-2" data-oid="3-6da_u"></i> Jobs
      Management
    </h2>
    <p className="mb-4 text-gray-200" data-oid="qinhl3p">
      Manage all your construction projects, clients, and job details in one
      place.
    </p>

    <div className="space-y-4" data-oid="knezhia">
      <div className="border-l-2 border-purple-500 pl-4" data-oid="lgahycx">
        <h3
          className="text-lg font-semibold text-white mb-2"
          data-oid="2o83r-d"
        >
          Projects
        </h3>
        <p className="text-gray-300" data-oid="8x0wk9k">
          Create and manage construction projects with comprehensive details.
        </p>
        <div className="bg-space-900/50 p-3 rounded-md mt-2" data-oid="nwq6qkt">
          <h4 className="font-medium text-purple-300 mb-1" data-oid="7x6n6_m">
            Key Features:
          </h4>
          <ul
            className="list-disc list-inside text-gray-300 space-y-1 ml-2"
            data-oid="6_3jnw6"
          >
            <li data-oid="43ocg1e">
              Create new projects with detailed information
            </li>
            <li data-oid="q.vz:z.">Track project status and timeline</li>
            <li data-oid="k91g1uc">Assign tasks and responsibilities</li>
            <li data-oid="t4gsn_8">Upload and manage project documents</li>
            <li data-oid="xq47p.4">Log project notes and updates</li>
          </ul>
        </div>
      </div>

      <div className="border-l-2 border-purple-500 pl-4" data-oid="qywq4l9">
        <h3
          className="text-lg font-semibold text-white mb-2"
          data-oid="mctw4ng"
        >
          Clients
        </h3>
        <p className="text-gray-300" data-oid="9euqioq">
          Manage client information, contact details, and project history.
        </p>
        <div className="bg-space-900/50 p-3 rounded-md mt-2" data-oid="qrtg090">
          <h4 className="font-medium text-purple-300 mb-1" data-oid="6frd57r">
            Key Features:
          </h4>
          <ul
            className="list-disc list-inside text-gray-300 space-y-1 ml-2"
            data-oid="79wfv47"
          >
            <li data-oid="j_dhyva">Add and manage client profiles</li>
            <li data-oid="c3re2p:">Track client communication history</li>
            <li data-oid="vt5-b2c">
              View all projects associated with each client
            </li>
            <li data-oid="ixs9n_l">Manage client documents and contracts</li>
          </ul>
        </div>
      </div>

      <div className="border-l-2 border-purple-500 pl-4" data-oid="4n7ct2h">
        <h3
          className="text-lg font-semibold text-white mb-2"
          data-oid="bdeaq1i"
        >
          Job Site Details
        </h3>
        <p className="text-gray-300" data-oid="zv9rkjo">
          Document job site information, conditions, and requirements.
        </p>
        <div className="bg-space-900/50 p-3 rounded-md mt-2" data-oid="0wzsn2i">
          <h4 className="font-medium text-purple-300 mb-1" data-oid="7sk3zc8">
            Tracked Information:
          </h4>
          <ul
            className="list-disc list-inside text-gray-300 space-y-1 ml-2"
            data-oid="jvxwd1w"
          >
            <li data-oid="f6ws8zz">Site address and access information</li>
            <li data-oid="bgzzaxk">Site conditions and limitations</li>
            <li data-oid="a2so2dx">Required permits and inspections</li>
            <li data-oid="4sxrc9n">Safety considerations and requirements</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
);

// Finance Help Section
const FinanceHelp: FC = () => (
  <div data-oid="qtf685s">
    <h2
      className="text-xl font-bold text-green-400 mb-4 flex items-center"
      data-oid="dj-bn0o"
    >
      <i className="fas fa-dollar-sign mr-2" data-oid=":rnxc8w"></i> Finance
    </h2>
    <p className="mb-4 text-gray-200" data-oid="t-qh-_l">
      Manage your construction business finances with invoicing and time
      tracking tools.
    </p>

    <div className="space-y-4" data-oid="3vgglk-">
      <div className="border-l-2 border-green-500 pl-4" data-oid="rsrlrxo">
        <h3
          className="text-lg font-semibold text-white mb-2"
          data-oid="xvd5:5q"
        >
          Invoices
        </h3>
        <p className="text-gray-300" data-oid="66tdfk.">
          Create, send, and track professional invoices for your construction
          projects.
        </p>
        <div className="bg-space-900/50 p-3 rounded-md mt-2" data-oid="i327a6k">
          <h4 className="font-medium text-green-300 mb-1" data-oid="uv-6nl9">
            Key Features:
          </h4>
          <ul
            className="list-disc list-inside text-gray-300 space-y-1 ml-2"
            data-oid="0lbjz5:"
          >
            <li data-oid="c-nl2cg">Generate itemized invoices for projects</li>
            <li data-oid="t--ju0w">
              Track payment status (pending, paid, overdue)
            </li>
            <li data-oid="uwsa8yj">Send automatic payment reminders</li>
            <li data-oid="96z6x8w">
              Accept online payments through integrations
            </li>
            <li data-oid="on3ywz4">
              Generate financial reports for accounting
            </li>
          </ul>
        </div>
      </div>

      <div className="border-l-2 border-green-500 pl-4" data-oid="ir6lq5:">
        <h3
          className="text-lg font-semibold text-white mb-2"
          data-oid="d2ga5ny"
        >
          Timesheet
        </h3>
        <p className="text-gray-300" data-oid="qdu:yw_">
          Track working hours and labor costs for accurate billing and project
          management.
        </p>
        <div className="bg-space-900/50 p-3 rounded-md mt-2" data-oid="bxu1v7z">
          <h4 className="font-medium text-green-300 mb-1" data-oid="a78mbvy">
            Key Features:
          </h4>
          <ul
            className="list-disc list-inside text-gray-300 space-y-1 ml-2"
            data-oid="epex_vn"
          >
            <li data-oid="t0k273b">Log work hours with the Job Timer</li>
            <li data-oid="o7_gz8n">
              Categorize time entries by project and task
            </li>
            <li data-oid="p11a1.t">Track billable vs. non-billable hours</li>
            <li data-oid="1.jct.0">Generate timesheet reports for payroll</li>
            <li data-oid="xhmkqum">
              Automatically calculate labor costs for projects
            </li>
          </ul>
        </div>
      </div>

      <div className="border-l-2 border-green-500 pl-4" data-oid="83m6bjl">
        <h3
          className="text-lg font-semibold text-white mb-2"
          data-oid="x1r38g5"
        >
          Expense Tracking
        </h3>
        <p className="text-gray-300" data-oid="pe_wykl">
          Record and categorize project expenses for accurate cost tracking and
          client billing.
        </p>
        <div className="bg-space-900/50 p-3 rounded-md mt-2" data-oid="3qxniko">
          <h4 className="font-medium text-green-300 mb-1" data-oid="3k2c0be">
            Key Features:
          </h4>
          <ul
            className="list-disc list-inside text-gray-300 space-y-1 ml-2"
            data-oid="_._p1qe"
          >
            <li data-oid="58__en4">Log expenses with photos of receipts</li>
            <li data-oid="nga926y">Categorize expenses by type and project</li>
            <li data-oid="rurmfzn">
              Track reimbursable vs. non-reimbursable expenses
            </li>
            <li data-oid="rlxmmcd">Generate expense reports for accounting</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
);

// Voice Commands Help Section
const VoiceHelp: FC = () => (
  <div data-oid="4v9z_ju">
    <h2
      className="text-xl font-bold text-red-400 mb-4 flex items-center"
      data-oid="-b80.aj"
    >
      <i className="fas fa-microphone mr-2" data-oid="jz060t:"></i> Voice
      Commands
    </h2>
    <p className="mb-4 text-gray-200" data-oid="tqqk7x-">
      Control your STR8 BUILD app hands-free with voice commands - perfect for
      when your hands are dirty or busy on the job site.
    </p>

    <div className="space-y-4" data-oid="ap9z9v6">
      <div className="border-l-2 border-red-500 pl-4" data-oid="f6utuov">
        <h3
          className="text-lg font-semibold text-white mb-2"
          data-oid="jf1m7e2"
        >
          How to Use Voice Commands
        </h3>
        <ol
          className="list-decimal list-inside text-gray-300 space-y-2 ml-2"
          data-oid="9.2745q"
        >
          <li className="pb-2" data-oid="5rgrtpy">
            <span className="font-medium text-white" data-oid="oaum_sp">
              Activate the voice listener
            </span>
            <p className="text-sm text-gray-400 ml-6 mt-1" data-oid="jylxc3v">
              Click the microphone icon in the Professional Tools bar
            </p>
          </li>
          <li className="pb-2" data-oid="owdn_-m">
            <span className="font-medium text-white" data-oid="qjup13:">
              Wait for the "Listening" indicator
            </span>
            <p className="text-sm text-gray-400 ml-6 mt-1" data-oid="pj1gxt6">
              The microphone icon will pulse red when actively listening
            </p>
          </li>
          <li className="pb-2" data-oid="p-wsqy.">
            <span className="font-medium text-white" data-oid="r.fq6mj">
              Speak a command clearly
            </span>
            <p className="text-sm text-gray-400 ml-6 mt-1" data-oid="7c:t76f">
              Say the name of the tool you want to open
            </p>
          </li>
          <li data-oid="b:rblt3">
            <span className="font-medium text-white" data-oid="-w-sqeh">
              The tool will open automatically
            </span>
            <p className="text-sm text-gray-400 ml-6 mt-1" data-oid="c:7mfur">
              A confirmation toast will appear showing the recognized command
            </p>
          </li>
        </ol>
      </div>

      <div className="border-l-2 border-red-500 pl-4" data-oid="h9gy83d">
        <h3
          className="text-lg font-semibold text-white mb-2"
          data-oid="blg3u00"
        >
          Available Voice Commands
        </h3>
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2"
          data-oid="yw8:0_1"
        >
          <div className="bg-space-900/50 p-3 rounded-md" data-oid="1fq7.tj">
            <p className="font-medium text-red-300" data-oid="qfkpaw:">
              "Measure"
            </p>
            <p className="text-gray-300 text-sm" data-oid="6oepsg6">
              Opens the Measure Tool
            </p>
          </div>
          <div className="bg-space-900/50 p-3 rounded-md" data-oid="1hkuswu">
            <p className="font-medium text-red-300" data-oid="defr262">
              "Level"
            </p>
            <p className="text-gray-300 text-sm" data-oid="cso:.-7">
              Opens the Level Tool
            </p>
          </div>
          <div className="bg-space-900/50 p-3 rounded-md" data-oid="ewwvepc">
            <p className="font-medium text-red-300" data-oid="_iwj6iu">
              "Angle"
            </p>
            <p className="text-gray-300 text-sm" data-oid="-8ewgq5">
              Opens the Angle Tool
            </p>
          </div>
          <div className="bg-space-900/50 p-3 rounded-md" data-oid="pma8j00">
            <p className="font-medium text-red-300" data-oid="ma3u_8o">
              "Calculator" or "Calc"
            </p>
            <p className="text-gray-300 text-sm" data-oid="atsr-1o">
              Opens the Calculator Tool
            </p>
          </div>
          <div className="bg-space-900/50 p-3 rounded-md" data-oid="l-qsr7k">
            <p className="font-medium text-red-300" data-oid="2ns5wv7">
              "Camera" or "Cam"
            </p>
            <p className="text-gray-300 text-sm" data-oid="5dp28bs">
              Opens the Project Camera
            </p>
          </div>
          <div className="bg-space-900/50 p-3 rounded-md" data-oid="86k9ub4">
            <p className="font-medium text-red-300" data-oid="-jn3isx">
              "Sound" or "Meter"
            </p>
            <p className="text-gray-300 text-sm" data-oid="1a7pin8">
              Opens the Sound Meter
            </p>
          </div>
        </div>
      </div>

      <div className="border-l-2 border-red-500 pl-4" data-oid="_cad:bf">
        <h3
          className="text-lg font-semibold text-white mb-2"
          data-oid="x4lz.1g"
        >
          Tips for Best Results
        </h3>
        <ul
          className="list-disc list-inside text-gray-300 mt-2 ml-2 space-y-1"
          data-oid="qk::did"
        >
          <li data-oid="h0.wocm">Speak clearly and at a normal volume</li>
          <li data-oid="00anlu2">Minimize background noise when possible</li>
          <li data-oid="k-ob.ez">
            Hold your device within 2 feet when speaking
          </li>
          <li data-oid="jek.w48">
            Use Chrome or Edge browsers for best recognition
          </li>
          <li data-oid="3nosg2n">Allow microphone permissions when prompted</li>
        </ul>
      </div>
    </div>
  </div>
);

// Keyboard Shortcuts Help Section
const ShortcutsHelp: FC = () => (
  <div data-oid="iki.40f">
    <h2
      className="text-xl font-bold text-yellow-400 mb-4 flex items-center"
      data-oid=":q_r6u4"
    >
      <i className="fas fa-keyboard mr-2" data-oid="mpsjlvq"></i> Keyboard
      Shortcuts
    </h2>
    <p className="mb-4 text-gray-200" data-oid="m_9fe3j">
      Speed up your workflow with these time-saving keyboard shortcuts.
    </p>

    <div className="space-y-4" data-oid="k9yna0e">
      <div className="border-l-2 border-yellow-500 pl-4" data-oid="dk2lyx8">
        <h3
          className="text-lg font-semibold text-white mb-2"
          data-oid="ac.mhe8"
        >
          Navigation Shortcuts
        </h3>
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3"
          data-oid=".lb1_45"
        >
          <div className="bg-space-900/50 p-3 rounded-md" data-oid="7z-2i23">
            <div
              className="flex justify-between items-center"
              data-oid="nlgr.8p"
            >
              <span className="text-gray-300" data-oid="a_9vuoy">
                Dashboard
              </span>
              <div className="flex space-x-1" data-oid="68iia6k">
                <kbd
                  className="px-2 py-1 bg-space-800 text-gray-300 text-xs font-mono rounded"
                  data-oid="lb6.l8g"
                >
                  Alt
                </kbd>
                <kbd
                  className="px-2 py-1 bg-space-800 text-gray-300 text-xs font-mono rounded"
                  data-oid="ey1aauo"
                >
                  H
                </kbd>
              </div>
            </div>
          </div>
          <div className="bg-space-900/50 p-3 rounded-md" data-oid="dzx_q0m">
            <div
              className="flex justify-between items-center"
              data-oid="3dwnzea"
            >
              <span className="text-gray-300" data-oid="3.lfx.s">
                Jobs
              </span>
              <div className="flex space-x-1" data-oid="3p7h568">
                <kbd
                  className="px-2 py-1 bg-space-800 text-gray-300 text-xs font-mono rounded"
                  data-oid="bz.d7e1"
                >
                  Alt
                </kbd>
                <kbd
                  className="px-2 py-1 bg-space-800 text-gray-300 text-xs font-mono rounded"
                  data-oid="g_cw:69"
                >
                  J
                </kbd>
              </div>
            </div>
          </div>
          <div className="bg-space-900/50 p-3 rounded-md" data-oid="r:k9mzx">
            <div
              className="flex justify-between items-center"
              data-oid="mq9:r2."
            >
              <span className="text-gray-300" data-oid=".ik5qjq">
                Calculators
              </span>
              <div className="flex space-x-1" data-oid="evdvu:o">
                <kbd
                  className="px-2 py-1 bg-space-800 text-gray-300 text-xs font-mono rounded"
                  data-oid="qplie-m"
                >
                  Alt
                </kbd>
                <kbd
                  className="px-2 py-1 bg-space-800 text-gray-300 text-xs font-mono rounded"
                  data-oid="8pjfw0s"
                >
                  C
                </kbd>
              </div>
            </div>
          </div>
          <div className="bg-space-900/50 p-3 rounded-md" data-oid="ca9x5ww">
            <div
              className="flex justify-between items-center"
              data-oid="3j.j99j"
            >
              <span className="text-gray-300" data-oid="xgeut36">
                Finance
              </span>
              <div className="flex space-x-1" data-oid="diya9bx">
                <kbd
                  className="px-2 py-1 bg-space-800 text-gray-300 text-xs font-mono rounded"
                  data-oid=":ldt.o9"
                >
                  Alt
                </kbd>
                <kbd
                  className="px-2 py-1 bg-space-800 text-gray-300 text-xs font-mono rounded"
                  data-oid="tvfvq24"
                >
                  F
                </kbd>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-l-2 border-yellow-500 pl-4" data-oid="wem.02_">
        <h3
          className="text-lg font-semibold text-white mb-2"
          data-oid="mwg9.vm"
        >
          Tool Shortcuts
        </h3>
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3"
          data-oid="ms8p1-m"
        >
          <div className="bg-space-900/50 p-3 rounded-md" data-oid="7dif40s">
            <div
              className="flex justify-between items-center"
              data-oid="1bq0efy"
            >
              <span className="text-gray-300" data-oid="b931:up">
                Measure Tool
              </span>
              <div className="flex space-x-1" data-oid="2edrhx:">
                <kbd
                  className="px-2 py-1 bg-space-800 text-gray-300 text-xs font-mono rounded"
                  data-oid="omngb12"
                >
                  Ctrl
                </kbd>
                <kbd
                  className="px-2 py-1 bg-space-800 text-gray-300 text-xs font-mono rounded"
                  data-oid="tbi8q1m"
                >
                  M
                </kbd>
              </div>
            </div>
          </div>
          <div className="bg-space-900/50 p-3 rounded-md" data-oid="jqh7-h:">
            <div
              className="flex justify-between items-center"
              data-oid="s.52ymj"
            >
              <span className="text-gray-300" data-oid=".p0dr0_">
                Calculator
              </span>
              <div className="flex space-x-1" data-oid="phk:-hc">
                <kbd
                  className="px-2 py-1 bg-space-800 text-gray-300 text-xs font-mono rounded"
                  data-oid="n-jhz1c"
                >
                  Ctrl
                </kbd>
                <kbd
                  className="px-2 py-1 bg-space-800 text-gray-300 text-xs font-mono rounded"
                  data-oid="2vf:ovo"
                >
                  C
                </kbd>
              </div>
            </div>
          </div>
          <div className="bg-space-900/50 p-3 rounded-md" data-oid="2pssdsh">
            <div
              className="flex justify-between items-center"
              data-oid="jm2_c5q"
            >
              <span className="text-gray-300" data-oid="p1mb52y">
                Camera
              </span>
              <div className="flex space-x-1" data-oid="nbqnj61">
                <kbd
                  className="px-2 py-1 bg-space-800 text-gray-300 text-xs font-mono rounded"
                  data-oid="85pjq-s"
                >
                  Ctrl
                </kbd>
                <kbd
                  className="px-2 py-1 bg-space-800 text-gray-300 text-xs font-mono rounded"
                  data-oid="_i3cfvl"
                >
                  P
                </kbd>
              </div>
            </div>
          </div>
          <div className="bg-space-900/50 p-3 rounded-md" data-oid="2rx8yfa">
            <div
              className="flex justify-between items-center"
              data-oid="5tw9o3c"
            >
              <span className="text-gray-300" data-oid="o74a9id">
                Level Tool
              </span>
              <div className="flex space-x-1" data-oid="n6te39o">
                <kbd
                  className="px-2 py-1 bg-space-800 text-gray-300 text-xs font-mono rounded"
                  data-oid="_g-zhwc"
                >
                  Ctrl
                </kbd>
                <kbd
                  className="px-2 py-1 bg-space-800 text-gray-300 text-xs font-mono rounded"
                  data-oid="bl1-3-d"
                >
                  L
                </kbd>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-l-2 border-yellow-500 pl-4" data-oid="tphv1-_">
        <h3
          className="text-lg font-semibold text-white mb-2"
          data-oid="_.scmk3"
        >
          Job Timer Controls
        </h3>
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3"
          data-oid="fa9zywt"
        >
          <div className="bg-space-900/50 p-3 rounded-md" data-oid="vm9.lrt">
            <div
              className="flex justify-between items-center"
              data-oid="284nwmq"
            >
              <span className="text-gray-300" data-oid="d0e:ebq">
                Start/Stop Timer
              </span>
              <div className="flex space-x-1" data-oid="a26bbeg">
                <kbd
                  className="px-2 py-1 bg-space-800 text-gray-300 text-xs font-mono rounded"
                  data-oid="z3d0ioq"
                >
                  F2
                </kbd>
              </div>
            </div>
          </div>
          <div className="bg-space-900/50 p-3 rounded-md" data-oid="m:b.t-8">
            <div
              className="flex justify-between items-center"
              data-oid="5367:ea"
            >
              <span className="text-gray-300" data-oid="_4r8blf">
                Reset Timer
              </span>
              <div className="flex space-x-1" data-oid="bo109fa">
                <kbd
                  className="px-2 py-1 bg-space-800 text-gray-300 text-xs font-mono rounded"
                  data-oid="ycu3buq"
                >
                  Shift
                </kbd>
                <kbd
                  className="px-2 py-1 bg-space-800 text-gray-300 text-xs font-mono rounded"
                  data-oid="y-t:nmu"
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
  <div data-oid="i0-vhsy">
    <h2
      className="text-xl font-bold text-orange-400 mb-4 flex items-center"
      data-oid="pn6i3xf"
    >
      <i className="fas fa-question-circle mr-2" data-oid="w8k84v_"></i>{" "}
      Frequently Asked Questions
    </h2>
    <p className="mb-4 text-gray-200" data-oid="n3nvvb2">
      Quick answers to common questions about using the STR8 BUILD app.
    </p>

    <div className="space-y-6 mt-6" data-oid="hh.3u81">
      <div
        className="bg-space-900/30 rounded-lg overflow-hidden border border-space-700/50"
        data-oid="8zokc:q"
      >
        <div
          className="bg-space-800/50 px-4 py-3 border-b border-space-700/50"
          data-oid="zofq9_y"
        >
          <h3 className="font-semibold text-orange-300" data-oid="wgy1qw-">
            How do I track time for different projects?
          </h3>
        </div>
        <div className="p-4 text-gray-300" data-oid="igi_o.7">
          <p data-oid="k1wt-wb">
            Use the Job Timer on the Dashboard to track time for any project.
            Select the project from the dropdown menu before starting the timer.
            All time entries are automatically saved to your timesheet and can
            be reviewed later in the Finance section.
          </p>
        </div>
      </div>

      <div
        className="bg-space-900/30 rounded-lg overflow-hidden border border-space-700/50"
        data-oid="8ox0:9x"
      >
        <div
          className="bg-space-800/50 px-4 py-3 border-b border-space-700/50"
          data-oid="8tc6hmk"
        >
          <h3 className="font-semibold text-orange-300" data-oid="wrlpksr">
            Can I use the app offline?
          </h3>
        </div>
        <div className="p-4 text-gray-300" data-oid="xsq-lrh">
          <p data-oid=":t5vmt9">
            Yes, many features of STR8 BUILD work offline. Time tracking,
            calculators, and measurement tools function without an internet
            connection. Your data will sync automatically when you're back
            online.
          </p>
        </div>
      </div>

      <div
        className="bg-space-900/30 rounded-lg overflow-hidden border border-space-700/50"
        data-oid="omk9unp"
      >
        <div
          className="bg-space-800/50 px-4 py-3 border-b border-space-700/50"
          data-oid="p7vz077"
        >
          <h3 className="font-semibold text-orange-300" data-oid="d_bnu41">
            How do I create and send invoices to clients?
          </h3>
        </div>
        <div className="p-4 text-gray-300" data-oid="x3xp32x">
          <p data-oid="2unthp0">
            Navigate to the Finance section and select the Invoices tab. Click
            "Create New Invoice" and select the client and project. Add line
            items for labor (pulled from your timesheet) and materials. Preview
            the invoice, then send it directly via email or download as a PDF.
          </p>
        </div>
      </div>

      <div
        className="bg-space-900/30 rounded-lg overflow-hidden border border-space-700/50"
        data-oid="f1vmbem"
      >
        <div
          className="bg-space-800/50 px-4 py-3 border-b border-space-700/50"
          data-oid=".0jnmua"
        >
          <h3 className="font-semibold text-orange-300" data-oid="34h5p7w">
            How accurate are the measurement tools?
          </h3>
        </div>
        <div className="p-4 text-gray-300" data-oid=":3uelkz">
          <p data-oid="-i50ch.">
            The accuracy of the Measure Tool depends on proper calibration. Use
            a known reference object (like a dollar bill) to calibrate before
            taking measurements. The Level Tool uses your device's sensors and
            is accurate to within 0.1 degrees when properly calibrated.
          </p>
        </div>
      </div>

      <div
        className="bg-space-900/30 rounded-lg overflow-hidden border border-space-700/50"
        data-oid="vuqr2pb"
      >
        <div
          className="bg-space-800/50 px-4 py-3 border-b border-space-700/50"
          data-oid="i.bs:hq"
        >
          <h3 className="font-semibold text-orange-300" data-oid="o:qom09">
            Can I share projects with my team members?
          </h3>
        </div>
        <div className="p-4 text-gray-300" data-oid="ksgtkrd">
          <p data-oid="w408rg5">
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
      data-oid="82p7hb0"
    >
      <div className="flex items-start" data-oid="wy77u6i">
        <div className="flex-shrink-0 pt-1" data-oid=".1ri47.">
          <i
            className="fas fa-headset text-cyan-400 text-xl"
            data-oid="tz08eus"
          ></i>
        </div>
        <div className="ml-4" data-oid="phvmyt3">
          <h3 className="font-semibold text-white" data-oid="sad:ywm">
            Need more help?
          </h3>
          <p className="text-gray-300 mt-1" data-oid="gkn133i">
            Our support team is available Monday-Friday, 8am-6pm.
          </p>
          <div className="mt-3 flex space-x-4" data-oid="mbl94s.">
            <button
              className="text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1"
              data-oid="bm5c_6g"
            >
              <i className="fas fa-envelope" data-oid="6-2p-2o"></i>
              <span data-oid="uu_nds0">Email Support</span>
            </button>
            <button
              className="text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1"
              data-oid="r2nw1xy"
            >
              <i className="fas fa-phone" data-oid="748emh."></i>
              <span data-oid="zpd.lkk">Call Us</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Help;
