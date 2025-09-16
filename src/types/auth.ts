export interface Auth{
    signup:{
        name:string,
        email:string
    } ,
    login:{
        email:string
    },

    otp:{
        otp:number
    },

    zodErrors:{
    name: string;
    email: string;
    },  
    verify:{
        email:string | undefined,
        otp:string | undefined
    },
    userToken:{
        token:string,
        is_used:boolean,
        user_id:number
        // used_at:number 
    }

}

export enum ResendOTP{
    ResendOtp="ResendOtp",
    SubmitOtp="SubmitOtp"
} 

