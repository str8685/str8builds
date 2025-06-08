import { FC, useState, useEffect } from "react";
import {
  BarChart2,
  Users,
  CloudSun,
  Clock,
  Activity,
  TrendingUp,
  PieChart,
  RefreshCcw,
  AlertTriangle,
  FileText,
} from "lucide-react";
import { api } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

interface DashboardStats {
  activeUsers: number;
  dailySessions: number;
  avgUsageTime: string;
  totalProjects: number;
  userGrowth: number;
  sessionGrowth: number;
  projectGrowth: number;
  timeGrowth: number;
}

interface ChartDataPoint {
  month: string;
  users: number;
  sessions: number;
}

interface SystemUsage {
  cpu: number;
  memory: number;
  storage: number;
  network: number;
}

const AdminDashboard: FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    activeUsers: 0,
    dailySessions: 0,
    avgUsageTime: "0 min",
    totalProjects: 0,
    userGrowth: 0,
    sessionGrowth: 0,
    projectGrowth: 0,
    timeGrowth: 0,
  });

  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [systemUsage, setSystemUsage] = useState<SystemUsage>({
    cpu: 0,
    memory: 0,
    storage: 0,
    network: 0,
  });

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Fallback data for development
  const mockDashboardData = {
    stats: {
      activeUsers: 584,
      dailySessions: 1243,
      avgUsageTime: "37 min",
      totalProjects: 82,
      userGrowth: 15,
      sessionGrowth: 24,
      projectGrowth: 8,
      timeGrowth: 5,
    },
    chartData: [
      { month: "Jan", users: 240, sessions: 610 },
      { month: "Feb", users: 350, sessions: 820 },
      { month: "Mar", users: 310, sessions: 750 },
      { month: "Apr", users: 450, sessions: 980 },
      { month: "May", users: 520, sessions: 1150 },
      { month: "Jun", users: 580, sessions: 1240 },
    ],

    systemUsage: {
      cpu: 45,
      memory: 68,
      storage: 32,
      network: 75,
    },
  };

  const fetchDashboardData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Fetch dashboard data from API
      const dashboardData = await api.admin.dashboard();

      if (dashboardData) {
        // Set dashboard statistics
        setStats({
          activeUsers: dashboardData.stats?.activeUsers || 0,
          dailySessions: dashboardData.stats?.dailySessions || 0,
          avgUsageTime: dashboardData.stats?.avgUsageTime || "0 min",
          totalProjects: dashboardData.stats?.totalProjects || 0,
          userGrowth: dashboardData.stats?.userGrowth || 0,
          sessionGrowth: dashboardData.stats?.sessionGrowth || 0,
          projectGrowth: dashboardData.stats?.projectGrowth || 0,
          timeGrowth: dashboardData.stats?.timeGrowth || 0,
        });

        // Set chart data
        if (dashboardData.chartData && dashboardData.chartData.length > 0) {
          setChartData(dashboardData.chartData);
        } else {
          // Generate empty chart data if none exists
          const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
          setChartData(
            months.map((month) => ({ month, users: 0, sessions: 0 })),
          );
        }

        // Set system usage data
        if (dashboardData.systemUsage) {
          setSystemUsage(dashboardData.systemUsage);
        }

        toast({
          title: "Dashboard Updated",
          description: "Latest dashboard data loaded successfully",
          variant: "default",
        });
      } else {
        console.log("No dashboard data found from API, using mock data");
        // Use mock data
        setStats(mockDashboardData.stats);
        setChartData(mockDashboardData.chartData);
        setSystemUsage(mockDashboardData.systemUsage);

        toast({
          title: "Development Mode",
          description: "Using mock dashboard data",
          variant: "default",
        });
      }
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
      console.log("Using mock dashboard data instead");

      // Use mock data
      setStats(mockDashboardData.stats);
      setChartData(mockDashboardData.chartData);
      setSystemUsage(mockDashboardData.systemUsage);

      toast({
        title: "Development Mode",
        description: "Using mock data while API is unavailable",
        variant: "default",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Function to handle refresh button click
  const handleRefresh = () => {
    fetchDashboardData();
    toast({
      title: "Refreshing",
      description: "Dashboard data is being updated...",
      variant: "default",
    });
  };

  const generateChartBars = () => {
    // Find max value for scaling
    const maxSessions = Math.max(...chartData.map((d) => d.sessions));

    return chartData.map((data, index) => (
      <div
        key={index}
        className="flex flex-col items-center"
        data-oid="3gaqm43"
      >
        <div className="h-32 flex items-end space-x-1 mb-1" data-oid="9pugemc">
          <div
            className="w-5 rounded-t bg-purple-600 transition-all duration-500"
            style={{ height: `${(data.users / maxSessions) * 100}%` }}
            data-oid="q_jg.si"
          ></div>
          <div
            className="w-5 rounded-t bg-cyan"
            style={{ height: `${(data.sessions / maxSessions) * 100}%` }}
            data-oid="qxw3a5a"
          ></div>
        </div>
        <span className="text-xs text-gray-400" data-oid="uuw7pj:">
          {data.month}
        </span>
      </div>
    ));
  };

  const generateUsageDonut = (percentage: number) => {
    const dashArray = 100;
    const dashOffset = dashArray - (dashArray * percentage) / 100;

    return (
      <div className="relative w-20 h-20" data-oid=":vw652b">
        <svg className="w-full h-full" viewBox="0 0 36 36" data-oid=".m9ramg">
          <circle
            cx="18"
            cy="18"
            r="16"
            fill="none"
            className="stroke-gray-700"
            strokeWidth="3"
            data-oid="zu5k2l8"
          />

          <circle
            cx="18"
            cy="18"
            r="16"
            fill="none"
            className="stroke-cyan"
            strokeWidth="3"
            strokeDasharray={dashArray}
            strokeDashoffset={dashOffset}
            strokeLinecap="round"
            transform="rotate(-90 18 18)"
            data-oid="397t4vi"
          />
        </svg>
        <div
          className="absolute inset-0 flex items-center justify-center"
          data-oid="99ckqjc"
        >
          <span className="text-sm font-medium text-cyan" data-oid="2vjnx1u">
            {percentage}%
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6" data-oid="-orbrvf">
      <div className="flex justify-between items-center" data-oid="-rjq23d">
        <h2 className="text-xl font-bold text-white" data-oid="2hscj5r">
          Analytics Dashboard
        </h2>
        <button
          className="flex items-center text-sm text-cyan bg-space-800 px-3 py-1.5 rounded-md hover:bg-space-700 transition-colors"
          onClick={handleRefresh}
          disabled={isLoading}
          data-oid="hzp-9a1"
        >
          {isLoading ? (
            <>
              <RefreshCcw
                className="h-3.5 w-3.5 mr-1.5 animate-spin"
                data-oid="r4vo76a"
              />
              Refreshing...
            </>
          ) : (
            <>
              <RefreshCcw className="h-3.5 w-3.5 mr-1.5" data-oid="jdwj9y3" />
              Refresh
            </>
          )}
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div
          className="bg-red-900/20 border border-red-800 rounded-xl p-4 flex items-center"
          data-oid="2e59i7f"
        >
          <AlertTriangle
            className="h-5 w-5 text-red-400 mr-3"
            data-oid="zjk3ou2"
          />

          <p className="text-red-300" data-oid="xd0b_x9">
            {error}
          </p>
        </div>
      )}

      {/* Stats Grid */}
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        data-oid="6-d5pn-"
      >
        {/* Active Users */}
        <div
          className="bg-space-900 rounded-xl p-4 glass-card"
          data-oid="_tr1.q_"
        >
          <div className="flex justify-between items-start" data-oid="i91:r1k">
            <div data-oid="q2sg.zw">
              <p className="text-sm text-gray-400 mb-1" data-oid="k-g5qwi">
                Active Users
              </p>
              <h3 className="text-xl font-bold text-white" data-oid="ekm9-h2">
                {stats.activeUsers.toLocaleString()}
              </h3>
            </div>
            <span className="p-2 rounded-lg bg-space-800" data-oid=":wo9cft">
              <Users className="h-4 w-4 text-green-400" data-oid="37-yndq" />
            </span>
          </div>
          <div className="mt-3 flex items-center" data-oid="xn.7:ot">
            <span
              className={`text-xs font-medium ${
                stats.userGrowth >= 0 ? "text-green-400" : "text-red-400"
              }`}
              data-oid="scn.zxo"
            >
              {stats.userGrowth >= 0 ? "+" : ""}
              {stats.userGrowth}%
            </span>
            <span className="text-xs text-gray-500 ml-1" data-oid="3hjg9e2">
              from last month
            </span>
            {stats.userGrowth >= 0 ? (
              <TrendingUp
                className="h-3 w-3 text-green-400 ml-1"
                data-oid="w4g2a98"
              />
            ) : (
              <TrendingUp
                className="h-3 w-3 text-red-400 ml-1 transform rotate-180"
                data-oid="dqm8ang"
              />
            )}
          </div>
        </div>

        {/* Daily Sessions */}
        <div
          className="bg-space-900 rounded-xl p-4 glass-card"
          data-oid="tzijmtv"
        >
          <div className="flex justify-between items-start" data-oid="5q37agm">
            <div data-oid="nwn7wmr">
              <p className="text-sm text-gray-400 mb-1" data-oid="fdaiydm">
                Daily Sessions
              </p>
              <h3 className="text-xl font-bold text-white" data-oid="fthmls1">
                {stats.dailySessions.toLocaleString()}
              </h3>
            </div>
            <span className="p-2 rounded-lg bg-space-800" data-oid="p6bqbf3">
              <Activity className="h-4 w-4 text-cyan" data-oid="u7msmt:" />
            </span>
          </div>
          <div className="mt-3 flex items-center" data-oid="jlbbv3x">
            <span
              className={`text-xs font-medium ${
                stats.sessionGrowth >= 0 ? "text-green-400" : "text-red-400"
              }`}
              data-oid="7vykoie"
            >
              {stats.sessionGrowth >= 0 ? "+" : ""}
              {stats.sessionGrowth}%
            </span>
            <span className="text-xs text-gray-500 ml-1" data-oid="bsqphf8">
              from last month
            </span>
            {stats.sessionGrowth >= 0 ? (
              <TrendingUp
                className="h-3 w-3 text-green-400 ml-1"
                data-oid="7_9nfx3"
              />
            ) : (
              <TrendingUp
                className="h-3 w-3 text-red-400 ml-1 transform rotate-180"
                data-oid="b965a:a"
              />
            )}
          </div>
        </div>

        {/* Average Usage Time */}
        <div
          className="bg-space-900 rounded-xl p-4 glass-card"
          data-oid="p.r7azd"
        >
          <div className="flex justify-between items-start" data-oid="4t4wuze">
            <div data-oid="f9xwtqf">
              <p className="text-sm text-gray-400 mb-1" data-oid="e21iwrk">
                Avg Usage Time
              </p>
              <h3 className="text-xl font-bold text-white" data-oid="f05g:ai">
                {stats.avgUsageTime}
              </h3>
            </div>
            <span className="p-2 rounded-lg bg-space-800" data-oid="bzx6oiu">
              <Clock className="h-4 w-4 text-purple-400" data-oid="j58ovg6" />
            </span>
          </div>
          <div className="mt-3 flex items-center" data-oid=".x5_u5f">
            <span
              className={`text-xs font-medium ${
                stats.timeGrowth >= 0 ? "text-green-400" : "text-red-400"
              }`}
              data-oid=":lrftfn"
            >
              {stats.timeGrowth >= 0 ? "+" : ""}
              {stats.timeGrowth}%
            </span>
            <span className="text-xs text-gray-500 ml-1" data-oid="algr3zy">
              from last month
            </span>
            {stats.timeGrowth >= 0 ? (
              <TrendingUp
                className="h-3 w-3 text-green-400 ml-1"
                data-oid="n8bky:."
              />
            ) : (
              <TrendingUp
                className="h-3 w-3 text-red-400 ml-1 transform rotate-180"
                data-oid="ao3hsav"
              />
            )}
          </div>
        </div>

        {/* Total Projects */}
        <div
          className="bg-space-900 rounded-xl p-4 glass-card"
          data-oid="t4of.ev"
        >
          <div className="flex justify-between items-start" data-oid="5p3e_w9">
            <div data-oid="migd6zm">
              <p className="text-sm text-gray-400 mb-1" data-oid="17e4jkp">
                Total Projects
              </p>
              <h3 className="text-xl font-bold text-white" data-oid="rxfip9i">
                {stats.totalProjects.toLocaleString()}
              </h3>
            </div>
            <span className="p-2 rounded-lg bg-space-800" data-oid="g1s5.qa">
              <FileText className="h-4 w-4 text-blue-400" data-oid="n-9:lqz" />
            </span>
          </div>
          <div className="mt-3 flex items-center" data-oid="qo44rpn">
            <span
              className={`text-xs font-medium ${
                stats.projectGrowth >= 0 ? "text-green-400" : "text-red-400"
              }`}
              data-oid="0vc7dzb"
            >
              {stats.projectGrowth >= 0 ? "+" : ""}
              {stats.projectGrowth}%
            </span>
            <span className="text-xs text-gray-500 ml-1" data-oid="f07pcq8">
              from last month
            </span>
            {stats.projectGrowth >= 0 ? (
              <TrendingUp
                className="h-3 w-3 text-green-400 ml-1"
                data-oid="fdv527y"
              />
            ) : (
              <TrendingUp
                className="h-3 w-3 text-red-400 ml-1 transform rotate-180"
                data-oid="mtcmzwb"
              />
            )}
          </div>
        </div>
      </div>

      {/* Charts and Data */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" data-oid="sin-wmo">
        <div
          className="lg:col-span-2 bg-space-900 rounded-xl p-4 glass-card"
          data-oid="ziece1m"
        >
          <div
            className="flex justify-between items-center mb-4"
            data-oid="wrz7ka2"
          >
            <h3
              className="text-lg font-medium text-white flex items-center"
              data-oid="3of.i48"
            >
              <BarChart2
                className="h-4 w-4 mr-2 text-cyan"
                data-oid="svd-lg7"
              />
              Users & Sessions
            </h3>
            <div className="flex space-x-4" data-oid="7ces-__">
              <div className="flex items-center" data-oid="xl0v6i5">
                <span
                  className="w-3 h-3 bg-purple-600 rounded-full mr-1"
                  data-oid="v2xlr.6"
                ></span>
                <span className="text-xs text-gray-400" data-oid="azm-jbf">
                  Users
                </span>
              </div>
              <div className="flex items-center" data-oid="q3emy.6">
                <span
                  className="w-3 h-3 bg-cyan rounded-full mr-1"
                  data-oid="tb1vlot"
                ></span>
                <span className="text-xs text-gray-400" data-oid="k3t04-n">
                  Sessions
                </span>
              </div>
            </div>
          </div>

          <div className="w-full overflow-x-auto" data-oid="_o1:7l_">
            <div
              className="min-w-[600px] h-[200px] flex justify-between items-end pt-4 px-2"
              data-oid="nwi_nzs"
            >
              {generateChartBars()}
            </div>
          </div>
        </div>

        <div
          className="bg-space-900 rounded-xl p-4 glass-card"
          data-oid="0zzxco0"
        >
          <h3
            className="text-lg font-medium text-white flex items-center mb-4"
            data-oid="hyl44dr"
          >
            <PieChart className="h-4 w-4 mr-2 text-cyan" data-oid="j.s_:l-" />
            System Usage
          </h3>

          <div className="grid grid-cols-2 gap-4" data-oid="5lx19f.">
            <div className="flex flex-col items-center" data-oid="9vp3hu8">
              {generateUsageDonut(systemUsage.cpu)}
              <span className="text-sm text-white mt-2" data-oid="vyh_jut">
                CPU
              </span>
            </div>
            <div className="flex flex-col items-center" data-oid="-jh3_qq">
              {generateUsageDonut(systemUsage.memory)}
              <span className="text-sm text-white mt-2" data-oid="4j9_39n">
                Memory
              </span>
            </div>
            <div className="flex flex-col items-center" data-oid="g15hi5_">
              {generateUsageDonut(systemUsage.storage)}
              <span className="text-sm text-white mt-2" data-oid="rht0wmk">
                Storage
              </span>
            </div>
            <div className="flex flex-col items-center" data-oid="349z7ec">
              {generateUsageDonut(systemUsage.network)}
              <span className="text-sm text-white mt-2" data-oid="q_1vxf-">
                Network
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div
        className="bg-space-900 rounded-xl p-4 glass-card"
        data-oid="4pq9gt_"
      >
        <h3 className="text-lg font-medium text-white mb-4" data-oid="dgv_yf3">
          Recent Activity
        </h3>

        <div className="space-y-3" data-oid="zp0dodj">
          {[1, 2, 3, 4, 5].map((_, i) => (
            <div
              key={i}
              className="flex items-start py-2 border-b border-gray-800"
              data-oid="v3ezjt2"
            >
              <div
                className="flex-shrink-0 p-2 rounded-md bg-space-800 mr-3"
                data-oid="6tdjqi_"
              >
                <Activity className="h-4 w-4 text-cyan" data-oid="6_8uib." />
              </div>
              <div data-oid="iz46xal">
                <p
                  className="text-sm text-white font-medium"
                  data-oid="x5z6z1p"
                >
                  {
                    [
                      "New user registered",
                      "System update completed",
                      "Database backup created",
                      "API rate limit adjusted",
                      "New subscription activated",
                    ][i % 5]
                  }
                </p>
                <p className="text-xs text-gray-400 mt-1" data-oid="67dyo6y">
                  {Math.floor(Math.random() * 60)} minutes ago
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
