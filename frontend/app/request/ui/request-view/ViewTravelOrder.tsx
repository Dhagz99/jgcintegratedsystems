
import { TravelOrderPaperProps } from "../../type/FormType";
import SweetAlert from "../../components/Swal";
import { formatLongDate } from "@/app/utils/DateFormatter";
import { FormPropsTravelOrder } from "../../type/FormType";



export default function ViewTravelOrder({requestType,formData,onClose,onReset}: FormPropsTravelOrder) {
    if (!formData) return null;

    const {
        name,
        position,
        departure_date,
        current_date,
        purpose_of_travel,
        destination,
        items,
        onSubmit,
        submitting,
        branchName,
        address,
      } = formData;
    

    const totalAmount = items.reduce((sum, entry) => {
        const num = parseFloat(entry.amount);
        return sum + (isNaN(num) ? 0 : num);
      }, 0);

      
      const handleConfirmSubmit = () => {
        SweetAlert.confirmationAlert(
          "Confirm Save",
          `Are you sure you want to submit this with E signature?`,
          () => {
            onSubmit?.(); 
          }
        );
      };




      return (
        <div className="py-1 px-2 max-h-[70vh] overflow-y-auto">
        <div className="flex flex-col p-10">
          {/* Header */}
          <div className="font-black text-xl sm:text-lg text-center">
            <h1>
              {branchName} LENDING CORPORATION<br /> {address}
            </h1>
          </div>
      
          <div className="self-end mb-5 mt-10 mr-23">
            <span className="font-bold">Date: </span>
            {formatLongDate(current_date)}
          </div>
      
          <div className="mt-4 sm:mt-6">
            <h5 className="text-center font-black text-2xl">TRAVEL ORDER</h5>
          </div>
      
          {/* Wrapper that controls alignment */}
          <div className="max-w-3xl w-full mx-auto mt-6 px-20">
            {/* Two Columns */}
            <div className="flex flex-col sm:flex-row gap-x-4 border-gray-500 border-b pb-4 border-t pt-4">
              {/* Left column */}
              <div className="font-bold space-y-2 w-full sm:w-56">
                <h2>NAME:</h2>
                <h2>POSITION/DESIGNATION</h2>
                <h2>DEPARTURE DATE:</h2>
                <h2>DESTINATION:</h2>
                <h2>PURPOSE OF TRAVEL:</h2>
              </div>
      
              {/* Right column */}
              <div className="font-semibold space-y-2 text-left flex-1">
                <h2>{name}</h2>
                <h2>{position}</h2>
                <h2>{formatLongDate(departure_date)}</h2>
                <h2>{destination}</h2>
                <h2>{purpose_of_travel}</h2>
              </div>
            </div>
      
            {/* Budget box aligned under both columns */}
            <div className="font-semibold mt-6">
              <h2 className="underline font-extrabold mb-4">ADD'L BUDGET</h2>
              {items.map((entry, i) => (
                <div key={i} className="flex justify-between">
                  <span className="break-words">{entry.budget}</span>
                  <span className="whitespace-nowrap">{entry.amount}</span>
                </div>
              ))}
              <div className="flex justify-between mt-4 font-extrabold border-b pb-4">
                <span>TOTAL</span>
                <span className="whitespace-nowrap">Php  {totalAmount.toFixed(2)}</span>
              </div>
            </div>




            <div className="mt-15 grid grid-cols-1 sm:grid-cols-2">
              <div>
                <h2 className="font-bold mb-2">Prepared by:</h2>
                <h2 className="font-semibold">{formData.requestedBy}</h2>
                <h2 className="font-semibold">{formData.requestedPosition}</h2>

                <h2 className="font-bold mt-4 mb-2">Recommending Approval:</h2>
                <h2 className="font-semibold">{requestType?.recomApproval?.name.toLocaleUpperCase() ?? ''}</h2>
                <h2 className="font-semibold">{requestType?.recomApproval?.position}</h2>

                <h2 className="font-bold mt-4 mb-2">Approved:</h2>
                <h2 className="font-semibold">{requestType?.approveBy?.name.toLocaleUpperCase() ?? ''}</h2>
                <h2 className="font-semibold">{requestType?.approveBy?.position ?? ''}</h2>
              </div>

              <div>
                <h2 className="font-bold mb-2">Checked by:</h2>
                <h2 className="font-semibold">{requestType?.checkedBy?.name}</h2>
                <h2 className="font-semibold">{requestType?.checkedBy?.position}</h2>   

                <h2 className="font-semibold mt-4">{requestType?.checkedBy2?.name.toLocaleUpperCase() ?? ''}</h2>  
                <h2 className="font-semibold">{requestType?.checkedBy2?.position ?? ''}</h2>          
              </div>

            

          </div>


          </div>

     


          <div className="flex w-full justify-end mt-10 pr-10">
          <button
              onClick={handleConfirmSubmit}
              disabled={submitting}
              className="bg-green-800 hover:bg-green-950 text-white py-1 px-4 rounded disabled:opacity-60">
              {submitting ? "Saving..." : "Submit"}
            </button>
          </div>
        </div>
      </div>
      );
  }
  
























