import styles from "../../styles/Footer.module.scss";
import Twitter from "../../public/images/icons/twitter";
import Frontier from "../../public/images/icons/frontier";

const Footer: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.informationContainer}>
        <span>Follow us</span>
        <span>Powered by</span>
      </div>
      <div className={styles.logoContainer}>
        <ul className={styles.socialsList}>
          <li className={styles.listItems}>
            <a href="https://twitter.com/notifications">
              <Twitter />
            </a>
          </li>
        </ul>
        <span className={styles.imageContainer}>
          <Frontier />
        </span>
      </div>
    </div>
  );
}

export default Footer;
