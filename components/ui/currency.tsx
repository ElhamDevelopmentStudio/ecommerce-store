"use client";
import React, { useEffect, useState } from "react";

export const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

type Props = {
  value?: string | number;
  className?: string;
};

const Currency = ({ value, className }: Props) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className={`font-semibold ${className}`}>
      {formatter.format(Number(value))}
    </div>
  );
};

export default Currency;
