import { Routes, Route, Navigate } from "react-router-dom";
import { useAppState } from "hooks";
import Home from "app/page";
import Login from "app/login/page";
import SignUp from "app/signup/page";

// Admin routes
import AdminDashboard from "app/admin/dashboard/page";
import Teachers from "app/admin/teachers/page";
import Students from "app/admin/students/page";
import Courses from "app/admin/courses/page";
import Staff from "app/admin/staff/page";
import CashFlows from "app/admin/cash-flows/page";
import Attendance from "app/admin/attendance/page";
import Settings from "app/admin/settings/page";
import AdminLayout from "components/Layouts/Admin";

// Teacher routes
import TeacherDashboard from "app/teacher/dashboard/page";
import TeacherAssignments from "app/teacher/assignments/page";
import TeacherLectures from "app/teacher/lectures/page";
import TeacherLeaves from "app/teacher/leaves/page";
import TeacherAttendance from "app/teacher/attendance/page";
import TeacherGrade from "app/teacher/grade/page";
import TeacherSettings from "app/teacher/settings/page";
import TeacherLayout from "components/Layouts/Teacher";

// Student routes
import StudentDashboard from "app/student/dashboard/page";
import StudentAssignments from "app/student/assignments/page";
import StudentLectures from "app/student/lectures/page";
import StudentCourses from "app/student/courses/page";
import StudentAttendance from "app/student/attendance/page";
import StudentGrade from "app/student/grade/page";
import StudentSettings from "app/student/settings/page";
import StudentLayout from "components/Layouts/Student";
import React from "react";
import NotFound from "app/NotFound";

const roleRoutes = {
  admin: [
    { path: "dashboard", component: AdminDashboard },
    { path: "teachers", component: Teachers },
    { path: "students", component: Students },
    { path: "courses", component: Courses },
    { path: "staff", component: Staff },
    { path: "cash-flows", component: CashFlows },
    { path: "attendance", component: Attendance },
    { path: "settings", component: Settings },
  ],
  teacher: [
    { path: "dashboard", component: TeacherDashboard },
    { path: "assignments", component: TeacherAssignments },
    { path: "lectures", component: TeacherLectures },
    { path: "leaves", component: TeacherLeaves },
    { path: "attendance", component: TeacherAttendance },
    { path: "grade", component: TeacherGrade },
    { path: "settings", component: TeacherSettings },
  ],
  student: [
    { path: "dashboard", component: StudentDashboard },
    { path: "courses", component: StudentCourses },
    { path: "lectures", component: StudentLectures },
    { path: "assignments", component: StudentAssignments },
    { path: "attendance", component: StudentAttendance },
    { path: "grade", component: StudentGrade },
    { path: "settings", component: StudentSettings },
  ],
};

// Explicitly define `role` type as one of 'admin' | 'teacher' | 'student'
const App = () => {
  const {
    auth: { user },
  } = useAppState();

  // Ensure that `role` is a valid role string
  const role = user?.role as "admin" | "teacher" | "student" | undefined;

  // If role is defined and is a valid key in layoutMap
  const layoutMap = {
    admin: AdminLayout,
    teacher: TeacherLayout,
    student: StudentLayout,
  };

  // Check if the role is valid and matches the layout map
  if (role && layoutMap[role]) {
    const Layout = layoutMap[role];
    const routes = roleRoutes[role];

    return (
      <Layout>
        <Routes>
          <Route
            path="/"
            element={
              user ? (
                <Navigate to={`${role}/${routes[0].path}`} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          {routes.map(({ path, component }) => (
            <Route
              key={path}
              path={`${role}/${path}`}
              element={
                user ? React.createElement(component) : <Navigate to="/login" />
              }
            />
          ))}
          {/* Add a fallback route outside the layout to prevent Navbar/Header rendering */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      {/* Catch-all route for non-matching paths outside layout */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
