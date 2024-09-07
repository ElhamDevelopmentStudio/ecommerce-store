"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Color, Size } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";

interface FilterProps {
  data: (Size | Color)[];
  name: string;
  valueKey: string;
  activeFilter?: string | null;
  setActiveFilter?: React.Dispatch<React.SetStateAction<string | null>>;
  className?: string;
}

const Filters = ({
  valueKey,
  name,
  data,
  activeFilter,
  setActiveFilter,
  className,
}: FilterProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  const selectedValue = searchParams.get(valueKey);

  const onClick = (id: string) => {
    const current = qs.parse(searchParams.toString());
    const query = {
      ...current,
      [valueKey]: id,
    };

    if (current[valueKey] === id) {
      query[valueKey] = null;
    }

    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      { skipNull: true }
    );

    router.push(url, { scroll: false });
    setActiveFilter?.(id);
  };

  return (
    <div className={`bg-gray-900 rounded-lg p-4 ${className}`}>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-white"
      >
        <span className="text-lg font-semibold">{name}</span>
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </motion.button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4 space-y-2"
          >
            {data.map((item) => (
              <motion.button
                key={item.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onClick(item.id)}
                className={`w-full py-2 px-4 rounded-lg text-left ${
                  selectedValue === item.id
                    ? "bg-blue-500 text-white"
                    : "bg-gray-800 text-gray-300"
                }`}
              >
                {item.name}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Filters;
