import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

const Timer: React.FC = () => {
  const [time, setTime] = useState({
    seconds: 0,
    minutes: 0,
    hours: 0,
  });
  const [isRunning, setIsRunning] = useState(false);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [note, setNote] = useState("");

  // Example query for projects to select from
  const { data: projects } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const response = await fetch("/api/projects");
      if (!response.ok) {
        throw new Error("Failed to fetch projects");
      }
      return response.json();
    },
  });

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          const newSeconds = prevTime.seconds + 1;
          const newMinutes = prevTime.minutes + Math.floor(newSeconds / 60);
          const newHours = prevTime.hours + Math.floor(newMinutes / 60);

          return {
            seconds: newSeconds % 60,
            minutes: newMinutes % 60,
            hours: newHours,
          };
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning]);

  const formatTime = (num: number) => String(num).padStart(2, "0");

  const toggleTimer = () => {
    if (!isRunning && !selectedProject) {
      // Show project selection warning
      return;
    }
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTime({ seconds: 0, minutes: 0, hours: 0 });
    setNote("");
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white p-4"
      data-oid="d2-iuql"
    >
      {/* Animated starfield background */}
      <div
        className="fixed inset-0 -z-10 overflow-hidden opacity-20"
        data-oid="thb9i6m"
      >
        <div className="star-small" data-oid="xcmxfd9"></div>
        <div className="star-medium" data-oid="vjzn4p5"></div>
        <div className="star-large" data-oid="nsgu905"></div>
      </div>

      <div className="max-w-4xl mx-auto" data-oid="d3kq.hv">
        <header className="mb-8" data-oid="6:ifqo1">
          <h1
            className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500"
            data-oid="iaagn9a"
          >
            Job Timer
          </h1>
          <p className="text-slate-300 mt-2" data-oid="32b9s.4">
            Track your time on construction projects
          </p>
        </header>

        {/* Horizontal construction tools toolbar */}
        <div
          className="bg-slate-800/70 backdrop-blur-md border border-slate-700/50 rounded-xl p-3 mb-6 flex items-center space-x-2 overflow-x-auto"
          data-oid="hgguo6c"
        >
          {[
            "Measure",
            "Level",
            "Angle",
            "Calculator",
            "Project Cam",
            "Sound Meter",
          ].map((tool) => (
            <button
              key={tool}
              className="flex flex-col items-center justify-center py-2 px-4 rounded-lg bg-slate-900/50 hover:bg-cyan-900/30 border border-slate-700/50 hover:border-cyan-500/40 transition-colors"
              data-oid="zf2zvnu"
            >
              <div
                className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center mb-1"
                data-oid="t4v6h17"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-cyan-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  data-oid="rzlbq51"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    data-oid=":39ejlv"
                  />
                </svg>
              </div>
              <span className="text-xs text-slate-300" data-oid="178w:7-">
                {tool}
              </span>
            </button>
          ))}
        </div>

        {/* Timer Card */}
        <div
          className="bg-slate-800/70 backdrop-blur-md border border-slate-700/50 rounded-xl p-8 mb-6 shadow-lg"
          data-oid="ly3bs7p"
        >
          {/* Project Selection */}
          <div className="mb-6" data-oid="8.l3i.q">
            <label className="block text-slate-300 mb-2" data-oid="uwg9sfv">
              Project
            </label>
            <select
              className="w-full bg-slate-900 border border-slate-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              value={selectedProject || ""}
              onChange={(e) => setSelectedProject(e.target.value)}
              disabled={isRunning}
              data-oid="i6gme5i"
            >
              <option value="" data-oid="bw9r826">
                Select a project
              </option>
              {projects?.map((project: any) => (
                <option key={project.id} value={project.id} data-oid="gqo8rdd">
                  {project.name}
                </option>
              )) || (
                <>
                  <option value="1" data-oid="0tv7h4c">
                    Project 1
                  </option>
                  <option value="2" data-oid="qxzz0pv">
                    Project 2
                  </option>
                  <option value="3" data-oid="lnw_:cu">
                    Project 3
                  </option>
                </>
              )}
            </select>
          </div>

          {/* Timer Display */}
          <div
            className="bg-slate-900 border border-slate-700 rounded-xl p-8 mb-6 text-center relative overflow-hidden"
            data-oid="c6yu6z5"
          >
            {/* Glow effect */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-r from-cyan-500/5 via-blue-500/5 to-cyan-500/5 rounded-full blur-2xl"
              data-oid="1tpf2sk"
            ></div>

            {/* Clock design with space/cyan theme */}
            <div className="relative" data-oid="w8.slnq">
              <div
                className="text-7xl font-mono font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-blue-400"
                data-oid="2o_54k-"
              >
                {formatTime(time.hours)}:{formatTime(time.minutes)}:
                {formatTime(time.seconds)}
              </div>

              {/* Decorative orbital ring */}
              <div
                className="absolute -inset-6 rounded-full border border-cyan-500/20 animate-spin-slow opacity-70"
                data-oid="gguijn3"
              ></div>
            </div>
          </div>

          {/* Timer Controls */}
          <div
            className="flex justify-center space-x-4 mb-6"
            data-oid="6p6zxrw"
          >
            <button
              onClick={toggleTimer}
              className={`px-6 py-3 rounded-lg flex items-center justify-center space-x-2 shadow-lg transition-all
                ${
                  isRunning
                    ? "bg-red-600/80 hover:bg-red-700 shadow-red-500/20"
                    : "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 shadow-cyan-500/30"
                }`}
              data-oid="rc5i6s4"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                data-oid="u.3wt_k"
              >
                {isRunning ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    data-oid="45q3hv."
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                    data-oid="aohlejn"
                  />
                )}
              </svg>
              <span data-oid="h621ss9">{isRunning ? "Pause" : "Start"}</span>
            </button>

            <button
              onClick={resetTimer}
              className="px-6 py-3 rounded-lg bg-slate-700/80 hover:bg-slate-600 flex items-center justify-center space-x-2 shadow-lg shadow-slate-800/30 transition-all"
              disabled={!time.seconds && !time.minutes && !time.hours}
              data-oid="x5-__i9"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                data-oid="j6g2xm4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  data-oid="wue7h0h"
                />
              </svg>
              <span data-oid="xg.8fw.">Reset</span>
            </button>
          </div>

          {/* Notes Section */}
          <div data-oid="j2x34b4">
            <label className="block text-slate-300 mb-2" data-oid="ryp8ymo">
              Notes
            </label>
            <textarea
              className="w-full bg-slate-900 border border-slate-700 rounded-lg py-3 px-4 text-white h-24 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              placeholder="Add details about this time entry..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              data-oid="6gbbim5"
            ></textarea>
          </div>
        </div>

        {/* Recent Time Entries */}
        <div
          className="bg-slate-800/70 backdrop-blur-md border border-slate-700/50 rounded-xl p-6 shadow-lg"
          data-oid="j5458ms"
        >
          <h2
            className="text-xl font-medium text-white mb-4"
            data-oid="31tnctw"
          >
            Recent Time Entries
          </h2>

          <div className="space-y-3" data-oid="r8jewew">
            {[1, 2, 3].map((id) => (
              <div
                key={id}
                className="bg-slate-900/80 border border-slate-700/50 rounded-lg p-4 flex justify-between items-center"
                data-oid=".br20bv"
              >
                <div data-oid="24a5t-i">
                  <h3 className="font-medium text-white" data-oid="a6a:xvv">
                    Project {id}
                  </h3>
                  <p className="text-sm text-slate-400" data-oid="51s8086">
                    Task: Site preparation
                  </p>
                </div>
                <div className="text-right" data-oid="_fw_y6z">
                  <p className="text-cyan-400 font-mono" data-oid="3er_3r4">
                    0{id}:45:00
                  </p>
                  <p className="text-xs text-slate-500" data-oid="55p-f1:">
                    Today
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timer;
