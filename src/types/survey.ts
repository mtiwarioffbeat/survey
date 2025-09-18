interface QuestionType {
  type: string;
  icon: React.ReactNode;  // For UI only, but consider keeping only `type` string in Redux
}

interface Question {
  id: number;
  title: string;
  type: string; // just the string type like 'Paragraph', 'Multiple choice', etc.
  choices: string[];  // array of strings for simplicity
 
}

interface SurveyState {
  surveyHeading: string;
  surveyDescription: string;
  questions: Question[];
  currentQuestionTitle: string;
  currentQuestionType: string;
}


interface QuestionState {
  id?: number;
  title: string;
  description: string | null;
  type: string;
  choices: string[] | null;
  sortOrder: number;
}

export interface Survey{
  QuestionType:{
    name:string,
    description:string | null,
  },

  QuestionOption:{
    title:string,
    description:string|null,
    // QuestionID:INT FK, (will be returned, when question is created)
    // CreatedAt:(System generated)
    // IsDeleted: (NO req rn)
    // IsActive: (NO req rn)
    // SortOrder:number, (could use or index of array)
  },

  Survey:{
    name:string,
    description:string,
    // createdBy: number | null,//INT FK, (when axios==> add Createdby from session)
    // CreatedAt:Time (system gen or date.now())
    // IsDeleted: (No req rn)
    // IsActve: (No req rn)
    isPublished:boolean,
    isOpenedInEditMode:boolean,
    // editModeStartDateTime:Date,
    questions:Array<Survey['Question']>
    // EditStartBy:Int FK (when axios==>add id from session)
  },

  Question:{
    title:string,
    description: string | null,
    type:Survey['QuestionType']
    choices:Array<Survey['QuestionOption']>
    // QuestionTypeId: INT FK (backend wehn Question type is created it will return id)
    // SurveyID: INT FK (backend: when survey is create it will return id)
    // enteredBy: number | null //INT FK (frontend:when axios==> add id from session),
     // IsDeleted: (No req rn)
    // IsActve: (No req rn),
     // SortOrder:number, (could use or index of array)
  }

}