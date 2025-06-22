import React, { useEffect, useState } from "react";
import {
  Col,
  ColorPicker,
  Form,
  Input,
  Row,
  Select,
  message,
  Upload,
} from "antd";
import { InboxOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { getPortalSettings } from "api/settings";
import type { FormInstance } from 'antd/es/form';

const { Dragger } = Upload;

interface DetailsFormProps {
  form: FormInstance;
}

const DetailsForm: React.FC<DetailsFormProps> = ({ form }) => {
  const [initializing, setInitializing] = useState(true);
  const [logoUrl, setLogoUrl] = useState<string>("");

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setInitializing(true);
        const response = await getPortalSettings();
        if (response.data.success) {
          const settings = response.data.data;
          const { logoUrl } = settings;
          
          const getMimeTypeFromUrl = (url: string): string => {
            const extension = url.split(".").pop()?.toLowerCase();
            if (extension === "jpg" || extension === "jpeg") return "image/jpeg";
            if (extension === "png") return "image/png";
            if (extension === "gif") return "image/gif";
            return "application/octet-stream";
          };

          const fileList = logoUrl
            ? [
                {
                  uid: "-1",
                  name: logoUrl.split("/").pop() || "logo.png",
                  status: "done",
                  url: logoUrl,
                  thumbUrl: logoUrl,
                  type: getMimeTypeFromUrl(logoUrl),
                },
              ]
            : [];

          form.setFieldsValue({
            ...settings,
            logo: fileList,
          });
          setLogoUrl(logoUrl || "");
        }
      } catch (error: any) {
        if (error.response?.status !== 404) {
          console.error("Failed to fetch settings:", error);
          message.error("Failed to load settings");
        }
      } finally {
        setInitializing(false);
      }
    };
    fetchSettings();
  }, [form]);

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  if (initializing) {
    return <div>Loading settings...</div>;
  }

  return (
    <>
      <Row className="w-full" gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Institute Name"
            name="instituteName"
            rules={[{ required: true, message: "Please enter your institute name" }]}
          >
            <Input
              size="large"
              type="text"
              placeholder="E.g., Springfield University"
              className="bg-transparent form-control"
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Institute Type"
            name="instituteType"
            rules={[{ required: true, message: "Please select your institute type" }]}
          >
            <Select
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
          <Form.Item label="Primary Color" name="primaryColor">
            <ColorPicker className="w-full" size="large" showText />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Secondary Color" name="secondaryColor">
            <ColorPicker className="w-full" size="large" showText />
          </Form.Item>
        </Col>
      </Row>

      <Row className="w-full" gutter={16}>
        <Col span={24}>
          <Form.Item label="Institute Logo (Optional)" name="logo" valuePropName="fileList" getValueFromEvent={normFile}>
            <Dragger beforeUpload={() => false} listType="picture">
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Click or drag institute logo file to this area to upload
              </p>
              <p className="ant-upload-hint">
                {logoUrl ? `A logo is already uploaded.` : "No logo uploaded yet."}
              </p>
            </Dragger>
          </Form.Item>
        </Col>
      </Row>

      <Row className="w-full" gutter={16}>
        <Col span={24}>
          <Form.Item name="address" label="Address">
            <Input.TextArea size="large" rows={3} placeholder="Enter institute address" />
          </Form.Item>
        </Col>
      </Row>

      <Row className="w-full" gutter={16}>
        <Col span={12}>
          <Form.Item
            name="contactEmail"
            label="Contact Email"
            rules={[{ type: "email", message: "Please enter a valid email" }]}
          >
            <Input size="large" placeholder="E.g., contact@institute.com" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="contactPhone" label="Contact Phone">
            <Input size="large" placeholder="E.g., +1 234 567 890" />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
};

export default DetailsForm;
