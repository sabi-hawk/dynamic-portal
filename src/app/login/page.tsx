"use client";
import React from "react";
import { Button, Checkbox, Col, Form, Input, Row } from "antd";
import { EyeInvisibleOutlined, UserOutlined } from "@ant-design/icons";
import { login } from "api/auth";
import { useMessageApi } from "utils";
import { AxiosError } from "axios";
import { useDispatch } from "react-redux";
import { setUser, setLoading } from "flux/reducers/auth";
import { useNavigate } from "react-router-dom";

interface LoginValues {
  email: string;
  password: string;
}

function Login() {
  const [form] = Form.useForm();
  const messageApi = useMessageApi();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (values: LoginValues) => {
    try {
      dispatch(setLoading(true));
      const { status, data } = await login(values);
      const { message, ...payload } = data;

      if (status === 200) {
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        messageApi.success(data.message || "Login successful");
        form.resetFields();
        dispatch(setUser(payload));
        navigate("/");
      } else {
        throw new Error(message || "Login failed");
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
    } finally {
      dispatch(setLoading(false));
    }
  };

  const onFinish = (values: LoginValues) => {
    handleLogin(values);
  };

  return (
    <Row className="h-screen">
      <Col className="flex flex-col justify-center items-center" span={12}>
        <div className="w-[70%]">
          <div className="mb-3">
            <h2 className="text-[26px] font-bold">Welcome to Dynamic Portal</h2>
            <p className="text-[16px] font-medium">
              Need an account?
              <a
                href="/signup"
                className="text-custom-blue no-underline hover:underline text-[16px] font-medium text-[#1677ff]"
              >
                {" "}
                Signup
              </a>
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
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please enter your email",
                },
              ]}
            >
              <Input
                suffix={<UserOutlined />}
                type="text"
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

            <div className="flex items-center justify-between m-2">
              <Form.Item
                className="m-0"
                name="remember"
                valuePropName="checked"
              >
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <a href="/">Forgot Password?</a>
            </div>
            <Button
              className="w-full h-[44px] rounded-[10px] font-roboto font-normal text-lg"
              type="primary"
              htmlType="submit"
            >
              Login
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
            <img
              src="/assets/icons/social-google.png"
              height={50}
              width={50}
              alt="Google Icon"
            />
          </Button>
          <Button className="w-auto h-auto p-0 border-0">
            <img
              src="/assets/icons/social-fb.png"
              height={50}
              width={50}
              alt="Facebook Icon"
            />
          </Button>
          <Button className="w-auto h-auto p-0 border-0">
            <img
              src="/assets/icons/social-linkedin.png"
              height={50}
              width={50}
              alt="LinkedIn Icon"
            />
          </Button>
          <Button className="w-auto h-auto p-0 border-0">
            <img
              src="/assets/icons/social-twitter.png"
              height={50}
              width={50}
              alt="Twitter Icon"
            />
          </Button>
        </div>
      </Col>
      <Col className="h-full bg-[#fafcfe]" span={12}>
        <img
          className="h-full object-contain bg-cover"
          src="/assets/images/signup.png"
          alt="Landing Page"
          width={845}
          height={433.2}
        />
      </Col>
    </Row>
  );
}

export default Login;
