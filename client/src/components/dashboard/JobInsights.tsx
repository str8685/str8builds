import { FC, useState, useEffect } from "react";
import GlassCard from "@/components/ui/GlassCard";
import { useJobTimer } from "@/hooks/useJobTimer";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

interface JobMetric {
  title: string;
  value: string;
  icon: string;
  color: string;
}

const JobInsights: FC = () => {
  const { currentJob, hourlyRate, time } = useJobTimer();

  // Parse time string (e.g. "02:45:30") to minutes worked
  const timeToMinutes = (timeString: string): number => {
    const [hours, minutes] = timeString.split(":").map(Number);
    return hours * 60 + minutes;
  };

  const minutesWorked = timeToMinutes(time);

  // Job performance metrics
  const [metrics, setMetrics] = useState<JobMetric[]>([
    {
      title: "Productivity",
      value: "87%",
      icon: "fa-rocket",
      color: "text-blue-400",
    },
    {
      title: "Billable Rate",
      value: `$${hourlyRate.toFixed(2)}/hr`,
      icon: "fa-dollar-sign",
      color: "text-green-400",
    },
    {
      title: "Time Efficiency",
      value: "92%",
      icon: "fa-tachometer-alt",
      color: "text-purple-400",
    },
    {
      title: "Completion",
      value: "48%",
      icon: "fa-chart-pie",
      color: "text-yellow-400",
    },
  ]);

  // Update metrics when hourly rate changes
  useEffect(() => {
    setMetrics((prev) => {
      const updated = [...prev];
      updated[1].value = `$${hourlyRate.toFixed(2)}/hr`;
      return updated;
    });
  }, [hourlyRate]);

  // Mock data for previous days' time tracking
  const chartData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Today"],
    datasets: [
      {
        label: "Hours Worked",
        data: [3.5, 4.2, 2.8, 5.1, 3.7, minutesWorked / 60],
        backgroundColor: "rgba(0, 240, 200, 0.5)",
        borderColor: "rgba(0, 240, 200, 1)",
        borderWidth: 2,
        borderRadius: 6,
        hoverBackgroundColor: "rgba(0, 240, 200, 0.7)",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "rgba(12, 14, 26, 0.8)",
        titleColor: "#00f0c8",
        bodyColor: "#ffffff",
        borderColor: "rgba(0, 240, 200, 0.3)",
        borderWidth: 1,
        padding: 10,
        displayColors: false,
        callbacks: {
          label: function (context: any) {
            return `${context.parsed.y.toFixed(1)} hours`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(255, 255, 255, 0.05)",
        },
        ticks: {
          color: "rgba(255, 255, 255, 0.7)",
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "rgba(255, 255, 255, 0.7)",
        },
      },
    },
  };

  // Mock data for project tasks
  const tasks = [
    { name: "Foundation Work", complete: true },
    { name: "Plumbing Installation", complete: true },
    { name: "Electrical Wiring", complete: false },
    { name: "Interior Walls", complete: false },
    { name: "Final Inspection", complete: false },
  ];

  // Mock recommendation based on current progress
  const recommendations = [
    {
      text: "Work at this pace consistently to complete the project 2 days ahead of schedule",
      icon: "fa-bolt",
      color: "text-teal",
    },
    {
      text: "Consider allocating more time to electrical wiring as it may require additional attention",
      icon: "fa-lightbulb",
      color: "text-yellow-400",
    },
  ];

  const [activeTab, setActiveTab] = useState<
    "analytics" | "tasks" | "recommendations"
  >("analytics");

  return (
    <GlassCard
      className="rounded-xl overflow-hidden mb-6 p-0"
      variant="teal"
      glow={true}
      blur="lg"
      data-oid="jvebdkn"
    >
      {/* Header with tabs */}
      <div
        className="flex justify-between items-center px-5 py-4 border-b border-teal/20"
        data-oid="l3iptr9"
      >
        <div className="flex items-center space-x-1.5" data-oid="hyh2bl1">
          <h3 className="text-lg font-space text-teal mr-2" data-oid="6qysv.b">
            Job Insights
          </h3>
          <div
            className="flex bg-space-900/70 rounded-lg p-0.5"
            data-oid="w4hjphm"
          >
            <button
              className={`px-3 py-1 text-xs rounded-md transition-all duration-200 ${activeTab === "analytics" ? "bg-teal/30 text-white shadow-inner" : "text-gray-300 hover:text-white"}`}
              onClick={() => setActiveTab("analytics")}
              data-oid="hpq06:8"
            >
              <i className="fas fa-chart-bar mr-1.5" data-oid="zdppwm2"></i>
              Analytics
            </button>
            <button
              className={`px-3 py-1 text-xs rounded-md transition-all duration-200 ${activeTab === "tasks" ? "bg-teal/30 text-white shadow-inner" : "text-gray-300 hover:text-white"}`}
              onClick={() => setActiveTab("tasks")}
              data-oid="0-xgy6q"
            >
              <i className="fas fa-tasks mr-1.5" data-oid="f1q5wkc"></i>Tasks
            </button>
            <button
              className={`px-3 py-1 text-xs rounded-md transition-all duration-200 ${activeTab === "recommendations" ? "bg-teal/30 text-white shadow-inner" : "text-gray-300 hover:text-white"}`}
              onClick={() => setActiveTab("recommendations")}
              data-oid="xfwilse"
            >
              <i className="fas fa-magic mr-1.5" data-oid="srruxbp"></i>Insights
            </button>
          </div>
        </div>
        <div data-oid="cj4xexf">
          <button
            className="text-teal hover:text-cyan transition-colors"
            data-oid="qw:w:kx"
          >
            <i className="fas fa-expand-alt" data-oid="xr6:azo"></i>
          </button>
        </div>
      </div>

      {/* Content area */}
      <div className="p-5" data-oid=".wkdy4q">
        {activeTab === "analytics" && (
          <div data-oid="ysn8u_g">
            {/* Key metrics */}
            <div
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5"
              data-oid="_q.m1.8"
            >
              {metrics.map((metric, index) => (
                <div
                  key={index}
                  className="bg-space-900/40 rounded-lg p-3 backdrop-blur-sm"
                  data-oid="4g8dp7-"
                >
                  <div
                    className="flex items-center space-x-3"
                    data-oid="0m8ebka"
                  >
                    <div
                      className={`${metric.color} bg-space-800 h-10 w-10 rounded-full flex items-center justify-center`}
                      data-oid="tovk_xm"
                    >
                      <i
                        className={`fas ${metric.icon}`}
                        data-oid="wsrmmb4"
                      ></i>
                    </div>
                    <div data-oid="z7qk:mr">
                      <div className="text-sm text-gray-400" data-oid="9sm8otp">
                        {metric.title}
                      </div>
                      <div
                        className="text-white font-medium text-lg"
                        data-oid="9yc6fwq"
                      >
                        {metric.value}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Chart */}
            <div
              className="bg-space-900/40 rounded-lg p-4 backdrop-blur-sm"
              data-oid="wwwc545"
            >
              <h4
                className="text-sm font-medium text-white mb-2"
                data-oid=":fb7bqw"
              >
                Time Tracking
              </h4>
              <div className="h-48 overflow-hidden" data-oid="-2o2vtr">
                <Bar
                  data={chartData}
                  options={chartOptions}
                  data-oid="o2z9..k"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === "tasks" && (
          <div
            className="bg-space-900/40 rounded-lg p-4 backdrop-blur-sm"
            data-oid="bi5tnic"
          >
            <div
              className="flex justify-between items-center mb-3"
              data-oid="rtu1uru"
            >
              <h4 className="text-sm font-medium text-white" data-oid=":_dezsu">
                Project Tasks
              </h4>
              <div
                className="text-xs bg-teal/20 text-teal px-2 py-1 rounded-full"
                data-oid="0j.52lx"
              >
                {tasks.filter((t) => t.complete).length}/{tasks.length} Complete
              </div>
            </div>

            <div className="space-y-2" data-oid="qhml2bq">
              {tasks.map((task, index) => (
                <div
                  key={index}
                  className="flex items-center py-2 border-b border-space-700/30"
                  data-oid="lldbr:u"
                >
                  <div
                    className={`h-5 w-5 rounded-full border ${task.complete ? "bg-teal border-teal" : "border-gray-500"} mr-3 flex items-center justify-center text-xs`}
                    data-oid="mz:4lob"
                  >
                    {task.complete && (
                      <i
                        className="fas fa-check text-black"
                        data-oid="n3.i72_"
                      ></i>
                    )}
                  </div>
                  <span
                    className={`${task.complete ? "text-white line-through opacity-70" : "text-white"}`}
                    data-oid="8lbvl-k"
                  >
                    {task.name}
                  </span>
                  {!task.complete && (
                    <button
                      className="ml-auto text-teal hover:text-cyan-300 transition-colors"
                      data-oid="8qmayd9"
                    >
                      <i className="fas fa-play-circle" data-oid="koe92ir"></i>
                    </button>
                  )}
                </div>
              ))}
            </div>

            <button
              className="mt-4 bg-teal/20 hover:bg-teal/30 text-teal px-3 py-1.5 rounded-md text-sm transition-colors w-full"
              data-oid="9tyyv9x"
            >
              <i className="fas fa-plus mr-1.5" data-oid="1v_08ok"></i>Add New
              Task
            </button>
          </div>
        )}

        {activeTab === "recommendations" && (
          <div data-oid="hmcho3:">
            <div
              className="bg-space-900/40 rounded-lg p-4 backdrop-blur-sm mb-4"
              data-oid="xg7o134"
            >
              <h4
                className="text-sm font-medium text-white mb-3"
                data-oid=":zk04yf"
              >
                AI Recommendations
              </h4>

              <div className="space-y-3" data-oid="w6j2upo">
                {recommendations.map((rec, index) => (
                  <div
                    key={index}
                    className="flex space-x-3 items-start p-3 bg-space-800/50 rounded-lg border-l-2 border-teal/50"
                    data-oid="q0uuvz."
                  >
                    <div className={`${rec.color} mt-0.5`} data-oid="427yroq">
                      <i
                        className={`fas ${rec.icon} text-lg`}
                        data-oid="51xd7dk"
                      ></i>
                    </div>
                    <p className="text-white text-sm" data-oid="yd8s56v">
                      {rec.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="bg-space-900/40 rounded-lg p-4 backdrop-blur-sm"
              data-oid="tx2tuyv"
            >
              <h4
                className="text-sm font-medium text-white mb-3"
                data-oid="0x393g7"
              >
                Job Performance
              </h4>

              <div className="relative pt-1" data-oid="v2nwqzo">
                <div
                  className="flex items-center justify-between mb-2"
                  data-oid="jg:rnwe"
                >
                  <div data-oid="saqbh8c">
                    <span
                      className="text-xs font-medium text-gray-400"
                      data-oid="8804.5p"
                    >
                      Overall Completion
                    </span>
                  </div>
                  <div className="text-right" data-oid="yz4s0nh">
                    <span
                      className="text-xs font-medium text-teal"
                      data-oid="1gjue.z"
                    >
                      48%
                    </span>
                  </div>
                </div>
                <div
                  className="overflow-hidden h-2 text-xs flex rounded-full bg-space-800"
                  data-oid="geba7rk"
                >
                  <div
                    style={{ width: "48%" }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-teal/80 to-teal"
                    data-oid="7qx2k4m"
                  ></div>
                </div>

                <div
                  className="flex items-center justify-between mt-4 mb-2"
                  data-oid="gjaxe5g"
                >
                  <div data-oid="l33-qdo">
                    <span
                      className="text-xs font-medium text-gray-400"
                      data-oid="c2-g7-y"
                    >
                      Budget Used
                    </span>
                  </div>
                  <div className="text-right" data-oid="j1czxlw">
                    <span
                      className="text-xs font-medium text-blue-400"
                      data-oid="qoz_0qu"
                    >
                      32%
                    </span>
                  </div>
                </div>
                <div
                  className="overflow-hidden h-2 text-xs flex rounded-full bg-space-800"
                  data-oid="qprs065"
                >
                  <div
                    style={{ width: "32%" }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-blue-500/80 to-blue-400"
                    data-oid="4wps3kb"
                  ></div>
                </div>
              </div>

              <div className="mt-6 flex justify-between" data-oid="lmfgtx9">
                <div className="text-center" data-oid="879ngeo">
                  <div
                    className="text-xs text-gray-400 mb-1"
                    data-oid="-6s38x3"
                  >
                    ESTIMATED
                  </div>
                  <div
                    className="text-lg font-medium text-white"
                    data-oid="qygf2bn"
                  >
                    $5,280
                  </div>
                  <div className="text-xs text-gray-400" data-oid="t3wvd3e">
                    TOTAL
                  </div>
                </div>
                <div className="text-center" data-oid="hcyn-ht">
                  <div
                    className="text-xs text-gray-400 mb-1"
                    data-oid="tootp5b"
                  >
                    ACTUAL
                  </div>
                  <div
                    className="text-lg font-medium text-white"
                    data-oid="amqkoui"
                  >
                    $1,692
                  </div>
                  <div className="text-xs text-teal" data-oid="ahu1t3z">
                    UNDER BUDGET
                  </div>
                </div>
                <div className="text-center" data-oid="6u-6200">
                  <div
                    className="text-xs text-gray-400 mb-1"
                    data-oid="23j3fz6"
                  >
                    ESTIMATED
                  </div>
                  <div
                    className="text-lg font-medium text-white"
                    data-oid="31v0mh6"
                  >
                    May 30
                  </div>
                  <div className="text-xs text-teal" data-oid="5wd5mhr">
                    ON SCHEDULE
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div
        className="bg-space-900/60 p-3 border-t border-teal/10 flex justify-between items-center"
        data-oid="ozl:0bt"
      >
        <div className="text-xs text-gray-400" data-oid="9acp0h9">
          <span className="text-teal mr-1" data-oid="wt9w7fi">
            <i className="fas fa-sync-alt fa-spin-pulse" data-oid="cmbwfwk"></i>
          </span>
          Updated just now
        </div>
        <div data-oid="kua1fro">
          <button
            className="bg-teal/20 hover:bg-teal/30 text-teal px-3 py-1 rounded-md text-xs transition-colors"
            data-oid="32m.id3"
          >
            <i className="fas fa-chart-line mr-1.5" data-oid="dy.fa3h"></i>
            Detailed Report
          </button>
        </div>
      </div>
    </GlassCard>
  );
};

export default JobInsights;
