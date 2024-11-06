"use client";
import React from "react";
import AdminLayout from "@/components/Layouts/Admin";
import { Row, Tabs } from "antd";

const onChange = (key: string) => {
  console.log(key);
};

function Settings() {
  return (
    <AdminLayout>
      <div className="p-[20px] bg-white">
        <span className="font-roboto text-base font-medium leading-[18.75px] text-center text-[#5B626B]">
          Settings
        </span>
      </div>
      <Row className="bg-white py-[10px] px-[60px]">
        <Tabs
          onChange={onChange}
          type="card"
          size="large"
          items={[
            {
              label: `General`,
              key: "1",
              children: `Content of Tab Pane ${1}`,
            },
            {
              label: `Portal`,
              key: "2",
              children: `Content of Tab Pane ${2}`,
            },
          ]}
        />
      </Row>
    </AdminLayout>
  );
}

export default Settings;
