"use client";
import { useState } from "react";
import { AddBox } from "@mui/icons-material";
import RequestModal from "../../components/RequestModal";
import ViewFieldWeeklyTravelExpense from "../request-view/ViewFieldWeeklyTravelExpense";
import { FormProps } from "../../type/FormType";

export default function FieldWeekly_TravelExpense({requestTypeId, requestType}:FormProps) {
    const [particulars, setParticulars] = useState<{ id: number; particular: string; amount: string }[]>([]);
    const [checklists, setChecklists] = useState<{ id: number; category: string; items: { id: number; text: string }[] }[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
      name: "",
      date_covered: "",
    });
    const [images, setImages] = useState<string[]>([]);


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (!files) return;
    
      const selectedFiles = Array.from(files).slice(0, 4);
      const urls = selectedFiles.map((file) => URL.createObjectURL(file));
      setImages(urls);
    };
    
 
    const handleInputChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    };
  
    const handleOpenModal = () => setIsModalOpen(true);
  

    const handleAddParticular = () => {
      setParticulars([...particulars, { id: Date.now(), particular: "", amount: "" }]);
    };
  
    const handleRemoveParticular = (id: number) => {
      setParticulars(particulars.filter((item) => item.id !== id));
    };
  
    const handleChangeParticular = (
      id: number,
      field: "particular" | "amount",
      value: string
    ) => {
      setParticulars((prev) =>
        prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
      );
    };
  
    const handleAddChecklist = () => {
      setChecklists([
        ...checklists,
        { id: Date.now(), category: "", items: [] },
      ]);
    };
  
    const handleRemoveChecklist = (id: number) => {
      setChecklists(checklists.filter((c) => c.id !== id));
    };
  
    const handleCategoryChange = (id: number, value: string) => {
      setChecklists((prev) =>
        prev.map((c) => (c.id === id ? { ...c, category: value } : c))
      );
    };
  
    const handleAddItem = (checklistId: number) => {
      setChecklists((prev) =>
        prev.map((c) =>
          c.id === checklistId
            ? {
                ...c,
                items: [...c.items, { id: Date.now(), text: "" }],
              }
            : c
        )
      );
    };
  
    const handleItemChange = (checklistId: number, itemId: number, value: string) => {
      setChecklists((prev) =>
        prev.map((c) =>
          c.id === checklistId
            ? {
                ...c,
                items: c.items.map((i) =>
                  i.id === itemId ? { ...i, text: value } : i
                ),
              }
            : c
        )
      );
    };
  
    const handleRemoveItem = (checklistId: number, itemId: number) => {
      setChecklists((prev) =>
        prev.map((c) =>
          c.id === checklistId
            ? { ...c, items: c.items.filter((i) => i.id !== itemId) }
            : c
        )
      );
    };
  
    return (
      <div className="bg-white border border-[#ECECEC] min-h-90 py-10 px-3 rounded-md">
        <div className="text-center">
          <h2 className="p-4 font-bold text-xl">
            FIELD WEEKLY & TRAVEL EXPENSE REPORT
          </h2>
        </div>
  
        <div>
     

          <form action="" className="grid grid-cols-[repeat(auto-fit,minmax(20rem,1fr))] gap-x-15 px-4 mt-8">
            <div className="flex flex-col">
              <label htmlFor="name" className="mb-2 font-semibold">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter name..."
                className="border border-gray-300 bg-gray-50 rounded-lg p-2"/>
            </div>
  
            <div className="flex flex-col">
              <label htmlFor="" className="mb-2 font-semibold">Date Covered</label>
              <input
                type="date"
                name="date_covered"
                id="date_covered"
                onChange={handleInputChange}
                className="border border-gray-300 bg-gray-50 rounded-lg p-2"/>
            </div>

            <div className="flex flex-col">
              <label htmlFor="" className="mb-2 font-semibold">Request From</label>
              <input
                type="from"
                name="from"
                id="from"
                onChange={handleInputChange}
                className="border border-gray-300 bg-gray-50 rounded-lg p-2"/>
            </div>
  
            <div className="mt-7">
              <button
                type="button"
                onClick={handleAddParticular}
                className="border border-gray-300 bg-gray-50 rounded-lg py-1 px-4 flex items-center">
                <span className="mr-2 font-semibold text-xs">ADD PARTICULARS</span>
                <AddBox className="text-green-600 hover:text-green-800 shadow-xl" fontSize="large" />
              </button>
            </div>
          </form>
  
        
          <div className="grid grid-cols-3 gap-x-4 gap-y-4 mt-8 px-4">
            {particulars.map((item) => (
              <div key={item.id} className="border border-gray-200 p-3 rounded-md shadow-sm relative">
                <button
                  type="button"
                  onClick={() => handleRemoveParticular(item.id)}
                  className="absolute top-2 right-2 text-red-600 hover:text-red-900">
                  ×
                </button>
  
                <div className="flex flex-col mb-2">
                  <label className="mb-2 font-semibold">Description</label>
                  <textarea
                    value={item.particular}
                    onChange={(e) =>
                      handleChangeParticular(item.id, "particular", e.target.value)
                    }
                    className="border border-gray-300 rounded-lg p-2 bg-gray-50"
                    rows={2}
                  />
                </div>
  
                <div className="flex flex-col">
                  <label className="mb-2 font-semibold">Amount</label>
                  <input
                    type="number"
                    value={item.amount}
                    onChange={(e) =>
                      handleChangeParticular(item.id, "amount", e.target.value)
                    }
                    className="border border-gray-300 rounded-lg p-2 bg-gray-50"
                  />
                </div>
              </div>
            ))}
          </div>
  
         

         <div className="grid grid-cols-3 mt-4">
         <div className="flex flex-col px-6">
            <label htmlFor="attach_image" className="mb-2 font-semibold">Attach up to 4 images</label>
            <input
              type="file"
              id="attach_image"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="border border-gray-300 shadow-lg p-2 rounded-lg bg-gray-50"
            />
          </div>

      
          <div className="flex ml-6 mt-7">
            <button type="button" onClick={handleAddChecklist}
              className="border border-gray-300 rounded-lg bg-gray-50 px-4 flex items-center text-center">
              <span className="mr-2 text-xs font-semibold">ADD CLEANING CHECKLIST</span>
              <AddBox className="text-green-600 hover:text-green-800 shadow-xl" fontSize="large" />
            </button>

          </div>
          </div>

       
           
          
  
          <div className="mt-6 px-4 grid grid-cols-4 gap-x-4 gap-y-4 rounded-lg">
            {checklists.map((c) => (
              <div key={c.id} className="border border-gray-300 p-4 rounded-md relative">
                <button
                  type="button"
                  onClick={() => handleRemoveChecklist(c.id)}
                  className="absolute top-2 right-2 text-red-600 hover:text-red-900"
                >
                  ×
                </button>
  
                <div className="flex flex-col mb-3">
                  <label className="font-semibold text-center mb-2">Category</label>
                  <input
                    type="text"
                    value={c.category}
                    placeholder="Category name..."
                    onChange={(e) => handleCategoryChange(c.id, e.target.value)}
                    className="border border-gray-300 rounded-lg bg-gray-50 p-2"
                  />
                </div>
  
              
                <div className="space-y-3">
                  {c.items.map((i) => (
                    <div key={i.id} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={i.text}
                        onChange={(e) => handleItemChange(c.id, i.id, e.target.value)}
                        className="border border-gray-300 rounded-lg bg-gray-50 p-2 flex-1"
                        placeholder="Checklist item"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveItem(c.id, i.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
  
                <div className="mt-3">
                  <button
                    type="button"
                    onClick={() => handleAddItem(c.id)}
                    className="text-sm bg-gray-200 hover:bg-gray-300 rounded px-3 py-1"
                  >
                    + Add Item
                  </button>
                </div>
              </div>
            ))}
          </div>
  
       
          <div className="flex mt-8 px-4">
            <button
              type="button"
              className="bg-green-800 hover:bg-green-600 text-white px-6 rounded py-1"
              onClick={handleOpenModal}
            >
              Submit
            </button>
          </div>
        </div>
  

        {isModalOpen && (
          <RequestModal
            title="Field Weekly & Travel Expense"
            size="xxxl"
            onClose={() => setIsModalOpen(false)}>

                <ViewFieldWeeklyTravelExpense
                formData={{
                    name: formData.name,
                    date_covered: formData.date_covered,
                    particulars: particulars,
                    checklists: checklists,
                    images: images
                }}
                />
          </RequestModal>
        )}
      </div>
    );
  }