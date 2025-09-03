import RequestModal from "../../components/RequestModal";
import ViewDisburse from "../request-view/ViewDisburse";
import { useEffect, useState } from "react";
import { AddBox } from "@mui/icons-material";
import { Category } from "../../type/FormType";
import { FormProps } from "../../type/FormType";
import { useFetchUser } from "@/hooks/useAuth";
import { useFetchBranches, useFetchUserList } from "../../hooks/useRequest";
import { Option1 } from "../../type/RequestType";
import SearchableInput from "../../components/SearchableInputs";
  

  

export default function Disburse({requestTypeId, requestType}:FormProps){
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);
    const { data: users = [] } = useFetchUserList();
    const { data: user } = useFetchUser();
    const { data: branches = [], isLoading, isError } = useFetchBranches();
    const myBranch = branches.find(b => b.id === user?.branchId);


    const [formData,setFormData] = useState({
        toId: 0,     
        toName: "",    
        fromId: 0,
        fromName: "",
        subject: '',
        date: '',
        description: '',
        note:'',
        requestTypeId:requestTypeId,
        toPosition:'',
    });


    const userOptions: Option1[] = users.map((u) => ({
        id: u.id,
        name: u.name,
        position: u.position,
      }));
      

      useEffect(() => {
        if (user && branches) {
          const selectedBranch = branches.find(b => b.id === user.branchId);
          setFormData((prev) => ({
            ...prev,
            fromId: user.branchId ?? 0,
            fromName: selectedBranch?.branchName ?? "",
          }));
        }
      }, [user, branches]);
      

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({...prevData,[name]: value }));
    };

    const handleOpenModal = async () => {
        setIsModalOpen(true); 
    };



    const handleInputChangeForCategory = (categoryId: number, field: 'categoryName', value: string) => {
        setCategories((prevCategories) =>
          prevCategories.map((cat) =>
            cat.id === categoryId ? { ...cat, [field]: value } : cat
          )
        );
      };
    
      const handleInputChangeForBudget = (categoryId: number, budgetId: number, field: 'budgetName' | 'amount', value: string) => {
        setCategories((prevCategories) =>
          prevCategories.map((cat) =>
            cat.id === categoryId
              ? {
                  ...cat,
                  budgets: cat.budgets.map((budget) =>
                    budget.id === budgetId ? { ...budget, [field]: value } : budget
                  ),
                }
              : cat
          )
        );
      };
    

      const handleAddCategory = () => {
        setCategories((prevCategories) => [
          ...prevCategories,
          { id: Date.now(), categoryName: '', budgets: [{ id: Date.now(), budgetName: '', amount: '' }] },
        ]);
      };

      const handleAddBudget = (categoryId: number) => {
        setCategories((prevCategories) =>
          prevCategories.map((cat) =>
            cat.id === categoryId
              ? {
                  ...cat,
                  budgets: [...cat.budgets, { id: Date.now(), budgetName: '', amount: '' }],
                }
              : cat
          )
        );
      };
    
  
      const handleRemoveBudget = (categoryId: number, budgetId: number) => {
        setCategories((prevCategories) =>
          prevCategories.map((cat) =>
            cat.id === categoryId
              ? {
                  ...cat,
                  budgets: cat.budgets.filter((budget) => budget.id !== budgetId),
                }
              : cat
          )
        );
      };
    
        
    const handleRemoveCategory = (categoryId: number) => {
        setCategories((prevCategories) => prevCategories.filter((cat) => cat.id !== categoryId));
    };


    const handleResetForm = () => {
      setFormData({
        toId: 0,
        toName: "",
        fromId: 0,
        fromName: "",
        subject: "",
        date: "",
        description: "",
        note: "",
        requestTypeId: requestTypeId,
        toPosition: "",
      });
      setCategories([]); 
    };
    

    return (

        <div className="bg-white border border-[#ECECEC] min-h-90 py-8 px-3 rounded-md">
          <div className="text-center">
            <h2 className="p-4 font-bold text-xl">DISBURSE</h2>
          </div>
    
          <div>
            <form className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4 px-4 mt-8">
              <div className="flex flex-col">
                <label htmlFor="to" className="mb-2 font-semibold font-sm">To</label>
                <SearchableInput
                    data={userOptions}
                    placeholder="Search user..."
                    name="to"
                    value={formData.toId}
                    onChange={(value) => {
                        const selected = userOptions.find(u => u.id === value);
                        setFormData(prev => ({
                        ...prev,
                        toId: value as number,
                        toName: selected?.name ?? "",
                        toPosition:selected?.position ?? "",
                        }));
                    }}
                    />
              </div>
    
              <div className="flex flex-col">
                <label className="mr-2 mb-2 font-semibold">From:</label>
                <select
                    name="fromId"
                    value={formData.fromId}
                    onChange={(e) => {
                        const branchId = Number(e.target.value);
                        const selectedBranch = branches?.find(b => b.id === branchId);
                        setFormData(prev => ({
                        ...prev,
                        fromId: branchId,
                        fromName: selectedBranch?.branchName ?? "",
                        }));
                    }}
                    className="border border-gray-300 bg-gray-50 p-2 rounded-lg">
                    <option value={0}>-- Select Branch --</option>
                    {branches?.map((branch) => (
                        <option key={branch.id} value={branch.id}>
                        {branch.branchName}
                        </option>
                    ))}
                    </select>
                </div>
    
              <div className="flex flex-col">
                <label htmlFor="subject" className="mb-2 font-semibold font-sm">Subject</label>
                <input
                  type="text"
                  name="subject"
                  id="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="Enter Subject..."
                  className="border border-gray-300 rounded-lg bg-gray-50 p-2"
                />
              </div>
    
              <div className="flex flex-col">
                <label htmlFor="date" className="mb-2 font-semibold font-sm">Date</label>
                <input
                  type="date"
                  name="date"
                  id="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-lg p-2 bg-gray-50"
                />
              </div>
    
              <div className="col-span-2 flex flex-col">
                <label htmlFor="description" className="mb-2 font-semibold font-sm">Description</label>
                <textarea
                  name="description"
                  id="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Enter Description..."
                  className="border border-gray-300 p-2 bg-gray-50 rounded-lg">
                  </textarea>
              </div>

              <div className="col-span-2 flex flex-col">
                <label htmlFor="note" className="mb-2 font-semibold font-sm">Note</label>
                <textarea
                  name="note"
                  id="note"
                  value={formData.note}
                  onChange={handleInputChange}
                  placeholder="Enter Note..."
                  className="border border-gray-300 p-2 bg-gray-50 rounded-lg">
                  </textarea>
              </div>


             
       
              <div className="flex flex-start col-span-full">
                <button type="button" onClick={handleAddCategory}>
                  <span className="mr-2 font-semibold">ADD BUDGET</span>
                  <AddBox className="text-green-600 hover:text-green-800 shadow-xl" fontSize="large" />
                </button>
              </div>

            
          {categories.map((category) => (
            <div key={category.id} className="col-span-2">
           <div className="flex flex-col mb-2">
              <label className="mb-2 font-semibold" htmlFor={`categoryName-${category.id}`}>Category Name (Optional)</label>
              <div className="flex items-center">
                <input
                  type="text"
                  name={`categoryName-${category.id}`}
                  id={`categoryName-${category.id}`}
                  value={category.categoryName || ''}
                  onChange={(e) => handleInputChangeForCategory(category.id, 'categoryName', e.target.value)}
                  className="border border-gray-300 shadow p-2 rounded-lg mb-2 flex-1 bg-gray-100"
                  placeholder="e.g., Meal Allowance"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveCategory(category.id)}
                  className="ml-2 text-red-600 hover:text-red-800 font-bold">
                  X
                </button>
              </div>
            </div>
              {category.budgets.map((budget, index) => (
                <div key={budget.id} className="grid grid-cols-2 gap-4 mb-2 items-center">
                  <div className="flex flex-col">
                    <label className="mb-2" htmlFor={`budgetName-${category.id}-${budget.id}`}>Budget Name</label>
                    <input
                      type="text"
                      name={`budgetName-${category.id}-${budget.id}`}
                      id={`budgetName-${category.id}-${budget.id}`}
                      value={budget.budgetName}
                      placeholder="Enter budget..."
                      onChange={(e) => handleInputChangeForBudget(category.id, budget.id, 'budgetName', e.target.value)}
                      className="border border-gray-300 bg-gray-100 shadow rounded-lg p-2"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="mb-2" htmlFor={`amount-${category.id}-${budget.id}`}>Amount</label>
                    <div className="flex items-center">
                      <input
                        type="number"
                        name={`amount-${category.id}-${budget.id}`}
                        id={`amount-${category.id}-${budget.id}`}
                        value={budget.amount}
                        placeholder="Enter Amount..."
                        onChange={(e) => handleInputChangeForBudget(category.id, budget.id, 'amount', e.target.value)}
                        className="border border-gray-300 bg-gray-100 shadow rounded-lg p-2 flex-1"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveBudget(category.id, budget.id)}
                        className="ml-2 text-red-600 hover:text-red-800 font-bold"
                      >
                        X
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {category.budgets.length > 0 && (
                <div className="col-span-2 flex justify-end mt-5 mr-4">
                  <button
                    type="button"
                    onClick={() => handleAddBudget(category.id)}
                    className="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700">
                    + Add Budget
                  </button>
                </div>
              )}
            </div>
          ))}


    
              <div className="col-span-full">
                <button
                  type="button"
                  className="bg-green-800 hover:bg-green-600 text-white px-8 py-1 rounded mt-4"
                  onClick={handleOpenModal}>
                  Submit
                </button>
              </div>
            </form>
          </div>

            
                {isModalOpen && (
                <RequestModal title="Disburse Summary" size="lg" onClose={() => setIsModalOpen(false)}>
                <ViewDisburse
                    formData={{ ...formData,
                        companyName: branches?.find(b => b.id === formData.fromId)?.companyName ?? "",   
                        telephone: branches?.find(b => b.id === formData.fromId)?.telephone ?? "",
                        branchName: branches?.find(b => b.id === formData.fromId)?.branchName ?? "",
                        address: branches?.find(b => b.id === formData.fromId)?.address ?? "",
                    }}
                    categories={categories}
                    onClose={() => setIsModalOpen(false)}
                    onReset={handleResetForm} 
                    requestType={requestType}
                    />
                </RequestModal>
                )}

          </div>
      )    

   }


