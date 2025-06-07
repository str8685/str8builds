import { FC, useState } from "react";
import BaseCalculator from "./BaseCalculator";
import { Loader2, RefreshCw } from "lucide-react";

interface ExternalCalculatorProps {
  title: string;
  url: string;
  description?: string;
  variant?: "cyan" | "electric" | "teal" | "purple" | "default";
}

const ExternalCalculator: FC<ExternalCalculatorProps> = ({
  title,
  url,
  description,
  variant = "cyan",
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleRetry = () => {
    setIsLoading(true);
    setHasError(false);
    // Force iframe reload
    const iframe = document.getElementById(
      `iframe-${title.replace(/\s+/g, "-")}`,
    ) as HTMLIFrameElement;
    if (iframe) {
      const src = iframe.src;
      iframe.src = "";
      setTimeout(() => {
        iframe.src = src;
      }, 100);
    }
  };

  return (
    <BaseCalculator
      title={title}
      description={description}
      variant={variant}
      data-oid=":6ac1c2"
    >
      <div
        className="relative w-full min-h-[600px] bg-space-900/50 rounded-lg"
        data-oid="z4z3_qp"
      >
        {isLoading && (
          <div
            className="absolute inset-0 flex items-center justify-center bg-space-900/50 backdrop-blur-sm z-10 rounded-lg"
            data-oid="h6ce568"
          >
            <div className="flex flex-col items-center" data-oid="5ifzgob">
              <Loader2
                className={`w-12 h-12 text-${variant} animate-spin`}
                data-oid="wl303v9"
              />

              <p className={`mt-3 text-${variant}`} data-oid="byi3uop">
                Loading calculator...
              </p>
            </div>
          </div>
        )}

        {hasError ? (
          <div
            className="absolute inset-0 flex items-center justify-center bg-space-900/90 backdrop-blur-sm z-10 rounded-lg"
            data-oid="fhrb0-4"
          >
            <div
              className="flex flex-col items-center text-center p-6"
              data-oid="o.yyksa"
            >
              <div className="text-red-500 text-4xl mb-3" data-oid="ajo-_hd">
                ⚠️
              </div>
              <h3 className="text-xl text-red-400 mb-2" data-oid="cbze8x.">
                Failed to load calculator
              </h3>
              <p className="text-gray-400 mb-4" data-oid="_uxjs::">
                The external calculator could not be loaded from {url}
              </p>
              <button
                onClick={handleRetry}
                className={`px-4 py-2 bg-${variant} text-black rounded-lg hover:bg-${variant}/80 flex items-center gap-2`}
                data-oid="4l-03of"
              >
                <RefreshCw size={16} data-oid="3b9eb4z" />
                Try Again
              </button>
            </div>
          </div>
        ) : (
          <iframe
            id={`iframe-${title.replace(/\s+/g, "-")}`}
            src={url}
            className="w-full border-0 rounded-lg min-h-[600px] transition-opacity duration-300"
            style={{ opacity: isLoading ? 0.3 : 1 }}
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setIsLoading(false);
              setHasError(true);
            }}
            sandbox="allow-scripts allow-same-origin allow-forms"
            title={title}
            data-oid="_ei8au6"
          />
        )}
      </div>
    </BaseCalculator>
  );
};

export default ExternalCalculator;
