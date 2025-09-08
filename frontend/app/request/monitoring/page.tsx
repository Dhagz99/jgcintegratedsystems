'use client'

import { Search } from "@mui/icons-material"
import BadgeComponents from "../components/Badge"
import { FormsInputs } from "../components/FormsInputs"
import { useEffect, useState } from "react"
import { useFetchApproval } from "../hooks/useApproval"
import { MainRequest } from "../type/RequestType"
import { FormattedDate } from "@/app/utils/DateFormatter"
import PreviewMonitorRequest from "../ui/monitoring-ui/PreviewRequest"

export default function RequestMonitoring(){
    const [selectedRequest, setSelectedRequest] = useState<MainRequest | null>(null);
    const [status, setStatus] = useState("ALL");
    const [page, setPage] = useState(1);
    const pageSize = 10; // 👈 adjust as needed
    const { data, isLoading, isFetching } = useFetchApproval(status, page, pageSize);
   
    useEffect(() => {
      const items = data?.data ?? [];
      if (items.length > 0) {
        setSelectedRequest(items[0]);
      } else {
        setSelectedRequest(null);
      }
    }, [data]);
    
      const handlePreview = (req: MainRequest) => {
        setSelectedRequest(req);
      };

    
    return(
        <div className="flex flex-col h-full">
           <div>
             <h1 className="text-md font-bold text-black">Request Monitoring</h1>
           </div>
          <div className="flex bg-white w-full  min-h-11 rounded-lg border border-[#ECECEC] justify-between items-center mt-2 px-3.5 py-1">
                <div className="flex gap-3 items-center">
                    <div className="self-center border-r-2 pr-2">
                      <h2 className="font-bold tracking-widest text-gray-400 ">Filter</h2> 
                    </div>
                    <div >
                        <select
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                              focus:outline-none  block w-full p-2.5 "
                             name=""
                              id="">
                            <option value="">Select Status</option>
                            <option value="">Select Status</option>
                            <option value="">Select Status</option>
                            <option value="">Select Status</option>
                          </select>
                    </ div >
                      <div>
                      <select
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                              focus:outline-none  block w-full p-2.5 "
                              name=""
                               id=""
                              >
                            <option value="">Select Branch</option>
                            <option value="">Branch</option>
                            <option value="">Branch</option>
                            <option value="">Branch</option>
                        </select>
                      </div>
                    <div>
                        <FormsInputs type="date" placeholder="date"  />
                    </div>
                </div>
                <div className="flex min-w-72">
                    <div className="relative  w-full">
                      <div className="absolute left-2 top-1">
                          <Search />
                      </div>
                      <input
                        type="text"
                        className="bg-gray-200 p-1 pl-10 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        placeholder="Search"
                        />
                    </div>
                </div>
          </div>
          <div className="flex gap-2 w-full h-full mt-2 flex-no-wrap rounded-lg p-2 bg-white ">
            <div className={`flex w-full`}>
                <div className="flex flex-col w-full px-2">
                  <table className="w-full border-separate border-spacing-0">
                    <thead className="bg-[#0FC497] ">
                        <tr className="text-center">
                        <th className="rounded-tl-lg px-4 py-2 text-white text-sm">Request No.</th>
                        <th className="px-4 py-2 text-white text-sm">Request Type</th>
                        <th className="px-4 py-2 text-white text-sm">Branch</th>
                        <th className="px-4 py-2 text-white text-sm">Request Date</th>
                        <th className="rounded-tr-lg px-4 py-2 text-white text-sm">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(data?.data) && data.data.length > 0 ? (
                          data.data.map((req: MainRequest) => {
                            const badgeType =
                              req.status === "APPROVED"
                                ? "success"
                                : req.status === "REJECTED"
                                ? "danger"
                                : req.status === "PENDING"
                                ? "warning"
                                : "default";

                            const badgeLabel = req.status ?? "UNKNOWN";

                            return (
                              <tr
                                key={req.id}
                                className={`text-xs text-center text-black hover:bg-green-100 cursor-pointer ${
                                  req.id === selectedRequest?.id ? "bg-green-100" : "bg-[#FAFAFA]"
                                }`}
                                onClick={() => handlePreview(req)}
                              >
                                  <td className="px-4 py-2 border-l border-b border-[#E9E3E3]">
                                    {req.referenceCode}
                                  </td>
                                  <td className="px-4 py-2 border-b border-[#E9E3E3]">
                                    {req.requestType.requestName}
                                  </td>
                                  <td className="px-4 py-2 border-b border-[#E9E3E3]">
                                    {req.requestFrom.branchName}
                                  </td>
                                  <td className="px-4 py-2 border-b border-[#E9E3E3]">
                                    <FormattedDate value={req.requestDate} />
                                  </td>
                                  <td className="px-4 py-2 border-r border-b border-[#E9E3E3]">
                                    <BadgeComponents type={badgeType} label={badgeLabel} />
                                  </td>
                              </tr>
                            );
                          })
                        ) : (
                          <tr className="text-xs text-center text-black hover:bg-green-100 cursor-pointer ">
                            <td colSpan={5} className="text-center py-4 border-b border-[#E9E3E3]">
                              No request available
                            </td>
                          </tr>
                        )}
                      </tbody>
                  </table>
                </div>
            </div>
                    {selectedRequest && (
                        <PreviewMonitorRequest  mainRequest={selectedRequest}/>
                      )}
             
                 
          </div>
              
        </div>
    )
}