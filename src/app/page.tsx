import { Button, Col, Row } from "antd";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <Row className="landing-page">
      <Row className="header">
        <div className="logo-wrap">
          <h3>LOGO</h3>
        </div>
        <div className="navigation-links-wrap">
          <ul>
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
      <Row className="body"></Row>
    </Row>
  );
}
