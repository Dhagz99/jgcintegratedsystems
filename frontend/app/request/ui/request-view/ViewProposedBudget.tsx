"use client";
import { useMemo,useState } from "react";
import React from "react";
import { ExpenseType,BudgetItem } from "../../type/FormType";
import SweetAlert from "../../components/Swal";
import { useAddProposedBudget } from "../../hooks/userForm";
import { FormPropsProposedBudget } from "../../type/FormType";
import { capitalizeWords } from "@/app/utils/CapitalizeWords";

export default function ViewProposedBudget({requestType,formData,onClose,onReset,onSuccess}: FormPropsProposedBudget) {
    const { mutateAsync: addPB, isPending, error } = useAddProposedBudget();
    const [submissionStatus, setSubmissionStatus] = useState<"idle" | "success" | "error">("idle");
    
    const items = formData?.items ?? [];
    const branchName = formData?.branchName ?? "";
    const monthOf = formData?.monthOf ?? "";
    const requestFromId = formData?.requestFromId ?? 0;
    const categories: ExpenseType[] = ["ADMIN & PERSONNEL", "OFFICE & OTHER", "UNBUDGETED"];
  
    const toNum2 = (v: string) => {
      const n = Number(String(v ?? "").replace(/,/g, ""));
      return isNaN(n) ? 0 : n;
    };
  
    const fmt = (n: number) =>
      n.toLocaleString("en-US", { maximumFractionDigits: 2 });
  
    const grandTotals = items.reduce(
      (acc, i) => {
        const b = toNum2(i.budget);
        const t = toNum2(i.total_expenses);
        const p = toNum2(i.proposed_budget);
        acc.budget += b;
        acc.totalExpenses += t;
        acc.variance += b - t;
        acc.proposedBudget += p;
        return acc;
      },
      { budget: 0, totalExpenses: 0, variance: 0, proposedBudget: 0 }
    );
  
    const toNum = (v: string) => (v ? Number(v) : 0);
  
    const savedMonth = useMemo(
      () => [...items].reverse().find((i) => i.month_of)?.month_of ?? "",
      [items]
    );
  
    const monthSource = monthOf && monthOf !== "" ? monthOf : savedMonth;
  
    const formattedMonth = monthSource
      ? new Date(`${monthSource}-01`).toLocaleString("default", {
          month: "long",
          year: "numeric",
        }).toUpperCase()
      : "";
  
    const prevMonth = monthSource
      ? (() => {
          const date = new Date(`${monthSource}-01`);
          date.setMonth(date.getMonth() - 1);
          return date.toLocaleString("default", {
            month: "long",
          }).toUpperCase();
        })()
      : "";
  
    const handleSubmit = async () => {
      setSubmissionStatus("idle");
      try {
        await addPB({
          items,
          form_type: "proposed_budget",
          requestFromId,
        });
        setSubmissionStatus("success");
        onSuccess?.();
      } catch (err) {
        console.error("Submission error:", err);
        setSubmissionStatus("error");
      }
    };
  
    const handleConfirmSubmit = () => {
      SweetAlert.confirmationAlert(
        "Confirm Save",
        "Are you sure you want to submit this with E signature?",
        handleSubmit
      );
    };


    
    
    
  return (
    <div className="space-y-2 py-8 px-15 max-h-[70vh] overflow-y-auto">

      <div className="flex justify-between">
     
        <div className="font-bold">
          <div>
       
            <h2> {branchName} BRANCH</h2>
  
          </div>
          <div>
            <h2>PROPOSED BUDGET</h2>
          </div>
          <div>
            <h2>FOR THE MONTH {formattedMonth}</h2>
          </div>
        </div>

      </div>

      <table className="w-full border border-gray-300 text-sm">
        <thead className="bg-gray-100">
          <tr className="text-center">
            <th className="border px-2 py-1"></th>
            <th className="border px-2 py-1">BUDGET</th>
            <th className="border px-2 py-1">TOTAL EXP</th>
            <th className="border px-2 py-1">VARIANCE</th>
            <th className="border px-2 py-1">PROPOSED BUDGET</th>
            <th className="border px-2 py-1">REMARKS</th>
          </tr>
        </thead>
        <tbody>
          <tr className="text-center border font-bold">
            <td className="border">OPERATING EXPENSE</td>
            <td className="border">{prevMonth}</td>
            <td className="border">{prevMonth}</td>
            <td className="border"></td>
            <td className="border"></td>
            <td className="border"></td>
          </tr>

          {categories.map((category) => {
            const groupItems = items.filter((i) => i.expense_type === category);

            const totals = groupItems.reduce(
              (acc, i) => {
                acc.budget += toNum(i.budget);
                acc.totalExpenses += toNum(i.total_expenses);
                acc.variance += toNum(i.budget) - toNum(i.total_expenses);
                acc.proposedBudget += toNum(i.proposed_budget);
                return acc;
              },
              { budget: 0, totalExpenses: 0, variance: 0, proposedBudget: 0 }
            );

            return (
              <React.Fragment key={category}>
                <tr className="bg-gray-50 font-semibold">
                  <td className="border px-2 py-1 font-bold" colSpan={6}>
                    {category} EXP:
                  </td>
                </tr>
                {groupItems.map((item, idx) => (
                  <tr key={idx}>
                    <td className="border px-2 py-1">{item.description}</td>
                    <td className="border px-2 py-1 text-right">{item.budget}</td>
                    <td className="border px-2 py-1 text-right">{item.total_expenses}</td>
                    <td className="border px-2 py-1 text-right">
                      {(toNum(item.budget) - toNum(item.total_expenses)).toFixed(2)}
                    </td>
                    <td className="border px-2 py-1 text-right">{item.proposed_budget}</td>
                    <td className="border px-2 py-1">{item.remarks}</td>
                  </tr>
                ))}
                <tr className="bg-gray-100 font-semibold">
                  <td className="border px-2 py-1 text-right">Subtotal:</td>
                  <td className="border px-2 py-1 text-right">{totals.budget}</td>
                  <td className="border px-2 py-1 text-right">{totals.totalExpenses}</td>
                  <td className="border px-2 py-1 text-right">{totals.variance.toFixed(2)}</td>
                  <td className="border px-2 py-1 text-right">{totals.proposedBudget}</td>
                  <td className="border px-2 py-1"></td>
                </tr>
                <tr>
                  <td colSpan={6} className="border">
                    <span className="invisible">sdf</span>
                  </td>
                </tr>
              </React.Fragment>
            );
          })}

          <tr className="text-center font-bold">
            <td className="text-left">TOTAL EXPENSES</td>
            <td className="border-b-4 border-double text-right">{fmt(grandTotals.budget)}</td>
            <td className="border-b-4 border-double text-right">{fmt(grandTotals.totalExpenses)}</td>
            <td className="border-b-4 border-double text-right">{fmt(grandTotals.variance)}</td>
            <td className="border-b-4 border-double text-right">{fmt(grandTotals.proposedBudget)}</td>
            <td></td>
          </tr>
        </tbody>
      </table>

      <div className="mt-6 flex gap-x-12 text-xs">
         <div>
            <h2 className="font-extrabold mb-1">PREPARED BY:</h2>
            <h2 className="font-bold">{formData?.requestedBy?.toLocaleUpperCase()}</h2>
            <h2 className="font-semibold">{formData?.requestedPosition}-{formData?.branchName}</h2>
         </div>

         <div className="flex gap-x-6">
      
            <div>
                <h2 className="font-extrabold mb-1 text-left">CHECKED BY:</h2>
                <h2 className="font-bold">{requestType?.checkedBy?.name.toLocaleUpperCase()}</h2>
                <h2 className="font-semibold">{capitalizeWords(requestType?.checkedBy?.position ?? "")}</h2>
            </div>

            <div className="mt-5">
                <h2 className="font-bold">{requestType?.checkedBy2?.name.toLocaleUpperCase()}</h2>
                <h2 className="font-semibold">{capitalizeWords(requestType?.checkedBy2?.position ?? "")}</h2>
            </div>
        
         </div>

         <div className="flex gap-x-4">
         <div>
                <h2 className="font-extrabold mb-1 text-left">APPROVED BY:</h2>
                <h2 className="font-bold">{requestType?.approveBy?.name.toLocaleUpperCase()}</h2>
                <h2 className="font-semibold">{capitalizeWords(requestType?.approveBy?.position ?? "")}</h2>
            </div>

            {/* <div className="mt-6">
                <h2 className="font-semibold ml-2">{requestType?.appr?.name}</h2>
                <h2 className="font-semibold ml-2">{requestType?.checkedBy2?.position}</h2>
            </div> */}
         </div>


      </div>

      <div className="mb-8 pb-4">
        <button className={`bg-green-800 hover:bg-green-700 flex justify-end float-right py-1 text-white px-8 rounded ${isPending ? "opacity-50 cursor-not-allowed" : ""}`}
          onClick={handleConfirmSubmit}
          disabled={isPending}>
          {isPending ? "Submitting..." : "Submit"}
        </button>
        {submissionStatus === "error" && (
          <p className="text-red-600 mt-2">
            Error submitting: {error?.message || "Please try again."}
          </p>
        )}
      </div>
      
    </div>
  );
}

























