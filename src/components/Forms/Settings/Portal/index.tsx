import React from "react";
import { Collapse, Form, Button, message, Col } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import type { CollapseProps } from "antd";
import DetailsForm from "./DetailsForm";
import PermissionsForm from "./PermissionsForm";
import { updatePortalSettings } from "api/settings";
import "./index.scss";
import { setPortalSettings } from "flux/reducers/settings";
import { useDispatch } from "react-redux";

const PortalSettings: React.FC = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const handleSubmit = async (values: any) => {
    try {
      const formData = new FormData();
      const submissionData = { ...values };

      // Convert color objects to hex strings
      if (
        submissionData.primaryColor &&
        typeof submissionData.primaryColor === "object"
      ) {
        submissionData.primaryColor = submissionData.primaryColor.toHexString();
      }
      if (
        submissionData.secondaryColor &&
        typeof submissionData.secondaryColor === "object"
      ) {
        submissionData.secondaryColor =
          submissionData.secondaryColor.toHexString();
      }

      // Append all simple key-value pairs
      Object.keys(submissionData).forEach((key) => {
        if (
          key !== "portalPermissions" &&
          key !== "logo" &&
          submissionData[key] !== undefined
        ) {
          formData.append(key, submissionData[key]);
        }
      });

      // Handle nested portalPermissions
      if (submissionData.portalPermissions) {
        formData.append(
          "portalPermissions",
          JSON.stringify(submissionData.portalPermissions)
        );
      }

      // Handle file upload
      if (
        submissionData.logo &&
        submissionData.logo[0] &&
        submissionData.logo[0].originFileObj
      ) {
        formData.append("logo", submissionData.logo[0].originFileObj);
      }

      const { status, data } = await updatePortalSettings(formData);
      if (status === 200) {
        dispatch(setPortalSettings(data));
        message.success("Settings updated successfully!");
      }
    } catch (error) {
      console.error("Failed to update settings:", error);
      message.error("Failed to update settings. Please try again.");
    }
  };

  const panelStyle: React.CSSProperties = {
    marginBottom: 24,
    background: "#f7f7f7",
    borderRadius: 8,
    border: "none",
  };

  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: "Institute Details",
      children: <DetailsForm form={form} />,
      style: panelStyle,
    },
    {
      key: "2",
      label: "Access Rights",
      children: <PermissionsForm form={form} />,
      style: panelStyle,
    },
  ];

  return (
    <Col span={24} className="px-[30px] py-[10px]">
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <Collapse
          bordered={false}
          defaultActiveKey={["1"]}
          expandIcon={({ isActive }) => (
            <CaretRightOutlined rotate={isActive ? 90 : 0} />
          )}
          style={{ background: "transparent" }}
          items={items}
        />
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            className="rounded-full mt-4"
          >
            Save All Settings
          </Button>
        </Form.Item>
      </Form>
    </Col>
  );
};

export default PortalSettings;
