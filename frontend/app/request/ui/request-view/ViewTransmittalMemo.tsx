
import { TransmittalProps } from "../../type/FormType";
import { formatLongDate } from "@/app/utils/DateFormatter";


export default function ViewTransmittalMemo({ formData, items,requestType }: TransmittalProps) {
    return (
      <div className="max-h-[70vh] overflow-y-auto px-20 py-8">
        {/* HEADER */}
        <div className="text-center">
          <h2 className="text-xl font-extrabold">EMB CAPITAL LENDING CORPORATION</h2>
          <h2 className="text-lg font-bold">CADIZ BRANCH</h2>
          <h2 className="text-lg font-bold">GUSTILO ST. BRGY ZONE 3, CADIZ CITY</h2>
        </div>
  
        <div className="text-center mt-10 ">
          <h3 className="font-bold text-lg">TRANSMITTAL MEMO</h3>
        </div>
  
        <div className="w-5/12 mt-8 space-y-2 ml-22 ">
          <div>
            <span className="font-bold mr-13">TO: </span>
            <span className="font-semibold">{formData.to}</span>
          </div>
          <div>
            <span className="font-bold mr-8">FROM:</span>
            <span className="font-semibold">{formData.from}</span>
          </div>
          <div>
            <span className="font-bold mr-9.5">DATE:</span>
            <span className="font-semibold">{formatLongDate(formData.date)}</span>
          </div>
        </div>
  
        <div className="mt-8 ml-25 text-md w-9/12">
          <h2 className="indent-12">{formData.description}</h2>
        </div>
  
        <div className="mt-8 py-2 px-20 ml-5">
          <ul className="font-semibold">
            {items.length > 0 ? (
              items.map((item) => (
                <li key={item.id} className="border-b-2 px-4">
                  {item.text}
                </li>
              ))
            ) : (
              <li className="px-4 italic text-gray-500">No items added</li>
            )}
          </ul>
        </div>
  
        {formData.note && (
          <div className="px-25 mt-8">
            <h2>{formData.note}</h2>
          </div>
        )}
      </div>
    );
  }
  