import { Add } from "@mui/icons-material";
import ButtonComponents from "../../components/Buttons";
import { useState } from "react";
import RequestModal from "../../components/RequestModal";
import { useDeleteBranch, useDeleteChecker, useFetchBranches,  } from "../../hooks/useRequest";
import { Branch, CheckerData } from "../../lib/request.schema";
import { ButtonGroup } from "../../components/ButtonDesign";
import SweetAlert from "../../components/Swal";
import { showSuccess } from "../../components/ToastAlert";
import AddRequestModal from "../forms/AddRequestModal";
import AddBranchModal from "../forms/AddBranchModal";
import { tr } from "zod/v4/locales";



export default function BranchConfigModal() {
    const [addModal, setAddModal] = useState(false);
    const [selectedData, setSelectedData] = useState<Branch | null>(null);

    const handleAdd = ()=>{
        setAddModal(true);
        console.log("add");
    }
    const handleCLoseModal = () =>{
        setAddModal(false);
        setSelectedData(null);
    }
    const {mutate, isPending, error} = useDeleteBranch();
    const handleDelete = (branch: Branch) => {
        SweetAlert.confirmationAlert(
          "Are you sure you want to delete this?",
          "",
          () =>
            mutate(branch.id!, {
              onSuccess: () => {
                showSuccess({
                  message: "Checker Successfully Deleted!",
                  position: "top-center",
                });
              },
            })
        );
      };

    const handleEditChecker = (data: Branch) =>{
        setAddModal(true);
        setSelectedData(data);
    }

    const {data, isLoading} = useFetchBranches();
    return(
        <div className="flex flex-col">
            <div className="flex justify-center">
                          <h2 className="text-xl font-semibold">
                               Branch Configuration
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
                                      Branch Code
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                     Branch Name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                      BOM
                                    </th>
                                    <th scope="col" className="px-6 py-3 rounded-tr-xl">
                                        F & A
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                    {isLoading ? (
                                        <tr>
                                            <td colSpan={5}>Loading...</td>
                                        </tr>
                                    ):(
                                    data?.map((branch: Branch) =>(
                                        <tr key={branch.id}>
                                            <td>
                                              <ButtonGroup onEdit={()=> handleEditChecker(branch)} onDelete={() => handleDelete(branch)} />
                                            </td>
                                            <td>{branch.branchCode}</td>
                                            <td>{branch.branchName}</td>
                                            <td>{branch.bom}</td>
                                            <td>{branch.faa}</td>
                                        </tr>
                                    ))
                                    
                                )}
                            </tbody>
                          
                      </table>
                      </div>
                   

                   
                    {addModal  && (
                        <RequestModal size="lg" nested title="Add Branch" onClose={handleCLoseModal}>
                            <AddBranchModal onClose={handleCLoseModal} selectedData = {selectedData} />
                        </RequestModal>
                    )}
        </div>
    )
}
    