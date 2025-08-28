import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getData, getDataRes } from "../services/global.sevice";
import { Approval } from "../type/BaseType";
import { MainRequest } from "../type/RequestType";
import { useAddGlobal, useFetchGlobal } from "./useGlobal";
import api from "@/lib/api";

export interface PaginatedResponse<T> {
    data: T[];
    pagination: { total: number; page: number; pageSize: number; totalPages: number };
    status: string;
  }
  
  export const useFetchApproval = (status: string, page: number, pageSize: number) => {
    return useFetchGlobal<PaginatedResponse<MainRequest>>({
      queryKey: ["approvals", status, page, pageSize],
      queryFn: () =>
        getDataRes<PaginatedResponse<MainRequest>>("/request/get-request-action", {
          status,
          page,
          pageSize,
        }),
    });
  };


  interface ApproveRequestPayload {
    id: number;                // request ID
    action: "APPROVED" | "REJECTED"; // what action to take
  }
  export const useApproveRequest = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: async ({ id, action }: ApproveRequestPayload) => {
        const res = await api.patch(`/request/${id}/action`, { action });
        return res.data;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["approvals"] });
      },
      onError: (err) => {
        console.error("Error approving/rejecting request:", err);
      },
    });
  };