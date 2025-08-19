'use client'

import { RequestPage } from "@mui/icons-material"

export default function SystemConfiguration(){
    
    return(
        <div className="flex w-full min-h-100">
            <div className="flex  w-70 ">
                    <div className="flex flex-col w-full">
                        <div className="flex p-3 bg-green-200 text-lg items-center gap-3 font-medium w-full rounded-r-full">
                            <RequestPage /> 
                            <p> Request</p>
                        </div>
                        <div className="flex p-3 text-lg items-center gap-3 font-medium w-full rounded-r-full">
                            <RequestPage /> 
                            <p> Request</p>
                        </div>
                    </div>
            </div>
            <div className="flex flex-col w-full">
                <div className="flex justify-center">
                    <h2 className="text-xl font-semibold">
                         Request Configuration
                    </h2>
                </div>
                <table>
                    <thead>
                        <thead>
                            <tr>
                                <th></th>
                            </tr>
                        </thead>
                    </thead>
                </table>
            </div>
        </div>
    )
}