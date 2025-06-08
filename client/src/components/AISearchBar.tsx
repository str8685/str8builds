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
    <div className="container mx-auto px-4 py-4" data-oid="7emujy.">
      <div
        className="glass-card rounded-xl bg-gradient-to-r from-gray-900 via-blue-950 to-gray-900 shadow-lg p-2 flex items-center relative overflow-hidden"
        data-oid="p799z1x"
      >
        {/* Progress bar */}
        <div
          className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300"
          style={{ width: `${progress}%` }}
          data-oid="6n0-ikb"
        />

        <div
          className="flex-shrink-0 w-8 h-8 flex items-center justify-center cursor-pointer text-cyan-400 hover:text-cyan-300 transition-colors"
          onClick={handleVoiceCommand}
          data-oid="2t0q3-:"
        >
          <span className="pulse-animation" data-oid="x6iea.p">
            <i className="fas fa-robot" data-oid="3srz1o9"></i>
          </span>
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="AI Construction Coming Soon..."
          className="bg-transparent border-none w-full text-sm text-cyan-100 focus:outline-none focus:ring-0 placeholder:text-cyan-300/70"
          disabled
          data-oid="b8fhsrv"
        />

        <div
          className="flex-shrink-0 flex items-center space-x-2"
          data-oid="snsvp6v"
        >
          <span
            className="text-xs text-cyan-400 hidden sm:inline-block"
            data-oid="lhl8pwl"
          >
            Development: 70%
          </span>
          <button
            className="text-cyan-400 hover:text-cyan-300 transition p-2"
            onClick={handleSearch}
            data-oid="ohq7j.3"
          >
            <i className="fas fa-rocket" data-oid="e0x1cne"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AISearchBar;
