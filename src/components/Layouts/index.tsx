import React, { ReactNode } from "react";
import AdminLayout from "./Admin";
import TeacherLayout from "./Teacher";
import StudentLayout from "./Student";
import { useAppState } from "hooks";
// import { useRouter } from "next/navigation";

interface LayoutProps {
  children: ReactNode; // Define the type for children
}

function Layout({ children }: LayoutProps) {
  const {
    auth: { user, loading },
  } = useAppState();
  // const router = useRouter();
  // If loading or user is not resolved, show a loading screen
  if (loading) {
    return <div>Loading...</div>; // Replace with your preferred loader
  }

  if (!user) {
    // router.push("/");
  }
  switch (user?.role) {
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
