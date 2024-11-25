"use client"
import React from "react";
import { motion } from "framer-motion";
import { useSpring, animated } from "react-spring";
import { Billboard as BillboardType } from "@/types";

type Props = {
  data: BillboardType;
};

const Billboard = ({ data }: Props) => {
  const [{ xy }, set] = useSpring(() => ({ xy: [0, 0] }));

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    set({
      xy: [clientX - window.innerWidth / 2, clientY - window.innerHeight / 2],
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative h-[600px] rounded-3xl overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      <animated.div
        style={{
          backgroundImage: `url(${data.imageUrl})`,
          transform: xy.to((x, y) => `translate3d(${x / 30}px,${y / 30}px,0)`),
        }}
        className="absolute inset-0 bg-cover bg-center"
      />
      <div className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-sm" />
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-8">
        <motion.h2
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-5xl sm:text-7xl font-bold text-white mb-8 leading-tight"
        >
          {data.label}
        </motion.h2>
        <motion.button
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-3 bg-white text-black font-semibold rounded-full text-lg hover:bg-opacity-90 transition-colors"
        >
          Explore Collection
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Billboard;
