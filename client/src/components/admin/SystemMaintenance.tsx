import { FC, useState } from "react";
import GlassCard from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  AlertCircle,
  Server,
  Database,
  Download,
  RefreshCw,
  Activity,
  HardDrive,
  Cpu,
  Terminal,
  Power,
  ArrowDown,
  Settings,
  FileText,
  Bell,
  Trash2,
  Search,
  Eye,
  Calendar,
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

// Sample system health data
const systemHealth = {
  cpu: {
    usage: 22,
    cores: 8,
    temperature: 42,
  },
  memory: {
    total: 16384,
    used: 7372,
    free: 9012,
  },
  disk: {
    total: 512,
    used: 189,
    free: 323,
  },
  uptime: "21 days, 14 hours",
  servicesStatus: [
    { name: "API Server", status: "Operational", time: "100%" },
    { name: "Database", status: "Operational", time: "99.98%" },
    { name: "Authentication", status: "Operational", time: "99.99%" },
    { name: "File Storage", status: "Operational", time: "100%" },
    { name: "Background Jobs", status: "Operational", time: "99.95%" },
  ],

  lastBackup: "2023-06-08 03:00 AM",
  nextScheduledBackup: "2023-06-09 03:00 AM",
};

// Sample system logs
const systemLogs = [
  {
    id: 1,
    level: "error",
    message: "Failed to process payment for user #245",
    timestamp: "2023-06-08T14:32:15",
    service: "Payment Service",
  },
  {
    id: 2,
    level: "warning",
    message: "High CPU usage detected (85%)",
    timestamp: "2023-06-08T12:18:05",
    service: "Monitoring",
  },
  {
    id: 3,
    level: "info",
    message: "User #128 updated their profile",
    timestamp: "2023-06-08T11:42:30",
    service: "User Service",
  },
  {
    id: 4,
    level: "error",
    message: "Database connection timeout",
    timestamp: "2023-06-08T10:15:22",
    service: "Database",
  },
  {
    id: 5,
    level: "info",
    message: "Backup completed successfully",
    timestamp: "2023-06-08T03:00:00",
    service: "Backup Service",
  },
  {
    id: 6,
    level: "warning",
    message: "API rate limit approached for endpoint /api/weather",
    timestamp: "2023-06-07T18:25:12",
    service: "API Gateway",
  },
  {
    id: 7,
    level: "info",
    message: "System update scheduled for 2023-06-15",
    timestamp: "2023-06-07T16:10:05",
    service: "System",
  },
];

// Sample system settings
const systemSettings = [
  {
    id: "email",
    name: "Email Settings",
    settings: [
      { key: "SMTP_SERVER", value: "smtp.sendgrid.net" },
      { key: "SMTP_PORT", value: "587" },
      { key: "EMAIL_FROM", value: "notifications@str8build.co.nz" },
      { key: "EMAIL_REPLY_TO", value: "support@str8build.co.nz" },
    ],
  },
  {
    id: "api",
    name: "API Settings",
    settings: [
      { key: "RATE_LIMIT", value: "100" },
      { key: "TIMEOUT", value: "30000" },
      { key: "CACHE_TTL", value: "300" },
    ],
  },
  {
    id: "jobs",
    name: "Background Jobs",
    settings: [
      { key: "JOB_QUEUE_SIZE", value: "1000" },
      { key: "JOB_RETRY_ATTEMPTS", value: "3" },
      { key: "JOB_CONCURRENCY", value: "5" },
    ],
  },
  {
    id: "security",
    name: "Security Settings",
    settings: [
      { key: "SESSION_TIMEOUT", value: "3600" },
      { key: "FAILED_LOGIN_ATTEMPTS", value: "5" },
      { key: "PASSWORD_EXPIRY_DAYS", value: "90" },
    ],
  },
];

