import { FC, useState } from "react";
import {
  Server,
  Database,
  HardDrive,
  RefreshCw,
  Activity,
  AlertTriangle,
  CheckCircle,
  Calendar,
  Download,
  Lock,
  Eye,
  ArrowUpRight,
  Search,
  Trash,
} from "lucide-react";

interface ServerInfo {
  name: string;
  role: string;
  status: "up" | "down" | "warning";
  uptime: string;
  cpu: number;
  memory: number;
  disk: number;
}

interface BackupInfo {
  id: number;
  date: string;
  size: string;
  status: "completed" | "failed" | "in_progress";
  type: "auto" | "manual";
}

interface SecurityLog {
  id: number;
  timestamp: string;
  event: string;
  ip: string;
  severity: "low" | "medium" | "high";
  user?: string;
}

// Server info will be fetched from the API
const serverData: ServerInfo[] = [];

// Backup info will be fetched from the API
const backupData: BackupInfo[] = [];

// Security logs will be fetched from the API
const securityLogs: SecurityLog[] = [];

interface TabProps {
  name: string;
  icon: React.ReactNode;
  active: boolean;
  onClick: () => void;
}

const MaintenanceTab: FC<TabProps> = ({ name, icon, active, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center p-3 rounded-lg transition-colors ${
      active ? "bg-purple-900/50 text-cyan" : "hover:bg-space-800 text-gray-300"
    }`}
    data-oid="pmkok1a"
  >
    <span className="mr-3" data-oid="u_.a.7m">
      {icon}
    </span>
    {name}
  </button>
);

const SystemMaintenance: FC = () => {
  const [activeTab, setActiveTab] = useState<
    "servers" | "backups" | "security"
  >("servers");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isCreatingBackup, setIsCreatingBackup] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const handleCreateBackup = () => {
    setIsCreatingBackup(true);
    setTimeout(() => setIsCreatingBackup(false), 2000);
  };

  const filteredLogs = securityLogs.filter(
    (log) =>
      log.event.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (log.user && log.user.toLowerCase().includes(searchTerm.toLowerCase())) ||
      log.ip.includes(searchTerm),
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "up":
        return "text-green-400";
      case "down":
        return "text-red-400";
      case "warning":
        return "text-orange-400";
      default:
        return "text-gray-400";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "up":
        return (
          <CheckCircle className="h-4 w-4 text-green-400" data-oid="aakr_de" />
        );

      case "down":
        return (
          <AlertTriangle className="h-4 w-4 text-red-400" data-oid="rdxv1jm" />
        );

      case "warning":
        return (
          <AlertTriangle
            className="h-4 w-4 text-orange-400"
            data-oid="qy4nuh2"
          />
        );

      default:
        return null;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "low":
        return "bg-blue-900/20 border-blue-800 text-blue-400";
      case "medium":
        return "bg-orange-900/20 border-orange-800 text-orange-400";
      case "high":
        return "bg-red-900/20 border-red-800 text-red-400";
      default:
        return "bg-gray-900/20 border-gray-800 text-gray-400";
    }
  };

  const getBackupStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-400";
      case "failed":
        return "text-red-400";
      case "in_progress":
        return "text-blue-400";
      default:
        return "text-gray-400";
    }
  };

  const getBackupStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <CheckCircle className="h-4 w-4 text-green-400" data-oid="yhrkz0v" />
        );

      case "failed":
        return (
          <AlertTriangle className="h-4 w-4 text-red-400" data-oid="2vj85r." />
        );

      case "in_progress":
        return (
          <RefreshCw
            className="h-4 w-4 text-blue-400 animate-spin"
            data-oid="evtqyq1"
          />
        );

      default:
        return null;
    }
  };

  const generateResourceBar = (
    percentage: number,
    warningThreshold = 70,
    criticalThreshold = 90,
  ) => {
    let barColor = "bg-green-500";
    if (percentage >= criticalThreshold) {
      barColor = "bg-red-500";
    } else if (percentage >= warningThreshold) {
      barColor = "bg-orange-400";
    }

    return (
      <div className="w-full bg-gray-700 rounded-full h-2" data-oid="z5ia0-:">
        <div
          className={`${barColor} h-2 rounded-full`}
          style={{ width: `${percentage}%` }}
          data-oid=":w--ih1"
        ></div>
      </div>
    );
  };

  return (
    <div className="space-y-6" data-oid="41uhwcd">
      <div className="flex justify-between items-center" data-oid="n-b_for">
        <h2
          className="text-xl font-bold text-white flex items-center"
          data-oid="swna9xa"
        >
          <Server className="h-5 w-5 mr-2 text-cyan" data-oid="akq3ffs" />
          System Maintenance
        </h2>

        <button
          className="flex items-center text-sm text-cyan bg-space-800 px-3 py-1.5 rounded-md hover:bg-space-700 transition-colors"
          onClick={handleRefresh}
          disabled={isRefreshing}
          data-oid="veb.ukb"
        >
          <RefreshCw
            className={`h-3.5 w-3.5 mr-1.5 ${isRefreshing ? "animate-spin" : ""}`}
            data-oid="g_x97xl"
          />

          {isRefreshing ? "Refreshing..." : "Refresh Data"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6" data-oid="zh:2xqz">
        {/* Sidebar */}
        <div
          className="bg-space-900 rounded-xl glass-card p-3 space-y-2"
          data-oid="zdaf-dv"
        >
          <MaintenanceTab
            name="Servers & Resources"
            icon={<Server className="h-4 w-4 text-cyan" data-oid="g6:kzux" />}
            active={activeTab === "servers"}
            onClick={() => setActiveTab("servers")}
            data-oid="qb7awkx"
          />

          <MaintenanceTab
            name="Backups & Recovery"
            icon={
              <Database
                className="h-4 w-4 text-purple-400"
                data-oid="lr.-i89"
              />
            }
            active={activeTab === "backups"}
            onClick={() => setActiveTab("backups")}
            data-oid="fkxoo-1"
          />

          <MaintenanceTab
            name="Security & Logs"
            icon={
              <Lock className="h-4 w-4 text-orange-400" data-oid="18altjj" />
            }
            active={activeTab === "security"}
            onClick={() => setActiveTab("security")}
            data-oid="9r2-ajo"
          />
        </div>

        {/* Main content */}
        <div
          className="md:col-span-3 bg-space-900 rounded-xl glass-card p-4"
          data-oid="mm7yx16"
        >
          {activeTab === "servers" && (
            <div data-oid="rfpdjb7">
              <h3
                className="text-lg font-medium text-white mb-4"
                data-oid="m7hk_yg"
              >
                Server Status & Resources
              </h3>

              <div className="space-y-4" data-oid="skuelhu">
                {serverData.map((server, index) => (
                  <div
                    key={index}
                    className="bg-space-800/60 rounded-lg p-4"
                    data-oid="f4g_j09"
                  >
                    <div
                      className="flex justify-between items-start mb-3"
                      data-oid="i:697fs"
                    >
                      <div data-oid="6k0rylj">
                        <div className="flex items-center" data-oid="jv13jdo">
                          <HardDrive
                            className="h-4 w-4 text-cyan mr-2"
                            data-oid="6ou08sy"
                          />

                          <h4
                            className="text-white font-medium"
                            data-oid="l-vz2dy"
                          >
                            {server.name}
                          </h4>
                        </div>
                        <p
                          className="text-sm text-gray-400 mt-1"
                          data-oid="0am77-y"
                        >
                          {server.role}
                        </p>
                      </div>

                      <div className="flex items-center" data-oid="a_touzh">
                        {getStatusIcon(server.status)}
                        <span
                          className={`ml-1.5 text-sm ${getStatusColor(server.status)}`}
                          data-oid=":svz56:"
                        >
                          {server.status === "up"
                            ? "Online"
                            : server.status === "down"
                              ? "Offline"
                              : "Warning"}
                        </span>
                      </div>
                    </div>

                    <div
                      className="grid grid-cols-4 gap-4 mb-3"
                      data-oid="ant:b7f"
                    >
                      <div data-oid=".hkfyq9">
                        <p
                          className="text-xs text-gray-400 mb-1"
                          data-oid="ecwryc-"
                        >
                          Uptime
                        </p>
                        <p className="text-sm text-white" data-oid="sgvmxr:">
                          {server.uptime}
                        </p>
                      </div>

                      <div data-oid="qla0dl5">
                        <div
                          className="flex items-center justify-between mb-1"
                          data-oid="c1_sj10"
                        >
                          <p
                            className="text-xs text-gray-400"
                            data-oid="wxrvsz-"
                          >
                            CPU
                          </p>
                          <p className="text-xs text-white" data-oid="_qp6o7q">
                            {server.cpu}%
                          </p>
                        </div>
                        {generateResourceBar(server.cpu)}
                      </div>

                      <div data-oid="pz6.-28">
                        <div
                          className="flex items-center justify-between mb-1"
                          data-oid="9hxyr0-"
                        >
                          <p
                            className="text-xs text-gray-400"
                            data-oid="xd1w8oa"
                          >
                            Memory
                          </p>
                          <p className="text-xs text-white" data-oid="d4o-7uu">
                            {server.memory}%
                          </p>
                        </div>
                        {generateResourceBar(server.memory)}
                      </div>

                      <div data-oid="q6krq87">
                        <div
                          className="flex items-center justify-between mb-1"
                          data-oid="1_8g2d-"
                        >
                          <p
                            className="text-xs text-gray-400"
                            data-oid="5.qrxuw"
                          >
                            Disk
                          </p>
                          <p className="text-xs text-white" data-oid="_-pn_y9">
                            {server.disk}%
                          </p>
                        </div>
                        {generateResourceBar(server.disk)}
                      </div>
                    </div>

                    <div
                      className="flex justify-end space-x-2"
                      data-oid="sx2l0-a"
                    >
                      <button
                        className="text-xs text-cyan hover:text-cyan-200 transition-colors flex items-center"
                        data-oid="gupua0z"
                      >
                        <Activity
                          className="h-3.5 w-3.5 mr-1"
                          data-oid="h1e-5.a"
                        />
                        View Details
                      </button>
                      <button
                        className="text-xs text-cyan hover:text-cyan-200 transition-colors flex items-center"
                        data-oid="kmm:1bf"
                      >
                        <ArrowUpRight
                          className="h-3.5 w-3.5 mr-1"
                          data-oid="nojjo8z"
                        />
                        Access Console
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "backups" && (
            <div data-oid="_8zc7-e">
              <div
                className="flex justify-between items-center mb-4"
                data-oid="j44k2.o"
              >
                <h3
                  className="text-lg font-medium text-white"
                  data-oid="f3h2pfw"
                >
                  Database Backups
                </h3>

                <button
                  className="btn-glow btn-glow-cyan bg-purple-900 text-cyan px-3 py-1.5 rounded-lg flex items-center text-sm"
                  onClick={handleCreateBackup}
                  disabled={isCreatingBackup}
                  data-oid="a6f-cdy"
                >
                  {isCreatingBackup ? (
                    <>
                      <RefreshCw
                        className="h-3.5 w-3.5 mr-1.5 animate-spin"
                        data-oid="gh-hlx3"
                      />
                      Creating Backup...
                    </>
                  ) : (
                    <>
                      <Database
                        className="h-3.5 w-3.5 mr-1.5"
                        data-oid=":g2qd.0"
                      />
                      Create Backup Now
                    </>
                  )}
                </button>
              </div>

              <div
                className="bg-space-900 rounded-xl overflow-hidden glass-card"
                data-oid="akg:6uf"
              >
                <div className="overflow-x-auto" data-oid="i0:hln5">
                  <table className="w-full" data-oid="gv9bj:l">
                    <thead data-oid="8cysiuv">
                      <tr
                        className="bg-space-800 border-b border-gray-700"
                        data-oid="h8.lg85"
                      >
                        <th
                          className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                          data-oid="xdmpz98"
                        >
                          Date & Time
                        </th>
                        <th
                          className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                          data-oid="wbl5mx6"
                        >
                          Type
                        </th>
                        <th
                          className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                          data-oid="t-vu9y5"
                        >
                          Size
                        </th>
                        <th
                          className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                          data-oid="u.4ebx8"
                        >
                          Status
                        </th>
                        <th
                          className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider"
                          data-oid="vavpmmx"
                        >
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody
                      className="divide-y divide-gray-800"
                      data-oid="um333e1"
                    >
                      {backupData.map((backup) => (
                        <tr
                          key={backup.id}
                          className="hover:bg-space-800/50"
                          data-oid="yugne-6"
                        >
                          <td
                            className="px-4 py-3 whitespace-nowrap"
                            data-oid="ytbi0ep"
                          >
                            <div
                              className="flex items-center text-sm text-white"
                              data-oid="c8kdnwt"
                            >
                              <Calendar
                                className="h-4 w-4 mr-2 text-gray-400"
                                data-oid="dbd:wtu"
                              />

                              {backup.date}
                            </div>
                          </td>
                          <td
                            className="px-4 py-3 whitespace-nowrap"
                            data-oid="3j3lhz8"
                          >
                            <span
                              className={`text-xs px-2 py-1 rounded-full font-medium ${
                                backup.type === "auto"
                                  ? "bg-blue-900/20 text-blue-300"
                                  : "bg-purple-900/20 text-purple-300"
                              }`}
                              data-oid="ch4x6ab"
                            >
                              {backup.type === "auto" ? "Automated" : "Manual"}
                            </span>
                          </td>
                          <td
                            className="px-4 py-3 whitespace-nowrap text-sm text-gray-300"
                            data-oid="y5y7_02"
                          >
                            {backup.size}
                          </td>
                          <td
                            className="px-4 py-3 whitespace-nowrap"
                            data-oid="9k--noa"
                          >
                            <span
                              className={`flex items-center text-sm ${getBackupStatusColor(backup.status)}`}
                              data-oid="fygs0qz"
                            >
                              {getBackupStatusIcon(backup.status)}
                              <span className="ml-1.5" data-oid="z-ikmrh">
                                {backup.status === "completed"
                                  ? "Complete"
                                  : backup.status === "in_progress"
                                    ? "In Progress"
                                    : "Failed"}
                              </span>
                            </span>
                          </td>
                          <td
                            className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium"
                            data-oid="xtoe0iv"
                          >
                            <div
                              className="flex justify-end space-x-2"
                              data-oid="_wj_hz7"
                            >
                              <button
                                className="p-1.5 rounded-md bg-space-800 text-blue-400 hover:bg-space-700 transition-colors"
                                data-oid="k0r4h_-"
                              >
                                <Download
                                  className="h-4 w-4"
                                  data-oid="bb6lhrg"
                                />
                              </button>
                              <button
                                className="p-1.5 rounded-md bg-space-800 text-cyan hover:bg-space-700 transition-colors"
                                data-oid="858b.44"
                              >
                                <Eye className="h-4 w-4" data-oid="qployry" />
                              </button>
                              <button
                                className="p-1.5 rounded-md bg-space-800 text-red-400 hover:bg-space-700 transition-colors"
                                data-oid="s89wc5q"
                              >
                                <Trash className="h-4 w-4" data-oid="p_hom.g" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div
                className="mt-6 p-4 bg-blue-900/10 border border-blue-900/30 rounded-lg"
                data-oid="gdw38ka"
              >
                <div className="flex" data-oid="mwcecjb">
                  <div className="flex-shrink-0" data-oid="30uj:7f">
                    <Database
                      className="h-5 w-5 text-blue-400"
                      data-oid="qw3.u:w"
                    />
                  </div>
                  <div className="ml-3" data-oid="4c9vx19">
                    <h3
                      className="text-sm font-medium text-white"
                      data-oid="df.fiaa"
                    >
                      Backup Configuration
                    </h3>
                    <p
                      className="mt-1 text-sm text-gray-400"
                      data-oid="y:rpjku"
                    >
                      Automatic backups are currently configured to run daily at
                      midnight. Backups are encrypted and stored in multiple
                      locations for redundancy. The system retains backups for
                      30 days.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "security" && (
            <div data-oid="uvl.qgw">
              <h3
                className="text-lg font-medium text-white mb-4"
                data-oid="cgnkr4e"
              >
                Security Logs
              </h3>

              <div className="relative mb-4" data-oid="rk2s8e9">
                <input
                  type="text"
                  placeholder="Search security logs..."
                  className="w-full pl-9 pr-4 py-2 bg-space-800 border border-gray-700 rounded-lg text-white"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  data-oid="h.o5vo2"
                />

                <Search
                  className="absolute top-2.5 left-3 h-4 w-4 text-gray-400"
                  data-oid="nae0fgh"
                />
              </div>

              <div className="space-y-3" data-oid="3ig301_">
                {filteredLogs.length === 0 ? (
                  <div
                    className="text-center py-8 text-gray-400"
                    data-oid="nbxd:bc"
                  >
                    No logs found matching your search criteria
                  </div>
                ) : (
                  filteredLogs.map((log) => (
                    <div
                      key={log.id}
                      className="bg-space-800/50 rounded-lg p-3 flex items-start"
                      data-oid="nms9dn5"
                    >
                      <div
                        className={`px-2 py-1 rounded border text-xs font-medium ${getSeverityColor(log.severity)} mr-3`}
                        data-oid="bddwgos"
                      >
                        {log.severity.toUpperCase()}
                      </div>

                      <div className="flex-1" data-oid="y2q_0sq">
                        <div
                          className="flex justify-between"
                          data-oid="di8miwu"
                        >
                          <span
                            className="text-sm font-medium text-white"
                            data-oid="m:_gihx"
                          >
                            {log.event}
                          </span>
                          <span
                            className="text-xs text-gray-400"
                            data-oid="zb0g4e7"
                          >
                            {log.timestamp}
                          </span>
                        </div>

                        <div
                          className="mt-1 flex items-center text-xs text-gray-400"
                          data-oid="0k..-sz"
                        >
                          <span className="mr-3" data-oid="kdcz8lo">
                            IP: {log.ip}
                          </span>
                          {log.user && (
                            <span data-oid="ixivmeu">User: {log.user}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div
                className="mt-6 p-4 bg-purple-900/10 border border-purple-900/30 rounded-lg"
                data-oid="jdye84:"
              >
                <div className="flex" data-oid="1iy60n9">
                  <div className="flex-shrink-0" data-oid="p6x9oub">
                    <Lock
                      className="h-5 w-5 text-purple-400"
                      data-oid="s6t3:jw"
                    />
                  </div>
                  <div className="ml-3" data-oid="u1ila:x">
                    <h3
                      className="text-sm font-medium text-white"
                      data-oid="pku.-28"
                    >
                      Security Status
                    </h3>
                    <p
                      className="mt-1 text-sm text-gray-400"
                      data-oid="inr7a6a"
                    >
                      System security is currently active and monitoring for
                      unusual activity. Automatic blocking is enabled for
                      repeated failed login attempts. All API endpoints are
                      protected with rate limiting.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SystemMaintenance;
