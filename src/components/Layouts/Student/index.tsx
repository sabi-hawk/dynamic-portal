import React, { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode; // Define the type for children
}

function StudentLayout({ children }: LayoutProps) {
  return <div>{children}</div>;
}

export default StudentLayout;
