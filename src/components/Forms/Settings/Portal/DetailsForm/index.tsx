import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  ColorPicker,
  Form,
  Input,
  Row,
  Select,
  message,
} from "antd";
import { InboxOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { Upload } from "antd";
import { getPortalSettings, updatePortalSettings } from "api/settings";

interface DetailsType {
  username: string;
  currentPassword: string;
  newPassword: string;
  firstName: string;
  lastName: string;
  email: string;
  city: string;
  country: string;
  address: string;
}

interface PortalSettings {
  instituteName: string;
  primaryColor: string;
  secondaryColor: string;
  logoUrl: string;
  address: string;
  contactEmail: string;
  contactPhone: string;
  instituteType?: string;
}

const { Dragger } = Upload;

const DetailsForm: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [initializing, setInitializing] = useState(true);
  const [fileList, setFileList] = useState<any[]>([]);
  const [logoUrl, setLogoUrl] = useState<string>("");

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setInitializing(true);
      const response = await getPortalSettings();

      if (response.data.success) {
        const settings = response.data.data;
        form.setFieldsValue({
          instituteName: settings.instituteName,
          primaryColor: settings.primaryColor,
          secondaryColor: settings.secondaryColor,
          address: settings.address,
          contactEmail: settings.contactEmail,
          contactPhone: settings.contactPhone,
          instituteType: settings.instituteType || "school",
        });

        // Set logo URL from settings
        setLogoUrl(settings.logoUrl || "");
      }
    } catch (error) {
      console.error("Failed to fetch settings:", error);
      message.error("Failed to load settings");
    } finally {
      setInitializing(false);
    }
  };

  // Handle file upload separately
  const uploadProps: UploadProps = {
    name: "file",
    multiple: false,
    action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload", // Mock API
    fileList: fileList,
    onChange(info) {
      setFileList(info.fileList.slice(-1)); // Keep only the latest file

      const { status } = info.file;
      if (status === "done") {
        // For demo purposes, we'll use a placeholder URL
        // In a real implementation, you'd use info.file.response.url
        const mockLogoUrl = `https://placeholder.com/logo_${Date.now()}.png`;
        setLogoUrl(mockLogoUrl);
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onRemove: () => {
      setFileList([]);
      // Reset to default or empty
      setLogoUrl("");
      return true;
    },
  };

  const handleSubmit = async (values: PortalSettings) => {
    try {
      setLoading(true);

      // Include the logoUrl in submission data
      const submissionData = {
        ...values,
        logoUrl: logoUrl || "https://placeholder.com/150", // Use default if none provided
      };

      const response = await updatePortalSettings(submissionData);

      if (response.data.success) {
        message.success("Portal settings updated successfully");
      } else {
        message.error("Failed to update settings");
      }
    } catch (error) {
      console.error("Error updating settings:", error);
      message.error("Failed to update settings");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  if (initializing) {
    return <div>Loading settings...</div>;
  }

  return (
    <Col span={24} className="px-[30px] py-[10px]">
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        style={{
          borderRadius: "0.35rem",
        }}
      >
        <Row className="w-full" gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Institute Name"
              layout="vertical"
              name="instituteName"
              rules={[
                {
                  message: "Please enter your institute name",
                },
              ]}
            >
              <Input
                type="text"
                placeholder="Institute Name"
                className="bg-transparent form-control py-2"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Institute Type"
              layout="vertical"
              name="instituteType"
              rules={[
                {
                  message: "Please enter your institute type",
                },
              ]}
            >
              <Select
                onChange={handleChange}
                size="large"
                options={[
                  { value: "school", label: "School" },
                  { value: "college", label: "College" },
                  { value: "university", label: "University" },
                ]}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row className="w-full" gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Primary Color"
              layout="vertical"
              name="primaryColor"
              rules={[
                {
                  message: "Please enter your institute name",
                },
              ]}
            >
              <ColorPicker
                className="w-full h-[40px] flex items-center justify-between flex-row-reverse px-[24px]"
                defaultValue="#5dbc86"
                showText={(color) => (
                  <span>Primary Color Code ({color.toHexString()})</span>
                )}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Secondary Color"
              layout="vertical"
              name="secondaryColor"
              rules={[
                {
                  message: "Please enter your institute type",
                },
              ]}
            >
              <ColorPicker
                className="w-full h-[40px] flex items-center justify-between flex-row-reverse px-[24px]"
                defaultValue="#1677ff"
                showText={(color) => (
                  <span>Secondary Color Code ({color.toHexString()})</span>
                )}
              />
            </Form.Item>
          </Col>
        </Row>

        {/* Logo Upload Section */}
        <Row className="w-full mb-[24px]" gutter={16}>
          <Col span={24}>
            <Form.Item label="Institute Logo (Optional)">
              <Dragger {...uploadProps}>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                  Click or drag institute logo file to this area to upload
                </p>
                <p className="ant-upload-hint">
                  {logoUrl
                    ? `Current logo: ${logoUrl}`
                    : "No logo uploaded yet (optional)"}
                </p>
              </Dragger>
            </Form.Item>
          </Col>
        </Row>

        <Row className="w-full" gutter={16}>
          <Form.Item name="address" label="Address">
            <Input.TextArea rows={3} placeholder="Enter institute address" />
          </Form.Item>
        </Row>

        <Row className="w-full" gutter={16}>
          <Form.Item
            name="contactEmail"
            label="Contact Email"
            rules={[{ type: "email", message: "Please enter a valid email" }]}
          >
            <Input placeholder="Enter contact email" />
          </Form.Item>
        </Row>

        <Row className="w-full" gutter={16}>
          <Form.Item name="contactPhone" label="Contact Phone">
            <Input placeholder="Enter contact phone" />
          </Form.Item>
        </Row>

        <Row className="w-full" gutter={16}>
          <Button
            className="w-[71px] h-[36px] px-[20px] py-[10px] gap-[10px] rounded-[30px] bg-white text-[#005CBB] shadow-[0px_4px_9px_1px_#00000040] font-roboto text-sm font-semibold leading-[16.41px] text-center"
            type="primary"
            htmlType="submit"
            loading={loading}
          >
            Save
          </Button>
        </Row>
      </Form>
    </Col>
  );
};

export default DetailsForm;
