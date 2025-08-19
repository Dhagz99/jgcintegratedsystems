'use client';
import { useState } from 'react';
import {
  ApprovalSharp,
  Dashboard,
  Monitor,
  Upload,
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';

const menuItems = [
  { label: 'Dashboard', icon: Dashboard , path: '/request/'},
  { label: 'Submit Request', icon: Upload , path: '/request/submit-request'},
  { label: 'Approval', icon: ApprovalSharp, path: '/request/approval' },
  { label: 'Monitoring', icon: Monitor, path: '/request/monitoring' },
];

export default function SidebarMenu() {
  const [active, setActive] = useState('Dashboard');
  const iconStyle = { fontSize: '1.4rem' };
  const router = useRouter();
  const handleChange = (label: string, path: string) =>{
        setActive(label);
        router.push(path);
  }

  return (
    <div className="flex flex-col mt-1">
      <div className="text-[#A1A1A1] text-xs pb-1">Menu</div>
      {menuItems.map(({ label, icon: Icon, path }) => {
        const isActive = active === label; 
        const itemClasses = `
          text-xs  flex gap-2 items-center p-1.5 cursor-pointer rounded-sm
          ${isActive
            ? 'bg-[#32B695] text-white font-semibold'
            : 'text-[#7A7979] hover:bg-[#CCF8DD]'}
        `;
        return (
          <div
            key={label}
            className={itemClasses}
            onClick={()=>handleChange(label, path)}
          >
            <Icon
              className={isActive ? 'text-white' : 'text-[#7A7979]'}
              style={iconStyle}
            />
            <p>{label}</p>
          </div>
        );
      })}
    </div>
  );
}
