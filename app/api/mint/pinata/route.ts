const BASE_URL = "https://azure-personal-mandrill-542.mypinata.cloud/ipfs/";

interface BaseStats {
  health: number;
  attack: number;
  defense: number;
  agility: number;
  accuracy: number;
}

interface Cosmie {
  name: string;
  description: string;
  image: string;
  external_url: string;
  base_stats: BaseStats;
  level: number;
  experience: number;
}

const cosmies: Cosmie[] = [
  {
    name: "Saburaku",
    description:
      "Feeding off the emotions of those around it, it quickly can become a bomb of stored energy. If you come across one be wary of the emotions you display around it.",
    image: BASE_URL + "QmUGVBKkGfm7p5AzKePsW632cd4UJD82LGWzz7e9PFJLNy",
    external_url: "https://cosmies.vercel.app/",
    base_stats: {
      health: 1,
      attack: 6,
      defense: 1,
      agility: 4,
      accuracy: 3,
    },
    level: 1,
    experience: 0,
  },
  {
    name: "Jambi",
    description:
      "Leader of the Cosmies and comprised of 80% water making it exceptionally cuddly. This affable being attempts to return home as fast as possible",
    image: BASE_URL + "QmdvJdWj2zJZXpLaTK2crpjftzTBa7emdeQdqyKp3co9BW",
    external_url: "https://cosmies.vercel.app/",
    base_stats: {
      health: 3,
      attack: 2,
      defense: 2,
      agility: 2,
      accuracy: 1,
    },
    level: 1,
    experience: 0,
  },
  {
    name: "Grassol",
    description:
      "Crash landing in dense forest this creature has a striking resemblance to the local fauna. Believing that they were also of the same species they attempted contact, unfortunately they were disappointed.",
    image: BASE_URL + "QmYoxrC7meYJPyJ4ADjfggdBsDAsRKkrj7fw1x2vNiWdE5",
    external_url: "https://cosmies.vercel.app/",
    base_stats: {
      health: 5,
      attack: 1,
      defense: 5,
      agility: 1,
      accuracy: 3,
    },
    level: 1,
    experience: 0,
  },
  {
    name: "Glacepom",
    description:
      "Attempting to reach the coldest parts of the planet, this little creature love icy temperatures. Climate change unfortunately has caused a few of these little creatures to take on a different element. ",
    image: BASE_URL + "QmS8emfYAQs4ZrRMsHvzzgxnxG7FsHP1oYDYgpBT9pVnJK",
    external_url: "https://cosmies.vercel.app/",
    base_stats: {
      health: 3,
      attack: 4,
      defense: 2,
      agility: 3,
      accuracy: 1,
    },
    level: 1,
    experience: 0,
  },
];

const createMetadata = async (statsArray: number[], cosmieName: string) => {
  const statKeys: (keyof BaseStats)[] = [
    "health",
    "attack",
    "defense",
    "agility",
    "accuracy",
  ];

  const cosmie = cosmies.find((cosmie) => cosmie["name"] === cosmieName);

  if (cosmie) {
    for (let i = 0; i < statKeys.length; i++) {
      cosmie.base_stats[statKeys[i]] = Math.min(
        cosmie.base_stats[statKeys[i]] + statsArray[i],
        20
      );
    }
    return await pinMetadataToIPFS(cosmie);
  }
};

const pinMetadataToIPFS = async (cosmie: Cosmie) => {
  console.log("--- pinning meta data --");

  try {
    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.PINATA_JWT}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pinataMetadata: {
          name: cosmie.name,
        },
        pinataContent: { ...cosmie },
      }),
    };

    const res = await fetch(
      "https://api.pinata.cloud/pinning/pinJSONToIPFS",
      options
    );

    const data = await res.json();
    return data.IpfsHash;
  } catch (e) {
    throw e;
  }
};

export async function POST(req: Request) {
  const { eventData, name } = await req.json();
  try {
    const ipfsHash = await createMetadata(eventData.randomWords, name);
    console.log("the ipfs Hash", ipfsHash);
    return new Response(ipfsHash, { status: 200 });
  } catch (e) {
    console.log(e);
    return new Response("Error processing event", { status: 500 });
  }
}
