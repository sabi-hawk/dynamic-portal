import React, { ReactNode } from "react";
import AdminLayout from "./Admin";
import TeacherLayout from "./Teacher";
import StudentLayout from "./Student";

interface LayoutProps {
  children: ReactNode; // Define the type for children
  role: string;
}

function Layout({ children, role }: LayoutProps) {
  switch (role) {
    case "admin":
      return <AdminLayout>{children}</AdminLayout>;
    case "teacher":
      return <TeacherLayout>{children}</TeacherLayout>;
    case "student":
      return <StudentLayout>{children}</StudentLayout>;
    default:
      return <div>{children}</div>; // Default layout or fallback
  }
}

export default Layout;
