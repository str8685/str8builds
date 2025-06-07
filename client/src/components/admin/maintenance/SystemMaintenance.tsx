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
    data-oid="-yq52c-"
  >
    <span className="mr-3" data-oid="519iffy">
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
          <CheckCircle className="h-4 w-4 text-green-400" data-oid="rpsqudz" />
        );

      case "down":
        return (
          <AlertTriangle className="h-4 w-4 text-red-400" data-oid="rs2rh-c" />
        );

      case "warning":
        return (
          <AlertTriangle
            className="h-4 w-4 text-orange-400"
            data-oid="k.pba37"
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
          <CheckCircle className="h-4 w-4 text-green-400" data-oid="qk9egyj" />
        );

      case "failed":
        return (
          <AlertTriangle className="h-4 w-4 text-red-400" data-oid="06vaxoj" />
        );

      case "in_progress":
        return (
          <RefreshCw
            className="h-4 w-4 text-blue-400 animate-spin"
            data-oid="a6:9_gs"
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
      <div className="w-full bg-gray-700 rounded-full h-2" data-oid="v.mvq4h">
        <div
          className={`${barColor} h-2 rounded-full`}
          style={{ width: `${percentage}%` }}
          data-oid="kilixs5"
        ></div>
      </div>
    );
  };

  return (
    <div className="space-y-6" data-oid="d9vvuih">
      <div className="flex justify-between items-center" data-oid="1vs6yd6">
        <h2
          className="text-xl font-bold text-white flex items-center"
          data-oid="y3pqact"
        >
          <Server className="h-5 w-5 mr-2 text-cyan" data-oid="7o2-r_-" />
          System Maintenance
        </h2>

        <button
          className="flex items-center text-sm text-cyan bg-space-800 px-3 py-1.5 rounded-md hover:bg-space-700 transition-colors"
          onClick={handleRefresh}
          disabled={isRefreshing}
          data-oid="itbfple"
        >
          <RefreshCw
            className={`h-3.5 w-3.5 mr-1.5 ${isRefreshing ? "animate-spin" : ""}`}
            data-oid="huhh41k"
          />

          {isRefreshing ? "Refreshing..." : "Refresh Data"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6" data-oid="y9x2qlo">
        {/* Sidebar */}
        <div
          className="bg-space-900 rounded-xl glass-card p-3 space-y-2"
          data-oid="9ggs2p:"
        >
          <MaintenanceTab
            name="Servers & Resources"
            icon={<Server className="h-4 w-4 text-cyan" data-oid="8:oda3a" />}
            active={activeTab === "servers"}
            onClick={() => setActiveTab("servers")}
            data-oid=".5gzvtc"
          />

          <MaintenanceTab
            name="Backups & Recovery"
            icon={
              <Database
                className="h-4 w-4 text-purple-400"
                data-oid="q:h4.rn"
              />
            }
            active={activeTab === "backups"}
            onClick={() => setActiveTab("backups")}
            data-oid="ka6tuo4"
          />

          <MaintenanceTab
            name="Security & Logs"
            icon={
              <Lock className="h-4 w-4 text-orange-400" data-oid="qmryh16" />
            }
            active={activeTab === "security"}
            onClick={() => setActiveTab("security")}
            data-oid="lj-0wgg"
          />
        </div>

        {/* Main content */}
        <div
          className="md:col-span-3 bg-space-900 rounded-xl glass-card p-4"
          data-oid=".ns:udl"
        >
          {activeTab === "servers" && (
            <div data-oid="94o_-1c">
              <h3
                className="text-lg font-medium text-white mb-4"
                data-oid="gx-:6kt"
              >
                Server Status & Resources
              </h3>

              <div className="space-y-4" data-oid=":ryykub">
                {serverData.map((server, index) => (
                  <div
                    key={index}
                    className="bg-space-800/60 rounded-lg p-4"
                    data-oid="05xajlp"
                  >
                    <div
                      className="flex justify-between items-start mb-3"
                      data-oid="zawb93o"
                    >
                      <div data-oid="jta-g:d">
                        <div className="flex items-center" data-oid="837jvg6">
                          <HardDrive
                            className="h-4 w-4 text-cyan mr-2"
                            data-oid="yw_ti74"
                          />

                          <h4
                            className="text-white font-medium"
                            data-oid="x.axq.."
                          >
                            {server.name}
                          </h4>
                        </div>
                        <p
                          className="text-sm text-gray-400 mt-1"
                          data-oid="t5wxld:"
                        >
                          {server.role}
                        </p>
                      </div>

                      <div className="flex items-center" data-oid="5:bu885">
                        {getStatusIcon(server.status)}
                        <span
                          className={`ml-1.5 text-sm ${getStatusColor(server.status)}`}
                          data-oid="u9f8g9f"
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
                      data-oid="jnbabp7"
                    >
                      <div data-oid="gm1fa3v">
                        <p
                          className="text-xs text-gray-400 mb-1"
                          data-oid="gw6ehtf"
                        >
                          Uptime
                        </p>
                        <p className="text-sm text-white" data-oid="_al2d_h">
                          {server.uptime}
                        </p>
                      </div>

                      <div data-oid="8g5v0d-">
                        <div
                          className="flex items-center justify-between mb-1"
                          data-oid="tt4a6um"
                        >
                          <p
                            className="text-xs text-gray-400"
                            data-oid="fag9-hi"
                          >
                            CPU
                          </p>
                          <p className="text-xs text-white" data-oid="6-duvks">
                            {server.cpu}%
                          </p>
                        </div>
                        {generateResourceBar(server.cpu)}
                      </div>

                      <div data-oid="p-tbb8_">
                        <div
                          className="flex items-center justify-between mb-1"
                          data-oid="su6bn76"
                        >
                          <p
                            className="text-xs text-gray-400"
                            data-oid="sb8vkyl"
                          >
                            Memory
                          </p>
                          <p className="text-xs text-white" data-oid="j:gs:g:">
                            {server.memory}%
                          </p>
                        </div>
                        {generateResourceBar(server.memory)}
                      </div>

                      <div data-oid="p-fx9ww">
                        <div
                          className="flex items-center justify-between mb-1"
                          data-oid="yot:92_"
                        >
                          <p
                            className="text-xs text-gray-400"
                            data-oid="c2irczt"
                          >
                            Disk
                          </p>
                          <p className="text-xs text-white" data-oid="c354dx9">
                            {server.disk}%
                          </p>
                        </div>
                        {generateResourceBar(server.disk)}
                      </div>
                    </div>

                    <div
                      className="flex justify-end space-x-2"
                      data-oid="7f_gjac"
                    >
                      <button
                        className="text-xs text-cyan hover:text-cyan-200 transition-colors flex items-center"
                        data-oid="bitu7n5"
                      >
                        <Activity
                          className="h-3.5 w-3.5 mr-1"
                          data-oid="6c5hd_k"
                        />
                        View Details
                      </button>
                      <button
                        className="text-xs text-cyan hover:text-cyan-200 transition-colors flex items-center"
                        data-oid="g98_-xy"
                      >
                        <ArrowUpRight
                          className="h-3.5 w-3.5 mr-1"
                          data-oid="hcux-9t"
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
            <div data-oid="brayo56">
              <div
                className="flex justify-between items-center mb-4"
                data-oid="4ft-bu0"
              >
                <h3
                  className="text-lg font-medium text-white"
                  data-oid="7uut6hs"
                >
                  Database Backups
                </h3>

                <button
                  className="btn-glow btn-glow-cyan bg-purple-900 text-cyan px-3 py-1.5 rounded-lg flex items-center text-sm"
                  onClick={handleCreateBackup}
                  disabled={isCreatingBackup}
                  data-oid="nel0j4u"
                >
                  {isCreatingBackup ? (
                    <>
                      <RefreshCw
                        className="h-3.5 w-3.5 mr-1.5 animate-spin"
                        data-oid="bckukev"
                      />
                      Creating Backup...
                    </>
                  ) : (
                    <>
                      <Database
                        className="h-3.5 w-3.5 mr-1.5"
                        data-oid="9nq8_x6"
                      />
                      Create Backup Now
                    </>
                  )}
                </button>
              </div>

              <div
                className="bg-space-900 rounded-xl overflow-hidden glass-card"
                data-oid="xpg24xq"
              >
                <div className="overflow-x-auto" data-oid="kyt14fw">
                  <table className="w-full" data-oid="jgnji4c">
                    <thead data-oid="dzm5131">
                      <tr
                        className="bg-space-800 border-b border-gray-700"
                        data-oid="6pl9tlp"
                      >
                        <th
                          className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                          data-oid=".ungup0"
                        >
                          Date & Time
                        </th>
                        <th
                          className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                          data-oid="9m_tmqf"
                        >
                          Type
                        </th>
                        <th
                          className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                          data-oid="1.g8l5l"
                        >
                          Size
                        </th>
                        <th
                          className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                          data-oid="y:1x:qe"
                        >
                          Status
                        </th>
                        <th
                          className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider"
                          data-oid="x.:hga8"
                        >
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody
                      className="divide-y divide-gray-800"
                      data-oid="lyt.fn2"
                    >
                      {backupData.map((backup) => (
                        <tr
                          key={backup.id}
                          className="hover:bg-space-800/50"
                          data-oid="b7x3jcx"
                        >
                          <td
                            className="px-4 py-3 whitespace-nowrap"
                            data-oid="-nf.hej"
                          >
                            <div
                              className="flex items-center text-sm text-white"
                              data-oid="r13p:9o"
                            >
                              <Calendar
                                className="h-4 w-4 mr-2 text-gray-400"
                                data-oid="pta.s0l"
                              />

                              {backup.date}
                            </div>
                          </td>
                          <td
                            className="px-4 py-3 whitespace-nowrap"
                            data-oid="1gstnix"
                          >
                            <span
                              className={`text-xs px-2 py-1 rounded-full font-medium ${
                                backup.type === "auto"
                                  ? "bg-blue-900/20 text-blue-300"
                                  : "bg-purple-900/20 text-purple-300"
                              }`}
                              data-oid="0zaatoz"
                            >
                              {backup.type === "auto" ? "Automated" : "Manual"}
                            </span>
                          </td>
                          <td
                            className="px-4 py-3 whitespace-nowrap text-sm text-gray-300"
                            data-oid="6gblb4i"
                          >
                            {backup.size}
                          </td>
                          <td
                            className="px-4 py-3 whitespace-nowrap"
                            data-oid="ud:fq79"
                          >
                            <span
                              className={`flex items-center text-sm ${getBackupStatusColor(backup.status)}`}
                              data-oid="rypp3t."
                            >
                              {getBackupStatusIcon(backup.status)}
                              <span className="ml-1.5" data-oid="wrum0ta">
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
                            data-oid="c9:f:::"
                          >
                            <div
                              className="flex justify-end space-x-2"
                              data-oid="vi5:ji0"
                            >
                              <button
                                className="p-1.5 rounded-md bg-space-800 text-blue-400 hover:bg-space-700 transition-colors"
                                data-oid="-:r3zj."
                              >
                                <Download
                                  className="h-4 w-4"
                                  data-oid="bom79gs"
                                />
                              </button>
                              <button
                                className="p-1.5 rounded-md bg-space-800 text-cyan hover:bg-space-700 transition-colors"
                                data-oid="3iqn_tx"
                              >
                                <Eye className="h-4 w-4" data-oid="2kedt-0" />
                              </button>
                              <button
                                className="p-1.5 rounded-md bg-space-800 text-red-400 hover:bg-space-700 transition-colors"
                                data-oid="4n9ab.k"
                              >
                                <Trash className="h-4 w-4" data-oid="r7-upym" />
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
                data-oid="4az5:z."
              >
                <div className="flex" data-oid="do.4p5j">
                  <div className="flex-shrink-0" data-oid="uythzsy">
                    <Database
                      className="h-5 w-5 text-blue-400"
                      data-oid="lmespq_"
                    />
                  </div>
                  <div className="ml-3" data-oid="98p.pt4">
                    <h3
                      className="text-sm font-medium text-white"
                      data-oid="vzgm7jr"
                    >
                      Backup Configuration
                    </h3>
                    <p
                      className="mt-1 text-sm text-gray-400"
                      data-oid="cmyz9a:"
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
            <div data-oid="enhwnb-">
              <h3
                className="text-lg font-medium text-white mb-4"
                data-oid="tgda9ve"
              >
                Security Logs
              </h3>

              <div className="relative mb-4" data-oid="3g1.dha">
                <input
                  type="text"
                  placeholder="Search security logs..."
                  className="w-full pl-9 pr-4 py-2 bg-space-800 border border-gray-700 rounded-lg text-white"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  data-oid="vx6ojqa"
                />

                <Search
                  className="absolute top-2.5 left-3 h-4 w-4 text-gray-400"
                  data-oid="dazrc3_"
                />
              </div>

              <div className="space-y-3" data-oid="n7y01dp">
                {filteredLogs.length === 0 ? (
                  <div
                    className="text-center py-8 text-gray-400"
                    data-oid="4lfjl8m"
                  >
                    No logs found matching your search criteria
                  </div>
                ) : (
                  filteredLogs.map((log) => (
                    <div
                      key={log.id}
                      className="bg-space-800/50 rounded-lg p-3 flex items-start"
                      data-oid="cw1vy7c"
                    >
                      <div
                        className={`px-2 py-1 rounded border text-xs font-medium ${getSeverityColor(log.severity)} mr-3`}
                        data-oid="hhu6tmx"
                      >
                        {log.severity.toUpperCase()}
                      </div>

                      <div className="flex-1" data-oid="5.d2gtk">
                        <div
                          className="flex justify-between"
                          data-oid="hi5slzw"
                        >
                          <span
                            className="text-sm font-medium text-white"
                            data-oid="56-wjtw"
                          >
                            {log.event}
                          </span>
                          <span
                            className="text-xs text-gray-400"
                            data-oid="sighr-y"
                          >
                            {log.timestamp}
                          </span>
                        </div>

                        <div
                          className="mt-1 flex items-center text-xs text-gray-400"
                          data-oid="afealb9"
                        >
                          <span className="mr-3" data-oid="ork_brp">
                            IP: {log.ip}
                          </span>
                          {log.user && (
                            <span data-oid="3usrp8w">User: {log.user}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div
                className="mt-6 p-4 bg-purple-900/10 border border-purple-900/30 rounded-lg"
                data-oid="r9918p4"
              >
                <div className="flex" data-oid="2axwpsy">
                  <div className="flex-shrink-0" data-oid="t5qz48x">
                    <Lock
                      className="h-5 w-5 text-purple-400"
                      data-oid="h3oy.e1"
                    />
                  </div>
                  <div className="ml-3" data-oid=":l1f1ds">
                    <h3
                      className="text-sm font-medium text-white"
                      data-oid="xwkdql6"
                    >
                      Security Status
                    </h3>
                    <p
                      className="mt-1 text-sm text-gray-400"
                      data-oid="0d5yuws"
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
