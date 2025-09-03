
import { useFetchUser } from "@/hooks/useAuth";
import SweetAlert from "../../components/Swal";
import { useAddDisburse } from "../../hooks/userForm";
import { DisbursePaperProps, FormDataDisburse } from "../../type/FormType";
import { formatLongDate } from "@/app/utils/DateFormatter";

  
  export default function ViewDisburse({ formData,categories,onClose,onReset,requestType }: DisbursePaperProps) {
    if (!formData) return null; 
    if (!categories) return null; 
    const addMutation = useAddDisburse();
     const { data: user , isLoading: userLoading } = useFetchUser();


    const totalAmount = categories
    .flatMap((c) => c.budgets)
    .reduce((total, b) => {
      const amount = parseFloat(b.amount);
      return isNaN(amount) ? total : total + amount;
    }, 0);

    const handleSave = () => {
        const payload: FormDataDisburse = {
          toId:formData.toId,
          toName: formData.toName,
          fromName: formData.fromName,
          subject: formData.subject,
          date: formData.date,
          description: formData.description,
          note: formData.note,
          total_amount: totalAmount,
          requestTypeId: formData.requestTypeId,
          requestFromId: formData.fromId,
          items: categories,
        };
    
        addMutation.mutate(payload, {
          onSuccess: (res) => {
            SweetAlert.successAlert("Saved", "Form saved successfully");
            onClose?.(); 
            onReset?.();
          },
          onError: (err) => {
            console.error("Save failed:", err);
          },
        });
      };

  

    return (
      <div className="py-8 px-15 max-h-[70vh] overflow-y-auto">
        

        <div className="flex justify-center flex-col w-full text-center pb-10">
            <h1 className="text-3xl font-bold">{formData.companyName}</h1>
            <h3>{formData.address}</h3>
            <h3>Tel No: {formData.telephone}</h3>
        </div>

        <div className="border-t-2 border-gray-500 border-b-2">
            <div className="flex mt-4">
                <div><span className="font-semibold pr-10">To: </span>{formData.toName}<br></br><span className="pl-15">{formData.toPosition}</span> </div>
            </div>

            <div className="flex mt-2">
                <div><span className="font-semibold pr-6">From: </span>{formData.fromName}</div>
            </div>

            <div className="flex mt-2">
                <div><span className="font-semibold pr-3">Subject: </span>{formData.subject}</div>
            </div>

            <div className="flex mt-2 mb-4">
                <div><span className="font-semibold pr-7">Date: </span>{formatLongDate(formData.date)}</div>
            </div>

        </div>


        <div className="mt-8 ">
            <div className="mb-6">
                <h3>Good day!</h3>
            </div>

            <div>
                {formData.description}
            </div>
        </div>



        <div className="mt-8 px-10">
            {categories.length > 0 ? (
                <div className="w-5/12">
                {categories.map((category) => (
                    <div key={category.id} className="mb-6">
                    {category.categoryName && (
                        <h4 className="font-extrabold text-md mb-2">{category.categoryName}</h4>
                    )}
                    <div className="space-y-1">
                        {category.budgets.map((budget) => (
                        <div
                            key={`${category.id}-${budget.id}`}
                            className="flex justify-between"
                        >
                            <span className="flex-1">{budget.budgetName}</span>
                            <span className="w-16 text-right">{budget.amount}</span>
                        </div>
                        ))}
                    </div>
                    </div>
                ))}

                <div className="flex justify-between border-t pt-1 font-bold">
                    <h2>TOTAL</h2>
                    <h2>
                    <span className="mr-2">Php</span>
                    {categories
                        .flatMap((category) => category.budgets)
                        .reduce((total, budget) => {
                        const amount = parseFloat(budget.amount);
                        return isNaN(amount) ? total : total + amount;
                        }, 0)
                        .toLocaleString('en-PH', { minimumFractionDigits: 2 })}
                    </h2>
                </div>
                </div>
            ) : (
                <p>No budget details provided.</p>
            )}
            </div>


            <div className="mt-20">
                <h2> {formData.note}</h2>
            </div>



            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2">
                <div>
                    <h2 className="font-bold">Respectfully yours</h2>
                    <p className="font-semibold mt-2">{user?.name}</p>
                    <p className="font-semibold">{user?.position}</p>

                    <h2 className="font-bold mt-4">Checked by:</h2>
                    <p className="font-semibold mt-2">{requestType?.checkedBy?.name}</p>
                    <p className="font-semibold">{requestType?.checkedBy?.position}</p>

                    <h2 className="font-bold mt-4">Recommending Approval:</h2>
                    <p className="font-semibold mt-2">{requestType?.recomApproval?.name}</p>
                    <p className="font-semibold">{requestType?.recomApproval?.position}</p>

                    <p className="font-semibold mt-2">{requestType?.recomApproval2?.name}</p>
                    <p className="font-semibold">{requestType?.recomApproval2?.position}</p>

                </div>
                <div>
                    <h2 className="font-bold">Noted by:</h2>
                    <p className="font-semibold mt-2">{requestType?.notedBy?.name}</p>
                    <p className="font-semibold">{requestType?.recomApproval2?.position}</p>
                    
                    <p className="font-semibold mt-10">{requestType?.checkedBy2?.name}</p>
                    <p className="font-semibold">{requestType?.checkedBy2?.position}</p>

                    <h2 className="font-bold mt-4">Approved by:</h2>
                    <p className="font-semibold mt-2">{requestType?.approveBy?.name}</p>
                    <p className="font-semibold">{requestType?.approveBy?.position}</p>

                </div>
         </div>


         <div className="flex justify-end">
            <div>
            <button className="bg-green-800 text-white px-8 py-1 rounded mt-4 hover:bg-green-700"
             type="button" disabled={addMutation.isPending} onClick={handleSave}>{addMutation.isPending ? "Saving..." : "Save"}</button>
            </div>
         </div>


      </div>
    );
  }

























  export  function ViewApprovalDisburse({ mainRequest, formData, onClose}: DisbursePaperProps) {
    const disburseItems = mainRequest?.disburse?.items ?? [];
        return(
            <div className="py-8 px-15 max-h-[70vh] overflow-y-auto">

            <div className="flex justify-center flex-col w-full text-center pb-10">
                    <h1 className="text-3xl font-bold">{mainRequest?.requestFrom?.companyName}</h1>
                    <h3 className="mt-2">{mainRequest?.requestFrom?.address}</h3>
                    <h3>Tel No: {mainRequest?.requestFrom?.companyName}</h3>
            </div>

            <div className="border-t-2 border-gray-500 border-b-2">
                <div className="flex mt-2">
                    <div><span className="font-semibold pr-10">To: </span>{mainRequest?.disburse?.requestTo?.name}<br></br><span className="pl-16">{mainRequest?.disburse?.requestTo?.position}</span> </div>
                </div>

                <div className="flex mt-2">
                    <div><span className="font-semibold pr-6">From: </span>{mainRequest?.disburse?.from}</div>
                </div>

                <div className="flex mt-2">
                    <div><span className="font-semibold pr-3">Subject: </span>{mainRequest?.disburse?.subject}</div>
                </div>

                <div className="flex mt-2 mb-2">
                    <div><span className="font-semibold pr-7">Date: </span>{formatLongDate(mainRequest?.disburse?.date)}</div>
                </div>

            </div>


            
            <div className="mt-8 ">
                <div className="mb-6">
                    <h3>Good day!</h3>
                </div>

                <div>
                    {mainRequest?.disburse?.description}
                </div>
            </div>




            <div className="mt-8 px-10">
                {disburseItems.length > 0 ? (
                    <div className="w-5/12">
                    {disburseItems.map((item) => (
                        <div key={item.id} className="mb-6">
                        {item.categoryName && (
                            <h4 className="font-extrabold text-md mb-2">{item.categoryName}</h4>
                        )}
                        <div className="space-y-1">
                            {item.budgets.map((budget) => (
                            <div key={`${item.id}-${budget.id}`}
                                className="flex justify-between">
                                <span className="flex-1">{budget.budgetName}</span>
                                <span className="w-16 text-right">{budget.amount}</span>
                            </div>
                            ))}
                        </div>
                        </div>
                    ))}

                    <div className="flex justify-between border-t pt-1 font-bold">
                        <h2>TOTAL</h2>
                        <h2>
                        <span className="mr-2">Php</span>
                        {disburseItems
                            .flatMap((item) => item.budgets)
                            .reduce((total, budget) => {
                            const amount = parseFloat(budget.amount);
                            return isNaN(amount) ? total : total + amount;
                            }, 0)
                            .toLocaleString("en-PH", { minimumFractionDigits: 2 })}
                        </h2>
                    </div>
                    </div>
                ) : (
                    <p>No budget details provided.</p>
                )}
                </div>

                <div className="mt-20">
                    <h2> {mainRequest?.disburse?.note}</h2>
                </div>


                <div className="mt-10 grid grid-cols-1 sm:grid-cols-2">
                <div>
                    <h2 className="font-bold">Respectfully yours</h2>
                    <p className="font-semibold mt-2">{mainRequest?.requestBy.name.toLocaleUpperCase()}</p>
                    <p className="font-semibold">{mainRequest?.requestBy.position}</p>

                    <h2 className="font-bold mt-4">Checked by:</h2>
                    <p className="font-semibold mt-2">{mainRequest?.requestType.checkedBy?.name.toLocaleUpperCase()}</p>
                    <p className="font-semibold">{mainRequest?.requestType.checkedBy?.position}</p>

                    <h2 className="font-bold mt-4">Recommending Approval:</h2>
                    <p className="font-semibold mt-2">{mainRequest?.requestType.recomApproval?.name.toLocaleUpperCase()}</p>
                    <p className="font-semibold">{mainRequest?.requestType.checkedBy?.position}</p>

                    <p className="font-semibold mt-2">{mainRequest?.requestType.recomApproval2?.name.toLocaleUpperCase()}</p>
                    <p className="font-semibold">{mainRequest?.requestType.recomApproval2?.position}</p>

                </div>
                <div>
                    <h2 className="font-bold">Noted by:</h2>
                    <p className="font-semibold mt-2">{mainRequest?.requestType.notedBy?.name.toLocaleUpperCase()}</p>
                    <p className="font-semibold">{mainRequest?.requestType.notedBy?.position}</p>
                    
                    <p className="font-semibold mt-10">{mainRequest?.requestType.checkedBy2?.name.toLocaleUpperCase()}</p>
                    <p className="font-semibold">{mainRequest?.requestType.checkedBy2?.position}</p>

                    <h2 className="font-bold mt-4">Approved by:</h2>
                    <p className="font-semibold mt-2">{mainRequest?.requestType.approveBy?.name.toLocaleUpperCase()}</p>
                    <p className="font-semibold">{mainRequest?.requestType.approveBy?.position}</p>

                </div>
         </div>




            </div>
        );


  }