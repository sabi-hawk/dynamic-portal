import { Routes, Route, Navigate } from "react-router-dom";
import { useAppState } from "hooks";
import Home from "app/page";
import Login from "app/login/page";
import SignUp from "app/signup/page";

import Dashboard from "app/admin/dashboard/page";
import Teachers from "app/admin/teachers/page";
import Students from "app/admin/students/page";
import Courses from "app/admin/courses/page";
import Staff from "app/admin/staff/page";
import CashFlows from "app/admin/cash-flows/page";
import Attendance from "app/admin/attendance/page";
import Settings from "app/admin/settings/page";
import AdminLayout from "components/Layouts/Admin";

import TeacherDashboard from "app/teacher/dashboard/page";
import TeacherAssignments from "app/teacher/notification/page";
import TeacherLectures from "app/teacher/lectures/page";
import TeacherLeaves from "app/teacher/leaves/page";
import TeacherAttendance from "app/teacher/time-table/page";
import TeacherGrade from "app/teacher/profile/page";
import TeacherSettings from "app/teacher/settings/page";
import TeacherLayout from "components/Layouts/Teacher";

const App = () => {
  const {
    auth: { user },
  } = useAppState();

  if (user) {
    if (user?.role === "admin") {
      return (
        <AdminLayout>
          <Routes>
            <Route
              path="/"
              element={
                user ? (
                  <Navigate to="admin/dashboard" />
                ) : (
                  <Navigate to="login" />
                )
              }
            />
            <Route
              path="admin/dashboard"
              element={user ? <Dashboard /> : <Navigate to="../auth" />}
            />
            <Route
              path="admin/teachers"
              element={user ? <Teachers /> : <Navigate to="/login" />}
            />
            <Route
              path="admin/students"
              element={user ? <Students /> : <Navigate to="/login" />}
            />
            <Route
              path="admin/courses"
              element={user ? <Courses /> : <Navigate to="/login" />}
            />
            <Route
              path="admin/staff"
              element={user ? <Staff /> : <Navigate to="/login" />}
            />
            <Route
              path="admin/cash-flows"
              element={user ? <CashFlows /> : <Navigate to="/login" />}
            />
            <Route
              path="admin/attendance"
              element={user ? <Attendance /> : <Navigate to="/login" />}
            />
            <Route
              path="admin/settings"
              element={user ? <Settings /> : <Navigate to="/login" />}
            />
          </Routes>
        </AdminLayout>
      );
    }
    if (user?.role === "teacher") {
      return (
        <TeacherLayout>
          <Routes>
            <Route
              path="/"
              element={
                user ? (
                  <Navigate to="teacher/dashboard" />
                ) : (
                  <Navigate to="login" />
                )
              }
            />
            <Route
              path="teacher/dashboard"
              element={user ? <TeacherDashboard /> : <Navigate to="../auth" />}
            />
            <Route
              path="teacher/lectures"
              element={user ? <TeacherLectures /> : <Navigate to="/login" />}
            />
            <Route
              path="teacher/leaves"
              element={user ? <TeacherLeaves /> : <Navigate to="/login" />}
            />
            <Route
              path="teacher/assignments"
              element={user ? <TeacherAssignments /> : <Navigate to="/login" />}
            />
            <Route
              path="teacher/assignments"
              element={user ? <TeacherAttendance /> : <Navigate to="/login" />}
            />
            <Route
              path="teacher/grade"
              element={user ? <TeacherGrade /> : <Navigate to="/login" />}
            />
            <Route
              path="teacher/settings"
              element={user ? <TeacherSettings /> : <Navigate to="/login" />}
            />
          </Routes>
        </TeacherLayout>
      );
    }
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="*" element={<Navigate to="../" />} />
    </Routes>
  );
};
export default App;
