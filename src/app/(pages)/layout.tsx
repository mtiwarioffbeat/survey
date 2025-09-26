import Aside from "@/components/Aside";
import DashboardNav from "@/components/Navbar";
import { getSession } from "@/lib/getSession";
import { redirect } from "next/navigation";
// import FormNav from "@/components/dashboard/form/SurveyNav";

export default async function Layout({ children }:{
  children: React.ReactNode
}) {
  // Check authentication on server side
  const user = await getSession();
  if (!user) {
    redirect('/login');
  }
 
  return (
    <div className="h-screen bg-[#faf5ff] transition-all duration-300 ease-in-out">
      <DashboardNav/>
      {children}
    </div>
  );
}
 