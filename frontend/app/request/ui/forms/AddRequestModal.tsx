import { zodResolver } from "@hookform/resolvers/zod";
import { CheckerData, checkerSchema, RequestType, requestTypeSchema } from "../../lib/request.schema";
import { useForm } from "react-hook-form";
import { useAddChecker, useAddRequestType, useFetchChecker, useUpdateChecker } from "../../hooks/useRequest";
import { FormsInputs, FormsSelect } from "../../components/FormsInputs";
import { Close, SaveAs } from "@mui/icons-material";
import ButtonComponents from "../../components/Buttons";
import { useEffect, useState } from "react";
import { showSuccess } from "../../components/ToastAlert";
import { CheckerWithName, Option } from "../../type/RequestType";

type AddProps = {
  onClose: () => void;
  selectedData?: RequestType | null;
};



export default function AddRequestModal({ onClose, selectedData }: AddProps) {
  const isEdit = !!selectedData;
  const [isCheckedNoted, setIsCheckedNoted] = useState(false);
  const [isCheckedBy, setIsCheckedBy] = useState(false);
  const [isCheckedRecomApproval, setIsCheckedRecomApproval] = useState(false);
  const [isCheckedApprove, setIsCheckedApprove] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RequestType>({
    resolver: zodResolver(requestTypeSchema),
    defaultValues: {
      requestName : "",
      notedById: undefined,
      checkedById: undefined,
    },
  });

  const { mutate: addRequest, isPending: isAdding } = useAddRequestType();
  const { mutate: editChecker, isPending: isEditing } = useUpdateChecker();
  const { data: checker = [], isLoading } = useFetchChecker();
  

  useEffect(() => {
    if (selectedData) {
      reset(selectedData); // ✅ pre-fill form when editing
    }
  }, [selectedData, reset]);

  const onSubmit = (data: RequestType) => {
    // if (isEdit && selectedData?.id) {
    //   editChecker(
    //     { ...data, id: selectedData.id }, 
    //     {
    //       onSuccess: () => {
    //         showSuccess({ message: "Checker updated successfully!", position: "top-center" });
    //         onClose();
    //       },
    //     }
    //   );
    // } else {
      addRequest(data, {
        onSuccess: () => {
          showSuccess({ message: "Checker added successfully!", position: "top-center" });
          onClose();
        },
      });
    
  };

  // Convert fetched data into options
  const notedByOptions: Option[] = checker.map((c: CheckerWithName) => ({
    value: c.id,
    label: c.checkerName?.name ?? "",
  }));
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-3 mb-6 md:grid-cols-3">
        <FormsInputs
          label="Report Type"
          placeholder="Enter report type"
          error={errors.requestName}
          register={ register("requestName")}
          type="text"
        />
        <div className="flex flex-col col-span-2 justify-between">
          <label htmlFor=""     className="block mb-2 text-sm font-medium text-gray-900">Report Footer</label>
          <div className="flex items-center  justify-between">
              <div className="flex gap-2 border border-gray-200 rounded-sm p-2">
                <input
                    id="isCheckedNoted" 
                   type="checkbox" 
                   value="" 
                   name="bordered-checkbox" 
                   onChange={(e) => setIsCheckedNoted(e.target.checked)}
                   className=" text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 " 
                   checked={isCheckedNoted}
                   />
                <label htmlFor="isCheckedNoted" className="w-full  text-sm font-medium text-gray-900 ">Noted By</label>
              </div>
              <div className="flex gap-2 border border-gray-200 rounded-sm p-2">
              <input
                    id="isCheckedBy" 
                   type="checkbox" 
                   value="" 
                   name="bordered-checkbox" 
                   onChange={(e) => setIsCheckedBy(e.target.checked)}
                   className=" text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 " 
                   checked={isCheckedBy}
                   />
                <label htmlFor="isCheckedBy" className="w-full  text-sm font-medium text-gray-900 ">Checked By</label>
              </div>
              <div className="flex gap-2 border border-gray-200 rounded-sm p-2">
              <input
                    id="isCheckedRecomApproval" 
                   type="checkbox" 
                   value="" 
                   name="bordered-checkbox" 
                   onChange={(e) => setIsCheckedRecomApproval(e.target.checked)}
                   className=" text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 " 
                   checked={isCheckedRecomApproval}
                   />
                <label htmlFor="isCheckedRecomApproval" className="w-full  text-sm font-medium text-gray-900 ">Reccomending Approval</label>
              </div>
              <div className="flex gap-2 border border-gray-200 rounded-sm p-2">
              <input
                    id="isCheckedApprove" 
                   type="checkbox" 
                   value="" 
                   name="bordered-checkbox" 
                   onChange={(e) => setIsCheckedApprove(e.target.checked)}
                   className=" text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 " 
                   checked={isCheckedApprove}
                   />
                <label htmlFor="isCheckedApprove" className="w-full  text-sm font-medium text-gray-900 ">Approve By</label>
              </div>
          </div>
        </div>
        {isCheckedNoted &&(
          <>
            <div className="col-span-1">
            <FormsSelect
                label="Noted By"
                error={errors.notedById}
                register={register("notedById", {
                  setValueAs: (v) => (v === "" ? undefined : Number(v)),
                })}
                options={notedByOptions}
                placeholder="Select a person"
              />
              <div></div>
          </div>
            <div></div>
        </>
        )}
          {isCheckedBy &&(
            <div className="flex flex-col gap-3 col-span-3">
              <label htmlFor="bordered-checkbox-2" className="w-full  text-sm font-medium text-gray-900 ">Checked By</label>
              <div className="grid grid-cols-2 gap-2">
              <FormsSelect
                error={errors.checkedById}
                register={register("checkedById", {
                  setValueAs: (v) => (v === "" ? undefined : Number(v)),
                })}
                options={notedByOptions}
                placeholder="Select a person"
              />
               <FormsSelect
                  error={errors.checkedBy2Id}
                  register={register("checkedBy2Id", {
                    setValueAs: (v) => (v === "" ? undefined : Number(v)),
                  })}
                 options={notedByOptions}
                 placeholder="Select checked by 2"
                />
              </div>
          </div>
        )}
        {isCheckedRecomApproval &&(
            <div className="flex flex-col gap-3 col-span-3">
              <label htmlFor="bordered-checkbox-2" className="w-full  text-sm font-medium text-gray-900 ">Recommending Approval</label>
              <div className="grid grid-cols-2 gap-2">
              <FormsSelect
                  error={errors.recomApprovalId}
                  register={register("recomApprovalId", {
                    setValueAs: (v) => (v === "" ? undefined : Number(v)),
                  })}
                 options={notedByOptions}
                 placeholder="Select checked by"
                />
               <FormsSelect
                  error={errors.recomApproval2Id}
                  register={register("recomApproval2Id", {
                    setValueAs: (v) => (v === "" ? undefined : Number(v)),
                  })}
                 options={notedByOptions}
                 placeholder="Select checked by 2"
                />
              </div>
          </div>
        )}
         {isCheckedApprove &&(
            <div className="flex flex-col gap-3 col-span-3">
              <label htmlFor="bordered-checkbox-2" className="w-full  text-sm font-medium text-gray-900 ">Approve By</label>
              <div className="grid grid-cols-2 gap-2">
              <FormsSelect
                  error={errors.approveById}
                  register={register("approveById", {
                    setValueAs: (v) => (v === "" ? undefined : Number(v)),
                  })}
                 options={notedByOptions}
                 placeholder="Select checked by 2"
                />
              </div>
          </div>
        )}
        
      </div>
      <div className="flex justify-end gap-2">
        <ButtonComponents
          label={isEdit ? "Update" : "Submit"}
          size="md"
          type="submit"
          icon={<SaveAs />}
          disabled={isAdding || isEditing}
        />
        <ButtonComponents
          label="Close"
          size="md"
          onClick={onClose}
          variant="danger"
          icon={<Close />}
        />
      </div>
   
    </form>
  );
}
