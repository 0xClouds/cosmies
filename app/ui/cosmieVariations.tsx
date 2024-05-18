// @ts-nocheck

import styles from "../../styles/CosmieVariations.module.scss";
import Image from "next/image";
import { images } from "./images";

export default function CosmieVariartions({ v, index, age }) {
  return (
    <div className={styles.cosmieV1}>
      <div className={styles.imgContainer}>
        <Image src={images[index][v]} alt={images.name}></Image>
      </div>
      <span>{age}</span>
    </div>
  );
}
