'use client'

import { ApprovalTwoTone, VisibilityOutlined, HighlightOffTwoTone } from "@mui/icons-material";
import ButtonComponents from "../components/Buttons";
import { useFetchApproval } from "../hooks/useApproval";
import RequestCard from "../ui/approval-ui/RequestCard";
import { ApprovalResponse, MainRequest } from "../type/RequestType";
import { FormattedDate } from "@/app/utils/DateFormatter";

export default function RequestApproval() {

    const { data: requests = [], isLoading } = useFetchApproval();
 

  if (isLoading) {
    return <p className="text-sm text-gray-500">Loading requests...</p>;
  }

  return (
    <div className="flex flex-col">
      <div>
        <h1 className="text-md font-bold text-black">Approval Dashboard</h1>
      </div>

      {/* Tabs */}
      <div className="flex items-center mt-1">
        <button className="bg-[#32B695] rounded-l-md px-7 py-1.5 text-[0.55rem] font-bold text-white">
          Pending
        </button>
        <button className="bg-[#FFFFFF] px-7 py-1.5 text-[0.55rem] font-bold text-[#8B8A8A]">
          Approved
        </button>
        <button className="bg-[#FFFFFF] rounded-r-md px-7 py-1.5 text-[0.55rem] font-bold text-[#8B8A8A]">
          Rejected
        </button>
      </div>

      <div>
        <p className="text-xs text-[#8B8A8A] py-2">List of Requests</p>
      </div>
    

            <RequestCard requests={requests} />
    </div>
  );
}
