import { CloseRounded, Save } from "@mui/icons-material";
import ButtonComponents from "../../components/Buttons";
import { CreateFundTrasnfer } from "../../lib/request.schema";
import { RequestTypeDTO } from "../../type/RequestType";
import { FormattedDate } from "@/app/utils/DateFormatter";
import { useAddFundTransfer, useFetchBranches, useFetchChecker, useFetchUserList } from "../../hooks/useRequest";
import { useFetchUser } from "@/hooks/useAuth";
import { showSuccess } from "../../components/ToastAlert";

type FormProps = {
  requestType?: RequestTypeDTO | null;
  formData?: CreateFundTrasnfer | null;
  onClose?: () => void;
  onReset?: () => void;
}

export default function ViewFundTransfer ({requestType, formData, onClose, onReset} : FormProps){
     const {data: checkers, isLoading: checkerLoading} = useFetchUserList();
    const { data: branches = [] } = useFetchBranches();
    const { data: user , isLoading: userLoading } = useFetchUser();
    const {mutate: addFundTransfer, isPending: isAdding} = useAddFundTransfer();

    const checker = checkers?.find(c => c.id === formData?.requestToId) ?? null;
    const branch = branches.find(b => b.id === formData?.requestFromId);

    const handleSubmint = () => {
        addFundTransfer(formData as CreateFundTrasnfer, {
            onSuccess: () => {
                const duration = 3000;
                showSuccess({
                  message: "Branch added successfully!",
                  position: "top-center",
                  duration,
                });
                onReset?.();
                onClose?.();
            }
          }) 
    }

    return(
        <div className="flex flex-col px-10 overflow-auto max-h-150">
            <div className="flex flex-col justify-center items-center font-extrabold text-xl">
                <h1>{branch?.companyName ?? ''}</h1>
                <h1>{branch?.branchName ?? ''} </h1>
            </div>
            <div className="flex flex-col border-t-3 border-b-3 mt-3 py-2 font-semibold">
                <div className="flex gap-3">
                    <p className="w-20">To</p>
                    <p>:</p>
                    <div className="flex flex-col">
                        <p>{checker?.name ?? ''}</p>
                        <p className="text-center">{checker?.position ?? ''}</p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <p className="w-20">From</p>
                    <p>:</p>
                    <div className="flex flex-col">
                        <p>{branch?.branchName ?? ''}</p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <p className="w-20">Report</p>
                    <p>:</p>
                    <div className="flex flex-col">
                        <p>{requestType?.requestName}</p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <p className="w-20">Date</p>
                    <p>:</p>
                    <div className="flex flex-col">
                        <p>
                            <FormattedDate value={formData?.requestDate} />
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex flex-col py-5 gap-3 font-semibold">
                <div className="indent-8">
                    <p>Good Day!</p>
                </div>
                <div className="flex">
                    <p className="indent-8">{formData?.requestContent}</p>
                </div>
                <p className="indent-8">Your favorable response with this matter would be highly appreciated.</p>
                <p className="indent-8">Thank you very much & God Bless</p>
            </div>
            {/* Footer  */}
            <div className="flex flex-col">
                <div className="flex flex-col justify-start">
                 <div className="flex flex-col w-31">
                    <p className="self-start">Respectfully yours,</p>
                    <p className="self-center font-extrabold">(signed)</p>
                 </div>
                    <div className="flex flex-col">
                        <p className="font-extrabold">{user?.name}</p>
                        <p className="font-bold">BRANCH F & A</p>
                    </div>
                </div>
                <div className="flex mt-8 gap-30">  
                    <div className="flex flex-col gap-10">
                        <div className="flex flex-col gap-5">
                        <p>Recommending Approval</p>
                            <div className="flex flex-col">
                                <p className="font-extrabold">
                                     {requestType?.recomApproval?.name ?? ''}
                                </p>
                                <p className="font-bold">
                                     {requestType?.recomApproval?.position?? ''}
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <div className="flex flex-col">
                                <p className="font-extrabold">
                                     {requestType?.recomApproval2?.name ?? ''}
                                </p>
                                <p className="font-bold">
                                      {requestType?.recomApproval2?.position ?? ''}
                                 </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex">
                        <div className="flex flex-col gap-5">
                            <p>Approved by:</p>
                                <div className="flex flex-col">
                                    <p className="font-extrabold">
                                          {requestType?.approveBy?.name ?? ''}
                                    </p>
                                    <p className="font-bold">
                                        {requestType?.approveBy?.position ?? ''}
                                    </p>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-end gap-2">
                <ButtonComponents label="Submit with e signature" onClick={handleSubmint} variant="success" icon={<Save />} />
                <ButtonComponents label="Close" variant="danger" onClick={onClose} icon={<CloseRounded />} />
            </div>   
        </div>

    )
}
