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
      data-oid="fq1:hxz"
    >
      {/* Header with tabs */}
      <div
        className="flex justify-between items-center px-5 py-4 border-b border-teal/20"
        data-oid="jeibrij"
      >
        <div className="flex items-center space-x-1.5" data-oid="z64q-bk">
          <h3 className="text-lg font-space text-teal mr-2" data-oid="0p718wk">
            Job Insights
          </h3>
          <div
            className="flex bg-space-900/70 rounded-lg p-0.5"
            data-oid="a_t585_"
          >
            <button
              className={`px-3 py-1 text-xs rounded-md transition-all duration-200 ${activeTab === "analytics" ? "bg-teal/30 text-white shadow-inner" : "text-gray-300 hover:text-white"}`}
              onClick={() => setActiveTab("analytics")}
              data-oid="96r3_w_"
            >
              <i className="fas fa-chart-bar mr-1.5" data-oid="_bp7ugy"></i>
              Analytics
            </button>
            <button
              className={`px-3 py-1 text-xs rounded-md transition-all duration-200 ${activeTab === "tasks" ? "bg-teal/30 text-white shadow-inner" : "text-gray-300 hover:text-white"}`}
              onClick={() => setActiveTab("tasks")}
              data-oid="1ljqj5x"
            >
              <i className="fas fa-tasks mr-1.5" data-oid="v4e02i0"></i>Tasks
            </button>
            <button
              className={`px-3 py-1 text-xs rounded-md transition-all duration-200 ${activeTab === "recommendations" ? "bg-teal/30 text-white shadow-inner" : "text-gray-300 hover:text-white"}`}
              onClick={() => setActiveTab("recommendations")}
              data-oid="07ykn_4"
            >
              <i className="fas fa-magic mr-1.5" data-oid="t8ot7hk"></i>Insights
            </button>
          </div>
        </div>
        <div data-oid="2ii30rw">
          <button
            className="text-teal hover:text-cyan transition-colors"
            data-oid="gwj-4-3"
          >
            <i className="fas fa-expand-alt" data-oid="p0scliy"></i>
          </button>
        </div>
      </div>

      {/* Content area */}
      <div className="p-5" data-oid="_qpgdd0">
        {activeTab === "analytics" && (
          <div data-oid="0g_or0p">
            {/* Key metrics */}
            <div
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5"
              data-oid="64__b2t"
            >
              {metrics.map((metric, index) => (
                <div
                  key={index}
                  className="bg-space-900/40 rounded-lg p-3 backdrop-blur-sm"
                  data-oid="lkibzqx"
                >
                  <div
                    className="flex items-center space-x-3"
                    data-oid="tvp20tj"
                  >
                    <div
                      className={`${metric.color} bg-space-800 h-10 w-10 rounded-full flex items-center justify-center`}
                      data-oid="-gl:czt"
                    >
                      <i
                        className={`fas ${metric.icon}`}
                        data-oid="4s:w1sh"
                      ></i>
                    </div>
                    <div data-oid="ugi0yj0">
                      <div className="text-sm text-gray-400" data-oid="6ashkgs">
                        {metric.title}
                      </div>
                      <div
                        className="text-white font-medium text-lg"
                        data-oid="gt23eyw"
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
              data-oid="axnek97"
            >
              <h4
                className="text-sm font-medium text-white mb-2"
                data-oid="8rkl8gs"
              >
                Time Tracking
              </h4>
              <div className="h-48 overflow-hidden" data-oid="g1f6:_8">
                <Bar
                  data={chartData}
                  options={chartOptions}
                  data-oid="05w3qp5"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === "tasks" && (
          <div
            className="bg-space-900/40 rounded-lg p-4 backdrop-blur-sm"
            data-oid="yi2tn80"
          >
            <div
              className="flex justify-between items-center mb-3"
              data-oid="wveya:t"
            >
              <h4 className="text-sm font-medium text-white" data-oid="cgq.2o4">
                Project Tasks
              </h4>
              <div
                className="text-xs bg-teal/20 text-teal px-2 py-1 rounded-full"
                data-oid="bgnx.s9"
              >
                {tasks.filter((t) => t.complete).length}/{tasks.length} Complete
              </div>
            </div>

            <div className="space-y-2" data-oid="w-ih1rq">
              {tasks.map((task, index) => (
                <div
                  key={index}
                  className="flex items-center py-2 border-b border-space-700/30"
                  data-oid="tgfaq9d"
                >
                  <div
                    className={`h-5 w-5 rounded-full border ${task.complete ? "bg-teal border-teal" : "border-gray-500"} mr-3 flex items-center justify-center text-xs`}
                    data-oid="4de9p8p"
                  >
                    {task.complete && (
                      <i
                        className="fas fa-check text-black"
                        data-oid="jl1ey6s"
                      ></i>
                    )}
                  </div>
                  <span
                    className={`${task.complete ? "text-white line-through opacity-70" : "text-white"}`}
                    data-oid="u31n--4"
                  >
                    {task.name}
                  </span>
                  {!task.complete && (
                    <button
                      className="ml-auto text-teal hover:text-cyan-300 transition-colors"
                      data-oid="_p2mlql"
                    >
                      <i className="fas fa-play-circle" data-oid="r5nbv-k"></i>
                    </button>
                  )}
                </div>
              ))}
            </div>

            <button
              className="mt-4 bg-teal/20 hover:bg-teal/30 text-teal px-3 py-1.5 rounded-md text-sm transition-colors w-full"
              data-oid="n8-yj_4"
            >
              <i className="fas fa-plus mr-1.5" data-oid="nbaa26r"></i>Add New
              Task
            </button>
          </div>
        )}

        {activeTab === "recommendations" && (
          <div data-oid="j0t3_sf">
            <div
              className="bg-space-900/40 rounded-lg p-4 backdrop-blur-sm mb-4"
              data-oid="f5y8ple"
            >
              <h4
                className="text-sm font-medium text-white mb-3"
                data-oid="syve-nh"
              >
                AI Recommendations
              </h4>

              <div className="space-y-3" data-oid="cy7q3bp">
                {recommendations.map((rec, index) => (
                  <div
                    key={index}
                    className="flex space-x-3 items-start p-3 bg-space-800/50 rounded-lg border-l-2 border-teal/50"
                    data-oid="6bc4dmc"
                  >
                    <div className={`${rec.color} mt-0.5`} data-oid="9ms0c5n">
                      <i
                        className={`fas ${rec.icon} text-lg`}
                        data-oid=".b9casf"
                      ></i>
                    </div>
                    <p className="text-white text-sm" data-oid="r8jzv0b">
                      {rec.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="bg-space-900/40 rounded-lg p-4 backdrop-blur-sm"
              data-oid="..7qfec"
            >
              <h4
                className="text-sm font-medium text-white mb-3"
                data-oid="o8_4k33"
              >
                Job Performance
              </h4>

              <div className="relative pt-1" data-oid="zm73kgl">
                <div
                  className="flex items-center justify-between mb-2"
                  data-oid="1pqwzb7"
                >
                  <div data-oid="241om55">
                    <span
                      className="text-xs font-medium text-gray-400"
                      data-oid="co.h02b"
                    >
                      Overall Completion
                    </span>
                  </div>
                  <div className="text-right" data-oid="f_5st5h">
                    <span
                      className="text-xs font-medium text-teal"
                      data-oid=":3ukzku"
                    >
                      48%
                    </span>
                  </div>
                </div>
                <div
                  className="overflow-hidden h-2 text-xs flex rounded-full bg-space-800"
                  data-oid="de_4991"
                >
                  <div
                    style={{ width: "48%" }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-teal/80 to-teal"
                    data-oid="4:2zkou"
                  ></div>
                </div>

                <div
                  className="flex items-center justify-between mt-4 mb-2"
                  data-oid="n3nljy4"
                >
                  <div data-oid="7n4x016">
                    <span
                      className="text-xs font-medium text-gray-400"
                      data-oid="b6kn0be"
                    >
                      Budget Used
                    </span>
                  </div>
                  <div className="text-right" data-oid="0q7bj.4">
                    <span
                      className="text-xs font-medium text-blue-400"
                      data-oid="0rjqd1l"
                    >
                      32%
                    </span>
                  </div>
                </div>
                <div
                  className="overflow-hidden h-2 text-xs flex rounded-full bg-space-800"
                  data-oid="qteh.7a"
                >
                  <div
                    style={{ width: "32%" }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-blue-500/80 to-blue-400"
                    data-oid="2e9a0-."
                  ></div>
                </div>
              </div>

              <div className="mt-6 flex justify-between" data-oid="ckm:wj9">
                <div className="text-center" data-oid="ytcew97">
                  <div
                    className="text-xs text-gray-400 mb-1"
                    data-oid="64g21pk"
                  >
                    ESTIMATED
                  </div>
                  <div
                    className="text-lg font-medium text-white"
                    data-oid="40ukewy"
                  >
                    $5,280
                  </div>
                  <div className="text-xs text-gray-400" data-oid="s6rvbei">
                    TOTAL
                  </div>
                </div>
                <div className="text-center" data-oid="265.r63">
                  <div
                    className="text-xs text-gray-400 mb-1"
                    data-oid="30exwxc"
                  >
                    ACTUAL
                  </div>
                  <div
                    className="text-lg font-medium text-white"
                    data-oid="g21n4pn"
                  >
                    $1,692
                  </div>
                  <div className="text-xs text-teal" data-oid="ljv8jfe">
                    UNDER BUDGET
                  </div>
                </div>
                <div className="text-center" data-oid="a0i_hx.">
                  <div
                    className="text-xs text-gray-400 mb-1"
                    data-oid="7:2auou"
                  >
                    ESTIMATED
                  </div>
                  <div
                    className="text-lg font-medium text-white"
                    data-oid="jt2jk6i"
                  >
                    May 30
                  </div>
                  <div className="text-xs text-teal" data-oid="mqnsqr3">
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
        data-oid="_mandx3"
      >
        <div className="text-xs text-gray-400" data-oid="o8rq9-8">
          <span className="text-teal mr-1" data-oid="06hzc.8">
            <i className="fas fa-sync-alt fa-spin-pulse" data-oid="itj2k0w"></i>
          </span>
          Updated just now
        </div>
        <div data-oid="so6fqg3">
          <button
            className="bg-teal/20 hover:bg-teal/30 text-teal px-3 py-1 rounded-md text-xs transition-colors"
            data-oid="lm66u04"
          >
            <i className="fas fa-chart-line mr-1.5" data-oid="bjb6axz"></i>
            Detailed Report
          </button>
        </div>
      </div>
    </GlassCard>
  );
};

export default JobInsights;
