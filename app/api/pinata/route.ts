import EventListener from "@/services/eventListener";
import internalWalletClient from "@/services/WalletClient";

const BASE_URL = "https://azure-personal-mandrill-542.mypinata.cloud/ipfs/";

/**
 * A user clicks Mint
 * We look at which cosmie they selected
 * Once a user selects a Cosmie we need to get a set of random stats
 *  Call out to VRF stat generator
 *  Initialize listener to listen for event
 *  Once event is recieved store the
 *
 */

interface Cosmie {
  name: string;
  hash: string;
}

const cosmies: Cosmie = [
  { name: "Saburaku", hash: "QmUGVBKkGfm7p5AzKePsW632cd4UJD82LGWzz7e9PFJLNy" },
  { name: "Jambi", hash: "QmdvJdWj2zJZXpLaTK2crpjftzTBa7emdeQdqyKp3co9BW" },
  { name: "Grassol", hash: "QmYoxrC7meYJPyJ4ADjfggdBsDAsRKkrj7fw1x2vNiWdE5" },
  { name: "Glacepom", hash: "QmS8emfYAQs4ZrRMsHvzzgxnxG7FsHP1oYDYgpBT9pVnJK" },
];

export async function POST(req: Request, res: Response) {
  const { name } = await req.json();

  const eventListener = new EventListener(
    "0x37614fa040aF4D6508b4Bf3ba471ACF65a7940fe"
  );

  return Response.json("Helloo");
}
