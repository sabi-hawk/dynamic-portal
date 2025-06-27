"use client";
import { Col, Row, Button, Menu } from "antd";
import React, { ReactNode, useEffect, useState } from "react";
// import Image from "next/image";
// import { usePathname } from "next/navigation";
import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
// import Link from "next/link";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearUser } from "flux/reducers/auth";
import { clearPortalSettings } from "flux/reducers/settings";
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
    label: <a href="/teacher/dashboard">Dashboard</a>,
  },
  {
    key: "profile",
    icon: (
      <img
        className="w-[13px] h-[13px]"
        height={13}
        width={13}
        src="/assets/icons/assignments.svg"
        alt="Dashboard Icon"
      />
    ),
    label: <a href="/teacher/profile">Profile</a>,
  },
  {
    key: "lectures",
    icon: (
      <img
        className="w-[13px] h-[13px]"
        height={13}
        width={13}
        src="/assets/icons/lectures.svg"
        alt="Dashboard Icon"
      />
    ),
    label: <a href="/teacher/lectures">Lectures</a>,
  },
  {
    key: "leaves",
    icon: (
      <img
        className="w-[13px] h-[13px]"
        height={13}
        width={13}
        src="/assets/icons/leaves.svg"
        alt="Dashboard Icon"
      />
    ),
    label: <a href="/teacher/leaves">Leaves Requests</a>,
  },
  {
    key: "notification",
    icon: (
      <img
        className="w-[13px] h-[13px]"
        height={13}
        width={13}
        src="/assets/icons/assignments.svg"
        alt="Dashboard Icon"
      />
    ),
    label: <a href="/teacher/notification">Notification</a>,
  },
  {
    key: "time-table",
    icon: (
      <img
        className="w-[13px] h-[13px]"
        height={13}
        width={13}
        src="/assets/icons/attendance.svg"
        alt="Dashboard Icon"
      />
    ),
    label: <a href="/teacher/time-table">Time Table</a>,
  },
  {
    key: "announcements",
    icon: (
      <img
        className="w-[13px] h-[13px]"
        height={13}
        width={13}
        src="/assets/icons/announcement.svg"
        alt="Announcements Icon"
      />
    ),
    label: <a href="/teacher/announcements">Announcements</a>,
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
    label: <a href="/teacher/settings">Settings</a>,
  },
];

function TeacherLayout({ children }: LayoutProps) {
  const {
    auth: { user },
  } = useAppState();
  const { settings } = useAppState();
  const teacherFeatures =
    settings.portalSettings?.portalPermissions?.teacherPortal?.features || [];

  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation(); // Get the current path
  const [selectedKey, setSelectedKey] = useState<string>("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const currentPath = location.pathname.split("/").pop();
      const foundItem = items.find((item) => item?.key === currentPath);
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
      <Col
        className="p-[30px] py-[30px] px-[10px] flex flex-col justify-between h-full"
        span={collapsed ? 1 : 3}
        style={{
          backgroundColor: settings.portalSettings?.secondaryColor || undefined,
        }}
      >
        {/* Top Section: Menu Only */}
        <div>
          <div className="mt-[30px]">
            <Menu
              className="w-full border-0"
              selectedKeys={[selectedKey]}
              defaultOpenKeys={["sub1"]}
              mode="inline"
              inlineCollapsed={collapsed}
              items={items.filter(
                (item) =>
                  item &&
                  typeof item.key === "string" &&
                  teacherFeatures.includes(item.key as string)
              )}
            />
          </div>
        </div>
        {/* Bottom Section: Institute Info */}
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
              <div
                className="w-[96px] h-[96px] bg-gray-200 flex items-center justify-center border border-gray-200 shadow-lg mb-3"
                style={{ borderRadius: "18px" }}
              >
                <img
                  className="w-[75px] h-[75px] gap-0 rounded-tl-[5px] border-t border-opacity-0 border border-[var(--white)]"
                  src="/assets/images/user.png"
                  alt="User Image"
                  width={75}
                  height={75}
                />
              </div>
            )}
            {/* Institute Name */}
            <span className="font-roboto text-lg font-semibold text-gray-900 leading-tight mb-1 text-center">
              {settings.portalSettings?.instituteName || "Institute Name"}
            </span>
            {/* Teacher Badge (like Admin/Student) */}
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200 gap-1 w-fit">
              <UserOutlined className="text-xs" /> Teacher
            </span>
            {/* Minimal Footer */}
            <div className="w-full mt-4 text-center text-xs text-gray-400 border-t border-gray-100 pt-2">
              <div>
                <span className="font-semibold">
                  {settings.portalSettings?.instituteType?.toUpperCase()}
                </span>
              </div>
              <div>{settings.portalSettings?.contactEmail}</div>
              <div>{settings.portalSettings?.contactPhone}</div>
            </div>
          </div>
        )}
      </Col>

      <Col className="flex flex-col h-screen" span={collapsed ? 23 : 21}>
        {/* Header */}
        <Row
          className="p-4 justify-between flex-shrink-0"
          style={{
            backgroundColor: settings.portalSettings?.primaryColor || undefined,
          }}
        >
          <Button
            className="m-0 text-inherit bg-inherit shadow-none"
            type="primary"
            onClick={toggleCollapsed}
          >
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </Button>
          <div>
            <span className="mr-3.5">{user?.name.first}</span>
            <Button onClick={handleLogout}>Logout</Button>
          </div>
        </Row>
        {/* Current Page */}
        <Row className="bg-[#f0f3fb] flex-grow shadow-custom flex flex-col p-[30px] overflow-y-auto min-h-0">
          {children}
        </Row>
      </Col>
    </Row>
  );
}

export default TeacherLayout;
