"use client";
import { Button, Col, Form, Input, Row } from "antd";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import {
  EyeInvisibleOutlined,
  MailOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { register } from "@/api/auth";
import { useMessageApi } from "@/utils";
import { AxiosError } from "axios";
interface SignUpValues {
  username: string;
  email: string;
  password: string;
}

function SignUp() {
  const [form] = Form.useForm();
  const messageApi = useMessageApi();

  const handleSignUp = async (values: SignUpValues) => {
    try {
      // Simulate API call (replace with your actual API call)
      const { status, data } = await register(values);

      if (status === 201) {
        messageApi.success(data.message);
        // Optionally redirect to another page or clear the form
        form.resetFields();
      } else {
        throw new Error(data.message || "Signup failed");
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        // Handle AxiosError and access the response object
        messageApi.error(error.response?.data?.message || error.message);
      } else if (error instanceof Error) {
        // Handle general error
        messageApi.error(error.message);
      } else {
        messageApi.error("An unexpected error occurred.");
      }
    }
  };

  const onFinish = (values: SignUpValues) => {
    handleSignUp(values);
  };
  return (
    <Row className="h-screen">
      <Col className="h-full bg-[#fafcfe]" span={12}>
        <Image
          className="h-full object-contain bg-cover"
          src="/assets/images/signup.png"
          alt="Landing Page"
          width={845}
          height={433.2}
        />
      </Col>
      <Col className="flex flex-col justify-center items-center" span={12}>
        <div className="w-[70%]">
          <div className="mb-3">
            <h2 className="text-[26px] font-bold">Sign Up</h2>
            <p className="text-[16px] font-medium">
              Enter details to create account
            </p>
          </div>
          <Form
            form={form}
            onFinish={onFinish}
            style={{
              borderRadius: "0.35rem",
            }}
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please enter your username",
                },
              ]}
            >
              <Input
                suffix={<UserOutlined />}
                type="text"
                placeholder="Username*"
                className="bg-transparent form-control py-2"
              />
            </Form.Item>

            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please enter your email",
                },
              ]}
            >
              <Input
                suffix={<MailOutlined />}
                type="email"
                placeholder="Email*"
                className="bg-transparent form-control py-2"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please enter your password",
                },
              ]}
            >
              <Input.Password
                suffix={<EyeInvisibleOutlined />}
                placeholder="Password*"
                className="bg-transparent form-control py-2"
              />
            </Form.Item>
            <Form.Item
              name="confirmPassword"
              dependencies={["password"]}
              rules={[
                {
                  required: true,
                  message: "Please enter confirm password",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "The confirm password that you entered do not match!"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password
                suffix={<EyeInvisibleOutlined />}
                placeholder="Confirm Password*"
                className="bg-transparent form-control py-2"
              />
            </Form.Item>

            <p className="text-[16px] font-medium mb-2">
              Already registered?
              <Link
                href="/login"
                className="text-custom-blue no-underline hover:underline text-[16px] font-medium text-[#1677ff]"
              >
                {" "}
                Login
              </Link>
            </p>

            <Button
              className="w-full h-[44px] rounded-[10px] font-roboto font-normal text-lg"
              type="primary"
              htmlType="submit"
            >
              Register
            </Button>
          </Form>
        </div>

        <div className="flex items-center justify-center w-full text-center my-4">
          <span className="flex-1 border-b w-[50%] border-gray-300 mr-2"></span>
          <p className="text-[28px] font-medium p-0 px-5"> OR </p>
          <span className="flex-1 border-b w-[50%] border-gray-300 ml-2"></span>
        </div>
        <div className="flex justify-center gap-2.5 mt-2.5">
          <Button className="w-auto h-auto p-0 border-0">
            <Image
              src="/assets/icons/social-google.png"
              height={50}
              width={50}
              alt="Google Icon"
            />
          </Button>
          <Button className="w-auto h-auto p-0 border-0">
            <Image
              src="/assets/icons/social-fb.png"
              height={50}
              width={50}
              alt="Facebook Icon"
            />
          </Button>
          <Button className="w-auto h-auto p-0 border-0">
            <Image
              src="/assets/icons/social-linkedin.png"
              height={50}
              width={50}
              alt="LinkedIn Icon"
            />
          </Button>
          <Button className="w-auto h-auto p-0 border-0">
            <Image
              src="/assets/icons/social-twitter.png"
              height={50}
              width={50}
              alt="Twitter Icon"
            />
          </Button>
        </div>
      </Col>
    </Row>
  );
}

export default SignUp;
