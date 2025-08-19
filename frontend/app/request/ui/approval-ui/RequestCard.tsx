import { FormattedDate } from "@/app/utils/DateFormatter";
import ButtonComponents from "../../components/Buttons";
import { MainRequest } from "../../type/RequestType"
import { ApprovalTwoTone, HighlightOffTwoTone, VisibilityOutlined } from "@mui/icons-material"

type DataProps = {
    requests: MainRequest[];
}




export default function RequestCard( {requests} : DataProps){

        return(
      <div className="grid grid-cols-4 gap-4">
      {requests.length === 0 ? (
        <p className="text-sm text-gray-500 col-span-4 text-center">
          No requests found
        </p>
      ) : (
        requests.map((req: MainRequest) => (
          <div
            key={req.id}
            className="flex flex-col justify-between bg-white min-h-40 p-2 rounded-xl shadow-sm"
          >
            <div className="flex flex-col pb-1">
              <h3 className="text-center text-sm font-semibold">
                {req.requestType.requestName || "Request Title"}
              </h3>

              <div className="flex flex-col gap-1 mt-2">
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
            <div className="flex justify-evenly mt-2">
              <ButtonComponents
                label="View"
                variant="info"
                size="xs"
                icon={<VisibilityOutlined fontSize="small" />}
              />
              <ButtonComponents
                label="Approve"
                variant="success"
                size="xs"
                icon={<ApprovalTwoTone fontSize="small" />}
              />
              <ButtonComponents
                label="Reject"
                variant="danger"
                size="xs"
                icon={<HighlightOffTwoTone fontSize="small" />}
              />
            </div>
          </div>
        ))
      )}
    </div>
        )
}

