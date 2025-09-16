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
