import { AddBox, Restore, Save } from "@mui/icons-material";
import SearchableInput from "../../components/SearchableInputs";
import { useAddFundTransfer, useFetchBranches, useFetchChecker, useFetchUserList } from "../../hooks/useRequest";
import { FormsInputs, FormsTextArea } from "../../components/FormsInputs";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { createFundTransfer, CreateFundTrasnfer } from "../../lib/request.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import ButtonComponents from "../../components/Buttons";
import { useFetchUser } from "@/hooks/useAuth";
import { Option1, RequestTypeDTO } from "../../type/RequestType";
import { showSuccess } from "../../components/ToastAlert";
import { useState } from "react";
import RequestModal from "../../components/RequestModal";
import ViewFundTransfer from "../request-view/ViewFundTransfer";


type FormProps = {
  requestTypeId: number; 
  requestType: RequestTypeDTO | null;
}

export default function FundTransfer({requestTypeId, requestType} : FormProps){
  
  const [formData, setFormData] = useState<CreateFundTrasnfer | null>(null);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const {data: checkers, isLoading: userLoading} = useFetchUserList();
  const { data: branches = [], isLoading: branchesLoading } = useFetchBranches();
  const {mutate: addFundTransfer, isPending: isAdding} = useAddFundTransfer();


  const checkerData: Option1[] = (checkers ?? [])
  .filter(c => c.approver)
  .map(c => ({
    id: c.id ?? "",      
    name:c.name ?? "",
  }));


 

  const branchData: Option1[] = branches.map(c => ({
    id: c.id ?? "",      
    name: c.branchName ?? ""
  }));
  type FormValues  = z.infer<typeof createFundTransfer>;
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(createFundTransfer),
    defaultValues: {
      requestTypeId: requestTypeId,
    }
  });
    const onSubmit = (data: FormValues) => {
      setFormData(data);
      setIsOpenModal(true);
        // addFundTransfer(data as CreateFundTrasnfer, {
        //   onSuccess: () => {
        //     showSuccess({ message: "Branch added successfully!", position: "top-center" });
        //     reset();
        //   }
        // })      
    };

    const handleClose = () =>{
      setIsOpenModal(false);
    }

    const handleReset = () => {
      reset();
    }

    
    return(
        <div className="bg-white border border-[#ECECEC] min-h-80 px-6 py-3 rounded-md">
            <div className="p-1.5">
                <h3 className="text-lg font-semibold text-center">
                     Fund Transfer Request Form 
                </h3>
            </div> 
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-12 gap-3 items-center">
                    <div className="flex flex-row  items-end col-span-5">
                    <Controller
                        name="requestToId"
                        control={control}
                        render={({ field, fieldState }) => (
                        <SearchableInput
                            data={checkerData}
                            label="Request To"
                            placeholder="Select request to..."
                            name={field.name}
                            value={field.value}
                            onChange={field.onChange}
                            inputRef={field.ref}
                            error={fieldState.error}
                           />
                         )}
                    />
                     {/* <button><AddBox fontSize="large" className="text-green-700 "   style={{ fontSize: '2.8rem' }}  /></button> */}
                    </div>
                    <div className="flex flex-row  items-end col-span-5">
                      <Controller
                              name="requestFromId"
                              control={control}
                              render={({ field, fieldState }) => (
                              <SearchableInput
                                  data={branchData}
                                  label="Request From"
                                  placeholder="Select branch..."
                                  name={field.name}
                                  value={field.value}
                                  onChange={field.onChange}
                                  inputRef={field.ref}
                                  error={fieldState.error}
                                />
                              )}
                          />
                      </div>
                      <div className="flex flex-row  items-end col-span-2">
                          <FormsInputs
                            label="Date"
                            placeholder="Enter Date"
                            register={register('requestDate', { valueAsDate: true })}
                            error={errors.requestDate}
                            type="date"
                           />
                     </div>

                  
                     <div className="col-span-12 h-64">
                              <FormsTextArea 
                                label="Request Content"
                                placeholder="Enter request content"
                                register={register('requestContent')}
                                error={errors.requestContent}
                              />
                  </div>
            </div>
            
                  <div className="flex justify-end gap-2 mt-3">
                    <ButtonComponents
                      label="Submit"
                      size="md"
                      type="submit"
                      icon={<Save />}
                    />
                      <ButtonComponents
                      label="Reset"
                      variant="info"
                      size="md"
                      type="button"
                      onClick={handleReset}
                      icon={<Restore />}
                    />
                    

           
                  </div>
            </form>


            {isOpenModal && (
              <RequestModal size="xl" >
                <ViewFundTransfer onClose={handleClose} onReset = {handleReset}   formData = {formData}  requestType={requestType}/>
              </RequestModal>
            )}

        </div>
    )    
}