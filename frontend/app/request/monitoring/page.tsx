'use client'

import {  ApprovalTwoTone, Search,  VisibilityOutlined } from "@mui/icons-material"
import ButtonComponents from "../components/Buttons"
import BadgeComponents from "../components/Badge"
import TransferRequestBar from "../components/ProgressBar"
import { FormsInputs } from "../components/FormsInputs"
import { useState } from "react"
import { useFetchApproval } from "../hooks/useApproval"
import { MainRequest } from "../type/RequestType"
import { formatRefId } from "@/app/utils/idConverter"

export default function RequestMonitoring(){
    const [status, setStatus] = useState("PENDING");
    const [page, setPage] = useState(1);
    const pageSize = 10; // 👈 adjust as needed
    const { data, isLoading, isFetching } = useFetchApproval(status, page, pageSize);
    return(
        <div className="flex flex-col">
           <div>
             <h1 className="text-md font-bold text-black">Request Monitoring</h1>
           </div>
          <div className="flex bg-white w-full min-h-11 rounded-lg border border-[#ECECEC] justify-between items-center mt-2 px-3.5">
                <div className="flex gap-3 ">
                    <div className="self-center border-r-2 pr-2">
                      <h2 className="font-bold tracking-widest text-gray-400 ">Filter</h2> 
                    </div>
                    <div >
                        <select name="" id="">
                            <option value="">Select Status</option>
                        </select>
                    </div>
                    <div >
                        <select name="" id="">
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
          <div className="flex bg-white flex-col gap-2 md:flex-row  w-full min-h-95 mt-2 rounded-lg p-2 ">
            <div className="flex w-full md:w-[60%]">
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
                  {data?.data.map((req: MainRequest)=> (
                    <tr key={req.id} className="text-xs  bg-[#FAFAFA] text-center text-black hover:bg-green-100">
                   <td className="px-4 py-2 border-l border-b border-[#E9E3E3]">
                       {formatRefId(req.id, "REF", 6)}
                  </td>
                      <td className="px-4 py-2 border-b border-[#E9E3E3]">Monthly Budget</td>
                      <td className="px-4 py-2 border-b border-[#E9E3E3]">EMB MAIN BRANCH</td>
                      <td className="px-4 py-2 border-b border-[#E9E3E3]">July 24, 2025 09:29 AM</td>
                      <td className="px-4 py-2  border-r border-b border-[#E9E3E3]">
                        <BadgeComponents type ="danger" label = "PENDING" />
                      </td>
                    </tr>
                      ))
                  }
                    
                </tbody>
                </table>

                </div>
            </div>
            <div className="flex flex-col justify-between p-2.5 w-full   md:w-[40%] border border-[#D5D5D5] gap-3 rounded-md">
                <div className="flex flex-col gap-2">
                    <div className="flex justify-between">
                          <div className="">
                            <p className="text-md font-bold text-black leading-tight">Transfer Request</p>
                            <p className="text-sm text-gray-500 font-bold">PR00000001</p>
                          </div>
                          <div>
                             <BadgeComponents type ="danger" label = "PENDING" />
                          </div>
                    </div>
                    <TransferRequestBar />
                    <h5>EMB MAIN BRANCH</h5>
                    <div className=" flex bg-gray-400 w-full min-h-80 p-4">
                      <div className=" flex justify-center items-center bg-white w-full h-full">
                           <p>Click to preview</p>                      
                      </div>
                    </div>
                </div>
                   <div className="flex justify-center gap-2">
                            <ButtonComponents label="View" variant="info" size="xs" icon = {<VisibilityOutlined fontSize="small" />}/>
                            <ButtonComponents label="Approve" variant="success" size="xs" icon = {<ApprovalTwoTone fontSize="small"/>}/>
                            <ButtonComponents label="Reject" variant="danger" size="xs" icon = {<VisibilityOutlined  fontSize="small"/>}/>
                      </div>
            </div>
          </div>
              
        </div>
    )
}