import React from "react";
import { Outlet } from "react-router-dom";

export default function CourseLayout() {
  return (
    <div className="min-h-screen bg-[#f5f8fe]">
      <Outlet />
    </div>
  );
}
