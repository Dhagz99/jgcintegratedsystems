"use client";
import { useEffect, useState } from "react";
import { AddBox } from "@mui/icons-material";
import RequestModal from "../../components/RequestModal";
import ViewTransmittalMemo from "../request-view/ViewTransmittalMemo";
import { FormProps, TransmittalData } from "../../type/FormType";
import { useFetchUser } from "@/hooks/useAuth";
import { useFetchBranches, useFetchUserList } from "../../hooks/useRequest";
import SearchableInput from "../../components/SearchableInputs";
import { Option1 } from "../../type/RequestType";



export default function TransmittalMemoPage({requestTypeId, requestType}: FormProps) {
  const [items, setItems] = useState<{ id: number; text: string }[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({toId: 0,toName:"",from: 0,date: "",description:"",note:"",items:[]});
  const { data: user } = useFetchUser();
   const { data: users = [] } = useFetchUserList();
  const { data: branches, isLoading, isError } = useFetchBranches();
  const [counter, setCounter] = useState(1);

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({ 
        ...prev, 
        from: user.branchId ?? 0   
      }));
    }
  }, [user]);


    const userOptions: Option1[] = users.map((u) => ({
        id: u.id,
        name: u.name,
        position: u.position,
      }));
  


  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "from" ? Number(value) : value 
    }));
  };

 
  
  const handleAddItem = () => {
    setItems([...items, { id: counter, text: "" }]);
    setCounter(counter + 1);
  };

  const handleRemoveItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const handleChangeItem = (id: number, value: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, text: value } : item))
    );
  };

  const handleOpenModal = async () => {
    setIsModalOpen(true); 
};


const handleResetForm = () => {
  setFormData({toId: 0,toName:"",from: 0,date: "",description:"",note:"",items:[]});
  setItems([]);      
  setCounter(1); 
};


  return (
    <div className="bg-white border border-[#ECECEC] min-h-90 py-4 px-3 rounded-md">
      <div className="text-center">
        <h2 className="p-4 font-bold text-xl">TRANSMITTAL MEMO</h2>
      </div>

      <div>
        <form action="" className="grid grid-cols-[repeat(auto-fit,minmax(20rem,1fr))] gap-x-10 gap-y-4 px-4 mt-8">
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
            name="from"
            value={formData.from}
            onChange={handleInputChange}
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
            <label htmlFor="date" className="mb-2 font-semibold">Date</label>
            <input
              type="date"
              name="date"
              id="date"
              value={formData.date}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-lg bg-gray-50 p-2"
            />
          </div>

          <div className="col-span-2 flex flex-col">
            <label htmlFor="description" className="mb-2 font-semibold">Description</label>
            <textarea
              name="description"
              id="description"
              value={formData.description}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-lg bg-gray-50 p-2">
            </textarea>
          </div>

          <div className="flex flex-col">
            <label htmlFor="note" className="mb-2 font-semibold">Note</label>
            <textarea
              name="note"
              id="note"
              value={formData.note}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-lg p-2 bg-gray-50">
              </textarea>
          </div>

         
          <div className="flex flex-start h-10 mt-2">
            <button
              type="button"
              onClick={handleAddItem}
              className="border border-gray-300 bg-gray-50 px-6 rounded-lg flex items-center">
              <span className="mr-2">ADD ITEM</span>
              <AddBox
                className="text-green-600 hover:text-green-800 shadow-xl"
                fontSize="large"
              />
            </button>
          </div>
        </form>

     
        <div className="mt-6 px-4 grid grid-cols-2">
          {items.map((item) => (
            <div key={item.id}
              className="flex items-center gap-2 rounded p-2">
              <input
                type="text"
                value={item.text}
                onChange={(e) => handleChangeItem(item.id, e.target.value)}
                placeholder="Enter item"
                className="flex-1 border border-gray-300 rounded-lg p-2 bg-gray-50"
              />
              <button
                type="button"
                onClick={() => handleRemoveItem(item.id)}
                className="text-red-600 hover:text-red-800 font-bold">
                ×
              </button>
            </div>
          ))}
        </div>


        <div>
            <button className="bg-green-800 hover:bg-green-700 text-white px-6 py-1 rounded ml-5 mt-4" onClick={handleOpenModal}>Submit</button>
        </div>

      </div>



            {isModalOpen && (
                <RequestModal title="Transmittal Memo Summary" size="xl" onClose={() => setIsModalOpen(false)}>
                <ViewTransmittalMemo 
                  formData={{...formData,
                    fromName: branches?.find(b => b.id === formData.from)?.branchName ?? "",
                    requestedBy: user?.name ?? "",  
                    requestedPosition: user?.position ?? "",
                    branchName: branches?.find(b => b.id === formData.from)?.branchName ?? "",
                    address: branches?.find(b => b.id === formData.from)?.address ?? "",
                    companyName: branches?.find(b => b.id === formData.from)?.companyName ?? "",  
                    }}
                  items={items} requestType={requestType}  onClose={() => setIsModalOpen(false)}  onReset={handleResetForm} />
                </RequestModal>
            )}




    </div>
  );
}