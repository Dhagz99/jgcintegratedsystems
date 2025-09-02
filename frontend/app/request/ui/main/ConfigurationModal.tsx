import { Person, RequestPage } from "@mui/icons-material";
import { useState } from "react";
import CheckerConfigModal from "./CheckerConfigModal";
import RequestConfigurationModal from "./RequestConfigurationModal";
import BranchConfigModal from "./BranchConfigModal";
import AccountManagerModal from "./AccountManagerModal";



export default function SystemConfigurationModal() {
    const menuItem = [
        {label: 'Request', icon: RequestPage, path: 'request'},
        {label: 'Branch', icon: RequestPage, path: 'branch'},
        {label: 'Account Manager', icon: Person, path: 'accounts'},
    ]
    const [selectConfig, setSelectConfig] = useState("request");
    const handleChange = (label: string) =>{
        setSelectConfig(label);
    }
    return(
          <div className="flex w-full min-h-100">
                  <div className="flex  min-w-60  border-r-2 border-gray-200">
                          <div className="flex flex-col w-full pr-3">
                            {menuItem.map(({label,  icon: Icon, path}) =>{
                                 const isActive = selectConfig === path; 
                              return(
                                  <div key={label} className={`flex p-3   text-md items-center gap-3 font-semibold w-full rounded-r-full cursor-pointer
                                        ${isActive ? "bg-green-200" : " "}
                                    `}
                                    onClick={()=>handleChange(path)}
                                  >
                                     <Icon />
                                    <p> {label}</p>
                                 </div>
                              )
                            })}
                          </div>
                  </div>
                  <div className="flex flex-col w-full px-3">
                         {selectConfig == "request" &&(
                            <RequestConfigurationModal />
                        )}
                        {selectConfig == "checker" &&(
                            <CheckerConfigModal />
                        )}
                          {selectConfig == "branch" &&(
                            <BranchConfigModal />
                        )}
                          {selectConfig == "accounts" &&(
                            <AccountManagerModal />
                        )}
                         
                  </div>
              </div>
    )
}