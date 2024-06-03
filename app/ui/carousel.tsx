import { useRef, useCallback, useState, useEffect } from "react";
import Image from "next/image";
import EmblaButton from "./emblaButton";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import styles from "../../styles/Carousel.module.scss";

import Jambi from "../../public/images/cosmies-gif/baby_jambi.gif";
import Grassol from "../../public/images/cosmies-gif/baby-grassol.gif";
import Glacepom from "../../public/images/cosmies-gif/baby-glacepom.gif";
import Saburaku from "../../public/images/cosmies-gif/baby-saburaku.gif";

const slides = [Jambi, Grassol, Glacepom, Saburaku];

const Carousel: React.FC = () => {
  const autoplay = useRef(Autoplay({ delay: 3000, stopOnInteraction: false }));
  const [emblaRef, embla] = useEmblaCarousel({ loop: true }, [
    autoplay.current,
  ]);

  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollTo = useCallback(
    (index: number) => embla?.scrollTo(index),
    [embla]
  );

  const onSelect = useCallback(() => {
    if (!embla) return;
    setSelectedIndex(embla.selectedScrollSnap());
  }, [embla, setSelectedIndex]);

  useEffect(() => {
    if (!embla) return undefined; // Explicitly return undefined for clarity

    const handleSelect = () => {
      onSelect();
      setScrollSnaps(embla.scrollSnapList());
    };

    handleSelect();
    embla.on("select", handleSelect);

    return () => {
      if (embla) embla.off("select", handleSelect);
    };
  }, [embla, setScrollSnaps, onSelect]);

  return (
    <div className={styles.embla}>
      <div className={styles.embla__viewport} ref={emblaRef}>
        <div className={styles.embla__container}>
          {slides.map((slide, index) => (
            <div key={index} className={styles.embla__slide}>
              <Image
                src={slide}
                className={styles.mainImg}
                alt="carousel of the 10 cosmies"
                layout="responsive" // Assuming these images should use 'fill', adjust if needed
              />
            </div>
          ))}
        </div>
        <div className={styles.embla__dots}>
          {scrollSnaps.map((_, index) => (
            <EmblaButton
              key={index}
              selected={index === selectedIndex}
              onClick={() => {
                scrollTo(index);
                autoplay.current.reset();
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
