"use client"
import Aside from "@/components/dashboard/Aside";


export default  function layout({ children }:{
  children: React.ReactNode
}) {
 
  return (
    
    <div>
    <Aside isMenu={false} setIsMenu={function (val: boolean): void {
          throw new Error("Function not implemented.");
        } }/>
    {children}
    </div>
   
  );
}
 