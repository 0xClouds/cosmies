import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../../styles/Navbar.module.scss";
import TopButtons from "./topButtons";
import logo from "../../public/images/logo.png";

interface NavbarProps {
  currentPage: string;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage }) => {
  return (
    <div className={styles.container}>
      <ul className={styles.navList}>
        <li className={styles.navImgContainer}>
          <Image
            className={styles.navImg}
            src={logo}
            layout="fixed"
            width={200}
            height={180}
            alt="placeholder"
          />
        </li>
        <li className={`${styles.navItem} ${currentPage === "home" ? styles.navPage : undefined}`}>
          <Link href="/" className={`${currentPage !== "home" ? styles.navLink : undefined}`}>
            Home
          </Link>
        </li>
        <li className={`${styles.navItem} ${currentPage === "collection" ? styles.navPage : undefined}`}>
          <Link href="/collection" className={`${currentPage !== "collection" ? styles.navLink : undefined}`}>
            Collection
          </Link>
        </li>
        <li className={`${styles.navItem} ${currentPage === "artist" ? styles.navPage : undefined}`}>
          <Link href="/artist" className={`${currentPage !== "artist" ? styles.navLink : undefined}`}>
            Artist
          </Link>
        </li>
      </ul>
      {/* Assuming TopButtons is a React component you might want to include. Uncomment if needed:
      <TopButtons />
      */}
    </div>
  );
};

export default Navbar;
