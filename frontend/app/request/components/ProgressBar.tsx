"use client";
import { useRef, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

type Step = {
  id: number;
  label: string;
};

const steps: Step[] = [
  { id: 1, label: "Submit Request" },
  { id: 2, label: "Recommending Approval (APPLE)" },
  { id: 3, label: "Recommending Approval (APPLE)" },
  { id: 4, label: "Recommending Approval (APPLE)" },
  { id: 5, label: "Recommending Approval (APPLE)" },
];

export default function TransferRequestBar() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  const progress = {
    currentStep: 4,
    dates: {
      1: "17/07/2025",
      2: "01/09/2025",
      3: "01/09/2025",
      4: "01/09/2025",
      5: null,
    },
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -clientWidth / 2 : clientWidth / 2,
        behavior: "smooth",
      });
    }
  };


  useEffect(() => {
    const currentIndex = steps.findIndex(
      (s) => s.id === progress.currentStep
    );
    if (currentIndex !== -1 && stepRefs.current[currentIndex]) {
      stepRefs.current[currentIndex]?.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [progress.currentStep]);

  return (
    <div className="relative w-full">
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-1 hover:bg-gray-100"
      >
        <ChevronLeftIcon className="w-5 h-5" />
      </button>

      <div
        ref={scrollRef}
        className="flex items-center space-x-4 overflow-x-hidden max-w-[80rem] mx-auto px-8 py-2"
      >
        {steps.map((step, index) => {
          const isCompleted = step.id < progress.currentStep;
          const isCurrent = step.id === progress.currentStep;
          const isLast = index === steps.length - 1;

          return (
            <div
              key={step.id}
              ref={(el) => {
                stepRefs.current[index] = el;
              }}
              className="flex items-center space-x-2"
            >
              <div className="flex flex-col items-center">
   
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold
                    ${
                      isCompleted
                        ? "bg-[#0FC497] text-white"
                        : isCurrent
                        ? "border-2 border-yellow-600 text-yellow-700"
                        : "border-2 border-gray-300 text-gray-400"
                    }`}
                >
                  {isCompleted ? "✓" : step.id}
                </div>


                <div className="text-[9px] text-center mt-1 font-medium">
                  {step.label}
                </div>


                {progress.dates[step.id as keyof typeof progress.dates] && (
                  <div className="text-[8px] text-gray-400">
                    {progress.dates[step.id as keyof typeof progress.dates]}
                  </div>
                )}
              </div>

  
              {!isLast && (
                <div
                  className={`w-14 h-0.5 ${
                    isCompleted
                      ? "bg-[#2acda4]"
                      : isCurrent
                      ? "bg-gray-300"
                      : "bg-gray-200"
                  }`}
                ></div>
              )}
            </div>
          );
        })}
      </div>

      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-1 hover:bg-gray-100"
      >
        <ChevronRightIcon className="w-5 h-5" />
      </button>
    </div>
  );
}