'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema, LoginData } from '@/lib/schemas'
import { useLogin } from '@/hooks/useAuth'
import { useAuth } from '@/contexts/AuthContext'
import SweetAlert from '../request/components/Swal'

export default function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  })
  const { setUser } = useAuth();

  const {mutate} = useLogin()
  const onSubmit =  (data: LoginData) => {
    mutate(data, {
        onSuccess: (res) => {
          setUser(res.user); 
          SweetAlert.successAlert('Signing In', 'User Sign in Successfully')
        },
        onError:() =>{
           SweetAlert.errorAlert('Invalid Credential', 'Please check your username or password.')
        }
    })
  }
return (
  <div className="flex bg-white-500 min-h-screen items-center justify-center relative">
    
     <div className="absolute w-[8rem] h-[8rem] rounded-b-full bg-amber-200 top-0 right-1 blur-sm"></div>
     <div className="absolute w-[8rem] h-[8rem] rounded-t-full bg-violet-300 bottom-0 left-1 blur-sm"></div>
     <div className="absolute w-[11rem] h-[7rem] rounded-r-full bg-red-200 top-0 left-1 blur-sm"></div>
     <div className="absolute w-[11rem] h-[8rem] rounded-l-full bg-green-200 bottom-0 right-1 blur-sm"></div>

    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 bg-white-100 w-[min(90rem,100%)] mx-auto my-4 flex flex-col justify-center max-w-[30rem] p-6 rounded-lg shadow"
    >
      <div className='flex flex-col gap-1 py-2'>
        <h1 className='font-semibold text-2xl'>Welcome Back!</h1>
        <p className='font-regular'>Let's get started, Please enter your details.</p>
      </div>
      <input
        {...register("username")}
        placeholder="Email / Username"
        className="border p-2 rounded w-full"
      />
      <p className="text-red-500 text-sm">{errors.username?.message}</p>

      <input
        {...register("password")}
        type="password"
        placeholder="Password"
        className="border p-2 rounded w-full"
      />
      <p className="text-red-500 text-sm">{errors.password?.message}</p>

      <button
        className="bg-green-800 text-white py-2 px-4 rounded cursor-pointer hover:bg-green-600"
        type="submit"
      >
        Sign In
      </button>
    </form>
  </div>
);
}
