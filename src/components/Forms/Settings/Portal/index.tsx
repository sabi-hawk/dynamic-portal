import type { CSSProperties } from "react";
import React from "react";
import { CaretRightOutlined } from "@ant-design/icons";
import type { CollapseProps } from "antd";
import { Collapse, theme, Col } from "antd";
import DetailsForm from "./DetailsForm/index";
import PermissionsForm from "./PermissionsForm";
import "./index.scss";

const getItems: (panelStyle: CSSProperties) => CollapseProps["items"] = (
  panelStyle
) => [
  {
    key: "1",
    label: "Institute Details",
    children: <DetailsForm />,
    style: panelStyle,
  },
  {
    key: "2",
    label: "Access Rights",
    children: <PermissionsForm />,
    style: panelStyle,
  },
];

function PortalSettings() {
  const { token } = theme.useToken();
  const panelStyle: React.CSSProperties = {
    marginBottom: 24,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: "none",
  };

  return (
    <Col span={24} className="px-[30px] py-[10px]">
      <Collapse
        bordered={false}
        defaultActiveKey={["1"]}
        expandIcon={({ isActive }) => (
          <CaretRightOutlined rotate={isActive ? 90 : 0} />
        )}
        style={{ background: token.colorBgContainer }}
        items={getItems(panelStyle)}
      />
    </Col>
  );
}

export default PortalSettings;
