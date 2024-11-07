import { Button, Col, Form, Input, Row } from "antd";
import React from "react";

interface SettingsType {
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

function GeneralSettings() {
  const [form] = Form.useForm();

  const handleLogin = async (values: SettingsType) => {
    console.log(values);
  };

  const onFinish = (values: SettingsType) => {
    handleLogin(values);
  };
  return (
    <Col span={24} className="px-[30px] py-[10px]">
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        style={{
          borderRadius: "0.35rem",
        }}
      >
        <Row className="w-full">
          <Form.Item
            className="w-full"
            label="Username"
            layout="vertical"
            name="username"
            rules={[
              {
                message: "Please enter your username",
              },
            ]}
          >
            <Input
              type="text"
              placeholder="Username*"
              className="bg-transparent form-control py-2"
            />
          </Form.Item>
        </Row>
        <Row className="w-full">
          <Form.Item
            className="w-full"
            label="Current Password"
            layout="vertical"
            name="currentPassword"
            rules={[
              {
                message: "Please enter your current password",
              },
            ]}
          >
            <Input.Password
              placeholder="Password*"
              className="bg-transparent form-control py-2"
            />
          </Form.Item>
        </Row>
        <Row className="w-full">
          <Form.Item
            className="w-full"
            label="New Password"
            layout="vertical"
            name="newPassword"
            rules={[
              {
                message: "Please enter your new password",
              },
            ]}
          >
            <Input.Password
              placeholder="Password*"
              className="bg-transparent form-control py-2"
            />
          </Form.Item>
        </Row>
        <Row className="w-full" gutter={16}>
          <Col span={12}>
            <Form.Item
              label="First Name"
              layout="vertical"
              name="firstName"
              rules={[
                {
                  message: "Please enter your first name",
                },
              ]}
            >
              <Input
                type="text"
                placeholder="First Name"
                className="bg-transparent form-control py-2"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Last Name"
              layout="vertical"
              name="lastName"
              rules={[
                {
                  message: "Please enter your last name",
                },
              ]}
            >
              <Input
                type="text"
                placeholder="Last Name"
                className="bg-transparent form-control py-2"
              />
            </Form.Item>
          </Col>
        </Row>

        <Row className="w-full" gutter={16}>
          <Col span={8}>
            <Form.Item
              label="E-Mail"
              layout="vertical"
              name="email"
              rules={[
                {
                  message: "Please enter your email",
                },
              ]}
            >
              <Input
                type="email"
                placeholder="Email Address"
                className="bg-transparent form-control py-2"
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="City"
              layout="vertical"
              name="city"
              rules={[
                {
                  message: "Please enter your city",
                },
              ]}
            >
              <Input
                type="city"
                placeholder="City"
                className="bg-transparent form-control py-2"
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Country"
              layout="vertical"
              name="country"
              rules={[
                {
                  message: "Please enter your country",
                },
              ]}
            >
              <Input
                type="country"
                placeholder="Country"
                className="bg-transparent form-control py-2"
              />
            </Form.Item>
          </Col>
        </Row>

        <Row className="w-full">
          <Form.Item
            className="w-full"
            label="Address"
            layout="vertical"
            name="address"
            rules={[
              {
                message: "Please enter your address",
              },
            ]}
          >
            <Input
              type="address"
              placeholder="Address"
              className="bg-transparent form-control py-2"
            />
          </Form.Item>
        </Row>

        <Row>
          <Button
            className="w-[71px] h-[36px] px-[20px] py-[10px] gap-[10px] rounded-[30px] bg-white text-[#005CBB] shadow-[0px_4px_9px_1px_#00000040] font-roboto text-sm font-semibold leading-[16.41px] text-center"
            type="primary"
            htmlType="submit"
          >
            Save
          </Button>
        </Row>
      </Form>
    </Col>
  );
}

export default GeneralSettings;
