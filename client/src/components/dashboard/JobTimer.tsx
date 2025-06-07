import { FC, useState, useEffect, useCallback } from "react";
import GlassCard from "@/components/ui/GlassCard";
import { useJobTimer } from "@/hooks/useJobTimer";
import { Toaster } from "@/components/ui/toaster";
import {
  Edit2,
  Check,
  X,
  Play,
  Pause,
  StopCircle,
  Timer,
  Building2,
  Clock,
  DollarSign,
  Calculator,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface Job {
  id: string;
  name: string;
  client: string;
}

const JobTimer: FC = () => {
  // Destructure with default values to handle undefined cases
  const {
    time = "00:00:00",
    status = "STOPPED",
    currentJob = {
      id: "",
      name: "No active job",
      client: "No client selected",
    },
    startTime = "--:--:--",
    hourlyRate = 0,
    estimatedTotal = 0,
    toggleTimer = () => {},
    stopTimer = () => {},
    resetTimer = () => {},
    saveTimeEntry = () => {}, // Add the saveTimeEntry function
    isRunning = false,
    isPaused = false,
    timesheetSaved = false,
    updateHourlyRate = () => {},
    isSubmitting = false,
  } = useJobTimer();

  const [isEditingRate, setIsEditingRate] = useState(false);
  const [rateValue, setRateValue] = useState(hourlyRate.toString());

  // Update rate value when hourly rate changes from the hook
  useEffect(() => {
    setRateValue(hourlyRate.toString());
  }, [hourlyRate]);

  // Format timer with smooth animations and professional styling
  const formattedTime = useCallback(() => {
    const [hours = "00", minutes = "00", seconds = "00"] =
      time?.split(":") || [];

    return (
      <div
        className="flex items-baseline justify-center space-x-0.5"
        data-oid="jmumycb"
      >
        <AnimatePresence mode="wait" data-oid="fwc4u_e">
          <motion.span
            key={`hours-${hours}`}
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 10, opacity: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className="tabular-nums inline-block min-w-[36px] text-center text-3xl font-bold bg-gradient-to-b from-white to-gray-300 bg-clip-text text-transparent"
            data-oid="dnzvgqh"
          >
            {hours}
          </motion.span>
        </AnimatePresence>
        <span
          className="inline-block w-2 text-center text-2xl font-bold text-cyan-400/90"
          data-oid="xdz..c9"
        >
          :
        </span>
        <AnimatePresence mode="wait" data-oid="tj.tm7c">
          <motion.span
            key={`minutes-${minutes}`}
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 10, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 30,
              delay: 0.05,
            }}
            className="tabular-nums inline-block min-w-[36px] text-center text-3xl font-bold bg-gradient-to-b from-white to-gray-300 bg-clip-text text-transparent"
            data-oid="o::iaj:"
          >
            {minutes}
          </motion.span>
        </AnimatePresence>
        <span
          className="inline-block w-2 text-center text-2xl font-bold text-cyan-400/90"
          data-oid="wt.au9o"
        >
          :
        </span>
        <AnimatePresence mode="wait" data-oid="h45dr5d">
          <motion.span
            key={`seconds-${seconds}`}
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 10, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 30,
              delay: 0.1,
            }}
            className="tabular-nums inline-block min-w-[36px] text-center text-3xl font-bold bg-gradient-to-b from-white to-gray-300 bg-clip-text text-transparent"
            data-oid="2omgiox"
          >
            {seconds}
          </motion.span>
        </AnimatePresence>
      </div>
    );
  }, [time]);

  // Calculate elapsed time in hours for progress indicator with smooth animation
  const calculateProgress = useCallback(() => {
    const [hours = 0, minutes = 0, seconds = 0] =
      time?.split(":").map(Number) || [];
    const totalMinutes = hours * 60 + minutes + seconds / 60;
    // Assuming typical workday is 8 hours (480 minutes)
    return Math.min((totalMinutes / 480) * 100, 100);
  }, [time]);

  // Enhanced status badge with glow effect
  const StatusBadge = () => (
    <motion.span
      className={cn(
        "inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 shadow-lg",
        {
          "bg-teal-500/20 text-teal-300 shadow-teal-500/20":
            status === "RUNNING",
          "animate-pulse": status === "RUNNING",
          "bg-yellow-500/20 text-yellow-400": status === "PAUSED",
          "bg-gray-700/50 text-gray-400": !isRunning,
          "ring-2 ring-offset-2 ring-offset-space-900/50":
            isRunning && !isPaused,
          "ring-teal-500/30": status === "RUNNING",
          "ring-yellow-500/20": status === "PAUSED",
        },
      )}
      animate={{
        scale: isRunning ? [1, 1.02, 1] : 1,
      }}
      transition={{
        duration: 2,
        repeat: isRunning ? Infinity : 0,
        ease: "easeInOut",
      }}
      data-oid="rs.nnbk"
    >
      {status === "RUNNING" ? (
        <>
          <span className="relative flex h-2 w-2 mr-2" data-oid="8gyp_d0">
            <span
              className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"
              data-oid="y.twwky"
            ></span>
            <span
              className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"
              data-oid="j4vn:pt"
            ></span>
          </span>
          TRACKING
        </>
      ) : status === "PAUSED" ? (
        <>
          <Pause className="h-3 w-3 mr-1.5" data-oid="w1a4uq_" />
          PAUSED
        </>
      ) : (
        <>
          <StopCircle className="h-3 w-3 mr-1.5" data-oid="v31i2ki" />
          STOPPED
        </>
      )}
    </motion.span>
  );

  return (
    <>
      <Toaster data-oid="5axn1kg" />
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative group"
        data-oid="gwgk4w4"
      >
        {/* Animated background gradient */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl opacity-90 backdrop-blur-sm"
          data-oid="nhlt39r"
        >
          <div
            className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-500/5 via-transparent to-transparent opacity-50"
            data-oid="1p7a8zw"
          ></div>
        </div>

        {/* Glow effect */}
        <div
          className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/30 to-teal-500/30 rounded-2xl opacity-0 group-hover:opacity-100 blur transition-all duration-500"
          data-oid="_3prmw5"
        ></div>

        <GlassCard
          className="relative z-10 overflow-hidden border border-white/5 backdrop-blur-xl"
          variant="teal"
          glow={true}
          data-component-name="JobTimer"
          data-oid="7q-a9k."
        >
          {/* Header */}
          <div
            className="px-6 py-4 border-b border-white/5 flex justify-between items-center bg-gradient-to-r from-space-900/70 to-space-900/30"
            data-oid="5787u0w"
          >
            <div className="flex items-center" data-oid="bwfh6ks">
              <motion.div
                className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500/20 to-teal-600/20 flex items-center justify-center mr-3 shadow-lg shadow-teal-500/10"
                animate={{
                  rotate: isRunning ? 360 : 0,
                }}
                transition={{
                  duration: 8,
                  ease: "linear",
                  repeat: isRunning ? Infinity : 0,
                }}
                data-oid="759vzsw"
              >
                <Timer className="h-5 w-5 text-teal-400" data-oid="_m:1kxm" />
              </motion.div>
              <div data-oid="43fh97f">
                <h3
                  className="text-lg font-space font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
                  data-oid="viz9b6g"
                >
                  Active Job Timer
                </h3>
                <p className="text-xs text-gray-400" data-oid="626qks4">
                  Tracking time for billable hours
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2" data-oid="olzpen7">
              <StatusBadge data-oid="7dj3ytk" />

              <AnimatePresence data-oid="77bs.:-">
                {timesheetSaved && (
                  <motion.span
                    className="bg-green-500/10 text-green-400 px-3 py-1 rounded-full text-xs flex items-center border border-green-500/20"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    data-oid="_yews7k"
                  >
                    <Check className="h-3 w-3 mr-1.5" data-oid="-_0ivx9" />
                    Saved
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Main content */}
          <div className="p-6" data-oid="ord:z:1">
            <div
              className="grid grid-cols-1 lg:grid-cols-3 gap-6"
              data-oid="tyi96f."
            >
              {/* Left column - job info */}
              <div className="lg:col-span-2" data-oid="15mykd5">
                <div
                  className="bg-space-900/40 rounded-xl p-5 h-full border border-white/5 backdrop-blur-sm"
                  data-oid="xmx2a:x"
                >
                  <div className="flex flex-col" data-oid="697sov0">
                    <div
                      className="flex items-center justify-between mb-4"
                      data-oid="mhxvn3n"
                    >
                      <h4
                        className="text-xl font-semibold text-white"
                        data-oid="jo5vs9l"
                      >
                        {currentJob.name}
                      </h4>
                      <span
                        className="px-2.5 py-1 text-xs font-medium bg-teal-500/10 text-teal-400 rounded-full"
                        data-oid="vlkddzq"
                      >
                        Current Job
                      </span>
                    </div>
                    <div
                      className="flex items-center text-sm text-gray-400 mb-5"
                      data-oid="9oquzv9"
                    >
                      <Building2
                        className="h-4 w-4 mr-2 text-teal-400/80"
                        data-oid="og73ldp"
                      />

                      <span data-oid="g2ish33">{currentJob.client}</span>
                    </div>

                    <div
                      className="bg-space-800/40 rounded-xl p-5 border border-white/5"
                      data-oid="t.ggcb8"
                    >
                      <div className="space-y-4" data-oid="qysyqcf">
                        <div
                          className="flex justify-between items-center py-2 border-b border-white/5"
                          data-oid="2.nn5z8"
                        >
                          <div
                            className="flex items-center text-gray-400"
                            data-oid="5qavb4_"
                          >
                            <Clock
                              className="h-4 w-4 mr-2 text-teal-400/80"
                              data-oid="x28d9k9"
                            />

                            <span
                              className="text-sm font-medium"
                              data-oid="me3.vgf"
                            >
                              Started
                            </span>
                          </div>
                          <span
                            className="text-white font-medium"
                            data-oid="cikuw1k"
                          >
                            {startTime}
                          </span>
                        </div>

                        <div
                          className="flex justify-between items-center py-2 border-b border-white/5"
                          data-oid="hdw-ry5"
                        >
                          <div
                            className="flex items-center text-gray-400"
                            data-oid="woqa0uc"
                          >
                            <DollarSign
                              className="h-4 w-4 mr-2 text-teal-400/80"
                              data-oid="mtgeiqx"
                            />

                            <span
                              className="text-sm font-medium"
                              data-oid="-moz8_v"
                            >
                              Hourly Rate
                            </span>
                          </div>
                          <div className="flex items-center" data-oid="5ht2c53">
                            {isEditingRate ? (
                              <div
                                className="flex items-center space-x-2"
                                data-oid="doxkn55"
                              >
                                <input
                                  type="number"
                                  value={rateValue}
                                  onChange={(e) => setRateValue(e.target.value)}
                                  className="w-24 px-2 py-1 text-sm bg-space-700/50 border border-white/10 rounded text-white"
                                  min="0"
                                  step="0.01"
                                  data-oid="k_1w0tg"
                                />

                                <button
                                  onClick={() => {
                                    const newRate = parseFloat(rateValue);
                                    if (!isNaN(newRate) && newRate >= 0) {
                                      updateHourlyRate(newRate);
                                      setIsEditingRate(false);
                                    }
                                  }}
                                  className="text-teal-400 hover:text-teal-300 transition-colors"
                                  data-oid=".:8:_ws"
                                >
                                  <Check
                                    className="h-4 w-4"
                                    data-oid="x-.4nxt"
                                  />
                                </button>
                                <button
                                  onClick={() => {
                                    setRateValue(hourlyRate.toString());
                                    setIsEditingRate(false);
                                  }}
                                  className="text-gray-400 hover:text-gray-300 transition-colors"
                                  data-oid="ns3meo_"
                                >
                                  <X className="h-4 w-4" data-oid="fr6ftwk" />
                                </button>
                              </div>
                            ) : (
                              <div
                                className="flex items-center space-x-2"
                                data-oid="5pen5ns"
                              >
                                <span
                                  className="text-white font-medium"
                                  data-oid="ee88r5x"
                                >
                                  ${hourlyRate.toFixed(2)}/hr
                                </span>
                                <button
                                  onClick={() => setIsEditingRate(true)}
                                  className="text-gray-400 hover:text-teal-400 transition-colors"
                                  data-oid="0jwtpfs"
                                >
                                  <Edit2
                                    className="h-3.5 w-3.5"
                                    data-oid="kc3uz03"
                                  />
                                </button>
                              </div>
                            )}
                          </div>
                        </div>

                        <div
                          className="flex justify-between items-center py-2"
                          data-oid="sbg0fnw"
                        >
                          <div
                            className="flex items-center text-gray-400"
                            data-oid=".ief6or"
                          >
                            <Calculator
                              className="h-4 w-4 mr-2 text-teal-400/80"
                              data-oid="gcprjdk"
                            />

                            <span
                              className="text-sm font-medium"
                              data-oid="qlg--m0"
                            >
                              Estimated Total
                            </span>
                          </div>
                          <span
                            className="text-white font-medium"
                            data-oid="s2.9-m2"
                          >
                            ${(Number(estimatedTotal) || 0).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Timer Controls */}
              <div
                className="bg-space-900/40 rounded-xl p-6 border border-white/5 backdrop-blur-sm"
                data-oid="e.h.4g_"
              >
                <div className="text-center mb-6" data-oid="1lf6.1d">
                  <div
                    className="text-5xl font-bold text-white mb-2"
                    data-oid="leh5q1_"
                  >
                    {formattedTime()}
                  </div>
                  <div
                    className="h-1.5 bg-space-800/50 rounded-full overflow-hidden mb-2"
                    data-oid=":et3rl5"
                  >
                    <motion.div
                      className="h-full bg-gradient-to-r from-cyan-400 to-teal-400"
                      initial={{ width: "0%" }}
                      animate={{ width: `${calculateProgress()}%` }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                      data-oid="wo0bvcy"
                    />
                  </div>
                  <p className="text-xs text-gray-400" data-oid="sooo.cj">
                    {Math.round(calculateProgress())}% of 8-hour workday
                  </p>
                </div>

                <div className="space-y-3" data-oid="ig4f7v0">
                  <div
                    className="flex items-center justify-between space-x-3"
                    data-oid="l-1l:.i"
                  >
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={toggleTimer}
                      disabled={isSubmitting}
                      className={cn(
                        "flex-1 flex items-center justify-center px-5 py-3 rounded-xl transition-all duration-200 font-medium shadow-lg",
                        isRunning && !isPaused
                          ? "bg-gradient-to-br from-rose-600/90 to-rose-700/90 text-white hover:from-rose-500 hover:to-rose-600 border border-rose-500/50 hover:shadow-rose-500/20"
                          : "bg-gradient-to-br from-teal-600/90 to-cyan-600/90 text-white hover:from-teal-500 hover:to-cyan-500 border border-teal-500/50 hover:shadow-cyan-500/20",
                        isSubmitting &&
                          "opacity-70 cursor-not-allowed hover:shadow-none",
                        "group/button",
                      )}
                      data-oid="9n63.:a"
                    >
                      <span
                        className="relative flex items-center"
                        data-oid="qz1xzma"
                      >
                        <span
                          className={cn(
                            "absolute -left-6 flex items-center justify-center w-5 h-5 rounded-full transition-all duration-300",
                            isRunning && !isPaused
                              ? "bg-rose-500/20"
                              : "bg-teal-500/20",
                            "group-hover/button:scale-110 group-hover/button:opacity-100",
                            isRunning && !isPaused
                              ? "group-hover/button:bg-rose-500/30"
                              : "group-hover/button:bg-teal-500/30",
                          )}
                          data-oid="ub2qip9"
                        >
                          {isRunning && !isPaused ? (
                            <Pause
                              className="w-3 h-3 text-white"
                              data-oid="0efuztk"
                            />
                          ) : (
                            <Play
                              className="w-3 h-3 text-white -ml-px"
                              data-oid="6c.-.zn"
                            />
                          )}
                        </span>
                        <span className="ml-2" data-oid="fv5vc:x">
                          {isRunning && !isPaused
                            ? "Pause Timer"
                            : "Start Timer"}
                        </span>
                      </span>
                    </motion.button>
                  </div>

                  <div className="grid grid-cols-2 gap-3" data-oid="ylgsjbp">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={resetTimer}
                      disabled={isSubmitting || (!isRunning && !isPaused)}
                      className={cn(
                        "w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-xl font-medium transition-all duration-200",
                        "bg-red-500/10 text-red-400 border border-red-500/20",
                        !isRunning && !isPaused
                          ? "opacity-50 cursor-not-allowed"
                          : "hover:bg-red-500/15",
                        isSubmitting && "opacity-50 cursor-not-allowed",
                      )}
                      data-oid="09gtebk"
                    >
                      <StopCircle className="h-4 w-4" data-oid="d_0_ok4" />
                      <span data-oid="df4b8sn">Reset</span>
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={saveTimeEntry} // Connect to the saveTimeEntry function
                      disabled={
                        isSubmitting || isRunning || time === "00:00:00"
                      }
                      className={cn(
                        "w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-xl font-medium transition-all duration-200",
                        "bg-blue-500/10 text-blue-400 border border-blue-500/20",
                        isRunning || time === "00:00:00"
                          ? "opacity-50 cursor-not-allowed"
                          : "hover:bg-blue-500/15",
                        isSubmitting && "opacity-50 cursor-not-allowed",
                      )}
                      data-oid="2sr894z"
                    >
                      <Check className="h-4 w-4" data-oid="aa8f8u:" />
                      <span data-component-name="JobTimer" data-oid="8z1_oak">
                        Save Entry
                      </span>
                    </motion.button>
                  </div>

                  {/* No additional action buttons needed - removing duplicates */}
                </div>
              </div>
            </div>
          </div>
        </GlassCard>
      </motion.div>
    </>
  );
};

export default JobTimer;
