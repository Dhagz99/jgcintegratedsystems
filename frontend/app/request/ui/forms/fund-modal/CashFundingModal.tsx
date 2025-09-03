import React from "react";
import { CashCountSheet } from "../../../type/FundType";
import ButtonComponents from "../../../components/Buttons";
import { Cancel } from "@mui/icons-material";

type CashFundModalProps = {
  company: string;
  branch: string;
  rows: CashCountSheet[];
  onClose?: () => void;
  signatories?: {
    cashier: string;    
    countedBy: string;  
    countedlabel:string;
    notedBy: string;  
    notedlabel:string; 
    recommend:string;
    recommendlabel:string;
    approved:string;
    approvedlabel:string;
  };
};

const CashFundModal: React.FC<CashFundModalProps> = ({ company, branch, rows, onClose,signatories }) => {

  const fmtDate = (d: Date | string | null | undefined) =>
  d ? new Date(d).toLocaleDateString("en-PH", { year: "numeric", month: "short", day: "2-digit" }) : "—";

  const fmtNum = (n: number) =>
  n.toLocaleString("en-PH", { minimumFractionDigits: 2 });

  const totals = {
    fundTotal: rows.reduce((s, r) => s + Number(r.fundAmount ?? 0), 0),
    miscTotal: rows.reduce((s, r) => s + Number(r.miscExp ?? 0), 0),
    powerTotal: rows.reduce((s, r) => s + Number(r.billFee ?? 0), 0),
    teleTotal: rows.reduce((s, r) => s + Number(r.telFee ?? 0), 0),
    dueTotal: rows.reduce((s, r) => s + Number(r.dueMh ?? 0), 0),
  };



  return (
    <div className="flex flex-col space-y-4 relative min-h-[320px] max-h-[70vh] overflow-auto">
      <div className="flex justify-between px-2">
        <div>Company: {company}</div>
        <div>Branch: {branch}</div>
      </div>
      <div className="flex justify-between px-2">
        <div>
          Period: {fmtDate(rows[0]?.startDate)} - {fmtDate(rows.at(-1)?.endDate)}
        </div>
      </div>

      <table className="w-full border border-gray-300 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 font-semibold text-left">Date</th>
            <th className="p-2 font-semibold text-left">Payee</th>
            <th className="p-2 font-semibold text-left">Remarks</th>
            <th className="p-2 font-semibold text-left">Amount</th>
            <th className="p-2 font-semibold text-left">Misc. Exp.</th>
            <th className="p-2 font-semibold text-left">Power/Light</th>
            <th className="p-2 font-semibold text-left">Telephone</th>
            <th className="p-2 font-semibold text-left">Due to MH</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              <td className="p-2 text-left">{fmtDate(r.reqDate)}</td>
              <td className="p-2 text-left">{r.payee}</td>
              <td className="p-2 text-left">{r.remarks}</td>
              <td className="p-2 text-left">{r.fundAmount}</td>
              <td className="p-2 text-left">{r.miscExp}</td>
              <td className="p-2 text-left">{r.billFee}</td>
              <td className="p-2 text-left">{r.telFee}</td>
              <td className="p-2 text-left">{r.dueMh}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="bg-gray-50 font-semibold">
            <td className="p-2 text-left">Total</td>
            <td />
            <td />
            <td className="p-2 text-left">{fmtNum(totals.fundTotal)}</td>
            <td className="p-2 text-left">{fmtNum(totals.miscTotal)}</td>
            <td className="p-2 text-left">{fmtNum(totals.powerTotal)}</td>
            <td className="p-2 text-left">{fmtNum(totals.teleTotal)}</td>
            <td className="p-2 text-left">{fmtNum(totals.dueTotal)}</td>
          </tr>
        </tfoot>
      </table>

        <div className="flex flex-col justify-start">
        <div className="flex flex-col w-31">
           <p className="self-start">Prepared by:</p>
           <p className="self-start font-normal">(signed)</p>
        </div>
        <div className="flex flex-col">
            <p className="font-extrabold">{signatories?.cashier}</p>
            <p className="font-normal">{branch}</p>
        </div>
      </div>

      <div className="flex gap-50">

        <div className="flex flex-col justify-start">
          <div className="flex flex-col w-31">
            <p className="self-start">Checked by:</p>
            <p className="self-start font-normal">(signed)</p>
          </div>
          <div className="flex flex-col">
              <p className="font-extrabold">{signatories?.notedBy}</p>
              <p className="font-normal">{signatories?.notedlabel}</p>
          </div>
        </div>

        <div className="flex flex-col justify-start">
          <div className="flex flex-col w-31">
            <p className="self-start font-normal">(signed)</p>
          </div>
          <div className="flex flex-col">
              <p className="font-extrabold">{signatories?.countedBy}</p>
              <p className="font-normal">{signatories?.countedlabel}</p>
          </div>
        </div>

      </div>

      <div className="flex flex-col justify-start">
        <div className="flex flex-col w-31">
           <p className="self-start">Recommending Approval:</p>
           <p className="self-start font-normal">(signed)</p>
        </div>
        <div className="flex flex-col">
            <p className="font-extrabold">{signatories?.recommend}</p>
            <p className="font-normal">{signatories?.recommendlabel}</p>
        </div>
      </div>

      <div className="flex flex-col justify-start">
        <div className="flex flex-col w-31">
           <p className="self-start">Approved by:</p>
           <p className="self-start font-normal">(signed)</p>
        </div>
        <div className="flex flex-col">
            <p className="font-extrabold">{signatories?.approved}</p>
            <p className="font-normal">{signatories?.approvedlabel}</p>
        </div>
      </div>

      <div className="flex justify-end">
        <ButtonComponents label="Close" size="sm" icon={<Cancel />} onClick={onClose} />
      </div>
    </div>
  );
};

export default CashFundModal;
