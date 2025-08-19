'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema, LoginData } from '@/lib/schemas'
import { useLogin } from '@/hooks/useAuth'
import { useAuth } from '@/contexts/AuthContext'

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
          alert(`Logged in as ${res.user.name}`);
        },
    })
  }
  return (
    <div className='flex bg-red-100'>
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input {...register('username')} placeholder="Email" />
        <p>{errors.username?.message}</p>
        <input {...register('password')} type="password" placeholder="Password" />
        <p>{errors.password?.message}</p>
        <button className='bg-green-500' type="submit">Login</button>

        
      </form>
    </div>
 
  )
}
