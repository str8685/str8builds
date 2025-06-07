import { FC, useState, useEffect } from "react";

const AISearchBar: FC = () => {
  const [query, setQuery] = useState<string>("");
  const [progress, setProgress] = useState<number>(0);

  // Simulate progress for the professional look
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 0.5;
        return newProgress > 100 ? 0 : newProgress;
      });
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = () => {
    console.log("AI search:", query);
    // Coming soon notification
    alert("AI Construction features are coming soon!");
  };

  const handleVoiceCommand = () => {
    console.log("Voice command activated");
    // Coming soon notification
    alert("AI Voice recognition is coming soon!");
  };

  return (
    <div className="container mx-auto px-4 py-4" data-oid="ywmgbuy">
      <div
        className="glass-card rounded-xl bg-gradient-to-r from-gray-900 via-blue-950 to-gray-900 shadow-lg p-2 flex items-center relative overflow-hidden"
        data-oid="7hl2cst"
      >
        {/* Progress bar */}
        <div
          className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300"
          style={{ width: `${progress}%` }}
          data-oid="u73dafy"
        />

        <div
          className="flex-shrink-0 w-8 h-8 flex items-center justify-center cursor-pointer text-cyan-400 hover:text-cyan-300 transition-colors"
          onClick={handleVoiceCommand}
          data-oid="xsn5-vs"
        >
          <span className="pulse-animation" data-oid="j.61x8c">
            <i className="fas fa-robot" data-oid=".fsw_9l"></i>
          </span>
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="AI Construction Coming Soon..."
          className="bg-transparent border-none w-full text-sm text-cyan-100 focus:outline-none focus:ring-0 placeholder:text-cyan-300/70"
          disabled
          data-oid="nc6mgl0"
        />

        <div
          className="flex-shrink-0 flex items-center space-x-2"
          data-oid="dn17an-"
        >
          <span
            className="text-xs text-cyan-400 hidden sm:inline-block"
            data-oid="czblc:d"
          >
            Development: 70%
          </span>
          <button
            className="text-cyan-400 hover:text-cyan-300 transition p-2"
            onClick={handleSearch}
            data-oid="n5-nfz5"
          >
            <i className="fas fa-rocket" data-oid="h3nh93a"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AISearchBar;
