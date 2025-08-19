import { getData, getDataRes } from "../services/global.sevice";
import { MainRequest } from "../type/RequestType";
import { useFetchGlobal } from "./useGlobal";

const QUERYKEY = ["approvals"] as const;
export const useFetchApproval  = () => {
     return   useFetchGlobal<MainRequest[]>({
        queryKey: QUERYKEY,
        queryFn: () => getDataRes<MainRequest[]>("/request/get-requests-approver"),
    })
}