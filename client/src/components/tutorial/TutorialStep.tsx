import React, { useEffect, useRef, useState } from "react";
import { TutorialStep as TutorialStepType } from "./TutorialContext";
import { AnimatedIcon } from "./AnimatedIcons";

interface TutorialStepProps {
  step: TutorialStepType;
  onNext: () => void;
  onPrev: () => void;
  onSkip: () => void;
  isFirst: boolean;
  isLast: boolean;
  currentStepIndex: number;
  totalSteps: number;
}

const TutorialStep: React.FC<TutorialStepProps> = ({
  step,
  onNext,
  onPrev,
  onSkip,
  isFirst,
  isLast,
  currentStepIndex,
  totalSteps,
}) => {
  const [position, setPosition] = useState<{
    top: number;
    left: number;
    width: number;
    height: number;
  } | null>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  // Calculate position based on target element
  useEffect(() => {
    if (step.targetElement) {
      const targetElement = document.querySelector(step.targetElement);
      if (targetElement) {
        const rect = targetElement.getBoundingClientRect();
        const scrollTop =
          window.pageYOffset || document.documentElement.scrollTop;
        const scrollLeft =
          window.pageXOffset || document.documentElement.scrollLeft;

        setPosition({
          top: rect.top + scrollTop,
          left: rect.left + scrollLeft,
          width: rect.width,
          height: rect.height,
        });

        // Scroll target into view with smooth animation
        targetElement.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [step.targetElement]);

  // Calculate tooltip position based on target element and specified position
  const getTooltipPosition = () => {
    if (!position || !tooltipRef.current) return {};

    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const tooltipWidth = tooltipRect.width;
    const tooltipHeight = tooltipRect.height;

    switch (step.position) {
      case "top":
        return {
          top: `${position.top - tooltipHeight - 15}px`,
          left: `${position.left + position.width / 2 - tooltipWidth / 2}px`,
        };
      case "bottom":
        return {
          top: `${position.top + position.height + 15}px`,
          left: `${position.left + position.width / 2 - tooltipWidth / 2}px`,
        };
      case "left":
        return {
          top: `${position.top + position.height / 2 - tooltipHeight / 2}px`,
          left: `${position.left - tooltipWidth - 15}px`,
        };
      case "right":
        return {
          top: `${position.top + position.height / 2 - tooltipHeight / 2}px`,
          left: `${position.left + position.width + 15}px`,
        };
      default:
        return {
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        };
    }
  };

  return (
    <>
      {/* Backdrop overlay */}
      <div
        className="fixed inset-0 bg-space-950 bg-opacity-80 z-50 transition-opacity duration-300"
        style={{ backdropFilter: "blur(3px)" }}
        data-oid=":dqnfqk"
      />

      {/* Target element highlight */}
      {position && (
        <div
          className="absolute z-50 rounded-lg border-2 border-cyan transition-all duration-500 animate-pulse-custom pointer-events-none"
          style={{
            top: position.top,
            left: position.left,
            width: position.width,
            height: position.height,
            boxShadow: "0 0 0 9999px rgba(0, 0, 0, 0.7)",
          }}
          data-oid="w.wa6aq"
        />
      )}

      {/* Tutorial tooltip */}
      <div
        ref={tooltipRef}
        className="fixed glass-card p-6 rounded-xl z-50 w-80 md:w-96 shadow-lg transition-all duration-500"
        style={{
          ...getTooltipPosition(),
          borderColor: "rgba(0, 230, 255, 0.3)",
          boxShadow: "0 0 15px rgba(0, 230, 255, 0.3)",
        }}
        data-oid="-_o-4.q"
      >
        {/* Progress indicator */}
        <div
          className="absolute -top-2 left-0 w-full flex justify-center"
          data-oid="ier4_--"
        >
          <div
            className="bg-space-900 rounded-full px-3 py-1 text-xs font-medium"
            data-oid="g68nkz6"
          >
            Step {currentStepIndex + 1} of {totalSteps}
          </div>
        </div>

        {/* Animation icon area */}
        <div className="flex justify-center mb-4" data-oid="nmuld-j">
          <AnimatedIcon
            animationKey={step.animationKey || "default"}
            data-oid="is-9w64"
          />
        </div>

        {/* Content */}
        <h3 className="text-xl font-bold text-white mb-2" data-oid="fl-y1o2">
          {step.title}
        </h3>
        <p className="text-gray-300 mb-6" data-oid="jicxi-y">
          {step.description}
        </p>

        {/* Navigation buttons */}
        <div
          className="flex justify-between items-center mt-4"
          data-oid=":zb5j1j"
        >
          <div data-oid="vb-x39g">
            {!isFirst && (
              <button
                onClick={onPrev}
                className="text-gray-300 hover:text-cyan mr-2"
                data-oid="3exz:9u"
              >
                Previous
              </button>
            )}
          </div>

          <div data-oid="l7l-6ve">
            <button
              onClick={onSkip}
              className="text-gray-400 hover:text-gray-200 text-sm mr-4"
              data-oid="nu:to6w"
            >
              Skip Tutorial
            </button>

            <button
              onClick={onNext}
              className="btn-primary px-4 py-2 rounded-lg"
              data-oid="7fiqhw_"
            >
              {isLast ? "Finish" : "Next"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TutorialStep;
