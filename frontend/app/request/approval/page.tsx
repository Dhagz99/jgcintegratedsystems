'use client'

import { useState } from "react";
import { useFetchApproval } from "../hooks/useApproval";
import RequestCard from "../ui/approval-ui/RequestCard";
import { MainRequest } from "../type/RequestType";

export default function RequestApproval() {
  const [status, setStatus] = useState("PENDING");
  const [page, setPage] = useState(1);
  const pageSize = 10; // 👈 adjust as needed

  const { data, isLoading, isFetching } = useFetchApproval(status, page, pageSize);

  // Handle loading
  if (isLoading) {
    return <p className="text-sm text-gray-500">Loading requests...</p>;
  }

  // Handle no data returned at all
  if (!data) {
    return <p className="text-sm text-gray-500">No data returned from API</p>;
  }
  // Unwrap safely once we know data exists
  const requests: MainRequest[] = data.data ?? [];
  const pagination = data.pagination;
  // console.log("requests:", requests);
  // console.log("pagination:", pagination);

  return (
    <div className="flex flex-col">
      <h1 className="text-xl font-bold text-black">Approval Dashboard</h1>

      {/* Tabs */}
      <div className="flex items-center mt-2">
        {["PENDING", "APPROVED", "REJECTED"].map((s) => (
          <button
            key={s}
            onClick={() => {
              setStatus(s);
              setPage(1); // reset to first page when switching tabs
            }}
            className={`px-7 py-2 text-xs font-bold cursor-pointer ${
              status === s
                ? "bg-[#32B695] text-white"
                : "bg-white text-[#8B8A8A] hover:bg-green-200"
            } ${s === "PENDING" ? "rounded-l-md" : ""} ${
              s === "REJECTED" ? "rounded-r-md" : ""
            }`}
          >
            {s.charAt(0) + s.slice(1).toLowerCase()}
          </button>
        ))}
      </div>

      <p className="text-sm text-[#8B8A8A] py-3">List of Requests</p>

      {/* Requests list */}
      {requests.length === 0 ? (
        <p className="text-sm text-gray-500">No requests found</p>
      ) : (
        <RequestCard requests={requests}  status={status}/>
      )}

  {/* Pagination Controls */}
    {pagination ? (
      <div className="flex items-center gap-2 mt-4 text-sm text-gray-600">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-3 py-1 border rounded disabled:opacity-50">
          Prev
        </button>
        <span>
          Page {pagination.page} of {pagination.totalPages} ({pagination.total} total)
          {isFetching && <span className="ml-2 text-gray-400">⏳ Updating...</span>}
        </span>

        <button
          disabled={page >= pagination.totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="px-3 py-1 border rounded disabled:opacity-50">
          Next
        </button>
      </div>
    ) : null}
        </div>
      );
    }
