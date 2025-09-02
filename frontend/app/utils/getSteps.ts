import { MainRequest } from "../request/type/RequestType";

type Step = { id: number;  userID:  number | undefined, label: string };

export function buildSteps(mainRequest: MainRequest | null): Step[] {
    const requestType = mainRequest?.requestType;
  if (!mainRequest?.requestType) {
    return [{ id: 1, userID: mainRequest?.requestById, label: "Submit Request" }];
  }

  const steps: Step[] =[{ id: 1, userID: mainRequest?.requestById, label: "Submit Request" }];
  let stepId = 2;
  if (requestType?.notedById) {
    steps.push({
      id: stepId++,
      userID: requestType?.notedById,
      label: `Noted By (${requestType.notedBy?.name ?? "N/A"})`,
    });
  }
  if (requestType?.checkedById) {
    steps.push({
      id: stepId++,
      userID: requestType.checkedById,
      label: `Checked By (${requestType.checkedBy?.name ?? "N/A"})`,
    });
  }
  if (requestType?.checkedBy2Id) {
    steps.push({
      id: stepId++,
      userID: requestType.checkedBy2Id,
      label: `Checked By (${requestType.checkedBy2?.name ?? "N/A"})`,
    });
  }
  if (requestType?.recomApprovalId) {
    steps.push({
      id: stepId++,
      userID: requestType.recomApprovalId,
      label: `Recommending Approval (${requestType.recomApproval?.name ?? "N/A"})`,
    });
  }
  if (requestType?.recomApproval2Id) {
    steps.push({
      id: stepId++,
      userID: requestType.recomApproval2Id,
      label: `Recommending Approval (${requestType.recomApproval2?.name ?? "N/A"})`,
    });
  }
  if (requestType?.approveById) {
    steps.push({
      id: stepId++,
      userID: requestType.approveById,
      label: `Final Approval (${requestType.approveBy?.name ?? "N/A"})`,
    });
  }

  return steps;
}
