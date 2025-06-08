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
      data-oid="y4svzyv"
    >
      <div
        className="relative w-full min-h-[600px] bg-space-900/50 rounded-lg"
        data-oid=":-0-hjz"
      >
        {isLoading && (
          <div
            className="absolute inset-0 flex items-center justify-center bg-space-900/50 backdrop-blur-sm z-10 rounded-lg"
            data-oid="y9a0zy-"
          >
            <div className="flex flex-col items-center" data-oid="swhmpfp">
              <Loader2
                className={`w-12 h-12 text-${variant} animate-spin`}
                data-oid="eju8wm4"
              />

              <p className={`mt-3 text-${variant}`} data-oid="sbr84zy">
                Loading calculator...
              </p>
            </div>
          </div>
        )}

        {hasError ? (
          <div
            className="absolute inset-0 flex items-center justify-center bg-space-900/90 backdrop-blur-sm z-10 rounded-lg"
            data-oid="3d4iqjl"
          >
            <div
              className="flex flex-col items-center text-center p-6"
              data-oid="-odh:np"
            >
              <div className="text-red-500 text-4xl mb-3" data-oid="eh70aeh">
                ⚠️
              </div>
              <h3 className="text-xl text-red-400 mb-2" data-oid="7:32cvx">
                Failed to load calculator
              </h3>
              <p className="text-gray-400 mb-4" data-oid="t_vxk.5">
                The external calculator could not be loaded from {url}
              </p>
              <button
                onClick={handleRetry}
                className={`px-4 py-2 bg-${variant} text-black rounded-lg hover:bg-${variant}/80 flex items-center gap-2`}
                data-oid="3rdzg11"
              >
                <RefreshCw size={16} data-oid="nsdoec9" />
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
            data-oid="sa342np"
          />
        )}
      </div>
    </BaseCalculator>
  );
};

export default ExternalCalculator;
