"use client";
import React from "react";
import { Input, Button, Form } from "antd";

function Settings() {
  const [securityForm] = Form.useForm();
  const [accountForm] = Form.useForm();

  const onSecurityFinish = (values: any) => {
    console.log("Security Settings:", values);
  };

  const onAccountFinish = (values: any) => {
    console.log("Account Settings:", values);
  };

  const SecurityInputStyle = {
    height: "55px",
    borderRadius: "6px",
    width: "80%",
  };

  const AccountInputStyle = {
    height: "55px",
    borderRadius: "6px",
  };

  return (
    <div className="p-6 space-y-6 w-[80%]">
      {/* Security Settings Section */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-[#444444] text-lg font-medium mb-6">
          Security Settings
        </h2>
        <Form
          form={securityForm}
          onFinish={onSecurityFinish}
          className="w-full pl-4 ml-20"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please enter username" }]}
            className="mb-4"
          >
            <Input placeholder="Username" style={SecurityInputStyle} />
          </Form.Item>

          <Form.Item
            name="currentPassword"
            rules={[
              { required: true, message: "Please enter current password" },
            ]}
            className="mb-4"
          >
            <Input.Password
              placeholder="Current Password"
              style={SecurityInputStyle}
            />
          </Form.Item>

          <Form.Item
            name="newPassword"
            rules={[{ required: true, message: "Please enter new password" }]}
            className="mb-6"
          >
            <Input.Password
              placeholder="New Password"
              style={SecurityInputStyle}
            />
          </Form.Item>

          <Form.Item className="mb-0 pl-1">
            <Button
              htmlType="submit"
              className="px-6 py-3 rounded-full bg-white text-[#3B82F6] font-semibold shadow-lg hover:bg-gray-50 transition-all border-none"
            >
              Save
            </Button>
          </Form.Item>
        </Form>
      </div>

      {/* Account Settings Section */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-[#444444] text-lg font-medium mb-6">
          Account Settings
        </h2>
        <Form
          form={accountForm}
          onFinish={onAccountFinish}
          className="w-full pl-4 ml-20"
        >
          <div className="w-[80%] flex gap-4 mb-4">
            <Form.Item
              name="firstName"
              rules={[{ required: true, message: "Please enter first name" }]}
              className="mb-0 w-[50%]"
            >
              <Input
                placeholder="First Name"
                style={AccountInputStyle}
                className="w-[100%]"
              />
            </Form.Item>

            <Form.Item
              name="lastName"
              rules={[{ required: true, message: "Please enter last name" }]}
              className="mb-0 w-[50%]"
            >
              <Input
                placeholder="Last Name"
                style={AccountInputStyle}
                className="w-[100%]"
              />
            </Form.Item>
          </div>

          <div className="w-[80%] flex gap-4 mb-4">
            <Form.Item
              name="city"
              rules={[{ required: true, message: "Please enter city" }]}
              className="mb-0 w-[33%]"
            >
              <Input
                placeholder="City"
                style={AccountInputStyle}
                className="w-[100%]"
              />
            </Form.Item>

            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Please enter email" },
                { type: "email", message: "Please enter a valid email" },
              ]}
              className="mb-0 w-[33%]"
            >
              <Input
                placeholder="Email"
                style={AccountInputStyle}
                className="w-[100%]"
              />
            </Form.Item>

            <Form.Item
              name="country"
              rules={[{ required: true, message: "Please enter country" }]}
              className="mb-0 w-[33%]"
            >
              <Input
                placeholder="Country"
                style={AccountInputStyle}
                className="w-[100%]"
              />
            </Form.Item>
          </div>

          <Form.Item
            name="address"
            rules={[{ required: true, message: "Please enter address" }]}
            className="mb-6"
          >
            <Input
              placeholder="Address"
              style={AccountInputStyle}
              className="w-[80%]"
            />
          </Form.Item>

          <Form.Item className="mb-0 pl-1">
            <Button
              htmlType="submit"
              className="px-6 py-3 rounded-full bg-white text-[#3B82F6] font-semibold shadow-lg hover:bg-gray-50 transition-all border-none"
            >
              Save
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Settings;
