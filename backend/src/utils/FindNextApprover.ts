export function findNextApprover(reqType: any, approval: any) {
  const appr = Array.isArray(approval) ? approval[0] : approval;
  if (!appr) return null;
  if (appr.notedBy === "PENDING") return reqType.notedBy?.userId;
  if (appr.checkedBy === "PENDING") return reqType.checkedBy?.userId;
  if (appr.checkedBy2 === "PENDING") return reqType.checkedBy2?.userId;
  if (appr.recomApproval === "PENDING") return reqType.recomApproval?.userId;
  if (appr.recomApproval2 === "PENDING") return reqType.recomApproval2?.userId;
  if (appr.approveBy === "PENDING") return reqType.approveBy?.userId;

  return null;
}
