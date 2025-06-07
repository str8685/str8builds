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
    <div className="space-y-4" data-oid="lzy11m7">
      <div className="flex justify-between items-center" data-oid="anuq9qp">
        <h3 className="text-xl font-bold text-white" data-oid="swmd2om">
          System Maintenance
        </h3>
      </div>

      <Tabs
        defaultValue="health"
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
        data-oid="a_c0klr"
      >
        <TabsList
          className="bg-space-900 border border-space-700 p-1"
          data-oid="nmu4sgk"
        >
          <TabsTrigger
            value="health"
            className="data-[state=active]:bg-purple-900 data-[state=active]:text-cyan"
            data-oid="a73wjr5"
          >
            <Activity className="h-4 w-4 mr-2" data-oid="c4-zu7i" />
            System Health
          </TabsTrigger>
          <TabsTrigger
            value="logs"
            className="data-[state=active]:bg-purple-900 data-[state=active]:text-cyan"
            data-oid="_m72uii"
          >
            <Terminal className="h-4 w-4 mr-2" data-oid="832hwz7" />
            System Logs
          </TabsTrigger>
          <TabsTrigger
            value="settings"
            className="data-[state=active]:bg-purple-900 data-[state=active]:text-cyan"
            data-oid="dun6:vw"
          >
            <Settings className="h-4 w-4 mr-2" data-oid="i-sfu-n" />
            System Settings
          </TabsTrigger>
          <TabsTrigger
            value="backup"
            className="data-[state=active]:bg-purple-900 data-[state=active]:text-cyan"
            data-oid="-opn0:t"
          >
            <Database className="h-4 w-4 mr-2" data-oid="j6uk.gr" />
            Backup & Restore
          </TabsTrigger>
        </TabsList>

        {/* System Health Tab */}
        <TabsContent value="health" className="space-y-4" data-oid="8cxy5al">
          <div className="flex justify-between items-center" data-oid="dl4qupx">
            <div className="flex items-center" data-oid="d4ezw:0">
              <span
                className="h-3 w-3 rounded-full bg-green-500 mr-2"
                data-oid="qw0nu:u"
              ></span>
              <span className="text-sm text-white" data-oid="3104qan">
                All Systems Operational
              </span>
            </div>
            <Button
              size="sm"
              className="bg-space-900 hover:bg-space-800 text-gray-300"
              data-oid="ts9kxsx"
            >
              <RefreshCw className="h-3 w-3 mr-2" data-oid="80t02d7" />
              Refresh
            </Button>
          </div>

          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
            data-oid="afzha7-"
          >
            {/* CPU Card */}
            <GlassCard className="p-4" data-oid="t19gjvm">
              <div className="flex items-center mb-4" data-oid="8.t_qrq">
                <Cpu className="h-5 w-5 text-cyan mr-2" data-oid="tf9255q" />
                <h4 className="text-md font-bold text-white" data-oid="zq3ux-x">
                  CPU
                </h4>
              </div>

              <div className="space-y-4" data-oid="d49ods6">
                <div data-oid="qdwa7fd">
                  <div
                    className="flex justify-between text-sm mb-1"
                    data-oid="xoy:wla"
                  >
                    <span className="text-gray-400" data-oid="bkmeqrr">
                      Usage
                    </span>
                    <span className="text-white" data-oid="lkpqglw">
                      {systemHealth.cpu.usage}%
                    </span>
                  </div>
                  <div
                    className="w-full h-2 bg-space-800 rounded-full"
                    data-oid="ue__.0j"
                  >
                    <div
                      className="h-full bg-gradient-to-r from-green-500 to-teal-500 rounded-full"
                      style={{ width: `${systemHealth.cpu.usage}%` }}
                      data-oid="y20vyyt"
                    ></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2" data-oid="uz0mdcr">
                  <div
                    className="bg-space-900/50 p-2 rounded-lg"
                    data-oid="v1gp_.s"
                  >
                    <div className="text-xs text-gray-400" data-oid="ny.vwhj">
                      Cores
                    </div>
                    <div className="text-sm text-white" data-oid=":..tc:m">
                      {systemHealth.cpu.cores}
                    </div>
                  </div>
                  <div
                    className="bg-space-900/50 p-2 rounded-lg"
                    data-oid="9qbyjrp"
                  >
                    <div className="text-xs text-gray-400" data-oid="_lip.b7">
                      Temperature
                    </div>
                    <div className="text-sm text-white" data-oid="3t67s1g">
                      {systemHealth.cpu.temperature}°C
                    </div>
                  </div>
                </div>
              </div>
            </GlassCard>

            {/* Memory Card */}
            <GlassCard className="p-4" data-oid="qz:vsbf">
              <div className="flex items-center mb-4" data-oid="t5a:ws1">
                <HardDrive
                  className="h-5 w-5 text-electric mr-2"
                  data-oid="j.pmis."
                />

                <h4 className="text-md font-bold text-white" data-oid="fxeaow4">
                  Memory
                </h4>
              </div>

              <div className="space-y-4" data-oid="zdof3ou">
                <div data-oid="8:7-f0n">
                  <div
                    className="flex justify-between text-sm mb-1"
                    data-oid="iq_tn._"
                  >
                    <span className="text-gray-400" data-oid="5kcd4i-">
                      Usage
                    </span>
                    <span className="text-white" data-oid="0g578rt">
                      {systemHealth.memory.used} MB /{" "}
                      {systemHealth.memory.total} MB
                    </span>
                  </div>
                  <div
                    className="w-full h-2 bg-space-800 rounded-full"
                    data-oid="o-cikhu"
                  >
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-electric rounded-full"
                      style={{
                        width: `${(systemHealth.memory.used / systemHealth.memory.total) * 100}%`,
                      }}
                      data-oid="s:duoiv"
                    ></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2" data-oid="cuz30.w">
                  <div
                    className="bg-space-900/50 p-2 rounded-lg"
                    data-oid="qhzaifi"
                  >
                    <div className="text-xs text-gray-400" data-oid="4v8tyu:">
                      Used
                    </div>
                    <div className="text-sm text-white" data-oid="h503:rr">
                      {(systemHealth.memory.used / 1024).toFixed(1)} GB
                    </div>
                  </div>
                  <div
                    className="bg-space-900/50 p-2 rounded-lg"
                    data-oid=".gufdll"
                  >
                    <div className="text-xs text-gray-400" data-oid="-8te_b7">
                      Free
                    </div>
                    <div className="text-sm text-white" data-oid="zf0kx1p">
                      {(systemHealth.memory.free / 1024).toFixed(1)} GB
                    </div>
                  </div>
                </div>
              </div>
            </GlassCard>

            {/* Disk Card */}
            <GlassCard className="p-4" data-oid="1i8:m.0">
              <div className="flex items-center mb-4" data-oid="p0x4u87">
                <Database
                  className="h-5 w-5 text-teal mr-2"
                  data-oid="2x-m-hs"
                />

                <h4 className="text-md font-bold text-white" data-oid="pdlj0rp">
                  Disk
                </h4>
              </div>

              <div className="space-y-4" data-oid="s9j6ut6">
                <div data-oid="a_j1g9u">
                  <div
                    className="flex justify-between text-sm mb-1"
                    data-oid="uxy090x"
                  >
                    <span className="text-gray-400" data-oid="ttode1f">
                      Usage
                    </span>
                    <span className="text-white" data-oid="4ff9.d_">
                      {systemHealth.disk.used} GB / {systemHealth.disk.total} GB
                    </span>
                  </div>
                  <div
                    className="w-full h-2 bg-space-800 rounded-full"
                    data-oid=".mpljst"
                  >
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-teal-500 rounded-full"
                      style={{
                        width: `${(systemHealth.disk.used / systemHealth.disk.total) * 100}%`,
                      }}
                      data-oid="bqo:iwf"
                    ></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2" data-oid="y-0ugwi">
                  <div
                    className="bg-space-900/50 p-2 rounded-lg"
                    data-oid="zzia4.1"
                  >
                    <div className="text-xs text-gray-400" data-oid="tuzm_hc">
                      Used
                    </div>
                    <div className="text-sm text-white" data-oid="l77ri10">
                      {systemHealth.disk.used} GB
                    </div>
                  </div>
                  <div
                    className="bg-space-900/50 p-2 rounded-lg"
                    data-oid="uf22ph0"
                  >
                    <div className="text-xs text-gray-400" data-oid="v2:5nae">
                      Free
                    </div>
                    <div className="text-sm text-white" data-oid="bj-cxu.">
                      {systemHealth.disk.free} GB
                    </div>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* System Status */}
          <GlassCard className="p-4" data-oid="r7k1iqp">
            <div className="flex items-center mb-4" data-oid="hqgq3cy">
              <Server className="h-5 w-5 text-cyan mr-2" data-oid="7u-ee53" />
              <h4 className="text-md font-bold text-white" data-oid="hl_352e">
                System Status
              </h4>
            </div>

            <div className="space-y-4" data-oid="qc-rclw">
              <div
                className="bg-space-900/50 p-3 rounded-lg flex items-center"
                data-oid="ixp63zj"
              >
                <Power className="h-5 w-5 text-teal mr-3" data-oid="me-50_o" />
                <div data-oid="nhmv0l2">
                  <div className="text-sm text-white" data-oid="921unj1">
                    System Uptime
                  </div>
                  <div className="text-xs text-gray-400" data-oid="5_6anlh">
                    {systemHealth.uptime}
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto" data-oid=".3r070q">
                <table className="w-full" data-oid="yewfgsv">
                  <thead className="text-gray-400 text-sm" data-oid="0p38xw3">
                    <tr data-oid="x2.bdg6">
                      <th className="text-left pb-2" data-oid="ey3ogqg">
                        Service
                      </th>
                      <th className="text-left pb-2" data-oid="14:ui35">
                        Status
                      </th>
                      <th className="text-left pb-2" data-oid="214t6pc">
                        Uptime
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-white" data-oid="i1-9m__">
                    {systemHealth.servicesStatus.map((service, idx) => (
                      <tr
                        key={idx}
                        className="border-t border-gray-800"
                        data-oid="qrf3ac9"
                      >
                        <td className="py-2" data-oid="t40u76l">
                          {service.name}
                        </td>
                        <td className="py-2" data-oid="8.m6xk1">
                          <Badge
                            className="bg-green-900 text-green-300"
                            data-oid="j1vfai_"
                          >
                            {service.status}
                          </Badge>
                        </td>
                        <td className="py-2" data-oid="mcl6_rf">
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
        <TabsContent value="logs" className="space-y-4" data-oid="o.r2njs">
          <GlassCard className="p-4" data-oid="y5k.lt2">
            <div
              className="flex flex-col md:flex-row gap-4 mb-4"
              data-oid="p4zdp6w"
            >
              <div className="relative flex-grow" data-oid="dass4i3">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"
                  data-oid="t3e.xoc"
                />

                <Input
                  placeholder="Search logs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-space-900 border-gray-700 text-white"
                  data-oid="r6yd0yy"
                />
              </div>

              <div
                className="flex items-center bg-space-900 rounded-md border border-gray-700 px-3 py-1"
                data-oid="sik70eb"
              >
                <select
                  value={logLevel}
                  onChange={(e) => setLogLevel(e.target.value)}
                  className="bg-transparent text-white text-sm focus:outline-none"
                  data-oid="f:vw_ah"
                >
                  <option value="all" data-oid="5hgrg2h">
                    All Levels
                  </option>
                  <option value="info" data-oid="lh3g9br">
                    Info
                  </option>
                  <option value="warning" data-oid="x9uk-1h">
                    Warning
                  </option>
                  <option value="error" data-oid="oeyrbai">
                    Error
                  </option>
                </select>
              </div>

              <Button
                className="bg-space-900 hover:bg-space-800 text-gray-300"
                data-oid="g6n4nbj"
              >
                <Download className="h-4 w-4 mr-2" data-oid="9kh38_-" />
                Export Logs
              </Button>
            </div>

            <div className="overflow-x-auto" data-oid="6_63w2g">
              <table className="w-full" data-oid="462dlwq">
                <thead className="text-gray-400 text-sm" data-oid="v4nfgtq">
                  <tr className="border-b border-gray-800" data-oid="5obfnzr">
                    <th className="text-left pb-2 pl-2" data-oid="wg0o3dd">
                      Level
                    </th>
                    <th className="text-left pb-2" data-oid="la70t.i">
                      Message
                    </th>
                    <th className="text-left pb-2" data-oid="4xf7sy:">
                      Service
                    </th>
                    <th className="text-left pb-2" data-oid="rxe.-4m">
                      Timestamp
                    </th>
                    <th className="text-right pb-2 pr-2" data-oid="pykf9bu">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="text-white" data-oid="xt6oex9">
                  {filteredLogs.map((log) => (
                    <tr
                      key={log.id}
                      className="border-b border-gray-800 hover:bg-space-900/50"
                      data-oid="482vd_h"
                    >
                      <td className="py-3 pl-2" data-oid=".tme1g-">
                        {log.level === "error" && (
                          <Badge
                            className="bg-red-900 text-red-300"
                            data-oid="kyq.rrj"
                          >
                            Error
                          </Badge>
                        )}
                        {log.level === "warning" && (
                          <Badge
                            className="bg-yellow-900 text-yellow-300"
                            data-oid="1rpb4mk"
                          >
                            Warning
                          </Badge>
                        )}
                        {log.level === "info" && (
                          <Badge
                            className="bg-blue-900 text-blue-300"
                            data-oid="2wfqgf8"
                          >
                            Info
                          </Badge>
                        )}
                      </td>
                      <td className="py-3" data-oid="53nt0h3">
                        {log.message}
                      </td>
                      <td className="py-3" data-oid="s-icoik">
                        {log.service}
                      </td>
                      <td
                        className="py-3 text-sm text-gray-400"
                        data-oid="nqdqlm2"
                      >
                        {formatDate(log.timestamp)}
                      </td>
                      <td className="py-3 pr-2 text-right" data-oid="jq:a5t:">
                        <button
                          className="p-1 text-gray-400 hover:text-cyan"
                          data-oid=".ak18iw"
                        >
                          <Eye className="h-4 w-4" data-oid="3mz7u4a" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredLogs.length === 0 && (
              <div className="p-8 text-center text-gray-400" data-oid="y7m8dxr">
                No logs found matching your search criteria.
              </div>
            )}
          </GlassCard>
        </TabsContent>

        {/* System Settings Tab */}
        <TabsContent value="settings" className="space-y-4" data-oid="sct8w6h">
          {systemSettings.map((group) => (
            <GlassCard key={group.id} className="p-4" data-oid="3bdw92k">
              <div className="flex items-center mb-4" data-oid=":xe65:z">
                <Settings
                  className="h-5 w-5 text-cyan mr-2"
                  data-oid="87e52nx"
                />

                <h4 className="text-md font-bold text-white" data-oid="xm:c3wa">
                  {group.name}
                </h4>
              </div>

              <div className="space-y-2" data-oid="eyzul-d">
                {group.settings.map((setting, idx) => (
                  <div
                    key={idx}
                    className="grid grid-cols-12 gap-4 p-2 border-b border-gray-800"
                    data-oid="y69k7sn"
                  >
                    <div
                      className="col-span-4 text-sm text-white"
                      data-oid="zb4frmr"
                    >
                      {setting.key}
                    </div>
                    <div className="col-span-6" data-oid="1wo1qy3">
                      <Input
                        className="bg-space-900 border-gray-700 text-white"
                        defaultValue={setting.value}
                        data-oid="6_ozojb"
                      />
                    </div>
                    <div
                      className="col-span-2 flex justify-end"
                      data-oid="3lkcslk"
                    >
                      <Button
                        className="mr-1 bg-space-900 hover:bg-space-800 text-gray-300"
                        size="sm"
                        data-oid="tt::4.-"
                      >
                        <RefreshCw className="h-3 w-3" data-oid="fvtvlii" />
                      </Button>
                      <Button
                        className="bg-purple-900 text-cyan hover:bg-purple-800"
                        size="sm"
                        data-oid="how_ljx"
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
        <TabsContent value="backup" className="space-y-4" data-oid="-.174u3">
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
            data-oid="clja1iw"
          >
            <GlassCard className="p-4" data-oid="_fxu612">
              <div className="flex items-center mb-4" data-oid="kkcmg8e">
                <Database
                  className="h-5 w-5 text-electric mr-2"
                  data-oid="gqxranh"
                />

                <h4 className="text-md font-bold text-white" data-oid=":av_z0.">
                  Database Backup
                </h4>
              </div>

              <div className="space-y-4" data-oid="5w:amwn">
                <div
                  className="bg-space-900/50 p-3 rounded-lg"
                  data-oid="ic-k2yb"
                >
                  <div
                    className="flex items-center justify-between mb-2"
                    data-oid="wesi8e6"
                  >
                    <div className="text-sm text-gray-400" data-oid="15krgku">
                      Last Backup
                    </div>
                    <div className="text-sm text-white" data-oid="k47x1yb">
                      {systemHealth.lastBackup}
                    </div>
                  </div>
                  <div
                    className="flex items-center justify-between"
                    data-oid="1aoja-7"
                  >
                    <div className="text-sm text-gray-400" data-oid="dzyjqq-">
                      Next Scheduled Backup
                    </div>
                    <div className="text-sm text-white" data-oid="iq81.fb">
                      {systemHealth.nextScheduledBackup}
                    </div>
                  </div>
                </div>

                <Button
                  className="w-full bg-purple-900 text-cyan hover:bg-purple-800"
                  data-oid="xm7frea"
                >
                  <Database className="h-4 w-4 mr-2" data-oid="-hny4m5" />
                  Trigger Manual Backup
                </Button>
              </div>
            </GlassCard>

            <GlassCard className="p-4" data-oid="63a4-xv">
              <div className="flex items-center mb-4" data-oid="rnjuz0u">
                <ArrowDown
                  className="h-5 w-5 text-teal mr-2"
                  data-oid="1d92ib3"
                />

                <h4 className="text-md font-bold text-white" data-oid="-:-.3k3">
                  Restore Database
                </h4>
              </div>

              <div className="space-y-4" data-oid="hcg:yk9">
                <div
                  className="bg-red-900/20 p-3 rounded-lg border border-red-800"
                  data-oid="kj2oyu4"
                >
                  <div className="flex items-start" data-oid="3a9l-zh">
                    <AlertCircle
                      className="h-5 w-5 text-red-400 mr-2 mt-0.5"
                      data-oid="f3ds8ne"
                    />

                    <div data-oid="k6maww:">
                      <div
                        className="text-sm font-medium text-white mb-1"
                        data-oid="z-:1h6p"
                      >
                        Warning
                      </div>
                      <div className="text-xs text-gray-300" data-oid="m873pg.">
                        Restoring a database backup will replace all current
                        data. This action cannot be undone.
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2" data-oid="-etd0eg">
                  <label className="text-sm text-gray-400" data-oid="6vp2.uk">
                    Select Backup
                  </label>
                  <select
                    className="w-full bg-space-900 border border-gray-700 rounded p-2 text-white"
                    data-oid="cieauvc"
                  >
                    <option value="latest" data-oid="7ksyyo3">
                      Latest Backup (2023-06-08 03:00 AM)
                    </option>
                    <option value="20230607" data-oid="2hrguze">
                      2023-06-07 03:00 AM
                    </option>
                    <option value="20230606" data-oid="wa3qwgz">
                      2023-06-06 03:00 AM
                    </option>
                    <option value="20230605" data-oid="bisismi">
                      2023-06-05 03:00 AM
                    </option>
                  </select>
                </div>

                <Button
                  className="w-full bg-red-900 hover:bg-red-800 text-gray-200"
                  variant="destructive"
                  data-oid="ii9bqc1"
                >
                  Restore Selected Backup
                </Button>
              </div>
            </GlassCard>
          </div>

          <GlassCard className="p-4" data-oid="-qgefaz">
            <div className="flex items-center mb-4" data-oid="_i8phgp">
              <FileText className="h-5 w-5 text-cyan mr-2" data-oid="bp:x_hg" />
              <h4 className="text-md font-bold text-white" data-oid=":7cb59g">
                Backup History
              </h4>
            </div>

            <div className="overflow-x-auto" data-oid="gjuuh.b">
              <table className="w-full" data-oid="0p4djn:">
                <thead className="text-gray-400 text-sm" data-oid="4ck6l12">
                  <tr className="border-b border-gray-800" data-oid="yuvfj4c">
                    <th className="text-left pb-2" data-oid="ey-s2l-">
                      Date & Time
                    </th>
                    <th className="text-left pb-2" data-oid="53cv2rq">
                      Size
                    </th>
                    <th className="text-left pb-2" data-oid="tdq_8-8">
                      Type
                    </th>
                    <th className="text-left pb-2" data-oid="wv-3zk8">
                      Status
                    </th>
                    <th className="text-right pb-2" data-oid="dkcaz2o">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="text-white" data-oid="r4yzwat">
                  <tr
                    className="border-b border-gray-800 hover:bg-space-900/50"
                    data-oid="h9spdtd"
                  >
                    <td className="py-3" data-oid="3xe_unw">
                      2023-06-08 03:00 AM
                    </td>
                    <td className="py-3" data-oid="ib0ieyb">
                      245 MB
                    </td>
                    <td className="py-3" data-oid="y43y-_i">
                      Scheduled
                    </td>
                    <td className="py-3" data-oid="0c6y:8g">
                      <Badge
                        className="bg-green-900 text-green-300"
                        data-oid="ycgg8s-"
                      >
                        Completed
                      </Badge>
                    </td>
                    <td className="py-3 text-right" data-oid="qfdd:d0">
                      <Button
                        size="sm"
                        className="mr-1 bg-space-900 hover:bg-space-800 text-gray-300"
                        data-oid="u43o8yn"
                      >
                        <Download className="h-3 w-3" data-oid="_usf1nb" />
                      </Button>
                      <Button
                        size="sm"
                        className="bg-red-900/50 hover:bg-red-900 text-red-200"
                        data-oid="f6pym3i"
                      >
                        <Trash2 className="h-3 w-3" data-oid="9jch2q0" />
                      </Button>
                    </td>
                  </tr>
                  <tr
                    className="border-b border-gray-800 hover:bg-space-900/50"
                    data-oid="-yxpkmh"
                  >
                    <td className="py-3" data-oid="79qspd2">
                      2023-06-07 03:00 AM
                    </td>
                    <td className="py-3" data-oid="0qtytpm">
                      242 MB
                    </td>
                    <td className="py-3" data-oid="lba0:n.">
                      Scheduled
                    </td>
                    <td className="py-3" data-oid="ny588tb">
                      <Badge
                        className="bg-green-900 text-green-300"
                        data-oid="_rp8jtm"
                      >
                        Completed
                      </Badge>
                    </td>
                    <td className="py-3 text-right" data-oid="qaho82s">
                      <Button
                        size="sm"
                        className="mr-1 bg-space-900 hover:bg-space-800 text-gray-300"
                        data-oid="6cw1s08"
                      >
                        <Download className="h-3 w-3" data-oid="_w0azuf" />
                      </Button>
                      <Button
                        size="sm"
                        className="bg-red-900/50 hover:bg-red-900 text-red-200"
                        data-oid="khlamwp"
                      >
                        <Trash2 className="h-3 w-3" data-oid="ks0ewth" />
                      </Button>
                    </td>
                  </tr>
                  <tr
                    className="border-b border-gray-800 hover:bg-space-900/50"
                    data-oid="g8xrniu"
                  >
                    <td className="py-3" data-oid="1u7jwi9">
                      2023-06-06 03:00 AM
                    </td>
                    <td className="py-3" data-oid="v9.3egf">
                      240 MB
                    </td>
                    <td className="py-3" data-oid="_alr8fd">
                      Scheduled
                    </td>
                    <td className="py-3" data-oid="35j1uvi">
                      <Badge
                        className="bg-green-900 text-green-300"
                        data-oid="fqhsv.9"
                      >
                        Completed
                      </Badge>
                    </td>
                    <td className="py-3 text-right" data-oid="lr0agrw">
                      <Button
                        size="sm"
                        className="mr-1 bg-space-900 hover:bg-space-800 text-gray-300"
                        data-oid=".8tkqcd"
                      >
                        <Download className="h-3 w-3" data-oid="9f148y7" />
                      </Button>
                      <Button
                        size="sm"
                        className="bg-red-900/50 hover:bg-red-900 text-red-200"
                        data-oid="_q:t1b_"
                      >
                        <Trash2 className="h-3 w-3" data-oid="dqjmhff" />
                      </Button>
                    </td>
                  </tr>
                  <tr className="hover:bg-space-900/50" data-oid="0oqc66:">
                    <td className="py-3" data-oid="ksp9t2b">
                      2023-06-05 15:42 PM
                    </td>
                    <td className="py-3" data-oid="ii._e74">
                      239 MB
                    </td>
                    <td className="py-3" data-oid="lelga_x">
                      Manual
                    </td>
                    <td className="py-3" data-oid="3u0myae">
                      <Badge
                        className="bg-green-900 text-green-300"
                        data-oid="uwtz-4l"
                      >
                        Completed
                      </Badge>
                    </td>
                    <td className="py-3 text-right" data-oid="89iuwws">
                      <Button
                        size="sm"
                        className="mr-1 bg-space-900 hover:bg-space-800 text-gray-300"
                        data-oid="levhc9u"
                      >
                        <Download className="h-3 w-3" data-oid="e0vxrci" />
                      </Button>
                      <Button
                        size="sm"
                        className="bg-red-900/50 hover:bg-red-900 text-red-200"
                        data-oid="89nq8g3"
                      >
                        <Trash2 className="h-3 w-3" data-oid="6ejx0do" />
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </GlassCard>

          <GlassCard className="p-4" data-oid="40u05ig">
            <div className="flex items-center mb-4" data-oid="pjj:_5d">
              <Calendar className="h-5 w-5 text-cyan mr-2" data-oid="dlabn7d" />
              <h4 className="text-md font-bold text-white" data-oid="opvl_hb">
                Backup Schedule
              </h4>
            </div>

            <div className="space-y-4" data-oid="9zzsh2q">
              <div
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
                data-oid="8czl_ft"
              >
                <div className="space-y-2" data-oid="jjptm.k">
                  <label className="text-sm text-gray-400" data-oid="bfb600y">
                    Backup Frequency
                  </label>
                  <select
                    className="w-full bg-space-900 border border-gray-700 rounded p-2 text-white"
                    data-oid="edlutub"
                  >
                    <option value="daily" data-oid="z1bxaz8">
                      Daily
                    </option>
                    <option value="weekly" data-oid="kvvxe98">
                      Weekly
                    </option>
                    <option value="monthly" data-oid="z1-3:67">
                      Monthly
                    </option>
                  </select>
                </div>
                <div className="space-y-2" data-oid="l4y3ypd">
                  <label className="text-sm text-gray-400" data-oid="g4jlkol">
                    Backup Time
                  </label>
                  <Input
                    type="time"
                    className="bg-space-900 border-gray-700 text-white"
                    defaultValue="03:00"
                    data-oid="hkdq.ro"
                  />
                </div>
              </div>

              <div className="space-y-2" data-oid=":2_muhs">
                <label className="text-sm text-gray-400" data-oid="7l_3xhd">
                  Retention Policy
                </label>
                <select
                  className="w-full bg-space-900 border border-gray-700 rounded p-2 text-white"
                  data-oid="4fdis1v"
                >
                  <option value="7" data-oid="5fn:2xg">
                    Keep last 7 days
                  </option>
                  <option value="14" data-oid="wa1ojti">
                    Keep last 14 days
                  </option>
                  <option value="30" data-oid="ui5vaym">
                    Keep last 30 days
                  </option>
                  <option value="90" data-oid="2:m95u7">
                    Keep last 90 days
                  </option>
                </select>
              </div>

              <Button
                className="w-full bg-purple-900 text-cyan hover:bg-purple-800"
                data-oid="cfdl8ke"
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
