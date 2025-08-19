import { Add } from "@mui/icons-material";
import ButtonComponents from "../../components/Buttons";
import { useState } from "react";
import RequestModal from "../../components/RequestModal";
import { useDeleteBranch,  useFetchBranches, useFetchUserList,  } from "../../hooks/useRequest";
import { Branch } from "../../lib/request.schema";
import { ButtonGroup } from "../../components/ButtonDesign";
import SweetAlert from "../../components/Swal";
import { showSuccess } from "../../components/ToastAlert";
import AddBranchModal from "../forms/AddBranchModal";
import AddAccountModal from "../forms/AddAccountModal";
import { PublicUserDTO } from "@/types/auth.type";


export default function AccountManagerModal() {
    const [addModal, setAddModal] = useState(false);
    const [selectedData, setSelectedData] = useState<PublicUserDTO | null>(null);

    const handleAdd = ()=>{
        setAddModal(true);
        console.log("add");
    }
    const handleCLoseModal = () =>{
        setAddModal(false);
        setSelectedData(null);
    }

    
    const {mutate, isPending, error} = useDeleteBranch();
    const handleDelete = (branch: PublicUserDTO) => {
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

    const handleEditChecker = (data: PublicUserDTO) =>{
        setAddModal(true);
        setSelectedData(data);
    }

    const {data, isLoading} = useFetchUserList();
    return(
        <div className="flex flex-col">
            <div className="flex justify-center">
                          <h2 className="text-xl font-semibold">
                               Account Configuration
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
                                      Email
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                      Username
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                    Role
                                    </th>
                                    <th scope="col" className="px-6 py-3 rounded-tr-xl">
                                        Branch Name
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                    {isLoading ? (
                                        <tr>
                                            <td colSpan={5}>Loading...</td>
                                        </tr>
                                    ):(
                                    data?.map((user: PublicUserDTO) =>(
                                        <tr key={user.id}>
                                            <td>
                                              <ButtonGroup onEdit={()=> handleEditChecker(user)} onDelete={() => handleDelete(user)} />
                                            </td>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                            <td>{user.username}</td>
                                            <td>{user.role}</td>
                                            <td>{user.branch?.branchName}</td>
                                        </tr>
                                    ))
                                    
                                )}
                            </tbody>
                          
                      </table>
                      </div>
                   

                   
                    {addModal  && (
                        <RequestModal size="lg" nested title="Add Account" onClose={handleCLoseModal}>
                            <AddAccountModal onClose={handleCLoseModal} selectedData = {selectedData} />
                        </RequestModal>
                    )}
        </div>
    )
}
    