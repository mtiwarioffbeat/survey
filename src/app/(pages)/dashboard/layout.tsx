import Navbar from "@/components/Navbar";

export default async function Layout({ children }:{
  children: React.ReactNode
}) {
 
  return (
    <div className="h-screen bg-[#faf5ff] transition-all duration-300 ease-in-out">
      <Navbar/>
      {children}
    </div>
  );
}
 