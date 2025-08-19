import { AddBox } from "@mui/icons-material";

export default function ChangeFund(){

    return(
        <div className="bg-white border border-[#ECECEC] min-h-80 px-3 rounded-md">
            <div className="p-1.5">
                <h3 className="text-lg font-medium text-center">
                     Change Fund Request Form
                </h3>
            </div>
            <div className="flex">
                <div className="flex flex-col text-xs gap-1">
                    <label htmlFor="" className="text-xs">Request to</label>
                    <div className="flex">
                    <input type="text" className="p-1 border border-[#BBBBBB] rounded-sm" placeholder="Enter request to" />
                      <button><AddBox className="text-green-600" /></button>
                    </div>
                </div>
                <div></div>
                <div></div>
                <div></div>
            </div>

        </div>
    )    
}