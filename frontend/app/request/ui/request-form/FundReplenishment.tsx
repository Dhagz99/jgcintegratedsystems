"use client";
import React from "react";
import { useState, useMemo, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type Resolver, type SubmitHandler, FormProvider } from "react-hook-form";
import { SaveAs } from "@mui/icons-material";
import { AddcashCountSchema, type addCcashCount } from "@/app/request/lib/request.schema";
import ButtonComponents from "../../components/Buttons";
import InputField from "../../components/InputField";
<<<<<<< HEAD
import TravelFundReplenishment, { TravelFundDTO } from "../forms/fund-replenishments/TravelReplenishment";
=======
import TravelFundReplenishment, { TravelFundDTO } from "../forms/fund-replenishments/TravelFundReplenishment";
>>>>>>> tester
import RequestModal from "../../components/RequestModal";
import { Option1, RequestTypeDTO } from "../../type/RequestType";
import TravelSummaryModal from "../forms/TravelSumModal";
import CashFundReplenisment, { CashFundDTO } from "../forms/fund-replenishments/CashReplenishment";
import { createFund, FundPayload } from "@/app/request/services/fund.service";
import SweetAlert from "../../components/Swal";
import { useFetchBranches } from "../../hooks/useRequest";
import { useFetchUser } from "@/hooks/useAuth";

<<<<<<< HEAD
=======



>>>>>>> tester
const denominations = [1000, 500, 200, 100, 50, 20, 10, 5, 1, .25] as const;
const formatDateTime = (date: Date) => {
  return date.toISOString().slice(0, 19).replace("T", " ");
};


type Row = { denom: number; pieces: number; checked: boolean };

type LineItem = { denom: number; pieces: number; amount: number; checked: boolean };


type FormProps = {
  requestTypeId: number; 
  requestType: RequestTypeDTO | null;
}




