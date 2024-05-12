import styles from "../../styles/CosmiesInfo.module.scss";
import Image from "next/image";
import { images } from "./images";
import CosmieVariations from "./cosmieVariations";

export default function CosmieInfo({ index, closeModal }) {
  console.log(images[index].element_1);
  return (
    <div className={styles.mainContainer}>
      <div className={styles.infoContainer}>
        <div className={styles.header}>
          <button className={styles.fakeBtn}> X </button>
          <h1>{images[index].name}</h1>
          <button onClick={() => closeModal(false)}>X</button>
        </div>
        <div className={styles.description}>
          <p>{images[index].description}</p>
        </div>

        {/* Normal Cosmies */}
        <div className={styles.evolutionContainer}>
          <div className={styles.variationsContainer}>
            <h4 className={styles.variationHeader}>Regular Form</h4>
            <div className={styles.variations}>
              <CosmieVariations
                index={index}
                v="v1"
                age="Baby"
              ></CosmieVariations>
              <CosmieVariations
                index={index}
                v="v2"
                age="Teen"
              ></CosmieVariations>
              <CosmieVariations
                index={index}
                v="v3"
                age="Adult"
              ></CosmieVariations>
            </div>
            <div className={styles.elements}>
              <h4>ELEMENTS</h4>
              <div className={styles.elementsContainer}>
                <Image
                  src={images[index].element_1}
                  alt="one of 10 elements of the Cosmies"
                ></Image>
                <Image
                  src={images[index].element_2}
                  alt="one of 10 elemenets of the Cosmies"
                ></Image>
              </div>
            </div>
          </div>
          {/* Alternative Cosmies */}
          <div className={styles.variationsContainer}>
            <h4 className={styles.variationHeader}>Alternative form</h4>
            <div className={styles.variations}>
              <CosmieVariations
                index={index}
                v="v1_alt"
                age="Baby"
              ></CosmieVariations>
              <CosmieVariations
                index={index}
                v="v2_alt"
                age="Teen"
              ></CosmieVariations>
              <CosmieVariations
                index={index}
                v="v3_alt"
                age="Adult"
              ></CosmieVariations>
            </div>
            <div className={styles.elements}>
              <h4>ELEMENTS</h4>
              <div className={styles.elementsContainer}>
                <Image
                  src={images[index].alt_element_1}
                  alt="one of 10 elements of the Cosmies"
                ></Image>
                <Image
                  src={images[index].alt_element_2}
                  alt="one of 10 elements of the Cosmies"
                ></Image>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
