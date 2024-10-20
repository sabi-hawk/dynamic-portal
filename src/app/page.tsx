import { Button, Row } from "antd";
import Link from "next/link";
import LandingPageImage1 from "../assets/LandingPageImage1.jpeg";
import Image from "next/image";
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
              <Link href="">Home</Link>
            </li>
            <li>
              <Link href="">Demos</Link>
            </li>
            <li>
              <Link href="">Customize</Link>
            </li>
            <li>
              <Link href="">Features</Link>
            </li>
            <li>
              <Link href="">Contact Us</Link>
            </li>
          </ul>
        </div>
        <div className="btn-wrap">
          <Button>
            <Link href="/signup">Sign Up</Link>
          </Button>
        </div>
      </Row>
      <Row className="home h-[791px] pt-[110px] pr-[265px] pl-[265px] bg-[#3056D3] gap-[20px] w-full flex justify-center">
        <Row className="info w-[725px] gap-[30px] text-white flex flex-col items-center">
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
            <Image
              src={LandingPageImage1}
              alt="Landing Page"
              width={845}
              height={433.2}
            />
          </Row>
        </Row>
      </Row>
    </Row>
  );
}
