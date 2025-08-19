import { Add } from "@mui/icons-material";
import ButtonComponents from "../../components/Buttons";
import { useState } from "react";
import RequestModal from "../../components/RequestModal";
import { useFetchRequestType } from "../../hooks/useRequest";
import { RequestType } from "../../lib/request.schema"; 
import AddRequestModal from "../forms/AddRequestModal";

export default function RequestConfigurationModal() {
  const [addModal, setAddModal] = useState(false);
  const [selectedChecker, setSelectedChecker] = useState<RequestType | null>(null);

  const handleAdd = () => setAddModal(true);
  const handleCloseModal = () => {
    setAddModal(false);
    setSelectedChecker(null);
  };

  const { data, isLoading, isError, error } = useFetchRequestType();

  const rows = data ?? []; // already an array thanks to the hook

  return (
    <div className="flex flex-col">
      <div className="flex justify-center">
        <h2 className="text-xl font-semibold">Request Configuration</h2>
      </div>

      <div className="flex">
        <ButtonComponents label="Add" size="sm" icon={<Add />} onClick={handleAdd} />
      </div>

      <div className="relative overflow-auto mt-2.5 max-w-240 max-h-100">
      <table className="min-w-max text-xs text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs  text-gray-700 uppercase bg-gray-100 ">
            <tr>
              <th scope="col" className="px-6 py-3 rounded-tl-xl">Action</th>
              <th scope="col" className="px-6 py-3">Request Type</th>
              <th scope="col" className="px-6 py-3">Noted by</th>
              <th scope="col" className="px-6 py-3">Checked by</th>
              <th scope="col" className="px-6 py-3">Checked by 2</th>
              <th scope="col" className="px-6 py-3">Rec. Approval</th>
              <th scope="col" className="px-6 py-3">Rec. Approval 2</th>
              <th scope="col" className="px-6 py-3 rounded-tr-xl">Approved by</th>
            </tr>
          </thead>

          <tbody>
            {isLoading && (
              <tr>

                <td colSpan={8} className="px-6 py-4 text-center">Loading...</td>
              </tr>
            )}

            {isError && (
              <tr>
                <td colSpan={8} className="px-6 py-4 text-center">Error: {(error as Error)?.message ?? "Failed to load"}</td>
              </tr>
            )}

            {!isLoading && !isError && rows.length === 0 && (
              <tr>
                <td colSpan={8} className="px-6 py-4 text-center">No request types found.</td>
              </tr>
            )}

              {!isLoading && !isError && rows.map((rt) => (
                  <tr key={rt.id} className="bg-white border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-6 py-1.5">{/* actions */}</td>
                    <td className="px-6 py-1.5">{rt.requestName}</td>
                    <td className="px-6 py-1.5">{rt.notedBy?.checkerName?.name ?? ""}</td>
                    <td className="px-6 py-1.5">{rt.checkedBy?.checkerName?.name ?? ""}</td>
                    <td className="px-6 py-1.5">{rt.checkedBy2?.checkerName?.name ?? ""}</td>
                    <td className="px-6 py-1.5">{rt.recomApproval?.checkerName?.name ?? ""}</td>
                    <td className="px-6 py-1.5">{rt.recomApproval2?.checkerName?.name ?? ""}</td>
                    <td className="px-6 py-1.5">{rt.approveBy?.checkerName?.name ?? ""}</td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>

      {addModal && (
        <RequestModal size="xl" nested title="Add Request" onClose={handleCloseModal}>
          <AddRequestModal onClose={handleCloseModal} selectedData={selectedChecker} />
        </RequestModal>
      )}
    </div>
  );
}
