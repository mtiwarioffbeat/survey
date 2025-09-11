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
    }

}

export enum ResendOTP{
    ResendOtp="ResendOtp",
    SubmitOtp="SubmitOtp"
} 

