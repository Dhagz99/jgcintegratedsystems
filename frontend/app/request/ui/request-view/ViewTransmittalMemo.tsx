
import { FormPropsTransmittalProps, TransmittalData } from "../../type/FormType";
import { formatLongDate } from "@/app/utils/DateFormatter";
import { useFetchUser } from "@/hooks/useAuth";
import { useAddTransmittalMemo } from "../../hooks/userForm";
import SweetAlert from "../../components/Swal";

export default function ViewTransmittalMemo({ formData, items,requestType,onClose,onReset }: FormPropsTransmittalProps) {
     const { data: user , isLoading: userLoading } = useFetchUser();
     const addMutation = useAddTransmittalMemo();

     const handleSave = () => {
      const payload: TransmittalData = {
        ...formData,
        items,
        requestTypeId: requestType?.id ?? 0,
        requestFromId: user?.branchId ?? 0,
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
    if (!formData) return null; 

    return (
      <div className="max-h-[70vh] overflow-y-auto px-20 py-8">
        {/* HEADER */}
        <div className="text-center">
          <h2 className="text-xl font-extrabold">{formData.companyName?.toLocaleUpperCase()}</h2>
          <h2 className="text-lg font-bold">{formData.branchName} BRANCH</h2>
          <h2 className="text-lg font-bold">{formData.address}</h2>
        </div>
  
        <div className="text-center mt-10 ">
          <h3 className="font-black text-2xl">TRANSMITTAL MEMO</h3>
        </div>
  
        <div className="w-9/12 mt-8 space-y-2 ml-22 border-b border-t py-4">
          <div>
            <span className="font-bold mr-13">TO: </span>
            <span className="font-semibold">{formData.toName}<br></br><h2 className="ml-19.5">{formData.toPosition}</h2></span>
          </div>
          <div>
            <span className="font-bold mr-8">FROM:</span>
            <span className="font-semibold">{formData.branchName}</span>
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
            {(items ?? []).length > 0 ? (
              (items ?? []).map((item) => (
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


        <div className="px-20 mt-15 grid grid-cols-2">
            <div>
                <h2 className="font-extrabold mb-2">PREPARED BY:</h2>
                <p className="font-bold">{user?.name}</p>
                <p className="font-bold">{user?.position}-{user?.branchName}</p>

                <h2 className="font-extrabold mb-2 mt-4">CHECKED BY:</h2>
                <p className="font-bold">{requestType?.checkedBy?.name}</p>
                <p className="font-bold">{requestType?.checkedBy?.position}</p>

                <h2 className="font-extrabold mb-2 mt-4">RECOMMENDING APPROVAL:</h2>
                <p className="font-bold">{requestType?.recomApproval?.name}</p>
                <p className="font-bold">{requestType?.recomApproval?.position}</p>

                <h2 className="font-extrabold mb-2 mt-4">APPROVED BY:</h2>
                <p className="font-bold">{requestType?.approveBy?.name}</p>
                <p className="font-bold">{requestType?.approveBy?.position}</p>

            </div>

            <div className="self-center mb-26">
            <h2 className="font-extrabold mb-2 mt-4">CHECKED BY:</h2>
              <p className="font-bold">ROLEANNE JEAN GEROGALIN</p>
              <p className="font-bold">ACCTG COOR</p>
            </div>
        </div>


        <div className="flex justify-end mt-4">
          <button
            type="button"
            disabled={addMutation.isPending}
            className="px-6 py-2 rounded bg-green-700 text-white hover:bg-green-800"
            onClick={handleSave}>
            {addMutation.isPending ? "Saving..." : "Save"}
          </button>
        </div>


      </div>
    );
  }
  



















  export function ViewApprovalTransmittalMemo({mainRequest, formData, onClose}: FormPropsTransmittalProps) {


      return (
        <div className="max-h-[70vh] overflow-y-auto px-10 py-8">
          {/* HEADER */}
          <div className="text-center">
            <h2 className="text-xl font-extrabold">EMB CAPITAL LENDING CORPORATION</h2>
            <h2 className="text-lg font-bold"> {mainRequest?.requestFrom.branchName} BRANCH</h2>
            <h2 className="text-lg font-bold">{mainRequest?.requestFrom.address}</h2>
          </div>
    
          <div className="text-center mt-10">
            <h3 className="font-bold text-lg">TRANSMITTAL MEMO</h3>
          </div>
    
          <div className="w-5/12 mt-8 space-y-2 ml-22 ">
            <div>
              <span className="font-bold mr-13">TO: </span>
              <span className="font-semibold">{mainRequest?.transmittalMemo?.requestTo?.name ?? ""}</span>
            </div>
            <div>
              <span className="font-bold mr-8">FROM:</span>
              <span className="font-semibold"> {mainRequest?.transmittalMemo?.from}</span>
            </div>
            <div>
              <span className="font-bold mr-9.5">DATE:</span>
              <span className="font-semibold">{formatLongDate(mainRequest?.transmittalMemo?.date)}</span>
            </div>
          </div>
    
          <div className="mt-8 ml-25 text-md w-9/12">
            <h2 className="indent-12">{mainRequest?.transmittalMemo?.description}</h2>
          </div>
    
          <div className="mt-8 py-2 px-20 ml-5">
            <ul className="font-semibold">
            {mainRequest?.transmittalMemo?.items?.length ? (
              mainRequest.transmittalMemo.items.map((item: any) => (
                <li key={item.id} className="border-b-2 px-4">
                  {item.text}
                </li>
              ))
            ) : (
              <li className="px-4 italic text-gray-500">No items added</li>
            )}

            </ul>
          </div>
    
          {mainRequest?.transmittalMemo?.note && (
            <div className="px-25 mt-8">
              <h2>{mainRequest?.transmittalMemo?.note}</h2>
            </div>
          )}


          <div className="px-20 mt-15 grid grid-cols-2">
              <div>
                  <h2 className="font-extrabold mb-2">PREPARED BY:</h2>
                  <p className="font-bold">{mainRequest?.requestBy.name.toLocaleUpperCase()}</p>
                  <p className="font-bold">{mainRequest?.requestBy.position}-</p>

                  <h2 className="font-extrabold mb-2 mt-4">CHECKED BY:</h2>
                  <p className="font-bold">{mainRequest?.requestType.checkedBy?.name.toLocaleUpperCase()}</p>
                  <p className="font-bold">{mainRequest?.requestType.checkedBy?.position.toLocaleUpperCase()}</p>

                  <h2 className="font-extrabold mb-2 mt-4">RECOMMENDING APPROVAL:</h2>
                  <p className="font-bold">{mainRequest?.requestType.recomApproval?.name.toLocaleUpperCase()}</p>
                  <p className="font-bold">{mainRequest?.requestType.recomApproval?.position.toLocaleUpperCase()}</p>

                  <h2 className="font-extrabold mb-2 mt-4">APPROVED BY:</h2>
                  <p className="font-bold">{mainRequest?.requestType.approveBy?.name.toLocaleUpperCase()}</p>
                  <p className="font-bold">{mainRequest?.requestType.approveBy?.position.toLocaleUpperCase()}</p>

              </div>

              <div className="self-center mb-26">
              <h2 className="font-extrabold mb-2 mt-4">CHECKED BY:</h2>
                <p className="font-bold">ROLEANNE JEAN GEROGALIN</p>
                <p className="font-bold">ACCTG COOR</p>
              </div>
          </div>


         


        </div>
      );
    }
    