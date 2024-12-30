"use client";
import { Button, Row } from "antd";
export default function Home() {
  return (
    <Row className="landing-page">
      <Row className="header flex justify-between w-full h-[71px] pr-[72px] pl-[72px] gap-[346px] items-center bg-[#3056D3] text-white">
        <div className="logo-wrap font-semibold text-[14px]">
          <h3>LOGO</h3>
        </div>
        <div className="navigation-links-wrap">
          <ul className="flex gap-[36px] pt-[25px] pb-[25px]  font-semibold text-[14px] ">
            <li>
              <a href="">Home</a>
            </li>
            <li>
              <a href="">Demos</a>
            </li>
            <li>
              <a href="">Customize</a>
            </li>
            <li>
              <a href="">Features</a>
            </li>
            <li>
              <a href="">Contact Us</a>
            </li>
          </ul>
        </div>
        <div className="flex gap-[10px]">
          <Button>
            <a href="/signup">Create Account</a>
          </Button>
          <Button>
            <a href="/login">Login</a>
          </Button>
        </div>
      </Row>
      {/* home h-[791px] pt-[110px] pr-[265px] pl-[265px] bg-[#3056D3] gap-[20px] w-full flex justify-center */}
      <Row className="flex flex-col w-full justify-center items-center gap-[80px]">
        <Row className="info bg-[#3056D3] w-full gap-[30px] text-white flex flex-col items-center">
          <Row className="font-bold text-[45px] h-[105px] text-center mb-[15px]">
            Create Your Custom Educational Portal Without Code
          </Row>
          <Row className="opacity-80 font-[Inter] text-[17px] font-normal leading-[17px] text-center">
            Build and manage portals for schools, colleges, or universities in
            minutes
          </Row>
          <Button className="w-[138px] h-[62px] p-[23px] rounded-tl-[5px] rounded-tr-none rounded-br-none rounded-bl-none text-[16px] font-semibold leading-[16px] text-center">
            Learn More
          </Button>
          <Row className="mt-[20px]">
            <img
              src="/assets/images/demo.png"
              alt="Landing Page"
              width={845}
              height={433.2}
            />
          </Row>
        </Row>
        <Row>
          <div className="flex flex-col items-center gap-[15px]">
            <h1 className="font-inter text-[22px] font-bold leading-[26.63px] text-center text-[#212B36]">
              PORTALS
            </h1>
            <span className="w-[80px] h-[3px] bg-[#3056D3]"></span>
            <p className="font-inter text-sm font-medium leading-[14px] text-center text-[#637381] w-[70%]">
              Name provide clean, professional and modern designed admin
              dashboard templates for universities, colleges and schools.
            </p>
          </div>
        </Row>
        <Row className="justify-between w-full px-[150px] py-[10px]">
          <div className="w-[300px] h-[300px] px-[56px] pt-[50px] pb-[70px] pl-[64px] rounded-[150px] bg-[#D5E2F5] shadow-[0px_4px_8px_-2px_#3056D366]">
            <img
              src="/assets/images/university.svg"
              alt="Landing Page"
              width={180}
              height={180}
            />
          </div>
          <div className="w-[300px] h-[300px] px-[56px] pt-[50px] pb-[70px] pl-[64px] rounded-[150px] bg-[#D5E2F5] shadow-[0px_4px_8px_-2px_#3056D366]">
            <img
              src="/assets/images/college.svg"
              alt="Landing Page"
              width={180}
              height={180}
            />
          </div>
          <div className="w-[300px] h-[300px] px-[56px] pt-[50px] pb-[70px] pl-[64px] rounded-[150px] bg-[#D5E2F5] shadow-[0px_4px_8px_-2px_#3056D366]">
            <img
              src="/assets/images/school.svg"
              alt="Landing Page"
              width={180}
              height={180}
            />
          </div>
        </Row>
        <Row>
          <div className="flex flex-col items-center gap-[15px]">
            <h1 className="font-inter text-[22px] font-bold leading-[26.63px] text-center text-[#212B36]">
              LIVE STYLE CUSTOMIZER
            </h1>
            <span className="w-[80px] h-[3px] bg-[#3056D3]"></span>
            <p className="font-inter text-sm font-medium leading-[14px] text-center text-[#637381] w-[70%]">
              Fantastic Live Customizer Will allow you to create the most unique
              and incredible style for your app in only a few seconds!
            </p>
            <img
              src="/assets/images/video-cover.png"
              alt="Video Cover"
              width={596}
              height={408}
            />
          </div>
        </Row>
        <Row className="flex flex-col items-center gap-[15px] w-full">
          <h1 className="font-inter text-[22px] font-bold leading-[26.63px] text-center text-[#212B36]">
            FEATURES
          </h1>
          <span className="w-[80px] h-[3px] bg-[#3056D3]"></span>
          <p className="font-inter text-sm font-medium leading-[14px] text-center text-[#637381] w-[70%]">
            With the help of this ready to use features make your web
            application spectacular and more professional.
          </p>
          <div className="flex justify-between w-full px-[60px] py-[10px]">
            <div className="border border-[#FC573B] w-[306px] h-[208px] pt-[20px] gap-[40px] rounded-[6px] flex flex-col items-center justify-center">
              <img
                src="/assets/icons/no-code.svg"
                alt="no code"
                width={80}
                height={80}
              />
              <h2 className="text-[#212B36] font-inter text-[20px] font-bold leading-[24.2px] text-center uppercase">
                No code
              </h2>
            </div>
            <div className="border border-[#D5E2F5] w-[306px] h-[208px] pt-[20px] gap-[40px] rounded-[6px] flex flex-col items-center justify-center">
              <img
                src="/assets/icons/customizable.svg"
                alt="no code"
                width={80}
                height={80}
              />
              <h2 className="text-[#212B36] font-inter text-[20px] font-bold leading-[24.2px] text-center uppercase">
                customizable templates
              </h2>
            </div>
            <div className="border border-[#D5E2F5] w-[306px] h-[208px] pt-[20px] gap-[40px] rounded-[6px] flex flex-col items-center justify-center">
              <img
                src="/assets/icons/integration.svg"
                alt="no code"
                width={80}
                height={80}
              />
              <h2 className="text-[#212B36] font-inter text-[20px] font-bold leading-[24.2px] text-center uppercase">
                integrated dashboards
              </h2>
            </div>
            <div className="border border-[#D5E2F5] w-[306px] h-[208px] pt-[20px] gap-[40px] rounded-[6px] flex flex-col items-center justify-center">
              <img
                src="/assets/icons/roles.svg"
                alt="no code"
                width={80}
                height={80}
              />
              <h2 className="text-[#212B36] font-inter text-[20px] font-bold leading-[24.2px] text-center uppercase">
                different roles
              </h2>
            </div>
          </div>
        </Row>
        <Row className="flex flex-col items-center gap-[15px] w-full">
          <h1 className="font-inter text-[22px] font-bold leading-[26.63px] text-center text-[#212B36] uppercase">
            contact us
          </h1>
          <span className="w-[80px] h-[3px] bg-[#3056D3]"></span>
          <p className="font-inter text-sm font-medium leading-[14px] text-center text-[#637381] w-[70%]">
            Let’s talk about Love to hear from you!
          </p>
          <div className="flex justify-between w-full px-[60px] py-[10px]">
            <div className="border border-[#D5E2F5] w-[412px] h-[129px] p-[25px] gap-[40px] rounded-[6px] flex flex-row items-center justify-center bg-[#D5E2F5]">
              <img
                src="/assets/icons/mail.svg"
                alt="no code"
                width={80}
                height={80}
              />
              <div className="flex flex-col gap-[10px]">
                <h3 className="font-inter text-[18px] font-semibold leading-[18px] text-left decoration-[#212B36] text-[#212B36]">
                  Email Us
                </h3>
                <p className="font-inter text-[15px] font-medium leading-[15px] text-left text-[#637381]">
                  Fell free to contact us on our email.
                </p>
                <p className="font-inter text-[16px] font-bold leading-[16px] text-left text-[#0D6EFD]">
                  email@email.com
                </p>
              </div>
            </div>
            <div className="border border-[#D5E2F5] w-[412px] h-[129px] p-[25px] gap-[40px] rounded-[6px] flex flex-row items-center justify-center">
              <img
                src="/assets/icons/mail.svg"
                alt="no code"
                width={80}
                height={80}
              />
              <div className="flex flex-col gap-[10px]">
                <h3 className="font-inter text-[18px] font-semibold leading-[18px] text-left decoration-[#212B36] text-[#212B36]">
                  Email Us
                </h3>
                <p className="font-inter text-[15px] font-medium leading-[15px] text-left text-[#637381]">
                  Fell free to contact us on our email.
                </p>
                <p className="font-inter text-[16px] font-bold leading-[16px] text-left text-[#0D6EFD]">
                  email@email.com
                </p>
              </div>
            </div>
            <div className="border border-[#D5E2F5] w-[412px] h-[129px] p-[25px] gap-[40px] rounded-[6px] flex flex-row items-center justify-center">
              <img
                src="/assets/icons/mail.svg"
                alt="no code"
                width={80}
                height={80}
              />
              <div className="flex flex-col gap-[10px]">
                <h3 className="font-inter text-[18px] font-semibold leading-[18px] text-left decoration-[#212B36] text-[#212B36]">
                  Email Us
                </h3>
                <p className="font-inter text-[15px] font-medium leading-[15px] text-left text-[#637381]">
                  Fell free to contact us on our email.
                </p>
                <p className="font-inter text-[16px] font-bold leading-[16px] text-left text-[#0D6EFD]">
                  email@email.com
                </p>
              </div>
            </div>
          </div>
        </Row>
        <Row className="w-full">
          <div className="bg-[#212B36] text-white w-4/5 flex justify-center mx-auto p-10">
            <p className="font-inter text-sm font-medium leading-[14px] text-left">
              Copyright © 2024 NAME
            </p>
          </div>
        </Row>
      </Row>
    </Row>
  );
}
