import { useFetchUser, useLogout } from "@/hooks/useAuth";
import { Person, Settings } from "@mui/icons-material"
import { useFetchUserLogs } from "../../hooks/useHeader";
import { RequestLogs } from "../../type/BaseType";
import { timeAgo } from "@/app/utils/timeAgo";


export  function LogsModal() { 
        const {data} = useFetchUserLogs();
        return(
        <div className="absolute z-11 flex flex-col  justify-between bg-white min-h-75 w-75 top-14 right-3 rounded-xl shadow-[0_0_17px_0_rgba(0,0,0,0.1)]  p-3.5">
            <div className="flex flex-col gap-1 justify-between h-full">
                     <h6 className="font-bold text-md">Request Logs</h6>
                     <div className="flex justify-between">
                     <p className="text-sm font-semibold">Earlier</p>
                     {/* <p className="text-sm font-semibold text-[#32B695]">See all</p> */}
                     </div>
                        <div className="flex flex-col gap-1.5 max-h-45 overflow-auto">
                                {data?.map((logs: RequestLogs) =>(
                                        <div key={logs.id} className="flex gap-2.5 cursor-pointer">
                                                <div className="w-9 h-9 bg-[#F2F7F4]  rounded-full flex justify-center items-center  text-[#414342]" > 
                                                </div>  
                                                <div className="flex flex-col text-xs">
                                                        <p>You {logs.action} <b> {logs.checkerType} </b></p>
                                                        <p className="text-[#32B695]">{timeAgo(logs.createdAt)}</p>
                                                </div>
                                        </div>
                                ))}
                        </div>
            </div>
            <div className="flex px-2 mt-2">
                    <button className="bg-[#E7E7E7] text-sm p-2 rounded-md w-full font-semibold">See previous  requests</button>
             </div>
     </div> 
        )
}


type ProfileProps = {
    handleClickModal: (path: string)=> void;
}

        export const ProfileModal: React.FC<ProfileProps> = ({ handleClickModal }) => {
                const { mutate: logout } = useLogout();
                const { data: user } = useFetchUser();
                return(
                        <div className="absolute z-11 flex flex-col  justify-between bg-white min-h-75 w-75 top-14 right-3 rounded-xl shadow-[0_0_17px_0_rgba(0,0,0,0.1)]  p-3.5">
                                <div className="flex flex-col gap-1 justify-between h-full">
                                        <div className="flex gap-2 items-center border-b-2 border-gray-300 p-1 pb-2 cursor-pointer">
                                                  <div className={` bg-[#F2F7F4] text-[#414342] hover:bg-gray-200  w-9 h-9  rounded-full flex justify-center items-center cursor-pointer `} > 
                                                        <Person  className=""/>
                                                  </div>
                                                <h6 className="font-semibold text-sm">{user?.name}</h6>
                                        </div>
                                        <h6 className="font-bold text-md">Settings</h6>
                                        <div className="text-xs text-gray-500 hover:bg-gray-300 cursor-pointer flex items-center gap-3 p-1.5" onClick={()=>handleClickModal('system-configuration')}>
                                                <Settings /> System Configurations  
                                        </div>
                                </div>
                                <div className="flex px-2 ">
                                        <button 
                                        onClick={() => logout()}
                                        className="bg-[#E7E7E7] text-sm hover:bg-gray-300 cursor-pointer p-1 rounded-md w-full font-semibold">
                                                Logout
                                        </button>
                                </div>
                        </div>
                        
                )
        }



        export  function NotificationModal() {
                return(
                    <div className="absolute z-11 flex flex-col  justify-between bg-white min-h-75 w-75 top-14 right-3 rounded-xl shadow-[0_0_17px_0_rgba(0,0,0,0.1)]  p-3.5">
                    <div className="flex flex-col gap-1 justify-between h-full">
                             <h6 className="font-bold text-md">Notification</h6>
                             <div className="flex justify-between">
                             <p className="text-sm font-semibold">Earlier</p>
                             <p className="text-sm font-semibold text-[#32B695]">See all</p>
        
                             </div>
                             <div className="flex flex-col gap-1">
                                     <div className="flex gap-2.5">
                                             <div className="w-9 h-9 bg-[#F2F7F4]  rounded-full flex justify-center items-center  text-[#414342]" > 
                                             </div>  
                                             <div className="flex flex-col text-xs">
                                                     <p>You submitted Fund <b>Transfer Request</b></p>
                                                     <p className="text-[#32B695]">1h</p>
                                             </div>
                                     </div>
                                     <div className="flex gap-2.5">
                                             <div className="w-9 h-9 bg-[#F2F7F4]  rounded-full flex justify-center items-center  text-[#414342]" > 
                                             </div>  
                                             <div className="flex flex-col text-xs">
                                                     <p>You submitted Fund <b>Transfer Request</b></p>
                                                     <p className="text-[#32B695]">1h</p>
                                             </div>
                                     </div>
                             </div>
                    </div>
                    <div className="flex px-2 ">
                            <button className="bg-[#E7E7E7] text-sm p-2 rounded-md w-full font-semibold">See previous  requests</button>
                     </div>
             </div> 
                )
        }