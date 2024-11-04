import React, { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode; // Define the type for children
}

function TeacherLayout({ children }: LayoutProps) {
  return <div>{children}</div>;
}

export default TeacherLayout;
