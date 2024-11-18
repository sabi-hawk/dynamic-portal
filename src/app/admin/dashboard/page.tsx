"use client";
import { Col, Row, Table, Tag } from "antd";
import type { TableProps } from "antd";
import React from "react";
import Image from "next/image";
import { Column } from "@ant-design/plots";

interface DataType {
  key: string;
  name: string;
  id: number;
  status: string;
}

const columns: TableProps<DataType>["columns"] = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Teacher Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Status",
    key: "status",
    dataIndex: "status",
    render: (_, { status }) => (
      <Tag color="volcano">{status.toUpperCase()}</Tag>
    ),
  },
];

const dataColumns: DataType[] = [
  {
    key: "1",
    name: "John Brown",
    id: 32,
    status: "Absent",
  },
  {
    key: "2",
    name: "Jim Green",
    id: 42,
    status: "Absent",
  },
  {
    key: "3",
    name: "Joe Black",
    id: 32,
    status: "Absent",
  },
];

function Dashboard() {
  const data = [
    { type: "1-3 seconds", value: 0.16 },
    { type: "4-10 seconds", value: 0.125 },
    { type: "11-30 seconds", value: 0.24 },
    { type: "31-60 seconds", value: 0.19 },
    { type: "1-3 points", value: 0.22 },
    { type: "3-10 points", value: 0.05 },
    { type: "10-30 points", value: 0.01 },
    { type: "30+ points", value: 0.015 },
  ];

  const students_performance_config = {
    data,
    xField: "type",
    yField: "value",
    height: 350,
    style: {
      fill: ({ type }: { type: string }) => {
        if (type === "10-30 points" || type === "30+ points") {
          return "#22CBCC";
        }
        return "#2989FF";
      },
    },
    label: {
      text: (originData: { value: string }) => {
        const val = parseFloat(originData.value);
        if (val < 0.05) {
          return (val * 100).toFixed(1) + "%";
        }
        return "";
      },
      offset: 10,
    },
    legend: false,
  };

  const students_survey_config = {
    data: [
      {
        name: "New Student",
        month: "Jan.",
        value: 18.9,
      },
      {
        name: "New Student",
        month: "Feb.",
        value: 28.8,
      },
      {
        name: "New Student",
        month: "Mar.",
        value: 39.3,
      },
      {
        name: "New Student",
        month: "Apr.",
        value: 81.4,
      },
      {
        name: "New Student",
        month: "May",
        value: 47,
      },
      {
        name: "New Student",
        month: "Jun.",
        value: 20.3,
      },
      {
        name: "New Student",
        month: "Jul.",
        value: 24,
      },
      {
        name: "New Student",
        month: "Aug.",
        value: 35.6,
      },
      {
        name: "Old Student",
        month: "Jan.",
        value: 12.4,
      },
      {
        name: "Old Student",
        month: "Feb.",
        value: 23.2,
      },
      {
        name: "Old Student",
        month: "Mar.",
        value: 34.5,
      },
      {
        name: "Old Student",
        month: "Apr.",
        value: 99.7,
      },
      {
        name: "Old Student",
        month: "May",
        value: 52.6,
      },
      {
        name: "Old Student",
        month: "Jun.",
        value: 35.5,
      },
      {
        name: "Old Student",
        month: "Jul.",
        value: 37.4,
      },
      {
        name: "Old Student",
        month: "Aug.",
        value: 42.4,
      },
    ],
    xField: "month",
    yField: "value",
    colorField: "name",
    color: ["#2989FF", "#22CBCC"],
    group: true,
    height: 350,
    style: {
      inset: 5,
      // insetLeft:5,
      // insetRight:20,
      // insetBottom:10
      // insetTop:10
    },
  };

  return (
    <div className="flex flex-col gap-4">
      <Row gutter={16}>
        <Col className="h-fit" span={6}>
          <div className="bg-white rounded-[10px] p-[10px_15px] flex flex-col gap-2.5 shadow-[0px_0px_10px_0px_#B7C0CE33]">
            <div className="flex justify-between">
              <Image src="/assets/images/students.png" height={64} width={64} alt="Student Image" />
              <div className="flex flex-col items-end">
                <h3 className="font-roboto text-base font-medium leading-[18.75px] text-left">
                  Total Students
                </h3>
                <h2 className="font-roboto text-xl font-medium leading-[28.13px] text-right text-[#4CAF50]">
                  64
                </h2>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <Image
                className="w-[18.57px] h-[10px]"
                src="/assets/icons/arrow-up.png"
                height={21} width={12}
                alt="Arrow Up Icon"
              />
              <p>10% Higher Then Last Month</p>
            </div>
          </div>
        </Col>
        <Col className="h-fit" span={6}>
          <div className="bg-white rounded-[10px] p-[10px_15px] flex flex-col gap-2.5 shadow-[0px_0px_10px_0px_#B7C0CE33]">
            <div className="flex justify-between">
              <Image src="/assets/images/courses.png" height={64} width={64} alt="Courses Image" />
              <div className="flex flex-col items-end">
                <h3 className="font-roboto text-base font-medium leading-[18.75px] text-left">
                  Total Courses
                </h3>
                <h2 className="font-roboto text-xl font-medium leading-[28.13px] text-right text-[#4CAF50]">
                  64
                </h2>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <Image
                className="w-[18.57px] h-[10px]"
                src="/assets/icons/arrow-down.png"
                height={21} width={12}
                alt="Arrow Down Icon"
              />
              <p>0.7% less than last year</p>
            </div>
          </div>
        </Col>
        <Col className="h-fit" span={6}>
          <div className="bg-white rounded-[10px] p-[10px_15px] flex flex-col gap-2.5 shadow-[0px_0px_10px_0px_#B7C0CE33]">
            <div className="flex justify-between">
              <Image src="/assets/images/teachers.png" height={64} width={64} alt="Teachers Image" />
              <div className="flex flex-col items-end">
                <h3 className="font-roboto text-base font-medium leading-[18.75px] text-left">
                  Total Teachers
                </h3>
                <h2 className="font-roboto text-xl font-medium leading-[28.13px] text-right text-[#4CAF50]">
                  64
                </h2>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <Image
                className="w-[18.57px] h-[10px]"
                src="/assets/icons/arrow-up.png"
                height={21} width={12}
                alt="Arrow Up Icon"
              />
              <p>10% Higher Then Last Month</p>
            </div>
          </div>
        </Col>
        <Col className="h-fit" span={6}>
          <div className="bg-white rounded-[10px] p-[10px_15px] flex flex-col gap-2.5 shadow-[0px_0px_10px_0px_#B7C0CE33]">
            <div className="flex justify-between">
              <Image src="/assets/images/fee.png" height={64} width={64} alt="Fee Image" />
              <div className="flex flex-col items-end">
                <h3 className="font-roboto text-base font-medium leading-[18.75px] text-left">
                  Fee Collected
                </h3>
                <h2 className="font-roboto text-xl font-medium leading-[28.13px] text-right text-[#4CAF50]">
                  $64,566
                </h2>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <Image
                className="w-[18.57px] h-[10px]"
                src="/assets/icons/arrow-up.png"
                height={21} width={12}
                alt="Arrow Up Icon"
              />
              <p>10% Higher Then Last Month</p>
            </div>
          </div>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Row className="flex flex-col bg-white p-5 rounded-lg">
            <h3 className="font-roboto text-[17px] font-medium leading-[19.92px]">
              Students Survey
            </h3>
            <Column {...students_survey_config} />
          </Row>
        </Col>
        <Col span={12}>
          <Row className="flex flex-col bg-white p-5 rounded-lg">
            <h3 className="font-roboto text-[17px] font-medium leading-[19.92px]">
              Students Performance Survey
            </h3>
            <Column {...students_performance_config} />
          </Row>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Row className="flex flex-col bg-white p-5 rounded-lg">
            <h3 className="font-roboto text-[17px] font-medium leading-[19.92px]">
              Teachers List
            </h3>
            <Table<DataType> columns={columns} dataSource={dataColumns} />
          </Row>
        </Col>
        <Col span={12}>
          <Row className="flex flex-col bg-white p-5 rounded-lg">
            <h3 className="font-roboto text-[17px] font-medium leading-[19.92px]">
              New Students List
            </h3>
            <Table<DataType> columns={columns} dataSource={dataColumns} />
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default Dashboard;
