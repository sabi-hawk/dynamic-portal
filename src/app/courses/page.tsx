import React from "react";
import AdminLayout from "@/components/Layouts/Admin";
import { Button, Col, Row } from "antd";
import Image from "next/image";

interface CourseType {
  key: React.Key;
  courseImage: string;
  courseName: string;
  instructorImage: string;
  instructorName: string;
  description: string;
  lectureDuration: string;
}

function Courses() {
  const courses = Array.from({ length: 30 }).map<CourseType>((_, i) => ({
    key: i,
    courseImage: "/assets/images/course.png",
    courseName: `${i % 2 === 0 ? "PHP" : "JAVA"} Development Course`, // Optional: alternate names
    instructorImage: "/assets/images/user.png",
    instructorName: `John ${i % 2 === 0 ? "Brown" : "Smith"}`, // Optional: alternate names
    description:
      "In this course, you'll explore the basic structure of a web application, and how a web browser interacts with a web server,as well as the basic syntax and data structures of the PHP language",
    lectureDuration: "25mins",
  }));

  return (
    <AdminLayout>
      <div className="p-[20px] bg-white">
        <span className="font-roboto text-base font-medium leading-[18.75px] text-center text-[#5B626B]">
          All Courses
        </span>
      </div>
      <Row className="bg-white py-[10px] px-[60px]">
        {courses.map((course) => (
          <Col span={6} key={course.key} className="gap-[10px] px-[8px] mb-[20px]">
            <div className="inline-block relative w-full mb-[30px] mt-[30px] rounded-[6px] text-[#000000de] bg-white shadow-[0_2px_2px_#00000024,_0_3px_1px_-2px_#0003,_0_1px_5px_#0000001f]">
              <div className="h-[60%] relative overflow-hidden ml-[15px] mr-[15px] mt-[-30px] rounded-[6px] shadow-[0_16px_38px_-12px_#0000008f,_0_4px_25px_#0000001f,_0_8px_10px_-5px_#0003]">
                <Image
                  src={course.courseImage}
                  width={245}
                  height={182}
                  alt="Course Image"
                />
              </div>
              <div className="shadow-[0px_1px_5px_0px_#0000001F] shadow-[0px_4px_4px_0px_#00000040] rounded-[7px] p-[20px] flex flex-col gap-[25px]">
                <div>
                  <div className="flex items-center">
                    <Image
                      src={course.instructorImage}
                      alt="Profile"
                      width={40}
                      height={40}
                    />
                    <h3 className="font-roboto text-base font-medium leading-[18.75px] text-left">
                      {course.courseName}
                    </h3>
                  </div>
                  <span className="font-roboto text-sm font-normal leading-[16.41px] text-left text-[#96A2B4]">
                    {course.lectureDuration}
                  </span>
                </div>
                <div className="flex flex-col gap-[10px]">
                  <h3 className="font-roboto text-base font-medium leading-[18.75px] text-left">
                    {course.instructorName}
                  </h3>
                  <p>{course.description}</p>
                </div>
                <Button>Read More</Button>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </AdminLayout>
  );
}

export default Courses;
