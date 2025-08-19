'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerSchema, RegisterData } from '@/lib/schemas'
import { useRegister } from '@/hooks/useAuth'

export default function RegisterPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
  })

  const { mutate: registerUser} = useRegister();
  const onSubmit = async (data: RegisterData) => {
        registerUser(data, {
            onSuccess: () => {
                alert("Register");
            }
        })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input {...register('name')} placeholder="Name" />
      <p>{errors.name?.message}</p>
      <input {...register('email')} placeholder="Email" />
      <p>{errors.email?.message}</p>
      <input {...register('password')} type="password" placeholder="Password" />
      <p>{errors.password?.message}</p>
      <button type="submit">Register</button>
    </form>
  )
}