export function ViewApprovalTravelOrder({mainRequest, formData, onClose,}:FormPropsTravelOrder){


    return(
      <div className="py-1 px-2 max-h-[70vh] overflow-y-auto">
      <div className="flex flex-col p-10">
        {/* Header */}
        <div className="font-black text-xl sm:text-lg text-center">
          <h1>
            {mainRequest?.requestFrom.branchName} LENDING CORPORATION<br /> {mainRequest?.requestFrom.address}
          </h1>
        </div>
    
        <div className="self-end pr-4 sm:pr-6 md:pr-20 mt-4 sm:mt-6">
          <span className="font-bold">DATE: </span>
          {formatLongDate(mainRequest?.travelOrder.current_date)}
        </div>
    
        <div className="mt-4 sm:mt-6">
          <h5 className="text-center font-black text-xl sm:text-lg underline">
            TRAVEL ORDER
          </h5>
        </div>
    
        {/* Wrapper that controls alignment */}
        <div className="max-w-3xl w-full mx-auto mt-6 px-20">
          {/* Two Columns */}
          <div className="flex flex-col sm:flex-row gap-x-4">
            {/* Left column */}
            <div className="font-bold space-y-2 w-full sm:w-56">
              <h2>NAME:</h2>
              <h2>POSITION/DESIGNATION</h2>
              <h2>DEPARTURE DATE:</h2>
              <h2>DESTINATION:</h2>
              <h2>PURPOSE OF TRAVEL:</h2>
            </div>
    
            {/* Right column */}
            <div className="font-semibold space-y-2 text-left flex-1">
              <h2>{mainRequest?.travelOrder.name}</h2>
              <h2>{mainRequest?.travelOrder.position}</h2>
              <h2>{formatLongDate(mainRequest?.travelOrder.departure_date)}</h2>
              <h2>{mainRequest?.travelOrder.destination}</h2>
              <h2>{mainRequest?.travelOrder.purpose_of_travel}</h2>
            </div>
          </div>
    
        
          <div className="font-semibold mt-6">
            <h2 className="underline font-extrabold mb-4">ADD'L BUDGET</h2>
            {mainRequest?.travelOrder?.items?.map((entry, i) => (
              <div key={i} className="flex justify-between">
                <span className="break-words">{entry.budget}</span>
                <span className="whitespace-nowrap">{entry.amount}</span>
              </div>
            ))}
            <div className="flex justify-between mt-4 font-extrabold">
              <span>TOTAL</span>
              <span className="whitespace-nowrap">{mainRequest?.travelOrder.total_amount}</span>
            </div>
          </div>




          <div className="mt-15 grid grid-cols-1 gap-x-4 sm:grid-cols-2">
            <div>
              <h2 className="font-bold mb-2">Prepared by:</h2>
              <h2 className="font-bold">{mainRequest?.requestBy.name.toLocaleUpperCase()}</h2>
              <h2 className="font-semibold">{mainRequest?.requestBy.position}</h2>

              <h2 className="font-bold mt-4 mb-2">Recommending Approval:</h2>
              <h2 className="font-bold">{mainRequest?.requestType.recomApproval?.name.toLocaleUpperCase()}</h2>
              <h2 className="font-semibold">{mainRequest?.requestType.recomApproval?.position}</h2>

              <h2 className="font-bold mt-4 mb-2">Approved:</h2>
              <h2 className="font-bold">{mainRequest?.requestType.approveBy?.name.toLocaleUpperCase()}</h2>
              <h2 className="font-semibold">{mainRequest?.requestType.approveBy?.position}</h2>
          </div>

            <div>
            <h2 className="font-bold mb-2">Checked by:</h2>
            <h2 className="font-bold">{mainRequest?.requestType.checkedBy?.name.toLocaleUpperCase()}</h2>
            <h2 className="font-semibold">{mainRequest?.requestType.checkedBy?.position}</h2>

            <h2 className="font-bold mt-4">{mainRequest?.requestType.checkedBy2?.name.toLocaleUpperCase()}</h2>
            <h2 className="font-semibold">{mainRequest?.requestType.checkedBy2?.position}</h2>
            </div>
          

        </div> 


        </div>

   



      </div>
    </div>
    );

  }