export default function FundReplenishment ({requestTypeId, requestType} : FormProps){

  const methods = useForm<addCcashCount>({
    resolver: zodResolver(AddcashCountSchema) as Resolver<addCcashCount>,
    defaultValues: {},
  });
  const { register, handleSubmit, formState: { errors }, setValue } = methods;

  // Fetch User
  const { data: user , isLoading: userLoading } = useFetchUser();
  
  //Feth Branches
  const { data: branchesData = [] } = useFetchBranches();

  const branches = branchesData.map((b: any) => ({
  value: b.id ?? b.id,   
  label: b.branchName ?? b.companyName 
  }));


  const [fundsAmount, setFundsAmount] = useState<number>(1000000000);
  const [rows, setRows] = useState<Row[]>(denominations.map((d) => ({ denom: d, pieces: 0, checked: false })));
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const [submittedData, setSubmittedData] = useState<addCcashCount | null>(null);
  const [submittedItems, setSubmittedItems] = useState<LineItem[] | null>(null);
  const [printSummary, setPrintSummary] = useState(false);

  const [travelData, setTravelData] = React.useState<TravelFundDTO[]>([]);
  const [cashData, setCashData] = React.useState<CashFundDTO[]>([]);


  const currency = (n: number) =>
    n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  function updatePieces(i: number, val: number) {
    setRows((prev) => prev.map((r, idx) => (idx === i ? { ...r, pieces: Math.max(0, Number(val) || 0) } : r)));
  }
  function updateChecked(i: number, checked: boolean) {
    setRows((prev) => prev.map((r, idx) => (idx === i ? { ...r, checked } : r)));
  }

  useEffect(() => {
    rows.forEach((r, i) => {
      setValue(`pieces.${i}` as any, r.pieces, { shouldValidate: false, shouldDirty: true });
      setValue(`amounts.${i}` as any, r.pieces * r.denom, { shouldValidate: false, shouldDirty: true });
      setValue(`denoms.${i}` as any, r.denom, { shouldValidate: false, shouldDirty: true });
      setValue(`checked.${i}` as any, r.checked, { shouldValidate: false, shouldDirty: true });
    });
  }, [rows, setValue]);

  const checkedTotal = useMemo(() => {
    return rows.reduce((sum, r) => (r.checked ? sum + (Number(r.pieces) || 0) * (Number(r.denom) || 0) : sum), 0);
  }, [rows]);

  const grandTotal = useMemo(() => (Number(fundsAmount) || 0) + (Number(checkedTotal) || 0), [fundsAmount, checkedTotal]);

  useEffect(() => {
    setValue("fundPerCount" as any, grandTotal, { shouldValidate: false });
  }, [grandTotal, setValue]);


const { reset } = methods;
  const onSubmit: SubmitHandler<addCcashCount> = (data) => {
    const cashDemo = data.denoms
      .map((denom, i) => ({
        denom,
        pieces: data.pieces[i],
        amount: data.amounts[i],
        checked: data.checked?.[i] ?? false,
      }))
      .filter(item => item.checked);

    const fundType: "Travel" | "Cash" =
      requestType?.requestName === "Fund Replenishment"
        ? "Cash"
        : requestType?.requestName === "Travel Replenishment"
        ? "Travel"
        : "Cash";

    // Normalize numeric inputs
    const fundAmountRaw = Number(data.fundAmount);
    const totalFundRaw = Number(grandTotal);

    const fundAmount = Number.isFinite(fundAmountRaw) ? fundAmountRaw : 0;
    const totalFund = Number.isFinite(totalFundRaw) ? totalFundRaw : 0;

    const round2 = (n: number) => Math.round(n * 100) / 100;

    const cashShort = round2(fundAmount - totalFund);

    const payload: FundPayload = {
      fundType,
      repFund: fundsAmount,
      totalFund,              
      requestTypeId,
      branchId: Number(data.branch),
      office: data.office,
      dateCounted: data.dateCounted
        ? formatDateTime(new Date(data.dateCounted))
        : undefined,
      nameFund: data.nameFund,
      fundAmount,              
      reference: data.reference,
      cashDemo,
      ...(fundType === "Travel" ? { travelRows: travelData } : {}),
      ...(fundType === "Cash" ? { cashRows: cashData } : {}),
      fundPerCount: data.fundPerCount,
      cashShort,                
    };

    createFund(payload).then(() => {
      reset();
      setRows(denominations.map((d) => ({ denom: d, pieces: 0, checked: false })));
      setTravelData([]);
      setCashData([]);
      setFundsAmount(0);
      SweetAlert.successAlert("Submit Fund", "Fund Submitted Successfully");
    });
  };

  const onInvalid = (err: any) => {
    console.log("Validation errors:", err);
  };

  const closePrint = () => setPrintSummary(false);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit, onInvalid)} className="w-[min(90rem,100%)] mx-auto my-4 ">
        <div className="flex flex-col gap-y-4">
          <div className="bg-white px-8 py-6 rounded-md flex flex-col gap-y-4">
            <div className="flex flex-col items-center text-center w-full py-2">
              <h3 className="font-semibold">EMB CAPITAL LENDING CORPORATION</h3>
              <h6>CASH COUNT SHEET</h6>
            </div>

            <div className="flex flex-row w-full gap-6">
              <InputField
                label="Office"
                type="text"
                name="office"
                register={register}
                error={errors?.office}
                placeholder="Please Enter Office"
              />
              <InputField label="Enter Company Branch" 
              type="select" 
              register={register} 
              name="branch" 
              error={errors?.branch} 
              options={branches}/>
            </div>

            <div className="flex flex-col gap-y-4">
              <div className="flex flex-row gap-x-6">
                <InputField
                  label="Name of Fund"
                  type="text"
                  name="nameFund"
                  register={register}
                  error={errors?.nameFund}
                  placeholder="Please Enter Fund Name"
                />
                <InputField
                  label="Date Counted"
                  type="date"
                  name="dateCounted"
                  register={register}
                  error={errors?.dateCounted}
                />
               
              </div>
              <div className="flex flex-row gap-x-6">
                <InputField
                  label="Reference"
                  type="text"
                  name="reference"
                  register={register}
                  error={errors?.reference}
                  placeholder="Please Enter Reference"
                />
                 <InputField
                    label="Fund Amount"
                    type="number"
                    name="fundAmount"
                    register={register}
                    error={errors?.fundAmount}
                    placeholder="Please Enter Fund Amount"
                  />
              </div>
            </div>

            <h6 className="font-semibold text-base px-2">Fund Counted as Follows</h6>

            <div className="flex flex-col">
              <table className="added-list w-full border border-gray-300">
                <thead className="bg-green-800 text-white">
                  <tr>
                    <th className="p-2 font-semibold text-left">Cash Denomination</th>
                    <th className="p-2 font-semibold text-center">No. of Pieces</th>
                    <th className="p-2 font-semibold text-right">Amount</th>
                    <th className="p-2 font-semibold text-center">Checked</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, i) => (
                    <tr key={row.denom} className="bg-gray-100 font-medium text-[1rem]">
                      <td className="py-[0.5rem] px-2 text-left">{currency(row.denom)}</td>
                      <td className="py-[0.5rem] px-2 text-center" onDoubleClick={() => setEditingIndex(i)}>
                        {editingIndex === i ? (
                          <input
                            type="number"
                            autoFocus
                            min={0}
                            className="w-24 border rounded px-2 py-1 text-center outline-none"
                            value={row.pieces}
                            onChange={(e) => updatePieces(i, Number(e.target.value))}
                            onBlur={() => setEditingIndex(null)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" || e.key === "Escape") setEditingIndex(null);
                            }}
                          />
                        ) : (
                          <span className="cursor-text select-none">{row.pieces}</span>
                        )}
                        {/* Keep these in the form payload */}
                        <input type="hidden" {...register(`pieces.${i}` as any)} value={row.pieces} readOnly />
                        <input type="hidden" {...register(`denoms.${i}` as any)} value={row.denom} readOnly />
                      </td>
                      <td className="py-[0.5rem] px-2 text-right">
                        {row.pieces ? currency(row.pieces * row.denom) : "-"}
                        <input type="hidden" {...register(`amounts.${i}` as any)} value={row.pieces * row.denom} readOnly />
                      </td>
                      <td className="py-[0.5rem] px-2 text-center">
                        <input type="checkbox" checked={row.checked} onChange={(e) => updateChecked(i, e.target.checked)} />
                        {/* store as boolean using setValue above; this hidden field is optional now */}
                        <input type="hidden" {...register(`checked.${i}` as any)} value={row.checked ? "true" : "false"} readOnly />
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-gray-50 font-semibold">
                    <td className="py-4 text-left px-6 font-normal">Total</td>
                    <td className="p-2"></td>
                    <td className="p-2 text-right">{currency(checkedTotal)}</td>
                    <td className="p-2"></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {requestType?.requestName == "Travel Replenishment" && (
              <div>
                <h6 className="font-semibold text-base px-2">
                  Traveling Fund Replenishment
                </h6>
                              <TravelFundReplenishment
                  amount={fundsAmount}
                  onChange={setFundsAmount}
                  onDataChange={setTravelData}
                  office={methods.getValues("office")}   
                  branch={
                      branches.find((b) => String(b.value) === String(methods.getValues("branch")))?.label || ""
                    }
                />

              </div>
            )}

            {
              requestType?.requestName == "Fund Replenishment" && (
                <div>
                  <h6 className="font-semibold text-base px-2">
                      Cash Fund Replenishment
                  </h6>
                 <CashFundReplenisment
                    amount={fundsAmount}
                    onChange={setFundsAmount}
                    onDataChange={setCashData}
                    office={methods.getValues("office")}
                    branch={
                      branches.find((b) => String(b.value) === String(methods.getValues("branch")))?.label || ""
                    }
                  />

                </div>
              )
            }
          </div>

          <div className="flex flex-col gap-4 ">
            <h6 className="font-semibold text-base px-2">Total Computation</h6>
            <div className="flex gap-x-2 justify-between bg-white px-8 py-6 rounded-md">
              <InputField
                label="Total Fund Per Account"
                type="number"
                name="fundPerCount"
                register={register}
                error={errors?.fundPerCount}
                placeholder="0.00"
              />
              <InputField
                label="Cash-Short (Over)"
                type="number"
                name="cashShort"
                register={register}
                error={errors?.cashShort}
                placeholder="0.00"
              />
            </div>
          </div>

          <div className="flex justify-end gap-6 mt-2 w-ful">
            <ButtonComponents label="Submit Cash Count Sheet" size="sm" icon={<SaveAs />} type="submit" />
          </div>

          {/* {printSummary && submittedData && submittedItems && (
            <RequestModal size="lg" nested title="Cash Count Sheet" onClose={closePrint}>
              <TravelSummaryModal
                onClose={closePrint}
                data={submittedData}
                items={submittedItems}
                checkedTotal={checkedTotal}
                fundsAmount={fundsAmount}
                grandTotal={grandTotal}
              />
            </RequestModal>
          )} */}

        </div>
      </form>
    </FormProvider>
  );
<<<<<<< HEAD
}

=======
}
>>>>>>> tester
