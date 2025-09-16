"use client"
import Aside from "@/components/Aside";
import DashboardNav from "@/components/Navbar";
import FormNav from "@/components/dashboard/form/SurveyNav";


export default  function layout({ children }:{
  children: React.ReactNode
}) {
 
  return (
    
    <div className="h-screen bg-[#faf5ff] transition-all duration-300 ease-in-out">
    <DashboardNav/>
   
    {children}
    </div>
   
  );
}
 