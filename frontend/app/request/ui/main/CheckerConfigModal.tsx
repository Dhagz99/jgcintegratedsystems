import { Add } from "@mui/icons-material";
import ButtonComponents from "../../components/Buttons";
import { useState } from "react";
import RequestModal from "../../components/RequestModal";
import AddCheckerModal from "../forms/AddCheckerModal";
import { useDeleteChecker, useFetchChecker } from "../../hooks/useRequest";
import { CheckerData } from "../../lib/request.schema";
import { ButtonGroup } from "../../components/ButtonDesign";
import SweetAlert from "../../components/Swal";
import { showSuccess } from "../../components/ToastAlert";
import { CheckerWithName } from "../../type/RequestType";



export default function CheckerConfigModal() {
    const [addModal, setAddModal] = useState(false);
    const [selectedChecker, setSelectedChecker] = useState<CheckerWithName | null>(null);

    const handleAdd = ()=>{
        setAddModal(true);
        console.log("add");
    }
    const handleCLoseModal = () =>{
        setAddModal(false);
        setSelectedChecker(null);
    }
    const {mutate, isPending, error} = useDeleteChecker();

    const handleDelete = (checker: CheckerWithName) =>{
        SweetAlert.confirmationAlert('Are you sure you want to delete this?','',
            ()=>(
            mutate(checker, {
                onSuccess: ()=>{
                showSuccess({ message: "Checker  Successfully Deleted!", position: "top-center" });
                  }
                })
           ));
    }

    const handleEditChecker = (data: CheckerWithName) =>{
        setAddModal(true);
        setSelectedChecker(data);
    }
    const [confirmOpen, setConfirmOpen] = useState(false);

    const {data, isLoading} = useFetchChecker();
    return(
        <div className="flex flex-col">
            <div className="flex justify-center">
                          <h2 className="text-xl font-semibold">
                               Checker & Approver Configuration
                          </h2>
                      </div>
                      <div className="flex">
                        <ButtonComponents label="Add" size="sm" icon={<Add />} onClick={handleAdd}/>
                      </div>
                      <div className="relative overflow-x-auto mt-2.5">
                      <table className="w-full text-xs text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-100 ">
                                <tr>
                                <th scope="col" className="px-6 py-3 rounded-tl-xl">
                                        Action
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Name
                                     </th>
                                    <th scope="col" className="px-6 py-3">
                                    Position
                                    </th>
                                    <th scope="col" className="px-6 py-3 rounded-tr-xl">
                                    Initial
                                    </th>
                                </tr>
                            </thead>
                              <tbody>
                                 {isLoading ? (
                                    <tr>
                                    <td colSpan={4} className="px-6 py-4 text-center">Loading...</td>
                                    </tr>
                                ) : (
                                    data?.map((checker: CheckerWithName) => (
                                    <tr key={checker.id} className="bg-white border-b border-gray-200 hover:bg-gray-50 cursor-pointer">
                                        <td className="px-6 py-1.5">
                                        <ButtonGroup onEdit={()=> handleEditChecker(checker)} onDelete={() => handleDelete(checker)} />
                                        </td>
                                        <td className="px-6 py-1.5">{checker.checkerName?.name}</td>
                                        <td className="px-6 py-1.5">{checker.position}</td>
                                        <td className="px-6 py-1.5">{checker.initial}</td>
                                    </tr>
                                    ))
                                )}
                              </tbody>
                      </table>
                      </div>
                   

                   
                    {addModal  && (
                        <RequestModal size="lg" nested title="Add Checker" onClose={handleCLoseModal}>
                            <AddCheckerModal onClose={handleCLoseModal} selectedData = {selectedChecker} />
                        </RequestModal>
                    )}
        </div>
    )
}
    