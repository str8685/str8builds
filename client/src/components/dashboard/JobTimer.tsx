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
        data-oid="axuwl.j"
      >
        <AnimatePresence mode="wait" data-oid="vr.qxq3">
          <motion.span
            key={`hours-${hours}`}
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 10, opacity: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className="tabular-nums inline-block min-w-[36px] text-center text-3xl font-bold bg-gradient-to-b from-white to-gray-300 bg-clip-text text-transparent"
            data-oid="_ga34h8"
          >
            {hours}
          </motion.span>
        </AnimatePresence>
        <span
          className="inline-block w-2 text-center text-2xl font-bold text-cyan-400/90"
          data-oid="y-7b-zm"
        >
          :
        </span>
        <AnimatePresence mode="wait" data-oid="9fa:51o">
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
            data-oid="05md.1u"
          >
            {minutes}
          </motion.span>
        </AnimatePresence>
        <span
          className="inline-block w-2 text-center text-2xl font-bold text-cyan-400/90"
          data-oid="8cr3.1t"
        >
          :
        </span>
        <AnimatePresence mode="wait" data-oid="3my_lvl">
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
            data-oid="3kjf0gy"
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
      data-oid=":msoxcv"
    >
      {status === "RUNNING" ? (
        <>
          <span className="relative flex h-2 w-2 mr-2" data-oid="o09k_j2">
            <span
              className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"
              data-oid="3izil_4"
            ></span>
            <span
              className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"
              data-oid="4:lxhf_"
            ></span>
          </span>
          TRACKING
        </>
      ) : status === "PAUSED" ? (
        <>
          <Pause className="h-3 w-3 mr-1.5" data-oid="i5mz_g." />
          PAUSED
        </>
      ) : (
        <>
          <StopCircle className="h-3 w-3 mr-1.5" data-oid="rmtyy_f" />
          STOPPED
        </>
      )}
    </motion.span>
  );

  return (
    <>
      <Toaster data-oid="f4jtkfs" />
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative group"
        data-oid="53pq16v"
      >
        {/* Animated background gradient */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl opacity-90 backdrop-blur-sm"
          data-oid="m.lp5x:"
        >
          <div
            className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-500/5 via-transparent to-transparent opacity-50"
            data-oid="5k_5:ez"
          ></div>
        </div>

        {/* Glow effect */}
        <div
          className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/30 to-teal-500/30 rounded-2xl opacity-0 group-hover:opacity-100 blur transition-all duration-500"
          data-oid="wjw.m32"
        ></div>

        <GlassCard
          className="relative z-10 overflow-hidden border border-white/5 backdrop-blur-xl"
          variant="teal"
          glow={true}
          data-component-name="JobTimer"
          data-oid="j_aovee"
        >
          {/* Header */}
          <div
            className="px-6 py-4 border-b border-white/5 flex justify-between items-center bg-gradient-to-r from-space-900/70 to-space-900/30"
            data-oid="_u4i2by"
          >
            <div className="flex items-center" data-oid="jq7cbiq">
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
                data-oid="_d2jryh"
              >
                <Timer className="h-5 w-5 text-teal-400" data-oid="ar:xt-_" />
              </motion.div>
              <div data-oid="awofxai">
                <h3
                  className="text-lg font-space font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
                  data-oid="hvgk7-:"
                >
                  Active Job Timer
                </h3>
                <p className="text-xs text-gray-400" data-oid="4ojc6re">
                  Tracking time for billable hours
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2" data-oid="kmaqk.m">
              <StatusBadge data-oid="ou7nvpv" />

              <AnimatePresence data-oid="tonkxe7">
                {timesheetSaved && (
                  <motion.span
                    className="bg-green-500/10 text-green-400 px-3 py-1 rounded-full text-xs flex items-center border border-green-500/20"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    data-oid=":::f7e4"
                  >
                    <Check className="h-3 w-3 mr-1.5" data-oid="uq--jj." />
                    Saved
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Main content */}
          <div className="p-6" data-oid="vvh_52k">
            <div
              className="grid grid-cols-1 lg:grid-cols-3 gap-6"
              data-oid="0:d._w2"
            >
              {/* Left column - job info */}
              <div className="lg:col-span-2" data-oid="a_o0rxc">
                <div
                  className="bg-space-900/40 rounded-xl p-5 h-full border border-white/5 backdrop-blur-sm"
                  data-oid="m2q8:6e"
                >
                  <div className="flex flex-col" data-oid="z98a:gz">
                    <div
                      className="flex items-center justify-between mb-4"
                      data-oid="h.ns_89"
                    >
                      <h4
                        className="text-xl font-semibold text-white"
                        data-oid="ub7.c-:"
                      >
                        {currentJob.name}
                      </h4>
                      <span
                        className="px-2.5 py-1 text-xs font-medium bg-teal-500/10 text-teal-400 rounded-full"
                        data-oid="plna0_i"
                      >
                        Current Job
                      </span>
                    </div>
                    <div
                      className="flex items-center text-sm text-gray-400 mb-5"
                      data-oid="3xc9yp3"
                    >
                      <Building2
                        className="h-4 w-4 mr-2 text-teal-400/80"
                        data-oid=":s5ynsu"
                      />

                      <span data-oid="p08traf">{currentJob.client}</span>
                    </div>

                    <div
                      className="bg-space-800/40 rounded-xl p-5 border border-white/5"
                      data-oid="etc.qx8"
                    >
                      <div className="space-y-4" data-oid="1rpi-8-">
                        <div
                          className="flex justify-between items-center py-2 border-b border-white/5"
                          data-oid="7uqpybq"
                        >
                          <div
                            className="flex items-center text-gray-400"
                            data-oid="i-ufg70"
                          >
                            <Clock
                              className="h-4 w-4 mr-2 text-teal-400/80"
                              data-oid="xmgjomn"
                            />

                            <span
                              className="text-sm font-medium"
                              data-oid="4zegdig"
                            >
                              Started
                            </span>
                          </div>
                          <span
                            className="text-white font-medium"
                            data-oid="u2qkbh."
                          >
                            {startTime}
                          </span>
                        </div>

                        <div
                          className="flex justify-between items-center py-2 border-b border-white/5"
                          data-oid="tcivpll"
                        >
                          <div
                            className="flex items-center text-gray-400"
                            data-oid="ogj:gni"
                          >
                            <DollarSign
                              className="h-4 w-4 mr-2 text-teal-400/80"
                              data-oid="8xddy3w"
                            />

                            <span
                              className="text-sm font-medium"
                              data-oid="sxd5wf3"
                            >
                              Hourly Rate
                            </span>
                          </div>
                          <div className="flex items-center" data-oid="vy.mbvv">
                            {isEditingRate ? (
                              <div
                                className="flex items-center space-x-2"
                                data-oid=".vx01p6"
                              >
                                <input
                                  type="number"
                                  value={rateValue}
                                  onChange={(e) => setRateValue(e.target.value)}
                                  className="w-24 px-2 py-1 text-sm bg-space-700/50 border border-white/10 rounded text-white"
                                  min="0"
                                  step="0.01"
                                  data-oid="80rm:66"
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
                                  data-oid="4p8pdu7"
                                >
                                  <Check
                                    className="h-4 w-4"
                                    data-oid="nssyz2s"
                                  />
                                </button>
                                <button
                                  onClick={() => {
                                    setRateValue(hourlyRate.toString());
                                    setIsEditingRate(false);
                                  }}
                                  className="text-gray-400 hover:text-gray-300 transition-colors"
                                  data-oid="xymk4i6"
                                >
                                  <X className="h-4 w-4" data-oid="-r7br28" />
                                </button>
                              </div>
                            ) : (
                              <div
                                className="flex items-center space-x-2"
                                data-oid="bj.ohi5"
                              >
                                <span
                                  className="text-white font-medium"
                                  data-oid="mddllw9"
                                >
                                  ${hourlyRate.toFixed(2)}/hr
                                </span>
                                <button
                                  onClick={() => setIsEditingRate(true)}
                                  className="text-gray-400 hover:text-teal-400 transition-colors"
                                  data-oid="e3a7m5-"
                                >
                                  <Edit2
                                    className="h-3.5 w-3.5"
                                    data-oid="no6opkw"
                                  />
                                </button>
                              </div>
                            )}
                          </div>
                        </div>

                        <div
                          className="flex justify-between items-center py-2"
                          data-oid="kgxhjrt"
                        >
                          <div
                            className="flex items-center text-gray-400"
                            data-oid="fby9eyy"
                          >
                            <Calculator
                              className="h-4 w-4 mr-2 text-teal-400/80"
                              data-oid="umnyla4"
                            />

                            <span
                              className="text-sm font-medium"
                              data-oid="gtriwst"
                            >
                              Estimated Total
                            </span>
                          </div>
                          <span
                            className="text-white font-medium"
                            data-oid="k_r5k3t"
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
                data-oid="ypk4tav"
              >
                <div className="text-center mb-6" data-oid="ibx2yu-">
                  <div
                    className="text-5xl font-bold text-white mb-2"
                    data-oid="afyf1.."
                  >
                    {formattedTime()}
                  </div>
                  <div
                    className="h-1.5 bg-space-800/50 rounded-full overflow-hidden mb-2"
                    data-oid="oqaexnz"
                  >
                    <motion.div
                      className="h-full bg-gradient-to-r from-cyan-400 to-teal-400"
                      initial={{ width: "0%" }}
                      animate={{ width: `${calculateProgress()}%` }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                      data-oid="9c23.o3"
                    />
                  </div>
                  <p className="text-xs text-gray-400" data-oid="o3z5tsg">
                    {Math.round(calculateProgress())}% of 8-hour workday
                  </p>
                </div>

                <div className="space-y-3" data-oid="pw2jbhb">
                  <div
                    className="flex items-center justify-between space-x-3"
                    data-oid="w0b2urj"
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
                      data-oid="g6w_13z"
                    >
                      <span
                        className="relative flex items-center"
                        data-oid="qvll1y5"
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
                          data-oid="_8f3ol5"
                        >
                          {isRunning && !isPaused ? (
                            <Pause
                              className="w-3 h-3 text-white"
                              data-oid="ak0u019"
                            />
                          ) : (
                            <Play
                              className="w-3 h-3 text-white -ml-px"
                              data-oid="ikuoiz-"
                            />
                          )}
                        </span>
                        <span className="ml-2" data-oid="mmx0b0u">
                          {isRunning && !isPaused
                            ? "Pause Timer"
                            : "Start Timer"}
                        </span>
                      </span>
                    </motion.button>
                  </div>

                  <div className="grid grid-cols-2 gap-3" data-oid="._etu1-">
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
                      data-oid="q7n_zof"
                    >
                      <StopCircle className="h-4 w-4" data-oid="iuvcpr6" />
                      <span data-oid="pgmgg2n">Reset</span>
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
                      data-oid=":fby65p"
                    >
                      <Check className="h-4 w-4" data-oid="ctujn4z" />
                      <span data-component-name="JobTimer" data-oid="ehhz0dx">
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
