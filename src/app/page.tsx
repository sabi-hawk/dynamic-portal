import { Button } from "antd";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="landing-page">
      <div className="header">
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
      </div>
      <div className="body"></div>
    </div>
  );
}
