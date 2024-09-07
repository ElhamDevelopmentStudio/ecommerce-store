"use client";
import React, { useState, useRef, MouseEventHandler } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { Eye, ShoppingCart, Heart } from "lucide-react";
import Currency from "./ui/currency";
import { Product } from "@/types";
import { useRouter } from "next/navigation";
import usePreviewModal from "@/hooks/usePreviewModal";
import useCart from "@/hooks/useCart";

const ProductCard = ({ data }: { data: Product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [30, -30]);
  const rotateY = useTransform(x, [-100, 100], [-30, 30]);
  const router = useRouter();
  const previewModal = usePreviewModal();
  const cart = useCart();

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    x.set(mouseX - centerX);
    y.set(mouseY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  const handleClick = () => {
    router.push(`/product/${data?.id}`);
  };

  const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    previewModal.onOpen(data);
  };

  const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    cart.addItem(data);
  };

  return (
    <motion.div
      onClick={handleClick}
      ref={cardRef}
      style={{
        rotateX,
        rotateY,
        z: 100,
        transition: "transform 0.4s ease-out",
      }}
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.4, ease: "easeOut" },
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="bg-gray-900 -z-10 rounded-2xl overflow-hidden shadow-2xl cursor-pointer perspective-1000"
    >
      <div className="relative aspect-square">
        <Image
          alt={data.name}
          src={data?.images?.[0]?.url}
          fill
          className="object-cover"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center space-x-4"
        >
          <motion.button
            onClick={onPreview}
            whileHover={{
              scale: 1.1,
              transition: { duration: 0.3, ease: "easeOut" },
            }}
            whileTap={{
              scale: 0.9,
              transition: { duration: 0.2, ease: "easeInOut" },
            }}
            className="p-2 rounded-full bg-white text-gray-900"
          >
            <Eye size={20} />
          </motion.button>
          <motion.button
            onClick={onAddToCart}
            whileHover={{
              scale: 1.1,
              transition: { duration: 0.3, ease: "easeOut" },
            }}
            whileTap={{
              scale: 0.9,
              transition: { duration: 0.2, ease: "easeInOut" },
            }}
            className="p-2 rounded-full bg-white text-gray-900"
          >
            <ShoppingCart size={20} />
          </motion.button>
          <motion.button
            whileHover={{
              scale: 1.1,
              transition: { duration: 0.3, ease: "easeOut" },
            }}
            whileTap={{
              scale: 0.9,
              transition: { duration: 0.2, ease: "easeInOut" },
            }}
            className="p-2 rounded-full bg-white text-gray-900"
          >
            <Heart size={20} />
          </motion.button>
        </motion.div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg text-white mb-1">{data.name}</h3>
        <p className="text-sm text-gray-400 mb-2">{data.category.name}</p>
        <div className="flex items-center justify-between">
          <Currency value={data?.price} className="text-green-400 font-bold" />
          <span className="text-sm font-medium text-blue-400">In Stock</span>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
