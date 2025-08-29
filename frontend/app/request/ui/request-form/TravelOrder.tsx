import { AddBox } from "@mui/icons-material";
import RequestModal from "../../components/RequestModal";
import { useState } from "react";
import ViewTravelOrder from "../request-view/ViewTravelOrder";
import { Entry } from "../../type/FormType";
import { travelOrderSchema } from "../../lib/travelOrder.schema";
import { useAddTravelOrder } from "../../hooks/userForm";
import SweetAlert from "../../components/Swal";
import { TravelOrderPaperProps } from "../../type/FormType";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { RequestTypeDTO } from "../../type/RequestType";
import { FormProps } from "../../type/FormType";
import { useFetchBranches } from "../../hooks/useRequest";
import { useFetchUser } from "@/hooks/useAuth";
import React from "react";

export default function TravelOrder({requestTypeId, requestType}:FormProps) {
  const { data: user } = useFetchUser();
  const { data: branches, isLoading, isError } = useFetchBranches();


  const [isModalOpen, setIsModalOpen] = useState(false);
  const {register,handleSubmit,formState: { errors },control,watch,reset,setValue,trigger} = useForm<TravelOrderPaperProps>({
    resolver: zodResolver(travelOrderSchema),
    defaultValues: {
      name: "",
      position: "",
      departure_date: "",
      destination: "",
      current_date: "",
      purpose: "",
      requestFromId: 0,
      items: [],
      requestTypeId: requestTypeId,
    },
  });

  
  React.useEffect(() => {
    if (user?.branchId) {
      reset({
        name: "",
        position: "",
        departure_date: "",
        destination: "",
        current_date: "",
        purpose: "",
        requestFromId: user.branchId,  
        items: [],
        requestTypeId: requestTypeId,
      });
    }
  }, [user, reset, requestTypeId]);
  


  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const addTravelOrderMutation = useAddTravelOrder();



const handleAddBudget = () => {
    append({ budget: "", amount: "" });
};


const handleAddAmount = (index: number, value: string) => {
    setValue(`items.${index}.amount`, value);
};



  const formValues = watch();


  const onSubmit = (data: TravelOrderPaperProps) => {
    addTravelOrderMutation.mutate(data, {
      onSuccess: () => {
        SweetAlert.successAlert("Saved", "Form saved successfully");
        reset();
        setIsModalOpen(false);
      },
      onError: (e) => {
        console.error(e);
        SweetAlert.errorAlert("Error", "Failed to fetch data.");
      },
    });
  };


  const handleOpenModal = async () => {
    const isValid = await trigger();
    if (isValid) {
      setIsModalOpen(true); 
    } 
  };

  return (
    <div className="bg-white border border-[#ECECEC] min-h-70 px-3 py-8 rounded-md">
      <div className="p-1.5">
        <h3 className="text-xl font-bold text-center">TRAVEL ORDER FORM</h3>
      </div>

      <form className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4 px-4 mt-8">

        <div className="flex flex-col">
          <label className="mr-2 mb-2 font-semibold">Name</label>
          <input type="text" className="bg-gray-50 border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="Enter name..." {...register("name")}/>
          {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
        </div>

        <div className="flex flex-col">
          <label className="mr-2 mb-2 font-semibold">Position/Designation:</label>
          <input type="text" className="bg-gray-50 border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="Enter position..." {...register("position")}/>
          {errors.position && <p className="text-sm text-red-500">{errors.position.message}</p>}
        </div>

        <div className="flex flex-col">
          <label className="mr-2 mb-2 font-semibold">Departure Date:</label>
          <input type="date" className="bg-gray-50 border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500" {...register("departure_date")}/>
          {errors.departure_date && <p className="text-sm text-red-500">{errors.departure_date.message}</p>}
        </div>

        <div className="flex flex-col">
          <label className="mr-2 mb-2 font-semibold">Destination:</label>
          <input type="text" className="bg-gray-50 border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="Enter destination..."{...register("destination")}/>
          {errors.destination && <p className="text-sm text-red-500">{errors.destination.message}</p>}
        </div>

        <div className="flex flex-col">
          <label className="mr-2 mb-2 font-semibold">Current Date:</label>
          <input type="date" className="bg-gray-50 border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500" {...register("current_date")}/>
          {errors.current_date && <p className="text-sm text-red-500">{errors.current_date.message}</p>}
        </div>

        <div className="flex flex-col">
          <label className="mr-2 mb-2 font-semibold">Purpose of Travel:</label>
          <input type="text" className="bg-gray-50 border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="Enter purpose..." {...register("purpose")}/>
          {errors.purpose && <p className="text-sm text-red-500">{errors.purpose.message}</p>}
        </div>

        <div className="flex flex-col">
          <label className="mr-2 mb-2 font-semibold">Request From:</label>
          <select
            {...register("requestFromId", { valueAsNumber: true, required: "Request From is required" })}
            className="border border-gray-300 bg-gray-50 p-2 rounded-lg">
            <option value={0} >-- Select Branch --</option>
            {branches?.map((branch) => (
              <option key={branch.id} value={branch.id}>
                {branch.branchName}
              </option>
            ))}
          </select>
          {errors.requestFromId && (
            <p className="text-sm text-red-500">{errors.requestFromId.message}</p>
          )}
        </div>

        <div className="col-span-full ml-2 mt-4 flex items-center gap-2">
          <button type="button" onClick={handleAddBudget}><span className="mr-2 font-semibold">ADD BUDGET</span>
            <AddBox className="text-green-600 hover:text-green-800 shadow-xl" fontSize="large" />
          </button>
        </div>

    
        <div className="mt-6 px-4 col-span-full">
          <div className="grid grid-cols-2 font-semibold text-sm mb-2 px-1">
            <span>BUDGET</span>
            <span>AMOUNT</span>
          </div>
          <ul className="space-y-2 text-sm">
            {fields.map((field, index) => (
              <li key={field.id} className="grid grid-cols-2 gap-x-4">
                <div className="flex justify-between items-center bg-gray-50 border border-slate-300 rounded-lg px-2">

                  <input type="text" className="border-gray-300 outline-none w-full p-2"
                    {...register(`items.${index}.budget` as const)}/>

                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="text-red-500 text-lg hover:text-red-700"
                    aria-label="Remove entry">
                    &times;
                  </button>
                </div>

                <div className="flex justify-between items-center bg-gray-50 border border-slate-300 rounded-lg px-2">
                  <input type="number" className="border-gray-300 outline-none w-full bg-gray-50 rounded-lg p-2" value={formValues.items?.[index]?.amount || ""}
                    onChange={(e) => handleAddAmount(index, e.target.value)}/>
                </div>

                {errors.items?.[index]?.budget && (
                  <p className="text-sm text-red-500">{errors.items[index]?.budget?.message}</p>
                )}
                {errors.items?.[index]?.amount && (
                  <p className="text-sm text-red-500">{errors.items[index]?.amount?.message}</p>
                )}
              </li>
            ))}
          </ul>
        </div>

       
        <div className="col-span-full justify-end flex gap-2">
          <button type="button" className="px-6 py-1 bg-green-800 hover:bg-green-950 text-white rounded" onClick={handleOpenModal}>
            Submit
          </button>
        </div>
      </form>

      {isModalOpen && (
        <RequestModal title="TravelOrder Summary" size="xxxl" onClose={() => setIsModalOpen(false)}>
         <ViewTravelOrder
            requestType={requestType}   
            formData={{...formValues,
                branchName:branches?.find((b) => b.id === formValues.requestFromId)?.branchName ?? "",
                address:branches?.find((b) => b.id === formValues.requestFromId)?.address ?? "",
                requestedBy: user?.name ?? "",  
                requestedPosition: user?.position ?? "",
                onSubmit: handleSubmit(onSubmit),
                submitting: addTravelOrderMutation.isPending,
            }}
            />
          </RequestModal>
      )}

      
    </div>
  );
}

