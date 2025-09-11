
"use client"
import Aside from "@/components/dashboard/Aside";
import React, { useState } from "react";
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isMenu, setIsMenu] = useState(true);
  return (
    <div className="flex h-screen">
     <Aside isMenu={isMenu} setIsMenu={setIsMenu}/>
      {children}
    </div>
  );
}
