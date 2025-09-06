export interface Auth{
    signup:{
        name:string,
        email:string
    },
    login:{
        email:string
    },

    otp:{
        otp:number
    }

}