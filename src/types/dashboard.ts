interface Session{
    id:number | null,
    name:string | null,
    email:string | null
}

interface SurveyDeleteConfirm{
    survey_id:number,
    delete:boolean,
    text:string
}