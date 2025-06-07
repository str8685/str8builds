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
    <div className="space-y-4" data-oid="lva_6zr">
      <h3 className="text-xl font-bold text-white" data-oid="o1qr-nd">
        Admin Dashboard
      </h3>

      {/* Key Metrics Section */}
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        data-oid="vocz791"
      >
        <GlassCard className="p-4 flex items-center" data-oid="-ls4:j8">
          <div
            className="h-10 w-10 rounded-full bg-purple-900/60 flex items-center justify-center mr-3"
            data-oid="2ddu1hm"
          >
            <User className="h-5 w-5 text-cyan" data-oid="9plbqek" />
          </div>
          <div data-oid="i7p3t1.">
            <div className="text-sm text-gray-400" data-oid="w-r8wh7">
              Total Users
            </div>
            <div className="text-2xl font-bold text-white" data-oid="t65:1gz">
              {data.totalUsers}
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-4 flex items-center" data-oid="c4o0u8a">
          <div
            className="h-10 w-10 rounded-full bg-purple-900/60 flex items-center justify-center mr-3"
            data-oid="e405qbh"
          >
            <UserCheck className="h-5 w-5 text-teal" data-oid="3ghce6z" />
          </div>
          <div data-oid=".miaq97">
            <div className="text-sm text-gray-400" data-oid="hsjcijs">
              Active Users
            </div>
            <div className="text-2xl font-bold text-white" data-oid="0wpurqv">
              {data.activeUsers}
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-4 flex items-center" data-oid="rifrtd_">
          <div
            className="h-10 w-10 rounded-full bg-purple-900/60 flex items-center justify-center mr-3"
            data-oid="m1t31e6"
          >
            <Clock className="h-5 w-5 text-electric" data-oid="h:p-hln" />
          </div>
          <div data-oid="2pgan8b">
            <div className="text-sm text-gray-400" data-oid="e:6-8yl">
              Active Projects
            </div>
            <div className="text-2xl font-bold text-white" data-oid="iulnxv7">
              {data.activeProjects}
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-4 flex items-center" data-oid=".ucft7e">
          <div
            className="h-10 w-10 rounded-full bg-purple-900/60 flex items-center justify-center mr-3"
            data-oid=".gkrle:"
          >
            <DollarSign className="h-5 w-5 text-green-400" data-oid="rgvr35z" />
          </div>
          <div data-oid="6hbdx48">
            <div className="text-sm text-gray-400" data-oid="gbjh-8r">
              Monthly Revenue
            </div>
            <div className="text-2xl font-bold text-white" data-oid="x7-b0to">
              {data.revenueMonth}
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4" data-oid="a7tcekv">
        <GlassCard className="p-4" data-oid="b05fw44">
          <div
            className="flex justify-between items-center mb-4"
            data-oid="4_t-e_5"
          >
            <h4 className="text-md font-bold text-white" data-oid="g.-i0gr">
              User Growth
            </h4>
            <span className="text-xs text-gray-400" data-oid="j3mtv3_">
              Last 6 months
            </span>
          </div>
          <div className="h-60 w-full" data-oid="lrm9v_5">
            {/* In a real app, implement actual chart */}
            <div
              className="h-full w-full flex items-center justify-center bg-space-900/50 rounded-lg border border-gray-700"
              data-oid="h6o3feq"
            >
              <div className="text-center" data-oid="h1l0loy">
                <div className="text-gray-400 mb-2" data-oid="3v:m7yq">
                  User Growth Chart
                </div>
                {data.userGrowth.length === 0 ? (
                  <div className="text-gray-500 text-sm" data-oid="9.3lx3r">
                    No data available
                  </div>
                ) : (
                  <div
                    className="grid grid-cols-6 gap-1 h-32 items-end px-4"
                    data-oid="d9h3vta"
                  >
                    {data.userGrowth.map((month, idx) => (
                      <div
                        key={idx}
                        className="flex flex-col items-center"
                        data-oid="gz2ke2t"
                      >
                        <div
                          className="w-full bg-gradient-to-t from-purple-900 to-cyan rounded-t"
                          style={{ height: `${(month.users / 250) * 100}%` }}
                          data-oid="ur6vwww"
                        ></div>
                        <div
                          className="text-xs text-gray-500 mt-1"
                          data-oid="eoa6sci"
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

        <GlassCard className="p-4" data-oid="1lghx:q">
          <div
            className="flex justify-between items-center mb-4"
            data-oid="60w9tec"
          >
            <h4 className="text-md font-bold text-white" data-oid="d87_.jn">
              Subscription Plans
            </h4>
            <span className="text-xs text-gray-400" data-oid="6iws8x7">
              Distribution
            </span>
          </div>
          <div className="h-60 w-full" data-oid="qmjvxyx">
            {/* In a real app, implement actual chart */}
            <div
              className="h-full w-full flex items-center justify-center bg-space-900/50 rounded-lg border border-gray-700"
              data-oid="rjg:co5"
            >
              <div className="text-center space-y-3" data-oid="8.6hd1k">
                <div className="text-gray-400" data-oid="znqcne4">
                  Subscription Distribution
                </div>
                {data.subscriptionDistribution.length === 0 ? (
                  <div
                    className="text-gray-500 text-sm mt-4"
                    data-oid="6:et9-n"
                  >
                    No data available
                  </div>
                ) : (
                  <div
                    className="flex justify-center space-x-6"
                    data-oid="_37pcek"
                  >
                    {data.subscriptionDistribution.map((plan, idx) => (
                      <div key={idx} className="text-center" data-oid="rlhyk5_">
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
                          data-oid="v3yodu5"
                        ></div>
                        <div className="text-sm text-white" data-oid=":a_6lor">
                          {plan.name}
                        </div>
                        <div
                          className="text-xs text-gray-400"
                          data-oid="qrx-ai8"
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
      <GlassCard className="p-4" data-oid="y.c4dp5">
        <div
          className="flex justify-between items-center mb-4"
          data-oid="rfc992."
        >
          <h4 className="text-md font-bold text-white" data-oid="zwm64r-">
            System Health
          </h4>
          <span
            className="text-xs px-2 py-1 rounded-full bg-green-900 text-green-400"
            data-oid="x-fdg2y"
          >
            All Systems Operational
          </span>
        </div>
        <div
          className="grid grid-cols-1 md:grid-cols-4 gap-4"
          data-oid="5.-.a.2"
        >
          <div
            className="bg-space-900/50 p-3 rounded-lg flex items-center"
            data-oid="8tpdp8u"
          >
            <Server className="h-5 w-5 text-electric mr-2" data-oid="w40ss52" />
            <div data-oid="7r5zxsu">
              <div className="text-xs text-gray-400" data-oid="y-:_u4-">
                CPU Usage
              </div>
              <div className="flex items-center space-x-2" data-oid="xjtaj3h">
                <div
                  className="text-sm font-bold text-white"
                  data-oid="ud59dhk"
                >
                  {data.systemHealth.cpu}%
                </div>
                <div
                  className="w-24 h-2 bg-gray-700 rounded-full"
                  data-oid="n4ytlz0"
                >
                  <div
                    className="h-full bg-electric rounded-full"
                    style={{ width: `${data.systemHealth.cpu}%` }}
                    data-oid="xqee8kb"
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="bg-space-900/50 p-3 rounded-lg flex items-center"
            data-oid="k-1bpka"
          >
            <Server className="h-5 w-5 text-cyan mr-2" data-oid="r53hnc8" />
            <div data-oid="tbjvsbb">
              <div className="text-xs text-gray-400" data-oid="feigj4a">
                Memory
              </div>
              <div className="flex items-center space-x-2" data-oid="9w7m18k">
                <div
                  className="text-sm font-bold text-white"
                  data-oid="ho6wofn"
                >
                  {data.systemHealth.memory}%
                </div>
                <div
                  className="w-24 h-2 bg-gray-700 rounded-full"
                  data-oid="rbpu3q2"
                >
                  <div
                    className="h-full bg-cyan rounded-full"
                    style={{ width: `${data.systemHealth.memory}%` }}
                    data-oid="pq89x7_"
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="bg-space-900/50 p-3 rounded-lg flex items-center"
            data-oid="yw42x.8"
          >
            <Database className="h-5 w-5 text-teal mr-2" data-oid="yks.9gh" />
            <div data-oid=".wyvizk">
              <div className="text-xs text-gray-400" data-oid="45o1vac">
                Disk Space
              </div>
              <div className="flex items-center space-x-2" data-oid="oo:f.9-">
                <div
                  className="text-sm font-bold text-white"
                  data-oid="ib3.itm"
                >
                  {data.systemHealth.disk}%
                </div>
                <div
                  className="w-24 h-2 bg-gray-700 rounded-full"
                  data-oid="6wblam:"
                >
                  <div
                    className="h-full bg-teal rounded-full"
                    style={{ width: `${data.systemHealth.disk}%` }}
                    data-oid="bcvstb6"
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="bg-space-900/50 p-3 rounded-lg flex items-center"
            data-oid="b6vuuh7"
          >
            <AlertTriangle
              className="h-5 w-5 text-yellow-400 mr-2"
              data-oid="f3vien3"
            />

            <div data-oid="87u_nwz">
              <div className="text-xs text-gray-400" data-oid="vocs3:f">
                Errors (24h)
              </div>
              <div className="text-sm font-bold text-white" data-oid="_1rr67u">
                {data.systemHealth.errors24h} errors
              </div>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Quick Links */}
      <GlassCard className="p-4" data-oid="7en2kk-">
        <h4 className="text-md font-bold text-white mb-4" data-oid="w8t0oeg">
          Quick Actions
        </h4>
        <div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3"
          data-oid="m-osu03"
        >
          <button
            className="p-3 bg-space-900/60 hover:bg-purple-900/40 rounded-lg transition-colors flex flex-col items-center text-center"
            data-oid="zjc8rt9"
          >
            <User className="h-5 w-5 text-cyan mb-1" data-oid="lr7i8bj" />
            <span className="text-xs text-white" data-oid="14cuox_">
              New User
            </span>
          </button>

          <button
            className="p-3 bg-space-900/60 hover:bg-purple-900/40 rounded-lg transition-colors flex flex-col items-center text-center"
            data-oid="nw1j:hs"
          >
            <Award className="h-5 w-5 text-teal mb-1" data-oid="ttgv8nt" />
            <span className="text-xs text-white" data-oid="g:.-3xl">
              Add Plan
            </span>
          </button>

          <button
            className="p-3 bg-space-900/60 hover:bg-purple-900/40 rounded-lg transition-colors flex flex-col items-center text-center"
            data-oid="919yypi"
          >
            <Server className="h-5 w-5 text-electric mb-1" data-oid="2f:u.mx" />
            <span className="text-xs text-white" data-oid="j0wj.cp">
              Server Status
            </span>
          </button>

          <button
            className="p-3 bg-space-900/60 hover:bg-purple-900/40 rounded-lg transition-colors flex flex-col items-center text-center"
            data-oid="j1zld0e"
          >
            <Database className="h-5 w-5 text-cyan mb-1" data-oid="zqzs48m" />
            <span className="text-xs text-white" data-oid="s:4ku4b">
              Backup DB
            </span>
          </button>

          <button
            className="p-3 bg-space-900/60 hover:bg-purple-900/40 rounded-lg transition-colors flex flex-col items-center text-center"
            data-oid="ecwduzq"
          >
            <AlertTriangle
              className="h-5 w-5 text-yellow-400 mb-1"
              data-oid="dq4tuvc"
            />

            <span className="text-xs text-white" data-oid="q_8:6bb">
              View Logs
            </span>
          </button>

          <button
            className="p-3 bg-space-900/60 hover:bg-purple-900/40 rounded-lg transition-colors flex flex-col items-center text-center"
            data-oid="mx7ym-2"
          >
            <Clock className="h-5 w-5 text-teal mb-1" data-oid="r13euqp" />
            <span className="text-xs text-white" data-oid="c-f7hx5">
              Active Jobs
            </span>
          </button>
        </div>
      </GlassCard>
    </div>
  );
};

export default AdminDashboard;
