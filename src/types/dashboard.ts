interface Session{
    id:number | null,
    name:string | null,
    email:string | null
}

interface GenModalConfirm{
    survey_id:number,
    survey_name:string,
    to_delete:boolean,
    to_publish:boolean,
    text:string,
}