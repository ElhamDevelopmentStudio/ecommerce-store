"use client";
import PreviewModal from "@/components/PreviewModal";
import React, { useEffect, useState } from "react";

type Props = {};

const ModalProvider = (props: Props) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return;

  return (
    <>
      <PreviewModal></PreviewModal>
    </>
  );
};

export default ModalProvider;
