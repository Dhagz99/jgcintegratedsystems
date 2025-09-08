import React from "react";
import { TravelCountSheet } from "../../../type/FundType";
import ButtonComponents from "../../../components/Buttons";
import { Cancel } from "@mui/icons-material";

type TravelFundModalProps = {
  company: string;
  branch: string;
  rows: TravelCountSheet[];
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

const TravelFundModal: React.FC<TravelFundModalProps> = ({ company, branch, rows, onClose,signatories }) => {

  const fmtDate = (d: Date | string | null | undefined) =>
  d ? new Date(d).toLocaleDateString("en-PH", { year: "numeric", month: "short", day: "2-digit" }) : "—";
   
  const fmtNum = (n: number) =>
  n.toLocaleString("en-PH", { minimumFractionDigits: 2 });

  const totals = {
    fuel: rows.reduce((s, r) => s + Number(r.fuel ?? 0), 0),
    total: rows.reduce((s, r) => s + Number(r.totalFee ?? 0), 0),
  };

  return (
    <div className="flex flex-col space-y-4 relative min-h-[320px] max-h-[70vh] overflow-auto">
      <div className="flex justify-between px-2">
        <div>Company: {company}</div>
        <div>Branch: {branch}</div>
      </div>
      <div className="flex justify-between px-2">
        <div>  
          Marketing Officers: {[...new Set(rows.flatMap(r => r.tagsField ?? []))].join(", ")}
        </div>
        <div>
          Period: {fmtDate(rows[0]?.startDate)} - {fmtDate(rows.at(-1)?.endDate)}
        </div>
      </div>

      <table className="w-full border border-gray-300 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 font-semibold text-left">Date</th>
            <th className="p-2 font-semibold text-left">Travelling</th>
            <th className="p-2 font-semibold text-left">Fuel</th>
            <th className="p-2 font-semibold text-left">Repairs</th>
            <th className="p-2 font-semibold text-left">Litigation</th>
            <th className="p-2 font-semibold text-left">Total</th>
            <th className="p-2 font-semibold text-left">KM</th>
            <th className="p-2 font-semibold text-left">Remarks</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              <td className="p-2 text-left">{fmtDate(r.reqDate)}</td>
              <td className="p-2 text-left">{r.travelling}</td>
              <td className="p-2 text-left">{r.fuel}</td>
              <td className="p-2 text-left">{r.repair.join(", ")}</td>
              <td className="p-2 text-left">{r.litigation}</td>
              <td className="p-2 text-left">{r.totalFee}</td>
              <td className="p-2 text-left">{r.kilometer}</td>
              <td className="p-2 text-left">{r.remarks}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="bg-gray-50 font-semibold">
            <td className="p-2 text-left">Totals</td>
            <td />
            <td className="p-2 text-left">{fmtNum(totals.fuel)}</td>
            <td />
            <td />
            <td className="p-2 text-left">{fmtNum(totals.total)}</td>
            <td />
            <td />
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

<<<<<<< HEAD
export default TravelFundModal;
=======
export default TravelFundModal;
>>>>>>> tester
