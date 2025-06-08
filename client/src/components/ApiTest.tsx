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
      data-oid="ghfbf0x"
    >
      <div
        className="flex justify-between items-center mb-4"
        data-oid="6ndissn"
      >
        <h3
          className="text-lg font-medium bg-gradient-to-r from-white via-cyan/80 to-electric bg-clip-text text-transparent group-hover:from-cyan group-hover:to-white"
          data-oid=".it9jvw"
        >
          API Connection Test
        </h3>
        <Button
          variant="outline"
          size="sm"
          onClick={runApiTest}
          className="bg-space-800 hover:bg-space-700 text-cyan hover:text-white border-space-700 hover:border-cyan/50 transition-all duration-300 shadow-glow-sm hover:shadow-glow-cyan"
          data-oid="z:fn7:r"
        >
          <i className="fas fa-sync-alt mr-2" data-oid="a_5x:zk"></i> Test Again
        </Button>
      </div>

      {status === "loading" && (
        <div className="flex items-center text-cyan" data-oid="lx54eme">
          <div
            className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-cyan mr-2"
            data-oid="3ad1yo7"
          ></div>
          Testing API connection to http://localhost:8081/api/test...
        </div>
      )}

      {status === "success" && (
        <div className="space-y-3" data-oid="638644b">
          <div
            className="text-green-400 flex items-center text-lg"
            data-oid="4vlf134"
          >
            <i className="fas fa-check-circle mr-2" data-oid="qz0-bjn"></i>
            {message}
          </div>
          <div className="text-sm text-gray-300" data-oid="v_osg6h">
            Server responded with status:{" "}
            <span className="text-cyan" data-oid="3-_aznb">
              {diagnostics.status} {diagnostics.statusText}
            </span>
          </div>
        </div>
      )}

      {status === "error" && (
        <div className="space-y-4" data-oid="x-o6mxk">
          <div
            className="text-red-400 flex items-center text-lg"
            data-oid="n1n--6o"
          >
            <i
              className="fas fa-exclamation-circle mr-2"
              data-oid="yxmk714"
            ></i>
            {message}
          </div>

          <div
            className="bg-space-800/70 p-3 rounded border border-red-500/30 text-sm"
            data-oid="y9:0y7a"
          >
            <h4 className="font-medium text-red-300 mb-2" data-oid="encfa0.">
              Troubleshooting Steps:
            </h4>
            <ol
              className="list-decimal list-inside space-y-2 text-gray-300"
              data-oid="hy-dv8u"
            >
              <li data-oid="28mcgrw">
                Ensure the server is running on port 8081
              </li>
              <li data-oid="zlhoehg">
                Check if there are CORS restrictions in place
              </li>
              <li data-oid="-mai8r2">
                Verify network connectivity between client and server
              </li>
              <li data-oid="lh-b:1u">
                Inspect browser console for additional error details
              </li>
              <li data-oid="l.zqr_-">
                Try running{" "}
                <code className="bg-space-700 px-1 rounded" data-oid="70u1v4.">
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