export function ViewApprovalProposedBudget({mainRequest, formData, onClose}:FormPropsProposedBudget){
  const items = (mainRequest?.proposedBudget ?? []) as BudgetItem[];
  const branchName = mainRequest?.requestFrom?.branchName ?? "";
  const requestFromId = mainRequest?.requestFrom?.id ?? 0;
  const monthOf = items.length > 0 ? items[0].month_of ?? "" : "";


  
    const categories: ExpenseType[] = ["ADMIN & PERSONNEL", "OFFICE & OTHER", "UNBUDGETED"];
  
    const toNum2 = (v: string) => {
      const n = Number(String(v ?? "").replace(/,/g, ""));
      return isNaN(n) ? 0 : n;
    };
  
    const fmt = (n: number) =>
      n.toLocaleString("en-US", { maximumFractionDigits: 2 });
  
    const grandTotals = items.reduce(
      (acc, i) => {
        const b = toNum2(i.budget);
        const t = toNum2(i.total_expenses);
        const p = toNum2(i.proposed_budget);
        acc.budget += b;
        acc.totalExpenses += t;
        acc.variance += b - t;
        acc.proposedBudget += p;
        return acc;
      },
      { budget: 0, totalExpenses: 0, variance: 0, proposedBudget: 0 }
    );
  
    const toNum = (v: string) => (v ? Number(v) : 0);
  
    const savedMonth = useMemo(
      () => [...items].reverse().find((i) => i.month_of)?.month_of ?? "",
      [items]
    );
  
    const monthSource = monthOf && monthOf !== "" ? monthOf : savedMonth;
  
    const formattedMonth = monthSource
      ? new Date(`${monthSource}-01`).toLocaleString("default", {
          month: "long",
          year: "numeric",
        }).toUpperCase()
      : "";
  
    const prevMonth = monthSource
      ? (() => {
          const date = new Date(`${monthSource}-01`);
          date.setMonth(date.getMonth() - 1);
          return date.toLocaleString("default", {
            month: "long",
          }).toUpperCase();
        })()
      : "";
  




    return(
      <div className="space-y-2 py-8 px-15 max-h-[70vh] overflow-y-auto">

      <div className="flex justify-between">
     
        <div className="font-bold">
          <div>
       
            <h2>  {mainRequest?.requestFrom.branchName} BRANCH</h2>
  
          </div>
          <div>
            <h2>PROPOSED BUDGET</h2>
          </div>
          <div>
             <h2>FOR THE MONTH {formattedMonth}</h2> 
          </div>
        </div>

      </div>

      <table className="w-full border border-gray-300 text-sm">
        <thead className="bg-gray-100">
          <tr className="text-center">
            <th className="border px-2 py-1"></th>
            <th className="border px-2 py-1">BUDGET</th>
            <th className="border px-2 py-1">TOTAL EXP</th>
            <th className="border px-2 py-1">VARIANCE</th>
            <th className="border px-2 py-1">PROPOSED BUDGET</th>
            <th className="border px-2 py-1">REMARKS</th>
          </tr>
        </thead>
        <tbody>
          <tr className="text-center border font-bold">
            <td className="border">OPERATING EXPENSE</td>
            <td className="border">{prevMonth}</td>
            <td className="border">{prevMonth}</td>
            <td className="border"></td>
            <td className="border"></td>
            <td className="border"></td>
          </tr>

          {categories.map((category) => {
            const groupItems = items.filter((i) => i.expense_type === category);

            const totals = groupItems.reduce(
              (acc, i) => {
                acc.budget += toNum(i.budget);
                acc.totalExpenses += toNum(i.total_expenses);
                acc.variance += toNum(i.budget) - toNum(i.total_expenses);
                acc.proposedBudget += toNum(i.proposed_budget);
                return acc;
              },
              { budget: 0, totalExpenses: 0, variance: 0, proposedBudget: 0 }
            );

            return (
              <React.Fragment key={category}>
                <tr className="bg-gray-50 font-semibold">
                  <td className="border px-2 py-1 font-bold" colSpan={6}>
                    {category} EXP:
                  </td>
                </tr>
                {groupItems.map((item, idx) => (
                  <tr key={idx}>
                    <td className="border px-2 py-1">{item.description}</td>
                    <td className="border px-2 py-1 text-right">{item.budget}</td>
                    <td className="border px-2 py-1 text-right">{item.total_expenses}</td>
                    <td className="border px-2 py-1 text-right">
                      {(toNum(item.budget) - toNum(item.total_expenses)).toFixed(2)}
                    </td>
                    <td className="border px-2 py-1 text-right">{item.proposed_budget}</td>
                    <td className="border px-2 py-1">{item.remarks}</td>
                  </tr>
                ))}
                <tr className="bg-gray-100 font-semibold">
                  <td className="border px-2 py-1 text-right">Subtotal:</td>
                  <td className="border px-2 py-1 text-right">{totals.budget}</td>
                  <td className="border px-2 py-1 text-right">{totals.totalExpenses}</td>
                  <td className="border px-2 py-1 text-right">{totals.variance.toFixed(2)}</td>
                  <td className="border px-2 py-1 text-right">{totals.proposedBudget}</td>
                  <td className="border px-2 py-1"></td>
                </tr>
                <tr>
                  <td colSpan={6} className="border">
                    <span className="invisible">sdf</span>
                  </td>
                </tr>
              </React.Fragment>
            );
          })}

          <tr className="text-center font-bold">
            <td className="text-left">TOTAL EXPENSES</td>
            <td className="border-b-4 border-double text-right">{fmt(grandTotals.budget)}</td>
            <td className="border-b-4 border-double text-right">{fmt(grandTotals.totalExpenses)}</td>
            <td className="border-b-4 border-double text-right">{fmt(grandTotals.variance)}</td>
            <td className="border-b-4 border-double text-right">{fmt(grandTotals.proposedBudget)}</td>
            <td></td>
          </tr>

          
        </tbody>
      </table>

      <div className="mt-6 flex gap-x-12 text-xs">
         <div>
            <h2 className="font-extrabold mb-1">PREPARED BY:</h2>
            <h2 className="font-bold">{mainRequest?.requestBy.name.toLocaleUpperCase()}</h2>
            <h2 className="font-semibold">{mainRequest?.requestBy.position}</h2>
         </div>

         <div className="flex gap-x-6">
      
            <div>
                <h2 className="font-extrabold mb-1 text-left">CHECKED BY:</h2>
                <h2 className="font-bold">{mainRequest?.requestType.checkedBy?.name.toLocaleUpperCase()}</h2>
                <h2 className="font-semibold">{mainRequest?.requestType.checkedBy?.position.toLocaleUpperCase()}</h2>
            </div>

            <div className="mt-5">
                <h2 className="font-bold">{mainRequest?.requestType.checkedBy2?.name.toLocaleUpperCase()}</h2>
                <h2 className="font-semibold">{mainRequest?.requestType.checkedBy2?.position.toLocaleUpperCase()}</h2>
            </div>
        
         </div>

         <div className="flex gap-x-4">
         <div>
                <h2 className="font-extrabold mb-1 text-left">APPROVED BY:</h2>
                <h2 className="font-bold mt-2">{mainRequest?.requestType.approveBy?.name.toLocaleUpperCase()}</h2>
                <h2 className="font-semibold">{mainRequest?.requestType.approveBy?.position.toLocaleUpperCase()}</h2>
            </div>

            {/* <div className="mt-6">
                <h2 className="font-semibold ml-2">{requestType?.appr?.name}</h2>
                <h2 className="font-semibold ml-2">{requestType?.checkedBy2?.position}</h2>
            </div> */}
         </div>


      </div>

      
    </div>
    );

}