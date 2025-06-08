import React from "react";
import { useQuery } from "@tanstack/react-query";

const Projects: React.FC = () => {
  // Example query for projects data
  const {
    data: projects,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const response = await fetch("/api/projects");
      if (!response.ok) {
        throw new Error("Failed to fetch projects");
      }
      return response.json();
    },
  });

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white p-4"
      data-oid="_aia1bw"
    >
      {/* Animated starfield background */}
      <div
        className="fixed inset-0 -z-10 overflow-hidden opacity-20"
        data-oid="sg2pot4"
      >
        <div className="star-small" data-oid="1bwdj83"></div>
        <div className="star-medium" data-oid="3olq10h"></div>
        <div className="star-large" data-oid="t0vi4ci"></div>
      </div>

      <div className="max-w-7xl mx-auto" data-oid="e37xhtb">
        <header className="mb-8" data-oid="om7halv">
          <h1
            className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500"
            data-oid="9iz2t-h"
          >
            Projects
          </h1>
          <p className="text-slate-300 mt-2" data-oid="6q:zl5i">
            Manage your construction projects
          </p>
        </header>

        {isLoading && (
          <div
            className="flex justify-center items-center min-h-[400px]"
            data-oid="ih1yy-y"
          >
            <div className="relative w-16 h-16" data-oid="2ndrhzl">
              <div
                className="absolute inset-0 rounded-full border-4 border-t-transparent border-cyan-500/70 animate-spin"
                data-oid="1:nel15"
              ></div>
              <div
                className="absolute inset-3 rounded-full bg-cyan-500/20 animate-pulse"
                data-oid="a71rrp-"
              ></div>
            </div>
          </div>
        )}

        {error && (
          <div
            className="bg-red-900/30 backdrop-blur-sm border border-red-700/50 rounded-lg p-4 text-red-200"
            data-oid="gp7xu:f"
          >
            <p data-oid="ofgdo1t">Error loading projects. Please try again.</p>
          </div>
        )}

        {!isLoading && !error && projects && (
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            data-oid="9bgroou"
          >
            {/* New Project Card */}
            <button
              className="h-64 bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-md border border-slate-700/50 rounded-xl p-6 flex flex-col items-center justify-center transition-all hover:shadow-lg hover:shadow-cyan-500/20 hover:border-cyan-500/30 group relative overflow-hidden"
              data-oid="no.mn5u"
            >
              {/* Hover glow effect */}
              <div
                className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity"
                data-oid="fyokhdb"
              ></div>

              <div
                className="w-16 h-16 mb-4 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center group-hover:border-cyan-500/50 transition-colors"
                data-oid="wdm-e3h"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-cyan-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  data-oid="apkqxvj"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    data-oid="jp3s:jb"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-white" data-oid="e0jfu6r">
                New Project
              </h3>
              <p
                className="text-slate-400 text-sm mt-2 text-center"
                data-oid="zt2gvg3"
              >
                Create a new construction project
              </p>
            </button>

            {/* Example Project Cards */}
            {[1, 2, 3, 4, 5].map((id) => (
              <div
                key={id}
                className="h-64 bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-md border border-slate-700/50 rounded-xl p-6 flex flex-col transition-all hover:shadow-lg hover:shadow-cyan-500/20 hover:border-cyan-500/30 group relative overflow-hidden"
                data-oid="vddup1v"
              >
                {/* Hover glow effect */}
                <div
                  className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity"
                  data-oid="ioxn-fj"
                ></div>

                <div
                  className="flex justify-between items-start mb-4"
                  data-oid="4ggo_u4"
                >
                  <h3
                    className="text-xl font-medium text-white"
                    data-oid="h-8bk2v"
                  >
                    Project {id}
                  </h3>
                  <span
                    className="px-2 py-1 text-xs rounded-full bg-cyan-500/20 text-cyan-300"
                    data-oid="aw2spam"
                  >
                    Active
                  </span>
                </div>

                <p className="text-slate-400 text-sm" data-oid="tm699eb">
                  123 Main Street, Suite {id}00
                </p>
                <p className="text-slate-400 text-sm mb-4" data-oid="a3hwro4">
                  Client: ACME Corporation
                </p>

                <div className="mt-auto" data-oid="1oqxyz2">
                  <div
                    className="w-full bg-slate-700/50 rounded-full h-2 mb-2"
                    data-oid="hq4_-58"
                  >
                    <div
                      className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full"
                      style={{ width: `${id * 15}%` }}
                      data-oid="oleco:c"
                    ></div>
                  </div>
                  <div
                    className="flex justify-between text-xs"
                    data-oid="-r:glbg"
                  >
                    <span className="text-slate-400" data-oid="81pcr8k">
                      {id * 15}% Complete
                    </span>
                    <span className="text-slate-400" data-oid="2l9a3jq">
                      Due: Jan {id + 10}, 2024
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;
