import { toast, ToastPosition } from "react-hot-toast";

export type ToastProps = {
  message: string;
  position?: ToastPosition;
  duration?: number;
};


export const showSuccess = ({
  message,
  position = "bottom-right",
  duration = 2000,
}: ToastProps) =>
  toast.success(message, {
    position,
    duration,
  });


export const showError = ({ message, position = "bottom-right" }: ToastProps) =>
  toast.error(message, {
    position,
  });

export const showInfo = ({ message, position = "bottom-right" }: ToastProps) =>
  toast(message, {
    position,
  });
