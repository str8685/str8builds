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
        data-oid="gdf2joj"
      >
        <div className="h-32 flex items-end space-x-1 mb-1" data-oid=":44pktz">
          <div
            className="w-5 rounded-t bg-purple-600 transition-all duration-500"
            style={{ height: `${(data.users / maxSessions) * 100}%` }}
            data-oid="llj5gy8"
          ></div>
          <div
            className="w-5 rounded-t bg-cyan"
            style={{ height: `${(data.sessions / maxSessions) * 100}%` }}
            data-oid="yz8.b0-"
          ></div>
        </div>
        <span className="text-xs text-gray-400" data-oid="a4pv7q2">
          {data.month}
        </span>
      </div>
    ));
  };

  const generateUsageDonut = (percentage: number) => {
    const dashArray = 100;
    const dashOffset = dashArray - (dashArray * percentage) / 100;

    return (
      <div className="relative w-20 h-20" data-oid="vc721qa">
        <svg className="w-full h-full" viewBox="0 0 36 36" data-oid="p4z12:5">
          <circle
            cx="18"
            cy="18"
            r="16"
            fill="none"
            className="stroke-gray-700"
            strokeWidth="3"
            data-oid="gl_zwk9"
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
            data-oid="zvev4:8"
          />
        </svg>
        <div
          className="absolute inset-0 flex items-center justify-center"
          data-oid="xtbtfzn"
        >
          <span className="text-sm font-medium text-cyan" data-oid="a9dmryo">
            {percentage}%
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6" data-oid="l-u072z">
      <div className="flex justify-between items-center" data-oid="9giq_22">
        <h2 className="text-xl font-bold text-white" data-oid="h8l._-8">
          Analytics Dashboard
        </h2>
        <button
          className="flex items-center text-sm text-cyan bg-space-800 px-3 py-1.5 rounded-md hover:bg-space-700 transition-colors"
          onClick={handleRefresh}
          disabled={isLoading}
          data-oid="607a4qy"
        >
          {isLoading ? (
            <>
              <RefreshCcw
                className="h-3.5 w-3.5 mr-1.5 animate-spin"
                data-oid="4fj9c9o"
              />
              Refreshing...
            </>
          ) : (
            <>
              <RefreshCcw className="h-3.5 w-3.5 mr-1.5" data-oid="ecbssng" />
              Refresh
            </>
          )}
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div
          className="bg-red-900/20 border border-red-800 rounded-xl p-4 flex items-center"
          data-oid="c61:6i."
        >
          <AlertTriangle
            className="h-5 w-5 text-red-400 mr-3"
            data-oid="uvwkb9t"
          />

          <p className="text-red-300" data-oid=".:jw__m">
            {error}
          </p>
        </div>
      )}

      {/* Stats Grid */}
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        data-oid="owgfkx1"
      >
        {/* Active Users */}
        <div
          className="bg-space-900 rounded-xl p-4 glass-card"
          data-oid="_n:tkn1"
        >
          <div className="flex justify-between items-start" data-oid="h:_73-8">
            <div data-oid="rcqm20b">
              <p className="text-sm text-gray-400 mb-1" data-oid="kqy.9g6">
                Active Users
              </p>
              <h3 className="text-xl font-bold text-white" data-oid="x-sepr_">
                {stats.activeUsers.toLocaleString()}
              </h3>
            </div>
            <span className="p-2 rounded-lg bg-space-800" data-oid="owpktak">
              <Users className="h-4 w-4 text-green-400" data-oid="l:c6ur6" />
            </span>
          </div>
          <div className="mt-3 flex items-center" data-oid="-e5vz:5">
            <span
              className={`text-xs font-medium ${
                stats.userGrowth >= 0 ? "text-green-400" : "text-red-400"
              }`}
              data-oid="cvty-v7"
            >
              {stats.userGrowth >= 0 ? "+" : ""}
              {stats.userGrowth}%
            </span>
            <span className="text-xs text-gray-500 ml-1" data-oid="a043l1:">
              from last month
            </span>
            {stats.userGrowth >= 0 ? (
              <TrendingUp
                className="h-3 w-3 text-green-400 ml-1"
                data-oid="9o5isr9"
              />
            ) : (
              <TrendingUp
                className="h-3 w-3 text-red-400 ml-1 transform rotate-180"
                data-oid="j5-5th2"
              />
            )}
          </div>
        </div>

        {/* Daily Sessions */}
        <div
          className="bg-space-900 rounded-xl p-4 glass-card"
          data-oid="y0ihi5l"
        >
          <div className="flex justify-between items-start" data-oid="2ex_8dv">
            <div data-oid="t039hp:">
              <p className="text-sm text-gray-400 mb-1" data-oid="d:g2tlt">
                Daily Sessions
              </p>
              <h3 className="text-xl font-bold text-white" data-oid="f.6n3dn">
                {stats.dailySessions.toLocaleString()}
              </h3>
            </div>
            <span className="p-2 rounded-lg bg-space-800" data-oid="5_9i92e">
              <Activity className="h-4 w-4 text-cyan" data-oid="lpi.oq6" />
            </span>
          </div>
          <div className="mt-3 flex items-center" data-oid="mlc32pw">
            <span
              className={`text-xs font-medium ${
                stats.sessionGrowth >= 0 ? "text-green-400" : "text-red-400"
              }`}
              data-oid="r0mzm2u"
            >
              {stats.sessionGrowth >= 0 ? "+" : ""}
              {stats.sessionGrowth}%
            </span>
            <span className="text-xs text-gray-500 ml-1" data-oid="gp7doaw">
              from last month
            </span>
            {stats.sessionGrowth >= 0 ? (
              <TrendingUp
                className="h-3 w-3 text-green-400 ml-1"
                data-oid="dbf_bf6"
              />
            ) : (
              <TrendingUp
                className="h-3 w-3 text-red-400 ml-1 transform rotate-180"
                data-oid="js:oo:x"
              />
            )}
          </div>
        </div>

        {/* Average Usage Time */}
        <div
          className="bg-space-900 rounded-xl p-4 glass-card"
          data-oid="5jj1_r-"
        >
          <div className="flex justify-between items-start" data-oid="nlq8s08">
            <div data-oid=":0b6yz_">
              <p className="text-sm text-gray-400 mb-1" data-oid="wufv8.z">
                Avg Usage Time
              </p>
              <h3 className="text-xl font-bold text-white" data-oid="ya0u-in">
                {stats.avgUsageTime}
              </h3>
            </div>
            <span className="p-2 rounded-lg bg-space-800" data-oid="9o4mooi">
              <Clock className="h-4 w-4 text-purple-400" data-oid="w5cyjfw" />
            </span>
          </div>
          <div className="mt-3 flex items-center" data-oid="iph6l9z">
            <span
              className={`text-xs font-medium ${
                stats.timeGrowth >= 0 ? "text-green-400" : "text-red-400"
              }`}
              data-oid="6h3d3sq"
            >
              {stats.timeGrowth >= 0 ? "+" : ""}
              {stats.timeGrowth}%
            </span>
            <span className="text-xs text-gray-500 ml-1" data-oid="lqws5w7">
              from last month
            </span>
            {stats.timeGrowth >= 0 ? (
              <TrendingUp
                className="h-3 w-3 text-green-400 ml-1"
                data-oid="2rmj2jf"
              />
            ) : (
              <TrendingUp
                className="h-3 w-3 text-red-400 ml-1 transform rotate-180"
                data-oid="menvd5n"
              />
            )}
          </div>
        </div>

        {/* Total Projects */}
        <div
          className="bg-space-900 rounded-xl p-4 glass-card"
          data-oid="_nd5_d-"
        >
          <div className="flex justify-between items-start" data-oid="v6m_uwz">
            <div data-oid="ed3yhex">
              <p className="text-sm text-gray-400 mb-1" data-oid="qdu9xqj">
                Total Projects
              </p>
              <h3 className="text-xl font-bold text-white" data-oid="fvq94kf">
                {stats.totalProjects.toLocaleString()}
              </h3>
            </div>
            <span className="p-2 rounded-lg bg-space-800" data-oid="6cegjo-">
              <FileText className="h-4 w-4 text-blue-400" data-oid="6m4:hzu" />
            </span>
          </div>
          <div className="mt-3 flex items-center" data-oid="of3yj6v">
            <span
              className={`text-xs font-medium ${
                stats.projectGrowth >= 0 ? "text-green-400" : "text-red-400"
              }`}
              data-oid="bz424mz"
            >
              {stats.projectGrowth >= 0 ? "+" : ""}
              {stats.projectGrowth}%
            </span>
            <span className="text-xs text-gray-500 ml-1" data-oid="db_zuyk">
              from last month
            </span>
            {stats.projectGrowth >= 0 ? (
              <TrendingUp
                className="h-3 w-3 text-green-400 ml-1"
                data-oid="9edf28."
              />
            ) : (
              <TrendingUp
                className="h-3 w-3 text-red-400 ml-1 transform rotate-180"
                data-oid="3x8ascu"
              />
            )}
          </div>
        </div>
      </div>

      {/* Charts and Data */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" data-oid="9mzh0ri">
        <div
          className="lg:col-span-2 bg-space-900 rounded-xl p-4 glass-card"
          data-oid="miwmzk."
        >
          <div
            className="flex justify-between items-center mb-4"
            data-oid="i-71.ah"
          >
            <h3
              className="text-lg font-medium text-white flex items-center"
              data-oid="eesryq0"
            >
              <BarChart2
                className="h-4 w-4 mr-2 text-cyan"
                data-oid="f8y.or-"
              />
              Users & Sessions
            </h3>
            <div className="flex space-x-4" data-oid="53e_ofn">
              <div className="flex items-center" data-oid="ga5suxl">
                <span
                  className="w-3 h-3 bg-purple-600 rounded-full mr-1"
                  data-oid="fa7r2bi"
                ></span>
                <span className="text-xs text-gray-400" data-oid=".j5aaki">
                  Users
                </span>
              </div>
              <div className="flex items-center" data-oid="4i9w72t">
                <span
                  className="w-3 h-3 bg-cyan rounded-full mr-1"
                  data-oid="v6xdj3-"
                ></span>
                <span className="text-xs text-gray-400" data-oid="eo8tj:4">
                  Sessions
                </span>
              </div>
            </div>
          </div>

          <div className="w-full overflow-x-auto" data-oid="lal73zv">
            <div
              className="min-w-[600px] h-[200px] flex justify-between items-end pt-4 px-2"
              data-oid="i2fe3-m"
            >
              {generateChartBars()}
            </div>
          </div>
        </div>

        <div
          className="bg-space-900 rounded-xl p-4 glass-card"
          data-oid="l95i8y_"
        >
          <h3
            className="text-lg font-medium text-white flex items-center mb-4"
            data-oid="k4xz:9l"
          >
            <PieChart className="h-4 w-4 mr-2 text-cyan" data-oid="de6ur9n" />
            System Usage
          </h3>

          <div className="grid grid-cols-2 gap-4" data-oid="u7hz9y2">
            <div className="flex flex-col items-center" data-oid="1bg.hsb">
              {generateUsageDonut(systemUsage.cpu)}
              <span className="text-sm text-white mt-2" data-oid="ugvsu3_">
                CPU
              </span>
            </div>
            <div className="flex flex-col items-center" data-oid="1j1isyz">
              {generateUsageDonut(systemUsage.memory)}
              <span className="text-sm text-white mt-2" data-oid="1.61bw.">
                Memory
              </span>
            </div>
            <div className="flex flex-col items-center" data-oid="t_9d-8r">
              {generateUsageDonut(systemUsage.storage)}
              <span className="text-sm text-white mt-2" data-oid="1rxf6.j">
                Storage
              </span>
            </div>
            <div className="flex flex-col items-center" data-oid="h7cvdox">
              {generateUsageDonut(systemUsage.network)}
              <span className="text-sm text-white mt-2" data-oid="fz.zais">
                Network
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div
        className="bg-space-900 rounded-xl p-4 glass-card"
        data-oid="sp1v4ch"
      >
        <h3 className="text-lg font-medium text-white mb-4" data-oid="w0q1kfv">
          Recent Activity
        </h3>

        <div className="space-y-3" data-oid="yd5c1:0">
          {[1, 2, 3, 4, 5].map((_, i) => (
            <div
              key={i}
              className="flex items-start py-2 border-b border-gray-800"
              data-oid="vj_78nj"
            >
              <div
                className="flex-shrink-0 p-2 rounded-md bg-space-800 mr-3"
                data-oid=":qibfok"
              >
                <Activity className="h-4 w-4 text-cyan" data-oid="98_oisk" />
              </div>
              <div data-oid="1.c96mr">
                <p
                  className="text-sm text-white font-medium"
                  data-oid="-60_enx"
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
                <p className="text-xs text-gray-400 mt-1" data-oid="rg-5e5n">
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
