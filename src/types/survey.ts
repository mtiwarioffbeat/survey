export interface Survey {
  QuestionType: {
    title: string,
    description: string | null,

  },

  QuestionOption: {
    id:number
    title: string,
    description: string | null,
    isDeleted?: boolean,
    sortOrder?: number,
    // QuestionID:INT FK, (will be returned, when question is created)
    // CreatedAt:(System generated)
    // IsActive: (NO req rn)
    // SortOrder:number, (could use or index of array)
  },

  Survey: {
    id?: number,
    title: string,
    description: string,
    isDeleted?: boolean,
    createdBy?: string,
    createdAt?: Date,
    isPublished: boolean,
    isOpenedInEditMode: boolean,
    questions: Array<Survey['Question']>
    // createdBy: number | null,//INT FK, (when axios==> add Createdby from session)
    // CreatedAt:Time (system gen or date.now())
    // IsActve: (No req rn)
    // editModeStartDateTime:Date,
    // EditStartBy:Int FK (when axios==>add id from session)
  },

  Question: {
    id?:number
    title: string,
    description: string | null,
    type: Survey['QuestionType']
    choices: Array<Survey['QuestionOption']>
    isDeleted?: boolean,
    sortOrder?: number,
    // QuestionTypeId: INT FK (backend wehn Question type is created it will return id)
    // SurveyID: INT FK (backend: when survey is create it will return id)
    // enteredBy: number | null //INT FK (frontend:when axios==> add id from session),
    // IsActve: (No req rn),
    // SortOrder:number, (could use or index of array)
  }

}


export type Surveys = {
  id: number,
  title: string,
  description: string,
  createdBy: string,
  createdAt: Date,
  isDeleted?: boolean
  isPublished: boolean,
  isOpenedInEditMode: boolean,
  // isDeleted:boolean,
  questions: Array<{
    id:number
    title: string,
    description: string | null,
    sortOrder: number,
    isDeleted?: boolean,
    // enteredBy:string
    type: {
      title: string,
      description: string | null
    },
    choices: Array<{
      id:number,
      title: string,
      description: string | null,
      sortOrder: string,
      isDeleted?: boolean
    }>
  }>
}

export interface PatchSurvey{
  survey_id:number,
  to_delete:boolean,
  to_publish:boolean
}