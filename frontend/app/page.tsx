'use client'

import { useQueryClient } from '@tanstack/react-query';
import { useFetchUser } from '@/hooks/useAuth';
import { logoutUser } from '@/services/auth.service';
import { useRouter } from 'next/navigation'; // ✅ correct import for App Router

export default function HomePage() {
  const { data, isLoading } = useFetchUser();
  const queryClient = useQueryClient();
  const router = useRouter();

  const handleLogout = async () => {
    await logoutUser(); // performs API call (POST /logout)
    queryClient.removeQueries({ queryKey: ['me'] }); // clear user cache
    router.push('/login'); // redirect to login page
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Hello, {data?.name}</h1>
      <button onClick={handleLogout}>Logout</button> {/* ✅ clean logout */}
    </div>
  );
}
