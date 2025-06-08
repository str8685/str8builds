import React from "react";
import { useQuery } from "@tanstack/react-query";

const Clients: React.FC = () => {
  // Example query for clients data
  const {
    data: clients,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["clients"],
    queryFn: async () => {
      const response = await fetch("/api/clients");
      if (!response.ok) {
        throw new Error("Failed to fetch clients");
      }
      return response.json();
    },
  });

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white p-4"
      data-oid="czze-xm"
    >
      {/* Animated starfield background */}
      <div
        className="fixed inset-0 -z-10 overflow-hidden opacity-20"
        data-oid="__25:2y"
      >
        <div className="star-small" data-oid="ta.f-cf"></div>
        <div className="star-medium" data-oid="_:mxopc"></div>
        <div className="star-large" data-oid="53-awao"></div>
      </div>

      <div className="max-w-7xl mx-auto" data-oid="tl4x2:b">
        <header className="mb-8" data-oid="g0_zk48">
          <h1
            className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500"
            data-oid="4an00l3"
          >
            Clients
          </h1>
          <p className="text-slate-300 mt-2" data-oid="ti5-2eq">
            Manage your client relationships
          </p>
        </header>

        {isLoading && (
          <div
            className="flex justify-center items-center min-h-[400px]"
            data-oid="guz6ynv"
          >
            <div className="relative w-16 h-16" data-oid="tti2uz_">
              <div
                className="absolute inset-0 rounded-full border-4 border-t-transparent border-cyan-500/70 animate-spin"
                data-oid="wtd--ps"
              ></div>
              <div
                className="absolute inset-3 rounded-full bg-cyan-500/20 animate-pulse"
                data-oid="3y3mgj3"
              ></div>
            </div>
          </div>
        )}

        {error && (
          <div
            className="bg-red-900/30 backdrop-blur-sm border border-red-700/50 rounded-lg p-4 text-red-200"
            data-oid="ocijc:_"
          >
            <p data-oid="38w_-n4">Error loading clients. Please try again.</p>
          </div>
        )}

        {!isLoading && !error && clients && (
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            data-oid="g3tx4kc"
          >
            {/* New Client Card */}
            <button
              className="h-64 bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-md border border-slate-700/50 rounded-xl p-6 flex flex-col items-center justify-center transition-all hover:shadow-lg hover:shadow-cyan-500/20 hover:border-cyan-500/30 group relative overflow-hidden"
              data-oid=":svtbp9"
            >
              {/* Hover glow effect */}
              <div
                className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity"
                data-oid="7phk6:5"
              ></div>

              <div
                className="w-16 h-16 mb-4 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center group-hover:border-cyan-500/50 transition-colors"
                data-oid="x7koafo"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-cyan-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  data-oid="rnqmq-0"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    data-oid="jti6-43"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-white" data-oid="obzqc6p">
                Add Client
              </h3>
              <p
                className="text-slate-400 text-sm mt-2 text-center"
                data-oid="qw2qjyj"
              >
                Create a new client profile
              </p>
            </button>

            {/* Example Client Cards */}
            {[1, 2, 3, 4, 5].map((id) => (
              <div
                key={id}
                className="h-64 bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-md border border-slate-700/50 rounded-xl p-6 flex flex-col transition-all hover:shadow-lg hover:shadow-cyan-500/20 hover:border-cyan-500/30 group relative overflow-hidden"
                data-oid="f5qoa4s"
              >
                {/* Hover glow effect */}
                <div
                  className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity"
                  data-oid="s:-3:ho"
                ></div>

                <div
                  className="flex justify-between items-start mb-4"
                  data-oid="-c:n7yi"
                >
                  <div className="flex items-center" data-oid="7x9aikl">
                    <div
                      className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-medium text-lg mr-3"
                      data-oid="v.6s1v1"
                    >
                      {String.fromCharCode(64 + id)}C
                    </div>
                    <div data-oid="2auurge">
                      <h3
                        className="text-xl font-medium text-white"
                        data-oid="lcxyzb8"
                      >
                        Client {id}
                      </h3>
                      <p className="text-slate-400 text-sm" data-oid="fnc134w">
                        ACME Corporation {id}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-2 space-y-2" data-oid=".7at0rb">
                  <div className="flex items-center text-sm" data-oid="0a30zwv">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-2 text-cyan-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      data-oid="1jxi6dz"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        data-oid="_0obdp."
                      />
                    </svg>
                    <span className="text-slate-300" data-oid="r4zoq4m">
                      client{id}@example.com
                    </span>
                  </div>
                  <div className="flex items-center text-sm" data-oid="hsonne:">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-2 text-cyan-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      data-oid="1qhfk5h"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        data-oid="3xwr799"
                      />
                    </svg>
                    <span className="text-slate-300" data-oid="17pqeiz">
                      (555) 123-45{id}8
                    </span>
                  </div>
                </div>

                <div
                  className="mt-auto pt-4 flex justify-between"
                  data-oid="r3gt7bb"
                >
                  <span
                    className="px-2 py-1 text-xs rounded-full bg-cyan-500/20 text-cyan-300"
                    data-oid="ga2.u7o"
                  >
                    {id + 1} Projects
                  </span>
                  <span
                    className="px-2 py-1 text-xs rounded-full bg-green-500/20 text-green-300"
                    data-oid="tjjvr5n"
                  >
                    Active
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Clients;
