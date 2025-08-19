// components/AlertMessage.tsx
import { Check } from "@mui/icons-material";
import { useEffect, useState } from "react";
import ButtonComponents from "./Buttons";

type Props = {
  type?: "success" | "error" | "info" | "warning";
  message: string;
  duration?: number;
  confirmation?: boolean;
};



export default function AlertMessage({
  type = "info",
  message,
  duration = 3000,
  confirmation = false
}: Props) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    if(!confirmation){
      const timeout = setTimeout(() => setShow(false), duration);
      return () => clearTimeout(timeout);
    }
  }, [duration, confirmation]);

  const colorMap = {
    success: <div className="flex flex-col justify-center items-center">
              <Check sx={{ fontSize: '4rem', color: 'green' } } />
              <p className="font-semibold text-2xl">{message}</p>
             </div> ,      
    error: "bg-red-100 text-red-800 border-red-300",
    info: "bg-blue-100 text-blue-800 border-blue-300",
    warning: "bg-yellow-100 text-yellow-800 border-yellow-300",
  };
  return (
    <div className="fixed inset-0 flex items-center transform justify-center z-50 bg-[#6c666637]">
      <div
        role="alert"
        className={`min-w-120 min-h-80 rounded-xl flex justify-center gap-4 items-center flex-col bg-white border px-4 py-2  shadow transition-all duration-300 ease-in-out
          ${show ? "opacity-100 scale-100 " : "opacity-0 scale-95 hidden"}
        `}
      >
        {colorMap[type]}
        <ButtonComponents label="Ok" variant="success" size="lg" />
      </div>
    </div>
  );
}
