"use client";

import { useMutation } from "@tanstack/react-query";
import { createFund, FundPayload } from "@/app/request/services/fund.service";

export function useCreateFund() {
  return useMutation({
    mutationFn: (payload: FundPayload) => createFund(payload),
    onSuccess: (data) => {
      console.log("Fund created successfully:", data);
    },
    onError: (error: any) => {
      console.error("Error creating fund:", error);
    },
  });
}