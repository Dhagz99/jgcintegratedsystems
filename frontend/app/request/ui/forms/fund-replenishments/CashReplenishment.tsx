import React from "react";
import { Add } from "@mui/icons-material";
import { useForm, type Resolver, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {CashFundRepSchema, CashFundRep} from "@/app/request/lib/request.schema";
import InputField from "../../../components/InputField";
import ButtonComponents from "../../../components/Buttons";



export type CashFundDTO = {
  startDate: string | null;  
  endDate: string | null;  
  funDate: string | null;  
  payee: string | null;
  fundAmount: number | null;
  miscExp: number | null;
  powerLight: number | null;
  telephone: number | null;
  dueToMh: number | null;
  fundRemarks: string | null;

};

interface CashFundsProps {
  amount: number;
  onChange: (value: number) => void;
  onDataChange?: (rows: CashFundDTO[]) => void;
  office?: string;
  branch?: string;
}

const CashFundReplenisment: React.FC<CashFundsProps> = ({amount, onChange, onDataChange,office,branch}) =>{
   
      const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        control,
        setValue,
        watch,
      } = useForm<CashFundRep>({
        resolver: zodResolver(CashFundRepSchema) as Resolver<CashFundRep>,
        defaultValues: { },
      });




    const toDTO = (f: CashFundRep): CashFundDTO => ({
        startDate: f.startDate ? new Date(f.startDate).toISOString().slice(0, 10) : null,
        endDate: f.endDate ? new Date(f.endDate).toISOString().slice(0, 10) : null,
        funDate: f.funDate ? new Date(f.funDate).toISOString().slice(0, 10) : null,
        payee: f.payee ?? null,
        fundRemarks: f.fundRemarks ?? null,
        fundAmount: typeof f.fundAmount === "number" ? f.fundAmount : null,
        miscExp: typeof f.miscExp === "number" ? f.miscExp : null,
        powerLight: typeof f.powerLight === "number" ? f.powerLight : null,
        telephone: typeof f.telephone === "number" ? f.telephone : null,
        dueToMh: typeof f.dueToMh === "number" ? f.dueToMh : null,
        
    });

    const [fundList, setFundList] = React.useState<CashFundRep[]>([]);
    const onSubmit: SubmitHandler<CashFundRep> = (data) => {
        setFundList((prev) => [...prev, data]);
        reset({
              funDate: undefined,
              payee: "",
              fundAmount: undefined,
              miscExp: undefined,
              powerLight: undefined,
              telephone: undefined,
              dueToMh: undefined,
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
            acc.fundTotal += Number(f.fundAmount ?? 0);
            acc.miscTotal += Number(f.miscExp ?? 0);
            acc.powerTotal += Number(f.powerLight ?? 0);
            acc.teleTotal += Number(f.telephone ?? 0);
            acc.dueTotal += Number(f.dueToMh ?? 0);
            return acc;
          },
          { fundTotal: 0, miscTotal: 0, powerTotal: 0,teleTotal:0, dueTotal:0 }
        );
      }, [fundList]);
    
    const fmt = (n: number) => n.toFixed(2);



    // useEffect code for on change input value 

      const grandTotal =
      totals.miscTotal +
      totals.powerTotal +
      totals.teleTotal +
      totals.dueTotal;

    React.useEffect(() => {
      onChange(grandTotal);
    }, [grandTotal, onChange]);

    React.useEffect(() => {
      if (onDataChange) {
        const rows = fundList.map(toDTO);
        onDataChange(rows);
      }
    }, [fundList, onDataChange]);


    React.useEffect(() => {
      const total =
        Number(watch("miscExp") || 0) +
        Number(watch("powerLight") || 0) +
        Number(watch("telephone") || 0) +
        Number(watch("dueToMh") || 0);

      setValue("fundAmount", total);
    }, [watch("miscExp"), watch("powerLight"), watch("telephone"), watch("dueToMh"), setValue]);

    // useEffect code for on change input value 



    return (
        <div  className="main-body flex flex-col gap-6 bg-white px-8 py-6 rounded-md">
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
                        className="flex-1"
                        label="Cash Date"
                        type="date"
                        name="funDate"
                        register={register}
                        error={errors.funDate}
                    />

                    <InputField
                        label="Payee"
                        type="text"
                        name="payee"
                        register={register}
                        error={errors.payee}
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

                    <InputField
                      label="Fund Amount"
                      type="number"
                      name="fundAmount"
                      register={register}
                      error={errors.fundAmount}
                      disabled
                    />

                    <InputField
                        label="Misc Expenses"
                        type="number"
                        name="miscExp"
                        register={register}
                        error={errors.miscExp}
                    />

                    <InputField
                        label="Power, Light, & Water"
                        type="number"
                        name="powerLight"
                        register={register}
                        error={errors.powerLight}
                    />

                    <InputField
                        label="Telephone Post. & Tel."
                        type="number"
                        name="telephone"
                        register={register}
                        error={errors.telephone}
                    />

                    <InputField
                        label="Due to MH"
                        type="number"
                        name="dueToMh"
                        register={register}
                        error={errors.dueToMh}
                    />

                    
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
              <th className="p-2 font-semibold text-center">Payee</th>
              <th className="p-2 font-semibold text-center">Remarks</th>
              <th className="p-2 font-semibold text-center">Amount</th>
              <th className="p-2 font-semibold text-center">Misc. Exp.</th>
              <th className="p-2 font-semibold text-center">Power, Light, & Water</th>
              <th className="p-2 font-semibold text-center">Telephone POST. & TEL.</th>
              <th className="p-2 font-semibold text-center">Due to MH</th>
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
                    {fund.funDate
                      ? new Date(fund.funDate).toLocaleDateString()
                      : "-"}
                  </td>
                  <td className="p-2 text-center">{fund.payee ?? "-"}</td>
                  <td className="p-2 text-center">{fund.fundRemarks ?? "-"}</td>
                  <td className="p-2 text-center">
                    {typeof fund.fundAmount === "number" ? fmt(fund.fundAmount) : "-"}
                  </td>
                
                  <td className="p-2 text-center">
                    {typeof fund.miscExp === "number"
                      ? fmt(fund.miscExp)
                      : "-"}
                  </td>
                  <td className="p-2 text-center">
                    {typeof fund.powerLight === "number" ? fmt(fund.powerLight) : "-"}
                  </td>
                
                  <td className="p-2 text-center">
                    {typeof fund.telephone === "number" ? fmt(fund.telephone) : "-"}
                  </td>
                  <td className="p-2 text-center">
                    {typeof fund.dueToMh === "number" ? fmt(fund.dueToMh) : "-"}
                  </td>
                
                 
                </tr>
              ))
            )}
          </tbody>

          <tfoot>
            <tr className="bg-gray-50 font-semibold">
              <td className="p-2 text-right">Total</td>
              <td className="p-2"></td>
              <td className="p-2"></td>
              <td className="p-2">{fmt(totals.fundTotal)}</td>
              <td className="p-2">{fmt(totals.miscTotal)}</td>
              <td className="p-2">{fmt(totals.powerTotal)}</td>
              <td className="p-2">{fmt(totals.teleTotal)}</td>
              <td className="p-2">{fmt(totals.dueTotal)}</td>
            </tr>
          </tfoot>
        </table>
      </section>


        </div>
    );

}

export default CashFundReplenisment;