'use client'
import { ManageHistoryOutlined, MenuOpen, NotificationsOutlined, PersonOutline, Search } from "@mui/icons-material";
// import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { LogsModal, ProfileModal } from "./HeaderModal";
import RequestModal from "../../components/RequestModal";
import SystemConfigurationModal from "./ConfigurationModal";

export default function RequestHeader() {
        const iconStyle = { fontSize: '1.3rem' };
        const [active, setActive] = useState("");
        const menuActive = "bg-[#CCF8DD] text-[#32B695]";
        const menuPassive = "bg-[#F2F7F4] text-[#414342] hover:bg-[#CCF8DD] hover:text-[#32B695]";
        const wrapperRef = useRef<HTMLDivElement>(null);
        const [modalOpen, setModalOpen] = useState('');
        // const router = useRouter();


              // Detect click outside
  useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
          if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
            setActive('');
          }
        };
    
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, [])

      const handleSelect = (label: string) => {
        setActive(prev => (prev === label ? '' : label));
      };

      const handleClickModal = (path: string) => {
                setActive('');
                setModalOpen(path);
      }

      const handleCloseModal = ()=>{
        setModalOpen('')
      }

              
    return(
        <div  ref={wrapperRef} className="flex relative justify-between bg-white rounded-lg border border-[#ECECEC] px-4 h-13 items-center" >
            <div className=" text-[#414342]">
               <MenuOpen />
            </div>
            <div  className="flex gap-1.5  ">
                         <div className={`w-9 h-9  ${active == 'search' ? menuActive : menuPassive}   rounded-full flex justify-center items-center cursor-pointer `}
                           onClick={()=>handleSelect("search")}
                           > 
                                   <Search  style={iconStyle}/>
                        </div>
                        <div className={`w-9 h-9 ${active == 'logs' ? menuActive : menuPassive}  rounded-full flex justify-center items-center cursor-pointer `}
                           onClick={()=>handleSelect("logs")}
                        > 
                                <ManageHistoryOutlined  style={iconStyle}/>
                        </div>
                        <div className={`w-9 h-9 ${active == 'notification' ? menuActive : menuPassive}  rounded-full flex justify-center items-center cursor-pointer `} 
                           onClick={()=>handleSelect("notification")}
                           > 
                                <NotificationsOutlined style={iconStyle}/> 
                        </div>
                        <div className={`w-9 h-9 ${active == 'profile' ? menuActive : menuPassive} rounded-full flex justify-center items-center cursor-pointer `} 
                           onClick={()=>handleSelect("profile")}
                           > 
                                <PersonOutline  style={iconStyle}/>
                        </div>
                </div>
                <div className="absolute right-12.5 top-0.5  w-5 h-5 bg-[#DD3232]  rounded-full flex justify-center items-center text-[0.8rem] font-semibold   text-[#ffffff]" > 
                        1
                </div> 
                
                {active == 'logs'  &&(
                        <LogsModal />
                )}
                {active == 'profile'  &&(
                      <ProfileModal handleClickModal={handleClickModal} />    
                )}

                {modalOpen == 'system-configuration' && (
                        <RequestModal size="xxxl" onClose={handleCloseModal} title="System Configuration"   disableEscClose={true}>
                               <SystemConfigurationModal />
                        </RequestModal>
                )}
                 
        </div>
    )
}