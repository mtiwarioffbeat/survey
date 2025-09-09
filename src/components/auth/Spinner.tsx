import { ClipLoader } from "react-spinners";


function Spinner() {

  return (
    
      <ClipLoader 
        color="#fff" 
        size={20}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    
  );
}

export default Spinner;