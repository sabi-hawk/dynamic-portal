"use client";
import React from "react";
import { Row, Tabs } from "antd";
import GeneralSettings from "@/components/Forms/Settings/General";
import PortalSettings from "@/components/Forms/Settings/Portal";
import "./index.scss"

const onChange = (key: string) => {
  console.log(key);
};

function Settings() {
  return (
    <div>
      <div className="p-[20px] bg-white">
        <span className="font-roboto text-base font-medium leading-[18.75px] text-center text-[#5B626B]">
          Settings
        </span>
      </div>
      <Row className="settings-page bg-white py-[10px] px-[60px]">
        <Tabs
          className="w-full"
          onChange={onChange}
          type="card"
          size="large"
          items={[
            {
              label: `General`,
              key: "1",
              children: <GeneralSettings />,
            },
            {
              label: `Portal`,
              key: "2",
              children: <PortalSettings />,
            },
          ]}
        />
      </Row>
    </div>
  );
}

export default Settings;
