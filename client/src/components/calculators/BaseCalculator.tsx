import { FC, ReactNode } from "react";
import GlassCard from "../ui/GlassCard";

interface BaseCalculatorProps {
  title: string;
  description?: string;
  children: ReactNode;
  variant?: "cyan" | "electric" | "teal" | "purple" | "default";
}

const BaseCalculator: FC<BaseCalculatorProps> = ({
  title,
  description,
  children,
  variant = "cyan",
}) => {
  return (
    <GlassCard
      className="p-6 mb-6 w-full"
      variant={variant}
      blur="md"
      glow={true}
      data-oid="ejy29lj"
    >
      <h2
        className={`text-2xl font-semibold mb-2 ${variant === "cyan" ? "text-cyan" : variant === "electric" ? "text-electric" : variant === "teal" ? "text-teal" : variant === "purple" ? "text-purple-800" : "text-white"}`}
        data-oid="qm27oe5"
      >
        {title}
      </h2>
      {description && (
        <p className="text-sm text-gray-300 mb-4" data-oid="st9rkes">
          {description}
        </p>
      )}
      <div className="w-full" data-oid="6-8l27h">
        {children}
      </div>
    </GlassCard>
  );
};

export default BaseCalculator;
