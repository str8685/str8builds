import { FC } from "react";
import GlassCard from "@/components/ui/GlassCard";
import { BarChart, PieChart, LineChart } from "recharts";
import {
  User,
  Clock,
  DollarSign,
  Award,
  UserCheck,
  AlertTriangle,
  Server,
  Database,
} from "lucide-react";

// Define types for our data
interface UserGrowthData {
  name: string;
  users: number;
}

interface SubscriptionData {
  name: string;
  value: number;
}

// Initial empty data - will be populated from API
const data = {
  totalUsers: 1,
  activeUsers: 1,
  totalProjects: 0,
  activeProjects: 0,
  revenueMonth: "$0",
  userGrowth: [] as UserGrowthData[],
  subscriptionDistribution: [] as SubscriptionData[],
  systemHealth: {
    cpu: 0,
    memory: 0,
    disk: 0,
    errors24h: 0,
  },
};

const AdminDashboard: FC = () => {
  return (
    <div className="space-y-4" data-oid="m:vp4:_">
      <h3 className="text-xl font-bold text-white" data-oid="xy_8r4m">
        Admin Dashboard
      </h3>

      {/* Key Metrics Section */}
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        data-oid="p6.kr2_"
      >
        <GlassCard className="p-4 flex items-center" data-oid="n47x8pi">
          <div
            className="h-10 w-10 rounded-full bg-purple-900/60 flex items-center justify-center mr-3"
            data-oid="ms3qjm4"
          >
            <User className="h-5 w-5 text-cyan" data-oid="qk-xghk" />
          </div>
          <div data-oid="vtrebv3">
            <div className="text-sm text-gray-400" data-oid="arhwp6r">
              Total Users
            </div>
            <div className="text-2xl font-bold text-white" data-oid="2uzjx:h">
              {data.totalUsers}
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-4 flex items-center" data-oid="6eynwuh">
          <div
            className="h-10 w-10 rounded-full bg-purple-900/60 flex items-center justify-center mr-3"
            data-oid="9_ctrc."
          >
            <UserCheck className="h-5 w-5 text-teal" data-oid="7plwp3i" />
          </div>
          <div data-oid="_70js2c">
            <div className="text-sm text-gray-400" data-oid="mgffb:a">
              Active Users
            </div>
            <div className="text-2xl font-bold text-white" data-oid="u0ajlrb">
              {data.activeUsers}
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-4 flex items-center" data-oid="dzkj8_.">
          <div
            className="h-10 w-10 rounded-full bg-purple-900/60 flex items-center justify-center mr-3"
            data-oid="z928jck"
          >
            <Clock className="h-5 w-5 text-electric" data-oid="i89p:m3" />
          </div>
          <div data-oid="svxl9q6">
            <div className="text-sm text-gray-400" data-oid="8ds0f38">
              Active Projects
            </div>
            <div className="text-2xl font-bold text-white" data-oid="e.-0pjg">
              {data.activeProjects}
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-4 flex items-center" data-oid="5pi5rrq">
          <div
            className="h-10 w-10 rounded-full bg-purple-900/60 flex items-center justify-center mr-3"
            data-oid="d5yiiit"
          >
            <DollarSign className="h-5 w-5 text-green-400" data-oid="vr3hbzy" />
          </div>
          <div data-oid="trv2965">
            <div className="text-sm text-gray-400" data-oid="gjs.-jw">
              Monthly Revenue
            </div>
            <div className="text-2xl font-bold text-white" data-oid="b1d7ry3">
              {data.revenueMonth}
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4" data-oid="hko47:u">
        <GlassCard className="p-4" data-oid="d5cgs07">
          <div
            className="flex justify-between items-center mb-4"
            data-oid="929btrz"
          >
            <h4 className="text-md font-bold text-white" data-oid="::v7rv7">
              User Growth
            </h4>
            <span className="text-xs text-gray-400" data-oid="-fj8ldv">
              Last 6 months
            </span>
          </div>
          <div className="h-60 w-full" data-oid="rx__1lf">
            {/* In a real app, implement actual chart */}
            <div
              className="h-full w-full flex items-center justify-center bg-space-900/50 rounded-lg border border-gray-700"
              data-oid="_k7l7b1"
            >
              <div className="text-center" data-oid="bkm3ogi">
                <div className="text-gray-400 mb-2" data-oid="gmc0w.z">
                  User Growth Chart
                </div>
                {data.userGrowth.length === 0 ? (
                  <div className="text-gray-500 text-sm" data-oid="x..56c7">
                    No data available
                  </div>
                ) : (
                  <div
                    className="grid grid-cols-6 gap-1 h-32 items-end px-4"
                    data-oid="d0.181l"
                  >
                    {data.userGrowth.map((month, idx) => (
                      <div
                        key={idx}
                        className="flex flex-col items-center"
                        data-oid="7cansgz"
                      >
                        <div
                          className="w-full bg-gradient-to-t from-purple-900 to-cyan rounded-t"
                          style={{ height: `${(month.users / 250) * 100}%` }}
                          data-oid="c9um6e3"
                        ></div>
                        <div
                          className="text-xs text-gray-500 mt-1"
                          data-oid="jd6pobu"
                        >
                          {month.name}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-4" data-oid="6qg6w7r">
          <div
            className="flex justify-between items-center mb-4"
            data-oid="cu7qj6b"
          >
            <h4 className="text-md font-bold text-white" data-oid="q-di.i9">
              Subscription Plans
            </h4>
            <span className="text-xs text-gray-400" data-oid="ppphemo">
              Distribution
            </span>
          </div>
          <div className="h-60 w-full" data-oid="vq3h4hv">
            {/* In a real app, implement actual chart */}
            <div
              className="h-full w-full flex items-center justify-center bg-space-900/50 rounded-lg border border-gray-700"
              data-oid="dpx6xw6"
            >
              <div className="text-center space-y-3" data-oid="5gdwd.z">
                <div className="text-gray-400" data-oid="pxi3i94">
                  Subscription Distribution
                </div>
                {data.subscriptionDistribution.length === 0 ? (
                  <div
                    className="text-gray-500 text-sm mt-4"
                    data-oid=":pby4ic"
                  >
                    No data available
                  </div>
                ) : (
                  <div
                    className="flex justify-center space-x-6"
                    data-oid="6r5pxoj"
                  >
                    {data.subscriptionDistribution.map((plan, idx) => (
                      <div key={idx} className="text-center" data-oid="zcjklgn">
                        <div
                          className="w-16 h-16 rounded-full mx-auto mb-2"
                          style={{
                            background:
                              idx === 0
                                ? "rgb(59, 130, 246)"
                                : idx === 1
                                  ? "rgb(16, 185, 129)"
                                  : "rgb(139, 92, 246)",
                            opacity: 0.8,
                          }}
                          data-oid="070lt0k"
                        ></div>
                        <div className="text-sm text-white" data-oid="jro-32y">
                          {plan.name}
                        </div>
                        <div
                          className="text-xs text-gray-400"
                          data-oid="vz8__ns"
                        >
                          {plan.value} users
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* System Health */}
      <GlassCard className="p-4" data-oid="p00v-8e">
        <div
          className="flex justify-between items-center mb-4"
          data-oid="yjj91v7"
        >
          <h4 className="text-md font-bold text-white" data-oid="kkw6qmq">
            System Health
          </h4>
          <span
            className="text-xs px-2 py-1 rounded-full bg-green-900 text-green-400"
            data-oid="0gm4js_"
          >
            All Systems Operational
          </span>
        </div>
        <div
          className="grid grid-cols-1 md:grid-cols-4 gap-4"
          data-oid="atq929i"
        >
          <div
            className="bg-space-900/50 p-3 rounded-lg flex items-center"
            data-oid="0wstd3q"
          >
            <Server className="h-5 w-5 text-electric mr-2" data-oid="-208bhj" />
            <div data-oid="2k8w6yx">
              <div className="text-xs text-gray-400" data-oid="6wpgyoi">
                CPU Usage
              </div>
              <div className="flex items-center space-x-2" data-oid="n-blp.4">
                <div
                  className="text-sm font-bold text-white"
                  data-oid="n.77y1h"
                >
                  {data.systemHealth.cpu}%
                </div>
                <div
                  className="w-24 h-2 bg-gray-700 rounded-full"
                  data-oid="n:j5u0s"
                >
                  <div
                    className="h-full bg-electric rounded-full"
                    style={{ width: `${data.systemHealth.cpu}%` }}
                    data-oid="ky5v7z."
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="bg-space-900/50 p-3 rounded-lg flex items-center"
            data-oid="6:4p7i6"
          >
            <Server className="h-5 w-5 text-cyan mr-2" data-oid="4p1x:ey" />
            <div data-oid="9:5-3n0">
              <div className="text-xs text-gray-400" data-oid="zgs9a9d">
                Memory
              </div>
              <div className="flex items-center space-x-2" data-oid="29yrt-s">
                <div
                  className="text-sm font-bold text-white"
                  data-oid="e-tkjwu"
                >
                  {data.systemHealth.memory}%
                </div>
                <div
                  className="w-24 h-2 bg-gray-700 rounded-full"
                  data-oid=":raeqlz"
                >
                  <div
                    className="h-full bg-cyan rounded-full"
                    style={{ width: `${data.systemHealth.memory}%` }}
                    data-oid="zta8x5r"
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="bg-space-900/50 p-3 rounded-lg flex items-center"
            data-oid="4cw5qqu"
          >
            <Database className="h-5 w-5 text-teal mr-2" data-oid="n8dlliw" />
            <div data-oid="xh53k0u">
              <div className="text-xs text-gray-400" data-oid="fspqi4c">
                Disk Space
              </div>
              <div className="flex items-center space-x-2" data-oid="8xvh-rp">
                <div
                  className="text-sm font-bold text-white"
                  data-oid="9czmj0c"
                >
                  {data.systemHealth.disk}%
                </div>
                <div
                  className="w-24 h-2 bg-gray-700 rounded-full"
                  data-oid="lz9_wjb"
                >
                  <div
                    className="h-full bg-teal rounded-full"
                    style={{ width: `${data.systemHealth.disk}%` }}
                    data-oid="wsjzq9t"
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="bg-space-900/50 p-3 rounded-lg flex items-center"
            data-oid="45oh5i."
          >
            <AlertTriangle
              className="h-5 w-5 text-yellow-400 mr-2"
              data-oid="xgrg4ea"
            />

            <div data-oid="lagv-rb">
              <div className="text-xs text-gray-400" data-oid="a4_sqg:">
                Errors (24h)
              </div>
              <div className="text-sm font-bold text-white" data-oid="n:.q.bv">
                {data.systemHealth.errors24h} errors
              </div>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Quick Links */}
      <GlassCard className="p-4" data-oid="ah1v4-:">
        <h4 className="text-md font-bold text-white mb-4" data-oid="ww75mqu">
          Quick Actions
        </h4>
        <div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3"
          data-oid="pu5gu.e"
        >
          <button
            className="p-3 bg-space-900/60 hover:bg-purple-900/40 rounded-lg transition-colors flex flex-col items-center text-center"
            data-oid="scm46lv"
          >
            <User className="h-5 w-5 text-cyan mb-1" data-oid="havq0dr" />
            <span className="text-xs text-white" data-oid="9r9ino.">
              New User
            </span>
          </button>

          <button
            className="p-3 bg-space-900/60 hover:bg-purple-900/40 rounded-lg transition-colors flex flex-col items-center text-center"
            data-oid="pbri:q2"
          >
            <Award className="h-5 w-5 text-teal mb-1" data-oid="iuju1x7" />
            <span className="text-xs text-white" data-oid="js-e.ed">
              Add Plan
            </span>
          </button>

          <button
            className="p-3 bg-space-900/60 hover:bg-purple-900/40 rounded-lg transition-colors flex flex-col items-center text-center"
            data-oid="y_yai8n"
          >
            <Server className="h-5 w-5 text-electric mb-1" data-oid="8iq.xcn" />
            <span className="text-xs text-white" data-oid=":m53j99">
              Server Status
            </span>
          </button>

          <button
            className="p-3 bg-space-900/60 hover:bg-purple-900/40 rounded-lg transition-colors flex flex-col items-center text-center"
            data-oid=":3an8dc"
          >
            <Database className="h-5 w-5 text-cyan mb-1" data-oid="x3xt2we" />
            <span className="text-xs text-white" data-oid="gh3b4-6">
              Backup DB
            </span>
          </button>

          <button
            className="p-3 bg-space-900/60 hover:bg-purple-900/40 rounded-lg transition-colors flex flex-col items-center text-center"
            data-oid="8:su0j4"
          >
            <AlertTriangle
              className="h-5 w-5 text-yellow-400 mb-1"
              data-oid="355cml7"
            />

            <span className="text-xs text-white" data-oid="piat-7p">
              View Logs
            </span>
          </button>

          <button
            className="p-3 bg-space-900/60 hover:bg-purple-900/40 rounded-lg transition-colors flex flex-col items-center text-center"
            data-oid="k2eahoq"
          >
            <Clock className="h-5 w-5 text-teal mb-1" data-oid="8pv-64f" />
            <span className="text-xs text-white" data-oid="r2mwkyc">
              Active Jobs
            </span>
          </button>
        </div>
      </GlassCard>
    </div>
  );
};

export default AdminDashboard;
