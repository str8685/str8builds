import { FC, useState } from "react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { NZ_REGIONS } from "@/lib/constants";

interface MaterialRecommendationsProps {
  className?: string;
}

const budgetOptions = [
  "Low-cost (budget solution)",
  "Mid-range (standard quality)",
  "High-end (premium quality)",
  "Eco-friendly (sustainable options)",
];

const projectTypes = [
  "Residential new build",
  "Residential renovation",
  "Commercial construction",
  "Interior fit-out",
  "Outdoor decking",
  "Bathroom renovation",
  "Kitchen renovation",
  "Roofing project",
  "Insulation upgrade",
  "Foundation work",
];

const MaterialRecommendations: FC<MaterialRecommendationsProps> = ({
  className = "",
}) => {
  const [projectType, setProjectType] = useState(projectTypes[0]);
  const [budget, setBudget] = useState(budgetOptions[1]);
  const [location, setLocation] = useState(NZ_REGIONS[0]);
  const [recommendations, setRecommendations] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Function to handle generating material recommendations
  const handleGenerateRecommendations = async () => {
    try {
      setIsLoading(true);
      setRecommendations(null);

      const result = await apiRequest<{ recommendations: string }>(
        "/api/ai/materials",
        {
          method: "POST",
          body: JSON.stringify({ projectType, budget, location }),
        },
      );

      setRecommendations(result.recommendations);
    } catch (error) {
      console.error("Error generating material recommendations:", error);
      toast({
        title: "Error",
        description:
          "Failed to generate material recommendations. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`glass-card p-6 rounded-lg ${className}`}
      data-oid="uucrxgy"
    >
      <h2 className="text-xl font-bold text-cyan mb-4" data-oid="1lpdkps">
        AI Material Advisor
      </h2>

      <div className="space-y-4" data-oid="r3rp5bu">
        <div data-oid="0erdxri">
          <label
            htmlFor="projectType"
            className="block text-sm font-medium text-gray-300 mb-1"
            data-oid="mqilfce"
          >
            Project Type
          </label>
          <select
            id="projectType"
            className="w-full bg-space-800 text-white border border-gray-700 rounded-md p-2.5 focus:border-cyan focus:ring-1 focus:ring-cyan"
            value={projectType}
            onChange={(e) => setProjectType(e.target.value)}
            data-oid="-ob0dfk"
          >
            {projectTypes.map((type) => (
              <option key={type} value={type} data-oid="wncc_a:">
                {type}
              </option>
            ))}
          </select>
        </div>

        <div data-oid="hcu7uo1">
          <label
            htmlFor="budget"
            className="block text-sm font-medium text-gray-300 mb-1"
            data-oid="59zphdo"
          >
            Budget Range
          </label>
          <select
            id="budget"
            className="w-full bg-space-800 text-white border border-gray-700 rounded-md p-2.5 focus:border-cyan focus:ring-1 focus:ring-cyan"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            data-oid="fuvztc-"
          >
            {budgetOptions.map((option) => (
              <option key={option} value={option} data-oid="m5uxbk2">
                {option}
              </option>
            ))}
          </select>
        </div>

        <div data-oid="0io-:u8">
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-300 mb-1"
            data-oid="hxnx_un"
          >
            Location in NZ
          </label>
          <select
            id="location"
            className="w-full bg-space-800 text-white border border-gray-700 rounded-md p-2.5 focus:border-cyan focus:ring-1 focus:ring-cyan"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            data-oid="e:ond_x"
          >
            {NZ_REGIONS.map((region) => (
              <option key={region} value={region} data-oid="cr28u0w">
                {region}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleGenerateRecommendations}
          disabled={isLoading}
          className={`w-full py-2 px-4 rounded-md text-white font-medium transition ${
            isLoading
              ? "bg-purple-700 cursor-not-allowed"
              : "bg-purple-800 hover:bg-purple-700 btn-glow btn-glow-cyan"
          }`}
          data-oid="20up7qn"
        >
          {isLoading ? (
            <span
              className="flex items-center justify-center"
              data-oid="ie9pf6_"
            >
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                data-oid="ss:9k-a"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  data-oid="4glq-gn"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  data-oid="4vbh.ri"
                ></path>
              </svg>
              Finding Best Materials...
            </span>
          ) : (
            "Get Material Recommendations"
          )}
        </button>

        {recommendations && (
          <div
            className="mt-6 border border-cyan/20 rounded-md p-4 bg-space-800"
            data-oid="-4_h:62"
          >
            <h3
              className="text-lg font-semibold text-cyan mb-2"
              data-oid=".hhkc:i"
            >
              Recommended Materials
            </h3>
            <div
              className="text-gray-200 whitespace-pre-line"
              data-oid="u_oo1jm"
            >
              {recommendations}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MaterialRecommendations;
