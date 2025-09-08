import { ApprovalTwoTone, HighlightOffTwoTone, VisibilityOutlined } from "@mui/icons-material";
import ButtonComponents from "../../components/Buttons";
import TransferRequestBar from "../../components/ProgressBar";
import BadgeComponent from "../../components/Badge";
import { MainRequest } from "../../type/RequestType";
import { useState } from "react";
import { useApproveRequest } from "../../hooks/useApproval";
import SweetAlert from "../../components/Swal";
import { showError, showSuccess } from "../../components/ToastAlert";
import ViewFundTransferAction from "../request-view-action/ViewFundTransferAction";
import RequestModal from "../../components/RequestModal";
import { ViewApprovalTravelOrder } from "../request-view/ViewTravelOrder";
import { FormattedDate } from "@/app/utils/DateFormatter";

type dataProps = {
    mainRequest: MainRequest | null;
}

export default function PreviewMonitorRequest ( {mainRequest} : dataProps){
    const [viewRequest, setViewRequest] = useState(false);
    const approveMutation = useApproveRequest();
    const handleViewRequest = () => {
        setViewRequest(true);
    }
    const closeModal = () => {
        setViewRequest(false);
    }

    const handleApproveRequest = () => {
        if(mainRequest){
            SweetAlert.confirmationAlert(
                'Are you sure?', 
                'You want to approve this <b><u>' + mainRequest?.requestType.requestName + '</u></b>' + ' request submitted by ' +   ' request submitted by <b>' + mainRequest.requestBy.name + '</b>'  ,
                    ()=>{
                      approveMutation.mutate(
                        { id: mainRequest.id, action: "APPROVED" },
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
        }
    };


    const handleRejectRequest = () => {
        if(mainRequest){
            SweetAlert.confirmationAlert(
                'Are you sure?', 
                'You want to reject this ' + mainRequest.requestType.requestName + ' request submitted by ' + mainRequest.requestBy.name,
                    ()=>{
                      approveMutation.mutate(
                        { id: mainRequest.id, action: "REJECTED" },
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
        }
    };
    
    
        console.log("req: ", mainRequest);
        const badgeType =
        mainRequest?.status === "APPROVED"
        ? "success"
        : mainRequest?.status === "REJECTED"
        ? "danger"
        : mainRequest?.status === "PENDING"
        ? "warning"
        : "default"; // fallback if status is something else
      const badgeLabel = mainRequest?.status ?? "UNKNOWN";
    
        return(
       <div className="flex flex-col max-w-100 justify-between p-2.5  border border-[#D5D5D5] gap-3 rounded-md">
                <div className="flex flex-col gap-2">
                    <div className="flex justify-between">
                          <div className="">
                            <p className="text-md font-bold text-black leading-tight">{mainRequest?.requestType.requestName}</p>
                            <p className="text-sm text-gray-500 font-bold">{mainRequest?.referenceCode ?? ""}</p>
                          </div>
                          <div>
                             <BadgeComponent type ={badgeType} label ={badgeLabel}/>
                          </div>
                    </div> 
                    
                    <TransferRequestBar mainRequest={mainRequest}/>
                    <div className=" flex flex-col border border-gray-400 w-full min-h-50 cursor-pointer gap-2 p-2 pb-5 ">
                      <div className=" flex justify-start flex-col bg-white w-full h-full hover:bg-gray-100 p-4 gap-2">
                            <h1 className="text-center text-xl font-bold">Request Details</h1>
                            <h5 className="text-xl font-bold">{mainRequest?.requestFrom.branchName ?? ""}</h5>
                            <div className="flex gap-3">
                              <label htmlFor="">Date : </label>
                              <h5 className="font-bold"><FormattedDate value={mainRequest?.requestDate} /></h5>
                            </div>
                            <div className="flex gap-3">
                              <label htmlFor="">Requested By : </label>
                              <h5 className="font-bold">{mainRequest?.requestBy.name ?? ""}</h5>
                            </div>
                            {mainRequest?.requestType.id === 1 && (
                              <div className="flex gap-3">
                                <label htmlFor="">To : </label>
                                <h5 className="font-bold">{mainRequest?.fundTransfer.requestTo?.name?? ""}</h5>
                            </div>
                            )}
                         
                      </div>
                      <div className="flex justify-center gap-2">
                                  <ButtonComponents
                                          label="View"
                                          variant="info"
                                          size="xs"
                                          icon={<VisibilityOutlined fontSize="small" />}
                                          onClick={(e)=>handleViewRequest()}
                                        />
                                        <ButtonComponents
                                          label="Approve"
                                          variant="success"
                                          size="xs"
                                          icon={<ApprovalTwoTone fontSize="small" />}
                                          onClick={(e)=>handleApproveRequest()}
                                        />
                                        <ButtonComponents
                                          label="Reject"
                                          variant="danger"
                                          size="xs"
                                          icon={<HighlightOffTwoTone fontSize="small" />}
                                          onClick={(e)=>handleRejectRequest()}
                                        />
                      </div>
                    </div>
                </div>
                 
                             {(viewRequest && mainRequest?.requestTypeId === 1) &&(
                                  <RequestModal size="lg" title="Fund Transfer Details" onClose={closeModal} >
                                       <ViewFundTransferAction mainRequest = {mainRequest} onClose={closeModal} />
                                  </RequestModal>
                                )}
                      
                                  {(viewRequest && mainRequest?.requestTypeId === 2) &&(
                                  <RequestModal size="xl" title="Travel Order Details" onClose={closeModal}>
                                       <ViewApprovalTravelOrder mainRequest = {mainRequest} onClose={closeModal} />
                                  </RequestModal>
                                )}
            </div>
        )
}