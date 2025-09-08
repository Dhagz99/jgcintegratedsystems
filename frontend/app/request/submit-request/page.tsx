'use client';

import { useMemo, useState } from 'react';
import FundTransfer from '../ui/request-form/FundTransfer';
import { useFetchRequestType } from '../hooks/useRequest';
import { RequestTypeDTO } from '../type/RequestType';
<<<<<<< HEAD
=======
import TravelOrder from '../ui/request-form/TravelOrder';
import ProposedBudget from '../ui/request-form/ProposedBudget';
import TransmittalMemoPage from '../ui/request-form/TransmittalMemo';
import Disburse from '../ui/request-form/Disburse';
>>>>>>> tester
import FundReplenishment from '../ui/request-form/FundReplenishment';
;

export default function SubmitForm() {
  const [requestTypeId, setRequestTypeId] = useState<number | null>(null);
  const [selectedType, setSelectedType] = useState<RequestTypeDTO | null>(null);
  const { data: requestData, isLoading } = useFetchRequestType();

  // Build a map for O(1) lookups when the user selects an option
  const byId = useMemo(() => {
    const m = new Map<number, RequestTypeDTO>();
    (requestData ?? []).forEach((rt: RequestTypeDTO) => m.set(rt.id, rt));
    return m;
  }, [requestData]);

  const handleChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    const v = e.currentTarget.value; // string
    if (v === '') {
      setRequestTypeId(null);
      setSelectedType(null);
      return;
    }
    const id = Number(v);
    setRequestTypeId(id);
    setSelectedType(byId.get(id) ?? null); // <- store the full object here
  };
  if (isLoading) {
    return <div className="p-2 text-sm text-gray-600">Loading request types…</div>;
  }
  return (
    <div className="flex flex-col">
      <div>
        <h1 className="text-xl font-bold text-black">Request Form</h1>
      </div>

      <div className="my-1">
        <select
          value={requestTypeId ?? ''} // show placeholder when null
          className="bg-white border border-[#ECECEC] rounded-sm text-xs p-2"
          onChange={handleChange}
        >
          <option value="">Select type…</option>
          {requestData?.map((rt: RequestTypeDTO) => (
            <option key={rt.id} value={rt.id}>
              {rt.requestName}
            </option>
          ))}
        </select>
      </div>
      {/* You can pass either the id or the full object to children */}
<<<<<<< HEAD
        {(requestTypeId === 4 || requestTypeId === 3) && (
        <FundReplenishment requestTypeId={requestTypeId} requestType={selectedType} />
      )}
      {requestTypeId === 3 && (
        <FundTransfer requestTypeId={requestTypeId} requestType={selectedType} />
      )}
=======
        {requestTypeId === 1 && (
          <FundTransfer requestTypeId={requestTypeId} requestType={selectedType} />
        )}

      {requestTypeId === 2 && (
            <TravelOrder requestTypeId={requestTypeId} requestType={selectedType} />
          )}


      {requestTypeId === 3 && (
            <ProposedBudget requestTypeId={requestTypeId} requestType={selectedType} />
      )}

      
      {requestTypeId === 4 && (
                  <TransmittalMemoPage requestTypeId={requestTypeId} requestType={selectedType} />
            )}

              
      {requestTypeId === 5 && (
                  <Disburse requestTypeId={requestTypeId} requestType={selectedType} />
            )}

            
      {(requestTypeId === 6 || requestTypeId === 7) && (
              <FundReplenishment requestTypeId={requestTypeId} requestType={selectedType} />
            )}

>>>>>>> tester
    </div>
  );
}
