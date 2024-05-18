import React, { useState } from "react";
import { motion } from "framer-motion";

const Background: React.FC = () => {
  const [x, setX] = useState(0);

  const handleMouseMove = (event: React.MouseEvent) => {
    setX(event.clientX);
  };

  return (
    <motion.div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "linear-gradient(to right, red, blue)",
        transform: `translateX(${x}px)`,
      }}
      onMouseMove={handleMouseMove}
    />
  );
};

export default Background;
