"use client";
import Image from "next/image";
import { images } from "../ui/images";
import { FormEvent, useEffect, useState } from "react";
import axios from "axios";
import EventListener from "@/services/eventListener";

const starters = ["Jambi", "Grassol", "Glacepom", "Saburaku"];
const filteredData = images.filter((cosmie) => {
  return starters.includes(cosmie.name);
});

export default function Page() {
  const [status, setStatus] = useState({ vrf: false, metadata: false });
  const [selectedCosmie, setSelectedCosmie] = useState("");
  const handleClick = async (
    e: FormEvent<HTMLFormElement>,
    cosmieName: string
  ) => {
    e.preventDefault();
    try {
      const vrfResponse = await axios.post("/api/mint/vrf", {
        name: cosmieName,
      });

      console.log("vrf resposne", vrfResponse);
      const eventListner = new EventListener(
        "0x32abb4d02235f6ff026f6b2a0849d56f6fdba028"
      );
      const eventData = await eventListner.getEventPromise();

      const pinataResponse = await axios.post("/api/mint/pinata", {
        eventData: eventData,
        name: cosmieName,
      });
      console.log("pinata response", pinataResponse.data);

      const mintResponse = await axios.post("/api/mint/erc721", {
        ipfsHash: pinataResponse.data,
      });

      console.log(mintResponse);
    } catch (e) {
      throw e;
    }
  };

  return (
    <main className="flex flex-col justify-center items-center h-full w-full gap-8 ">
      <h1 className="text-3xl ">
        Choose <span className="font-bold uppercase">your</span> Cosmie
      </h1>
      <form
        className="flex flex-col justify-center items-center gap-2"
        onSubmit={(e) => handleClick(e, selectedCosmie)}
      >
        <div className="flex gap-2">
          {filteredData.map((cosmie) => (
            <div
              className={`border border-1 border-black rounded-xl w-64 h-64 bg-blue-200 relative overflow-hidden hover:cursor-pointer ${cosmie.name === selectedCosmie ? "border-4 border-blue-500" : null}`}
              key={cosmie.name}
              onClick={() => setSelectedCosmie(cosmie.name)}
            >
              <Image
                className="hover:scale-150 hover:cursor-pointer rounded-xl transition-all"
                src={cosmie.src}
                alt={cosmie.description}
                objectFit="contain"
              ></Image>
            </div>
          ))}
        </div>
        <button
          className={`disabled:bg-slate-500 valid:bg-blue-500 w-1/6 text-white p-4 rounded-full hover:cursor-pointer`}
          disabled={selectedCosmie.length < 1}
        >
          Mint Cosmie
        </button>
      </form>
    </main>
  );
}
