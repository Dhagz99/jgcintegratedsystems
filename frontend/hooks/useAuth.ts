import { useAuth } from "@/contexts/AuthContext"
import { LoginData, RegisterData } from "@/lib/schemas"
import { fetchMe, loginUser, logoutUser, registerUser } from "@/services/auth.service"
import { PublicUserDTO } from "@/types/auth.type"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useRouter } from "next/navigation"

export const useLogin = () =>{
    const router = useRouter();
    return useMutation({
        mutationFn: (data: LoginData) => loginUser(data),
        onSuccess: () => {
            router.push("/request"); 
        }
    })
}

export const useRegister = () => {
    return useMutation({
        mutationFn: (data: RegisterData) => registerUser(data),
    })
}

export const useLogout  = () =>{
    const router = useRouter();
    const { setUser } = useAuth();
    return useMutation({
        mutationFn: logoutUser,
        onSuccess: () => {
            setUser(null);
            router.push("/login"); 
        }
    })
}


export const useFetchUser = () => {
    return useQuery<PublicUserDTO>({
        queryKey: ['me'],
        queryFn: fetchMe,
    })
}