const SystemMaintenance: FC = () => {
  const [activeTab, setActiveTab] = useState("health");
  const [searchTerm, setSearchTerm] = useState("");
  const [logLevel, setLogLevel] = useState("all");

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-NZ", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(date);
  };

  const filteredLogs = systemLogs.filter((log) => {
    const matchesSearch =
      log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.service.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = logLevel === "all" || log.level === logLevel;

    return matchesSearch && matchesLevel;
  });

  return (
    <div className="space-y-4" data-oid="1qb4zu:">
      <div className="flex justify-between items-center" data-oid="4_rd8.i">
        <h3 className="text-xl font-bold text-white" data-oid="s0nip7h">
          System Maintenance
        </h3>
      </div>

      <Tabs
        defaultValue="health"
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
        data-oid="nkksd9s"
      >
        <TabsList
          className="bg-space-900 border border-space-700 p-1"
          data-oid="hwh0jp-"
        >
          <TabsTrigger
            value="health"
            className="data-[state=active]:bg-purple-900 data-[state=active]:text-cyan"
            data-oid="lxx.5zj"
          >
            <Activity className="h-4 w-4 mr-2" data-oid="k70bq1h" />
            System Health
          </TabsTrigger>
          <TabsTrigger
            value="logs"
            className="data-[state=active]:bg-purple-900 data-[state=active]:text-cyan"
            data-oid="ey.26qf"
          >
            <Terminal className="h-4 w-4 mr-2" data-oid="s3oqrqi" />
            System Logs
          </TabsTrigger>
          <TabsTrigger
            value="settings"
            className="data-[state=active]:bg-purple-900 data-[state=active]:text-cyan"
            data-oid="yo-t8h1"
          >
            <Settings className="h-4 w-4 mr-2" data-oid="ymjfzuu" />
            System Settings
          </TabsTrigger>
          <TabsTrigger
            value="backup"
            className="data-[state=active]:bg-purple-900 data-[state=active]:text-cyan"
            data-oid="p3by-4r"
          >
            <Database className="h-4 w-4 mr-2" data-oid="0__g6_9" />
            Backup & Restore
          </TabsTrigger>
        </TabsList>

        {/* System Health Tab */}
        <TabsContent value="health" className="space-y-4" data-oid=".76ru5:">
          <div className="flex justify-between items-center" data-oid="daf6j-0">
            <div className="flex items-center" data-oid="a3qc.ls">
              <span
                className="h-3 w-3 rounded-full bg-green-500 mr-2"
                data-oid="t:qk-72"
              ></span>
              <span className="text-sm text-white" data-oid="6blgg3j">
                All Systems Operational
              </span>
            </div>
            <Button
              size="sm"
              className="bg-space-900 hover:bg-space-800 text-gray-300"
              data-oid="q2e4qmx"
            >
              <RefreshCw className="h-3 w-3 mr-2" data-oid=":cr2mg3" />
              Refresh
            </Button>
          </div>

          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
            data-oid="b2is-j."
          >
            {/* CPU Card */}
            <GlassCard className="p-4" data-oid=".r4s61u">
              <div className="flex items-center mb-4" data-oid="ebtoblm">
                <Cpu className="h-5 w-5 text-cyan mr-2" data-oid="dzkpb:d" />
                <h4 className="text-md font-bold text-white" data-oid="wntjrhy">
                  CPU
                </h4>
              </div>

              <div className="space-y-4" data-oid="6nm5n_k">
                <div data-oid="ed2tu3a">
                  <div
                    className="flex justify-between text-sm mb-1"
                    data-oid=":sw3ew6"
                  >
                    <span className="text-gray-400" data-oid="6hcpi-2">
                      Usage
                    </span>
                    <span className="text-white" data-oid="q-5tgy2">
                      {systemHealth.cpu.usage}%
                    </span>
                  </div>
                  <div
                    className="w-full h-2 bg-space-800 rounded-full"
                    data-oid="b150ara"
                  >
                    <div
                      className="h-full bg-gradient-to-r from-green-500 to-teal-500 rounded-full"
                      style={{ width: `${systemHealth.cpu.usage}%` }}
                      data-oid="j5qzi92"
                    ></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2" data-oid="lue7l7w">
                  <div
                    className="bg-space-900/50 p-2 rounded-lg"
                    data-oid="9t54sid"
                  >
                    <div className="text-xs text-gray-400" data-oid="z.i1dx9">
                      Cores
                    </div>
                    <div className="text-sm text-white" data-oid="fdykpg1">
                      {systemHealth.cpu.cores}
                    </div>
                  </div>
                  <div
                    className="bg-space-900/50 p-2 rounded-lg"
                    data-oid="dqz01vm"
                  >
                    <div className="text-xs text-gray-400" data-oid="2ymd-.l">
                      Temperature
                    </div>
                    <div className="text-sm text-white" data-oid="fq.53p8">
                      {systemHealth.cpu.temperature}°C
                    </div>
                  </div>
                </div>
              </div>
            </GlassCard>

            {/* Memory Card */}
            <GlassCard className="p-4" data-oid="4xaag_d">
              <div className="flex items-center mb-4" data-oid="rj-lcy5">
                <HardDrive
                  className="h-5 w-5 text-electric mr-2"
                  data-oid="8g:3v9_"
                />

                <h4 className="text-md font-bold text-white" data-oid="uljvf65">
                  Memory
                </h4>
              </div>

              <div className="space-y-4" data-oid="vqiawf-">
                <div data-oid="wkqda7-">
                  <div
                    className="flex justify-between text-sm mb-1"
                    data-oid="19hpijm"
                  >
                    <span className="text-gray-400" data-oid="n30jvzz">
                      Usage
                    </span>
                    <span className="text-white" data-oid="x1j_.tl">
                      {systemHealth.memory.used} MB /{" "}
                      {systemHealth.memory.total} MB
                    </span>
                  </div>
                  <div
                    className="w-full h-2 bg-space-800 rounded-full"
                    data-oid="_dh_6jd"
                  >
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-electric rounded-full"
                      style={{
                        width: `${(systemHealth.memory.used / systemHealth.memory.total) * 100}%`,
                      }}
                      data-oid="o2.w2lb"
                    ></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2" data-oid="ijg9.ho">
                  <div
                    className="bg-space-900/50 p-2 rounded-lg"
                    data-oid="o7a_2ly"
                  >
                    <div className="text-xs text-gray-400" data-oid="c6vo.38">
                      Used
                    </div>
                    <div className="text-sm text-white" data-oid="nigavog">
                      {(systemHealth.memory.used / 1024).toFixed(1)} GB
                    </div>
                  </div>
                  <div
                    className="bg-space-900/50 p-2 rounded-lg"
                    data-oid="v4s.zyb"
                  >
                    <div className="text-xs text-gray-400" data-oid="y569jad">
                      Free
                    </div>
                    <div className="text-sm text-white" data-oid="2bvubqt">
                      {(systemHealth.memory.free / 1024).toFixed(1)} GB
                    </div>
                  </div>
                </div>
              </div>
            </GlassCard>

            {/* Disk Card */}
            <GlassCard className="p-4" data-oid="j5-6bm1">
              <div className="flex items-center mb-4" data-oid="qfcmw:_">
                <Database
                  className="h-5 w-5 text-teal mr-2"
                  data-oid="-deo5i0"
                />

                <h4 className="text-md font-bold text-white" data-oid="12fi264">
                  Disk
                </h4>
              </div>

              <div className="space-y-4" data-oid="ket7uc5">
                <div data-oid=".dimlcn">
                  <div
                    className="flex justify-between text-sm mb-1"
                    data-oid="c5:4mye"
                  >
                    <span className="text-gray-400" data-oid="x5:uegu">
                      Usage
                    </span>
                    <span className="text-white" data-oid="c2ngjfb">
                      {systemHealth.disk.used} GB / {systemHealth.disk.total} GB
                    </span>
                  </div>
                  <div
                    className="w-full h-2 bg-space-800 rounded-full"
                    data-oid="2xj0o9b"
                  >
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-teal-500 rounded-full"
                      style={{
                        width: `${(systemHealth.disk.used / systemHealth.disk.total) * 100}%`,
                      }}
                      data-oid="43odw1s"
                    ></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2" data-oid="rs1z0ku">
                  <div
                    className="bg-space-900/50 p-2 rounded-lg"
                    data-oid="rheym8:"
                  >
                    <div className="text-xs text-gray-400" data-oid="miob:tg">
                      Used
                    </div>
                    <div className="text-sm text-white" data-oid="2rzu4:5">
                      {systemHealth.disk.used} GB
                    </div>
                  </div>
                  <div
                    className="bg-space-900/50 p-2 rounded-lg"
                    data-oid="o3:9446"
                  >
                    <div className="text-xs text-gray-400" data-oid="_ezmgsp">
                      Free
                    </div>
                    <div className="text-sm text-white" data-oid="zlwhjp:">
                      {systemHealth.disk.free} GB
                    </div>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* System Status */}
          <GlassCard className="p-4" data-oid="69mhp79">
            <div className="flex items-center mb-4" data-oid="v3z-2d4">
              <Server className="h-5 w-5 text-cyan mr-2" data-oid=":sbcpfw" />
              <h4 className="text-md font-bold text-white" data-oid="azyd_j8">
                System Status
              </h4>
            </div>

            <div className="space-y-4" data-oid="y.kcvx6">
              <div
                className="bg-space-900/50 p-3 rounded-lg flex items-center"
                data-oid="0gdiuu2"
              >
                <Power className="h-5 w-5 text-teal mr-3" data-oid="nf8rd4j" />
                <div data-oid="3b_z0f0">
                  <div className="text-sm text-white" data-oid="7hbofyd">
                    System Uptime
                  </div>
                  <div className="text-xs text-gray-400" data-oid="1nqiwoc">
                    {systemHealth.uptime}
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto" data-oid="qww-hyi">
                <table className="w-full" data-oid="bkl8jmj">
                  <thead className="text-gray-400 text-sm" data-oid="65hzvn_">
                    <tr data-oid="_o2f.yb">
                      <th className="text-left pb-2" data-oid="komuve4">
                        Service
                      </th>
                      <th className="text-left pb-2" data-oid="h1b_e0g">
                        Status
                      </th>
                      <th className="text-left pb-2" data-oid="6666k2j">
                        Uptime
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-white" data-oid="wp3v3b5">
                    {systemHealth.servicesStatus.map((service, idx) => (
                      <tr
                        key={idx}
                        className="border-t border-gray-800"
                        data-oid="2-yuy66"
                      >
                        <td className="py-2" data-oid="gusohi9">
                          {service.name}
                        </td>
                        <td className="py-2" data-oid="j28dcs3">
                          <Badge
                            className="bg-green-900 text-green-300"
                            data-oid="nyk6lw3"
                          >
                            {service.status}
                          </Badge>
                        </td>
                        <td className="py-2" data-oid="7v37:fu">
                          {service.time}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </GlassCard>
        </TabsContent>

        {/* System Logs Tab */}
        <TabsContent value="logs" className="space-y-4" data-oid="xgbjcga">
          <GlassCard className="p-4" data-oid="7:yjyiy">
            <div
              className="flex flex-col md:flex-row gap-4 mb-4"
              data-oid="xgqh:o3"
            >
              <div className="relative flex-grow" data-oid="02_mu3z">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"
                  data-oid="0d6mzwr"
                />

                <Input
                  placeholder="Search logs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-space-900 border-gray-700 text-white"
                  data-oid="wqw42cy"
                />
              </div>

              <div
                className="flex items-center bg-space-900 rounded-md border border-gray-700 px-3 py-1"
                data-oid="gtjj7v7"
              >
                <select
                  value={logLevel}
                  onChange={(e) => setLogLevel(e.target.value)}
                  className="bg-transparent text-white text-sm focus:outline-none"
                  data-oid="2fzzx9j"
                >
                  <option value="all" data-oid="k.1sj4t">
                    All Levels
                  </option>
                  <option value="info" data-oid="b0i_yuv">
                    Info
                  </option>
                  <option value="warning" data-oid="_8ylb0m">
                    Warning
                  </option>
                  <option value="error" data-oid="nleh5d5">
                    Error
                  </option>
                </select>
              </div>

              <Button
                className="bg-space-900 hover:bg-space-800 text-gray-300"
                data-oid="bhdigf6"
              >
                <Download className="h-4 w-4 mr-2" data-oid="s3w4uqy" />
                Export Logs
              </Button>
            </div>

            <div className="overflow-x-auto" data-oid=".-ynwq1">
              <table className="w-full" data-oid="y_t_5ny">
                <thead className="text-gray-400 text-sm" data-oid="s-z8f8j">
                  <tr className="border-b border-gray-800" data-oid="ram8iim">
                    <th className="text-left pb-2 pl-2" data-oid="b2qq2l-">
                      Level
                    </th>
                    <th className="text-left pb-2" data-oid="cqba87p">
                      Message
                    </th>
                    <th className="text-left pb-2" data-oid="hsvfoo6">
                      Service
                    </th>
                    <th className="text-left pb-2" data-oid="yws9go_">
                      Timestamp
                    </th>
                    <th className="text-right pb-2 pr-2" data-oid="w4l5jxn">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="text-white" data-oid="n6-ghs1">
                  {filteredLogs.map((log) => (
                    <tr
                      key={log.id}
                      className="border-b border-gray-800 hover:bg-space-900/50"
                      data-oid="8m3v-d_"
                    >
                      <td className="py-3 pl-2" data-oid="_2pn7.:">
                        {log.level === "error" && (
                          <Badge
                            className="bg-red-900 text-red-300"
                            data-oid="jf3hb6u"
                          >
                            Error
                          </Badge>
                        )}
                        {log.level === "warning" && (
                          <Badge
                            className="bg-yellow-900 text-yellow-300"
                            data-oid="tc1t7cv"
                          >
                            Warning
                          </Badge>
                        )}
                        {log.level === "info" && (
                          <Badge
                            className="bg-blue-900 text-blue-300"
                            data-oid="q1_46ba"
                          >
                            Info
                          </Badge>
                        )}
                      </td>
                      <td className="py-3" data-oid="oya62.r">
                        {log.message}
                      </td>
                      <td className="py-3" data-oid="cve7l0_">
                        {log.service}
                      </td>
                      <td
                        className="py-3 text-sm text-gray-400"
                        data-oid=".gysvj1"
                      >
                        {formatDate(log.timestamp)}
                      </td>
                      <td className="py-3 pr-2 text-right" data-oid="6vi1obr">
                        <button
                          className="p-1 text-gray-400 hover:text-cyan"
                          data-oid=".am9qyf"
                        >
                          <Eye className="h-4 w-4" data-oid="s.ab.it" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredLogs.length === 0 && (
              <div className="p-8 text-center text-gray-400" data-oid="7a5j3fa">
                No logs found matching your search criteria.
              </div>
            )}
          </GlassCard>
        </TabsContent>

        {/* System Settings Tab */}
        <TabsContent value="settings" className="space-y-4" data-oid="p3bwx2-">
          {systemSettings.map((group) => (
            <GlassCard key={group.id} className="p-4" data-oid="k7tsjxd">
              <div className="flex items-center mb-4" data-oid="982up_e">
                <Settings
                  className="h-5 w-5 text-cyan mr-2"
                  data-oid=":4ens2f"
                />

                <h4 className="text-md font-bold text-white" data-oid="ktco1wk">
                  {group.name}
                </h4>
              </div>

              <div className="space-y-2" data-oid="3-4f0xi">
                {group.settings.map((setting, idx) => (
                  <div
                    key={idx}
                    className="grid grid-cols-12 gap-4 p-2 border-b border-gray-800"
                    data-oid="chgwcxj"
                  >
                    <div
                      className="col-span-4 text-sm text-white"
                      data-oid="2cpfpig"
                    >
                      {setting.key}
                    </div>
                    <div className="col-span-6" data-oid="gjow-rc">
                      <Input
                        className="bg-space-900 border-gray-700 text-white"
                        defaultValue={setting.value}
                        data-oid="z6qm4li"
                      />
                    </div>
                    <div
                      className="col-span-2 flex justify-end"
                      data-oid="amcog:p"
                    >
                      <Button
                        className="mr-1 bg-space-900 hover:bg-space-800 text-gray-300"
                        size="sm"
                        data-oid="f9892tk"
                      >
                        <RefreshCw className="h-3 w-3" data-oid="chws4k3" />
                      </Button>
                      <Button
                        className="bg-purple-900 text-cyan hover:bg-purple-800"
                        size="sm"
                        data-oid="u.e1126"
                      >
                        Save
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          ))}
        </TabsContent>

        {/* Backup & Restore Tab */}
        <TabsContent value="backup" className="space-y-4" data-oid="y9tyvx2">
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
            data-oid="19fgwhq"
          >
            <GlassCard className="p-4" data-oid="58n1_ij">
              <div className="flex items-center mb-4" data-oid="4uqzw8p">
                <Database
                  className="h-5 w-5 text-electric mr-2"
                  data-oid="-z04go:"
                />

                <h4 className="text-md font-bold text-white" data-oid="7bsa320">
                  Database Backup
                </h4>
              </div>

              <div className="space-y-4" data-oid="g_b3xrw">
                <div
                  className="bg-space-900/50 p-3 rounded-lg"
                  data-oid="e59mr4r"
                >
                  <div
                    className="flex items-center justify-between mb-2"
                    data-oid="6voq6kr"
                  >
                    <div className="text-sm text-gray-400" data-oid="e4i_7eb">
                      Last Backup
                    </div>
                    <div className="text-sm text-white" data-oid="5_nqac4">
                      {systemHealth.lastBackup}
                    </div>
                  </div>
                  <div
                    className="flex items-center justify-between"
                    data-oid="_20xp9z"
                  >
                    <div className="text-sm text-gray-400" data-oid="y4fsp6x">
                      Next Scheduled Backup
                    </div>
                    <div className="text-sm text-white" data-oid="aa8famk">
                      {systemHealth.nextScheduledBackup}
                    </div>
                  </div>
                </div>

                <Button
                  className="w-full bg-purple-900 text-cyan hover:bg-purple-800"
                  data-oid="t-ley.i"
                >
                  <Database className="h-4 w-4 mr-2" data-oid="q-air2y" />
                  Trigger Manual Backup
                </Button>
              </div>
            </GlassCard>

            <GlassCard className="p-4" data-oid="p2viks7">
              <div className="flex items-center mb-4" data-oid="7pi6voz">
                <ArrowDown
                  className="h-5 w-5 text-teal mr-2"
                  data-oid="ktb7:8b"
                />

                <h4 className="text-md font-bold text-white" data-oid="it0pz:9">
                  Restore Database
                </h4>
              </div>

              <div className="space-y-4" data-oid=".akbfan">
                <div
                  className="bg-red-900/20 p-3 rounded-lg border border-red-800"
                  data-oid="kgbo2-z"
                >
                  <div className="flex items-start" data-oid="b:v4stk">
                    <AlertCircle
                      className="h-5 w-5 text-red-400 mr-2 mt-0.5"
                      data-oid="qedj44."
                    />

                    <div data-oid="5hu:csp">
                      <div
                        className="text-sm font-medium text-white mb-1"
                        data-oid="1128pao"
                      >
                        Warning
                      </div>
                      <div className="text-xs text-gray-300" data-oid="g_y73mz">
                        Restoring a database backup will replace all current
                        data. This action cannot be undone.
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2" data-oid="y_i9xls">
                  <label className="text-sm text-gray-400" data-oid="8hfrllv">
                    Select Backup
                  </label>
                  <select
                    className="w-full bg-space-900 border border-gray-700 rounded p-2 text-white"
                    data-oid="o8tljxc"
                  >
                    <option value="latest" data-oid="6ph_dso">
                      Latest Backup (2023-06-08 03:00 AM)
                    </option>
                    <option value="20230607" data-oid="w1bpm9-">
                      2023-06-07 03:00 AM
                    </option>
                    <option value="20230606" data-oid="fxx00z8">
                      2023-06-06 03:00 AM
                    </option>
                    <option value="20230605" data-oid="ukmsllp">
                      2023-06-05 03:00 AM
                    </option>
                  </select>
                </div>

                <Button
                  className="w-full bg-red-900 hover:bg-red-800 text-gray-200"
                  variant="destructive"
                  data-oid="x:-tbwj"
                >
                  Restore Selected Backup
                </Button>
              </div>
            </GlassCard>
          </div>

          <GlassCard className="p-4" data-oid="bh9n-o.">
            <div className="flex items-center mb-4" data-oid="go43gr4">
              <FileText className="h-5 w-5 text-cyan mr-2" data-oid="a27dafa" />
              <h4 className="text-md font-bold text-white" data-oid=":9komyn">
                Backup History
              </h4>
            </div>

            <div className="overflow-x-auto" data-oid="8u0q.se">
              <table className="w-full" data-oid="gkgz4y1">
                <thead className="text-gray-400 text-sm" data-oid="d:q6277">
                  <tr className="border-b border-gray-800" data-oid="5wt7iqm">
                    <th className="text-left pb-2" data-oid="l7kum55">
                      Date & Time
                    </th>
                    <th className="text-left pb-2" data-oid="a:q:5ja">
                      Size
                    </th>
                    <th className="text-left pb-2" data-oid="5:1ojb3">
                      Type
                    </th>
                    <th className="text-left pb-2" data-oid="ohdz3k4">
                      Status
                    </th>
                    <th className="text-right pb-2" data-oid="nrlz.o0">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="text-white" data-oid="ud:b:77">
                  <tr
                    className="border-b border-gray-800 hover:bg-space-900/50"
                    data-oid="juqauou"
                  >
                    <td className="py-3" data-oid="1cvtvzn">
                      2023-06-08 03:00 AM
                    </td>
                    <td className="py-3" data-oid="nuf7skh">
                      245 MB
                    </td>
                    <td className="py-3" data-oid="xs:funl">
                      Scheduled
                    </td>
                    <td className="py-3" data-oid="m_zs57_">
                      <Badge
                        className="bg-green-900 text-green-300"
                        data-oid="khth5ea"
                      >
                        Completed
                      </Badge>
                    </td>
                    <td className="py-3 text-right" data-oid="jq685fl">
                      <Button
                        size="sm"
                        className="mr-1 bg-space-900 hover:bg-space-800 text-gray-300"
                        data-oid="68-4vje"
                      >
                        <Download className="h-3 w-3" data-oid="_11v-i9" />
                      </Button>
                      <Button
                        size="sm"
                        className="bg-red-900/50 hover:bg-red-900 text-red-200"
                        data-oid="o8lc4go"
                      >
                        <Trash2 className="h-3 w-3" data-oid="9vai:ce" />
                      </Button>
                    </td>
                  </tr>
                  <tr
                    className="border-b border-gray-800 hover:bg-space-900/50"
                    data-oid="jy901kz"
                  >
                    <td className="py-3" data-oid="4ucijki">
                      2023-06-07 03:00 AM
                    </td>
                    <td className="py-3" data-oid="xcrgc_b">
                      242 MB
                    </td>
                    <td className="py-3" data-oid="a.3sl_f">
                      Scheduled
                    </td>
                    <td className="py-3" data-oid="wx7:5.3">
                      <Badge
                        className="bg-green-900 text-green-300"
                        data-oid="sea4cb4"
                      >
                        Completed
                      </Badge>
                    </td>
                    <td className="py-3 text-right" data-oid="2mcmaeb">
                      <Button
                        size="sm"
                        className="mr-1 bg-space-900 hover:bg-space-800 text-gray-300"
                        data-oid="g9nevaa"
                      >
                        <Download className="h-3 w-3" data-oid="ez6.2u4" />
                      </Button>
                      <Button
                        size="sm"
                        className="bg-red-900/50 hover:bg-red-900 text-red-200"
                        data-oid="5iuqbrm"
                      >
                        <Trash2 className="h-3 w-3" data-oid="rqanaf8" />
                      </Button>
                    </td>
                  </tr>
                  <tr
                    className="border-b border-gray-800 hover:bg-space-900/50"
                    data-oid="-76p7a4"
                  >
                    <td className="py-3" data-oid="y62a6af">
                      2023-06-06 03:00 AM
                    </td>
                    <td className="py-3" data-oid="7k02-:i">
                      240 MB
                    </td>
                    <td className="py-3" data-oid="q9c.ozs">
                      Scheduled
                    </td>
                    <td className="py-3" data-oid=":e.ra89">
                      <Badge
                        className="bg-green-900 text-green-300"
                        data-oid="ebzrpp9"
                      >
                        Completed
                      </Badge>
                    </td>
                    <td className="py-3 text-right" data-oid="853e05t">
                      <Button
                        size="sm"
                        className="mr-1 bg-space-900 hover:bg-space-800 text-gray-300"
                        data-oid=".hn3m5x"
                      >
                        <Download className="h-3 w-3" data-oid="5k9w4qj" />
                      </Button>
                      <Button
                        size="sm"
                        className="bg-red-900/50 hover:bg-red-900 text-red-200"
                        data-oid="r0o-s6y"
                      >
                        <Trash2 className="h-3 w-3" data-oid="6i4eo6j" />
                      </Button>
                    </td>
                  </tr>
                  <tr className="hover:bg-space-900/50" data-oid="x703lg8">
                    <td className="py-3" data-oid="v8-6xl_">
                      2023-06-05 15:42 PM
                    </td>
                    <td className="py-3" data-oid="-9v40p8">
                      239 MB
                    </td>
                    <td className="py-3" data-oid="ft5ev-c">
                      Manual
                    </td>
                    <td className="py-3" data-oid=":mhxo:d">
                      <Badge
                        className="bg-green-900 text-green-300"
                        data-oid="95q-z4a"
                      >
                        Completed
                      </Badge>
                    </td>
                    <td className="py-3 text-right" data-oid="7wf0j17">
                      <Button
                        size="sm"
                        className="mr-1 bg-space-900 hover:bg-space-800 text-gray-300"
                        data-oid="k99wz55"
                      >
                        <Download className="h-3 w-3" data-oid="46mri4z" />
                      </Button>
                      <Button
                        size="sm"
                        className="bg-red-900/50 hover:bg-red-900 text-red-200"
                        data-oid="duhnqxp"
                      >
                        <Trash2 className="h-3 w-3" data-oid="ti1i.:o" />
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </GlassCard>

          <GlassCard className="p-4" data-oid="mif1qar">
            <div className="flex items-center mb-4" data-oid="-armd-t">
              <Calendar className="h-5 w-5 text-cyan mr-2" data-oid="-d6d0tk" />
              <h4 className="text-md font-bold text-white" data-oid="nn.ct9:">
                Backup Schedule
              </h4>
            </div>

            <div className="space-y-4" data-oid="umwo10i">
              <div
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
                data-oid="2gg__:a"
              >
                <div className="space-y-2" data-oid="rf2zv55">
                  <label className="text-sm text-gray-400" data-oid="y8fy64a">
                    Backup Frequency
                  </label>
                  <select
                    className="w-full bg-space-900 border border-gray-700 rounded p-2 text-white"
                    data-oid="badjsfg"
                  >
                    <option value="daily" data-oid="xkdt_oy">
                      Daily
                    </option>
                    <option value="weekly" data-oid="h5c._cf">
                      Weekly
                    </option>
                    <option value="monthly" data-oid="naqg_jv">
                      Monthly
                    </option>
                  </select>
                </div>
                <div className="space-y-2" data-oid="qzg4-z3">
                  <label className="text-sm text-gray-400" data-oid="k8c36o5">
                    Backup Time
                  </label>
                  <Input
                    type="time"
                    className="bg-space-900 border-gray-700 text-white"
                    defaultValue="03:00"
                    data-oid="fmf:xrc"
                  />
                </div>
              </div>

              <div className="space-y-2" data-oid="p0rofda">
                <label className="text-sm text-gray-400" data-oid="0s9poct">
                  Retention Policy
                </label>
                <select
                  className="w-full bg-space-900 border border-gray-700 rounded p-2 text-white"
                  data-oid="-ktou_q"
                >
                  <option value="7" data-oid="6h:jims">
                    Keep last 7 days
                  </option>
                  <option value="14" data-oid="pu-a7:i">
                    Keep last 14 days
                  </option>
                  <option value="30" data-oid="n_tw-qp">
                    Keep last 30 days
                  </option>
                  <option value="90" data-oid="8n8yecz">
                    Keep last 90 days
                  </option>
                </select>
              </div>

              <Button
                className="w-full bg-purple-900 text-cyan hover:bg-purple-800"
                data-oid="4y7duqt"
              >
                Save Backup Settings
              </Button>
            </div>
          </GlassCard>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SystemMaintenance;
