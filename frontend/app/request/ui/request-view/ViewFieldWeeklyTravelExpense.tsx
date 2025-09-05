import { formatLongDate } from "@/app/utils/DateFormatter";
import { FormPropsFieldWeeklyTravelExpense } from "../../type/FormType";




  
export default function ViewFieldWeeklyTravelExpense({formData}: FormPropsFieldWeeklyTravelExpense) {
    if (!formData) return null; 
  
    const totalAmount = (formData.particulars ?? []).reduce(
      (sum, item) => sum + (parseFloat(item.amount) || 0),
      0
    );
  
    return (
      <div className="py-4 px-8 max-h-[70vh] overflow-y-auto">
        <div className="text-center">
          <h2 className="font-bold text-2xl">EMB CAPITAL FINANCE CORPORATION</h2>
          <h3>BACOLOD CITY</h3>
          <h4 className="font-bold mt-2">
            FIELD WEEKLY ITENERARY & TRAVEL EXPENSE REPORT
          </h4>
        </div>
  
        <div className="flex flex-row justify-between mt-4">
          <div>
            <h2>
              <span className="font-bold">NAME: </span>
              <span>{formData.name}</span>
            </h2>
          </div>
          <div>
            <h2>
              <span className="font-bold">DATE COVERED: </span>
              <span>{formatLongDate(formData.date_covered)}</span>
            </h2>
          </div>
        </div>
  
        <table className="border-3 w-full mt-4 text-center">
          <thead>
            <tr className="border">
              <th className="border p-2">DATE</th>
              <th className="border p-2">PARTICULARS</th>
              <th className="border p-2">AMOUNT</th>
            </tr>
          </thead>
  
          <tbody>
            {formData.particulars?.map((item, index) => (
              <tr key={item.id}>
                {index === 0 && (
                  <td rowSpan={formData.particulars.length} className="border p-1">
                    {formatLongDate(formData.date_covered)}
                  </td>
                )}
                <td className="border p-1">{item.particular}</td>
                <td className="border p-1">{item.amount}</td>
              </tr>
            ))}
            <tr className="border font-bold">
              <td className="border"></td>
              <td className="border text-center">TOTAL</td>
              <td className="border">
                Php {totalAmount.toLocaleString()}
              </td>
            </tr>
          </tbody>
        </table>
  
        <div className="grid grid-cols-2 mt-20">
          {formData.checklists?.length > 0 && (
            <div className="mt-6">
              <h3 className="font-bold text-md mb-4 text-left">
                JAMERO GROUP OF COMPANIES <br />
                CLEANING CHECKLIST FOR BRANCHES
              </h3>
  
              <div className="grid grid-cols-3 gap-6">
                {formData.checklists.map((c) => (
                  <div key={c.id} className="mb-4">
                    <h4 className="font-semibold uppercase">
                      {c.category || "Untitled Category"}
                    </h4>
                    <ul className="ml-2 mt-2 space-y-1">
                      {c.items.map((i) => (
                        <li key={i.id} className="flex flex-row items-center">
                          <div className="border w-5 h-5"></div>
                          <span className="ml-2">{i.text || "(empty)"}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
  
              <div className="mt-4 w-full">
                <div className="grid grid-cols-3">
                  <h2>NAME OF UTILITY:</h2>
                  <h3 className="w-10/12 border-b">{formData.name}</h3>
                </div>
  
                <div className="grid grid-cols-3">
                  <h2>SIGNATURE:</h2>
                  <h3 className="w-10/12 border-b"></h3>
                </div>
  
                <div className="mt-4">
                  <h2>CONFIRMED BY: BOH/BF&A</h2>
                </div>
  
                <div className="grid grid-cols-3 mt-2">
                  <h2>NAME AND SIGNATURE:</h2>
                  <h3 className="w-10/12 border-b"></h3>
                </div>
  
                <div className="grid grid-cols-3">
                  <h2>DATE:</h2>
                  <h3 className="w-10/12 border-b">{formData.date_covered}</h3>
                </div>
              </div>
            </div>
          )}
  
          <div className="border border-gray-100 rounded p-2">
            {formData.images && formData.images.length > 0 && (
              <div className="grid grid-cols-2 gap-4 shadow">
                {formData.images.map((src, idx) => (
                  <img
                    key={idx}
                    src={src}
                    alt={`Attached ${idx + 1}`}
                    className="max-h-55 object-contain shadow-lg rounded"
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
  