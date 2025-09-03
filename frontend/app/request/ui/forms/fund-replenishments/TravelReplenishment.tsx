"use client";
import React from "react";
import { Add } from "@mui/icons-material";
import { useForm, type Resolver, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  TravelingFundsSchema,
  type travelFund,
} from "@/app/request/lib/request.schema";
import InputField from "../../../components/InputField";
import ButtonComponents from "../../../components/Buttons";


export type TravelFundDTO = {
  tagsField: string[];
  startDate: string | null;  
  endDate: string | null;  
  travelDate: string | null;  
  travelling: string | null;
  fuelFee: number | null;
  repairs: string[] | null;
  litigationExp: number | null;
  totalFunds: number | null;
  travelKm: string | null;
  fundRemarks: string | null;
};


interface TravelFundsProps {
  amount: number;
  onChange: (value: number) => void;
  onDataChange?: (rows: TravelFundDTO[]) => void;
  office?: string;
  branch?: string;
}


const TravelFunds: React.FC<TravelFundsProps> = ({ amount, onChange, onDataChange, office, branch}) => {

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    setValue,
    watch,
  } = useForm<travelFund>({
    resolver: zodResolver(TravelingFundsSchema) as Resolver<travelFund>,
    defaultValues: { tagsField: [], repairs: [] },
  });

  const toDTO = (f: travelFund): TravelFundDTO => ({
    tagsField: f.tagsField ?? [],
    startDate: f.startDate ? new Date(f.startDate).toISOString().slice(0, 10) : null,
    endDate: f.endDate ? new Date(f.endDate).toISOString().slice(0, 10) : null,
    travelDate: f.travelDate ? new Date(f.travelDate).toISOString().slice(0, 10) : null,
    travelling: f.travelling ?? null,
    fuelFee: typeof f.fuelFee === "number" ? f.fuelFee : null,
    repairs: f.repairs && f.repairs.length ? f.repairs : null,
    litigationExp: typeof f.litigationExp === "number" ? f.litigationExp : null,
    totalFunds: typeof f.totalFunds === "number" ? f.totalFunds : null,
    travelKm: f.travelKm ?? null,
    fundRemarks: f.fundRemarks ?? null,
  });

  const [fundList, setFundList] = React.useState<travelFund[]>([]);

  const onSubmit: SubmitHandler<travelFund> = (data) => {
    setFundList((prev) => [...prev, data]);

    reset({
        tagsField: data.tagsField,
        repairs: [],
        travelDate: undefined,
        travelling: "",
        fuelFee: undefined,
        litigationExp: undefined,
        totalFunds: undefined,
        travelKm: "",
        fundRemarks: "",
        startDate: undefined,
        endDate: undefined,
    });
  };

  const onInvalid = (err: unknown) => {
    console.log("Validation errors:", err);
  };

  const submit = React.useCallback(() => {
    handleSubmit(onSubmit, onInvalid)();
  }, [handleSubmit]);

  const totals = React.useMemo(() => {
    return fundList.reduce(
      (acc, f) => {
        acc.fuel += Number(f.fuelFee ?? 0);
        acc.total += Number(f.totalFunds ?? 0);
        return acc;
      },
      { fuel: 0, total: 0 }
    );
  }, [fundList]);

  const fmt = (n: number) => n.toFixed(2);


  // useEffect code for on change input value 

  React.useEffect(() => {
    onChange(totals.total);
  }, [totals.total, onChange]);

    React.useEffect(() => {
    if (onDataChange) {
      const rows = fundList.map(toDTO);
      onDataChange(rows);
    }
  }, [fundList, onDataChange]);


  React.useEffect(()=>{
    const sum =
    Number(watch("fuelFee") || 0)+
    Number(watch("litigationExp") || 0);

    setValue("totalFunds",sum)
  }),[watch('fuelFee'), watch('litigationExp')];

  // useEffect code for on change input value 
  

  return (
    <div className="main-body flex flex-col gap-6 bg-white px-8 py-6 rounded-md">
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-y-3 gap-x-6">

            <div className="py-2 col-span-2">
                <h6 className="font-medium text-gray-500">Period Covered</h6>
            </div>
            <InputField label="Enter start date" type="date" name="startDate" register={register} error={errors.startDate}/>
            <InputField label="Enter end date" type="date" name="endDate" register={register} error={errors.endDate}/>

            <div className="py-2 col-span-2">
                <h6 className="font-medium text-gray-500">Fund Details</h6>
            </div>
            <InputField
                type="taginput"
                name="tagsField"
                label="Marketing Officers"
                control={control}
                register={register}
                error={errors.tagsField as any}
            />

            <InputField
                className="flex-1"
                label="Travel Date"
                type="date"
                name="travelDate"
                register={register}
                error={errors.travelDate}
            />

            <InputField
                label="Travelling"
                type="text"
                name="travelling"
                register={register}
                error={errors.travelling}
            />

            <InputField
                label="Fuel Fees"
                type="number"
                name="fuelFee"
                register={register}
                error={errors.fuelFee}
            />

            <InputField
                label="Repairs"
                type="taginput"
                name="repairs"
                control={control}
                register={register}
                error={errors.repairs as any}
            />

            <InputField
                label="Litigation Expenses"
                type="number"
                name="litigationExp"
                register={register}
                error={errors.litigationExp}
            />

            <InputField
                label="Total Fees"
                type="number"
                name="totalFunds"
                register={register}
                error={errors.totalFunds}
                disabled
            />

            <InputField
                label="Kilometers"
                type="text"
                name="travelKm"
                register={register}
                error={errors.travelKm}
            />

            <div className="col-span-2">
                <InputField
                label="Remarks"
                type="textarea"
                name="fundRemarks"
                register={register}
                error={errors.fundRemarks}
                />
            </div>
        </div>

        <div className="flex flex-row justify-end gap-2 ">
          <ButtonComponents
            label="Add Travel Funds"
            size="sm"
            icon={<Add />}
            type="button"
            variant="success"
            onClick={submit}
          />

        </div>
      </div>

      <section className="addded-section">
        <div className="header py-1">
          <h4 className="font-semibold text-[#333333]">Added Travel Fund</h4>
        </div>

        <table className="added-list w-full border border-gray-300">
          <thead className="bg-green-800 text-white">
            <tr>
              <th className="p-2 font-semibold text-center">Date</th>
              <th className="p-2 font-semibold text-center">Travelling</th>
              <th className="p-2 font-semibold text-center">Fuel</th>
              <th className="p-2 font-semibold text-center">Repairs</th>
              <th className="p-2 font-semibold text-center">Litigation</th>
              <th className="p-2 font-semibold text-center">Total</th>
              <th className="p-2 font-semibold text-center">Km</th>
              <th className="p-2 font-semibold text-center">Remarks</th>
            </tr>
          </thead>

          <tbody>
            {fundList.length === 0 ? (
              <tr className="bg-gray-100">
                <td colSpan={8} className="text-center p-2">
                  No records added yet.
                </td>
              </tr>
            ) : (
              fundList.map((fund, index) => (
                <tr key={index} className="bg-gray-100">
                  <td className="p-2 text-center">
                    {fund.travelDate
                      ? new Date(fund.travelDate).toLocaleDateString()
                      : "-"}
                  </td>
                  <td className="p-2 text-center">{fund.travelling ?? "-"}</td>
                  <td className="p-2 text-center">
                    {typeof fund.fuelFee === "number" ? fmt(fund.fuelFee) : "-"}
                  </td>
                  <td className="p-2 text-center">
                    {Array.isArray(fund.repairs)
                      ? fund.repairs.join(", ")
                      : fund.repairs ?? "-"}
                  </td>
                  <td className="p-2 text-center">
                    {typeof fund.litigationExp === "number"
                      ? fmt(fund.litigationExp)
                      : "-"}
                  </td>
                  <td className="p-2 text-center">
                    {typeof fund.totalFunds === "number" ? fmt(fund.totalFunds) : "-"}
                  </td>
                  <td className="p-2 text-center">{fund.travelKm ?? "-"}</td>
                  <td className="p-2 text-center">{fund.fundRemarks ?? "-"}</td>
                </tr>
              ))
            )}
          </tbody>

          <tfoot>
            <tr className="bg-gray-50 font-semibold">
              <td className="p-2 text-right">Total</td>
              <td className="p-2"></td>
              <td className="p-2">{fmt(totals.fuel)}</td>
              <td className="p-2"></td>
              <td className="p-2"></td>
              <td className="p-2">{fmt(totals.total)}</td>
              <td className="p-2"></td>
              <td className="p-2"></td>
            </tr>
          </tfoot>
        </table>
      </section>

    </div>
  );
}


export default TravelFunds;
