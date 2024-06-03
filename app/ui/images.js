//Gifs with backgrounds
import Jambi from "../../public/images/cosmies-gif/baby_jambi.gif";
import Grassol from "../../public/images/cosmies-gif/baby-grassol.gif";
import Glacepom from "../../public/images/cosmies-gif/baby-glacepom.gif";
import Saburaku from "../../public/images/cosmies-gif/baby-saburaku.gif";

//Elements

import Dark from "../../public/images/elements/dark.svg";
import Fire from "../../public/images/elements/fire.svg";
import Floral from "../../public/images/elements/floral.svg";
import Ground from "../../public/images/elements/ground.svg";
import Ice from "../../public/images/elements/ice.svg";
import Light from "../../public/images/elements/light.svg";
import Magic from "../../public/images/elements/magic.svg";
import Metal from "../../public/images/elements/metal.svg";
import Occult from "../../public/images/elements/occult.svg";
import Physical from "../../public/images/elements/physical.svg";
import Water from "../../public/images/elements/water.svg";
import Wind from "../../public/images/elements/wind.svg";

export const images = [
  {
    src: Jambi,
    name: "Jambi",
    element_1: Water,
    element_2: Magic,
    description:
      "Leader of the Cosmies and comprised of 80% water making it exceptionally cuddly. This affable being attempts to return home as fast as possible.",
  },
  {
    src: Grassol,
    name: "Grassol",
    element_1: Floral,
    element_2: Ground,
    description:
      "Crash landing in dense forest this creature has a striking resemblance to the local fauna. Believing that they were also of the same species they attempted contact, unfortunately they were disappointed.",
  },

  {
    src: Glacepom,
    name: "Glacepom",
    element_1: Water,
    element_2: Ice,

    description:
      "Attempting to reach the coldest parts of the planet, this little creature love icy temperatures. Climate change unfortunately has caused a few of these little creatures to take on a different element. ",
  },

  {
    src: Saburaku,
    name: "Saburaku",
    element_1: Occult,
    element_2: Dark,
    description:
      "Feeding off the emotions of those around it, it quickly can become a bomb of stored energy. If you come across one be wary of the emotions you display around it.",
  },
];

export default images;
