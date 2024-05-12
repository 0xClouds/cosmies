import styles from "../../styles/SignIn.module.scss";
import { usePrivy } from "@privy-io/react-auth";
import { useEffect, useState } from "react";
import ArrowRight from "@/public/images/icons/arrow-right";
import Image from "next/image";
import logo from "../../public/images/logo.png";
import { useRouter } from "next/navigation";
import { useLogin } from "@privy-io/react-auth";

const SignIn: React.FC = () => {
  const [color, setColor] = useState(false);
  const router = useRouter();
  const { ready, authenticated } = usePrivy();

  const { login } = useLogin({
    onComplete: (
      user,
      isNewUser,
      wasAlreadyAuthenticated,
      loginMethod,
      linkedAccount
    ) => {
      router.push("/gamePage");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  useEffect(() => {
    if (ready && authenticated) {
      router.push("/gamePage"); // Redirect to gamePage if already authenticated
    }
  }, [ready, authenticated, router]);

  return (
    <div className={styles.mainContainer}>
      <Image
        className={styles.navImg}
        src={logo}
        layout="fixed"
        width={400}
        height={360}
        alt="placeholder"
      ></Image>
      <p className={styles.infoText}>
        Crash landing on earth, these creatures spread around the globe looking
        for Adventurers to guide them.
      </p>
      <button
        className={styles.button}
        onMouseEnter={() => setColor(true)}
        onMouseLeave={() => setColor(false)}
        onClick={login}
      >
        Connect Here
        <span className={styles.rightArrow}>
          <ArrowRight fill={color ? "orange" : "green"} />
        </span>
      </button>
    </div>
  );
};

export default SignIn;
