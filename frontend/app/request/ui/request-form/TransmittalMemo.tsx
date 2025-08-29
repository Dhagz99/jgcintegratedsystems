"use client";
import { useState } from "react";
import { AddBox } from "@mui/icons-material";
import RequestModal from "../../components/RequestModal";
import ViewTransmittalMemo from "../request-view/ViewTransmittalMemo";
import { FormProps } from "../../type/FormType";


export default function TransmittalMemoPage({requestTypeId, requestType}:FormProps) {
  const [items, setItems] = useState<{ id: number; text: string }[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({to: "",from: "RFC-SINGCANG",date: "",description:"",note:"",items:""});

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };


  const handleAddItem = () => {
    setItems([...items, { id: Date.now(), text: "" }]);
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


  return (
    <div className="bg-white border border-[#ECECEC] min-h-90 py-4 px-3 rounded-md">
      <div className="text-center">
        <h2 className="p-4 font-bold text-xl">TRANSMITTAL MEMO</h2>
      </div>

      <div>
        <form
          action=""
          className="grid grid-cols-[repeat(auto-fit,minmax(20rem,1fr))] gap-x-10 gap-y-4 px-4 mt-8">
          <div className="flex flex-col">
            <label htmlFor="to" className="mb-2 font-semibold">To</label>
            <input
              type="text"
              name="to"
              id="to"
              value={formData.to}
              onChange={handleInputChange}
              placeholder="Enter to..."
              className="border border-gray-300 rounded-lg bg-gray-50 p-2"
            />
          </div>

          <div className="flex flex-col">
                <label htmlFor="from" className="mb-2 font-semibold">From</label>
                <select
                  name="from"
                  id="from"
                  value={formData.from}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-lg bg-gray-50 p-2">
                  <option value="RFC-SINGCANG">RFC-SINGCANG</option>
                  <option value="EMB-MAIN">EMB-MAIN</option>
                  <option value="EMB-CADIZ">EMB-CADIZ</option>
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
              className="border border-gray-300 rounded-lg p-2 bg-gray-50"
            ></textarea>
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
                <RequestModal title="Transmittal Memo Summary" size="xxl" onClose={() => setIsModalOpen(false)}>
                <ViewTransmittalMemo formData={formData} items={items} requestType={requestType}/>
                </RequestModal>
            )}




    </div>
  );
}
