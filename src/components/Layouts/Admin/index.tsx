"use client";
import { Col, Row, Button, Menu } from "antd";
import React, { ReactNode, useEffect, useState } from "react";
// import Image from "next/image";
// import { usePathname } from "next/navigation";
import {
  DollarOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
// import Link from "next/link";
import { useDispatch } from "react-redux";
// import { useRouter } from "next/navigation";
import { clearUser } from "flux/reducers/auth";
import { clearPortalSettings } from "flux/reducers/settings";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppState } from "hooks";

interface LayoutProps {
  children: ReactNode; // Define the type for children
}

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    key: "dashboard",
    icon: (
      <img
        className="w-[13px] h-[13px]"
        height={13}
        width={13}
        src="/assets/icons/dashboard.svg"
        alt="Dashboard Icon"
      />
    ),
    label: <a href="/admin/dashboard">Dashboard</a>,
  },
  // {
  //   key: "teachers",
  //   icon: (
  //     <img
  //       className="w-[13px] h-[13px]"
  //       height={13}
  //       width={13}
  //       src="/assets/icons/teachers.svg"
  //       alt="teachers Icon"
  //     />
  //   ),
  //   label: <a href="/admin/teachers">Teachers</a>,
  // },
  {
    key: "students",
    icon: (
      <img
        className="w-[13px] h-[13px]"
        height={13}
        width={13}
        src="/assets/icons/students.svg"
        alt="Student Icon"
      />
    ),
    label: <a href="/admin/students">Students</a>,
  },
  {
    key: "courses",
    icon: (
      <img
        className="w-[11.24px] h-[13px]"
        height={13}
        width={13}
        src="/assets/icons/courses.svg"
        alt="Courses Icon"
      />
    ),
    label: <a href="/admin/courses">Courses</a>,
  },
  {
    key: "staff",
    icon: (
      <img
        className="w-[13px] h-[13px]"
        height={13}
        width={13}
        src="/assets/icons/teachers.svg"
        alt="staff Icon"
      />
    ),
    label: <a href="/admin/staff">Staff</a>,
  },
  {
    key: "cash-flows",
    icon: <DollarOutlined />,
    label: <a href="/admin/cash-flows">Cash Flows</a>,
  },
  {
    key: "attendance",
    icon: (
      <img
        className="w-[13px] h-[13px]"
        height={13}
        width={13}
        src="/assets/icons/teachers.svg"
        alt="attendance Icon"
      />
    ),
    label: <a href="/admin/attendance">Attendance</a>,
  },
  {
    key: "settings",
    icon: (
      <img
        className="w-[13px] h-[13px]"
        height={13}
        width={13}
        src="/assets/icons/settings.svg"
        alt="Settings Icon"
      />
    ),
    label: <a href="/admin/settings">Settings</a>,
  },
];

function AdminLayout({ children }: LayoutProps) {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const [selectedKey, setSelectedKey] = useState<string>("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { settings } = useAppState();

  useEffect(() => {
    // Check for window to ensure this runs only on the client side
    if (typeof window !== "undefined") {
      const currentPath = location.pathname.split("/").pop();
      const foundItem = items.find((item) => item?.key === currentPath); // Find item by key
      const key = foundItem?.key || "dashboard";
      setSelectedKey(key as string);
    }
  }, [location]);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const handleLogout = () => {
    dispatch(clearUser());
    dispatch(clearPortalSettings());
    navigate("/");
  };
  return (
    <Row className="h-screen">
      {/* Navigation */}
      <Col className="p-[30px] py-[30px] px-[10px] flex flex-col justify-between h-full" span={collapsed ? 1 : 3}>
        {/* Menu at the top */}
        <div>
          <div className="mt-[30px]">
            <Menu
              className="w-full border-0"
              selectedKeys={[selectedKey]}
              defaultOpenKeys={["sub1"]}
              mode="inline"
              inlineCollapsed={collapsed}
              items={items}
            />
          </div>
        </div>

        {/* Institute Info at the bottom */}
        {!collapsed && (
          <div className="flex flex-col items-center w-full mt-8">
            {/* Logo */}
            {settings.portalSettings?.logoUrl ? (
              <div
                className="w-[96px] h-[96px] bg-white border border-gray-200 shadow-lg flex items-center justify-center mb-3"
                style={{ borderRadius: "18px", padding: "10px" }}
              >
                <img
                  className="w-full h-full object-contain"
                  src={settings.portalSettings.logoUrl}
                  alt="Institute Logo"
                  style={{ display: "block" }}
                />
              </div>
            ) : (
              <div className="w-[96px] h-[96px] bg-gray-200 flex items-center justify-center border border-gray-200 shadow-lg mb-3" style={{ borderRadius: "18px" }}>
                <UserOutlined className="text-4xl text-gray-400" />
              </div>
            )}
            {/* Institute Name */}
            <span className="font-roboto text-lg font-semibold text-gray-900 leading-tight mb-1 text-center">
              {settings.portalSettings?.instituteName || "Institute Name"}
            </span>
            {/* Admin Badge */}
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200 gap-1 w-fit">
              <UserOutlined className="text-xs" /> Admin
            </span>
            {/* Minimal Footer */}
            <div className="w-full mt-4 text-center text-xs text-gray-400 border-t border-gray-100 pt-2">
              <div>
                <span className="font-semibold">{settings.portalSettings?.instituteType?.toUpperCase()}</span>
              </div>
              <div>{settings.portalSettings?.contactEmail}</div>
              <div>{settings.portalSettings?.contactPhone}</div>
            </div>
          </div>
        )}
      </Col>

      <Col className="flex flex-col h-screen" span={collapsed ? 23 : 21}>
        {/* Header */}
        <Row className="p-4 justify-between flex-shrink-0">
          <Button
            className="m-0 text-inherit bg-inherit shadow-none"
            type="primary"
            onClick={toggleCollapsed}
          >
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </Button>
          <div>
            <span className="mr-2.5">Admin</span>
            <Button onClick={handleLogout}>Logout</Button>
          </div>
        </Row>
        {/* Main Content: Make this scrollable */}
        <Row className="bg-[#f0f3fb] flex-grow shadow-custom flex flex-col p-[30px] overflow-y-auto min-h-0">
          {children}
        </Row>
      </Col>
    </Row>
  );
}

export default AdminLayout;
