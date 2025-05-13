"use client";
import { Col, Row, Button, Menu } from "antd";
import React, { ReactNode, useEffect, useState } from "react";
// import Image from "next/image";
// import { usePathname } from "next/navigation";
import {
  DollarOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
// import Link from "next/link";
import { useDispatch } from "react-redux";
// import { useRouter } from "next/navigation";
import { clearUser } from "flux/reducers/auth";
import { useLocation, useNavigate } from "react-router-dom";

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
    navigate("/");
  };
  return (
    <Row className="h-screen">
      {/* Navigation */}
      <Col className="p-[30px] py-[30px] px-[10px]" span={collapsed ? 1 : 3}>
        {/* Nav Header */}
        {!collapsed && (
          <div className="mb-[30px] flex flex-col gap-[10px]">
            <h2 className="font-roboto text-[14px] font-bold leading-[16.41px] text-center">
              BRAND LOGO
            </h2>
            <div className="flex flex-col items-center gap-[7px]">
              <img
                className="w-[75px] h-[75px] gap-0 rounded-tl-[5px] border-t border-opacity-0 border border-[var(--white)]"
                src="/assets/images/user.png"
                alt="User Image"
                width={75}
                height={75}
              />
              <span className="mr-2.5 font-roboto text-sm font-normal leading-4 text-center">
                Username
              </span>
              <span className="font-roboto text-xs font-normal leading-[14.06px] text-center">
                Super Admin
              </span>
            </div>
          </div>
        )}
        {/* Menu */}
        <div className="mt-[30px]">
          <Menu
            // style={{ border: "0 !important" }}
            className="w-full border-0"
            selectedKeys={[selectedKey]}
            defaultOpenKeys={["sub1"]}
            mode="inline"
            inlineCollapsed={collapsed}
            items={items}
          />
        </div>
      </Col>

      <Col className="flex flex-col" span={collapsed ? 23 : 21}>
        {/* Header */}
        <Row className="p-4 justify-between">
          <Button
            className="m-0 text-inherit bg-inherit shadow-none"
            type="primary"
            onClick={toggleCollapsed}
          >
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </Button>
          <div>
            <span className="mr-2.5">Username</span>
            <Button onClick={handleLogout}>Logout</Button>
          </div>
        </Row>
        {/* Current Page */}
        <Row className="bg-[#f0f3fb] flex-grow shadow-custom flex flex-col p-[30px]">
          {children}
        </Row>
      </Col>
    </Row>
  );
}

export default AdminLayout;
