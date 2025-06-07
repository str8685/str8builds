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
      data-oid="5o.qbt6"
    >
      {/* Animated starfield background */}
      <div
        className="fixed inset-0 -z-10 overflow-hidden opacity-20"
        data-oid="m:o21yy"
      >
        <div className="star-small" data-oid="8f_2-ie"></div>
        <div className="star-medium" data-oid="epzppzu"></div>
        <div className="star-large" data-oid=".j8lpu4"></div>
      </div>

      <div className="max-w-6xl mx-auto" data-oid="r4agyg_">
        <header className="mb-8" data-oid="g-quhwd">
          <h1
            className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500"
            data-oid="3voumb5"
          >
            Settings
          </h1>
          <p className="text-slate-300 mt-2" data-oid=".-2.xkl">
            Manage your account and preferences
          </p>
        </header>

        <div className="flex flex-col md:flex-row gap-6" data-oid="ixulqpl">
          {/* Sidebar */}
          <div
            className="md:w-64 bg-slate-800/70 backdrop-blur-md border border-slate-700/50 rounded-xl p-4 h-fit"
            data-oid="gdzj8ih"
          >
            <nav data-oid="6rm7jne">
              <ul className="space-y-1" data-oid="z102n-s">
                {tabs.map((tab) => (
                  <li key={tab.id} data-oid="sfqp-t4">
                    <button
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full text-left px-4 py-3 rounded-lg flex items-center space-x-3 transition-all ${
                        activeTab === tab.id
                          ? "bg-gradient-to-r from-cyan-500/20 to-blue-600/20 text-white border border-cyan-500/30"
                          : "hover:bg-slate-700/50 text-slate-300"
                      }`}
                      data-oid="-goqkjw"
                    >
                      <span data-oid="7y:y893">{tab.label}</span>

                      {activeTab === tab.id && (
                        <span className="ml-auto" data-oid="e7eezg:">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-cyan-400"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            data-oid="6fp4whs"
                          >
                            <path
                              fillRule="evenodd"
                              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                              clipRule="evenodd"
                              data-oid="5s79p4v"
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
            data-oid="2si36k9"
          >
            {activeTab === "profile" && (
              <div data-oid="c:2rf11">
                <h2 className="text-xl font-semibold mb-6" data-oid="58v448w">
                  Profile Settings
                </h2>

                {/* Profile Avatar Section */}
                <div
                  className="flex flex-col sm:flex-row gap-6 mb-8 items-center sm:items-start"
                  data-oid="bgiy.db"
                >
                  <div className="relative" data-oid=".shy29q">
                    <div
                      className="w-32 h-32 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white text-4xl font-bold overflow-hidden"
                      data-oid="c250wu1"
                    >
                      {user?.avatar ? (
                        <img
                          src={user.avatar}
                          alt="Profile"
                          className="w-full h-full object-cover"
                          data-oid="qnd-:sb"
                        />
                      ) : (
                        user?.name?.charAt(0) || "U"
                      )}
                    </div>
                    <button
                      className="absolute bottom-0 right-0 bg-cyan-500 hover:bg-cyan-600 text-white rounded-full p-2 shadow-lg shadow-cyan-500/30 transition-colors"
                      data-oid="_rnn6q7"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        data-oid="rbad0vz"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z"
                          clipRule="evenodd"
                          data-oid="2my:qds"
                        />
                      </svg>
                    </button>
                  </div>

                  <div
                    className="flex-1 text-center sm:text-left"
                    data-oid="w6ihrje"
                  >
                    <h3
                      className="text-xl font-medium text-white"
                      data-oid=":p--z8a"
                    >
                      {user?.name || "User Name"}
                    </h3>
                    <p className="text-slate-400" data-oid="0v..m_a">
                      {user?.email || "user@example.com"}
                    </p>
                    <p
                      className="text-cyan-400 text-sm mt-2"
                      data-oid="d.s4l5f"
                    >
                      Pro Account
                    </p>

                    <div
                      className="mt-4 flex flex-wrap gap-2 justify-center sm:justify-start"
                      data-oid="35fppet"
                    >
                      <span
                        className="px-3 py-1 text-xs rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
                        data-oid="e923zc3"
                      >
                        Contractor
                      </span>
                      <span
                        className="px-3 py-1 text-xs rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30"
                        data-oid="h9xuau1"
                      >
                        Project Manager
                      </span>
                    </div>
                  </div>
                </div>

                {/* Form Sections */}
                <div className="space-y-6" data-oid="ifsr.59">
                  <div
                    className="bg-slate-900/60 border border-slate-700/50 rounded-lg p-4"
                    data-oid="ljkutno"
                  >
                    <h3
                      className="text-white font-medium mb-4"
                      data-oid="3zqt6ci"
                    >
                      Personal Information
                    </h3>
                    <div
                      className="grid grid-cols-1 md:grid-cols-2 gap-4"
                      data-oid="tflu.03"
                    >
                      <div data-oid="w.8r.nl">
                        <label
                          className="block text-slate-400 text-sm mb-1"
                          data-oid="w271-mt"
                        >
                          Full Name
                        </label>
                        <input
                          type="text"
                          className="w-full bg-slate-800 border border-slate-700 rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                          defaultValue={user?.name || ""}
                          data-oid="15g9izn"
                        />
                      </div>
                      <div data-oid="lnjxwl5">
                        <label
                          className="block text-slate-400 text-sm mb-1"
                          data-oid=":x148o3"
                        >
                          Email Address
                        </label>
                        <input
                          type="email"
                          className="w-full bg-slate-800 border border-slate-700 rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                          defaultValue={user?.email || ""}
                          data-oid="sva:8zo"
                        />
                      </div>
                      <div data-oid="zbpa5ip">
                        <label
                          className="block text-slate-400 text-sm mb-1"
                          data-oid=":xagetp"
                        >
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          className="w-full bg-slate-800 border border-slate-700 rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                          defaultValue={user?.phone || ""}
                          data-oid="fgrwvf_"
                        />
                      </div>
                      <div data-oid="kvkntxq">
                        <label
                          className="block text-slate-400 text-sm mb-1"
                          data-oid="-9fyl82"
                        >
                          Job Title
                        </label>
                        <input
                          type="text"
                          className="w-full bg-slate-800 border border-slate-700 rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                          defaultValue={user?.jobTitle || ""}
                          data-oid="j8lzd80"
                        />
                      </div>
                    </div>
                  </div>

                  <div
                    className="bg-slate-900/60 border border-slate-700/50 rounded-lg p-4"
                    data-oid="ezx441o"
                  >
                    <h3
                      className="text-white font-medium mb-4"
                      data-oid="_igz8ku"
                    >
                      Company Information
                    </h3>
                    <div
                      className="grid grid-cols-1 md:grid-cols-2 gap-4"
                      data-oid="atoyhys"
                    >
                      <div data-oid="ow:6c9e">
                        <label
                          className="block text-slate-400 text-sm mb-1"
                          data-oid=":w4bpq1"
                        >
                          Company Name
                        </label>
                        <input
                          type="text"
                          className="w-full bg-slate-800 border border-slate-700 rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                          defaultValue={user?.company?.name || ""}
                          data-oid="_30i585"
                        />
                      </div>
                      <div data-oid=":qm4dw_">
                        <label
                          className="block text-slate-400 text-sm mb-1"
                          data-oid="4s_8k1p"
                        >
                          Tax ID / EIN
                        </label>
                        <input
                          type="text"
                          className="w-full bg-slate-800 border border-slate-700 rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                          defaultValue={user?.company?.taxId || ""}
                          data-oid="d3p2:8i"
                        />
                      </div>
                    </div>
                  </div>

                  <div
                    className="bg-slate-900/60 border border-slate-700/50 rounded-lg p-4"
                    data-oid="ixiwd7w"
                  >
                    <h3
                      className="text-white font-medium mb-4"
                      data-oid="a00v882"
                    >
                      Address
                    </h3>
                    <div
                      className="grid grid-cols-1 md:grid-cols-2 gap-4"
                      data-oid="738wjn9"
                    >
                      <div className="md:col-span-2" data-oid="39fywi-">
                        <label
                          className="block text-slate-400 text-sm mb-1"
                          data-oid="0:ggh6h"
                        >
                          Street Address
                        </label>
                        <input
                          type="text"
                          className="w-full bg-slate-800 border border-slate-700 rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                          defaultValue={user?.address?.street || ""}
                          data-oid="l:w146g"
                        />
                      </div>
                      <div data-oid="m7whl:n">
                        <label
                          className="block text-slate-400 text-sm mb-1"
                          data-oid=".yesg6y"
                        >
                          City
                        </label>
                        <input
                          type="text"
                          className="w-full bg-slate-800 border border-slate-700 rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                          defaultValue={user?.address?.city || ""}
                          data-oid="y:wv.9f"
                        />
                      </div>
                      <div data-oid="_k.w.c3">
                        <label
                          className="block text-slate-400 text-sm mb-1"
                          data-oid="rv3iqid"
                        >
                          State / Province
                        </label>
                        <input
                          type="text"
                          className="w-full bg-slate-800 border border-slate-700 rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                          defaultValue={user?.address?.state || ""}
                          data-oid="jlhyr_:"
                        />
                      </div>
                      <div data-oid="bwonzbk">
                        <label
                          className="block text-slate-400 text-sm mb-1"
                          data-oid="2tiqpmp"
                        >
                          ZIP / Postal Code
                        </label>
                        <input
                          type="text"
                          className="w-full bg-slate-800 border border-slate-700 rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                          defaultValue={user?.address?.zip || ""}
                          data-oid="flutb:l"
                        />
                      </div>
                      <div data-oid="g5mj0a.">
                        <label
                          className="block text-slate-400 text-sm mb-1"
                          data-oid="ykxl:f."
                        >
                          Country
                        </label>
                        <input
                          type="text"
                          className="w-full bg-slate-800 border border-slate-700 rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                          defaultValue={user?.address?.country || ""}
                          data-oid="ni6r5or"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-end" data-oid="g9wngfs">
                  <button
                    className="px-6 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white shadow-lg shadow-cyan-500/30 transition-all"
                    data-oid="e:2rgi4"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            )}

            {activeTab === "account" && (
              <div data-oid="9fmz6_b">
                <h2 className="text-xl font-semibold mb-6" data-oid="yu9wbx:">
                  Account Settings
                </h2>
                <p className="text-slate-400" data-oid="q.eb4s7">
                  Manage your account security and preferences
                </p>
              </div>
            )}

            {activeTab === "appearance" && (
              <div data-oid="-fb8ujk">
                <h2 className="text-xl font-semibold mb-6" data-oid="7q5o.rt">
                  Appearance
                </h2>
                <p className="text-slate-400" data-oid="5.q6:91">
                  Customize your interface
                </p>
              </div>
            )}

            {activeTab === "notifications" && (
              <div data-oid="ofpsgks">
                <h2 className="text-xl font-semibold mb-6" data-oid="wbui40o">
                  Notifications
                </h2>
                <p className="text-slate-400" data-oid="3f7cj97">
                  Manage how you receive alerts and updates
                </p>
              </div>
            )}

            {activeTab === "billing" && (
              <div data-oid="m6lsn3n">
                <h2 className="text-xl font-semibold mb-6" data-oid="ixe92ww">
                  Billing & Subscription
                </h2>
                <p className="text-slate-400" data-oid="91gy1on">
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
