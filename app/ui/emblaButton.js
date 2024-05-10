import styles from "../../styles/emblaButton.module.scss"

export default function EmblaButton({ selected, onClick }) {
    return (
        <button
            className={`${styles.embla__dot} ${
                selected ? styles.isSelected : undefined
            }`}
            type="button"
            onClick={onClick}
        ></button>
    )
}
