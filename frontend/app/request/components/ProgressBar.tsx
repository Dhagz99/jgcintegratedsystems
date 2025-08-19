

export default function TransferRequestBar(){
    return(
    <div className="flex items-center space-x-4 w-full max-w-4xl mx-auto">
    {/* Step 1 - Completed */}
    <div className="flex items-center space-x-2">
      <div className="flex flex-col items-center">
        <div className="w-6 h-6 rounded-full bg-[#0FC497] text-white flex items-center justify-center text-xs font-bold">
          ✓
        </div>
        <div className="text-[9px] text-center mt-1 font-medium">Submit Request</div>
        <div className="text-[8px] text-gray-400">17/07/2025</div>
      </div>
      <div className="w-14 h-0.5 bg-[#2acda4]"></div>
    </div>
  
    {/* Step 2 - Current */}
    <div className="flex items-center space-x-2">
      <div className="flex flex-col items-center">
        <div className="w-6 h-6 rounded-full border-2 border-yellow-600 text-yellow-700 flex items-center justify-center text-xs font-bold">
          2
        </div>
        <div className="text-[9px] text-center mt-1 font-medium">Recommending Approval<br />(APPLE)</div>
      </div>
      <div className="w-14 h-0.5 bg-gray-300"></div>
    </div>
    
    {/* Step 3 - Current */}
    <div className="flex items-center space-x-2">
      <div className="flex flex-col items-center">
        <div className="w-6 h-6 rounded-full border-2 border-yellow-600 text-yellow-700 flex items-center justify-center text-xs font-bold">
          3
        </div>
        <div className="text-[9px] text-center mt-1 font-medium">Recommending Approval<br />(APPLE)</div>
      </div>
      <div className="w-14 h-.5 bg-gray-300"></div>
    </div>
  
  </div>
    )
}