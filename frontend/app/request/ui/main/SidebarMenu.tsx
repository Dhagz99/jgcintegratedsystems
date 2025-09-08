'use client';

import {
  ApprovalSharp,
  Dashboard,
  Monitor,
  Upload,
} from '@mui/icons-material';
import { useRouter, usePathname } from 'next/navigation';
import { useFetchUser } from '@/hooks/useAuth';

const allMenuItems = [
  // { label: 'Dashboard', icon: Dashboard, path: '/request/' },
  { label: 'Submit Request', icon: Upload, path: '/request/submit-request' },
  { label: 'Approval', icon: ApprovalSharp, path: '/request/approval' },
  { label: 'Monitoring', icon: Monitor, path: '/request/monitoring' },
];


export default function SidebarMenu() {
  const {data: user} = useFetchUser();
  const router = useRouter();
  const pathname = usePathname();

  // ✅ filter menu items based on user type
  const menuItems = allMenuItems.filter((item) => {
    if (item.label === "Approval" && user?.role === "Branch") {
      return false; // hide for branch users
    }
    return true;
  });

  return (
    <div className="flex flex-col mt-1 w-14 sm:w-40 transition-all duration-300">
      <div className="text-[#A1A1A1] text-xs pb-1">Menu</div>
      {menuItems.map(({ label, icon: Icon, path }) => {
        const isActive = pathname.startsWith(path);
        const itemClasses = `
          text-xs flex gap-2 items-center p-1.5 cursor-pointer rounded-sm justify-center sm:justify-start
          ${
            isActive
              ? 'bg-[#32B695] text-white font-semibold'
              : 'text-[#7A7979] hover:bg-[#CCF8DD]'
          }
        `;

        return (
          <div
            key={label}
            className={itemClasses}
            onClick={() => router.push(path)}
          >
            <Icon
              className={isActive ? 'text-white' : 'text-[#7A7979]'}
              style={{ fontSize: '1.4rem' }}
            />
            <p className="hidden sm:block">{label}</p>
          </div>
        );
      })}
    </div>
  );
}
