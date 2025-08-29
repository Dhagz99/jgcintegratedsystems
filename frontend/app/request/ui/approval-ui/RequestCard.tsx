import { FormattedDate } from "@/app/utils/DateFormatter";
import ButtonComponents from "../../components/Buttons";
import { MainRequest } from "../../type/RequestType"
import { ApprovalTwoTone, HighlightOffTwoTone, VisibilityOutlined } from "@mui/icons-material"
import ViewFundTransfer from "../request-view/ViewFundTransfer";
import { useState } from "react";
import RequestModal from "../../components/RequestModal";
import { useApproveRequest } from "../../hooks/useApproval";
import { showError, showSuccess } from "../../components/ToastAlert";
import SweetAlert from "../../components/Swal";
import ViewFundTransferAction from "../request-view-action/ViewFundTransferAction";
import { ViewApprovalTravelOrder } from "../request-view/ViewTravelOrder";

type DataProps = {
    requests: MainRequest[];
    status?: string;
}

export default function RequestCard( {requests, status ="PENDING"} : DataProps){
      const [viewRequest, setViewRequest] = useState(false);
      const [selectedRequest, setSelectedRequest] = useState<MainRequest | null>(null);
      const approveMutation = useApproveRequest();

      console.log("selectedRequest request",selectedRequest);

      const handleViewRequest = (req: MainRequest) => {
          setSelectedRequest(req);
          setViewRequest(true);
          console.log("req Dta ", req);
      }


      const closeModal = () => {
          setViewRequest(false);
      }



      const handleApproveRequest = (req: MainRequest) => {
        SweetAlert.confirmationAlert(
          'Are you sure?', 
          'You want to approve this <b><u>' + req.requestType.requestName + '</u></b>' + ' request submitted by ' +   ' request submitted by <b>' + req.requestBy.name + '</b>'  ,
              ()=>{
                approveMutation.mutate(
                  { id: req.id, action: "APPROVED" },
                  {
                    onSuccess: (data) => {
                      showSuccess({ message: "Request approved!", position: "top-center" });
                    },
                    onError: (error) => {
                      console.error("Error approving:", error);
                      showError({ message: "Failed to approve request", position: "top-center" });
                    },
                  }
                );
              }
          )
      };


      const handleRejectRequest = (req: MainRequest) => {
        SweetAlert.confirmationAlert(
          'Are you sure?', 
          'You want to reject this ' + req.requestType.requestName + ' request submitted by ' + req.requestBy.name,
              ()=>{
                approveMutation.mutate(
                  { id: req.id, action: "REJECTED" },
                  {
                    onSuccess: (data) => {
                      showSuccess({ message: "Request rejected!", position: "top-center" });
                    },
                    onError: (error) => {
                      console.error("Error approving:", error);
                      showError({ message: "Failed to reject request", position: "top-center" });
                    },
                  }
                );
              }
          )
      };
      
        return(
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {requests.length === 0 ? (
        <p className="text-sm text-gray-500 col-span-4 text-center">
          No requests found
        </p>
      ) : (
        requests.map((req: MainRequest) => (
          <div key={req.id}
            className="flex flex-col justify-between bg-white max-h-70 min-h-50 py-2 rounded-xl shadow-md">
            <div className="flex flex-col pb-1">
              <div className="border-b-3 pb-2 border-[#f2f7f4]">
                <h3 className="text-center text-md font-bold ">
                  {req.requestType.requestName || "Request Title"}
                </h3>
              </div>
              <div className="flex flex-col gap-1   px-2 py-1">
                <div className="flex flex-col">
                  <p className="text-[.65rem] text-gray-500">Requested By:</p>
                  <p className="text-xs font-semibold">{req.requestBy.name}</p>
                </div>
                <div className="flex flex-col">
                  <p className="text-[.65rem] text-gray-500">Branch:</p>
                  <p className="text-xs font-semibold">{req.requestFrom.branchName}</p>
                </div>
                <div className="flex flex-col">
                  <p className="text-[.65rem] text-gray-500">Date:</p>
                  <p className="text-xs font-semibold">
                      <FormattedDate value={req.requestDate} />
                  </p>
                </div>
                <div className="flex flex-col">
                  <p className="text-[.65rem] text-gray-500">Status:</p>
                  <p className="text-xs font-semibold">{req.status}</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-evenly ">
              <ButtonComponents
                label="View"
                variant="info"
                size="xs"
                icon={<VisibilityOutlined fontSize="small" />}
                onClick={(e)=>handleViewRequest(req)}
              />
              <ButtonComponents
                label="Approve"
                variant="success"
                size="xs"
                icon={<ApprovalTwoTone fontSize="small" />}
                disabled={status !== "PENDING"} 
                onClick={(e)=>handleApproveRequest(req)}
              />
              <ButtonComponents
                label="Reject"
                variant="danger"
                size="xs"
                disabled={status !== "PENDING"} 
                icon={<HighlightOffTwoTone fontSize="small" />}
                onClick={(e)=>handleRejectRequest(req)}
              />
            </div>
          </div>
        ))
      )}
          {(viewRequest && selectedRequest?.requestTypeId === 2) &&(
            <RequestModal size="lg" >
                 <ViewFundTransferAction mainRequest = {selectedRequest} onClose={closeModal} />
            </RequestModal>
          )}
            {(viewRequest && selectedRequest?.requestTypeId === 1) &&(
            <RequestModal size="xl" title="Travel Order Details" onClose={closeModal}>
                 <ViewApprovalTravelOrder mainRequest = {selectedRequest} onClose={closeModal} />
            </RequestModal>
          )}
      </div>
        )
}

