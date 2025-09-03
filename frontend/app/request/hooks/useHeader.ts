import { getData } from "../services/global.sevice";
import { RequestLogs } from "../type/BaseType";
import { useFetchGlobal } from "./useGlobal";

const LOGS_QK = ["logs"] as const;

export const useFetchUserLogs = () =>
  useFetchGlobal<RequestLogs[]>({
    queryKey: LOGS_QK,
    queryFn: () => getData<RequestLogs[]>("/request/user-logs"),
  });
  