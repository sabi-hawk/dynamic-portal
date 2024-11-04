"use client";
import { Col, Row, Button, Menu } from "antd";
import React, { ReactNode, useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import DashboardIcon from "../../../assets/icons/dashboard.png";
import AdminIcon from "../../../assets/icons/users.png";
import TeacherIcon from "../../../assets/icons/teachers.png";
import StudentIcon from "../../../assets/icons/students.png";
import CoursesIcon from "../../../assets/icons/courses.png";
import SettingsIcon from "../../../assets/icons/settings.png";
import UserImage from "../../../assets/images/user.png";
import type { MenuProps } from "antd";
import Link from "next/link";

interface LayoutProps {
  children: ReactNode; // Define the type for children
}

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    key: "dashboard",
    icon: (
      <Image
        className="w-[13px] h-[13px]"
        src={DashboardIcon}
        alt="Dashboard Icon"
      />
    ),
    label: <Link href="/dashboard">Dashboard</Link>,
  },
  {
    key: "admins",
    icon: (
      <Image className="w-[13px] h-[13px]" src={AdminIcon} alt="Admin Icon" />
    ),
    label: <Link href="/admins">Admins</Link>,
  },
  {
    key: "teachers",
    icon: (
      <Image
        className="w-[13px] h-[13px]"
        src={TeacherIcon}
        alt="Teacher Icon"
      />
    ),
    label: <Link href="/teachers">Teachers</Link>,
  },
  {
    key: "students",
    icon: (
      <Image
        className="w-[13px] h-[13px]"
        src={StudentIcon}
        alt="Student Icon"
      />
    ),
    label: <Link href="/students">Students</Link>,
  },
  {
    key: "courses",
    icon: (
      <Image
        className="w-[11.24px] h-[13px]"
        src={CoursesIcon}
        alt="Courses Icon"
      />
    ),
    label: <Link href="/courses">Courses</Link>,
  },
  {
    key: "settings",
    icon: (
      <Image
        className="w-[13px] h-[13px]"
        src={SettingsIcon}
        alt="Settings Icon"
      />
    ),
    label: <Link href="/settings">Settings</Link>,
  }
];

function AdminLayout({ children }: LayoutProps) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname(); // Get the current path
  const [selectedKey, setSelectedKey] = useState<string>("");

  useEffect(() => {
    // Check for window to ensure this runs only on the client side
    if (typeof window !== "undefined") {
      const currentPath = pathname.replace("/", ""); // Remove leading slash to match keys
      const foundItem = items.find((item) => item?.key === currentPath); // Find item by key
      const key = foundItem?.key || "dashboard"; 
      setSelectedKey(key as string);
    }
  }, [pathname]);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
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
              <Image
                className="w-[75px] h-[75px] gap-0 rounded-tl-[5px] border-t border-opacity-0 border border-[var(--white)]"
                src={UserImage}
                alt="User Image"
              />
              <span className="font-roboto text-sm font-normal leading-4 text-center">
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
            style={{ border: "0 !important" }}
            className="w-full"
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
          <span>Username</span>
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