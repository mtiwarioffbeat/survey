interface auth{
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