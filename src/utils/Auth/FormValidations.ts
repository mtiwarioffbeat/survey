import z from 'zod'
import { Auth } from '@/types/auth';
export const LoginValidate = (payload:Auth['login'])=>{
    const LoginSchema = z.object({
    email: z.string().email('Invalid email format'),  
    })

     const result = LoginSchema.safeParse(payload);
        const zodErrors = {}

        if (!result.success) {
            const errorObj = result.error.format();
            // for (let key in errorObj) {
            //     if (errorObj[key]?._errors?.length) {
            //         zodErrors[key] = errorObj[key]._errors
            //     }
            // }

            // console.log("login me errorsssssss aa gye", zodErrors);
            console.log(errorObj)
            
        }
}


export const SignupValidate = (payload:Auth['signup'] | null) =>{
    const UserSchema = z.object({
    name: z.string().min(3, 'Name must be atleast 3 characters'),
    email: z.string().email('Invalid email format'),
   })

   const result = UserSchema.safeParse(payload)
    if (!result.success) {
            const errorObj = result.error.format();
            console.log("error obj",errorObj)
            
        }

    return result
}