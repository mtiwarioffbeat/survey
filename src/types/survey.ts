export interface Survey{
  QuestionType:{
    title:string,
    description:string | null,
  },

  QuestionOption:{
    title:string,
    description:string|null,
    isDeleted: boolean
    // QuestionID:INT FK, (will be returned, when question is created)
    // CreatedAt:(System generated)
    // IsActive: (NO req rn)
    // SortOrder:number, (could use or index of array)
  },

  Survey:{
    title:string,
    description:string,
    isDeleted:boolean
    isPublished:boolean,
    isOpenedInEditMode:boolean,
    questions:Array<Survey['Question']>
    // createdBy: number | null,//INT FK, (when axios==> add Createdby from session)
    // CreatedAt:Time (system gen or date.now())
    // IsActve: (No req rn)
    // editModeStartDateTime:Date,
    // EditStartBy:Int FK (when axios==>add id from session)
  },

  Question:{
    title:string,
    description: string | null,
    type:Survey['QuestionType']
    choices:Array<Survey['QuestionOption']>
    isDeleted: boolean
    // QuestionTypeId: INT FK (backend wehn Question type is created it will return id)
    // SurveyID: INT FK (backend: when survey is create it will return id)
    // enteredBy: number | null //INT FK (frontend:when axios==> add id from session),
    // IsActve: (No req rn),
     // SortOrder:number, (could use or index of array)
  }

}


export type Surveys = {
  id:number | null,
  title:string | null ,
  description:string | null,
  createdBy:string | null,
  isPublished:boolean | null,
  isOpenedInEditMode:boolean | null,
  // isDeleted:boolean,
  questions:[{
    title:string | null,
    description:string | null,
    sortOrder:number | null,
    // enteredBy:string
    type:{
      title:string | null,
      description:string | null
    },
    choices:[{
      title:string | null,
      description:string | null,
      sortOrder:string | null
    }]
  }]
}