import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState("profile");

  // Example query for user profile data
  const { data: user } = useQuery({
    queryKey: ["user-profile"],
    queryFn: async () => {
      const response = await fetch("/api/auth/me");
      if (!response.ok) {
        throw new Error("Failed to fetch user profile");
      }
      return response.json();
    },
  });

  const tabs = [
    { id: "profile", label: "Profile" },
    { id: "account", label: "Account" },
    { id: "appearance", label: "Appearance" },
    { id: "notifications", label: "Notifications" },
    { id: "billing", label: "Billing" },
  ];

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white p-4"
      data-oid="9ufd6wt"
    >
      {/* Animated starfield background */}
      <div
        className="fixed inset-0 -z-10 overflow-hidden opacity-20"
        data-oid="i.j-d-m"
      >
        <div className="star-small" data-oid="e0n:sb7"></div>
        <div className="star-medium" data-oid=":yusccl"></div>
        <div className="star-large" data-oid="9oy6k41"></div>
      </div>

      <div className="max-w-6xl mx-auto" data-oid="a5qg6rs">
        <header className="mb-8" data-oid="g-i.-1g">
          <h1
            className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500"
            data-oid="d2uqrqm"
          >
            Settings
          </h1>
          <p className="text-slate-300 mt-2" data-oid="gwssemi">
            Manage your account and preferences
          </p>
        </header>

        <div className="flex flex-col md:flex-row gap-6" data-oid="asxgo16">
          {/* Sidebar */}
          <div
            className="md:w-64 bg-slate-800/70 backdrop-blur-md border border-slate-700/50 rounded-xl p-4 h-fit"
            data-oid="6gkdk_8"
          >
            <nav data-oid="l186mwu">
              <ul className="space-y-1" data-oid="wvw7e18">
                {tabs.map((tab) => (
                  <li key={tab.id} data-oid="bla6wm3">
                    <button
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full text-left px-4 py-3 rounded-lg flex items-center space-x-3 transition-all ${
                        activeTab === tab.id
                          ? "bg-gradient-to-r from-cyan-500/20 to-blue-600/20 text-white border border-cyan-500/30"
                          : "hover:bg-slate-700/50 text-slate-300"
                      }`}
                      data-oid="b_4rfrm"
                    >
                      <span data-oid="9620-17">{tab.label}</span>

                      {activeTab === tab.id && (
                        <span className="ml-auto" data-oid="58af7q4">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-cyan-400"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            data-oid="f4.u__3"
                          >
                            <path
                              fillRule="evenodd"
                              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                              clipRule="evenodd"
                              data-oid="juuk5jx"
                            />
                          </svg>
                        </span>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Main Content */}
          <div
            className="flex-1 bg-slate-800/70 backdrop-blur-md border border-slate-700/50 rounded-xl p-6"
            data-oid="wn:ni.c"
          >
            {activeTab === "profile" && (
              <div data-oid="6pigtez">
                <h2 className="text-xl font-semibold mb-6" data-oid="bx_djjr">
                  Profile Settings
                </h2>

                {/* Profile Avatar Section */}
                <div
                  className="flex flex-col sm:flex-row gap-6 mb-8 items-center sm:items-start"
                  data-oid="975n4zh"
                >
                  <div className="relative" data-oid="m4ujxrz">
                    <div
                      className="w-32 h-32 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white text-4xl font-bold overflow-hidden"
                      data-oid="tlu.dm8"
                    >
                      {user?.avatar ? (
                        <img
                          src={user.avatar}
                          alt="Profile"
                          className="w-full h-full object-cover"
                          data-oid="i-k:dl."
                        />
                      ) : (
                        user?.name?.charAt(0) || "U"
                      )}
                    </div>
                    <button
                      className="absolute bottom-0 right-0 bg-cyan-500 hover:bg-cyan-600 text-white rounded-full p-2 shadow-lg shadow-cyan-500/30 transition-colors"
                      data-oid="k9fvfxj"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        data-oid="i-2wkr-"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z"
                          clipRule="evenodd"
                          data-oid="4bznp7p"
                        />
                      </svg>
                    </button>
                  </div>

                  <div
                    className="flex-1 text-center sm:text-left"
                    data-oid="69:odlz"
                  >
                    <h3
                      className="text-xl font-medium text-white"
                      data-oid="ghf5mhh"
                    >
                      {user?.name || "User Name"}
                    </h3>
                    <p className="text-slate-400" data-oid="utgq8in">
                      {user?.email || "user@example.com"}
                    </p>
                    <p
                      className="text-cyan-400 text-sm mt-2"
                      data-oid="ipjzs2u"
                    >
                      Pro Account
                    </p>

                    <div
                      className="mt-4 flex flex-wrap gap-2 justify-center sm:justify-start"
                      data-oid=".8wxzch"
                    >
                      <span
                        className="px-3 py-1 text-xs rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
                        data-oid="-9paaa."
                      >
                        Contractor
                      </span>
                      <span
                        className="px-3 py-1 text-xs rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30"
                        data-oid="xdl5jf:"
                      >
                        Project Manager
                      </span>
                    </div>
                  </div>
                </div>

                {/* Form Sections */}
                <div className="space-y-6" data-oid="4373h6g">
                  <div
                    className="bg-slate-900/60 border border-slate-700/50 rounded-lg p-4"
                    data-oid="jclqze1"
                  >
                    <h3
                      className="text-white font-medium mb-4"
                      data-oid="zr46i8m"
                    >
                      Personal Information
                    </h3>
                    <div
                      className="grid grid-cols-1 md:grid-cols-2 gap-4"
                      data-oid="v5r0c_z"
                    >
                      <div data-oid="kh-vcl7">
                        <label
                          className="block text-slate-400 text-sm mb-1"
                          data-oid="c1ox7aa"
                        >
                          Full Name
                        </label>
                        <input
                          type="text"
                          className="w-full bg-slate-800 border border-slate-700 rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                          defaultValue={user?.name || ""}
                          data-oid="gu8maja"
                        />
                      </div>
                      <div data-oid="eq9gg1r">
                        <label
                          className="block text-slate-400 text-sm mb-1"
                          data-oid="idsgr6z"
                        >
                          Email Address
                        </label>
                        <input
                          type="email"
                          className="w-full bg-slate-800 border border-slate-700 rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                          defaultValue={user?.email || ""}
                          data-oid="y80n-9_"
                        />
                      </div>
                      <div data-oid="sd36l9u">
                        <label
                          className="block text-slate-400 text-sm mb-1"
                          data-oid=".3w2u7z"
                        >
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          className="w-full bg-slate-800 border border-slate-700 rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                          defaultValue={user?.phone || ""}
                          data-oid="e-9pz.g"
                        />
                      </div>
                      <div data-oid="fwt_zk_">
                        <label
                          className="block text-slate-400 text-sm mb-1"
                          data-oid="rtb9c2v"
                        >
                          Job Title
                        </label>
                        <input
                          type="text"
                          className="w-full bg-slate-800 border border-slate-700 rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                          defaultValue={user?.jobTitle || ""}
                          data-oid="q0x8zwy"
                        />
                      </div>
                    </div>
                  </div>

                  <div
                    className="bg-slate-900/60 border border-slate-700/50 rounded-lg p-4"
                    data-oid="no-ori4"
                  >
                    <h3
                      className="text-white font-medium mb-4"
                      data-oid="ul1rcv_"
                    >
                      Company Information
                    </h3>
                    <div
                      className="grid grid-cols-1 md:grid-cols-2 gap-4"
                      data-oid="4z0ptv."
                    >
                      <div data-oid="_.qi:yi">
                        <label
                          className="block text-slate-400 text-sm mb-1"
                          data-oid="y7y9329"
                        >
                          Company Name
                        </label>
                        <input
                          type="text"
                          className="w-full bg-slate-800 border border-slate-700 rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                          defaultValue={user?.company?.name || ""}
                          data-oid="x-zwnnh"
                        />
                      </div>
                      <div data-oid="pgkbs9a">
                        <label
                          className="block text-slate-400 text-sm mb-1"
                          data-oid="9jocl88"
                        >
                          Tax ID / EIN
                        </label>
                        <input
                          type="text"
                          className="w-full bg-slate-800 border border-slate-700 rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                          defaultValue={user?.company?.taxId || ""}
                          data-oid="v2w3_hs"
                        />
                      </div>
                    </div>
                  </div>

                  <div
                    className="bg-slate-900/60 border border-slate-700/50 rounded-lg p-4"
                    data-oid="qiltymt"
                  >
                    <h3
                      className="text-white font-medium mb-4"
                      data-oid="nucy-9n"
                    >
                      Address
                    </h3>
                    <div
                      className="grid grid-cols-1 md:grid-cols-2 gap-4"
                      data-oid="quqaaoi"
                    >
                      <div className="md:col-span-2" data-oid="1qt34cn">
                        <label
                          className="block text-slate-400 text-sm mb-1"
                          data-oid="6glndmy"
                        >
                          Street Address
                        </label>
                        <input
                          type="text"
                          className="w-full bg-slate-800 border border-slate-700 rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                          defaultValue={user?.address?.street || ""}
                          data-oid=".890yfd"
                        />
                      </div>
                      <div data-oid="wnvi.:-">
                        <label
                          className="block text-slate-400 text-sm mb-1"
                          data-oid="p1wc9xm"
                        >
                          City
                        </label>
                        <input
                          type="text"
                          className="w-full bg-slate-800 border border-slate-700 rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                          defaultValue={user?.address?.city || ""}
                          data-oid="i72f4qs"
                        />
                      </div>
                      <div data-oid="emvb:a4">
                        <label
                          className="block text-slate-400 text-sm mb-1"
                          data-oid="-4pdy22"
                        >
                          State / Province
                        </label>
                        <input
                          type="text"
                          className="w-full bg-slate-800 border border-slate-700 rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                          defaultValue={user?.address?.state || ""}
                          data-oid="2oxzo_x"
                        />
                      </div>
                      <div data-oid="kd0u99u">
                        <label
                          className="block text-slate-400 text-sm mb-1"
                          data-oid="hkkf59i"
                        >
                          ZIP / Postal Code
                        </label>
                        <input
                          type="text"
                          className="w-full bg-slate-800 border border-slate-700 rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                          defaultValue={user?.address?.zip || ""}
                          data-oid="it5_tie"
                        />
                      </div>
                      <div data-oid="1j5kep2">
                        <label
                          className="block text-slate-400 text-sm mb-1"
                          data-oid="cjx-h2e"
                        >
                          Country
                        </label>
                        <input
                          type="text"
                          className="w-full bg-slate-800 border border-slate-700 rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                          defaultValue={user?.address?.country || ""}
                          data-oid="5b9kuse"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-end" data-oid="n45mr3u">
                  <button
                    className="px-6 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white shadow-lg shadow-cyan-500/30 transition-all"
                    data-oid="64qwdb3"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            )}

            {activeTab === "account" && (
              <div data-oid="-bwe16d">
                <h2 className="text-xl font-semibold mb-6" data-oid="6ck3ohk">
                  Account Settings
                </h2>
                <p className="text-slate-400" data-oid="otofw1d">
                  Manage your account security and preferences
                </p>
              </div>
            )}

            {activeTab === "appearance" && (
              <div data-oid="c8ibs2h">
                <h2 className="text-xl font-semibold mb-6" data-oid="18o-xfc">
                  Appearance
                </h2>
                <p className="text-slate-400" data-oid="-f7oa-f">
                  Customize your interface
                </p>
              </div>
            )}

            {activeTab === "notifications" && (
              <div data-oid=":38d-gw">
                <h2 className="text-xl font-semibold mb-6" data-oid="qf6z3ns">
                  Notifications
                </h2>
                <p className="text-slate-400" data-oid="2pdy3ba">
                  Manage how you receive alerts and updates
                </p>
              </div>
            )}

            {activeTab === "billing" && (
              <div data-oid="yv5fe79">
                <h2 className="text-xl font-semibold mb-6" data-oid="taeok9c">
                  Billing & Subscription
                </h2>
                <p className="text-slate-400" data-oid="fnj6ojy">
                  Manage your payment methods and subscription plan
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
