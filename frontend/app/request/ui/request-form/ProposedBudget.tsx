"use client";
import { useEffect, useState } from "react";
import RequestModal from "../../components/RequestModal";
import { ExpenseType,BudgetItem } from "../../type/FormType";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import SweetAlert from "../../components/Swal";
import { FormProps } from "../../type/FormType";
import ViewProposedBudget from "../request-view/ViewProposedBudget";

import { useFetchBranches } from "../../hooks/useRequest";
import { useFetchUser } from "@/hooks/useAuth";

export default function ProposedBudget({requestTypeId, requestType}: FormProps) {
    
  const { data: user } = useFetchUser();
  const { data: branches, isLoading, isError } = useFetchBranches();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lockedMonth, setLockedMonth] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [items, setItems] = useState<BudgetItem[]>([]);
  const [selectedType, setSelectedType] = useState<ExpenseType>("ADMIN & PERSONNEL");
  const [lockedBranch, setLockedBranch] = useState<number | null>(null);


  const [form, setForm] = useState<BudgetItem>({
    expense_type: "ADMIN & PERSONNEL",
    description: "",
    budget: "",
    total_expenses: "",
    variance: "",
    proposed_budget: "",
    month_of:"",
    remarks: "",
    requestTypeId: requestTypeId,
    requestFromId: 0,
  });
  
  
  useEffect(() => {
    if (user?.branchId) {
      setForm((prev) => ({ ...prev, requestFromId: user.branchId ?? 0}));
    }
  }, [user]);
  

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
  
    setForm((prev) => {
      const updated = { ...prev, [name]: value };
  

      if (name === "budget" || name === "total_expenses") {
        const budgetNum = Number(updated.budget) || 0;
        const totalExpNum = Number(updated.total_expenses) || 0;
        updated.variance = (budgetNum - totalExpNum).toString();
      }
  
      return updated;
    });
  };
  

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (isAdding) return;             
    setIsAdding(true);
  

    const monthToUse = lockedMonth ?? form.month_of;
    const branchToUse = lockedBranch ?? form.requestFromId;

    const newItem: BudgetItem = {
      ...form,
      id: crypto.randomUUID(),
      month_of: monthToUse,
      requestFromId: branchToUse,
    };
  
    setItems(prev => [...prev, newItem]);
  
    
    if (!lockedMonth && monthToUse) setLockedMonth(monthToUse);
    if (!lockedBranch && branchToUse) setLockedBranch(branchToUse);
  
  
    setForm(prev => ({
      ...prev,
      description: "",
      budget: "",
      total_expenses: "",
      variance: "",
      proposed_budget: "",
      month_of: monthToUse ?? "",
      remarks: "",
      requestTypeId: requestTypeId,
      requestFromId: branchToUse,
    }));
  
    
    setIsAdding(false);
  };
  




  const filteredItems = items.filter((item) => item.expense_type === selectedType);

  
  const handleOpenModal = async () => {
      setIsModalOpen(true); 
  };

  const handleDelete = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };


  const handleSuccess = () => {
    SweetAlert.successAlert("Saved", "Form saved successfully");
    setItems([]); 
    setForm({
      expense_type: "ADMIN & PERSONNEL",
      description: "",
      budget: "",
      total_expenses: "",
      variance: "",
      proposed_budget: "",
      month_of: "",
      remarks: "",
      requestTypeId: requestTypeId,
      requestFromId: user?.branchId ?? 0,  
    }); 
    setLockedMonth(null);
    setLockedBranch(null);
    setIsModalOpen(false); 
  };
  

  return (
    <div className="bg-white border border-[#ECECEC] min-h-80 p-4 rounded-md">
      <div className="text-center">
        <h2 className="font-bold text-xl">PROPOSED BUDGET</h2>
      </div>

      <div>
        <form onSubmit={handleSave} className="grid grid-cols-[repeat(auto-fit,minmax(15rem,1fr))] gap-4 px-4 mt-8">
          <div className="grid">
            <label className="font-semibold font-sm mb-2">Expense Type</label>
            <select
              name="expense_type"
              value={form.expense_type}
              onChange={handleChange}
              className="border border-gray-300 bg-gray-50 p-2 rounded-lg">
              <option value="ADMIN & PERSONNEL">Admin & Personnel EXP</option>
              <option value="OFFICE & OTHER">Office & Other EXP</option>
              <option value="UNBUDGETED">Unbudgeted EXP</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="font-semibold font-sm mb-2">Description</label>
            <input
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Enter description..."
              className="border border-gray-300 rounded-lg p-2 bg-gray-50"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold font-sm mb-2">Budget</label>
            <input
              type="number"
              name="budget"
              value={form.budget}
              onChange={handleChange}
              placeholder="Enter budget..."
              className="border border-gray-300 rounded-lg p-2 bg-gray-50"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold font-sm mb-2">Total Expenses</label>
            <input
              type="number"
              name="total_expenses"
              placeholder="Enter Total Expenses..."
              value={form.total_expenses}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-2 bg-gray-50"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-2 font-semibold font-sm">Variance</label>
            <input
              type="number"
              name="variance"
              value={parseFloat(form.variance).toFixed(2)}
              readOnly
              className="border border-gray-300 rounded-lg p-2 bg-gray-50"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-2 font-semibold font-sm">Proposed Budget</label>
            <input
              type="number"
              name="proposed_budget"
              placeholder="Enter proposed budget..."
              value={form.proposed_budget}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg bg-gray-50 p-2"
            />
          </div>

          <div className="flex flex-col">
            <label className="mr-2 mb-2 font-semibold">Request From:</label>
            <select
                name="requestFromId"
                value={form.requestFromId}
                onChange={handleChange}
                disabled={!!lockedBranch}   // ✅ disable after first save
                className={`border border-gray-300 bg-gray-50 p-2 rounded-lg ${
                  lockedBranch ? "bg-gray-200 cursor-not-allowed" : ""
                }`}
              >
                <option value={0}>-- Select Branch --</option>
                {branches?.map((branch) => (
                  <option key={branch.id} value={branch.id}>
                    {branch.branchName}
                  </option>
                ))}
              </select>
              {lockedBranch && (
                <span className="text-xs text-yellow-700 mt-1">
                  Locked to this branch until you submit in the modal or refresh to clear
                </span>
              )}

          </div>



   
          <div className="flex flex-col">
            <label className="mb-2 font-semibold font-sm">Remarks</label>
            <textarea
              name="remarks"
              placeholder="Enter Remarks..."
              value={form.remarks}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-2 bg-gray-50"
            ></textarea>
          </div>


          <div className="flex flex-col">
            <label className="mb-2 font-semibold font-sm">For the month of</label>
            <div className="flex flex-col">
              <input
                type="month"
                name="month_of"
                value={form.month_of}
                onChange={handleChange}
                disabled={!!lockedMonth}
                required
                className={`border border-gray-300 rounded bg-gray-50 p-2 ${lockedMonth ? "bg-gray-200 cursor-not-allowed" : ""}`}
              />
               {lockedMonth && (
                <span className="text-xs text-yellow-700 mt-1">
                  Locked to this month until you submit in the modal or refresh to clear
                </span>
              )} 
            </div>
          </div>

       

    


       
          <div className="col-span-full pb-6 mt-8">
          <button
              type="submit"
              disabled={isAdding}
              className="bg-green-800 hover:bg-green-600 disabled:opacity-60 px-7 py-1 text-white rounded shadow-lg">
              {isAdding ? "Saving..." : "Save"}
          </button>

          </div>
        </form>
      </div>

      <div className="border-t border-gray-300 pt-4">
        <div className="flex justify-between items-center gap-x-4 mt-4">
        
          <div className="flex gap-x-2">
            {(["ADMIN & PERSONNEL", "OFFICE & OTHER", "UNBUDGETED"] as ExpenseType[]).map(
              (type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setSelectedType(type)}
                  className={`px-4 py-1 text-white rounded hover:bg-blue-600 ${
                    selectedType === type ? "bg-blue-600" : "bg-blue-950"
                  }`}>
                  {type}
                </button>
              )
            )}
          </div>

          <div>
            <button className="bg-green-800 hover:bg-green-600 text-white py-1 px-6 rounded" onClick={handleOpenModal}>
              Submit
            </button>
          </div>
        </div>
      </div>


    


      <div className="mt-6">
        {filteredItems.length > 0 ? (
          <table className="w-full border border-gray-300 text-sm">
            <thead>
              <tr className="bg-gray-700 text-white">
                <th className="border border-gray-200 px-2 py-1 font-semibold">Description</th>
                <th className="border border-gray-200 px-2 py-1 font-semibold">Budget</th>
                <th className="border border-gray-200 px-2 py-1 font-semibold">Total Expenses</th>
                <th className="border border-gray-200 px-2 py-1 font-semibold">Variance</th>
                <th className="border border-gray-200 px-2 py-1 font-semibold">Proposed Budget</th>
                <th className="border border-gray-200 px-2 py-1 font-semibold">Remarks</th>
                <th className="border border-gray-200 px-2 py-1 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item, index) => (
                <tr key={index}>
                  <td className="border border-gray-200 px-2 py-1">{item.description}</td>
                  <td className="border border-gray-200 px-2 py-1">{item.budget}</td>
                  <td className="border border-gray-200 px-2 py-1">{item.total_expenses}</td>
                  <td className="border border-gray-200 px-2 py-1">{item.variance}</td>
                  <td className="border border-gray-200 px-2 py-1">{item.proposed_budget}</td>
                  <td className="border border-gray-200 px-2 py-1">{item.remarks}</td>
                  <td className="border border-gray-200 px-2 py-1 text-center">
                  <button
                    onClick={() => handleDelete(index)}
                    className="text-red-600 hover:text-red-900 font-bold"><DeleteForeverIcon/>
                  </button>
                </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500 italic">No items for this category.</p>
        )}
      </div>















         {isModalOpen && (
              <RequestModal title="Proposed Budget Summary" size="xxxl" onClose={() => setIsModalOpen(false)}>
                <ViewProposedBudget
                    requestType={requestType}
                    formData={{
                        items,
                        monthOf: lockedMonth ?? form.month_of,
                        requestFromId: form.requestFromId,
                        branchName: user?.branchName ?? "",
                        requestedBy: user?.name ?? "",  
                        requestedPosition: user?.position ?? "",
                    }}
                    onSuccess={handleSuccess}
                    onClose={() => setIsModalOpen(false)}
                    />

               
              </RequestModal>
            )} 


    </div>
  );
}