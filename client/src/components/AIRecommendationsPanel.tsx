import { FC, useState } from "react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface AIRecommendationsPanelProps {
  className?: string;
}

const AIRecommendationsPanel: FC<AIRecommendationsPanelProps> = ({
  className = "",
}) => {
  const [context, setContext] = useState("");
  const [recommendation, setRecommendation] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Function to handle generating recommendations
  const handleGenerateRecommendation = async () => {
    if (!context.trim()) {
      toast({
        title: "Input Required",
        description:
          "Please describe your construction situation to get recommendations.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);
      setRecommendation(null);

      const result = await apiRequest<{ recommendation: string }>(
        "/api/ai/recommendations",
        {
          method: "POST",
          body: JSON.stringify({ context }),
        },
      );

      setRecommendation(result.recommendation);
    } catch (error) {
      console.error("Error generating recommendation:", error);
      toast({
        title: "Error",
        description:
          "Failed to generate recommendation. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`glass-card p-6 rounded-lg ${className}`}
      data-oid="9jj3u50"
    >
      <h2 className="text-xl font-bold text-cyan mb-4" data-oid="o48.q1a">
        AI Construction Advisor
      </h2>

      <div className="space-y-4" data-oid="avptqdu">
        <div data-oid="bc0p:qz">
          <label
            htmlFor="context"
            className="block text-sm font-medium text-gray-300 mb-1"
            data-oid="8jwsxpk"
          >
            Describe your construction situation or question
          </label>
          <textarea
            id="context"
            className="w-full h-32 bg-space-800 text-white border border-gray-700 rounded-md p-3 focus:border-cyan focus:ring-1 focus:ring-cyan"
            placeholder="E.g., I'm installing insulation in an Auckland home basement. The space has minor moisture issues, and I'm concerned about mold. What's the best approach?"
            value={context}
            onChange={(e) => setContext(e.target.value)}
            data-oid="qaypkao"
          ></textarea>
        </div>

        <button
          onClick={handleGenerateRecommendation}
          disabled={isLoading}
          className={`w-full py-2 px-4 rounded-md text-white font-medium transition ${
            isLoading
              ? "bg-purple-700 cursor-not-allowed"
              : "bg-purple-800 hover:bg-purple-700 btn-glow btn-glow-cyan"
          }`}
          data-oid="i-58ukx"
        >
          {isLoading ? (
            <span
              className="flex items-center justify-center"
              data-oid="poi.4-y"
            >
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                data-oid="0i-b85x"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  data-oid="roru:rs"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  data-oid="2ueu_vd"
                ></path>
              </svg>
              Generating Recommendation...
            </span>
          ) : (
            "Get Expert Recommendation"
          )}
        </button>

        {recommendation && (
          <div
            className="mt-6 border border-cyan/20 rounded-md p-4 bg-space-800"
            data-oid="ewp-5n4"
          >
            <h3
              className="text-lg font-semibold text-cyan mb-2"
              data-oid="cqj-xk5"
            >
              Expert Recommendation
            </h3>
            <div
              className="text-gray-200 whitespace-pre-line"
              data-oid="ojfh-eu"
            >
              {recommendation}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIRecommendationsPanel;
