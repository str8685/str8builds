import { FC, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const ApiTest: FC = () => {
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading",
  );
  const [message, setMessage] = useState("");
  const [diagnostics, setDiagnostics] = useState<Record<string, any>>({});

  const runApiTest = async () => {
    setStatus("loading");
    setMessage("");

    try {
      // Test the API connection
      const response = await fetch("http://localhost:8081/api/test", {
        credentials: "include",
        headers: {
          Accept: "application/json",
        },
      });

      const data = await response.json();

      // Collect diagnostic information
      const headerObj: Record<string, string> = {};
      response.headers.forEach((value, key) => {
        headerObj[key] = value;
      });

      setDiagnostics({
        status: response.status,
        statusText: response.statusText,
        headers: headerObj,
        data,
      });

      setStatus("success");
      setMessage(data.message || "Connection successful");
    } catch (error) {
      console.error("API test failed:", error);
      setStatus("error");
      setMessage(
        `Error: ${error instanceof Error ? error.message : "Unknown error"}`,
      );

      // Collect error diagnostics
      setDiagnostics({
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
      });
    }
  };

  useEffect(() => {
    runApiTest();
  }, []);

  return (
    <div
      className="p-4 rounded-lg bg-space-900/40 border border-space-700/50 shadow-inner"
      data-oid="k37iab2"
    >
      <div
        className="flex justify-between items-center mb-4"
        data-oid="6zqz23-"
      >
        <h3
          className="text-lg font-medium bg-gradient-to-r from-white via-cyan/80 to-electric bg-clip-text text-transparent group-hover:from-cyan group-hover:to-white"
          data-oid="ycijh4l"
        >
          API Connection Test
        </h3>
        <Button
          variant="outline"
          size="sm"
          onClick={runApiTest}
          className="bg-space-800 hover:bg-space-700 text-cyan hover:text-white border-space-700 hover:border-cyan/50 transition-all duration-300 shadow-glow-sm hover:shadow-glow-cyan"
          data-oid="up4.os6"
        >
          <i className="fas fa-sync-alt mr-2" data-oid="q2wij5."></i> Test Again
        </Button>
      </div>

      {status === "loading" && (
        <div className="flex items-center text-cyan" data-oid="1.-396o">
          <div
            className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-cyan mr-2"
            data-oid=".c-.ayf"
          ></div>
          Testing API connection to http://localhost:8081/api/test...
        </div>
      )}

      {status === "success" && (
        <div className="space-y-3" data-oid="-7ybaba">
          <div
            className="text-green-400 flex items-center text-lg"
            data-oid="e8g8yj2"
          >
            <i className="fas fa-check-circle mr-2" data-oid="oi4d.06"></i>
            {message}
          </div>
          <div className="text-sm text-gray-300" data-oid="k_rc7bx">
            Server responded with status:{" "}
            <span className="text-cyan" data-oid="8faax5.">
              {diagnostics.status} {diagnostics.statusText}
            </span>
          </div>
        </div>
      )}

      {status === "error" && (
        <div className="space-y-4" data-oid="zjvbxa8">
          <div
            className="text-red-400 flex items-center text-lg"
            data-oid="uzrrhi4"
          >
            <i
              className="fas fa-exclamation-circle mr-2"
              data-oid="xfa952y"
            ></i>
            {message}
          </div>

          <div
            className="bg-space-800/70 p-3 rounded border border-red-500/30 text-sm"
            data-oid="7cp9r46"
          >
            <h4 className="font-medium text-red-300 mb-2" data-oid="qzpmij_">
              Troubleshooting Steps:
            </h4>
            <ol
              className="list-decimal list-inside space-y-2 text-gray-300"
              data-oid="0tznpeb"
            >
              <li data-oid="79.i7o7">
                Ensure the server is running on port 8081
              </li>
              <li data-oid="6cj5g35">
                Check if there are CORS restrictions in place
              </li>
              <li data-oid="cypwfdn">
                Verify network connectivity between client and server
              </li>
              <li data-oid="kes6d3f">
                Inspect browser console for additional error details
              </li>
              <li data-oid="_4nthfs">
                Try running{" "}
                <code className="bg-space-700 px-1 rounded" data-oid="84q6q-d">
                  curl http://localhost:8081/api/test
                </code>{" "}
                in terminal
              </li>
            </ol>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApiTest;
