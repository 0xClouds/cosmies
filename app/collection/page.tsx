"use client";

import styles from "../../styles/Collection.module.scss";
import Navbar from "../ui/navbar";
import CosmieInfo from "../ui/cosmieInfo";
import Image from "next/image";
import { useState } from "react";
import { images } from "../ui/images";
import { data } from "./dataurl";

export default function CollectionPage() {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [imgIndex, setImgIndex] = useState<number>(-1);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  console.log("when you go to collections");

  return (
    <div className={styles.main}>
      <div className={styles.desktopNav}>
        <Navbar currentPage="collection" />
      </div>
      <div className={styles.header}>
        <h1>Collection</h1>
        <p>browse cosmies and their kinds</p>
      </div>

      <div className={styles.imagesContainer}>
        {images.map((image, index: number) => (
          <div className={styles.images} key={index}>
            <div
              className={styles.cosmies}
              onClick={() => {
                setImgIndex(index);
                setOpenModal(true);
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <Image
                src={image.src}
                alt={image.name}
                onLoadingComplete={() => setLoading(false)}
                placeholder="blur"
                blurDataURL={data}
                objectFit="cover"
              />
            </div>
            <div className={styles.names}>
              <span>{image.name}</span>
              <div
                className={
                  imgIndex !== index ? styles.arrowHide : styles.arrowShow
                }
              ></div>
            </div>
          </div>
        ))}
      </div>

      {openModal && (
        <CosmieInfo index={imgIndex} closeModal={() => setOpenModal(false)} />
      )}
    </div>
  );
}
