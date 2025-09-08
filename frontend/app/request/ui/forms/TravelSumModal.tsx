import React, { useState } from "react";
import { Cancel, List } from "@mui/icons-material";
import ButtonComponents from "../../components/Buttons";
import { MainRequest } from "../../type/RequestType";
import RequestModal from "../../components/RequestModal";
import TravelFundModal from "../forms/fund-modal/TravelFundingModal";
import CashFundModal from "../forms/fund-modal/CashFundingModal";

type Props = {
  onClose?: () => void;
  mainRequest: MainRequest | null;
};

type CashDemoItem = {
  denom: number;
  pieces: number;
  amount: number;
  checked: boolean;
};

const currency = (n: number) =>
  n.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

const TravelSummaryModal: React.FC<Props> = ({ onClose, mainRequest }) => {
  const [showReplenish, setShowReplenish] = useState(false);

  const cashDemo: CashDemoItem[] = Array.isArray(mainRequest?.countSheet.cashDemo)
    ? (mainRequest?.countSheet.cashDemo as CashDemoItem[])
    : JSON.parse((mainRequest?.countSheet.cashDemo as unknown as string) ?? "[]");

  const totalAmount = cashDemo.reduce((sum, it) => sum + it.amount, 0);

  const fmtDate = (d: Date | string | null | undefined) =>
    d ? new Date(d).toLocaleDateString("en-PH", { year: "numeric", month: "short", day: "2-digit" }) : "—";

  const fmtNum = (n: number) =>
  n.toLocaleString("en-PH", { minimumFractionDigits: 2 });

  const closeReplenish = () => setShowReplenish(false);

  return (
    <div className="space-y-4 relative min-h-[320px] max-h-[70vh] overflow-auto">
      <header className="text-center">
        <h3 className="font-semibold">EMB CAPITAL LENDING CORPORATION</h3>
        <h6>Cash Count Sheet</h6>
      </header>

      {/* Summary */}
      <section className="grid grid-cols-2 gap-4 text-sm">
        <div className="flex flex-col gap-1">
          <div>
            <span className="font-medium">Office: </span>
            {mainRequest?.requestFrom.companyName ?? ""}
          </div>
          <div>
            <span className="font-medium">Date Counted: </span>
            {fmtDate(mainRequest?.requestDate)}
          </div>
          <div>
            <span className="font-medium">Reference: </span>
            {mainRequest?.countSheet.reference}
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div>
            <span className="font-medium">Name of Fund: </span>
            {mainRequest?.countSheet.fundName}
          </div>
          <div>
            <span className="font-medium">Fund Amount: </span>
            {fmtNum(Number(mainRequest?.countSheet.fundAmount))}
          </div>
          <div>
            <span className="font-medium">Cash-Short (Over): </span>
            {fmtNum(Number(mainRequest?.countSheet.cashShort))}
          </div>
        </div>
      </section>

      {/* Cash Demo Table */}
      <section>
        <h6 className="font-semibold mb-2">Fund Counted as Follows</h6>
        <table className="w-full text-sm border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left p-2">Denomination</th>
              <th className="text-center p-2">Pieces</th>
              <th className="text-right p-2">Amount</th>
              <th className="text-center p-2">Checked</th>
            </tr>
          </thead>
          <tbody>
            {cashDemo.map((it: CashDemoItem, idx: number) => (
              <tr key={idx}>
                <td className="p-2">{currency(it.denom)}</td>
                <td className="p-2 text-center">{it.pieces}</td>
                <td className="p-2 text-right">{currency(it.amount)}</td>
                <td className="p-2 text-center">{it.checked ? "✓" : ""}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-gray-50 font-semibold">
              <td className="p-2">Totals</td>
              <td className="p-2"></td>
              <td className="p-2 text-right">{currency(totalAmount)}</td>
              <td className="p-2"></td>
            </tr>
          </tfoot>
        </table>
      </section>

      {/* Totals */}
      <section className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <span className="font-medium">Replenishment Amount: </span>
          {fmtNum(Number(mainRequest?.countSheet.repFund))}
        </div>
        <div>
          <span className="font-medium">Grand Total (Replenishment + Checked) :</span>
          {fmtNum(Number(mainRequest?.countSheet.totalFund))}
        </div>
      </section>

      <div className="flex flex-col py-5 gap-3 font-semibold">
        <p className="indent-10 px-2">I hereby certify that the fund was counted in my presence, and further acknowledged the same was return to me intact</p>
        <div className="flex flex-col justify-end text-end px-4">
          <div className="flex flex-col text-end">
             <p className="self-end font-normal">(signed)</p>
          </div>
          <div className="flex flex-col justify-center text-end">
              <p className="font-extrabold">{mainRequest?.requestBy.name}</p>
              <p className="font-normal text-[0.7rem]">Cashier</p>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-end w-fullpx-8 py-4 px-4 border-2 border-gray-300">
        <div className="flex flex-col  gap-4">
          <h1 className="text-[0.7rem]">Counted By:</h1>
          <p  className="font-extrabold"> {mainRequest?.requestType.checkedBy?.name ?? ''}</p>
        </div>
        <div className="flex flex-col  gap-4">
          <h1 className="text-[0.7rem]">Certified Correct:</h1>
          <p className="self-end font-normal">(signed)</p>
        </div>
        <div className="flex flex-col  gap-4">
          <h1 className="text-[0.7rem]">Noted:</h1>
          <p  className="font-extrabold"> {mainRequest?.requestType.checkedBy2?.name ?? ''}</p>
        </div>
      </div>


      {/* Actions */}
      <div className="flex justify-end gap-2 py-2">
        <ButtonComponents
          label="Replenishment"
          size="sm"
          variant="info"
          icon={<List />}
          type="button"
          onClick={() => setShowReplenish(true)}
        />
        <ButtonComponents
          label="Cancel"
          size="sm"
          icon={<Cancel />}
          type="button"
          variant="secondary"
          onClick={onClose}
        />
      </div>

      {/* Nested Modal */}
     {showReplenish && (
  <RequestModal size="lg" nested title="Fund Replenishment" onClose={closeReplenish}>
    {mainRequest?.countSheet.fundName === "Cash Fund" ? (
      <>
        {console.log("CashFund rows:", mainRequest?.countSheet.CashCountSheet ?? [])}
        <CashFundModal
          company={mainRequest?.requestFrom.companyName ?? ""}
          branch={mainRequest?.requestFrom.branchName ?? ""}
          rows={mainRequest?.countSheet.CashCountSheet ?? []}
          onClose={closeReplenish}
          signatories={{
            cashier: mainRequest?.requestBy.name ?? "",
            countedBy: mainRequest?.requestType.checkedBy?.name ?? "",
            countedlabel: mainRequest?.requestType.checkedBy?.position ?? "",
            notedBy: mainRequest?.requestType.checkedBy2?.name ?? "",
            notedlabel: mainRequest?.requestType.checkedBy2?.position ?? "",
            recommend: mainRequest?.requestType.recomApproval?.name ?? "",
            recommendlabel: mainRequest?.requestType.recomApproval?.position ?? "",
            approved: mainRequest?.requestType.approveBy?.name ?? "",
            approvedlabel: mainRequest?.requestType.recomApproval?.position ?? "",
          }}
        />
      </>
    ) : (
      <>
        {console.log("TravelFund rows:", mainRequest?.countSheet.TravelCountSheet ?? [])}

        <TravelFundModal
          company={mainRequest?.requestFrom.companyName ?? ""}
          branch={mainRequest?.requestFrom.branchName ?? ""}
          rows={mainRequest?.countSheet.TravelCountSheet ?? []}
          onClose={closeReplenish}
          signatories={{
            cashier: mainRequest?.requestBy.name ?? "",
            countedBy: mainRequest?.requestType.checkedBy?.name ?? "",
            countedlabel: mainRequest?.requestType.checkedBy?.position ?? "",
            notedBy: mainRequest?.requestType.checkedBy2?.name ?? "",
            notedlabel: mainRequest?.requestType.checkedBy2?.position ?? "",
            recommend: mainRequest?.requestType.recomApproval?.name ?? "",
            recommendlabel: mainRequest?.requestType.recomApproval?.position ?? "",
            approved: mainRequest?.requestType.approveBy?.name ?? "",
            approvedlabel: mainRequest?.requestType.recomApproval?.position ?? "",
          }}
        />
      </>
    )}
  </RequestModal>
)}

    </div>
  );
};

<<<<<<< HEAD
export default TravelSummaryModal;
=======
export default TravelSummaryModal;
>>>>>>> tester
