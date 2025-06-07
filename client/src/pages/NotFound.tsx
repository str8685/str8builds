import React from "react";
import { Link } from "wouter";

const NotFound: React.FC = () => {
  return (
    <div
      className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4"
      data-oid="zqgdn1o"
    >
      <div className="relative z-10 max-w-md w-full mx-auto" data-oid="nr.9gpk">
        {/* Animated starfield background */}
        <div
          className="absolute inset-0 -z-10 overflow-hidden opacity-30"
          data-oid="2yo4_eq"
        >
          <div className="star-small" data-oid="7q0tcds"></div>
          <div className="star-medium" data-oid="jxpt0px"></div>
          <div className="star-large" data-oid="fzkg-yq"></div>
        </div>

        {/* Glow effect */}
        <div
          className="absolute -inset-10 bg-cyan-500/20 rounded-full blur-3xl opacity-70"
          data-oid="lxt0l-8"
        ></div>

        <div
          className="backdrop-blur-md bg-slate-900/40 border border-slate-700/50 rounded-xl p-8 shadow-xl"
          data-oid="w74sw8s"
        >
          <div className="text-center" data-oid="zyz84jn">
            <h1
              className="text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-6"
              data-oid="4ukp4:y"
            >
              404
            </h1>
            <h2
              className="text-2xl font-semibold text-white mb-3"
              data-oid="96jtq19"
            >
              Page Not Found
            </h2>
            <p className="text-slate-300 mb-8" data-oid="v:nfhsm">
              The page you're looking for doesn't exist or has been moved.
            </p>

            <Link href="/" data-oid="g_9nth7">
              <a
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 shadow-lg shadow-cyan-500/30 transition-all"
                data-oid="9zbln:n"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  data-oid="81guj8d"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
                    clipRule="evenodd"
                    data-oid="7o4dvla"
                  />
                </svg>
                Return Home
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
