"use client";

import { Toaster } from 'react-hot-toast';
import RequestHeader from "./ui/main/Header"
import SidebarMenu from "./ui/main/SidebarMenu"
import NotificationsListener from './components/Notification';
import { useAuth } from '@/contexts/AuthContext';

export default function RequestMainLayout({
    children, }: Readonly<{
        children: React.ReactNode
    }>){
        const { user } = useAuth();

    return(
        
        <div className="flex bg-[#F2F7F4]  h-screen">
            <Toaster position="bottom-right" reverseOrder={false} />
             <NotificationsListener user={user} />

            <div className="flex w-58 p-2.5" >
                    <div className="flex flex-col bg-white w-full px-2 rounded-lg border border-[#ECECEC]">
                        <div className="flex justify-between p-3">
                            <div className="w-6.5 h-6.5 bg-[#32B695] rounded-full flex justify-center text-white">
                               a 
                            </div>
                            <div className='hidden sm:block'>
                                JGC Corp.
                            </div>
                        </div>
                        <SidebarMenu  />
                    </div>
            </div>
                <div className="flex flex-col w-full py-2 pr-2">
                    <RequestHeader />
                    <div className="h-full p-1 flex flex-col overflow-auto ">
                        {children}
                    </div>
                </div>

        </div>

    )  

}