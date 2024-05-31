"use client";
import Image from "next/image";
import { images } from "../ui/images";
import axios from "axios";

export default function Page() {
  const starters = ["Jambi", "Grassol", "Glacepom", "Saburaku"];
  const filteredData = images.filter((cosmie) => {
    return starters.includes(cosmie.name);
  });

  const handleClick = async (cosmieName: string) => {
    const response = await axios.post("/api/pinata", {
      name: cosmieName,
    });

    console.log(await response);
  };

  return (
    <main className="flex flex-col justify-center items-center h-full w-full gap-8 ">
      <h1 className="text-3xl ">
        Choose <span className="font-bold uppercase">your</span> Cosmie
      </h1>
      <div className="flex gap-2 ">
        {filteredData.map((cosmie) => (
          <div
            className="border border-1 border-black rounded-xl w-64 h-64 bg-blue-200 relative overflow-hidden hover:cursor-pointer"
            key={cosmie.name}
            onClick={() => handleClick(cosmie.name)}
          >
            <Image
              className="hover:scale-150 rounded-xl transition-all"
              src={cosmie.src}
              alt={cosmie.description}
              objectFit="contain"
            ></Image>
          </div>
        ))}
      </div>
    </main>
  );
}
