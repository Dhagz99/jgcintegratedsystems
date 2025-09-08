"use client";
import { useRef, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
<<<<<<< HEAD

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
    currentStep: 3,
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
=======
import { DataProps } from "../type/RequestType";

type Step = {
  id: number;
  userID: number;
  label: string;
  action?: string;
  date?: string | null;
};

// 🔹 Build steps dynamically based on requestType
function buildSteps(requestType: any): Step[] {
  if (!requestType) return [{ id: 1, userID: 0, action: "Submit Request", label: "Submit Request" }];
  const steps: Step[] = [{ id: 1, userID: requestType.recomApprovalId ?? 0, action: "Submit Request", label: "Submit Request" }];
  let stepId = 2;
  if (requestType.notedById) {
    steps.push({
      id: stepId++,
      userID: requestType.notedById,
      label: `Noted By (${requestType.notedBy?.name ?? "N/A"})`,
    });
  }
  if (requestType.checkedById) {
    steps.push({
      id: stepId++,
      userID: requestType.checkedById,
      label: `Checked By (${requestType.checkedBy?.name ?? "N/A"})`,
    });
  }
  if (requestType.checkedBy2Id) {
    steps.push({
      id: stepId++,
      userID: requestType.checkedBy2Id,
      label: `Checked By (${requestType.checkedBy2?.name ?? "N/A"})`,
    });
  }
  if (requestType.recomApprovalId) {
    steps.push({
      id: stepId++,
      userID: requestType.recomApprovalId,
      label: `Recommending Approval (${requestType.recomApproval?.name ?? "N/A"})`,
    });
  }
  if (requestType.recomApproval2Id) {
    steps.push({
      id: stepId++,
      userID: requestType.recomApproval2Id,
      label: `Recommending Approval (${requestType.recomApproval2?.name ?? "N/A"})`,
    });
  }
  if (requestType.approveById) {
    steps.push({
      id: stepId++,
      userID: requestType.approveById,
      label: `Final Approval (${requestType.approveBy?.name ?? "N/A"})`,
    });
  }

  return steps;
}

// 🔹 Attach requestLogs to steps
function attachLogsToSteps(steps: Step[], logs: any[]): Step[] {
  return steps.map((step) => {
    const log = logs.find(
      (l) => l.approverId === step.userID || l.action === step.label
    );
    return {
      ...step,
      action: log ? log.action : null,   // preserve actual log action
      date: log ? log.createdAt : null,  // set date only if log exists
    };
  });
}


export default function TransferRequestBar({ mainRequest }: DataProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  // 1. Build steps
  const steps = buildSteps(mainRequest?.requestType);

  const logs = (mainRequest?.approval?.[0]?.requestLogs ?? []) as any[];
  const stepsWithDates = attachLogsToSteps(steps, logs);

  console.log("result: ", stepsWithDates);


  // 3. Compute progress
  const currentStep =
    stepsWithDates.findIndex((s) => !s.date) === -1
      ? stepsWithDates.length
      : stepsWithDates.findIndex((s) => !s.date) + 1;

  const progress = {
    currentStep,
    dates: stepsWithDates.reduce((acc, step) => {
      acc[step.id] = step.date ?? null;
      return acc;
    }, {} as Record<number, string | null>),
  };

  // Auto-scroll to current step
  useEffect(() => {
    const currentIndex = steps.findIndex((s) => s.id === progress.currentStep);
>>>>>>> tester
    if (currentIndex !== -1 && stepRefs.current[currentIndex]) {
      stepRefs.current[currentIndex]?.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
<<<<<<< HEAD
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

  
=======
  }, [progress.currentStep, steps]);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -clientWidth / 2 : clientWidth / 2,
        behavior: "smooth",
      });
    }
  };
  
  const lastTracker = mainRequest?.status === "APPROVED" ? 1 : 0;


  return (
  
    <div className="relative w-full ">
      {/* Left Arrow */}
      <button
        aria-label="Scroll left"
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-1 hover:bg-gray-100"
      >
        <ChevronLeftIcon className="w-5 h-5" />
      </button>

      {/* Steps */}
      <div
        ref={scrollRef}
        className="flex items-center space-x-4  overflow-x-hidden w-full max-w-[35rem] mx-auto px-8 py-2"
      >
        {stepsWithDates.map((step, index) => {
          const isCompleted = step.id < progress.currentStep + lastTracker;
          const isCurrent = step.id === progress.currentStep;
          const isLast = index === stepsWithDates.length - 1;

          return (
            <div
              key={step.id}
              ref={(el) => {
                stepRefs.current[index] = el;
              }}
              className="flex items-center space-x-2"
            >
              <div className="flex flex-col items-center">
                {/* Circle */}

                {step.action === "REJECTED" ? (
                          <div
                            className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border-2 bg-red-400 border-red-300 text-white"
                          >
                            {"X"}
                          </div>
                        ) : (
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
                        )}
                {/* Label */}
                <div className={`text-[9px] text-center mt-1 font-medium ${step.action === "REJECTED" ? "text-red-400" : ""}`}>
                  {step.label}
                </div>

                {/* Date */}
                {step.date && (
                  <div className={`text-[8px] ${step.action === "REJECTED" ? "text-red-400" : "text-gray-400"}  `}>
                    {new Date(step.date).toLocaleDateString()}
                  </div>
                )}
              </div>

              {/* Connector */}
>>>>>>> tester
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

<<<<<<< HEAD
      <button
=======
      {/* Right Arrow */}
      <button
        aria-label="Scroll right"
>>>>>>> tester
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-1 hover:bg-gray-100"
      >
        <ChevronRightIcon className="w-5 h-5" />
      </button>
    </div>
  );
}
